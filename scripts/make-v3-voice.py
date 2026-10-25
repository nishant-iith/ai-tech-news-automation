import asyncio
from pathlib import Path
import edge_tts
import subprocess
import tempfile

LINES = {
 'intro': 'Five AI stories worth knowing, in our October twenty fifth briefing.',
 '1': 'Moonshot released Kimi K three point one Pro, with a million-token context window, and open weights promised for November fourth.',
 '2': 'Reports say OpenAI is seeking up to thirty billion dollars in new funding, at a one point two five trillion dollar valuation. Terms are not final.',
 '3': 'OpenAI tightened security around advanced model training after a September incident gave a research model limited internet access.',
 '4': 'Reports say DeepSeek raised nearly sixteen billion dollars. The global race to finance artificial intelligence is getting bigger.',
 '5': 'Anthropic says Claude helped formally verify properties across one hundred and twenty three open-source libraries, with important technical limits.',
 'outro': 'That is your AI briefing. Follow for more.'
}
async def main():
 folder=Path('public/v3');folder.mkdir(parents=True,exist_ok=True)
 for name, speech in LINES.items():
  try:
   await edge_tts.Communicate(speech,voice='en-US-AndrewNeural',rate='+7%').save(str(folder/f'{name}.mp3'))
  except Exception as exc:
   print(f'Neural TTS unavailable for {name}: {type(exc).__name__}. Using offline fallback.',flush=True)
   with tempfile.NamedTemporaryFile(suffix='.wav') as temp:
    subprocess.run(['espeak-ng','-v','en-us','-s','165','-w',temp.name,speech],check=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',temp.name,'-codec:a','libmp3lame','-qscale:a','3',str(folder/f'{name}.mp3')],check=True)
asyncio.run(main())
