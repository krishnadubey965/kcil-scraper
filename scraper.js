// KCIL Intelligence Suite v5 - scraper.js
// 29 products | AI Chat | Fixed parser (Applications != Synonyms)
const PROXY='https://api.allorigins.win/get?url=';
let mode='deep',isScraping=false,currentTab='ai';
let scrapedData={products:[],applications:[],appsmatrix:[],properties:[],documents:[],links:[]};
function getFullDataset(){return [
 {
  "name": "1,4-Dioxane",
  "url": "https://kcilglobal.com/products/1-4-dioxane-manufacturers/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Diethylene Dioxide; Diethylene Ether; 1,4-Dioxacyclohexane; Diethylene Oxide; Glycol Ethylene Ether",
  "casNum": "123-91-1",
  "formula": "C4H8O2",
  "molWeight": "88.11",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/1-4-Dioxane-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "101 C"
   },
   {
    "key": "Freezing Point",
    "value": "11 C"
   },
   {
    "key": "Refractive Index",
    "value": "1.4221"
   },
   {
    "key": "Viscosity @25C",
    "value": "1.2 cps"
   },
   {
    "key": "Vapour Density",
    "value": "3.03"
   },
   {
    "key": "Auto Ignition",
    "value": "180 C"
   }
  ],
  "applications": [
   "Paints and Dyestuff Industries",
   "Chemical Industries",
   "Pharmaceuticals and Pesticides Industries",
   "Electronic Industries",
   "Nuclear Industry - measurement of soft beta emitted from C-14 and HTO",
   "Synthesis for semi-permeable membranes"
  ],
  "advantages": [
   "Excellent Stability",
   "A versatile replacement solvent",
   "Excellent stability in acidic or alkaline medium",
   "Excellent water removal property from organic molecules"
  ],
  "packing": "160 kg MS drums. Also supplied in tankers.",
  "documents": [
   {
    "product": "1,4-Dioxane",
    "type": "Download MSDS",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/1-4-DIOXANE.pdf"
   }
  ]
 },
 {
  "name": "1,3-Dioxolane",
  "url": "https://kcilglobal.com/products/13-dioxolane/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Glycol Formal; 1,3-Dioxolan; Formal Glycol; Ethylene Glycol Formal; Glycol Methylene Ether",
  "casNum": "646-06-0",
  "formula": "C3H6O2",
  "molWeight": "74.08",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/1-3-Dioxolane-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "74-75 C"
   },
   {
    "key": "Flash Point",
    "value": "-2 C"
   },
   {
    "key": "Density",
    "value": "1.065 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.3980"
   }
  ],
  "applications": [
   "Pharmaceutical intermediate solvent",
   "Industrial solvent for fine chemical reactions",
   "Polymer and resin synthesis",
   "Solvent for lithium battery electrolytes",
   "Replacement for chlorinated solvents"
  ],
  "advantages": [
   "Low boiling point for easy removal",
   "Excellent solvency for polar substrates",
   "Fully miscible with water and common organic solvents"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Acetonitrile",
  "url": "https://kcilglobal.com/products/acetonitrile/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Cynomethane; Ethane Nitrile; Ethyl Nitrile; Methane Carbonitrile; Methyl Cyanide",
  "casNum": "75-05-8",
  "formula": "C2H3N (CH3CN)",
  "molWeight": "41.05",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Acetonitrile-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "81-82 C"
   },
   {
    "key": "Flash Point",
    "value": "02 C closed cup"
   },
   {
    "key": "Auto Ignition",
    "value": "524 C"
   },
   {
    "key": "Solubility in Water",
    "value": "Completely soluble"
   },
   {
    "key": "Density @25C",
    "value": "0.786 g/ml"
   },
   {
    "key": "Refractive Index",
    "value": "1.452 to 1.454"
   },
   {
    "key": "Assay by GLC",
    "value": "99.90%"
   },
   {
    "key": "Moisture Content KF",
    "value": "Max 0.02%"
   },
   {
    "key": "Purity by GC",
    "value": "Min 99.95%"
   }
  ],
  "applications": [
   "API and Intermediate synthesis - Insulin Antibiotics and Vitamins",
   "Solvent for Agrochemical synthesis",
   "Purification of Butadiene in Refineries",
   "Organic synthesis and manufacturing of Photographic film",
   "Manufacturing of DNA oligonucleotides",
   "Substitute for chlorinated solvents",
   "Solvent in lithium-sulphur dioxide electrochemical cells"
  ],
  "advantages": [
   "Excellent Stability",
   "A versatile replacement solvent",
   "Excellent water removal property from organic molecules"
  ],
  "packing": "160 kg MS drums and 18 kg carboys. Also supplied in tankers.",
  "documents": [
   {
    "product": "Acetonitrile",
    "type": "Download MSDS",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/Acetonitrile.pdf"
   },
   {
    "product": "Acetonitrile",
    "type": "Download Specifications",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/ACETONITRILE_0001.pdf"
   }
  ]
 },
 {
  "name": "Diisopropyl Ether (DIPE)",
  "url": "https://kcilglobal.com/products/diisopropyl-ether-dipe/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Isopropyl Ether; 2-Isopropoxypropane; Diisopropyl Oxide; Propane 2,2-dioxy",
  "casNum": "108-20-3",
  "formula": "C6H14O",
  "molWeight": "102.17",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Diisopropyl-Ether-DIPE-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "69 C"
   },
   {
    "key": "Flash Point",
    "value": "-28 C"
   },
   {
    "key": "Density",
    "value": "0.726 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.368"
   }
  ],
  "applications": [
   "Extraction solvent in pharmaceutical manufacturing",
   "Fuel additive and octane booster in petroleum industry",
   "Fine chemical synthesis and intermediate production",
   "Extraction of organic compounds from aqueous solutions",
   "Alternative to diethyl ether in Grignard reactions"
  ],
  "advantages": [
   "Low boiling point for easy solvent recovery",
   "High selectivity in extraction processes",
   "Lower peroxide formation than diethyl ether"
  ],
  "packing": "160 kg MS drums.",
  "documents": []
 },
 {
  "name": "N-Methylpyrrolidone (NMP)",
  "url": "https://kcilglobal.com/products/n-methylpyrrolidone/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "NMP; 1-Methyl-2-pyrrolidinone; 1-Methylpyrrolidin-2-one; M-Pyrol",
  "casNum": "872-50-4",
  "formula": "C5H9NO",
  "molWeight": "99.13",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/NMP-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to light yellow liquid"
   },
   {
    "key": "Boiling Point",
    "value": "202 C"
   },
   {
    "key": "Flash Point",
    "value": "91 C"
   },
   {
    "key": "Density",
    "value": "1.028 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.470-1.472"
   },
   {
    "key": "Solubility",
    "value": "Completely miscible with water"
   },
   {
    "key": "Purity",
    "value": "Min 99.5%"
   }
  ],
  "applications": [
   "Pharmaceutical drug synthesis as high-boiling reaction solvent",
   "Lithium-ion battery electrode manufacturing (cathode slurry)",
   "Semiconductor wafer cleaning and electronics industry",
   "Petrochemical extraction - recovery of aromatic hydrocarbons",
   "Industrial cleaning agents and paint stripping",
   "Agrochemical formulations",
   "Polymer dissolution and fiber spinning (Aramid PES)"
  ],
  "advantages": [
   "High boiling point for high-temperature reactions",
   "Excellent thermal and chemical stability",
   "Outstanding solvency for a wide range of polymers",
   "Completely miscible with water and most organic solvents"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Dibutyl Ether",
  "url": "https://kcilglobal.com/products/dibutyl-ether/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "DBE; 1-Butoxybutane; n-Dibutyl Ether; Butyl Ether",
  "casNum": "142-96-1",
  "formula": "C8H18O",
  "molWeight": "130.23",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Dibutyl-Ether-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "141-142 C"
   },
   {
    "key": "Flash Point",
    "value": "25 C"
   },
   {
    "key": "Density",
    "value": "0.768 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.399"
   }
  ],
  "applications": [
   "Pharmaceutical extraction and purification solvent",
   "Industrial organic synthesis solvent",
   "Grignard reaction solvent",
   "Metal extraction from ores in hydrometallurgy",
   "Solvent for cellulose ethers and natural resins"
  ],
  "advantages": [
   "Higher boiling point than diethyl ether for elevated temperature reactions",
   "Lower peroxide formation tendency",
   "Good selectivity in liquid-liquid extraction"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Tetrahydrofuran (THF)",
  "url": "https://kcilglobal.com/products/tetrahydrofuran/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "THF; Oxolane; Tetramethylene Oxide; 1,4-Epoxybutane; Butylene Oxide",
  "casNum": "109-99-9",
  "formula": "C4H8O",
  "molWeight": "72.11",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Tetrahydrofuran-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "65-67 C"
   },
   {
    "key": "Flash Point",
    "value": "-14 C"
   },
   {
    "key": "Density",
    "value": "0.889 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.405-1.407"
   },
   {
    "key": "Solubility",
    "value": "Completely miscible with water"
   },
   {
    "key": "Purity by GC",
    "value": "Min 99.5%"
   }
  ],
  "applications": [
   "Pharmaceutical intermediate synthesis and API manufacturing",
   "Grignard reactions as primary solvent",
   "Agrochemical formulations",
   "Polymer synthesis - PVC nylon polyurethane",
   "Solvent for adhesives and coatings",
   "HPLC mobile phase solvent",
   "Manufacturing of butyrolactone and succinic acid"
  ],
  "advantages": [
   "Excellent solvency for a wide range of organic compounds",
   "Completely miscible with water",
   "Moderate boiling point for easy recovery and recycling"
  ],
  "packing": "160 kg MS drums and tankers.",
  "documents": [
   {
    "product": "Tetrahydrofuran",
    "type": "Download MSDS",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/THF.pdf"
   }
  ]
 },
 {
  "name": "Butylal",
  "url": "https://kcilglobal.com/products/butylal/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Dibutoxymethane; Butyl Formal; 1,1-Dibutoxymethane; n-Butyl Formal",
  "casNum": "2568-90-3",
  "formula": "C9H20O2",
  "molWeight": "160.25",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Butylal-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "188-190 C"
   },
   {
    "key": "Flash Point",
    "value": "57 C"
   },
   {
    "key": "Density",
    "value": "0.834 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.408"
   }
  ],
  "applications": [
   "Fragrance ingredient and aroma chemical in perfumery",
   "Solvent for specialty coatings and surface treatment",
   "Intermediate in pharmaceutical synthesis",
   "Industrial cleaning formulations",
   "Alternative to halogenated solvents in specialty applications"
  ],
  "advantages": [
   "High boiling point for stable reaction conditions",
   "Pleasant odour profile suitable for fragrance use",
   "Good stability and low reactivity"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Ethylal",
  "url": "https://kcilglobal.com/products/ethylal/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Diethoxymethane; Ethyl Formal; 1,1-Diethoxymethane; Acetal Diethyl",
  "casNum": "462-95-3",
  "formula": "C5H12O2",
  "molWeight": "104.15",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Ethylal-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "87-88 C"
   },
   {
    "key": "Flash Point",
    "value": "-2 C"
   },
   {
    "key": "Density",
    "value": "0.831 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.380"
   }
  ],
  "applications": [
   "Pharmaceutical manufacturing as process solvent",
   "Fragrance and flavour ingredient in cosmetics",
   "Industrial intermediate in organic synthesis",
   "Solvent for paints varnishes and lacquers",
   "Used in perfumery as fixative and carrier"
  ],
  "advantages": [
   "Low boiling point for easy recovery",
   "Excellent solvency for resins and polymers",
   "Good stability under normal storage conditions"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Methylal",
  "url": "https://kcilglobal.com/products/methylal/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Dimethoxymethane; Formal; Methylene Dimethyl Ether; DMM; Dimethyl Formal",
  "casNum": "109-87-5",
  "formula": "C3H8O2",
  "molWeight": "76.09",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Methylal-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "42-43 C"
   },
   {
    "key": "Flash Point",
    "value": "-18 C"
   },
   {
    "key": "Density",
    "value": "0.860 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.354"
   },
   {
    "key": "Solubility",
    "value": "Partially miscible with water"
   }
  ],
  "applications": [
   "Green solvent substitute for chlorinated solvents and toluene",
   "Pharmaceutical synthesis as process solvent",
   "Manufacturing of specialty adhesives and coatings",
   "Fuel additive to reduce diesel particulate emissions",
   "Aerosol propellant and carrier solvent in cosmetics",
   "Intermediate for formaldehyde derivatives"
  ],
  "advantages": [
   "Biodegradable and environmentally friendly green chemistry solvent",
   "Very low boiling point for easy separation",
   "Non-toxic alternative to traditional solvents",
   "Excellent solvency for fats oils and waxes"
  ],
  "packing": "200 kg MS drums.",
  "documents": [
   {
    "product": "Methylal",
    "type": "Download MSDS",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/Methylal.pdf"
   }
  ]
 },
 {
  "name": "2-Methyl Tetrahydrofuran (2-MeTHF)",
  "url": "https://kcilglobal.com/products/2-methyltetrahydrofuran/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "2-MeTHF; 2-Methyloxolane; Methyl Tetrahydrofuran",
  "casNum": "96-47-9",
  "formula": "C5H10O",
  "molWeight": "86.13",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/2-Methyl-THF-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "78-80 C"
   },
   {
    "key": "Flash Point",
    "value": "-11 C"
   },
   {
    "key": "Density",
    "value": "0.855 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.405"
   },
   {
    "key": "Solubility",
    "value": "Partially miscible with water"
   }
  ],
  "applications": [
   "Green replacement for THF and DCM in pharmaceutical synthesis",
   "Grignard and organolithium reactions",
   "API manufacturing as bio-renewable solvent",
   "Extraction solvent - forms two phases with water enabling easy separation",
   "HPLC mobile phase alternative to THF",
   "Flow chemistry and continuous manufacturing processes"
  ],
  "advantages": [
   "Bio-renewable derived from agricultural waste (furfural)",
   "Lower water miscibility than THF for easier workup and extraction",
   "Higher boiling point than THF for better reaction control",
   "Reduced environmental impact vs traditional solvents"
  ],
  "packing": "160 kg MS drums.",
  "documents": []
 },
 {
  "name": "2,5,7,10-Tetraoxaundecane (TOU)",
  "url": "https://kcilglobal.com/products/tou/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "TOU; Monoglyme-Dimethyl Acetal; Bis(2-methoxyethyl) formal; Dimethyl Acetal of Diglyme",
  "casNum": "4747-05-1",
  "formula": "C7H16O4",
  "molWeight": "164.20",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/TOU-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "170-172 C"
   },
   {
    "key": "Flash Point",
    "value": "65 C"
   },
   {
    "key": "Density",
    "value": "0.977 g/mL"
   }
  ],
  "applications": [
   "High-boiling specialty solvent for pharmaceutical synthesis",
   "Electrolyte co-solvent in lithium batteries",
   "Industrial process solvent for fine chemicals",
   "Intermediate in specialty chemical manufacture"
  ],
  "advantages": [
   "High boiling point for demanding synthesis conditions",
   "Excellent thermal stability",
   "Good compatibility with polar and non-polar substrates"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Triglyme",
  "url": "https://kcilglobal.com/products/triglyme/",
  "category": "solvent",
  "catLabel": "Solvent",
  "synonyms": "Triethylene Glycol Dimethyl Ether; 1,2-Bis(2-methoxyethoxy)ethane; TEGDME; Dimethoxyethoxyethane",
  "casNum": "112-49-2",
  "formula": "C8H18O4",
  "molWeight": "178.23",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Triglyme-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "216 C"
   },
   {
    "key": "Flash Point",
    "value": "111 C"
   },
   {
    "key": "Density",
    "value": "1.005 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.423"
   },
   {
    "key": "Viscosity",
    "value": "3.0 cP"
   }
  ],
  "applications": [
   "High-boiling reaction solvent for pharmaceutical API synthesis",
   "Electrolyte in lithium-air and lithium-sulphur batteries",
   "Industrial extraction and separation processes",
   "Complexing agent for metal ions in organometallic reactions",
   "Specialty polymer synthesis"
  ],
  "advantages": [
   "Very high boiling point for demanding high-temperature reactions",
   "Excellent thermal stability",
   "Strong complexing ability for cations (similar to crown ethers)"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Phenyl Boronic Acid (PBA)",
  "url": "https://kcilglobal.com/products/phenyl-boronic-acid/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "PBA; Benzeneboronic Acid; Phenylboronic Acid; Boronic Acid Phenyl",
  "casNum": "98-80-6",
  "formula": "C6H7BO2",
  "molWeight": "121.93",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Phenyl-Boronic-Acid-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White to off-white crystalline powder"
   },
   {
    "key": "Melting Point",
    "value": "216-219 C"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 98%"
   },
   {
    "key": "Solubility",
    "value": "Soluble in ethanol acetone; slightly soluble in water"
   }
  ],
  "applications": [
   "Key building block in Suzuki cross-coupling reactions for pharmaceutical APIs",
   "Synthesis of biphenyl derivatives used in drugs (sartans terlipressin)",
   "Saccharide sensing and glucose monitoring applications",
   "Reagent in organic synthesis for C-C bond formation",
   "Manufacturing of specialty polymers with boronic acid functionality",
   "OLED and electronic material synthesis"
  ],
  "advantages": [
   "High purity grade suitable for pharmaceutical synthesis",
   "Stable solid easy to handle and store",
   "Versatile coupling partner for diverse aryl substrates"
  ],
  "packing": "25 kg HDPE drums.",
  "documents": [
   {
    "product": "Phenyl Boronic Acid",
    "type": "Download MSDS",
    "url": "https://kcilglobal.com/wp-content/uploads/2024/07/Phenyl-Boronic-Acid.pdf"
   }
  ]
 },
 {
  "name": "5-(Ethylthio)-1H-tetrazole (ETT)",
  "url": "https://kcilglobal.com/products/5-ethylthio-1h-tetrazole-ett/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "ETT; 5-Ethylmercaptotetrazole; 1H-Tetrazole 5-(Ethylthio)",
  "casNum": "89797-68-2",
  "formula": "C3H6N4S",
  "molWeight": "130.17",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/ETT-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White to off-white solid"
   },
   {
    "key": "Melting Point",
    "value": "99-104 C"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 97%"
   }
  ],
  "applications": [
   "Activator in oligonucleotide synthesis - phosphoramidite coupling step",
   "Key reagent in DNA and RNA synthesis",
   "Used in solid-phase peptide synthesis (SPPS)",
   "Pharmaceutical research and biotech API production"
  ],
  "advantages": [
   "High coupling efficiency in nucleotide synthesis",
   "Stable solid form for accurate dosing",
   "Pharmaceutical grade purity"
  ],
  "packing": "5 kg, 25 kg drums.",
  "documents": []
 },
 {
  "name": "2-Amino-4'-chlorobiphenyl",
  "url": "https://kcilglobal.com/products/2-amino-4-chlorobiphenyl/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "4'-Chloro-2-aminobiphenyl; 2-Amino-4-chloro-1,1'-biphenyl; 4-Chloro-2-phenylaniline",
  "casNum": "69423-06-9",
  "formula": "C12H10ClN",
  "molWeight": "203.67",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/2-Amino-4-Chlorobiphenyl-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Off-white to light brown solid"
   },
   {
    "key": "Melting Point",
    "value": "51-55 C"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 97%"
   }
  ],
  "applications": [
   "Pharmaceutical intermediate for antihypertensive drugs - sartan family losartan valsartan irbesartan",
   "Key intermediate in synthesis of Irbesartan and Candesartan",
   "Specialty chemical for agrochemical intermediates",
   "Organic electronic material precursor"
  ],
  "advantages": [
   "High purity pharmaceutical-grade quality",
   "Critical building block for cardiovascular drug synthesis",
   "Reliable supply from dedicated KCIL manufacturing"
  ],
  "packing": "25 kg HDPE drums.",
  "documents": []
 },
 {
  "name": "4-Chloro Phenyl Boronic Acid",
  "url": "https://kcilglobal.com/products/4-chloro-phenyl-boronic-acid/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "4-Chlorobenzeneboronic Acid; (4-Chlorophenyl)boronic Acid; p-Chlorophenylboronic Acid",
  "casNum": "1679-18-1",
  "formula": "C6H6BClO2",
  "molWeight": "156.38",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/4-Chloro-Phenyl-Boronic-Acid-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White crystalline powder"
   },
   {
    "key": "Melting Point",
    "value": "280 C (dec)"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 98%"
   }
  ],
  "applications": [
   "Suzuki coupling partner for pharmaceutical API synthesis",
   "Building block for biphenyl-containing drugs",
   "Synthesis of antifungal and antibacterial agents",
   "Agrochemical intermediate production",
   "OLED and semiconductor material synthesis"
  ],
  "advantages": [
   "High purity for reliable coupling efficiency",
   "Versatile for Pd-catalyzed cross-coupling reactions",
   "Stable crystalline solid - easy handling and storage"
  ],
  "packing": "25 kg HDPE drums.",
  "documents": []
 },
 {
  "name": "HOBt (1-Hydroxybenzotriazole) In NMP",
  "url": "https://kcilglobal.com/products/1-hydroxybenzotriazole-hobt-in-nmp/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "HOBt in NMP; 1-Hydroxybenzotriazole Solution; Hydroxybenzotriazole NMP Solution",
  "casNum": "2592-95-2",
  "formula": "C6H5N3O",
  "molWeight": "135.12",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/HOBt-in-NMP-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to pale yellow solution in NMP"
   },
   {
    "key": "Concentration",
    "value": "Typically 0.5 M in NMP"
   },
   {
    "key": "Purity of HOBt",
    "value": "Min 98%"
   }
  ],
  "applications": [
   "Coupling reagent in solid-phase peptide synthesis (SPPS)",
   "Suppression of racemization in peptide bond formation",
   "Synthesis of amide bonds in pharmaceutical API manufacturing",
   "Active ester formation in bioconjugation applications"
  ],
  "advantages": [
   "Ready-to-use solution eliminates dust hazard of dry HOBt solid",
   "NMP solvent ensures complete dissolution and stability",
   "Safe handling vs dry HOBt which is classified as explosive"
  ],
  "packing": "20 L, 200 L sealed drums.",
  "documents": []
 },
 {
  "name": "Dimethyl Benzyl Carbinyl Butyrate",
  "url": "https://kcilglobal.com/products/dimethyl-benzyl-carbinyl-butyrate/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "DMBC Butyrate; 2-Methyl-4-phenyl-2-butanol Butyrate; Dimethylbenzylcarbinyl Butyrate; Gardenia",
  "casNum": "10094-34-5",
  "formula": "C15H22O2",
  "molWeight": "234.33",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/DMBC-Butyrate-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Colourless to pale yellow liquid"
   },
   {
    "key": "Boiling Point",
    "value": "290 C"
   },
   {
    "key": "Flash Point",
    "value": ">100 C"
   },
   {
    "key": "Density",
    "value": "0.99 g/mL"
   },
   {
    "key": "Odour",
    "value": "Floral gardenia-like fragrance"
   }
  ],
  "applications": [
   "Fragrance ingredient in high-end perfumery and fine fragrances",
   "Soaps and cosmetics formulations",
   "Flavour additive in food applications (FEMA approved)",
   "Aroma chemical for household products and detergents",
   "Key ingredient in floral and fresh fragrance compositions"
  ],
  "advantages": [
   "Authentic gardenia/jasmine floral note",
   "Excellent stability across various formulation pH ranges",
   "FEMA and GRAS approved for food and cosmetic use"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Sodium tert-Butoxide (STB) in THF",
  "url": "https://kcilglobal.com/products/sodium-tert-butoxide-in-tetrahydrofuran/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "NaOtBu in THF; Sodium t-Butoxide THF Solution; Sodium tert-Butylate in Tetrahydrofuran",
  "casNum": "865-48-5",
  "formula": "C4H9ONa",
  "molWeight": "96.10",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/STB-in-THF-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear colourless to pale yellow solution"
   },
   {
    "key": "Concentration",
    "value": "1.0 M solution in THF"
   },
   {
    "key": "Purity",
    "value": "Min 97% (NaOtBu basis)"
   },
   {
    "key": "Flash Point",
    "value": "-14 C (THF solvent)"
   }
  ],
  "applications": [
   "Strong base for deprotonation in pharmaceutical API synthesis",
   "Buchwald-Hartwig amination reactions",
   "Wittig and Horner-Wadsworth-Emmons reactions",
   "Synthesis of beta-keto esters and active methylene compounds",
   "Preparation of enolates for C-C bond forming reactions"
  ],
  "advantages": [
   "Ready-to-use solution eliminates moisture sensitivity issues of dry solid",
   "Consistent molarity for reproducible reactions",
   "Safer handling as solution vs pyrophoric dry solid"
  ],
  "packing": "20 L, 200 L sealed drums (nitrogen atmosphere).",
  "documents": []
 },
 {
  "name": "Potassium tert-Butoxide in THF",
  "url": "https://kcilglobal.com/products/potassium-tert-butoxide-in-tetrahydrofuran/",
  "category": "specialty",
  "catLabel": "Specialty",
  "synonyms": "KOtBu in THF; Potassium t-Butoxide THF Solution; Potassium tert-Butylate in Tetrahydrofuran",
  "casNum": "865-47-4",
  "formula": "C4H9OK",
  "molWeight": "112.21",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/PTB-in-THF-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to slightly yellow solution in THF"
   },
   {
    "key": "Concentration",
    "value": "1.0 M solution in THF"
   },
   {
    "key": "Purity",
    "value": "Min 97% (KOtBu basis)"
   },
   {
    "key": "Flash Point",
    "value": "-14 C (THF solvent)"
   }
  ],
  "applications": [
   "Stronger base than NaOtBu for demanding deprotonation reactions",
   "Synthesis of phosphorus ylides for Wittig reactions",
   "Elimination reactions (E2) in synthesis of alkenes",
   "Preparation of aryne intermediates",
   "Dye and pigment synthesis",
   "Synthesis of carbenes and carbenoid species"
  ],
  "advantages": [
   "Higher basicity than sodium analogue for more challenging substrates",
   "Ready-to-use solution for safe and convenient handling",
   "Nitrogen-sealed packaging prevents moisture ingress"
  ],
  "packing": "20 L, 200 L sealed drums (nitrogen atmosphere).",
  "documents": []
 },
 {
  "name": "1,3-Benzodioxole",
  "url": "https://kcilglobal.com/products/13-benzodioxole/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "Methylene Glycol; Catechol Methylene Ether; 3,4-Methylenedioxybenzene; Piperonylene",
  "casNum": "274-09-9",
  "formula": "C7H6O2",
  "molWeight": "122.12",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/1-3-Benzodioxole-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to pale yellow liquid"
   },
   {
    "key": "Boiling Point",
    "value": "172-173 C"
   },
   {
    "key": "Flash Point",
    "value": "51 C"
   },
   {
    "key": "Density",
    "value": "1.064 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.531"
   }
  ],
  "applications": [
   "Pharmaceutical intermediate for cardiovascular and CNS drugs",
   "Synthesis of Paroxetine (SSRI antidepressant) and Trazodone",
   "Agrochemical intermediate - synthesis of pyrethroid insecticides",
   "Fragrance chemical contributing to floral and fresh notes",
   "Intermediate for synthesis of safrole derivatives"
  ],
  "advantages": [
   "High purity pharmaceutical-grade intermediate",
   "Critical building block for CNS and cardiovascular drugs",
   "Reliable sourcing from dedicated KCIL production"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "3-Bromocarbazole",
  "url": "https://kcilglobal.com/products/3-bromocarbazol/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "3-Bromo-9H-carbazole; 3-Bromo-carbazol",
  "casNum": "3652-91-3",
  "formula": "C12H8BrN",
  "molWeight": "246.10",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/3-Bromocarbazole-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White to off-white crystalline solid"
   },
   {
    "key": "Melting Point",
    "value": "156-160 C"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 97%"
   }
  ],
  "applications": [
   "OLED material - hole transport layer in organic light-emitting diodes",
   "Organic semiconductor intermediate for electronic devices",
   "Pharmaceutical research intermediate",
   "Synthesis of nitrogen-containing polycyclic aromatic compounds",
   "Solar cell and photovoltaic material synthesis"
  ],
  "advantages": [
   "High purity suitable for electronic material applications",
   "KCIL custom synthesis capability for consistent supply",
   "Available in research and commercial quantities"
  ],
  "packing": "5 kg, 25 kg HDPE drums.",
  "documents": []
 },
 {
  "name": "2-Chlorothiophene",
  "url": "https://kcilglobal.com/products/2-chlorothiophene/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "2-Chloro-thiophene; alpha-Chlorothiophene",
  "casNum": "96-43-5",
  "formula": "C4H3ClS",
  "molWeight": "118.58",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/2-Chlorothiophene-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to pale yellow liquid"
   },
   {
    "key": "Boiling Point",
    "value": "128-130 C"
   },
   {
    "key": "Flash Point",
    "value": "23 C"
   },
   {
    "key": "Density",
    "value": "1.284 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.548"
   }
  ],
  "applications": [
   "Pharmaceutical intermediate for cardiovascular and CNS drugs",
   "Precursor to thiophene-containing APIs - clopidogrel ticlopidine",
   "Agrochemical synthesis intermediate",
   "Organic semiconductor and OLED material precursor",
   "Building block for heterocyclic chemistry research"
  ],
  "advantages": [
   "High purity for pharmaceutical applications",
   "Consistent quality from dedicated KCIL manufacturing",
   "Available in commercial quantities"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "2,5-Dichlorothiophene",
  "url": "https://kcilglobal.com/products/2-5-dichlorothiophene/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "2,5-Dichloro-thiophene; alpha,alpha-Dichlorothiophene",
  "casNum": "3172-52-9",
  "formula": "C4H2Cl2S",
  "molWeight": "153.03",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/2-5-Dichlorothiophene-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear to pale yellow liquid"
   },
   {
    "key": "Boiling Point",
    "value": "162 C"
   },
   {
    "key": "Flash Point",
    "value": "46 C"
   },
   {
    "key": "Density",
    "value": "1.441 g/mL"
   }
  ],
  "applications": [
   "Advanced intermediate for agrochemical herbicides and insecticides",
   "Pharmaceutical building block for thiophene-based drugs",
   "Precursor for conducting polymer synthesis (polythiophenes)",
   "Specialty chemical for organic electronic materials"
  ],
  "advantages": [
   "High purity for sensitive downstream synthesis",
   "KCIL custom synthesis with strict quality control",
   "Reliable commercial-scale supply"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Naphthyl Boronic Acid",
  "url": "https://kcilglobal.com/products/naphthyl-boronic-acid/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "2-Naphthaleneboronic Acid; Naphthalene-2-boronic Acid; 2-Boronaphthalene",
  "casNum": "32813-27-7",
  "formula": "C10H9BO2",
  "molWeight": "171.99",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Naphthyl-Boronic-Acid-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White crystalline powder"
   },
   {
    "key": "Melting Point",
    "value": "205-208 C"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 97%"
   }
  ],
  "applications": [
   "Suzuki coupling for synthesis of naphthalene-containing pharmaceuticals",
   "Building block for liquid crystal and OLED materials",
   "Agrochemical intermediate synthesis",
   "Synthesis of biaryls and extended aromatic systems for drug discovery"
  ],
  "advantages": [
   "High purity for demanding Pd-catalyzed cross-coupling reactions",
   "Stable solid easy handling and storage",
   "KCIL custom synthesis ensures consistent quality"
  ],
  "packing": "5 kg, 25 kg HDPE drums.",
  "documents": []
 },
 {
  "name": "Paroxetine Intermediate",
  "url": "https://kcilglobal.com/products/paroxetene-intermediate/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "Paroxetine Key Intermediate; trans-4-(4-Fluorophenyl)-3-hydroxymethyl piperidine derivative",
  "casNum": "N/A",
  "formula": "Contact KCIL",
  "molWeight": "Contact KCIL",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/Paroxetine-Intermediate-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "White to off-white solid"
   },
   {
    "key": "Purity HPLC",
    "value": "Min 97%"
   }
  ],
  "applications": [
   "Critical intermediate in synthesis of Paroxetine (Paxil/Seroxat) - SSRI antidepressant",
   "Pharmaceutical manufacturing of CNS drugs",
   "Contract manufacturing for global pharmaceutical companies",
   "Custom synthesis for drug development programs"
  ],
  "advantages": [
   "High purity pharmaceutical-grade quality",
   "KCIL custom synthesis with strict quality control",
   "Reliable supply chain for pharma manufacturers worldwide"
  ],
  "packing": "5 kg, 25 kg HDPE drums.",
  "documents": []
 },
 {
  "name": "3-Methyl Tetrahydrofuran (3-MeTHF)",
  "url": "https://kcilglobal.com/products/3-methyl-tetrahydrofuran-3-methyl-thf/",
  "category": "custom",
  "catLabel": "Custom Synthesis",
  "synonyms": "3-MeTHF; 3-Methyltetrahydrofuran; 3-Methyloxolane",
  "casNum": "13423-15-9",
  "formula": "C5H10O",
  "molWeight": "86.13",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/3-Methyl-THF-1.jpg",
  "properties": [
   {
    "key": "Appearance",
    "value": "Clear Colourless liquid"
   },
   {
    "key": "Boiling Point",
    "value": "86 C"
   },
   {
    "key": "Flash Point",
    "value": "-14 C"
   },
   {
    "key": "Density",
    "value": "0.868 g/mL"
   },
   {
    "key": "Refractive Index",
    "value": "1.408"
   }
  ],
  "applications": [
   "Specialty solvent for pharmaceutical synthesis with fine-tuned solvent properties",
   "Organolithium and Grignard reactions",
   "Custom synthesis with specific boiling and solubility parameters",
   "Analytical chemistry and HPLC applications"
  ],
  "advantages": [
   "Specific physical properties enabling selective reactions",
   "KCIL custom synthesis capability for on-demand production",
   "Available in commercial quantities"
  ],
  "packing": "200 kg MS drums.",
  "documents": []
 },
 {
  "name": "Green Chemistry Solutions",
  "url": "https://kcilglobal.com/products/green-chemistry/",
  "category": "green",
  "catLabel": "Green Chemistry",
  "synonyms": "Sustainable Solvents; Bio-based Solvents; Eco-friendly Chemistry",
  "casNum": "N/A",
  "formula": "N/A",
  "molWeight": "N/A",
  "image": "https://kcilglobal.com/wp-content/uploads/2024/07/green-tea-bud-leaves-green-tea-plantations-morning-1.jpg",
  "properties": [
   {
    "key": "Scope",
    "value": "Bio-renewable and biodegradable solvents"
   },
   {
    "key": "Standards",
    "value": "12 Principles of Green Chemistry"
   },
   {
    "key": "Certifications",
    "value": "ISO 14001 aligned"
   }
  ],
  "applications": [
   "Pharmaceutical manufacturing under green chemistry principles",
   "Bio-renewable solvent supply for sustainable industrial processes",
   "Replacement of hazardous chlorinated solvents in fine chemistry",
   "Green agrochemical formulation solvents",
   "Sustainable cosmetics and personal care formulations"
  ],
  "advantages": [
   "Reduced environmental footprint vs traditional solvents",
   "Biodegradable and bio-renewable raw material sources",
   "Supports regulatory compliance (REACH EPA Green Chemistry)",
   "Cost-competitive with conventional solvents"
  ],
  "packing": "Various drum sizes.",
  "documents": []
 }
];}
function getAppsMatrix(){return [
 {
  "num": "1",
  "product": "1,4-Dioxane",
  "industries": [
   "Pharmaceutical",
   "Agrochemicals",
   "Industrial",
   "Fine Chemicals",
   "Electronic",
   "Nuclear Industry",
   "Dyes"
  ]
 },
 {
  "num": "2",
  "product": "1,3-Dioxolane",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Fine Chemicals"
  ]
 },
 {
  "num": "3",
  "product": "Diisopropyl Ether (DIPE)",
  "industries": [
   "Pharmaceutical",
   "Fuel Additives",
   "Fine Chemicals"
  ]
 },
 {
  "num": "4",
  "product": "Dibutyl Ether",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Fine Chemicals"
  ]
 },
 {
  "num": "5",
  "product": "Acetonitrile",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Fine Chemicals",
   "Agrochemicals"
  ]
 },
 {
  "num": "6",
  "product": "Tetrahydrofuran (THF)",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Fine Chemicals",
   "Agrochemicals",
   "Grignard Reaction"
  ]
 },
 {
  "num": "7",
  "product": "TOU (Monoglyme Dimethyl Acetal)",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Fine Chemicals"
  ]
 },
 {
  "num": "8",
  "product": "NMP (N-Methylpyrrolidone)",
  "industries": [
   "Pharmaceutical",
   "Industrial",
   "Electronics",
   "Lithium-ion Batteries"
  ]
 },
 {
  "num": "9",
  "product": "Triglyme",
  "industries": [
   "Pharmaceutical",
   "Battery Electrolytes"
  ]
 },
 {
  "num": "10",
  "product": "Methylal",
  "industries": [
   "Green Solvent",
   "Pharmaceutical",
   "Fuel Additive",
   "Aerosol Propellant"
  ]
 },
 {
  "num": "11",
  "product": "2-Methyl THF",
  "industries": [
   "Pharmaceutical",
   "Agrochemicals",
   "Green Solvent",
   "Extraction"
  ]
 },
 {
  "num": "12",
  "product": "Phenyl Boronic Acid (PBA)",
  "industries": [
   "Pharmaceutical - Suzuki Coupling",
   "OLED Materials",
   "Specialty Polymers"
  ]
 },
 {
  "num": "13",
  "product": "ETT (5-Ethylthio-tetrazole)",
  "industries": [
   "Oligonucleotide Synthesis",
   "DNA/RNA Manufacturing",
   "Pharmaceutical Research"
  ]
 },
 {
  "num": "14",
  "product": "2-Amino-4'-chlorobiphenyl",
  "industries": [
   "Pharmaceutical - Antihypertensives (Sartans)",
   "Agrochemicals"
  ]
 },
 {
  "num": "15",
  "product": "HOBt in NMP",
  "industries": [
   "Peptide Synthesis (SPPS)",
   "Pharmaceutical API Manufacturing"
  ]
 },
 {
  "num": "16",
  "product": "Sodium tert-Butoxide in THF",
  "industries": [
   "Pharmaceutical API Synthesis",
   "Buchwald-Hartwig",
   "Wittig Reactions"
  ]
 },
 {
  "num": "17",
  "product": "Potassium tert-Butoxide in THF",
  "industries": [
   "Pharmaceutical API Synthesis",
   "Strong Base Chemistry",
   "Elimination Reactions"
  ]
 },
 {
  "num": "18",
  "product": "1,3-Benzodioxole",
  "industries": [
   "Pharmaceutical - CNS and Cardiovascular",
   "Agrochemicals - Pyrethroids",
   "Fragrance"
  ]
 },
 {
  "num": "19",
  "product": "2-Chlorothiophene",
  "industries": [
   "Pharmaceutical - Cardiovascular (Clopidogrel)",
   "Agrochemicals",
   "OLED Materials"
  ]
 },
 {
  "num": "20",
  "product": "2,5-Dichlorothiophene",
  "industries": [
   "Agrochemicals",
   "Pharmaceutical",
   "Organic Electronic Materials"
  ]
 },
 {
  "num": "21",
  "product": "Dimethyl Benzyl Carbinyl Butyrate",
  "industries": [
   "Fragrance and Perfumery",
   "Cosmetics",
   "Food Flavours"
  ]
 },
 {
  "num": "22",
  "product": "Paroxetine Intermediate",
  "industries": [
   "Pharmaceutical - SSRI Antidepressants"
  ]
 },
 {
  "num": "23",
  "product": "3-Bromocarbazole",
  "industries": [
   "OLED - Hole Transport Materials",
   "Organic Electronics",
   "Pharmaceutical Research"
  ]
 },
 {
  "num": "24",
  "product": "Naphthyl Boronic Acid",
  "industries": [
   "Pharmaceutical - Suzuki Coupling",
   "OLED Materials",
   "Drug Discovery"
  ]
 },
 {
  "num": "25",
  "product": "4-Chloro Phenyl Boronic Acid",
  "industries": [
   "Pharmaceutical - API Synthesis",
   "Agrochemicals",
   "OLED and Semiconductor"
  ]
 }
];}

