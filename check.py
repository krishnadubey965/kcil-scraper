import os, sys
BASE = r'c:\Users\Krish\.gemini\antigravity\brain\29575ca1-6451-41bf-9741-1aeaeeba93b5\artifacts\Kcil Scrapper'
f = os.path.join(BASE, 'index.html')
html = open(f, encoding='utf-8').read()
print('Current tabs:', html.count('data-tab='))
print('Has market tab:', 'tab-market' in html)
print('Has competitor tab:', 'tab-competitors' in html)
