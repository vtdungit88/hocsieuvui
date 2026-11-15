# Dùng: python3 content/tools/shot.py <outDir>/gallery.html <out.png>   → chụp gallery để xem bằng công cụ Read
import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1100, 'height': 800})
    pg.goto('file://' + __import__('os').path.abspath(sys.argv[1])); pg.screenshot(path=sys.argv[2], full_page=True); b.close()