function log(msg,t){t=t||'info';var b=document.getElementById('logBox');var e=document.createElement('div');e.className='log-entry log-'+t;e.textContent='['+new Date().toLocaleTimeString()+'] '+msg;b.appendChild(e);b.scrollTop=b.scrollHeight;}
function setProgress(p){document.getElementById('pFill').style.width=p+'%';document.getElementById('pLabel').textContent=p+'%';}
function setStatus(t,s){s=s||'';document.getElementById('statusText').textContent=t;var d=document.getElementById('statusDot');d.className='status-dot';if(s)d.classList.add(s);}
function setCrawlStatus(t){document.getElementById('crawlStatus').textContent=t;}
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function delay(ms){return new Promise(function(r){setTimeout(r,ms);});}
function autoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,120)+'px';}
function chatKeydown(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChatMessage();}}
function setMode(m){
  mode=m;
  document.getElementById('modeDeep').classList.toggle('active',m==='deep');
  document.getElementById('modeQuick').classList.toggle('active',m==='quick');
  document.getElementById('btnText').textContent=m==='deep'?'Start Deep Scrape':'Quick Scan';
}
function switchTab(t){
  currentTab=t;
  document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('active',x.dataset.tab===t);});
  document.querySelectorAll('.tab-content').forEach(function(x){x.classList.toggle('active',x.id==='tab-'+t);});
  var fb=document.getElementById('filterBar');
  if(fb)fb.style.display=(t==='ai'||t==='multisource'||t==='market'||t==='competitors')?'none':'flex';
  updateCount();
}
function updateCount(){var d=scrapedData[currentTab];var n=d?d.length:0;document.getElementById('resultCount').textContent=n>0?n+' item'+(n!==1?'s':''):'No data yet';}
function filterResults(){
  var q=document.getElementById('searchInput').value.toLowerCase();
  var m={products:'#grid-products .product-detail-card',applications:'#list-applications .app-card',appsmatrix:'.matrix-table tr',properties:'#list-properties .prop-section',documents:'#list-documents .doc-card'};
  var sel=m[currentTab];
  if(sel)document.querySelectorAll(sel).forEach(function(e){e.style.display=e.textContent.toLowerCase().indexOf(q)>=0?'':'none';});
}
async function fetchPage(url){
  var r=await fetch(PROXY+encodeURIComponent(url),{signal:AbortSignal.timeout(15000)});
  if(!r.ok)throw new Error('HTTP '+r.status);
  return(await r.json()).contents;
}
function parse(html){return new DOMParser().parseFromString(html,'text/html');}

