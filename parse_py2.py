import json
import re

with open('Yair Fabricio Cuno Rojas _ LinkedIn.html', 'r', encoding='utf-8') as f:
    html = f.read()

data_blocks = re.findall(r'<code[^>]*>\s*(<!--)?(.*?)(-->)?\s*</code>', html, flags=re.DOTALL)
extracted = []

for block in data_blocks:
    content = block[1].strip()
    if content.startswith('{') or content.startswith('['):
        try:
            data = json.loads(content)
            data_str = json.dumps(data)
            if 'experiencia' in data_str.lower() or 'experience' in data_str.lower() or 'tripleten' in data_str.lower() or 'illapa' in data_str.lower():
                extracted.append(data)
        except:
            pass

with open('linkedin_data.json', 'w', encoding='utf-8') as f:
    json.dump(extracted, f, indent=2, ensure_ascii=False)
