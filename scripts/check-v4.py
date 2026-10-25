"""V4 audio, storyboard, and rendered-video QA. Fail instead of publishing corrupted results."""
import json
import subprocess
import sys
from pathlib import Path
import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
STORYBOARD = json.loads((ROOT/"src/v4-timing.json").read_text())
sections = STORYBOARD["sections"]
assert len(sections) == 7
assert STORYBOARD["fps"] == 30
assert sections[0]["start"] == 0
assert all(sec["frames"] > 15 for sec in sections)
assert all(sections[i]["start"]+sections[i]["frames"] == sections[i+1]["start"] for i in range(6))
assert sum(s["frames"] for s in sections) == STORYBOARD["totalFrames"]
for sec in sections:
    path = ROOT/"public"/"v4"/f'{sec["section"]}.wav'
    audio,rate = sf.read(path, dtype='float32')
    assert 22050 <= rate <= 48000, f"Invalid sample rate: {path}"
    duration = len(audio)/rate
    assert duration >= 1.0 and duration < 30.0
    assert np.isfinite(audio).all()
    assert 0.001 < np.sqrt(np.mean(audio**2)) < 0.9, f"Silent or clipped: {path}"
    assert 0 <= sec["frames"]/30-duration < .20, f"Audio-video timing mismatch: {path}"
    assert all(0 <= p["start"] < sec["frames"] and p["frames"] > 0 for p in sec["chunks"])
bed,bed_sr = sf.read(ROOT/"public/v4/bed.wav")
assert abs(len(bed)/bed_sr - STORYBOARD["totalFrames"]/30) < .1
if sys.argv[1] == "post":
    video = ROOT/"out/ai-news-v4.mp4"
    assert video.stat().st_size > 500000, "MP4 unexpectedly small"
    result = subprocess.check_output(
        ["ffprobe","-v","error","-show_entries","format=duration:stream=codec_name,width,height",
        "-of","json",str(video)], text=True)
    probe = json.loads(result)
    assert any(s.get("width") == 1080 and s.get("height") == 1920 for s in probe["streams"])
    assert any(s.get("codec_name") == "h264" for s in probe["streams"])
    assert any(s.get("codec_name") == "aac" for s in probe["streams"])
    assert abs(float(probe["format"]["duration"])-STORYBOARD["totalFrames"]/30) < .3
    assert all((ROOT/"out"/f"v4-shot0{i}.png").stat().st_size > 10000 for i in range(1,5))
print("V4",sys.argv[1],"checks passed:",round(STORYBOARD["totalFrames"]/30,2),"seconds")