// FIXED PARSER - Uses "Synonyms of X" vs "Applications of X" headings
function parseProductPage(doc,meta){
  var synonyms='',casNum='',formula='',molWeight='',packing='',image='',section='';
  var properties=[],applications=[],advantages=[],documents=[];
  doc.querySelectorAll('.elementor-widget-container').forEach(function(el){
    var raw=el.textContent.trim(),low=raw.toLowerCase();
    var hasTable=!!el.querySelector('table'),hasList=!!el.querySelector('.product-list');
    if(!hasTable&&!hasList){
      if(low.indexOf('synonyms of')>=0||(low.indexOf('synonym')===0&&raw.length<80)){section='synonyms';return;}
      if(low.indexOf('applications of')>=0||(/^applications\s*(of|:)/i.test(low)&&raw.length<80)){section='applications';return;}
      if(low.indexOf('advantages of')>=0||(/^advantages/i.test(low)&&raw.length<60)){section='advantages';return;}
      if(/^physical\s*&?\s*chemical\s*properties/i.test(low)){section='props';return;}
      if(/^specification/i.test(low)&&raw.length<40){section='spec';return;}
      if(/^packing/i.test(low)&&raw.length<30){section='packing';return;}
      if(section==='packing'&&raw.length>5&&raw.length<300){packing=raw;return;}
    }
    if(hasList){
      var items=Array.from(el.querySelectorAll('.product-list li')).map(function(x){return x.textContent.trim();}).filter(Boolean);
      if(section==='synonyms'){
        items.forEach(function(item){
          if(/cas\s*number\s*:/i.test(item))casNum=item.replace(/cas\s*number\s*:\s*/i,'').trim();
          else if(/molecular\s*formula\s*:/i.test(item))formula=item.replace(/molecular\s*formula\s*:\s*/i,'').trim();
          else if(/molecular\s*weight\s*:/i.test(item))molWeight=item.replace(/molecular\s*weight\s*:\s*/i,'').trim();
          else if(!synonyms)synonyms=item;
        });
      }else if(section==='applications'){items.forEach(function(a){if(a)applications.push(a);});}
      else if(section==='advantages'){items.forEach(function(a){if(a)advantages.push(a);});}
    }
    if(hasTable&&(section==='props'||section==='spec')){
      el.querySelectorAll('tr').forEach(function(tr){
        var tds=Array.from(tr.querySelectorAll('td'));
        if(tds.length>=2){var k=tds[0].textContent.trim(),v=tds[1].textContent.trim();if(k&&v&&!/characteristic|wavelength/i.test(k))properties.push({key:k,value:v});}
      });
    }
    el.querySelectorAll('a[href*=".pdf"]').forEach(function(a){
      var href=a.getAttribute('href')||'',t=a.textContent.trim()||'Download';
      if(href&&!documents.find(function(d){return d.url===href;}))
        documents.push({product:meta.name,type:t,url:href.startsWith('http')?href:'https://kcilglobal.com'+href});
    });
  });
  doc.querySelectorAll('img[src]').forEach(function(img){
    var s=img.getAttribute('src')||'';
    if(s.indexOf('/uploads/2024/')>=0&&s.indexOf('logo')<0&&s.indexOf('PDF')<0&&!image)
      image=s.startsWith('//')?'https:'+s:s;
  });
  return Object.assign({},meta,{
    synonyms:synonyms||meta.synonyms,casNum:casNum||meta.casNum,
    formula:formula||meta.formula,molWeight:molWeight||meta.molWeight,
    properties:properties.length>2?properties:meta.properties,
    applications:applications.length>0?applications:meta.applications,
    advantages:advantages.length>0?advantages:meta.advantages,
    packing:packing||meta.packing,documents:documents.length>0?documents:meta.documents,
    image:image||meta.image
  });
}

