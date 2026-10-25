"""Produce a fixed, reproducible V4 narration and a frame-aligned shot timeline.
No robotic fallback: voice generation failures deliberately fail the workflow.
Kokoro-ONNX: https://github.com/thewh1teagle/kokoro-onnx (model Apache-2.0).
"""
import json
import math
from pathlib import Path
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"public"/"v4"
OUT.mkdir(parents=True,exist_ok=True)
MODEL=ROOT/"models"/"kokoro-v1.0.onnx"
VOICES=ROOT/"models"/"voices-v1.0.bin"
FPS=30
SCRIPT=[
  ["Five AI stories worth knowing, in our October twenty fifth briefing."],
  [
    "Moonshot released Kimi K three point one Pro,",
    "with a million-token context window,",
    "and open weights promised for November fourth."
  ],
  [
    "Reports say OpenAI is seeking up to thirty billion dollars in new funding,",
    "at a one point two five trillion dollar valuation.",
    "Terms are not final."
  ],
  [
    "OpenAI tightened security around advanced model training",
    "after a September incident",
    "gave a research model limited internet access."
  ],
  [
    "Reports say DeepSeek raised nearly sixteen billion dollars.",
    "The global race to finance artificial intelligence",
    "is getting bigger."
  ],
  [
    "Anthropic says Claude helped formally verify properties",
    "across one hundred and twenty three open-source libraries,",
    "with important technical limits."
  ],
  ["That's your AI briefing. Follow for more."]
]
tts=Kokoro(str(MODEL),str(VOICES))
sections=[]
offset=0
rng=np.random.default_rng(22)
for section_idx,phrases in enumerate(SCRIPT):
    chunks=[]
    clips=[]
    sample_rate=None
    cursor=0
    for i,phrase in enumerate(phrases):
        samples,sr=tts.create(phrase,voice="am_michael",speed=1.07,lang="en-us")
        samples=np.asarray(samples,dtype=np.float32).flatten()
        assert np.isfinite(samples).all() and len(samples)>sr*.25, "voice generation returned invalid audio"
        if sample_rate is not None and sample_rate!=sr:
            raise RuntimeError("Kokoro sample rate changed mid-run")
        sample_rate=sr
        # Meaningful break at punctuation, but not a dead-air gap.
        frames=max(1,math.ceil(len(samples)*FPS/sr))
        chunks.append({"text":phrase,"start":int(round(cursor*FPS/sr)),"frames":frames,"shot":i})
        clips.append(samples)
        cursor+=len(samples)
        if i!=len(phrases)-1:
            pause=np.zeros(int(sr*.055),dtype=np.float32)
            clips.append(pause)
            cursor+=len(pause)
    full=np.concatenate(clips)
    assert len(full)/sr>1.0 and len(full)/sr<30, "Unexpected voice length"
    sf.write(OUT/f"{section_idx}.wav",full,sr,subtype="PCM_16")
    totalframes=math.ceil(len(full)*FPS/sr)+3
    sections.append({"section":section_idx,"start":offset,"frames":totalframes,"chunks":chunks,"seconds":len(full)/sr})
    offset+=totalframes
try:
    tts.voices.close()
except Exception:
    pass
data={"fps":FPS,"totalFrames":offset,"sections":sections,"voice":"Kokoro ONNX am_michael","subtitleSync":"phrase-level, estimated internal emphasis"}
(ROOT/"src"/"v4-timing.json").write_text(json.dumps(data,indent=2),encoding="utf-8")
# Original, fully generated ambient pulse. No external music licensing required.
duration=offset/FPS
sr=24000
n=int(duration*sr)
t=np.arange(n,dtype=np.float64)/sr
bed=np.zeros(n,dtype=np.float64)
for k,frequency in enumerate([55,82.41,110,164.81]):
    bed+=.015*np.sin(2*np.pi*frequency*t+(.3*k))* (0.60+0.20*np.sin(2*np.pi*.11*t))
for beat in np.arange(.0,duration,.5):
    a=int(beat*sr)
    d=min(int(.11*sr),n-a)
    if d>0:
        envelope=np.exp(-np.linspace(0,8,d))
        bed[a:a+d]+=.045*np.sin(2*np.pi*82*np.arange(d)/sr)*envelope
for section in sections[1:]:
    a=int(section["start"]/FPS*sr)
    d=min(int(.18*sr),n-a)
    if d>0:
        env=np.exp(-np.linspace(0,9,d))
        bed[a:a+d]+=.028*rng.standard_normal(d)*env
sf.write(OUT/"bed.wav",np.clip(bed,-.8,.8),sr,subtype="PCM_16")
print(json.dumps({"total_seconds":duration,"sections":[{"section":s["section"],"seconds":round(s["seconds"],2)} for s in sections]},indent=2))
