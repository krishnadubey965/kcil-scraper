# KCIL Deep Scraper - Full Product Intelligence

A powerful browser-based web scraper for kcilglobal.com (Kairav Chemofarbe Industries Ltd), extracting complete chemical product data across 29 products and 6 data categories.

## Features

- **Deep Crawl Mode** - Visits every individual product page and extracts full details
- **Quick Scan Mode** - Instantly loads pre-extracted dataset (no network wait)
- **6 Data Tabs** - Products, Applications, Apps Matrix, Properties, Documents, Links
- **Click View All** - Full product detail modal with all data in one place
- **Export** - Download any tab as JSON or CSV
- **Search** - Filter any tab in real time

## Data Extracted Per Product

| Field | Description |
|---|---|
| CAS Number | Chemical Abstracts Service registry number |
| Molecular Formula | Chemical formula |
| Molecular Weight | Molar mass |
| Synonyms | Alternative chemical names |
| Physical Properties | Boiling point, flash point, density, refractive index, etc. |
| Applications | Industrial uses (Pharma, Agrochem, Fine Chemicals, etc.) |
| Advantages | Key product advantages |
| Packing | Drum sizes and packaging info |
| MSDS / Specs | Direct links to PDF safety and specification sheets |

## Applications Matrix

Scraped from kcilglobal.com/applications/ - shows which industries each KCIL product serves:
- Pharmaceutical Intermediates
- Agrochemicals
- Fine Chemicals
- Industrial, Electronic, Nuclear Industry, Dyes and Intermediates

## Usage

Just open index.html in any modern browser - no server needed.

1. Select Deep Crawl or Quick Scan
2. Choose what to extract
3. Click Start Deep Scrape
4. Browse results across tabs, click any product for the full detail modal
5. Export as JSON or CSV

> Note: Deep Crawl makes live requests via a CORS proxy (api.allorigins.win). If unavailable, falls back to the pre-extracted dataset automatically.

## Tech Stack

- Pure HTML, CSS, JavaScript - no frameworks, no dependencies
- CORS proxy: api.allorigins.win for browser-based cross-origin requests
- Dark glassmorphism UI design

## Files

```
kcil-scraper/
├── index.html     # Main UI (dashboard, tabs, modal)
├── style.css      # Dark glassmorphism styles
└── scraper.js     # All scraping logic, parsers, renderers, fallback data
```

## About KCIL

Kairav Chemofarbe Industries Ltd (KCIL) is a leading specialty chemical manufacturer in India, producing solvents, specialty chemicals, and custom synthesis products for global markets.

---

Made for chemical data intelligence
