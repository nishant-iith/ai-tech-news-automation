import React from 'react';
import {AbsoluteFill, Audio, Composition, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// Motion direction: Remotion best practices + community cinematic-camera and article-highlights skills.
// This is an illustrative design exercise, not a report of a real dated news announcement.
const C = {
  bg: '#101316',
  dark: '#1B2022',
  dark2: '#242B2C',
  paper: '#F4F1E8',
  ink: '#172025',
  accent: '#C8F28C',
  highlight: '#E8F19A',
  ivory: '#F4F4EF',
  grey: '#ADB5AF',
  line: '#46504B',
};
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.inOut(Easing.cubic);

const reveal = (frame: number, start: number, fps: number) => {
  const t = Math.max(0, frame - start);
  return {
    opacity: interpolate(t, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)}),
    translate: `0 ${interpolate(spring({frame: t, fps, config: {damping: 200, stiffness: 120}}), [0, 1], [42, 0])}px`,
  };
};
const value = (frame: number, points: number[], output: number[]) =>
  interpolate(frame, points, output, {...clamp, easing: ease});

const Wave: React.FC = () => {
  const frame = useCurrentFrame();
  return <div style={{height: 150, display: 'flex', alignItems: 'center', gap: 12}}>
    {Array.from({length: 21}, (_, i) => {
      const envelope = 0.25 + 0.75 * Math.sin(Math.PI * i / 21);
      const oscillation = 0.52 + 0.48 * Math.abs(Math.sin(frame / 10 + i * 0.51));
      return <div key={i} style={{
        width: 13, height: 18 + envelope * oscillation * 112,
        borderRadius: 20, backgroundColor: i % 6 === 0 ? C.accent : '#718377',
      }}/>;
    })}
  </div>;
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{
    position:'absolute', left: 94, top: 270, width: 652, height: 1030,
    backgroundColor: C.dark, border: '2px solid #3D4C45', borderRadius: 16,
    boxSizing: 'border-box', padding: '60px 54px',
  }}>
    <div style={{color:C.accent, fontSize:22, fontWeight:800, letterSpacing:4}}>SIGNAL / EXPLAINED</div>
    <div style={{marginTop:75, ...reveal(frame, 8, fps)}}>
      <div style={{fontSize:25, color:C.grey, letterSpacing:2, fontWeight:600}}>THE QUESTION</div>
      <div style={{fontSize:70, lineHeight:1.05, letterSpacing:-3, fontWeight:900, marginTop:20, color:C.ivory}}>
        WHAT CAN<br/>AI <span style={{color:C.accent}}>REMEMBER?</span>
      </div>
    </div>
    <div style={{marginTop:90, ...reveal(frame, 23, fps)}}>
      <Wave />
      <div style={{marginTop:15, fontSize:26, color:C.grey, lineHeight:1.45, maxWidth:490}}>A visual explainer of context windows — not a live news report.</div>
    </div>
    <div style={{position:'absolute', left:54, bottom:70, right:54, borderTop:'1px solid #4D5B51', paddingTop:22, fontSize:19, letterSpacing:2, color:C.grey}}>01 / THE HOOK</div>
  </div>;
};

const Editorial: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const high1 = value(frame, [198, 230], [0, 1]);
  const high2 = value(frame, [236, 264], [0, 1]);
  const fade = reveal(frame, 180, fps);
  return <div style={{
    position:'absolute', left:870, top:252, width:690, height:1060,
    backgroundColor:C.paper, color:C.ink, borderRadius:6, padding:'66px 58px',
    boxSizing:'border-box', boxShadow: '0 16px 45px rgba(0,0,0,0.16)',
  }}>
    <div style={{display:'flex', justifyContent:'space-between', fontSize:19, fontWeight:800, letterSpacing:2}}>
      <span>THE EXPLAINER</span><span>VOL. 001</span>
    </div>
    <div style={{height:2, backgroundColor:C.ink, margin:'28px 0 54px'}}/>
    <div style={{...fade}}>
      <div style={{fontSize:23, letterSpacing:2, fontWeight:700, color:'#5E6660'}}>ONE CONCEPT / CLEARLY TOLD</div>
      <div style={{fontSize:65, fontFamily:'Georgia, serif', fontWeight:700, lineHeight:1.08, letterSpacing:-2.2, marginTop:25}}>
        Context<br/>windows,<br/><span style={{fontStyle:'italic'}}>explained.</span>
      </div>
    </div>
    <div style={{height:2, backgroundColor:'#C9CDC1', margin:'60px 0 48px'}}/>
    <div style={{fontFamily:'Georgia, serif', fontSize:33, lineHeight:1.46, color:C.ink}}>
      <span>A context window is the</span><br/>
      <span style={{position:'relative', display:'inline-block'}}>
        <span style={{position:'absolute', zIndex:0, top:9, left:-7, width:`${100*high1}%`, height:36, backgroundColor:C.highlight, transform:'rotate(-1deg)', transformOrigin:'left center'}}/>
        <span style={{position:'relative', zIndex:1}}>information an AI model</span>
      </span><br/>
      <span style={{position:'relative', display:'inline-block'}}>
        <span style={{position:'absolute', zIndex:0, top:9, left:-7, width:`${100*high2}%`, height:36, backgroundColor:C.highlight, transform:'rotate(.7deg)', transformOrigin:'left center'}}/>
        <span style={{position:'relative', zIndex:1}}>can consider in one request.</span>
      </span>
    </div>
    <div style={{position:'absolute', bottom:70, left:58, right:58}}>
      <div style={{height:1, backgroundColor:'#B6BCB1', marginBottom:23}}/>
      <div style={{fontSize:18, letterSpacing:2, fontWeight:700, color:'#71796E'}}>DEMO COPY · NOT SOURCED NEWS</div>
    </div>
  </div>;
};

const Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const steps = [
    {num:'01', label:'PROMPT', detail:'Your request'},
    {num:'02', label:'CONTEXT', detail:'Available information'},
    {num:'03', label:'ANSWER', detail:'The model response'},
  ];
  return <div style={{
    position:'absolute', left:1688, top:255, width:720, height:1050,
    borderRadius:14, backgroundColor:C.dark, color:C.ivory,
    border:'2px solid #39453E', boxSizing:'border-box', padding:'59px 58px',
  }}>
    <div style={{fontSize:22, color:C.accent, letterSpacing:4, fontWeight:800}}>ONE CONNECTED STORY</div>
    <div style={{fontSize:66, fontWeight:900, letterSpacing:-3.5, marginTop:50, lineHeight:1.06}}>
      FROM INPUT<br/>TO <span style={{color:C.accent}}>OUTPUT.</span>
    </div>
    <div style={{fontSize:24, color:C.grey, marginTop:20, lineHeight:1.45}}>Why context matters in one simple flow.</div>
    <div style={{position:'relative', marginTop:58}}>
      <div style={{position:'absolute', left:41, top:30, width:3, height:310, backgroundColor:'#4C5D4E'}}/>
      {steps.map((step, i) => {
        const t = frame - (348 + i * 17);
        const motion = spring({fps, frame:Math.max(0,t), config:{damping:160, stiffness:105}});
        const opacity = value(t,[0,13],[0,1]);
        return <div key={step.num} style={{display:'flex', gap:36, alignItems:'center', height:139, opacity, translate:`${(1-motion)*65}px 0`}}>
          <div style={{zIndex:1, width:86, height:86, borderRadius:100, border:'2px solid #667866', backgroundColor: i===1?C.accent:C.dark2, display:'flex', alignItems:'center', justifyContent:'center', color:i===1?C.ink:C.ivory, fontWeight:900, fontSize:25}}>{step.num}</div>
          <div><div style={{fontSize:30, letterSpacing:1, fontWeight:900}}>{step.label}</div><div style={{fontSize:23, color:C.grey, marginTop:6}}>{step.detail}</div></div>
        </div>;
      })}
    </div>
    <div style={{position:'absolute', bottom:65, left:58, right:58, color:C.grey, fontSize:19, borderTop:'1px solid #475A4D', paddingTop:22, letterSpacing:2}}>03 / THE TAKEAWAY</div>
  </div>;
};

const World: React.FC = () => {
  const frame=useCurrentFrame();
  // One shared camera sweeps a connected editorial world: no disconnected slide swaps.
  const key=[0, 24, 133, 185, 297, 348, 479];
  const cx=value(frame,key,[423,423,423,1215,1215,2045,2045]);
  const cy=value(frame,key,[775,775,775,775,775,775,775]);
  const zoom=value(frame,key,[.96,.99,.99,.90,.90,.91,.93]);
  const x=360-cx*zoom, y=640-cy*zoom;
  const markerX = value(frame,[130,186,297,350],[770,890,1580,1680]);
  return <div style={{
    position:'absolute', width:2550,height:1550,
    transform:`translate(${x}px, ${y}px) scale(${zoom})`,
    transformOrigin:'0 0',
    backgroundColor:C.bg,
  }}>
    <div style={{position:'absolute', left:180, top:1370, right:160, borderTop:'2px dashed #3F5045'}} />
    <div style={{position:'absolute', left:markerX, top:1365, width:15, height:15, backgroundColor:C.accent, borderRadius:99}}/>
    <Intro/>
    <Editorial/>
    <Pipeline/>
  </div>;
};
const Video: React.FC = () => {
  const frame=useCurrentFrame();
  const duration=useVideoConfig().durationInFrames;
  return <AbsoluteFill style={{backgroundColor:C.bg,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
    <World/>
    <div style={{position:'absolute', top:0,left:0,right:0,height:12,backgroundColor:'#272F2B'}}>
      <div style={{width:`${Math.min(100,(frame+1)/duration*100)}%`,height:'100%',backgroundColor:C.accent}}/>
    </div>
    <div style={{position:'absolute', left:40,bottom:35,right:40,display:'flex',justifyContent:'space-between',fontSize:16,letterSpacing:2,color:C.grey,fontWeight:700}}>
      <span>REMOTION / SKILL TEST</span><span>{String(Math.floor(frame/30)).padStart(2,'0')}s</span>
    </div>
    <Audio src={staticFile('sfx/sample.wav')} volume={0.35}/>
  </AbsoluteFill>;
};
export const RemotionRoot:React.FC=()=>(
  <Composition id="TechNewsPreview" component={Video} fps={30} durationInFrames={480} width={720} height={1280}/>
);
