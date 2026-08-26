# Food Tree 🌳

Interactive visualization of the quote-cast tree growing from [@czar's food cast](https://farcaster.xyz/czar/0x3db99055) ("using only food, where did you grow up").

**Live app:** https://kordireal.github.io/food-tree/

## What it does
- Maps the **complete quote-cast tree** — not just direct quotes (3 levels deep, 56 casts)
- Each node: poster's pfp, username, and the **food picture** they posted
- Edges show exactly **who quoted whom**
- **Zoom** (wheel / pinch), **pan** (drag), **tap a node** for the full dish photo, cast text, likes, and a link to the cast
- 🌍 **Origin mode** (bonus game): tags each poster with where they grew up, extracted from flags / place mentions / "grew up in…" lines in their cast — guess before you reveal
- **Live data**: on load it connects to Farcaster's public thread API to refresh the root cast; the full quote tree ships as an embedded snapshot (harvested via the authenticated quotes API, which browsers can't call anonymously)

## Architecture
Single `index.html`. Zero dependencies, zero build step, zero backend. Canvas-rendered tidy tree with custom pan/zoom. Deep-linkable: `#0x436ca871…` opens that node's panel. Works on desktop and mobile.

Built for [POIDH bounty #1317](https://poidh.xyz/base/bounty/1317). Data via Farcaster web APIs.
