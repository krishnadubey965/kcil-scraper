// ================================================================
// KCIL Intelligence Suite - Multi-Source Chemical Search
// Sources: PubChem (NCBI) + ChEMBL (EBI) + ECHA (EU)
// ================================================================

const PUBCHEM_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const CHEMBL_BASE  = 'https://www.ebi.ac.uk/chembl/api/data';

let multiSearchRunning = false;

// ---- GHS Hazard Pictogram Map ----
const GHS_ICONS = {
  'GHS01': { icon: '💥', label: 'Explosive' },
  'GHS02': { icon: '🔥', label: 'Flammable' },
  'GHS03': { icon: '🔆', label: 'Oxidising' },
  'GHS04': { icon: '🫧', label: 'Gas Under Pressure' },
  'GHS05': { icon: '⚗️', label: 'Corrosive' },
  'GHS06': { icon: '☠️', label: 'Acute Toxic' },
  'GHS07': { icon: '⚠️', label: 'Harmful/Irritant' },
  'GHS08': { icon: '🫁', label: 'Health Hazard' },
  'GHS09': { icon: '🌿', label: 'Environmental Hazard' }
};

// ---- Utilities ----
function msEsc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function msLog(msg, type) {
  type = type || 'info';
  var el = document.getElementById('msLog');
  if (!el) return;
  el.textContent = msg;
  el.className = 'ms-log ms-log-' + type;
}

function setCardLoading(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '<div class="ms-card-loading"><div class="ms-spinner"></div><span>Fetching data…</span></div>';
}

function setCardError(id, msg) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '<div class="ms-card-error"><span class="ms-error-icon">⚠️</span><span>' + msEsc(msg) + '</span></div>';
}

// ---- PubChem Search ----
async function searchPubChem(name) {
  setCardLoading('pcResult');
  try {
    // Step 1: Get CID
    var cidResp = await fetch(PUBCHEM_BASE + '/compound/name/' + encodeURIComponent(name) + '/cids/JSON', { signal: AbortSignal.timeout(10000) });
    if (!cidResp.ok) throw new Error('Not found in PubChem');
    var cidData = await cidResp.json();
    var cid = cidData.IdentifierList.CID[0];

    // Step 2: Get properties
    var propResp = await fetch(PUBCHEM_BASE + '/compound/cid/' + cid + '/property/MolecularFormula,MolecularWeight,IUPACName,IsomericSMILES,XLogP,ExactMass/JSON', { signal: AbortSignal.timeout(10000) });
    var propData = await propResp.json();
    var props = propData.PropertyTable.Properties[0];

    // Step 3: Get synonyms (includes CAS)
    var synResp = await fetch(PUBCHEM_BASE + '/compound/cid/' + cid + '/synonyms/JSON', { signal: AbortSignal.timeout(10000) });
    var synData = await synResp.json();
    var synonyms = synData.InformationList.Information[0].Synonym || [];
    var cas = synonyms.find(function(s) { return /^\d{2,7}-\d{2}-\d$/.test(s); }) || 'N/A';
    var topSyns = synonyms.filter(function(s) { return !/^\d/.test(s) && s.length < 60; }).slice(0, 4);

    // Step 4: Get description
    var descResp = await fetch(PUBCHEM_BASE + '_view/data/compound/' + cid + '/JSON?heading=Description', { signal: AbortSignal.timeout(10000) });
    var description = '';
    try {
      var descData = await descResp.json();
      var sections = descData.Record.Section;
      for (var s of sections) {
        if (s.TOCHeading === 'Names and Identifiers' || s.TOCHeading === 'Chemical and Physical Properties') continue;
        if (s.Information) {
          var info = s.Information.find(function(i) { return i.Value && i.Value.StringWithMarkup; });
          if (info) { description = info.Value.StringWithMarkup[0].String; break; }
        }
      }
    } catch(e) {}

    renderPubChemCard(cid, props, cas, topSyns, description);
  } catch(e) {
    setCardError('pcResult', 'PubChem: ' + (e.message || 'Not found'));
  }
}

