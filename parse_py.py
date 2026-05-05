import urllib.request
import re

with open('Yair Fabricio Cuno Rojas _ LinkedIn.html', 'r', encoding='utf-8') as f:
    html = f.read()

# remove scripts and styles
html = re.sub(r'<script.*?</script>', ' ', html, flags=re.DOTALL)
html = re.sub(r'<style.*?</style>', ' ', html, flags=re.DOTALL)

# remove tags
text = re.sub(r'<[^>]+>', ' ', html)

# normalize whitespace
text = re.sub(r'\s+', ' ', text)

with open('linkedin_clean.txt', 'w', encoding='utf-8') as f:
    f.write(text)