// ---- RENDERERS ----
function renderProducts(products){
  var g=document.getElementById('grid-products'),em=document.getElementById('empty-products');
  g.innerHTML='';if(!products.length){em.style.display='';return;}em.style.display='none';
  products.forEach(function(p,i){
    var card=document.createElement('div');card.className='product-detail-card';card.style.animationDelay=(i*12)+'ms';
    var appTags=p.applications.slice(0,3).map(function(a){return '<span class="app-tag">'+esc(a.length>45?a.slice(0,45)+'...':a)+'</span>';}).join('');
    var props=[];
    if(p.casNum&&p.casNum!=='N/A')props.push(['CAS #',p.casNum]);
    if(p.formula&&p.formula!=='N/A')props.push(['Formula',p.formula]);
    if(p.molWeight&&p.molWeight!=='N/A')props.push(['M.W.',p.molWeight]);
    var bp=p.properties.find(function(x){return /boiling/i.test(x.key);});
    if(bp)props.push(['B.P.',bp.value]);
    var propsH=props.slice(0,4).map(function(x){return '<div class="prop-item"><span class="prop-label">'+esc(x[0])+'</span><span class="prop-value">'+esc(x[1])+'</span></div>';}).join('');
    card.innerHTML='<div class="card-header"><div class="card-cat cat-'+p.category+'">'+esc(p.catLabel)+'</div><div class="card-name">'+esc(p.name)+'</div>'+(p.synonyms?'<div class="card-synonyms">'+esc(p.synonyms.length>85?p.synonyms.slice(0,85)+'...':p.synonyms)+'</div>':'')+'</div>'
      +'<div class="card-body">'+(propsH?'<div class="card-props">'+propsH+'</div>':'')
      +(appTags?'<div class="card-apps"><div class="card-apps-title">Applications</div><div class="app-tags">'+appTags+'</div></div>':'')+'</div>'
      +'<div class="card-footer"><div class="card-url"><a href="'+esc(p.url)+'" target="_blank">'+esc(p.url.replace('https://kcilglobal.com',''))+'</a></div>'
      +'<button class="card-expand" onclick="openModal('+i+')">View All</button></div>';
    g.appendChild(card);
  });
  document.getElementById('b-products').textContent=products.length;
  document.getElementById('numProducts').textContent=products.length;
}