function renderPubChemCard(cid, props, cas, synonyms, description) {
  var el = document.getElementById('pcResult');
  if (!el) return;
  var url = 'https://pubchem.ncbi.nlm.nih.gov/compound/' + cid;
  var html = '<div class="ms-card-header pc-header">';
  html += '<div class="ms-source-badge pc-badge">PubChem</div>';
  html += '<div class="ms-source-cid">CID: ' + msEsc(String(cid)) + '</div>';
  html += '</div>';
  html += '<div class="ms-card-body">';
  html += '<table class="ms-prop-table">';
  if (cas && cas !== 'N/A') html += '<tr><td>CAS Number</td><td><strong>' + msEsc(cas) + '</strong></td></tr>';
  if (props.MolecularFormula) html += '<tr><td>Molecular Formula</td><td>' + msEsc(props.MolecularFormula) + '</td></tr>';
  if (props.MolecularWeight) html += '<tr><td>Molecular Weight</td><td>' + msEsc(String(props.MolecularWeight)) + ' g/mol</td></tr>';
  if (props.ExactMass) html += '<tr><td>Exact Mass</td><td>' + msEsc(String(props.ExactMass)) + '</td></tr>';
  if (props.XLogP !== undefined && props.XLogP !== null) html += '<tr><td>XLogP (Lipophilicity)</td><td>' + msEsc(String(props.XLogP)) + '</td></tr>';
  if (props.IUPACName) html += '<tr><td>IUPAC Name</td><td style="font-size:11px">' + msEsc(props.IUPACName) + '</td></tr>';
  if (props.IsomericSMILES) html += '<tr><td>SMILES</td><td style="font-size:10px;font-family:monospace;word-break:break-all">' + msEsc(props.IsomericSMILES.substring(0,80)) + (props.IsomericSMILES.length > 80 ? '…' : '') + '</td></tr>';
  html += '</table>';
  if (synonyms.length > 0) {
    html += '<div class="ms-syn-title">Common Names</div>';
    html += '<div class="ms-syns">' + synonyms.map(function(s) { return '<span class="ms-syn">' + msEsc(s) + '</span>'; }).join('') + '</div>';
  }
  if (description) {
    html += '<div class="ms-desc">' + msEsc(description.substring(0, 300)) + (description.length > 300 ? '…' : '') + '</div>';
  }
  html += '</div>';
  html += '<a href="' + msEsc(url) + '" target="_blank" class="ms-card-link pc-link">View full data on PubChem →</a>';
  el.innerHTML = html;
}

