// KCIL Competitor Analysis - competitor_data.js
// All competitor data from publicly available sources (BSE, NSE, company websites, annual reports).

const KCIL_PROFILE = {
 "name": "KCIL (Kairav Chemofarbe Industries Ltd)",
 "country": "India",
 "type": "Private",
 "hq": "Mumbai, India",
 "founded": "1992",
 "website": "https://kcilglobal.com",
 "revenue": "~INR 200-400 Cr (est.)",
 "employees": "200-500",
 "categories": [
  "Solvents",
  "Specialty Chemicals",
  "Custom Synthesis",
  "Green Chemistry"
 ],
 "productCount": 29,
 "keyStrengths": [
  "Specialist focus on high-purity specialty solvents and fine chemicals",
  "Custom synthesis capability for complex pharmaceutical intermediates",
  "Green chemistry portfolio: 2-MeTHF, Methylal, bio-based solvents",
  "Strong relationships with Indian pharma and agrochem companies",
  "Competitive pricing vs global players (MNC premium avoided)",
  "Regulatory expertise: REACH, GMP-compatible production",
  "Flexible MOQ for research and commercial quantities"
 ],
 "keyMarkets": [
  "Pharmaceutical APIs",
  "Agrochemicals",
  "OLED & Electronics",
  "Fragrances",
  "Battery Materials",
  "Green Chemistry"
 ]
};