function renderApplications(products){
  var l=document.getElementById('list-applications'),em=document.getElementById('empty-applications');
  l.innerHTML='';
  var hasApps=products.filter(function(p){return p.applications&&p.applications.length>0;});
  if(!hasApps.length){em.style.display='';return;}em.style.display='none';
  hasApps.forEach(function(p,i){
    var div=document.createElement('div');div.className='app-card';div.style.animationDelay=(i*15)+'ms';
    var items=p.applications.map(function(a){return '<div class="app-item"><div class="app-item-bullet"></div>'+esc(a)+'</div>';}).join('');
    div.innerHTML='<div class="app-card-header"><div class="app-product-name">'+esc(p.name)+'</div><span class="app-cat cat-'+p.category+' card-cat">'+esc(p.catLabel)+'</span></div><div class="app-card-body"><div class="app-items">'+items+'</div></div>';
    l.appendChild(div);
  });
  var total=hasApps.reduce(function(s,p){return s+p.applications.length;},0);
  document.getElementById('b-applications').textContent=total;
  document.getElementById('numApps').textContent=total;
}

function renderAppsMatrix(rows){
  var w=document.getElementById('table-appsmatrix'),em=document.getElementById('empty-appsmatrix');
  w.innerHTML='';if(!rows.length){em.style.display='';return;}em.style.display='none';
  var html='<table class="matrix-table"><thead><tr><th>Sr.</th><th>KCIL Product</th><th>Industries / Applications</th></tr></thead><tbody>';
  rows.forEach(function(r){
    var tags=r.industries.map(function(ind){return '<span class="industry-tag">'+esc(ind)+'</span>';}).join('');
    html+='<tr><td>'+esc(r.num)+'</td><td>'+esc(r.product)+'</td><td>'+tags+'</td></tr>';
  });
  html+='</tbody></table>';w.innerHTML=html;
  document.getElementById('b-appsmatrix').textContent=rows.length;
}

