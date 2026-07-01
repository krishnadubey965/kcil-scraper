// ================================================================
// KCIL Market Intelligence + Competitor Analysis - render logic
// ================================================================

// ---- MARKET TAB ----
function renderMarketTab() {
  var data = getFullDataset();
  var sel = document.getElementById('mktChemSel');
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Select a Chemical --</option>';
  data.forEach(function(p) {
    var opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    sel.appendChild(opt);
  });
  renderSources();
}

function renderSources() {
  var g = document.getElementById('sourceGrid');
  if (!g) return;
  g.innerHTML = TRUSTED_SOURCES.map(function(s) {
    return '<a href="'+s.url+'" target="_blank" class="source-card" style="border-color:'+s.color+'22">'
      +'<div class="source-name" style="color:'+s.color+'">'+esc(s.name)+'</div>'
      +'<div class="source-cert">✓ '+esc(s.cert)+'</div>'
      +'<div class="source-desc">'+esc(s.desc)+'</div>'
      +'<div class="source-visit" style="color:'+s.color+'">Visit site →</div>'
      +'</a>';
  }).join('');
}

function loadMarketData() {
  var sel = document.getElementById('mktChemSel');
  var name = sel ? sel.value : '';
  var panel = document.getElementById('mktDataPanel');
  if (!panel) return;
  if (!name) { panel.innerHTML = '<div class="mkt-placeholder">Select a chemical above to see its market intelligence data.</div>'; return; }
  var d = MARKET_DATA[name];
  if (!d) { panel.innerHTML = '<div class="mkt-placeholder">No market data found for this chemical.</div>'; return; }
  var cagr = d.cagr;
  var cagrClass = cagr >= 10 ? 'cagr-vhigh' : cagr >= 7 ? 'cagr-high' : cagr >= 5 ? 'cagr-med' : 'cagr-low';
  var cagrLabel = cagr >= 10 ? 'Very High Growth' : cagr >= 7 ? 'High Growth' : cagr >= 5 ? 'Moderate Growth' : 'Stable';
  var growth = ((d.marketSize2030 - d.marketSize2023) / d.marketSize2023 * 100).toFixed(0);
  var sz2023 = d.marketSize2023 >= 1000 ? '$' + (d.marketSize2023/1000).toFixed(2) + ' Billion USD' : '$' + d.marketSize2023 + ' Million USD';
  var sz2030 = d.marketSize2030 >= 1000 ? '$' + (d.marketSize2030/1000).toFixed(2) + ' Billion USD' : '$' + d.marketSize2030 + ' Million USD';

  var html = '<div class="mkt-hero">';
  html += '<div class="mkt-hero-name">' + esc(name) + '</div>';
  html += '<div class="mkt-hero-period">Forecast Period: ' + esc(d.forecastPeriod) + '</div>';
  html += '<div class="mkt-kpi-row">';
  html += '<div class="mkt-kpi"><div class="mkt-kpi-val">' + esc(sz2023) + '</div><div class="mkt-kpi-lbl">Current Market Size (2023)</div></div>';
  html += '<div class="mkt-kpi"><div class="mkt-kpi-val">' + esc(sz2030) + '</div><div class="mkt-kpi-lbl">Projected Market (' + d.forecastPeriod.split('-')[1] + ')</div></div>';
  html += '<div class="mkt-kpi cagr-kpi ' + cagrClass + '"><div class="mkt-kpi-val">' + d.cagr + '%</div><div class="mkt-kpi-lbl">CAGR — ' + cagrLabel + '</div></div>';
  html += '<div class="mkt-kpi"><div class="mkt-kpi-val">+' + growth + '%</div><div class="mkt-kpi-lbl">Total Growth</div></div>';
  html += '</div>';
  html += '<div class="mkt-cagr-bar-wrap"><div class="mkt-cagr-bar-label">CAGR Meter (scale: 0% — 15%)</div>';
  html += '<div class="mkt-cagr-bar"><div class="mkt-cagr-fill ' + cagrClass + '" style="width:' + Math.min(100,(d.cagr/15*100)).toFixed(0) + '%"></div></div></div>';
  html += '</div>';

  // ---- WHERE DOES THIS DATA COME FROM? ----
  html += '<div class="mkt-verify-box">';
  html += '<div class="mkt-verify-title">Where Does This Data Come From?</div>';
  html += '<div class="mkt-verify-sub">This data is sourced from publicly available market research summaries published by the certified firms below. Click any link to open and verify it yourself. The Google Search links always work — they show snippets directly from these certified sites.</div>';
  html += '<div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.25);border-radius:10px;padding:10px 14px;font-size:11px;color:#fbbf24;margin-bottom:14px">';
  html += '<strong>Data Origin:</strong> ' + esc(d.source) + ' — Published ' + d.sourceYear + ' | Forecast period: ' + esc(d.forecastPeriod);
  html += '</div>';
  html += '<div class="mkt-verify-links">';

  // --- GOOGLE SEARCH (ALWAYS WORKS) ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(74,222,128,.4);background:rgba(74,222,128,.05)">';
  html += '<div class="mkt-verify-firm" style="color:#4ade80">✅ Google Search — Instant Verification (Always Works)</div>';
  html += '<div class="mkt-verify-cert">Opens Google search showing market size and CAGR data from all certified sites below</div>';
  html += '<div class="mkt-verify-url">' + esc(d.googleLink) + '</div>';
  html += '<a href="' + esc(d.googleLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(74,222,128,.15);color:#4ade80;border-color:rgba(74,222,128,.4);font-size:12px;font-weight:700">🔍 Search Google for "' + esc(name) + ' market size CAGR 2024"</a>';
  html += '</div>';

  // --- GVR ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(59,130,246,.35)">';
  html += '<div class="mkt-verify-firm" style="color:#60a5fa">Grand View Research (ISO 9001:2015 Certified)</div>';
  html += '<div class="mkt-verify-cert">Free executive summaries showing market size and CAGR on their website</div>';
  html += '<div class="mkt-verify-url">' + esc(d.gvrLink) + '</div>';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  html += '<a href="' + esc(d.gvrLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(59,130,246,.15);color:#60a5fa;border-color:rgba(59,130,246,.3)">Open grandviewresearch.com →</a>';
  html += '<a href="' + esc(d.googleGVR) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(59,130,246,.08);color:#93c5fd;border-color:rgba(59,130,246,.2)">Search Google → grandviewresearch.com</a>';
  html += '</div></div>';

  // --- MORDOR ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(6,182,212,.35)">';
  html += '<div class="mkt-verify-firm" style="color:#22d3ee">Mordor Intelligence (ISO 9001:2015 Certified)</div>';
  html += '<div class="mkt-verify-cert">17,000+ market reports published. Free overview pages available.</div>';
  html += '<div class="mkt-verify-url">' + esc(d.mordorLink) + '</div>';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  html += '<a href="' + esc(d.mordorLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(6,182,212,.15);color:#22d3ee;border-color:rgba(6,182,212,.3)">Open mordorintelligence.com →</a>';
  html += '<a href="' + esc(d.googleMordor) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(6,182,212,.08);color:#67e8f9;border-color:rgba(6,182,212,.2)">Search Google → mordorintelligence.com</a>';
  html += '</div></div>';

  // --- M&M ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(139,92,246,.35)">';
  html += '<div class="mkt-verify-firm" style="color:#a78bfa">MarketsandMarkets (ISO Certified Research)</div>';
  html += '<div class="mkt-verify-cert">Trusted by 3,800+ global companies. Use their search to find this chemical.</div>';
  html += '<div class="mkt-verify-url">' + esc(d.mmLink) + '</div>';
  html += '<a href="' + esc(d.mmLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(139,92,246,.15);color:#a78bfa;border-color:rgba(139,92,246,.3)">Search on marketsandmarkets.com →</a>';
  html += '</div>';

  // --- ICIS ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(245,158,11,.35)">';
  html += '<div class="mkt-verify-firm" style="color:#fbbf24">ICIS Chemical Business (100+ Years, Industry Gold Standard)</div>';
  html += '<div class="mkt-verify-cert">The most trusted source in the global chemical industry for pricing and market data.</div>';
  html += '<div class="mkt-verify-url">' + esc(d.icicLink) + '</div>';
  html += '<a href="' + esc(d.icicLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(245,158,11,.15);color:#fbbf24;border-color:rgba(245,158,11,.3)">Search news on icis.com →</a>';
  html += '</div>';

  // --- STATISTA ---
  html += '<div class="mkt-verify-card" style="border-color:rgba(239,68,68,.35)">';
  html += '<div class="mkt-verify-firm" style="color:#f87171">Statista (Certified Data Platform)</div>';
  html += '<div class="mkt-verify-cert">1,000,000+ statistics. Used by 23,000+ companies. Cites original research firms.</div>';
  html += '<div class="mkt-verify-url">' + esc(d.statiLink) + '</div>';
  html += '<a href="' + esc(d.statiLink) + '" target="_blank" class="mkt-verify-btn" style="background:rgba(239,68,68,.15);color:#f87171;border-color:rgba(239,68,68,.3)">Search on statista.com →</a>';
  html += '</div>';

  html += '</div>'; // mkt-verify-links
  html += '<div class="mkt-verify-note" style="background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.2);border-radius:8px;padding:10px 12px;font-size:11px;color:#a78bfa;margin-top:12px">';
  html += '<strong>Important note for senior verification:</strong> These research firms publish free "overview" or "executive summary" pages which show the market size and CAGR headline numbers for free. The full detailed report (100+ pages) requires a paid subscription. The Google Search links above always work and show the free summary snippets from these certified sites.';
  html += '</div>';
  html += '</div>'; // mkt-verify-box

  html += '<div class="mkt-section"><div class="mkt-section-title">Market Outlook</div><div class="mkt-outlook">' + esc(d.outlook) + '</div></div>';
  html += '<div class="mkt-section"><div class="mkt-section-title">Key Growth Drivers</div><div class="mkt-drivers">';
  d.keyDrivers.forEach(function(dr,i) { html += '<div class="mkt-driver"><span class="mkt-driver-num">' + (i+1) + '</span>' + esc(dr) + '</div>'; });
  html += '</div></div>';
  html += '<div class="mkt-two-col">';
  html += '<div class="mkt-section"><div class="mkt-section-title">Key Regions</div><div class="mkt-pills">';
  d.keyRegions.forEach(function(r) { html += '<span class="mkt-region-pill">' + esc(r) + '</span>'; });
  html += '</div></div>';
  html += '<div class="mkt-section"><div class="mkt-section-title">Key Segments</div><div class="mkt-pills">';
  d.keySegments.forEach(function(s) { html += '<span class="mkt-seg-pill">' + esc(s) + '</span>'; });
  html += '</div></div></div>';
  panel.innerHTML = html;
}

function formatNum(n) {
  if (n >= 1000) return (n/1000).toFixed(1) + ' B';
  return n.toLocaleString();
}

// ---- COMPETITOR TAB ----
function renderCompetitorTab() {
  renderKCILCard();
  renderCompetitorCards();
  renderOverlapMatrix();
}

function renderKCILCard() {
  var el = document.getElementById('kcilCard');
  if (!el) return;
  var html = '<div class="kcil-hero-header"><div class="kcil-badge">YOUR COMPANY</div><div class="kcil-name">'+esc(KCIL_PROFILE.name)+'</div></div>';
  html += '<div class="kcil-meta"><span>🇮🇳 '+esc(KCIL_PROFILE.country)+'</span><span>📍 '+esc(KCIL_PROFILE.hq)+'</span><span>🏗 Est. '+esc(KCIL_PROFILE.founded)+'</span><span>🧪 '+KCIL_PROFILE.productCount+' Products</span></div>';
  html += '<div class="kcil-strengths-title">Core Strengths</div><div class="kcil-strengths">';
  KCIL_PROFILE.keyStrengths.forEach(function(s) { html += '<div class="kcil-strength"><span class="strength-check">✓</span>'+esc(s)+'</div>'; });
  html += '</div>';
  html += '<div class="kcil-markets"><div class="kcil-markets-title">Key Markets</div>';
  KCIL_PROFILE.keyMarkets.forEach(function(m) { html += '<span class="kcil-market-pill">'+esc(m)+'</span>'; });
  html += '</div>';
  el.innerHTML = html;
}

function renderCompetitorCards() {
  var g = document.getElementById('compGrid');
  if (!g) return;
  g.innerHTML = '';
  COMPETITORS.forEach(function(c) {
    var card = document.createElement('div');
    card.className = 'comp-card';
    var threatClass = c.threatLevel.indexOf('HIGH') >= 0 && c.threatLevel.indexOf('MEDIUM') < 0 ? 'threat-high' : c.threatLevel.indexOf('MEDIUM') >= 0 || c.threatLevel.indexOf('HIGH') >= 0 ? 'threat-med' : 'threat-low';
    var html = '<div class="comp-header">';
    html += '<div><div class="comp-name">'+esc(c.name)+'</div><div class="comp-meta">'+esc(c.country)+' · '+esc(c.type)+'</div></div>';
    html += '<span class="threat-badge '+threatClass+'">'+esc(c.threatLevel)+'</span>';
    html += '</div>';
    html += '<div class="comp-ticker">'+esc(c.ticker)+' | Rev: '+esc(c.revenue)+'</div>';
    html += '<div class="comp-why"><strong>Why a Competitor:</strong> '+esc(c.whyCompetitor)+'</div>';
    // Shared chemicals
    html += '<div class="comp-shared-title">Chemicals in Common with KCIL</div>';
    html += '<div class="comp-chemicals">';
    c.sharedChemicals.slice(0,5).forEach(function(ch) { html += '<span class="comp-chem-tag">'+esc(ch)+'</span>'; });
    if (c.sharedChemicals.length > 5) html += '<span class="comp-chem-tag comp-more">+'+( c.sharedChemicals.length-5)+' more</span>';
    html += '</div>';
    // KCIL advantage
    html += '<div class="comp-kcil-adv"><div class="comp-adv-title">🏆 KCIL Advantage</div>'+esc(c.kcilAdvantage)+'</div>';
    // Strengths / Weaknesses toggle
    html += '<div class="comp-sw">';
    html += '<div class="comp-sw-col"><div class="sw-title sw-str">Competitor Strengths</div>';
    c.competitorStrengths.forEach(function(s) { html += '<div class="sw-item sw-s-item"><span>+</span>'+esc(s)+'</div>'; });
    html += '</div>';
    html += '<div class="comp-sw-col"><div class="sw-title sw-wk">Competitor Weaknesses</div>';
    c.competitorWeaknesses.forEach(function(w) { html += '<div class="sw-item sw-w-item"><span>−</span>'+esc(w)+'</div>'; });
    html += '</div></div>';
    html += '<a href="'+esc(c.website)+'" target="_blank" class="comp-website-link">Visit '+esc(c.name.split(' ').slice(0,2).join(' '))+' website →</a>';
    card.innerHTML = html;
    g.appendChild(card);
  });
}

function renderOverlapMatrix() {
  var el = document.getElementById('overlapMatrix');
  if (!el) return;
  var kcilProds = ['Acetonitrile','THF','NMP','1,4-Dioxane','Methylal','2-MeTHF','Boronic Acids','ETT','HOBt in NMP','1,3-Dioxolane'];
  var rows = COMPETITORS.map(function(c) {
    var cells = kcilProds.map(function(p) {
      var has = c.sharedChemicals.some(function(s) { return s.toLowerCase().indexOf(p.toLowerCase().split(' ')[0]) >= 0 || (p === 'Boronic Acids' && s.toLowerCase().indexOf('boronic') >= 0) || s === 'ALL 29 KCIL products'; });
      return '<td class="overlap-cell '+(has?'overlap-yes':'overlap-no')+'">'+(has?'✓':'—')+'</td>';
    });
    return '<tr><td class="overlap-comp">'+esc(c.name.split(' ').slice(0,3).join(' '))+'</td>'+cells.join('')+'</tr>';
  });
  var headers = kcilProds.map(function(p) { return '<th class="overlap-th">'+esc(p)+'</th>'; }).join('');
  el.innerHTML = '<table class="overlap-table"><thead><tr><th class="overlap-th-comp">Competitor</th>'+headers+'</tr></thead><tbody>'+rows.join('')+'</tbody></table>';
}

// Init both tabs on load
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    renderMarketTab();
    renderCompetitorTab();
  }, 200);
});
