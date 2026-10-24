#!/usr/bin/env python3
"""Subtle, seeded phone-camera imperfections; requires Pillow 13 and numpy."""
import argparse
import math
from pathlib import Path
import time

import numpy as np
from PIL import Image, ImageFilter, ImageOps


def sample(a, x, y):
    """Bilinear remap with clamped edges (coordinates in pixels)."""
    h, w = a.shape[:2]
    x, y = np.clip(x, 0, w - 1), np.clip(y, 0, h - 1)
    ix, iy = x.astype(np.int32), y.astype(np.int32)
    jx, jy = np.minimum(ix + 1, w - 1), np.minimum(iy + 1, h - 1)
    fx, fy = x - ix, y - iy
    if a.ndim == 3:
        fx, fy = fx[..., None], fy[..., None]
    return ((a[iy, ix] * (1 - fx) + a[iy, jx] * fx) * (1 - fy)
            + (a[jy, ix] * (1 - fx) + a[jy, jx] * fx) * fy).astype(np.float32)


def pil(a):
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def process(src, dst, strength, rng, night):
    started = time.perf_counter()
    with Image.open(src) as opened:
        im = ImageOps.exif_transpose(opened).convert("RGB")
    im.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
    w, h = im.size
    s = strength
    if s:
        angle = rng.uniform(0.3, 1.2) * rng.choice([-1, 1]) * s
        im = im.rotate(angle, Image.Resampling.BICUBIC)
        margin = math.ceil(max(w, h) * abs(math.sin(math.radians(angle))))
        # Conservative rotation-safe inset plus independently offset crop edges.
        mx, my = min(margin, (w - 1) // 3), min(margin, (h - 1) // 3)
        ex, ey = int(w * rng.uniform(.004, .012) * s), int(h * rng.uniform(.004, .012) * s)
        lx, ty = int(rng.integers(ex + 1)), int(rng.integers(ey + 1))
        im = im.crop((mx + lx, my + ty, w - mx - ex + lx, h - my - ey + ty))
    a = np.asarray(im, dtype=np.float32)
    h, w = a.shape[:2]
    y, x = np.mgrid[:h, :w].astype(np.float32)
    cx, cy = (w - 1) / 2, (h - 1) / 2
    dx, dy = x - cx, y - cy
    radius = max(math.hypot(cx, cy), 1)
    r2 = (dx * dx + dy * dy) / radius**2
    # Positive inverse-map coefficient produces mild barrel distortion.
    k = rng.uniform(.006, .016) * s
    a = sample(a, cx + dx * (1 + k * r2), cy + dy * (1 + k * r2))
    ca = rng.uniform(.5, 1.5) * s / radius
    a[..., 0] = sample(a[..., 0], x + dx * ca, y + dy * ca)
    a[..., 2] = sample(a[..., 2], x - dx * ca, y - dy * ca)
    lum = a @ np.array([.299, .587, .114], dtype=np.float32)
    a = lum[..., None] + (a - lum[..., None]) * (1 - rng.uniform(.10, .18) * s)
    cast = [1.018, 1.009, .978] if rng.random() < .6 else [.982, 1.002, 1.020]
    a *= 1 + (np.array(cast, dtype=np.float32) - 1) * rng.uniform(.7, 1.3) * s
    a = a * (1 - .025 * s) + rng.uniform(2, 4) * s
    low = np.asarray(pil(a).filter(ImageFilter.GaussianBlur(12)), dtype=np.float32)
    a -= rng.uniform(.12, .22) * s * (a - low)
    lum = np.clip(a @ np.array([.299, .587, .114], dtype=np.float32), 0, 255)
    sigma = (rng.uniform(.6, 1.1) + 2.4 * (1 - lum / 255)**1.5) * s
    sigma *= 1.9 if night else 1
    a += rng.normal(size=(h, w, 1)).astype(np.float32) * sigma[..., None]
    a += rng.normal(0, (.8 if night else .45) * s, a.shape).astype(np.float32)
    if s:
        yy, cb, cr = pil(a).convert("YCbCr").split()
        # Chroma-only phone NR; preserve noisy luminance and soften color speckle.
        cb = Image.blend(cb, cb.filter(ImageFilter.MedianFilter(3)), .7 * s)
        cr = Image.blend(cr, cr.filter(ImageFilter.MedianFilter(3)), .7 * s)
        im = Image.merge("YCbCr", (yy, cb, cr)).convert("RGB")
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=int(45 * s), threshold=2))
        a = np.asarray(im, dtype=np.float32)
    if rng.random() < .5 and s:
        theta, length = rng.uniform(0, math.pi), rng.uniform(1, 3) * s
        ox, oy = math.cos(theta) * length / 2, math.sin(theta) * length / 2
        a = (sample(a, x - ox, y - oy) + 2 * a + sample(a, x + ox, y + oy)) / 4
    a *= (1 - rng.uniform(.035, .085) * s * r2**1.2)[..., None]
    dst.parent.mkdir(parents=True, exist_ok=True)
    # A fresh pixel-only image carries no EXIF, ICC, comments, or source metadata.
    pil(a).save(dst, "JPEG", quality=int(rng.integers(74, 79)), subsampling=2)
    print(f"{src} -> {dst} ({w}x{h}) {time.perf_counter() - started:.3f}s")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="input JPEG, or directory with --batch")
    parser.add_argument("output", type=Path, help="output JPEG, or directory with --batch")
    parser.add_argument("--strength", type=float, default=.6)
    parser.add_argument("--seed", type=int)
    parser.add_argument("--night", action="store_true")
    parser.add_argument("--batch", action="store_true", help="process directory JPEGs in filename order")
    args = parser.parse_args()
    if not 0 <= args.strength <= 1:
        parser.error("--strength must be between 0 and 1")
    if args.seed is not None and args.seed < 0:
        parser.error("--seed must be nonnegative")
    if args.batch:
        if not args.input.is_dir():
            parser.error("--batch input must be a directory")
        files = sorted(p for p in args.input.iterdir() if p.is_file() and p.suffix.lower() in (".jpg", ".jpeg"))
        if not files:
            parser.error("no JPEGs found in input directory")
        pairs = [(p, args.output / p.name) for p in files]
    else:
        pairs = [(args.input, args.output)]
    if any(src.resolve() == dst.resolve() for src, dst in pairs):
        parser.error("input and output paths must differ")
    rng = np.random.default_rng(args.seed)
    try:
        for src, dst in pairs:
            process(src, dst, args.strength, rng, args.night)
    except (OSError, ValueError) as exc:
        parser.exit(1, f"error: {exc}\n")


if __name__ == "__main__":
    main()