function renderProperties(products){
  var l=document.getElementById('list-properties'),em=document.getElementById('empty-properties');
  l.innerHTML='';
  var hasProps=products.filter(function(p){return p.properties&&p.properties.length>0;});
  if(!hasProps.length){em.style.display='';return;}em.style.display='none';
  hasProps.forEach(function(p,i){
    var div=document.createElement('div');div.className='prop-section';div.style.animationDelay=(i*15)+'ms';
    var rows='';
    if(p.casNum&&p.casNum!=='N/A')rows+='<tr><td>CAS Number</td><td>'+esc(p.casNum)+'</td></tr>';
    if(p.formula&&p.formula!=='N/A')rows+='<tr><td>Molecular Formula</td><td>'+esc(p.formula)+'</td></tr>';
    if(p.molWeight&&p.molWeight!=='N/A')rows+='<tr><td>Molecular Weight</td><td>'+esc(p.molWeight)+'</td></tr>';
    if(p.synonyms)rows+='<tr><td>Synonyms</td><td>'+esc(p.synonyms)+'</td></tr>';
    rows+=p.properties.map(function(x){return '<tr><td>'+esc(x.key)+'</td><td>'+esc(x.value)+'</td></tr>';}).join('');
    div.innerHTML='<div class="prop-section-header"><span class="card-cat cat-'+p.category+' prop-section-cat">'+esc(p.catLabel)+'</span><div class="prop-section-name">'+esc(p.name)+'</div></div><table class="prop-table">'+rows+'</table>';
    l.appendChild(div);
  });
  var total=hasProps.reduce(function(s,p){return s+p.properties.length;},0);
  document.getElementById('b-properties').textContent=total;
}

