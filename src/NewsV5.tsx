import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, interpolate, Easing, staticFile, useCurrentFrame} from 'remotion';
import timing from './v4-timing.json';

// V5 uses V4's approved voice, phrase timings, and script unchanged.
// Pexels imagery is illustrative B-roll, NOT footage of named companies or their products.
// All editorial claims are inherited test copy and MUST be verified before publication.
const stories=[
 {company:'MOONSHOT AI',title:'KIMI K3.1 PRO',date:'OCT 24',color:'#C8F88B',accent:'LONG CONTEXT',label:'01',source:'REUTERS · CLAIM RECHECK REQUIRED'},
 {company:'OPENAI',title:'FUNDING TALKS',date:'OCT 24 REPORT',color:'#97D6DD',accent:'THE FUNDING RACE',label:'02',source:'REPORTS · TERMS UNCONFIRMED'},
 {company:'OPENAI',title:'TRAINING SECURITY',date:'OCT 23–24',color:'#E9CA85',accent:'MODEL ISOLATION',label:'03',source:'COVERAGE · CLAIM RECHECK REQUIRED'},
 {company:'DEEPSEEK',title:'AI INVESTMENT',date:'OCT 24 REPORT',color:'#D8BDF0',accent:'CAPITAL AT SCALE',label:'04',source:'REPORTS · CLAIM RECHECK REQUIRED'},
 {company:'ANTHROPIC',title:'PROVING CODE',date:'OCT 22',color:'#E7A995',accent:'SOFTWARE VERIFICATION',label:'05',source:'ANTHROPIC · LIMITATIONS APPLY'},
];
const dark='#10181D', light='#F7F5EF', mut='#A7B2AE';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const tween=(f:number,x:number[],y:number[])=>interpolate(f,x,y,{...clamp,easing:Easing.inOut(Easing.cubic)});
const caps=(s:React.ReactNode,style:React.CSSProperties={})=><div style={{fontFamily:'Arial, Helvetica, sans-serif',fontWeight:900,letterSpacing:2,...style}}>{s}</div>;
// Original programmatic visuals only; no stock images, invented screenshots, or remote B-roll.
const VisualWorld:React.FC<{idx:number;darken?:number}>=({idx,darken=.28})=>{
 const f=useCurrentFrame(), color=stories[idx].color;
 const progress=tween(f,[0,110],[0,1]);
 return <AbsoluteFill style={{background:'#0C171C',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(#ffffff10 1px,transparent 1px),linear-gradient(90deg,#ffffff10 1px,transparent 1px)',backgroundSize:'84px 84px',transform:'translate('+(-f*.28)+'px,'+(-f*.14)+'px)'}}/>
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position:'absolute',inset:0}}>
   {idx===0&&<g>
    <rect x="120" y="470" width="840" height="740" rx="20" fill="#193038" stroke={color} strokeWidth="5"/>
    {Array.from({length:42},(_,i)=><g key={i}>
     <rect x={155+i%7*111} y={530+Math.floor(i/7)*100} width="85" height="65" rx="6" fill={i/42<progress?color:'#4A6970'} opacity={i/42<progress?.86:.35}/>
     <path d={'M'+(167+i%7*111)+' '+(554+Math.floor(i/7)*100)+' h54'} stroke="#173338" strokeWidth="8"/></g>)}
    <path d="M540 1210 V1510" stroke={color} strokeWidth="12" strokeDasharray="35 25" strokeDashoffset={-f*3}/>
   </g>}
   {idx===1&&<g>
    {Array.from({length:12},(_,i)=>{const angle=i*Math.PI/6+f*.003,rad=340;
     const x=540+rad*Math.cos(angle),y=940+rad*Math.sin(angle);
     return <g key={i}><line x1="540" y1="940" x2={x} y2={y} stroke={color} strokeWidth="5" opacity=".5"/><circle cx={x} cy={y} r="25" fill={color}/></g>})}
    <circle cx="540" cy="940" r={115+30*progress} fill="#1A3039" stroke={color} strokeWidth="10"/>
    <circle cx="540" cy="940" r="52" fill={color}/>
   </g>}
   {idx===2&&<g>
    {Array.from({length:7},(_,i)=><g key={i}><rect x={95+i*132} y="660" width="100" height="100" rx="12" fill="#36565F" stroke={color} strokeWidth="4"/><line x1={145+i*132} y1="760" x2="540" y2="1130" stroke={color} strokeWidth="4" opacity=".4"/></g>)}
    <rect x="360" y="920" width="360" height="420" rx="22" fill="#152A30" stroke={color} strokeWidth="9"/>
    <path d="M425 1130 L510 1210 L665 1015" stroke={color} strokeWidth="21" strokeDasharray={(480*progress)+' 480'} fill="none"/>
   </g>}
   {idx===3&&<g>
    {Array.from({length:9},(_,i)=><rect key={i} x={80+i*104} y={1470-(290+i*73)*progress} width="77" height={Math.max(2,(290+i*73)*progress)} fill={i===8?color:'#72919C'} opacity=".82"/>)}
    <path d="M95 980 Q320 670 540 860 T980 480" fill="none" stroke={color} strokeWidth="14" strokeDasharray="35 23" strokeDashoffset={-f*3}/>
   </g>}
   {idx===4&&<g>
    <rect x="110" y="480" width="860" height="970" rx="18" fill="#162930" stroke={color} strokeWidth="6"/>
    {Array.from({length:15},(_,i)=><g key={i}><rect x={153+i%3*25} y={560+i*53} width={300+i%5*85} height="15" rx="6" fill={i%3===0?color:'#809A9E'} opacity={i/15<progress?1:.28}/>
     {i%3===0&&i/15<progress&&<path d={'M780 '+(566+i*53)+' l17 17 l28 -34'} fill="none" stroke={color} strokeWidth="7"/>}</g>)}
   </g>}
  </svg>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(8,15,18,.52),rgba(8,15,18,'+darken+') 44%,rgba(8,15,18,.93))'}}/>
  <div style={{position:'absolute',bottom:420,left:70,fontFamily:'Arial,sans-serif',fontSize:21,color,letterSpacing:3,fontWeight:900}}>SCHEMATIC · ORIGINAL MOTION GRAPHICS</div>
 </AbsoluteFill>
};
const Source:React.FC<{company:string;color:string;index:string;source:string}>=({company,color,index,source})=><>
 <div style={{position:'absolute',top:90,left:66,right:66,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
 {caps('SIGNAL  /  AI NEWS',{fontSize:24,color:light,letterSpacing:4})}
 {caps(index+'/05',{fontSize:26,color})}</div>
 <div style={{position:'absolute',bottom:106,left:68,right:68,display:'flex',justifyContent:'space-between',gap:16,fontSize:18,letterSpacing:1.2,color:'#E0E4E1',fontWeight:800}}>
 <span>{company}</span><span style={{textAlign:'right'}}>{source}</span></div>
 </>;
const NewsFrame:React.FC<{idx:number;children:React.ReactNode;darken?:number}>=({idx,children,darken})=>{const m=stories[idx];return <AbsoluteFill style={{background:dark,color:light,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
 <VisualWorld idx={idx} darken={darken}/>{children}
 <Source company={m.company} color={m.color} index={m.label} source={m.source}/>
 </AbsoluteFill>};
const Statistic:React.FC<{n:string;label:string;color:string;prefix?:string}>=({n,label,color,prefix})=>{const f=useCurrentFrame();return <div style={{position:'relative',width:'100%',textAlign:'left'}}>
 {prefix?caps(prefix,{fontSize:24,color:mut,letterSpacing:4,marginBottom:18}):null}
 <div style={{fontSize:185,fontWeight:900,letterSpacing:-14,color,transform:`translateY(${tween(f,[0,25],[60,0])}px)`,opacity:tween(f,[0,15],[0,1]),lineHeight:1}}>{n}</div>
 {caps(label,{fontSize:35,color:light,letterSpacing:1.5,marginTop:30})}
 </div>};
const PhotoHook:React.FC<{idx:number}>=({idx})=>{const f=useCurrentFrame();const m=stories[idx];return <NewsFrame idx={idx} darken={.18}>
 <div style={{position:'absolute',left:65,right:65,bottom:560}}>
 {caps(m.accent,{fontSize:29,color:m.color,letterSpacing:6,marginBottom:42,opacity:tween(f,[0,15],[0,1])})}
 <div style={{height:8,width:tween(f,[0,22],[0,120]),background:m.color,marginBottom:45}}/>
 <div style={{fontSize:121,fontWeight:900,lineHeight:.98,letterSpacing:-5,textShadow:'0 5px 20px #0008',opacity:tween(f,[0,21],[0,1])}}>{m.title}</div>
 <div style={{marginTop:58,color:light,fontSize:24,letterSpacing:3}}>ORIGINAL ANIMATION  ·  {m.date}</div>
 </div></NewsFrame>};
const Article:React.FC<{color:string;headline:string;body:string;eyebrow:string}>=({color,headline,body,eyebrow})=>{const f=useCurrentFrame();return <div style={{position:'absolute',top:325,left:75,right:75,bottom:595,borderRadius:10,background:'#F6F4EC',color:'#142229',padding:'55px 58px',boxShadow:'0 12px 40px #0009',boxSizing:'border-box',transform:`rotate(${tween(f,[0,40],[2,0])}deg) translateY(${tween(f,[0,25],[70,0])}px)`}}>
 <div style={{display:'flex',justifyContent:'space-between',gap:18,fontWeight:900,fontSize:21,letterSpacing:3}}><span>THE BRIEFING</span><span>{eyebrow}</span></div>
 <div style={{height:2,background:'#263536',margin:'35px 0 65px'}}/>
 <div style={{font:'bold 70px/1.1 Georgia, serif',letterSpacing:-2}}>{headline}</div>
 <div style={{marginTop:62,height:19,width:tween(f,[30,70],[0,85])+'%',background:color,opacity:.65}}/>
 <div style={{font:'30px/1.55 Georgia, serif',marginTop:28}}>{body}</div>
 <div style={{position:'absolute',bottom:45,left:58,right:58,borderTop:'1px solid #9EA6A2',paddingTop:20,fontSize:18,letterSpacing:2,fontWeight:800}}>ILLUSTRATIVE EDITORIAL CARD · NOT AN ARTICLE SCREENSHOT</div>
 </div>};
const Diagram:React.FC<{idx:number}>=({idx})=>{const f=useCurrentFrame();const m=stories[idx], col=m.color;
 if(idx===0)return <div style={{position:'absolute',top:440,left:75,right:75}}>
 {caps('CONTEXT WINDOW',{fontSize:39,letterSpacing:4,color:light})}
 <Statistic n="1,000,000" label="TOKENS · REPORTED CAPACITY" color={col}/>
 <div style={{marginTop:60,display:'flex',gap:10,flexWrap:'wrap'}}>{Array.from({length:72},(_,i)=><div key={i} style={{width:57,height:32,borderRadius:3,background:i/72<tween(f,[0,90],[0,1])?col:'#6D7D7F77'}}/>)}</div>
 {caps('VISUAL SCALE · NOT A MODEL DEMO',{fontSize:20,color:mut,marginTop:50})}
 </div>;
 if(idx===1)return <div style={{position:'absolute',top:480,left:75,right:75}}>
 <Statistic n="$30B" label="REPORTED POTENTIAL FINANCING" color={col} prefix="FUNDING DISCUSSIONS"/>
 <div style={{marginTop:120}}><Statistic n="$1.25T" label="REPORTED VALUATION · UNCONFIRMED" color={light}/></div></div>;
 if(idx===2)return <div style={{position:'absolute',top:425,left:75,right:75}}>
 {caps('TRAINING SECURITY',{fontSize:39,color:light})}
 <div style={{display:'flex',gap:15,marginTop:115,justifyContent:'center',alignItems:'center'}}>
 {['MODEL','ISOLATION','NETWORK'].map((word,i)=><div key={word} style={{border:`3px solid ${i===1?col:'#63777B'}`,borderRadius:8,padding:'34px 21px',fontSize:28,fontWeight:900,color:i===1?col:light,transform:`translateY(${tween(f,[i*10,i*10+22],[80,0])}px)`}}>{word}</div>)}</div>
 <div style={{height:8,background:col,width:tween(f,[35,90],[0,850]),marginTop:75}}/>
 {caps('ACCESS BOUNDARIES · SCHEMATIC',{fontSize:24,color:mut,marginTop:50})}</div>;
 if(idx===3)return <div style={{position:'absolute',top:460,left:75,right:75}}>
 <Statistic n="~$16B" label="REPORTED FUNDING" color={col} prefix="AI CAPITAL RACE"/>
 <div style={{display:'flex',alignItems:'end',height:340,gap:24,marginTop:85}}>{[.3,.58,.43,.88,.76,1].map((n,i)=><div key={i} style={{width:130,height:`${tween(f,[0,65],[0,n*100])}%`,background:i===5?col:'#9CA6A9',opacity:.8}}/>)}</div>
 {caps('ILLUSTRATIVE BARS · NOT FINANCIAL TIMESERIES',{fontSize:21,color:mut,marginTop:32})}</div>;
 return <div style={{position:'absolute',top:415,left:75,right:75}}>
 {caps('FORMAL VERIFICATION',{fontSize:33,color:light,letterSpacing:4})}
 <Statistic n="123" label="OPEN-SOURCE LIBRARIES · REPORTED" color={col}/>
 <div style={{font:'30px/1.6 monospace',background:'#111A1CD9',border:'1px solid #879C9B',padding:35,marginTop:75,color:light,borderRadius:12}}>
 <span style={{color:col}}>verify</span>(library);<br/>assert(properties);<br/><span style={{color:col}}>✓</span> scoped guarantees
 </div>{caps('SCHEMATIC CODE, NOT PROJECT SOURCE',{fontSize:20,color:mut,marginTop:30})}</div>;
};
const DataShot:React.FC<{idx:number}>=({idx})=>{const m=stories[idx];return <NewsFrame idx={idx} darken={.8}>
 <div style={{position:'absolute',inset:0,background:'#0A1216AC'}}/>
 <Diagram idx={idx}/>
 </NewsFrame>};
const ExplainShot:React.FC<{idx:number}>=({idx})=>{const m=stories[idx];
 const article=[
 ['Open weights are promised','Moonshot has described a long-context model and an upcoming open-weight release.'],
 ['The price of AI competition','Reported funding talks put a massive number on the table, but terms are not final.'],
 ['How do models stay isolated?','A reported access incident highlights the importance of boundaries in training.'],
 ['Investment keeps accelerating','Large reported raises underline the funding race across AI companies.'],
 ['A proof is not a guarantee','Formal verification checks specific properties under specified assumptions.'],
 ][idx];
 return <NewsFrame idx={idx} darken={.65}>
 <Article color={m.color} eyebrow={m.date} headline={article[0]} body={article[1]}/>
 </NewsFrame>};
const Subtitles:React.FC<{section:typeof timing.sections[number];color:string}>=({section,color})=>{const f=useCurrentFrame();const chunk=[...section.chunks].reverse().find(x=>f>=x.start);if(!chunk)return null;const pos=f-chunk.start;return <div style={{position:'absolute',left:64,right:64,bottom:230,padding:'30px 28px',minHeight:140,borderRadius:15,background:'#090E12ED',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 25px #0009'}}>
 <div style={{fontFamily:'Arial, sans-serif',fontSize:46,fontWeight:900,lineHeight:1.26,color:light,textAlign:'center'}}>{chunk.text}</div>
 <div style={{position:'absolute',left:0,bottom:0,height:7,background:color,width:`${Math.min(100,pos/chunk.frames*100)}%`}}/>
 </div>};
const Story:React.FC<{idx:number;section:typeof timing.sections[number]}>=({idx,section})=><AbsoluteFill>
 {section.chunks.map((chunk,i)=>{const next=section.chunks[i+1];const duration=next?next.start-chunk.start:section.frames-chunk.start;
 return <Sequence from={chunk.start} durationInFrames={Math.max(1,duration)} key={i}>{i===0?<PhotoHook idx={idx}/>:i===1?<DataShot idx={idx}/>:<ExplainShot idx={idx}/>}</Sequence>})}
 <Subtitles section={section} color={stories[idx].color}/>
 <Audio src={staticFile('v4/'+(idx+1)+'.wav')}/>
 </AbsoluteFill>;
const Intro:React.FC<{section:typeof timing.sections[number];outro:boolean}>=({section,outro})=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:dark,fontFamily:'Arial, sans-serif',color:light,overflow:'hidden'}}>
 <VisualWorld idx={outro?4:0} darken={.48}/>
 <div style={{position:'absolute',left:70,right:70,top:420}}>
 {caps('SIGNAL / AI NEWS',{fontSize:37,color:'#C8F88B',letterSpacing:6})}
 <div style={{fontSize:160,lineHeight:.97,fontWeight:900,letterSpacing:-8,marginTop:80,whiteSpace:'pre-line'}}>{outro?'STAY\nAHEAD.':'FIVE\nAI STORIES.'}</div>
 <div style={{height:10,width:tween(f,[0,38],[0,650]),background:'#C8F88B',marginTop:70}}/>
 {caps(outro?'FOLLOW FOR MORE':'OCTOBER 25, 2026',{fontSize:35,color:light,marginTop:50})}</div>
 <Subtitles section={section} color="#C8F88B"/>
 <Audio src={staticFile('v4/'+(outro?'6':'0')+'.wav')}/>
 </AbsoluteFill>};
const Reel:React.FC=()=> <AbsoluteFill style={{background:dark}}>
 {timing.sections.map((section,i)=><Sequence key={i} from={section.start} durationInFrames={section.frames}>
 {i===0?<Intro section={section} outro={false}/>:i===6?<Intro section={section} outro/>:<Story section={section} idx={i-1}/>}
 </Sequence>)}
 <Audio src={staticFile('v4/bed.wav')} volume={0.17}/>
 </AbsoluteFill>;
export const NewsV5Root:React.FC=()=> <Composition id="NewsV5" component={Reel} fps={timing.fps} durationInFrames={timing.totalFrames} width={1080} height={1920}/>;
