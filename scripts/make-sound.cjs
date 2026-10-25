// Copyright (c) 2026. Generate a tiny deterministic, royalty-free original sound bed.
const fs=require('node:fs'); const path=require('node:path');
const SAMPLE_RATE=22050, SECONDS=16, n=SAMPLE_RATE*SECONDS;
const wav=Buffer.alloc(44+n*2);
wav.write('RIFF',0);wav.writeUInt32LE(wav.length-8,4);wav.write('WAVE',8);
wav.write('fmt ',12);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);
wav.writeUInt16LE(1,22);wav.writeUInt32LE(SAMPLE_RATE,24);wav.writeUInt32LE(SAMPLE_RATE*2,28);
wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(n*2,40);
const hits=[0.2,4.53,6.1,10.0,11.5];
for(let i=0;i<n;i++){
 const t=i/SAMPLE_RATE;
 const pad = 0.08*(Math.sin(2*Math.PI*110*t) + 0.45*Math.sin(2*Math.PI*164.81*t))*Math.min(1,t/0.45)*Math.min(1,(SECONDS-t)/0.6);
 let hit=0;
 for(const at of hits){const z=t-at;if(z>=0 && z<0.32){
  const env=Math.exp(-z*19);
  hit+=0.17*env*Math.sin(2*Math.PI*(210-100*z)*z)+0.035*env*Math.sin(2*Math.PI*1600*z);
 }}
 const fade=Math.min(1,t/0.2,(SECONDS-t)/0.2);
 const s=Math.max(-1,Math.min(1,(pad+hit)*Math.max(0,fade)));
 wav.writeInt16LE(Math.round(s*32767),44+2*i);
}
fs.mkdirSync(path.join('public','sfx'),{recursive:true});
fs.writeFileSync(path.join('public','sfx','sample.wav'),wav);
console.log('Generated original audio bed.');
