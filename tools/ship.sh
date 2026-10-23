#!/usr/bin/env bash
# Bezpieczny commit + push: każdy nieudany test przerywa skrypt, zanim cokolwiek trafi na zdalne repo.
# Użycie: tools/ship.sh "opis commitu" [plik|katalog ...] [-- test.browser.cjs ...]
#   pliki przed "--" trafiają do commitu (domyślnie: wszystkie zmiany), po "--" testy przeglądarkowe do uruchomienia.
set -euo pipefail
cd "$(dirname "$0")/.."
msg=${1:?podaj opis commitu}; shift
paths=(); browser=()
while [ $# -gt 0 ]; do [ "$1" = "--" ] && { shift; browser=("$@"); break; }; paths+=("$1"); shift; done
REMOTE_BRANCH=${REMOTE_BRANCH:-feature/ostatni-kurs}
unit() { for t in tests/*.test.cjs; do node --test "$t" >/tmp/ship-unit.log 2>&1 || { echo "FAIL $t"; tail -20 /tmp/ship-unit.log; exit 1; }; done; echo "unit OK"; }
brow() { for t in "${browser[@]}"; do timeout 900 node "$t" >/tmp/ship-b.log 2>&1 || { echo "FAIL $t"; tail -20 /tmp/ship-b.log; exit 1; }; echo "OK $t"; done; }
unit; [ ${#browser[@]} -gt 0 ] && brow
if [ ${#paths[@]} -gt 0 ]; then git add -- "${paths[@]}"; else git add -A; fi
git diff --cached --quiet && { echo "brak zmian do commitu"; exit 1; }
git -c user.name="Kacper Kretowicz" -c user.email="$(git log -1 --format=%ae)" commit -qm "$msg"
git pull --rebase --autostash -q origin "$REMOTE_BRANCH"
unit   # ponownie po rebase: cudze zmiany mogły coś zepsuć
git push -q origin "HEAD:$REMOTE_BRANCH"
git log --oneline -1