function renderDocuments(products){
  var g=document.getElementById('list-documents'),em=document.getElementById('empty-documents');
  g.innerHTML='';
  var docs=products.flatMap(function(p){return p.documents||[];});
  if(!docs.length){em.style.display='';return;}em.style.display='none';
  docs.forEach(function(d,i){
    var a=document.createElement('a');a.className='doc-card';a.href=d.url;a.target='_blank';a.style.animationDelay=(i*12)+'ms';
    var icon=(d.type.toLowerCase().indexOf('msds')>=0)?'WARNING':'DOC';
    a.innerHTML='<div class="doc-icon">'+(icon==='WARNING'?'⚠️':'📋')+'</div><div><span class="doc-product">'+esc(d.product)+'</span><span class="doc-type">'+esc(d.type)+'</span></div>';
    g.appendChild(a);
  });
  document.getElementById('b-documents').textContent=docs.length;
}

// ---- MODAL ----
function openModal(i){
  var p=scrapedData.products[i];if(!p)return;
  var pr=[];
  if(p.casNum&&p.casNum!=='N/A')pr.push('<tr><td>CAS Number</td><td>'+esc(p.casNum)+'</td></tr>');
  if(p.formula&&p.formula!=='N/A')pr.push('<tr><td>Molecular Formula</td><td>'+esc(p.formula)+'</td></tr>');
  if(p.molWeight&&p.molWeight!=='N/A')pr.push('<tr><td>Molecular Weight</td><td>'+esc(p.molWeight)+'</td></tr>');
  p.properties.forEach(function(x){pr.push('<tr><td>'+esc(x.key)+'</td><td>'+esc(x.value)+'</td></tr>');});
  var prH=pr.length?'<div class="modal-section"><div class="modal-section-title">Physical and Chemical Properties</div><table class="modal-table">'+pr.join('')+'</table></div>':'';
  var apH=p.applications.length?'<div class="modal-section"><div class="modal-section-title">Applications</div><div class="modal-apps">'+p.applications.map(function(a){return '<span class="modal-app-item">'+esc(a)+'</span>';}).join('')+'</div></div>':'';
  var avH=(p.advantages&&p.advantages.length)?'<div class="modal-section"><div class="modal-section-title">Advantages</div><div class="modal-apps">'+p.advantages.map(function(a){return '<span class="modal-app-item">'+esc(a)+'</span>';}).join('')+'</div></div>':'';
  var dcH=(p.documents&&p.documents.length)?'<div class="modal-section"><div class="modal-section-title">Documents</div><div class="modal-docs">'+p.documents.map(function(d){return '<a href="'+esc(d.url)+'" target="_blank" class="modal-doc-link">PDF '+esc(d.type)+'</a>';}).join('')+'</div></div>':'';
  var pkH=p.packing?'<div class="modal-section"><div class="modal-section-title">Packing</div><p style="font-size:13px;color:var(--muted);line-height:1.6">'+esc(p.packing)+'</p></div>':'';
  document.getElementById('modalContent').innerHTML=
    '<div class="modal-title">'+esc(p.name)+'</div>'
    +'<div class="modal-subtitle">'+(p.synonyms?'<strong>Synonyms:</strong> '+esc(p.synonyms)+'&nbsp; ':'')+'<span class="card-cat cat-'+p.category+'">'+esc(p.catLabel)+'</span></div>'
    +(p.image?'<img src="'+esc(p.image)+'" style="max-width:150px;border-radius:8px;margin-bottom:16px;border:1px solid var(--glass-b)" onerror="this.style.display=\'none\'"/>':'')
    +prH+apH+avH+dcH+pkH
    +'<div class="modal-section"><div class="modal-section-title">Source</div><a href="'+esc(p.url)+'" target="_blank" style="font-size:12px;color:var(--accent)">'+esc(p.url)+'</a></div>';
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal(){document.getElementById('modalOverlay').classList.remove('open');}

// ---- AI CHAT ----
function askSuggestion(btn){document.getElementById('chatInput').value=btn.textContent;sendChatMessage();}

function addChatMsg(html,role){
  var msgs=document.getElementById('chatMessages');
  var welcome=document.querySelector('.ai-welcome');
  if(welcome)welcome.style.display='none';
  var div=document.createElement('div');div.className='chat-msg '+role;
  var avClass=role==='user'?'user-av':'ai-av';
  var avIcon=role==='user'?'U':'AI';
  div.innerHTML='<div class="chat-avatar '+avClass+'">'+avIcon+'</div><div class="chat-bubble">'+html+'</div>';
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function smartLocalAnswer(query){
  var q=query.toLowerCase();
  var products=scrapedData.products.length?scrapedData.products:getFullDataset();
  var matches=products.filter(function(p){
    var text=(p.name+' '+p.synonyms+' '+p.applications.join(' ')+' '+p.casNum).toLowerCase();
    var words=q.split(/\s+/).filter(function(w){return w.length>2;});
    return words.some(function(w){return text.indexOf(w)>=0;});
  });
  var isApps=/application|use|used for|industry|sector|purpose|where is/i.test(query);
  var isProps=/property|properties|boiling|flash|density|formula|cas|molecular|weight|refractive|appearance/i.test(query);
  var isCompare=/compare|vs|versus|difference|better|which is/i.test(query);
  var isAdv=/advantage|benefit|why use|feature/i.test(query);
  var isList=/list all|show all|all products|how many|which products|all chemicals/i.test(query);

  if(isList&&matches.length===0){
    var cats={};
    products.forEach(function(p){if(!cats[p.catLabel])cats[p.catLabel]=[];cats[p.catLabel].push(p.name);});
    var html='<div style="font-weight:700;margin-bottom:10px">KCIL Complete Product Portfolio ('+products.length+' products)</div>';
    Object.keys(cats).forEach(function(cat){
      html+='<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--dim);margin:8px 0 4px">'+esc(cat)+'</div>';
      html+=cats[cat].map(function(n){return '<span class="chat-product-ref">'+esc(n)+'</span>';}).join('');
    });
    return html;
  }
  if(matches.length===0){
    return '<div style="color:var(--muted);font-size:13px">No matching KCIL products found. Try names like <strong>Acetonitrile</strong>, <strong>THF</strong>, or topics like <em>pharmaceutical solvents</em>.</div>';
  }
  if(isCompare&&matches.length>=2){
    var html='<div style="font-weight:700;margin-bottom:12px">Comparison: '+matches.slice(0,2).map(function(p){return p.name;}).join(' vs ')+'</div>';
    matches.slice(0,2).forEach(function(p){
      html+='<div style="font-weight:700;color:var(--accent);margin-top:10px">'+esc(p.name)+'</div>';
      if(p.casNum)html+='<div style="font-size:11px;margin:2px 0"><strong>CAS:</strong> '+esc(p.casNum)+' | <strong>Formula:</strong> '+esc(p.formula)+'</div>';
      var bp=p.properties.find(function(x){return /boiling/i.test(x.key);});
      if(bp)html+='<div style="font-size:11px;margin:2px 0"><strong>Boiling Point:</strong> '+esc(bp.value)+'</div>';
      if(p.applications.length){html+='<div style="font-size:10px;color:var(--dim);margin:6px 0 2px">Applications:</div>';html+=p.applications.slice(0,3).map(function(a){return '<div class="chat-app-item"><div class="chat-app-dot"></div>'+esc(a)+'</div>';}).join('');}
    });
    return html;
  }
  var html='';
  matches.slice(0,3).forEach(function(p,idx){
    if(idx>0)html+='<hr style="border:none;border-top:1px solid var(--glass-b);margin:14px 0"/>';
    html+='<div class="chem-name">'+esc(p.name)+'</div>';
    if(p.synonyms)html+='<div class="chem-synoyms">Also known as: '+esc(p.synonyms)+'</div>';
    if(isProps||(!isApps&&!isAdv)){
      var pi=[];
      if(p.casNum&&p.casNum!=='N/A')pi.push({key:'CAS Number',value:p.casNum});
      if(p.formula&&p.formula!=='N/A')pi.push({key:'Molecular Formula',value:p.formula});
      if(p.molWeight&&p.molWeight!=='N/A')pi.push({key:'Molecular Weight',value:p.molWeight});
      p.properties.forEach(function(x){pi.push(x);});
      if(pi.length){html+='<div class="chat-section-title">Properties</div><div class="chat-prop-grid">'+pi.slice(0,6).map(function(x){return '<div class="chat-prop"><span class="chat-prop-key">'+esc(x.key)+'</span><span class="chat-prop-val">'+esc(x.value)+'</span></div>';}).join('')+'</div>';}
    }
    if(isApps||(!isProps&&!isAdv)||matches.length===1){
      if(p.applications.length){html+='<div class="chat-section-title">Applications</div><div class="chat-app-list">'+p.applications.map(function(a){return '<div class="chat-app-item"><div class="chat-app-dot"></div>'+esc(a)+'</div>';}).join('')+'</div>';}
    }
    if(isAdv||matches.length===1){
      if(p.advantages&&p.advantages.length){html+='<div class="chat-section-title">Advantages</div><div class="chat-app-list">'+p.advantages.map(function(a){return '<div class="chat-app-item"><div class="chat-app-dot" style="background:#4f9cf9"></div>'+esc(a)+'</div>';}).join('')+'</div>';}
      if(p.packing){html+='<div class="chat-section-title">Packing</div><div style="font-size:12px;color:var(--muted)">'+esc(p.packing)+'</div>';}
    }
    html+='<div style="margin-top:8px"><a href="'+esc(p.url)+'" target="_blank" style="font-size:11px;color:var(--accent)">View on KCIL website</a></div>';
  });
  if(matches.length>3)html+='<div style="margin-top:10px;font-size:12px;color:var(--dim)">...and '+(matches.length-3)+' more. Try a more specific query.</div>';
  return html;
}

async function sendChatMessage(){
  var input=document.getElementById('chatInput');
  var query=input.value.trim();if(!query)return;
  input.value='';input.style.height='auto';
  document.getElementById('chatSendBtn').disabled=true;
  addChatMsg(esc(query),'user');
  var thinkDiv=addChatMsg('<div class="chat-thinking"><div class="thinking-dots"><span></span><span></span><span></span></div><span>Analysing...</span></div>','ai');
  var apiKey=(document.getElementById('geminiKey').value||'').trim();
  var answer='';
  try{
    if(apiKey){
      var products=scrapedData.products.length?scrapedData.products:getFullDataset();
      var q2=query.toLowerCase();
      var relevant=products.filter(function(p){
        var words=q2.split(/\s+/).filter(function(w){return w.length>2;});
        var text=(p.name+' '+p.synonyms+' '+p.applications.join(' ')+' '+p.casNum).toLowerCase();
        return words.some(function(w){return text.indexOf(w)>=0;});
      });
      if(!relevant.length)relevant=products.slice(0,5);
      var context=relevant.map(function(p){
        return 'Product: '+p.name+'\nSynonyms: '+p.synonyms+'\nCAS: '+p.casNum+'\nFormula: '+p.formula+'\nMW: '+p.molWeight+'\nProperties: '+p.properties.map(function(x){return x.key+': '+x.value;}).join(', ')+'\nApplications: '+p.applications.join('; ')+'\nAdvantages: '+p.advantages.join('; ')+'\nPacking: '+p.packing;
      }).join('\n---\n');
      var prompt='You are an expert chemical analyst for KCIL (Kairav Chemofarbe Industries Ltd), a leading specialty chemical manufacturer in India. Answer ONLY based on the following KCIL product data. Be accurate, clear and well-structured. Use bullet points for lists.\n\nKCIL Product Data:\n'+context+'\n\nUser question: '+query;
      var resp=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+apiKey,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.2,maxOutputTokens:1024}})
      });
      if(!resp.ok)throw new Error('Gemini API '+resp.status);
      var data=await resp.json();
      var text=data.candidates[0].content.parts[0].text;
      text=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
        .replace(/^[*-]\s+(.+)$/gm,'<div class="chat-app-item"><div class="chat-app-dot"></div>$1</div>')
        .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
      answer='<div class="chat-ai-text">'+text+'</div>';
      document.getElementById('chatHint').textContent='Powered by Gemini AI - analysed '+relevant.length+' KCIL product(s).';
    }else{
      answer=smartLocalAnswer(query);
      document.getElementById('chatHint').textContent='Using built-in dataset. Add a Gemini API key in the sidebar for deeper AI analysis.';
    }
  }catch(err){
    answer=smartLocalAnswer(query);
    document.getElementById('chatHint').textContent='AI API unavailable. Showing local dataset results.';
    log('AI error: '+err.message,'warn');
  }
  thinkDiv.querySelector('.chat-bubble').innerHTML=answer;
  document.getElementById('chatSendBtn').disabled=false;
  document.getElementById('chatMessages').scrollTop=999999;
}