// ---- ChEMBL Search ----
async function searchChEMBL(name) {
  setCardLoading('chemblResult');
  try {
    var resp = await fetch(CHEMBL_BASE + '/molecule?pref_name__icontains=' + encodeURIComponent(name) + '&format=json&limit=1', { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) throw new Error('ChEMBL request failed');
    var data = await resp.json();
    if (!data.molecules || data.molecules.length === 0) {
      // Try searching by synonym
      var resp2 = await fetch(CHEMBL_BASE + '/molecule?molecule_synonyms__synonym__icontains=' + encodeURIComponent(name) + '&format=json&limit=1', { signal: AbortSignal.timeout(10000) });
      var data2 = await resp2.json();
      if (!data2.molecules || data2.molecules.length === 0) throw new Error('Not found in ChEMBL');
      renderChEMBLCard(data2.molecules[0]);
    } else {
      renderChEMBLCard(data.molecules[0]);
    }
  } catch(e) {
    setCardError('chemblResult', 'ChEMBL: ' + (e.message || 'Not found'));
  }
}

function renderChEMBLCard(mol) {
  var el = document.getElementById('chemblResult');
  if (!el) return;
  var props = mol.molecule_properties || {};
  var struct = mol.molecule_structures || {};
  var id = mol.molecule_chembl_id || '';
  var url = 'https://www.ebi.ac.uk/chembl/compound_report_card/' + id;
  var html = '<div class="ms-card-header chembl-header">';
  html += '<div class="ms-source-badge chembl-badge">ChEMBL</div>';
  html += '<div class="ms-source-cid">' + msEsc(id) + '</div>';
  html += '</div>';
  html += '<div class="ms-card-body">';
  html += '<table class="ms-prop-table">';
  if (mol.pref_name) html += '<tr><td>Preferred Name</td><td><strong>' + msEsc(mol.pref_name) + '</strong></td></tr>';
  if (mol.molecule_type) html += '<tr><td>Molecule Type</td><td>' + msEsc(mol.molecule_type) + '</td></tr>';
  if (props.mw_freebase) html += '<tr><td>Molecular Weight</td><td>' + msEsc(String(props.mw_freebase)) + ' g/mol</td></tr>';
  if (props.alogp !== null && props.alogp !== undefined) html += '<tr><td>ALogP</td><td>' + msEsc(String(props.alogp)) + '</td></tr>';
  if (props.hba !== null) html += '<tr><td>H-Bond Acceptors</td><td>' + msEsc(String(props.hba)) + '</td></tr>';
  if (props.hbd !== null) html += '<tr><td>H-Bond Donors</td><td>' + msEsc(String(props.hbd)) + '</td></tr>';
  if (props.psa !== null) html += '<tr><td>Polar Surface Area</td><td>' + msEsc(String(props.psa)) + ' Å²</td></tr>';
  if (props.rtb !== null) html += '<tr><td>Rotatable Bonds</td><td>' + msEsc(String(props.rtb)) + '</td></tr>';
  if (props.ro3_pass) html += '<tr><td>Lipinski Ro3</td><td>' + msEsc(props.ro3_pass) + '</td></tr>';
  if (mol.max_phase !== null && mol.max_phase !== undefined) {
    var phaseLabel = mol.max_phase === 4 ? '4 (Approved Drug)' : mol.max_phase === 0 ? '0 (Research)' : String(mol.max_phase) + ' (Clinical)';
    html += '<tr><td>Max Clinical Phase</td><td><strong>' + msEsc(phaseLabel) + '</strong></td></tr>';
  }
  if (struct.canonical_smiles) html += '<tr><td>SMILES</td><td style="font-size:10px;font-family:monospace;word-break:break-all">' + msEsc(struct.canonical_smiles.substring(0,80)) + (struct.canonical_smiles.length>80?'…':'') + '</td></tr>';
  html += '</table>';
  // Synonyms
  if (mol.molecule_synonyms && mol.molecule_synonyms.length > 0) {
    var syns = mol.molecule_synonyms.slice(0, 4).map(function(s) { return s.molecule_synonym; });
    html += '<div class="ms-syn-title">Trade / Synonyms</div>';
    html += '<div class="ms-syns">' + syns.map(function(s) { return '<span class="ms-syn chembl-syn">' + msEsc(s) + '</span>'; }).join('') + '</div>';
  }
  html += '</div>';
  html += '<a href="' + msEsc(url) + '" target="_blank" class="ms-card-link chembl-link">View compound report on ChEMBL →</a>';
  el.innerHTML = html;
}

// ---- ECHA Card (uses PubChem GHS data + links to ECHA) ----
async function searchECHA(name, cas) {
  setCardLoading('echaResult');
  try {
    // Use PubChem GHS safety data (sourced from ECHA C&L Inventory)
    var cidResp = await fetch(PUBCHEM_BASE + '/compound/name/' + encodeURIComponent(name) + '/cids/JSON', { signal: AbortSignal.timeout(10000) });
    if (!cidResp.ok) throw new Error('Not found');
    var cidData = await cidResp.json();
    var cid = cidData.IdentifierList.CID[0];

    // Get GHS/Safety data
    var safeResp = await fetch(PUBCHEM_BASE + '_view/data/compound/' + cid + '/JSON?heading=Safety+and+Hazards', { signal: AbortSignal.timeout(12000) });
    var ghsCodes = [], hCodes = [], pCodes = [], signalWord = '';
    try {
      var safeData = await safeResp.json();
      var sections = (safeData.Record && safeData.Record.Section) || [];
      sections.forEach(function(s) {
        if (s.TOCHeading === 'Safety and Hazards') {
          (s.Section || []).forEach(function(sub) {
            if (sub.TOCHeading === 'Hazards Identification') {
              (sub.Section || []).forEach(function(subsub) {
                if (subsub.TOCHeading === 'GHS Classification') {
                  (subsub.Information || []).forEach(function(info) {
                    var name = info.Name || '';
                    if (name === 'Pictogram(s)') {
                      (info.Value && info.Value.StringWithMarkup || []).forEach(function(sw) {
                        var match = sw.String.match(/GHS\d{2}/g);
                        if (match) ghsCodes = ghsCodes.concat(match);
                      });
                    }
                    if (name === 'Signal') {
                      signalWord = (info.Value && info.Value.StringWithMarkup && info.Value.StringWithMarkup[0]) ? info.Value.StringWithMarkup[0].String : '';
                    }
                    if (name.indexOf('Hazard Statement') >= 0) {
                      (info.Value && info.Value.StringWithMarkup || []).forEach(function(sw) {
                        var hm = sw.String.match(/H\d{3}/);
                        if (hm && hCodes.indexOf(hm[0]) < 0) hCodes.push(hm[0]);
                      });
                    }
                    if (name.indexOf('Precautionary Statement') >= 0) {
                      (info.Value && info.Value.StringWithMarkup || []).forEach(function(sw) {
                        var pm = sw.String.match(/P\d{3}/);
                        if (pm && pCodes.indexOf(pm[0]) < 0) pCodes.push(pm[0]);
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } catch(e2) {}

    renderECHACard(name, cas, cid, ghsCodes, hCodes, pCodes, signalWord);
  } catch(e) {
    setCardError('echaResult', 'ECHA/Safety: ' + (e.message || 'Not found'));
  }
}

function renderECHACard(chemName, cas, cid, ghsCodes, hCodes, pCodes, signalWord) {
  var el = document.getElementById('echaResult');
  if (!el) return;
  var echaSearch = 'https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/substance-name/' + encodeURIComponent(chemName);
  var pubchemSafe = 'https://pubchem.ncbi.nlm.nih.gov/compound/' + cid + '#section=Safety-and-Hazards';
  var html = '<div class="ms-card-header echa-header">';
  html += '<div class="ms-source-badge echa-badge">ECHA / GHS Safety</div>';
  if (cas && cas !== 'N/A') html += '<div class="ms-source-cid">CAS: ' + msEsc(cas) + '</div>';
  html += '</div>';
  html += '<div class="ms-card-body">';
  // GHS Pictograms
  if (ghsCodes.length > 0) {
    var uniqueCodes = ghsCodes.filter(function(v,i,a){return a.indexOf(v)===i;});
    html += '<div class="ms-ghs-title">GHS Hazard Pictograms</div>';
    html += '<div class="ms-ghs-grid">';
    uniqueCodes.forEach(function(code) {
      var info = GHS_ICONS[code] || { icon: '⚠️', label: code };
      html += '<div class="ms-ghs-item"><div class="ms-ghs-icon">' + info.icon + '</div><div class="ms-ghs-label">' + msEsc(info.label) + '</div><div class="ms-ghs-code">' + msEsc(code) + '</div></div>';
    });
    html += '</div>';
  }
  if (signalWord) {
    var swClass = signalWord.toLowerCase().indexOf('danger') >= 0 ? 'sw-danger' : 'sw-warning';
    html += '<div class="ms-signal-word ' + swClass + '">Signal Word: <strong>' + msEsc(signalWord) + '</strong></div>';
  }
  if (hCodes.length > 0) {
    html += '<div class="ms-hcodes-title">H-Codes (Hazard Statements)</div>';
    html += '<div class="ms-codes">' + hCodes.slice(0,8).map(function(h){return '<span class="ms-hcode">' + msEsc(h) + '</span>';}).join('') + '</div>';
  }
  if (pCodes.length > 0) {
    html += '<div class="ms-hcodes-title">P-Codes (Precautionary)</div>';
    html += '<div class="ms-codes">' + pCodes.slice(0,8).map(function(p){return '<span class="ms-pcode">' + msEsc(p) + '</span>';}).join('') + '</div>';
  }
  if (ghsCodes.length === 0 && !signalWord) {
    html += '<div class="ms-no-ghs">No GHS hazard classification found in public database. Check ECHA directly.</div>';
  }
  html += '</div>';
  html += '<div class="ms-echa-links">';
  html += '<a href="' + msEsc(echaSearch) + '" target="_blank" class="ms-card-link echa-link">Search ECHA C&L Inventory →</a>';
  html += '<a href="' + msEsc(pubchemSafe) + '" target="_blank" class="ms-card-link pc-link" style="margin-left:8px">Safety Data on PubChem →</a>';
  html += '</div>';
  el.innerHTML = html;
}

// ---- Main Multi-Search Trigger ----
async function runMultiSearch() {
  var input = document.getElementById('msInput');
  var query = input ? input.value.trim() : '';
  if (!query) return;
  if (multiSearchRunning) return;
  multiSearchRunning = true;
  document.getElementById('msBtnSearch').disabled = true;

  // Show loading state for all 3 cards
  msLog('Searching ' + query + ' across PubChem, ChEMBL and ECHA…', 'loading');
  setCardLoading('pcResult');
  setCardLoading('chemblResult');
  setCardLoading('echaResult');

  // Run all 3 in parallel
  var casForECHA = 'N/A';
  await Promise.all([
    searchPubChem(query).then(function() {
      // Extract CAS from PubChem result for ECHA
      var pcEl = document.getElementById('pcResult');
      if (pcEl) {
        var rows = pcEl.querySelectorAll('tr');
        rows.forEach(function(r) { if (r.textContent.indexOf('CAS Number') >= 0) casForECHA = r.cells[1] ? r.cells[1].textContent.trim() : 'N/A'; });
      }
    }),
    searchChEMBL(query),
    searchECHA(query, casForECHA)
  ]);

  msLog('Search complete for: ' + query, 'done');
  multiSearchRunning = false;
  document.getElementById('msBtnSearch').disabled = false;
}

function msKeydown(e) {
  if (e.key === 'Enter') runMultiSearch();
}

// Quick-search a chemical from other tabs
function quickMultiSearch(name) {
  switchTab('multisource');
  var inp = document.getElementById('msInput');
  if (inp) { inp.value = name; runMultiSearch(); }
}