const COMPETITORS = [
 {
  "name": "Laxmi Organic Industries Ltd",
  "ticker": "LXCHEM (NSE/BSE)",
  "country": "India",
  "type": "Public (Listed)",
  "hq": "Mumbai, India",
  "founded": "1989",
  "website": "https://www.laxmiorganic.com",
  "revenue": "~INR 2000+ Cr (FY2024)",
  "employees": "2500+",
  "whyCompetitor": "India's largest Acetonitrile manufacturer — DIRECT head-to-head competition on KCIL's top-selling solvent. Same pharma customer base in India.",
  "threatLevel": "HIGH",
  "sharedChemicals": [
   "Acetonitrile",
   "Ethyl Acetate",
   "Specialty Solvents"
  ],
  "kcilAdvantage": "KCIL offers broader specialty portfolio (boronic acids, custom synthesis) beyond solvents; more flexible for small-batch pharma needs",
  "competitorStrengths": [
   "Largest acetonitrile capacity in India (significant scale advantage)",
   "Listed company with strong balance sheet and access to capital",
   "Established export presence in 30+ countries",
   "Backward integration into ethyl acetate and diketene derivatives",
   "Strong brand recognition in Indian pharma sector"
  ],
  "competitorWeaknesses": [
   "Focused on commodity solvents — less specialty/custom synthesis capability",
   "Acetonitrile is byproduct-dependent — supply/price volatility risk",
   "Less flexibility for small-batch custom orders"
  ]
 },
 {
  "name": "Balaji Amines Ltd",
  "ticker": "BALAMINES (NSE/BSE)",
  "country": "India",
  "type": "Public (Listed)",
  "hq": "Solapur, Maharashtra, India",
  "founded": "1988",
  "website": "https://www.balajiamines.com",
  "revenue": "~INR 1500+ Cr (FY2024)",
  "employees": "1500+",
  "whyCompetitor": "Leading Indian manufacturer of NMP, DMF, DMAC and specialty solvents — directly competes on NMP and specialty solvent segment serving pharma and electronics industries.",
  "threatLevel": "HIGH",
  "sharedChemicals": [
   "N-Methylpyrrolidone (NMP)",
   "Specialty Solvents",
   "Pharma Process Solvents"
  ],
  "kcilAdvantage": "KCIL's green chemistry portfolio (2-MeTHF, Methylal) and specialty intermediates (boronic acids, ETT) serve markets Balaji Amines does not address",
  "competitorStrengths": [
   "Vertically integrated — produces own raw materials (amines)",
   "Large NMP capacity — dominant Indian NMP producer",
   "Listed company with strong investor backing",
   "ISO and GMP certified manufacturing",
   "Strong distribution across India and export markets"
  ],
  "competitorWeaknesses": [
   "Primarily amine and NMP focused — limited specialty intermediates",
   "Less custom synthesis capability for complex molecules",
   "Not present in boronic acids, OLED materials, oligonucleotide chemistry"
  ]
 },
 {
  "name": "SD Fine-Chem Ltd",
  "ticker": "Unlisted",
  "country": "India",
  "type": "Private",
  "hq": "Mumbai, India",
  "founded": "1967",
  "website": "https://www.sdfine.com",
  "revenue": "~INR 400-600 Cr (est.)",
  "employees": "800+",
  "whyCompetitor": "Major Indian fine chemical and solvent manufacturer with overlapping product portfolio including THF, Acetonitrile, and specialty lab chemicals. Serves same pharma and research customer base.",
  "threatLevel": "MEDIUM-HIGH",
  "sharedChemicals": [
   "Tetrahydrofuran (THF)",
   "Acetonitrile",
   "Specialty Solvents",
   "Fine Chemicals"
  ],
  "kcilAdvantage": "KCIL's custom synthesis and green chemistry are differentiators; SD Fine-Chem more focused on lab-grade chemicals for research rather than industrial-scale pharma production",
  "competitorStrengths": [
   "One of India's oldest fine chemical companies — 55+ years experience",
   "Wide product portfolio (3000+ products)",
   "Strong presence in research and laboratory chemicals",
   "ISO certified, GMP compliance",
   "Trusted brand in Indian research and pharmaceutical sector"
  ],
  "competitorWeaknesses": [
   "More focused on lab/research quantities than industrial bulk",
   "Less specialized in advanced pharmaceutical intermediates",
   "Limited presence in green chemistry and battery materials"
  ]
 },
 {
  "name": "Finar Limited",
  "ticker": "Unlisted",
  "country": "India",
  "type": "Private",
  "hq": "Ahmedabad, India",
  "founded": "1976",
  "website": "https://www.finarchemicals.com",
  "revenue": "~INR 200-400 Cr (est.)",
  "employees": "500+",
  "whyCompetitor": "Fine chemical and specialty solvent manufacturer competing in similar market — analytical reagents, solvents, and specialty chemicals for pharma and research.",
  "threatLevel": "MEDIUM",
  "sharedChemicals": [
   "Specialty Solvents",
   "Fine Chemicals",
   "Analytical Reagents"
  ],
  "kcilAdvantage": "KCIL has deeper pharmaceutical process chemistry expertise and a stronger green chemistry portfolio",
  "competitorStrengths": [
   "Well-established Indian fine chemical manufacturer",
   "ISO/IEC 17025 accredited laboratory",
   "Wide range of analytical grade chemicals",
   "Strong export business to 50+ countries"
  ],
  "competitorWeaknesses": [
   "Less industrial-scale production capability",
   "Limited pharmaceutical intermediate portfolio",
   "No significant presence in OLED or battery materials"
  ]
 },
 {
  "name": "BASF SE",
  "ticker": "BAS (Frankfurt Stock Exchange)",
  "country": "Germany",
  "type": "Public (Global MNC)",
  "hq": "Ludwigshafen, Germany",
  "founded": "1865",
  "website": "https://www.basf.com",
  "revenue": "~EUR 68.9 Billion (2023)",
  "employees": "111,000+",
  "whyCompetitor": "Global leader in NMP (one of the world's largest NMP producers) and specialty solvents — directly competes in NMP, specialty chemicals, and solution solvents for pharma and electronics.",
  "threatLevel": "HIGH (for NMP)",
  "sharedChemicals": [
   "N-Methylpyrrolidone (NMP)",
   "Tetrahydrofuran (THF)",
   "Specialty Solvents",
   "Pharmaceutical Chemicals"
  ],
  "kcilAdvantage": "KCIL is significantly cheaper (no MNC premium), more flexible for Indian market, faster customization, and focused on specialty intermediates BASF doesn't prioritize",
  "competitorStrengths": [
   "World's largest chemical company by revenue",
   "Massive NMP production capacity globally",
   "Complete vertically integrated supply chain",
   "Global regulatory approvals in all markets (FDA, EMA, etc.)",
   "R&D investment exceeds many companies' total revenue",
   "Premium brand recognition worldwide"
  ],
  "competitorWeaknesses": [
   "Premium pricing — significantly more expensive than KCIL",
   "Minimum order quantities not suitable for small/mid pharma companies",
   "Less focused on custom synthesis for individual client needs",
   "Bureaucratic — slower response for specialized requests"
  ]
 },
 {
  "name": "Eastman Chemical Company",
  "ticker": "EMN (NYSE)",
  "country": "USA",
  "type": "Public (NYSE Listed)",
  "hq": "Kingsport, Tennessee, USA",
  "founded": "1920",
  "website": "https://www.eastman.com",
  "revenue": "~USD 9.2 Billion (2023)",
  "employees": "14,000+",
  "whyCompetitor": "Major global producer of THF, specialty solvents, and chemical intermediates — directly competes on THF and overlapping solvent portfolio.",
  "threatLevel": "MEDIUM-HIGH (for THF)",
  "sharedChemicals": [
   "Tetrahydrofuran (THF)",
   "Specialty Solvents",
   "1,4-Dioxane",
   "Chemical Intermediates"
  ],
  "kcilAdvantage": "KCIL offers more competitive pricing for Indian market, faster delivery, and specialized intermediates Eastman doesn't offer",
  "competitorStrengths": [
   "One of the world's largest THF and specialty solvent producers",
   "Global distribution network and logistics excellence",
   "Strong R&D pipeline for advanced materials",
   "100+ years of chemical manufacturing expertise",
   "Sustainability-focused — Circular Economy initiatives"
  ],
  "competitorWeaknesses": [
   "Premium US/Western pricing — not competitive for Indian buyers",
   "Less focus on pharma intermediates and custom synthesis",
   "Limited presence in boronic acids, OLED materials"
  ]
 },
 {
  "name": "Sigma-Aldrich / MilliporeSigma (Merck KGaA)",
  "ticker": "MRK (Frankfurt)",
  "country": "Germany/USA",
  "type": "Public (Global MNC)",
  "hq": "Darmstadt, Germany / St. Louis, USA",
  "founded": "1668 (Merck)",
  "website": "https://www.sigmaaldrich.com",
  "revenue": "~EUR 22.7 Billion (2023, Life Science + Materials)",
  "employees": "60,000+",
  "whyCompetitor": "Complete product portfolio overlap — Sigma-Aldrich sells all 29 KCIL chemicals plus hundreds of thousands more. Premium brand in pharmaceutical and research chemical supply.",
  "threatLevel": "HIGH (Premium Segment)",
  "sharedChemicals": [
   "ALL 29 KCIL products",
   "Acetonitrile",
   "THF",
   "NMP",
   "1,4-Dioxane",
   "Boronic Acids",
   "ETT",
   "HOBt in NMP",
   "All Specialty Intermediates"
  ],
  "kcilAdvantage": "KCIL is 30-60% cheaper than Sigma-Aldrich pricing for industrial quantities; stronger focus on Indian pharma needs; no global MNC overheads",
  "competitorStrengths": [
   "Over 300,000 chemicals available — unmatched product range",
   "Highest quality and purity standards globally",
   "Trusted brand in 160+ countries",
   "Excellent documentation (CoA, MSDS, regulatory support)",
   "Online ordering platform with global logistics",
   "Regulatory and compliance support for pharma customers"
  ],
  "competitorWeaknesses": [
   "Extremely high pricing — research-grade premium, 3-5x industrial pricing",
   "Not competitive for bulk industrial quantities",
   "Catalog-only — limited custom synthesis for non-standard specs",
   "Long lead times for specialty items from US/Europe"
  ]
 },
 {
  "name": "TCI Chemicals (India) Pvt Ltd / TCI Co. Ltd",
  "ticker": "4362 (Tokyo Stock Exchange, parent)",
  "country": "Japan / India",
  "type": "Public (Tokyo SE, Parent)",
  "hq": "Tokyo, Japan (India HQ: Mumbai)",
  "founded": "1946",
  "website": "https://www.tcichemicals.com",
  "revenue": "~JPY 65 Billion (~USD 450M, 2023)",
  "employees": "2000+",
  "whyCompetitor": "Directly competes on boronic acids, specialty heterocycles, fine chemicals, and pharmaceutical intermediates — exact product overlap with KCIL's specialty portfolio.",
  "threatLevel": "HIGH (Specialty Chemicals)",
  "sharedChemicals": [
   "Phenyl Boronic Acid",
   "4-Chloro Phenyl Boronic Acid",
   "Naphthyl Boronic Acid",
   "ETT",
   "HOBt",
   "Specialty Intermediates",
   "THF",
   "Acetonitrile"
  ],
  "kcilAdvantage": "KCIL offers more competitive industrial pricing; better suited for Indian market; stronger relationship with domestic pharma; custom synthesis capability",
  "competitorStrengths": [
   "75+ years in fine and specialty chemicals",
   "30,000+ catalog products — excellent range",
   "High purity grades for research and pharma",
   "Strong boronic acid and heterocycle portfolio",
   "ISO 9001 certified manufacturing",
   "Trusted in global pharmaceutical and academic market"
  ],
  "competitorWeaknesses": [
   "Japanese company — premium pricing for research-grade products",
   "Less competitive for bulk industrial quantities",
   "Primarily catalog-based — limited custom synthesis capability",
   "Higher lead times from Japan for specialty items"
  ]
 },
 {
  "name": "Mitsubishi Chemical Group",
  "ticker": "4188 (Tokyo Stock Exchange)",
  "country": "Japan",
  "type": "Public (Tokyo SE)",
  "hq": "Tokyo, Japan",
  "founded": "1933",
  "website": "https://www.mitsubishichem.com",
  "revenue": "~JPY 4.2 Trillion (~USD 28B, 2023)",
  "employees": "60,000+",
  "whyCompetitor": "Major global NMP producer and specialty chemical manufacturer — directly competes on NMP (battery and pharmaceutical grade) and specialty solvents.",
  "threatLevel": "HIGH (NMP)",
  "sharedChemicals": [
   "N-Methylpyrrolidone (NMP)",
   "Specialty Solvents",
   "Chemical Intermediates"
  ],
  "kcilAdvantage": "KCIL offers significantly lower pricing for Indian market; faster customization; specialized intermediates (boronic acids, ETT) not in Mitsubishi catalog",
  "competitorStrengths": [
   "Major global NMP producer — massive capacity and supply reliability",
   "Vertically integrated across petrochemical value chain",
   "Strong in battery materials — NMP for EV sector",
   "Deep relationships with Korean and Japanese battery makers (Samsung SDI, Panasonic)",
   "R&D investment and patent portfolio in advanced materials"
  ],
  "competitorWeaknesses": [
   "Premium Japanese pricing — not competitive for Indian buyers",
   "Focused on scale — not suitable for small custom orders",
   "Limited specialty pharmaceutical intermediate portfolio",
   "Not active in boronic acids or OLED specialty chemicals at KCIL's level"
  ]
 },
 {
  "name": "Vinati Organics Ltd",
  "ticker": "VINATIORGA (NSE/BSE)",
  "country": "India",
  "type": "Public (Listed)",
  "hq": "Mumbai, India",
  "founded": "1989",
  "website": "https://www.vinatiorganics.com",
  "revenue": "~INR 2000+ Cr (FY2024)",
  "employees": "1000+",
  "whyCompetitor": "Leading Indian specialty chemical company serving pharma and industrial sectors — competes indirectly through market presence and customer overlap in pharmaceutical specialty chemicals.",
  "threatLevel": "LOW-MEDIUM (Adjacent)",
  "sharedChemicals": [
   "Specialty Chemicals for Pharma",
   "Industrial Chemical Intermediates"
  ],
  "kcilAdvantage": "KCIL has direct product overlap in solvents and specialty intermediates; Vinati focuses on different molecules (ATBS, IBB) with little direct overlap",
  "competitorStrengths": [
   "World's largest ATBS manufacturer — monopoly position",
   "Listed company with strong balance sheet and governance",
   "ISO 9001, ISO 14001, OHSAS 18001 certified",
   "Strong export revenue (60%+ from exports)",
   "High EBITDA margins — premium specialty positioning"
  ],
  "competitorWeaknesses": [
   "Very narrow product focus (ATBS, IBB, specialty monomers)",
   "Not present in solvents, boronic acids, OLED materials, ETT",
   "Different customer base — less direct pharma intermediate competition"
  ]
 }
];