// ---- MAIN SCRAPER ----
async function startScraping(){
  if(isScraping)return;
  isScraping=true;
  var btn=document.getElementById('btnScrape');
  btn.disabled=true;btn.innerHTML='<div class="spinner"></div><span>Scraping...</span>';
  document.getElementById('btnJSON').disabled=true;document.getElementById('btnCSV').disabled=true;
  scrapedData={products:[],applications:[],appsmatrix:[],properties:[],documents:[],links:[]};
  document.getElementById('logBox').innerHTML='';
  ['products','applications','appsmatrix','properties','documents'].forEach(function(t){
    var g=document.getElementById('grid-'+t)||document.getElementById('list-'+t)||document.getElementById('table-'+t);
    if(g)g.innerHTML='';
    var b=document.getElementById('b-'+t);if(b)b.textContent='0';
    var em=document.getElementById('empty-'+t);if(em)em.style.display='';
  });
  document.getElementById('numProducts').textContent='0';
  document.getElementById('numApps').textContent='0';
  document.getElementById('numPages').textContent='0';
  setStatus('Scraping...','busy');setProgress(5);
  log('Starting KCIL scraper...','info');
  var fullData=getFullDataset(),appsMatrix=getAppsMatrix(),pagesScraped=0;
  if(mode==='deep'){
    log('Deep crawl: fetching '+fullData.length+' product pages live...','info');
    var merged=[];
    for(var i=0;i<fullData.length;i++){
      var p=fullData[i];
      setProgress(Math.round(5+(i/fullData.length)*85));
      setCrawlStatus('['+(i+1)+'/'+fullData.length+'] '+p.name);
      try{
        log('Fetching: '+p.name,'info');
        var html=await fetchPage(p.url);
        var doc=parse(html);pagesScraped++;
        var live=parseProductPage(doc,p);
        merged.push(live);
        document.getElementById('numPages').textContent=pagesScraped;
        log('  OK '+p.name+': '+live.applications.length+' apps, '+live.properties.length+' props','success');
      }catch(e){
        log('  SKIP '+p.name+' - using built-in data','warn');
        merged.push(p);
      }
      await delay(700);
    }
    scrapedData.products=merged;
  }else{
    log('Quick Scan: loading built-in dataset ('+fullData.length+' products)...','info');
    setProgress(50);await delay(500);
    scrapedData.products=fullData;
  }
  scrapedData.appsmatrix=appsMatrix;
  renderProducts(scrapedData.products);
  renderApplications(scrapedData.products);
  renderAppsMatrix(scrapedData.appsmatrix);
  renderProperties(scrapedData.products);
  renderDocuments(scrapedData.products);
  setProgress(100);isScraping=false;
  btn.disabled=false;
  btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg><span>Scrape Again</span>';
  document.getElementById('btnJSON').disabled=false;document.getElementById('btnCSV').disabled=false;
  setStatus('Done!','done');
  setCrawlStatus('Complete - '+scrapedData.products.length+' products loaded');
  var totalApps=scrapedData.products.reduce(function(s,p){return s+p.applications.length;},0);
  log('Done! '+scrapedData.products.length+' products, '+totalApps+' total applications.','success');
  updateCount();
}

// ---- EXPORT ----
function exportData(fmt){
  var data=scrapedData[currentTab];
  if(!data||!data.length){log('No data to export','warn');return;}
  var content,filename,mime;
  if(fmt==='json'){
    content=JSON.stringify(data,null,2);filename='kcil_'+currentTab+'_'+Date.now()+'.json';mime='application/json';
  }else{
    var flat=function(d){var o={};Object.keys(d).forEach(function(k){if(Array.isArray(d[k])){if(k==='properties')o[k]=d[k].map(function(x){return x.key+': '+x.value;}).join(' | ');else if(k==='documents')o[k]=d[k].map(function(x){return x.type+': '+x.url;}).join(' | ');else if(k==='industries')o[k]=d[k].join(', ');else o[k]=d[k].join('; ');}else o[k]=d[k]||'';});return o;};
    var fl=data.map(flat);var keys=Object.keys(fl[0]||{});
    var rows=fl.map(function(r){return keys.map(function(k){return '"'+String(r[k]||'').replace(/"/g,'""')+'"';}).join(',');});
    content=[keys.join(',')].concat(rows).join('\n');filename='kcil_'+currentTab+'_'+Date.now()+'.csv';mime='text/csv';
  }
  var blob=new Blob([content],{type:mime});var url=URL.createObjectURL(blob);
  var a=document.createElement('a');a.href=url;a.download=filename;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
  log('Exported '+data.length+' '+currentTab+' as '+fmt.toUpperCase(),'success');
}

// Auto-load on page open
window.addEventListener('DOMContentLoaded',function(){
  var data=getFullDataset();
  scrapedData.products=data;scrapedData.appsmatrix=getAppsMatrix();
  renderProducts(data);renderApplications(data);renderAppsMatrix(scrapedData.appsmatrix);
  renderProperties(data);renderDocuments(data);
  setStatus('Ready');
  document.getElementById('numProducts').textContent=data.length;
  var totalApps=data.reduce(function(s,p){return s+p.applications.length;},0);
  document.getElementById('numApps').textContent=totalApps;
  document.getElementById('numPages').textContent='0';
  var fb=document.getElementById('filterBar');if(fb)fb.style.display='none';
});

