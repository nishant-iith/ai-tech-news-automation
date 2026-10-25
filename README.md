# AI Tech News Automation

Cloud-first tech news video prototype. The first milestone is a **minimalist, vertical Remotion design preview**. It is not yet an automated news publisher.

## First sample

- **Video**: 720 × 1280 (9:16), 30 fps, 12 seconds, H.264 MP4
- **Design**: dark background, lime accent, bold type, clean motion, progress bar
- **Content**: AI voice and million-token context themes. Text is sample copy, **not verified current news**.
- **Audio**: intentionally silent for the first render. English/Hinglish narration comes after the visual test.

### Render in GitHub (phone friendly)

1. Open [Actions](https://github.com/nishant-iith/ai-tech-news-automation/actions/workflows/render-sample.yml).
2. Select **Render sample Remotion video**, then **Run workflow**. Pushing changes to the video source also triggers a render.
3. Open the successful run and download **remotion-tech-news-sample** from **Artifacts** (ZIP contains `sample.mp4`).

### Render locally (optional)

```bash
npm install
npx remotion browser ensure
npm run render
```

The output is `out/sample.mp4`. Open Remotion Studio with `npm run dev`.

## Next milestones

1. Approve the visual style on a real phone.
2. Incorporate the approved English and Hinglish scripts and an authorized text-to-speech voice.
3. Fetch and fact-check fresh news; cite sources and dates in generated scripts.
4. Add a review gate; only later consider Instagram publishing with account authorization.

No social-media publishing or external credentials are enabled. Do not commit secrets to this public repository.
