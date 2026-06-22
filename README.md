# WC2026 Sweepstake Board

Static GitHub Pages site for a World Cup 2026 classroom sweepstake.

## Live data

The board uses the no-key open-source World Cup 2026 API:

- `https://worldcup26.ir/get/groups`
- Source project: `https://github.com/rezarahiminia/worldcup2026`

Student totals are calculated from current group points. If the API is unavailable, the page still renders the assignment board with zeroed fallback stats and shows an error state.

## Local preview

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173`.
