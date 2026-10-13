# Pulse Reveal

Single-file countdown page (`index.html`) to 2026-10-14T18:11:00Z (Wed Oct 14, 11:11 AM PT). Shows `LIVE` at zero. `og.png` (1200x630) is the link preview; `typing.gif` is a looping three-dot typing bubble to send before the link.

## Reusable intro functions (in `index.html`)

- `typingBubble(ms = 1600)` → Promise. Shows the gray iMessage-style bubble (`#tb`, three pulsing dots, amber glow) for `ms`, then hides it.
- `iosSpinnerReveal(msg, ms = 1700)` → Promise. Shows a 12-spoke spinner (`#sp`, #007AFF, 1 s rotation, our own CSS, no Apple assets) for `ms`, types `msg` into `#it`, then turns the letters into canvas sparks that fly onto the `.phx` SVG.

The sequence: `typingBubble(1600).then(() => iosSpinnerReveal("Pulse reveal · 11:11 AM PT", 1700))`. It runs on load, every 90 s, and when you tap the title. If prefers-reduced-motion is on, it is skipped.

For a new reveal: change the `T` timestamp, the text, and the og meta tags.

## Hosting
Pushing to `main` runs `.github/workflows/pages.yml`. It decodes `og.b64` and `typing.b64` to binaries and force-pushes the site to the `gh-pages` branch. That branch is served by raw.githack.com. GitHub Pages is not enabled yet; turn it on in Settings → Pages → Branch `gh-pages` to use tigerwillca.github.io/pulse-reveal/.
