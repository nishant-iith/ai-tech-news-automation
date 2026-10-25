import React from 'react';
import {AbsoluteFill, Audio, Composition, Easing, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timing from './v4-timing.json';

// Minimalist editorial visuals only; unchanged V4 narration/timings.
// All news claims are test content and require verification before publishing.
const PAPER='#F7F6F1', INK='#171C1E', MUTED='#667172', LINE='#D7DCD8', ACCENT='#C44E33';
const anim=(f:number,x:number[],y:number[])=>interpolate(f,x,y,{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
const articles=[
 {who:'MOONSHOT',topic:'LONG CONTEXT',name:'Kimi K3.1 Pro'},
 {who:'OPENAI',topic:'THE MONEY',name:'Funding talks'},
 {who:'OPENAI',topic:'SAFEGUARDS',name:'Training security'},
 {who:'DEEPSEEK',topic:'THE FUNDING RACE',name:'AI investment'},
 {who:'ANTHROPIC',topic:'FORMAL VERIFICATION',name:'Proving code'},
];
type Segment=typeof timing.sections[number];
const Fade:React.FC<{children:React.ReactNode;delay?:number}>=({children,delay=0})=>{const f=useCurrentFrame();return <div style={{opacity:anim(f,[delay,delay+13],[0,1]),transform:'translateY('+anim(f,[delay,delay+23],[36,0])+'px)'}}>{children}</div>};
const Paper:React.FC<{children:React.ReactNode;index?:number}>=({children,index})=><AbsoluteFill style={{background:PAPER,color:INK,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
 <div style={{position:'absolute',top:92,left:73,right:73,fontSize:24,fontWeight:900,letterSpacing:3,display:'flex',justifyContent:'space-between'}}>
 <span>SIGNAL <span style={{color:ACCENT}}>/</span> AI NEWS</span><span>{index===undefined?'25 OCT 2026':String(index+1).padStart(2,'0')+' / 05'}</span></div>
 <div style={{position:'absolute',top:158,left:73,right:73,height:3,background:INK}}/>
 {children}
 <div style={{position:'absolute',bottom:86,left:73,right:73,display:'flex',justifyContent:'space-between',fontSize:19,letterSpacing:2.5,fontWeight:800,color:MUTED}}>
 <span>TECH IN 60 SECONDS</span><span>VISUAL TEST · V6</span></div>
 </AbsoluteFill>;
const Title:React.FC<{index:number}>=({index})=>{const a=articles[index];return <div style={{position:'absolute',top:228,left:74,right:74}}>
 <div style={{fontSize:23,color:ACCENT,letterSpacing:4,fontWeight:900,marginBottom:23}}>{a.who+' · '+a.topic}</div>
 <div style={{fontSize:77,fontWeight:900,letterSpacing:-3,lineHeight:1}}>{a.name}</div>
 </div>};
const Large:React.FC<{tag:string;big:string;description?:string;size?:number}>=({tag,big,description,size=133})=><div style={{width:'100%'}}>
 <div style={{fontSize:24,letterSpacing:3.5,color:ACCENT,fontWeight:900,marginBottom:32}}>{tag}</div>
 <Fade><div style={{fontSize:size,fontWeight:900,lineHeight:1,letterSpacing:-5,whiteSpace:'pre-line'}}>{big}</div></Fade>
 {description&&<Fade delay={9}><div style={{fontSize:35,color:MUTED,lineHeight:1.35,marginTop:38,fontWeight:600}}>{description}</div></Fade>}
 </div>;
const Pages:React.FC=()=>{const f=useCurrentFrame();return <svg width="100%" viewBox="0 0 930 450">
 <rect x="646" y="70" width="213" height="302" rx="11" fill="none" stroke={INK} strokeWidth="6"/>
 <text x="753" y="160" fill={INK} fontSize="27" fontWeight="800" textAnchor="middle">MODEL</text>
 {[0,1,2].map(i=><rect key={i} x="689" y={209+i*43} width={127-i*18} height="10" fill={ACCENT}/>)}
 <path d="M40 218 H625" stroke={LINE} strokeWidth="8" strokeDasharray="19 15"/>
 {[0,1,2,3,4].map(i=><g key={i} transform={'translate('+(24+(i*142+f*4)%567)+',166)'}>
 <rect width="70" height="98" rx="6" fill={PAPER} stroke={INK} strokeWidth="4"/>
 {[28,43,58,73].map(y=><line key={y} x1="13" y1={y} x2="53" y2={y} stroke={ACCENT} strokeWidth="4"/>)}
 </g>)}
 <path d="M612 200 l21 18 -21 18" stroke={ACCENT} strokeWidth="7" fill="none"/>
 </svg>};
const Tokens:React.FC=()=>{const f=useCurrentFrame();return <>
 <Large tag="THE CONTEXT WINDOW" big="1,000,000" description="tokens · claimed capacity" size={148}/>
 <div style={{display:'flex',gap:8,marginTop:68}}>{Array.from({length:34},(_,i)=><div key={i} style={{flex:1,height:39,background:i/34<anim(f,[0,70],[0,1])?ACCENT:LINE}}/>)}</div>
 </>};
const Dates:React.FC=()=>{const f=useCurrentFrame();return <>
 <Large tag="RELEASE ROADMAP" big="NOV 04" description="Open weights promised for November 4" size={146}/>
 <svg viewBox="0 0 930 150" width="100%" style={{marginTop:70}}>
 <path d="M50 65 H878" stroke={LINE} strokeWidth="9"/>
 <path d={'M50 65 H'+(50+828*anim(f,[0,65],[0,1]))} stroke={ACCENT} strokeWidth="9"/>
 <circle cx="50" cy="65" r="16" fill={INK}/><circle cx="878" cy="65" r="16" fill={ACCENT}/>
 <text x="50" y="121" fontSize="27" fontWeight="800" fill={MUTED}>OCT 25</text>
 <text x="878" y="121" fontSize="27" textAnchor="end" fontWeight="800" fill={INK}>NOV 04</text>
 </svg></>};
const Money:React.FC<{valuation?:boolean}>=({valuation=false})=><>
 <Large tag={valuation?'REPORTED VALUATION':'REPORTED FUNDING TALKS'} big={valuation?'$1.25T':'$30B'} description={valuation?'One-point-two-five trillion dollars':'Potential financing · not a completed deal'} size={180}/>
 <div style={{display:'flex',gap:12,marginTop:85}}>{Array.from({length:8},(_,i)=><div key={i} style={{width:100,height:10,background:i<5?ACCENT:LINE}}/>)}</div>
 </>;
const Lock:React.FC<{active?:boolean}>=({active=false})=>{const f=useCurrentFrame();return <svg viewBox="0 0 930 530" width="100%">
 <rect x="274" y="65" width="411" height="401" rx="14" fill="none" stroke={INK} strokeWidth="7"/>
 <rect x="316" y="103" width="326" height="327" rx="10" fill="#E7E9E3"/>
 <path d="M420 251 V215 Q420 153 481 153 Q538 153 538 215 V251" stroke={INK} strokeWidth="13" fill="none"/>
 <rect x="394" y="251" width="175" height="135" rx="12" fill={INK}/>
 <circle cx="481" cy="305" r="15" fill={PAPER}/><path d="M481 320 v29" stroke={PAPER} strokeWidth="10"/>
 {[0,1,2].map(i=>{const y=135+i*133;return <g key={i}>
 <circle cx="100" cy={y} r="22" fill={active&&i===1?ACCENT:INK}/>
 <line x1="126" y1={y} x2="262" y2={y} stroke={active&&i===1?ACCENT:LINE} strokeWidth="7" strokeDasharray="16 13"/>
 <path d={'M211 '+(y-19)+' l37 38 M248 '+(y-19)+' l-37 38'} stroke={ACCENT} strokeWidth="6" opacity={anim(f,[3,23],[0,1])}/>
 </g>})}
 </svg>};
const Scale:React.FC=()=>{const f=useCurrentFrame();return <svg viewBox="0 0 930 440" width="100%">
 {[0,1,2,3,4,5].map(i=><rect key={i} x={81+i*135} y={373-(i+1)*53*anim(f,[0,62],[0,1])} width="86" height={(i+1)*53*anim(f,[0,62],[0,1])} fill={i===5?ACCENT:INK}/>)}
 <path d="M90 270 L285 196 L449 229 L645 108 L822 49" stroke={ACCENT} fill="none" strokeWidth="9" strokeDasharray={(1120*anim(f,[0,60],[0,1]))+' 1120'}/>
 <path d="M784 41 L830 48 L813 90" stroke={ACCENT} strokeWidth="8" fill="none"/>
 </svg>};
const SourceCode:React.FC=()=>{const f=useCurrentFrame();return <div style={{borderTop:'3px solid '+INK,borderBottom:'3px solid '+INK,padding:'38px 16px'}}>
 {['check(property_01)','check(property_02)','check(property_03)','check(property_04)'].map((s,i)=><div key={i} style={{fontSize:36,fontFamily:'monospace',letterSpacing:-1,display:'flex',justifyContent:'space-between',lineHeight:2.3}}>
 <span>{s}</span><span style={{color:ACCENT,opacity:anim(f,[i*11,i*11+15],[0,1])}}>✓</span></div>)}</div>};
const Visual:React.FC<{index:number;beat:number}>=({index,beat})=>{
 const stage:React.CSSProperties={position:'absolute',top:515,left:74,right:74,height:745,display:'flex',flexDirection:'column',justifyContent:'center',overflow:'hidden'};
 let visual:React.ReactNode;
 if(index===0)visual=beat===0?<><div style={{fontSize:47,fontWeight:900,marginBottom:48}}>Documents into one context</div><Pages/></>:beat===1?<Tokens/>:<Dates/>;
 else if(index===1)visual=beat===0?<Money/>:beat===1?<Money valuation/>:<Large tag="IMPORTANT" big={'TERMS\nNOT FINAL'} description="Reported figures · unconfirmed" size={131}/>;
 else if(index===2)visual=<><div style={{fontSize:48,fontWeight:900,marginBottom:25}}>{beat===0?'Isolated model access':beat===1?'Controlled boundaries':'Limited internet access'}</div><Lock active={beat===2}/></>;
 else if(index===3)visual=beat===0?<Large tag="REPORTED FUNDING" big="~$16B" description="DeepSeek · test news claim" size={170}/>:<><Large tag={beat===1?'GLOBAL INVESTMENT':'THE BIGGER PICTURE'} big={beat===1?'CAPITAL':'AI FUNDING'} description="Competition for investment is growing" size={112}/><div style={{marginTop:25}}><Scale/></div></>;
 else visual=beat===0?<><Large tag="CLAUDE · REPORTED USE" big="CODE PROOFS" description="Checking specified software properties" size={105}/><div style={{marginTop:35}}><SourceCode/></div></>:beat===1?<Large tag="REPORTED SCOPE" big="123" description="open-source libraries" size={210}/>:<><Large tag="AN IMPORTANT LIMIT" big="NOT A\nBLANKET GUARANTEE" description="Formal proofs have explicit assumptions" size={88}/><div style={{marginTop:30}}><SourceCode/></div></>;
 return <div style={stage}>{visual}</div>;
};
const Captions:React.FC<{segment:Segment}>=({segment})=>{const f=useCurrentFrame();const n=segment.chunks.reduce((a,c,i)=>f>=c.start?i:a,0);const s=segment.chunks[n];return <div style={{position:'absolute',top:1380,left:74,right:74,borderTop:'3px solid '+LINE,paddingTop:45}}>
 <div style={{fontSize:52,fontWeight:850,lineHeight:1.22,letterSpacing:-1,minHeight:215}}>{s.text}</div>
 <div style={{height:6,background:LINE,marginTop:26}}><div style={{height:'100%',background:ACCENT,width:Math.min(100,Math.max(0,(f-s.start)/Math.max(1,s.frames)*100))+'%'}}/></div>
 </div>};
const Story:React.FC<{index:number;segment:Segment}>=({index,segment})=><Paper index={index}>
 <Title index={index}/>
 {segment.chunks.map((c,i)=>{const end=segment.chunks[i+1]?.start??segment.frames;return <Sequence key={i} from={c.start} durationInFrames={Math.max(1,end-c.start)}><Visual index={index} beat={Math.min(i,2)}/></Sequence>})}
 <Captions segment={segment}/>
 <Audio src={staticFile('v4/'+(index+1)+'.wav')}/>
 </Paper>;
const Opening:React.FC<{segment:Segment;end?:boolean}>=({segment,end=false})=><Paper>
 <div style={{position:'absolute',top:440,left:74,right:74}}>
 <Fade><div style={{fontSize:31,fontWeight:900,letterSpacing:4,color:ACCENT,marginBottom:54}}>{end?'THAT’S THE BRIEFING':'THE DAILY BRIEFING'}</div></Fade>
 <Fade delay={5}><div style={{fontSize:153,fontWeight:900,letterSpacing:-8,lineHeight:1,whiteSpace:'pre-line'}}>{end?'STAY\nCURIOUS.':'FIVE\nAI STORIES.'}</div></Fade>
 <Fade delay={14}><div style={{width:256,height:11,background:ACCENT,marginTop:75}}/><div style={{fontSize:36,fontWeight:800,marginTop:59}}>{end?'FOLLOW FOR MORE':'OCTOBER 25, 2026'}</div></Fade>
 </div>
 <Captions segment={segment}/>
 <Audio src={staticFile('v4/'+(end?6:0)+'.wav')}/>
 </Paper>;
const Video:React.FC=()=> <AbsoluteFill style={{background:PAPER}}>
 {timing.sections.map((segment,i)=><Sequence key={i} from={segment.start} durationInFrames={segment.frames}>
 {i===0?<Opening segment={segment}/>:i===6?<Opening segment={segment} end/>:<Story segment={segment} index={i-1}/>}
 </Sequence>)}
 <Audio src={staticFile('v4/bed.wav')} volume={0.12}/>
 </AbsoluteFill>;
export const NewsV6Root:React.FC=()=> <Composition id="NewsV6" component={Video} fps={timing.fps} durationInFrames={timing.totalFrames} width={1080} height={1920}/>;
