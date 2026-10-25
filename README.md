# AI Tech News Automation

This repository contains a working **Remotion skill-based motion test**. It intentionally does **not** fetch current news, use LLMs, or auto-publish.

## V2 – continuous editorial motion

The 16-second vertical video (720×1280, 30 fps) is one connected canvas, not a slideshow. It demonstrates:

- **Cinematic camera:** shared frame-driven pans and holds across a single world.
- **Article highlights:** staged marker wipes *behind* educational text.
- **Motion graphics:** staggered elements, spring-based entrances, animated waveform and a simple explanatory diagram.
- **Audio:** original, deterministic synthesized sound bed and soft hits (no external audio license).
- **Quality checks:** three still frames and the MP4 are uploaded with the render.

The on-screen article is an **original explainer**, not a real news article. All text is explicitly labeled as demo content.

### Watch from your phone

1. Open [GitHub Actions](https://github.com/nishant-iith/ai-tech-news-automation/actions/workflows/render-sample.yml).
2. Open the latest successful run.
3. Download the **remotion-tech-news-sample-v2** artifact. It contains `sample.mp4` and three QA frames.

### Render locally

```bash
npm install
npx remotion browser ensure
npm run render
```

### Skills and attribution

This video follows guidance from:

- [Remotion official agent skills](https://github.com/remotion-dev/skills) (markup, timing, rendering).
- [Cinematic Camera](https://github.com/Liamrjohnston/remotion-motion-graphics-skill/tree/main/skills/cinematic-camera) (a shared camera, hold → travel → hold, editorial world).
- [Article Highlights](https://github.com/Liamrjohnston/remotion-motion-graphics-skill/tree/main/skills/article-highlights) (layered paper/marker and safe typography).
- [Claude Remotion Motion Graphics](https://github.com/haidrrrry/claude-remotion-skill) (multi-property entrances, stagger, scene rhythm, visual verification).

The MIT-licensed source for Cinematic Camera and Article Highlights is bundled under `.agents/skills/` so future coding agents can find it. These are **instructions for an agent**, not runtime plugins that change Remotion automatically. `AGENTS.md` defines how to use them.

The full LLM script generation and selection workflow is intentionally postponed until the sample video style is approved.
