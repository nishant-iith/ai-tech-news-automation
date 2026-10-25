import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, Easing, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './v4-timing.json';

/** Editorial visuals are original schematic illustrations, NOT screenshots of real product UIs.
 * Source claims are inherited from the V3 test script and require verification before publication.
 */
const stories=[
 {company:'MOONSHOT AI',title:'KIMI K3.1 PRO',date:'OCT 24',source:'REUTERS / RECHECK BEFORE POSTING',color:'#C8F88B',tag:'CONTEXT WINDOW'},
 {company:'OPENAI',title:'FUNDING TALKS',date:'OCT 24 REPORT',source:'REPORTED / TERMS UNCONFIRMED',color:'#8DDDFB',tag:'FINANCING'},
 {company:'OPENAI',title:'TRAINING SECURITY',date:'OCT 23–24',source:'INDIAN EXPRESS / COVERAGE',color:'#F7C981',tag:'SECURITY'},
 {company:'DEEPSEEK',title:'FUNDING RACE',date:'OCT 24 REPORT',source:'SECONDARY REPORT / RECHECK',color:'#D9B6FF',tag:'AI INVESTMENT'},
 {company:'ANTHROPIC',title:'CODE VERIFICATION',date:'OCT 22',source:'ANTHROPIC RESEARCH / LIMITATIONS APPLY',color:'#FFA990',tag:'FORMAL METHODS'},
];
const ink='#0B1015', paper='#F2F5F0', muted='#A7B4AF';
const c={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ease=Easing.inOut(Easing.cubic);
const between=(v:number,x:number[],y:number[])=>interpolate(v,x,y,{...c,easing:ease});
const fadeIn=(f:number)=>between(f,[0,12],[0,1]);
const Mono:React.FC<{children:React.ReactNode;style?:React.CSSProperties}>=({children,style})=><div style={{fontFamily:'Arial, sans-serif',fontWeight:900,letterSpacing:3,...style}}>{children}</div>;
const GlowGrid:React.FC<{color:string}>=({color})=>{const f=useCurrentFrame();return <div style={{position:'absolute',inset:0,overflow:'hidden',background:ink}}>
 <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(#ffffff08 1px, transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px)',backgroundSize:'80px 80px',transform:`translate(${(f*.25)%80}px, ${(f*.1)%80}px)`}}/>
 <div style={{position:'absolute',left:-180,top:100,width:1160,height:1160,borderRadius:'50%',background:`radial-gradient(circle,${color}1A 0%,transparent 65%)`,transform:`translateY(${Math.sin(f/25)*30}px)`}}/>
 </div>};
const Panel:React.FC<{children:React.ReactNode;style?:React.CSSProperties}>=({children,style})=><div style={{borderRadius:29,background:'#142026',border:'2px solid #405058',boxShadow:'0 34px 75px #0008',...style}}>{children}</div>;
const Progress:React.FC<{value:number;color:string}>=({value,color})=><div style={{height:11,background:'#34434A',borderRadius:15,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.max(0,Math.min(100,value*100))}%`,background:color,borderRadius:15}}/></div>;
const Bubble:React.FC<{children:React.ReactNode;color:string;small?:boolean}>=({children,color,small})=><div style={{border:`2px solid ${color}`,color,padding:small?'13px 22px':'20px 29px',fontSize:small?24:28,fontWeight:900,letterSpacing:2,borderRadius:15,display:'inline-block',background:'#101B20'}}>{children}</div>;
const pulses=Array.from({length:13},(_,i)=>i);
const WindowGraphic:React.FC<{shot:number;color:string}>=({shot,color})=>{const f=useCurrentFrame();const t=between(f,[0,75],[0,1]);return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
 {shot===0?<div style={{position:'relative',width:830,transform:`perspective(1400px) rotateY(${between(f,[0,80],[10,0])}deg)`}}><Panel style={{padding:38}}>
 <div style={{display:'flex',gap:17}}>{['#FF7467','#FBC66A','#76D5A3'].map(x=><div key={x} style={{height:20,width:20,borderRadius:30,background:x}}/>)}</div>
 <Mono style={{marginTop:42,fontSize:50,color}}>KIMI K3.1</Mono><div style={{height:2,background:'#3D5157',margin:'30px 0'}}/>
 <Mono style={{fontSize:30,color:paper,letterSpacing:0}}>LONG-FORM REASONING</Mono>
 {Array.from({length:7},(_,i)=><div key={i} style={{width:`${58+(i*17)%40}%`,height:13,background:i%3===0?color:'#45585B',borderRadius:5,marginTop:25,opacity:between(f,[0,90],[.3,1])}}/>)}
 </Panel></div>:
 shot===1?<div style={{textAlign:'center'}}><Mono style={{color:muted,fontSize:34}}>CONTEXT CAPACITY</Mono>
 <div style={{fontWeight:900,fontSize:164,color,letterSpacing:-12,marginTop:45}}>{Math.round(1000000*t).toLocaleString('en-US')}</div>
 <Mono style={{fontSize:54,color:paper}}>TOKENS</Mono><div style={{width:780,marginTop:95}}><Progress value={t} color={color}/></div>
 <Mono style={{fontSize:24,color:muted,marginTop:32}}>ILLUSTRATIVE SCALE · NOT A BENCHMARK</Mono></div>:
 <div style={{textAlign:'center'}}><div style={{fontSize:180,transform:`rotate(${between(f,[0,60],[-15,0])}deg)`}}>🔓</div><Mono style={{fontSize:82,color}}>NOVEMBER 4</Mono><Mono style={{fontSize:39,color:paper,marginTop:30}}>OPEN WEIGHTS PROMISED</Mono><Mono style={{color:muted,fontSize:24,marginTop:40}}>ANNOUNCED PLAN — SUBJECT TO CHANGE</Mono></div>}
 </div>};
const FundingGraphic:React.FC<{shot:number;color:string}>=({shot,color})=>{const f=useCurrentFrame();const t=between(f,[0,65],[0,1]);return <div style={{width:900,margin:'auto',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
 {shot===0?<><Mono style={{fontSize:32,color:muted}}>REPORTED NEW FUNDING</Mono><div style={{fontWeight:900,fontSize:230,letterSpacing:-17,color}}>${Math.round(30*t)}B</div><div style={{fontSize:42,fontWeight:900,color:paper}}>UNDER DISCUSSION</div><div style={{marginTop:65}}><Bubble color={color}>NOT A COMPLETED ROUND</Bubble></div></>:
 shot===1?<><Mono style={{fontSize:32,color:muted}}>POSSIBLE VALUATION</Mono><div style={{fontSize:190,color,fontWeight:900,letterSpacing:-12,marginTop:38}}>$1.25T</div><Panel style={{marginTop:40,padding:35,width:790,boxSizing:'border-box'}}><Mono style={{fontSize:26,color:paper}}>REPORTED · NOT FINAL</Mono><div style={{marginTop:25}}><Progress value={t} color={color}/></div></Panel></>:
 <><div style={{fontSize:150,color}}>?</div><Mono style={{fontSize:78,color:paper}}>TERMS ARE</Mono><Mono style={{fontSize:100,color}}>NOT FINAL</Mono><Bubble color={color}>REPORTS ≠ CONFIRMED DEAL</Bubble></>}
 </div>};
const SecurityGraphic:React.FC<{shot:number;color:string}>=({shot,color})=>{const f=useCurrentFrame();return <div style={{width:930,height:'100%',margin:'auto',display:'flex',alignItems:'center',justifyContent:'center'}}>
 {shot===0?<div style={{textAlign:'center'}}><div style={{fontSize:145}}>🛡️</div><Mono style={{fontSize:72,color,marginTop:25}}>MODEL TRAINING</Mono><div style={{fontSize:40,color:paper,marginTop:25}}>RESTRICTED ENVIRONMENT</div><div style={{display:'flex',gap:24,marginTop:85}}>{['ISOLATE','AUDIT','MONITOR'].map((w,i)=><Panel key={w} style={{padding:25,flex:1,textAlign:'center',borderColor:i===1?color:'#405058',color:paper,fontSize:25,fontWeight:900}}>{w}</Panel>)}</div></div>:
 shot===1?<div style={{position:'relative',width:760,height:600}}>
 {[{x:330,y:250},{x:100,y:50},{x:650,y:60},{x:120,y:500},{x:650,y:490}].map((p,i)=><div key={i} style={{position:'absolute',left:p.x,top:p.y,borderRadius:99,width:i?90:125,height:i?90:125,background:i?'#31464B':color,display:'grid',placeItems:'center',fontSize:36}}>{i?'●':'AI'}</div>)}
 <svg style={{position:'absolute',inset:0,overflow:'visible',zIndex:-1}} width="760" height="600">{[[145,95],[690,105],[155,540],[685,535]].map(([x,y],i)=><line key={i} x1="392" y1="315" x2={x} y2={y} stroke={i===2?'#FF857B':color} strokeWidth="8" strokeDasharray="16 12" strokeDashoffset={-f*2}/>)}</svg>
 <div style={{position:'absolute',top:10,left:200}}><Bubble color={color}>NETWORK ACCESS</Bubble></div></div>:
 <div style={{textAlign:'center'}}><div style={{fontSize:172}}>🔒</div><Mono style={{fontSize:89,color}}>TIGHTER</Mono><Mono style={{fontSize:89,color:paper}}>CONTROLS</Mono><div style={{marginTop:65,fontSize:30,color:muted}}>SCHEMATIC ILLUSTRATION · NO INCIDENT FOOTAGE</div></div>}
 </div>};
const DeepSeekGraphic:React.FC<{shot:number;color:string}>=({shot,color})=>{const f=useCurrentFrame();const t=between(f,[0,85],[0,1]);return <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
 {shot===0?<><Mono style={{fontSize:32,color:muted}}>REPORTED FINANCING</Mono><div style={{fontSize:224,color,fontWeight:900,letterSpacing:-17}}>$16B</div><div style={{fontSize:44,color:paper,fontWeight:900}}>NEARLY · REPORTED</div></>:
 shot===1?<div style={{width:850}}><Mono style={{fontSize:45,color:paper,marginBottom:80}}>CAPITAL FLOWS INTO AI</Mono>{[.45,.65,.82,1].map((v,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:22,marginBottom:32}}><Mono style={{width:64,color:muted,fontSize:27}}>0{i+1}</Mono><div style={{height:56,width:`${v*t*700}px`,maxWidth:700,background:i===3?color:'#4E626A',borderRadius:12}}/></div>)}<div style={{fontSize:24,color:muted}}>ILLUSTRATIVE TREND, NOT HISTORICAL FINANCIAL DATA</div></div>:
 <div style={{textAlign:'center'}}><div style={{fontSize:135,marginBottom:45}}>🌐</div><Mono style={{fontSize:84,color:paper}}>GLOBAL AI</Mono><Mono style={{fontSize:118,color}}>RACE</Mono></div>}
 </div>};
const CodeGraphic:React.FC<{shot:number;color:string}>=({shot,color})=>{const f=useCurrentFrame();const t=between(f,[0,85],[0,1]);return <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
 {shot===0?<Panel style={{width:850,padding:36}}><div style={{color:muted,fontSize:28,fontFamily:'monospace'}}>verification.ts &nbsp; ● ● ●</div>{['function checkContract(input) {','  assert(invariant(input));','  return verify(properties);','}','// proof constraints apply'].map((line,i)=><div key={i} style={{fontSize:31,marginTop:28,fontFamily:'monospace',color:i===2?color:i===4?'#849999':paper,opacity:between(f,[i*8,i*8+14],[0,1])}}>{line}</div>)}</Panel>:
 shot===1?<div style={{textAlign:'center'}}><Mono style={{fontSize:34,color:muted}}>OPEN-SOURCE LIBRARIES</Mono><div style={{fontSize:220,fontWeight:900,color,letterSpacing:-10}}>{Math.round(123*t)}</div><div style={{fontSize:40,color:paper,fontWeight:900}}>VERIFICATION CLAIM</div><div style={{marginTop:48}}><Bubble color={color}>SUBJECT TO ASSUMPTIONS</Bubble></div></div>:
 <div style={{textAlign:'center'}}><div style={{fontSize:150}}>✓</div><Mono style={{fontSize:88,color}}>FORMAL CHECKS</Mono><Mono style={{fontSize:44,color:paper,marginTop:30}}>NOT A BLANKET SAFETY GUARANTEE</Mono></div>}
 </div>};
const Viz:React.FC<{story:number;shot:number;color:string}>=({story,shot,color})=> <div style={{position:'absolute',left:65,right:65,top:400,bottom:535,overflow:'hidden'}}>
 {story===0?<WindowGraphic shot={shot} color={color}/>:story===1?<FundingGraphic shot={shot} color={color}/>:story===2?<SecurityGraphic shot={shot} color={color}/>:story===3?<DeepSeekGraphic shot={shot} color={color}/>:<CodeGraphic shot={shot} color={color}/>}
 </div>;
type SegmentInfo=typeof timing.sections[number];
const Subtitle:React.FC<{s:SegmentInfo;color:string}>=({s,color})=>{const f=useCurrentFrame();const index=[...s.chunks].reverse().findIndex((x)=>f>=x.start);if(index<0)return null;const chunk=s.chunks[s.chunks.length-1-index];const local=Math.max(0,f-chunk.start);return <div style={{position:'absolute',left:76,right:76,bottom:222,background:'#091015ED',border:'2px solid #536268',borderRadius:24,padding:'31px 30px',textAlign:'center',minHeight:132,display:'flex',justifyContent:'center',alignItems:'center',boxShadow:'0px 18px 55px #000A'}}>
 <span style={{fontSize:43,fontWeight:900,lineHeight:1.33,color:paper,letterSpacing:-.8,opacity:between(local,[0,6],[0,1])}}>{chunk.text}</span>
 <div style={{position:'absolute',bottom:0,left:0,height:7,width:`${Math.min(100,local/Math.max(chunk.frames,1)*100)}%`,background:color,borderRadius:8}}/>
 </div>};
const Story:React.FC<{idx:number;s:SegmentInfo}>=({idx,s})=>{const f=useCurrentFrame();const meta=stories[idx];return <AbsoluteFill style={{fontFamily:'Arial, Helvetica, sans-serif',background:ink,overflow:'hidden',color:paper}}>
 <GlowGrid color={meta.color}/>
 <div style={{position:'absolute',left:75,right:75,top:125,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
 <Bubble color={meta.color} small>{meta.company}</Bubble><Mono style={{color:muted,fontSize:24}}>{meta.date}</Mono></div>
 <div style={{position:'absolute',left:75,right:75,top:255}}><Mono style={{fontSize:68,lineHeight:1.0,color:paper,letterSpacing:-2.5}}>{meta.title}</Mono><div style={{marginTop:25,color:meta.color,fontSize:24,fontWeight:900,letterSpacing:5}}>{meta.tag}</div></div>
 {/* Each shot is an independent Remotion sequence; its animation runs with its own local clock. */}
 {s.chunks.map((ch,i)=>{const next=s.chunks[i+1];const duration=next?Math.max(1,next.start-ch.start):Math.max(1,s.frames-ch.start);return <Sequence from={ch.start} durationInFrames={duration} key={'viz'+i}><Shot idx={idx} shot={i} color={meta.color}/></Sequence>})}
 <Subtitle s={s} color={meta.color}/>
 <div style={{position:'absolute',bottom:142,left:75,right:75,display:'flex',justifyContent:'space-between',alignItems:'center'}}><Mono style={{fontSize:21,color:muted,letterSpacing:1.6}}>{meta.source}</Mono><Mono style={{fontSize:26,color:meta.color}}>{String(idx+1).padStart(2,'0')}/05</Mono></div>
 <div style={{position:'absolute',bottom:80,left:75,right:75}}><Progress value={f/s.frames} color={meta.color}/></div>
 <Audio src={staticFile('v4/'+(idx+1)+'.wav')} volume={1}/>
 </AbsoluteFill>};
const Shot:React.FC<{idx:number;shot:number;color:string}>=({idx,shot,color})=>{const f=useCurrentFrame();const a=fadeIn(f);return <div style={{position:'absolute',inset:0,opacity:a,transform:`translateY(${between(f,[0,16],[32,0])}px)`}}><Viz story={idx} shot={shot} color={color}/></div>};
const Title:React.FC<{outro:boolean;s:SegmentInfo}>=({outro,s})=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:ink,color:paper,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
 <GlowGrid color="#C8F88B"/><div style={{position:'absolute',left:77,right:77,top:350}}>
 <Mono style={{fontSize:38,color:'#C8F88B'}}>SIGNAL / AI BRIEFING</Mono><div style={{marginTop:70,fontSize:outro?117:159,letterSpacing:-8,fontWeight:900,lineHeight:1}}>{outro?'STAY\nCURIOUS.':'5 AI\nSTORIES.'}</div><Mono style={{fontSize:44,color:'#C8F88B',marginTop:60}}>{outro?'FOLLOW FOR MORE':'OCTOBER 25 · ENGLISH'}</Mono>
 <div style={{height:8,background:'#C8F88B',marginTop:100,width:`${between(f,[0,s.frames],[0,100])}%`}}/></div>
 <Subtitle s={s} color="#C8F88B"/><Audio src={staticFile('v4/'+(outro?'6':'0')+'.wav')}/></AbsoluteFill>};
const Reel:React.FC=()=> <AbsoluteFill style={{background:ink}}>
 {timing.sections.map((s,i)=><Sequence key={i} from={s.start} durationInFrames={s.frames}>{i===0?<Title s={s} outro={false}/>:i===6?<Title s={s} outro/>:<Story idx={i-1} s={s}/>}</Sequence>)}
 <Audio src={staticFile('v4/bed.wav')} volume={0.18}/>
 </AbsoluteFill>;
export const NewsV4Root:React.FC=()=> <Composition id="NewsV4" component={Reel} fps={timing.fps} durationInFrames={timing.totalFrames} width={1080} height={1920}/>;
