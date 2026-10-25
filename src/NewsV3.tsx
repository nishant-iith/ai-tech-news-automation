import React from 'react';
import {AbsoluteFill, Audio, Composition, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

/** V3 editorial reel: all dates shown are dates of reported events, not necessarily last 24 hours. */
const stories = [
  {brand:'MOONSHOT AI', date:'OCT 24', headline:'KIMI K3.1 PRO', punch:'1 MILLION TOKENS', detail:'Moonshot released Kimi K3.1 Pro, with a million-token context window and open weights promised for November fourth.', source:'REUTERS · OCT 24', icon:'01', theme:'#C9FA7E'},
  {brand:'OPENAI', date:'OCT 24 REPORT', headline:'$30B FUNDRAISE?', punch:'$1.25T VALUATION', detail:'Reports say OpenAI is seeking up to thirty billion dollars in fresh financing. The terms are not yet final.', source:'CNBC REPORT / SECONDARY COVERAGE', icon:'02', theme:'#81E4F2'},
  {brand:'OPENAI SECURITY', date:'OCT 23–24 COVERAGE', headline:'TRAINING LOCKDOWN', punch:'SAFETY FIRST', detail:'OpenAI described tighter training isolation after a configuration mistake gave a research model limited internet access in September.', source:'INDIAN EXPRESS · OCT 24', icon:'03', theme:'#F6CD7C'},
  {brand:'DEEPSEEK', date:'OCT 24 REPORT', headline:'AI FUNDING RACE', punch:'NEARLY $16B', detail:'Reports say DeepSeek raised nearly sixteen billion dollars. It is another sign that the global AI investment race is accelerating.', source:'SOPHIC CAPITAL ROUNDUP · OCT 24', icon:'04', theme:'#DAA8FF'},
  {brand:'ANTHROPIC', date:'OCT 22', headline:'CODE WITH PROOFS', punch:'123 LIBRARIES', detail:'Anthropic says Claude helped formally verify properties of software across one hundred twenty three open-source libraries, under specific assumptions.', source:'ANTHROPIC RESEARCH · OCT 22', icon:'05', theme:'#FAA99B'},
];
const fps=30, storyFrames=450, introFrames=120, outroFrames=105;
const total=introFrames+stories.length*storyFrames+outroFrames;
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const inter=(v:number,a:number[],b:number[])=>interpolate(v,a,b,{...clamp,easing:Easing.inOut(Easing.cubic)});
const Lines:React.FC<{color:string}>=({color})=>{const f=useCurrentFrame();return <div style={{position:'absolute',inset:-300,transform:`rotate(-19deg) translateX(${Math.sin(f/95)*90}px)`,opacity:.12,display:'flex',gap:44}}>{Array.from({length:24},(_,i)=><div key={i} style={{flex:'0 0 3px',background:i%4===0?color:'#9BB2A7',height:'220%'}}/>)}</div>};
const Badge:React.FC<{children:React.ReactNode,color:string}>=({children,color})=><div style={{border:`2px solid ${color}`,color,padding:'14px 21px',fontSize:24,fontWeight:900,letterSpacing:3,display:'inline-block',borderRadius:6}}>{children}</div>;
const Segment:React.FC<{story:typeof stories[number];index:number}>=({story,index})=>{
 const f=useCurrentFrame();const {fps:rate}=useVideoConfig();const rise=spring({fps:rate,frame:f,config:{damping:23,stiffness:95}});const x=inter(f,[0,95,370,450],[125,0,-20,-85]);const zoom=inter(f,[0,440],[1,1.13]);
 return <AbsoluteFill style={{background:'#101619',color:'#F5F4EC',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
  <Lines color={story.theme}/>
  <div style={{position:'absolute',left:-190,top:100,width:850,height:850,borderRadius:850,border:`85px solid ${story.theme}`,opacity:.095,transform:`translateX(${x}px) scale(${zoom})`}}/>
  <div style={{position:'absolute',left:65,top:115,right:65,display:'flex',justifyContent:'space-between',alignItems:'center'}}><Badge color={story.theme}>{story.brand}</Badge><span style={{fontWeight:900,letterSpacing:2,fontSize:24,color:'#D0D9D1'}}>{story.date}</span></div>
  <div style={{position:'absolute',top:295,left:65,right:65,transform:`translateY(${(1-rise)*110}px)`,opacity:Math.min(1,rise)}}>
    <div style={{fontSize:145,fontWeight:900,letterSpacing:-8,color:story.theme,lineHeight:1}}>{story.icon}<span style={{fontSize:48,verticalAlign:'top',marginLeft:18}}> / 05</span></div>
    <div style={{fontWeight:900,fontSize:77,lineHeight:1.08,letterSpacing:-3,marginTop:65}}>{story.headline}</div>
    <div style={{marginTop:60,background:story.theme,color:'#0C1618',fontWeight:900,fontSize:35,padding:'22px 24px',display:'inline-block',transform:`skewX(-3deg) scaleX(${inter(f,[15,30],[0.8,1])})`}}>{story.punch}</div>
  </div>
  <div style={{position:'absolute',bottom:246,left:65,right:65,borderTop:'2px solid #54615E',paddingTop:42,opacity:inter(f,[24,47],[0,1])}}>
   <div style={{fontSize:32,lineHeight:1.42,fontWeight:600,color:'#DCE4DE'}}>{story.detail}</div>
  </div>
  <div style={{position:'absolute',bottom:112,left:65,right:65,fontSize:20,color:'#A9B7B0',fontWeight:800,letterSpacing:2}}>{story.source}</div>
  <div style={{position:'absolute',bottom:55,left:65,right:65,height:6,background:'#39433E'}}><div style={{height:'100%',width:`${Math.min(100,f/storyFrames*100)}%`,background:story.theme}}/></div>
  <Audio src={staticFile(`v3/${index+1}.mp3`)} volume={1}/>
 </AbsoluteFill>
};
const Title:React.FC<{outro?:boolean}>=({outro=false})=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:'#0D1415',fontFamily:'Arial, Helvetica, sans-serif',color:'#F5F4EF',justifyContent:'center',padding:65,boxSizing:'border-box',overflow:'hidden'}}>
 <Lines color="#C9FA7E"/><div style={{zIndex:1,opacity:inter(f,[0,20],[0,1]),transform:`translateY(${inter(f,[0,22],[80,0])}px)`}}>
 <div style={{color:'#C9FA7E',fontWeight:900,letterSpacing:6,fontSize:25}}>SIGNAL / AI NEWS</div>
 <div style={{fontSize:outro?95:116,lineHeight:1.02,fontWeight:900,letterSpacing:-6,marginTop:28}}>{outro?'STAY AHEAD.':'5 AI STORIES.'}</div>
 <div style={{fontSize:outro?37:46,color:'#C9FA7E',marginTop:35,fontWeight:900}}>{outro?'FOLLOW FOR THE NEXT BRIEFING':'OCTOBER 25, 2026'}</div>
 <div style={{fontSize:25,lineHeight:1.5,marginTop:60,color:'#B4C1BA'}}>{outro?'Sources and original dates in the video.':'Latest briefing • Original publication dates shown for accuracy.'}</div></div>
 <Audio src={staticFile(outro?'v3/outro.mp3':'v3/intro.mp3')}/>
 </AbsoluteFill>};
const Reel:React.FC=()=> <AbsoluteFill style={{background:'#101619'}}>
 <Sequence from={0} durationInFrames={introFrames}><Title/></Sequence>
 {stories.map((story,i)=><Sequence key={story.icon} from={introFrames+i*storyFrames} durationInFrames={storyFrames}><Segment story={story} index={i}/></Sequence>)}
 <Sequence from={introFrames+stories.length*storyFrames} durationInFrames={outroFrames}><Title outro/></Sequence>
 </AbsoluteFill>;
export const NewsV3Root:React.FC=()=> <Composition id="NewsV3" component={Reel} fps={fps} durationInFrames={total} width={720} height={1280}/>;
