import React from 'react';
import {AbsoluteFill, Composition, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BACKGROUND = '#080C12';
const FOREGROUND = '#F4F7F8';
const ACCENT = '#BAFF64';
const MUTED = '#9CA6B2';
const FPS = 30;
const SCENE_LENGTH = 90;

const scenes = [
  {eyebrow: 'THE DAILY BRIEF', lines: ['TECH NEWS', 'IN MOTION'], description: 'Clear stories. Zero clutter.', category: 'INTRO'},
  {eyebrow: 'STORY 01 / AI VOICE', lines: ['AI GETS', 'A VOICE'], description: 'A new era of conversational interfaces.', category: 'AI'},
  {eyebrow: 'STORY 02 / LONG CONTEXT', lines: ['CONTEXT', 'GETS BIGGER'], description: 'Exploring million-token AI workflows.', category: 'MODELS'},
  {eyebrow: 'COMING NEXT', lines: ['LESS NOISE.', 'MORE SIGNAL.'], description: 'Verified headlines + narration, coming next.', category: 'OUTRO'},
];

type SceneData = (typeof scenes)[number];

const Scene: React.FC<{scene: SceneData; sceneIndex: number}> = ({scene, sceneIndex}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const motion = spring({fps, frame, config: {damping: 200, mass: 0.75}});
  const fade = interpolate(frame, [0, 10, 76, 89], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rise = interpolate(motion, [0, 1], [48, 0]);

  return (
    <AbsoluteFill style={{opacity: fade, padding: '0 62px', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 154, left: 62, fontSize: 21, fontWeight: 800, letterSpacing: 4, color: ACCENT}}>
        {scene.eyebrow}
      </div>
      <div style={{transform: `translateY(${rise}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 34}}>
          <div style={{width: 37, height: 6, backgroundColor: ACCENT, borderRadius: 99}} />
          <span style={{fontSize: 19, fontWeight: 700, letterSpacing: 4, color: MUTED}}>{scene.category}</span>
        </div>
        {scene.lines.map((line) => (
          <div key={line} style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 74, fontWeight: 900, lineHeight: 1.07, letterSpacing: -3.8, color: FOREGROUND, whiteSpace: 'nowrap'}}>
            {line}
          </div>
        ))}
        <div style={{height: 3, width: 110, backgroundColor: ACCENT, marginTop: 38, marginBottom: 29}} />
        <p style={{margin: 0, fontSize: 27, lineHeight: 1.42, color: MUTED, maxWidth: 535}}>{scene.description}</p>
      </div>
      <div style={{position: 'absolute', bottom: 148, left: 62, color: MUTED, fontWeight: 700, fontSize: 20, letterSpacing: 2}}>
        {String(sceneIndex + 1).padStart(2, '0')} / 04
      </div>
    </AbsoluteFill>
  );
};

const TechNewsPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = Math.min(1, (frame + 1) / durationInFrames);

  return (
    <AbsoluteFill style={{backgroundColor: BACKGROUND, color: FOREGROUND, fontFamily: 'Arial, Helvetica, sans-serif', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: -210, right: -330, height: 700, width: 700, border: '1px solid rgba(186,255,100,0.15)', borderRadius: 999}} />
      <div style={{position: 'absolute', top: -90, right: -210, height: 460, width: 460, border: '1px solid rgba(186,255,100,0.10)', borderRadius: 999}} />
      <div style={{position: 'absolute', top: 60, left: 62, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{height: 18, width: 18, backgroundColor: ACCENT, borderRadius: 5, transform: 'rotate(45deg)'}} />
        <span style={{fontSize: 24, fontWeight: 900, letterSpacing: 1.2}}>SIGNAL</span>
        <span style={{fontSize: 21, color: MUTED}}> / TECH</span>
      </div>
      {scenes.map((scene, index) => (
        <Sequence key={scene.eyebrow} from={index * SCENE_LENGTH} durationInFrames={SCENE_LENGTH}>
          <Scene scene={scene} sceneIndex={index} />
        </Sequence>
      ))}
      <div style={{position: 'absolute', bottom: 75, left: 62, right: 62, height: 5, backgroundColor: '#27303C', borderRadius: 99}}>
        <div style={{width: `${progress * 100}%`, height: '100%', backgroundColor: ACCENT, borderRadius: 99}} />
      </div>
      <div style={{position: 'absolute', bottom: 37, left: 62, color: '#71808E', fontSize: 16, letterSpacing: 2}}>
        DESIGN PREVIEW • NOT LIVE NEWS
      </div>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition id="TechNewsPreview" component={TechNewsPreview} durationInFrames={FPS * 12} fps={FPS} width={720} height={1280} />
);
