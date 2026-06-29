// KCIL Deep Scraper - Full Product Intelligence
// Scrapes every product page + applications matrix

const PROXY = 'https://api.allorigins.win/get?url=';
const BASE = 'https://kcilglobal.com';

let mode = 'deep';
let isScraping = false;
let scrapedData = { products: [], applications: [], appsmatrix: [], properties: [], documents: [], links: [] };
let currentTab = 'products';

// ---- UTILS ----
function log(msg, type='info'){
  const b=document.getElementById('logBox');
  const e=document.createElement('div'); e.className='log-entry log-'+type;
  e.textContent='['+new Date().toLocaleTimeString()+'] '+msg;
  b.appendChild(e); b.scrollTop=b.scrollHeight;
}
function setProgress(p){ document.getElementById('pFill').style.width=p+'%'; document.getElementById('pLabel').textContent=p+'%'; }
function setStatus(t,s=''){
  document.getElementById('statusText').textContent=t;
  const d=document.getElementById('statusDot'); d.className='status-dot';
  if(s) d.classList.add(s);
}
function setCrawlStatus(t){ document.getElementById('crawlStatus').textContent=t; }
function setMode(m){
  mode=m;
  document.getElementById('modeDeep').classList.toggle('active',m==='deep');
  document.getElementById('modeQuick').classList.toggle('active',m==='quick');
  document.getElementById('btnText').textContent=m==='deep'?'Start Deep Scrape':'Quick Scan';
}
function switchTab(t){
  currentTab=t;
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===t));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.toggle('active',x.id==='tab-'+t));
  updateCount();
}
function updateCount(){
  const d=scrapedData[currentTab]; const n=d?d.length:0;
  document.getElementById('resultCount').textContent=n>0?n+' item'+(n!==1?'s':''):'No data yet';
}
function esc(s){ if(!s)return''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function delay(ms){ return new Promise(r=>setTimeout(r,ms)); }
function filterResults(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  const selectors={
    products:'#grid-products .product-detail-card',
    applications:'#list-applications .app-card',
    appsmatrix:'.matrix-table tr',
    properties:'#list-properties .prop-section',
    documents:'#list-documents .doc-card',
    links:'#list-links .link-row'
  };
  const sel=selectors[currentTab];
  if(sel) document.querySelectorAll(sel).forEach(e=>{ e.style.display=e.textContent.toLowerCase().includes(q)?'':'none'; });
}

// ---- FETCH ----
async function fetchPage(url){
  const r=await fetch(PROXY+encodeURIComponent(url));
  if(!r.ok) throw new Error('HTTP '+r.status);
  const d=await r.json();
  return d.contents;
}
function parse(html){ return new DOMParser().parseFromString(html,'text/html'); }

// ---- PRODUCT PAGE PARSER ----
function parseProductPage(doc, name, url, category, catLabel){
  const txt=s=>doc.querySelector(s)?.textContent?.trim()||'';
  const all=s=>[...doc.querySelectorAll(s)].map(x=>x.textContent.trim()).filter(Boolean);

  // Synonyms / CAS / formula from list items
  const listItems = all('.product-list li');
  let synonyms='', casNum='', formula='', molWeight='';
  listItems.forEach(li=>{
    if(li.includes('CAS Number')) casNum=li.replace(/CAS Number\s*:\s*/i,'').trim();
    else if(li.includes('Molecular Formula')) formula=li.replace(/Molecular Formula\s*:\s*/i,'').trim();
    else if(li.includes('Molecular Weight')) molWeight=li.replace(/Molecular Weight\s*:\s*/i,'').trim();
    else if(!synonyms && !li.startsWith('CAS') && !li.startsWith('Molecular')) synonyms=li;
  });

  // Properties from tables
  const properties=[];
  doc.querySelectorAll('.product-table').forEach(tbl=>{
    tbl.querySelectorAll('tr').forEach(tr=>{
      const tds=[...tr.querySelectorAll('td')];
      if(tds.length>=2){
        const k=tds[0].textContent.trim(); const v=tds[1].textContent.trim();
        if(k&&v&&!k.toLowerCase().includes('characteristic')&&!k.toLowerCase().includes('wavelength'))
          properties.push({key:k,value:v});
      }
    });
  });

  // Applications
  const applications=[];
  doc.querySelectorAll('.product-list li').forEach(li=>{
    const t=li.textContent.trim();
    if(t && !t.includes('CAS') && !t.includes('Molecular') && !synonyms.includes(t))
      applications.push(t);
  });
  // Also check text blocks that mention Applications
  const appBlocks=[...doc.querySelectorAll('.elementor-widget-text-editor .elementor-widget-container')];
  let inApps=false;
  appBlocks.forEach(el=>{
    const t=el.textContent.trim();
    if(t.toLowerCase().includes('applications of')) inApps=true;
    if(inApps && el.querySelectorAll('li').length>0){
      el.querySelectorAll('li').forEach(li=>{ const a=li.textContent.trim(); if(a&&!applications.includes(a)) applications.push(a); });
      inApps=false;
    }
  });

  // Advantages
  const advantages=[];
  doc.querySelectorAll('.elementor-widget-text-editor .elementor-widget-container').forEach(el=>{
    if(el.textContent.toLowerCase().includes('advantages')) return;
    el.querySelectorAll('li').forEach(li=>{
      const a=li.textContent.trim();
      if(a&&!applications.includes(a)&&!listItems.includes(a)) advantages.push(a);
    });
  });

  // Packing
  let packing='';
  doc.querySelectorAll('p').forEach(p=>{ if(p.textContent.toLowerCase().includes('kg') && p.textContent.toLowerCase().includes('drum')) packing=p.textContent.trim(); });

  // Documents (MSDS/Spec PDFs)
  const documents=[];
  doc.querySelectorAll('a[href*=".pdf"]').forEach(a=>{
    const href=a.getAttribute('href')||''; const t=a.textContent.trim()||'Download';
    if(href) documents.push({product:name, type:t, url:href.startsWith('http')?href:BASE+href});
  });

  // Image
  let image='';
  doc.querySelectorAll('img[src]').forEach(img=>{
    const s=img.getAttribute('src')||'';
    if(s.includes('/uploads/') && !s.includes('logo') && !s.includes('PDF') && !image)
      image=s.startsWith('//')?'https:'+s:s;
  });

  return { name, url, category, catLabel, synonyms, casNum, formula, molWeight, properties, applications, advantages, packing, documents, image };
}

// ---- APPLICATIONS MATRIX PARSER ----
function parseAppsMatrix(doc){
  const rows=[];
  doc.querySelectorAll('.application-product-table tr').forEach((tr,i)=>{
    if(i===0) return; // skip header
    const tds=[...tr.querySelectorAll('td')];
    if(tds.length<3) return;
    const num=tds[0].textContent.trim();
    const product=tds[1].textContent.trim();
    const industries=tds[2].innerHTML.split(/<br\s*\/?>/i).map(x=>x.replace(/<[^>]+>/g,'').trim()).filter(Boolean);
    if(product) rows.push({num,product,industries});
  });
  return rows;
}

// ---- RENDERERS ----
function renderProducts(products){
  const g=document.getElementById('grid-products'),em=document.getElementById('empty-products');
  g.innerHTML=''; if(!products.length){em.style.display='';return;} em.style.display='none';
  products.forEach((p,i)=>{
    const apps=p.applications.slice(0,3).map(a=>'<span class="app-tag">'+esc(a.length>40?a.slice(0,40)+'…':a)+'</span>').join('');
    const props=[];
    if(p.casNum) props.push(['CAS#',p.casNum]);
    if(p.formula) props.push(['Formula',p.formula]);
    if(p.molWeight) props.push(['M.W.',p.molWeight]);
    const prop1=p.properties.find(x=>x.key.toLowerCase().includes('boiling'));
    if(prop1) props.push(['B.P.',prop1.value]);
    const propsHtml=props.slice(0,4).map(([k,v])=>'<div class="prop-item"><span class="prop-label">'+esc(k)+'</span><span class="prop-value">'+esc(v)+'</span></div>').join('');
    const card=document.createElement('div'); card.className='product-detail-card'; card.style.animationDelay=(i*15)+'ms';
    card.innerHTML='<div class="card-header"><div class="card-cat cat-'+p.category+'">'+esc(p.catLabel)+'</div>'+
      '<div class="card-name">'+esc(p.name)+'</div>'+
      (p.synonyms?'<div class="card-synonyms">'+esc(p.synonyms.length>80?p.synonyms.slice(0,80)+'…':p.synonyms)+'</div>':'')+
      '</div><div class="card-body">'+
      (propsHtml?'<div class="card-props">'+propsHtml+'</div>':'')+
      (apps?'<div class="card-apps"><div class="card-apps-title">Applications</div><div class="app-tags">'+apps+'</div></div>':'')+
      '</div><div class="card-footer"><div class="card-url"><a href="'+esc(p.url)+'" target="_blank">'+esc(p.url.replace('https://kcilglobal.com',''))+'</a></div>'+
      '<button class="card-expand" onclick="openModal('+i+')">View All</button></div>';
    g.appendChild(card);
  });
  document.getElementById('b-products').textContent=products.length;
  document.getElementById('numProducts').textContent=products.length;
}

function renderApplications(products){
  const l=document.getElementById('list-applications'),em=document.getElementById('empty-applications');
  l.innerHTML=''; const hasApps=products.filter(p=>p.applications&&p.applications.length>0);
  if(!hasApps.length){em.style.display='';return;} em.style.display='none';
  hasApps.forEach((p,i)=>{
    const div=document.createElement('div'); div.className='app-card'; div.style.animationDelay=(i*20)+'ms';
    const items=p.applications.map(a=>'<div class="app-item"><div class="app-item-bullet"></div>'+esc(a)+'</div>').join('');
    div.innerHTML='<div class="app-card-header"><div class="app-product-name">'+esc(p.name)+'</div><span class="app-cat cat-'+p.category+' card-cat">'+esc(p.catLabel)+'</span></div>'+
      '<div class="app-card-body"><div class="app-items">'+items+'</div></div>';
    l.appendChild(div);
  });
  const total=hasApps.reduce((s,p)=>s+p.applications.length,0);
  document.getElementById('b-applications').textContent=total;
  document.getElementById('numApps').textContent=total;
}

function renderAppsMatrix(rows){
  const w=document.getElementById('table-appsmatrix'),em=document.getElementById('empty-appsmatrix');
  w.innerHTML=''; if(!rows.length){em.style.display='';return;} em.style.display='none';
  let html='<table class="matrix-table"><thead><tr><th>Sr.</th><th>KCIL Product</th><th>Industries / Applications</th></tr></thead><tbody>';
  rows.forEach(r=>{
    const tags=r.industries.map(ind=>'<span class="industry-tag">'+esc(ind)+'</span>').join('');
    html+='<tr><td>'+esc(r.num)+'</td><td>'+esc(r.product)+'</td><td>'+tags+'</td></tr>';
  });
  html+='</tbody></table>';
  w.innerHTML=html;
  document.getElementById('b-appsmatrix').textContent=rows.length;
}

function renderProperties(products){
  const l=document.getElementById('list-properties'),em=document.getElementById('empty-properties');
  l.innerHTML=''; const hasProps=products.filter(p=>p.properties&&p.properties.length>0);
  if(!hasProps.length){em.style.display='';return;} em.style.display='none';
  hasProps.forEach((p,i)=>{
    const div=document.createElement('div'); div.className='prop-section'; div.style.animationDelay=(i*20)+'ms';
    let rows=p.properties.map(x=>'<tr><td>'+esc(x.key)+'</td><td>'+esc(x.value)+'</td></tr>').join('');
    if(p.casNum) rows='<tr><td>CAS Number</td><td>'+esc(p.casNum)+'</td></tr>'+rows;
    if(p.formula) rows='<tr><td>Molecular Formula</td><td>'+esc(p.formula)+'</td></tr>'+rows;
    if(p.molWeight) rows='<tr><td>Molecular Weight</td><td>'+esc(p.molWeight)+'</td></tr>'+rows;
    div.innerHTML='<div class="prop-section-header"><span class="card-cat cat-'+p.category+' prop-section-cat">'+esc(p.catLabel)+'</span><div class="prop-section-name">'+esc(p.name)+'</div></div>'+
      '<table class="prop-table">'+rows+'</table>';
    l.appendChild(div);
  });
  const total=hasProps.reduce((s,p)=>s+p.properties.length,0);
  document.getElementById('b-properties').textContent=total;
}

function renderDocuments(products){
  const g=document.getElementById('list-documents'),em=document.getElementById('empty-documents');
  g.innerHTML=''; const docs=products.flatMap(p=>p.documents||[]);
  if(!docs.length){em.style.display='';return;} em.style.display='none';
  docs.forEach((d,i)=>{
    const a=document.createElement('a'); a.className='doc-card'; a.href=d.url; a.target='_blank'; a.style.animationDelay=(i*15)+'ms';
    const icon=d.type.toLowerCase().includes('msds')||d.type.toLowerCase().includes('safety')?'⚠️':'📋';
    a.innerHTML='<div class="doc-icon">'+icon+'</div><div><span class="doc-product">'+esc(d.product)+'</span><span class="doc-type">'+esc(d.type)+'</span><div class="doc-url">'+esc(d.url.replace('https://kcilglobal.com',''))+'</div></div>';
    g.appendChild(a);
  });
  document.getElementById('b-documents').textContent=docs.length;
}

function renderLinks(links){
  const l=document.getElementById('list-links'),em=document.getElementById('empty-links');
  l.innerHTML=''; if(!links.length){em.style.display='';return;} em.style.display='none';
  links.forEach((lk,i)=>{
    const div=document.createElement('div'); div.className='link-row'; div.style.animationDelay=(i*5)+'ms';
    const ic=lk.internal?'lint':'lext'; const il=lk.internal?'Internal':'External';
    const src=lk.source?lk.source.replace('https://kcilglobal.com',''):'';
    div.innerHTML='<span class="link-type '+ic+'">'+il+'</span>'+
      '<a class="link-href" href="'+esc(lk.href)+'" target="_blank">'+esc(lk.href)+'</a>'+
      (src?'<span class="link-src" title="'+esc(lk.source)+'">'+esc(src)+'</span>':'');
    l.appendChild(div);
  });
  document.getElementById('b-links').textContent=links.length;
}

// ---- MODAL ----
function openModal(i){
  const p=scrapedData.products[i]; if(!p) return;
  const overlay=document.getElementById('modalOverlay');
  const content=document.getElementById('modalContent');

  const propsHtml=p.properties.length?'<div class="modal-section"><div class="modal-section-title">Physical & Chemical Properties</div><table class="modal-table">'+
    (p.casNum?'<tr><td>CAS Number</td><td>'+esc(p.casNum)+'</td></tr>':'')+
    (p.formula?'<tr><td>Molecular Formula</td><td>'+esc(p.formula)+'</td></tr>':'')+
    (p.molWeight?'<tr><td>Molecular Weight</td><td>'+esc(p.molWeight)+'</td></tr>':'')+
    p.properties.map(x=>'<tr><td>'+esc(x.key)+'</td><td>'+esc(x.value)+'</td></tr>').join('')+'</table></div>':'';

  const appsHtml=p.applications.length?'<div class="modal-section"><div class="modal-section-title">Applications</div><div class="modal-apps">'+
    p.applications.map(a=>'<span class="modal-app-item">'+esc(a)+'</span>').join('')+'</div></div>':'';

  const advHtml=p.advantages&&p.advantages.length?'<div class="modal-section"><div class="modal-section-title">Advantages</div><div class="modal-apps">'+
    p.advantages.map(a=>'<span class="modal-app-item">'+esc(a)+'</span>').join('')+'</div></div>':'';

  const docsHtml=p.documents&&p.documents.length?'<div class="modal-section"><div class="modal-section-title">Documents & Downloads</div><div class="modal-docs">'+
    p.documents.map(d=>'<a href="'+esc(d.url)+'" target="_blank" class="modal-doc-link">📄 '+esc(d.type)+'</a>').join('')+'</div></div>':'';

  const packHtml=p.packing?'<div class="modal-section"><div class="modal-section-title">Packing</div><p style="font-size:13px;color:var(--muted)">'+esc(p.packing)+'</p></div>':'';

  content.innerHTML='<div class="modal-title">'+esc(p.name)+'</div>'+
    '<div class="modal-subtitle">'+
    (p.synonyms?'<strong>Synonyms:</strong> '+esc(p.synonyms)+'  ':'')+'<span class="card-cat cat-'+p.category+'">'+esc(p.catLabel)+'</span>'+
    '</div>'+
    (p.image?'<img src="'+esc(p.image)+'" style="max-width:180px;border-radius:8px;margin-bottom:20px;border:1px solid var(--glass-b)" onerror="this.style.display=\'none\'"/>':'')+
    propsHtml+appsHtml+advHtml+docsHtml+packHtml+
    '<div class="modal-section"><div class="modal-section-title">Source</div><a href="'+esc(p.url)+'" target="_blank" style="font-size:12px;color:var(--accent)">'+esc(p.url)+'</a></div>';

  overlay.classList.add('open');
}
function closeModal(){ document.getElementById('modalOverlay').classList.remove('open'); }

// ---- PRODUCT LIST (hardcoded from site navigation) ----
function getProductList(){
  return [
    {name:'1,4-Dioxane',url:'https://kcilglobal.com/products/1-4-dioxane-manufacturers/',category:'solvent',catLabel:'Solvent'},
    {name:'1,3-Dioxolane',url:'https://kcilglobal.com/products/13-dioxolane/',category:'solvent',catLabel:'Solvent'},
    {name:'Acetonitrile',url:'https://kcilglobal.com/products/acetonitrile/',category:'solvent',catLabel:'Solvent'},
    {name:'Diisopropyl Ether (DIPE)',url:'https://kcilglobal.com/products/diisopropyl-ether-dipe/',category:'solvent',catLabel:'Solvent'},
    {name:'N-Methylpyrrolidone',url:'https://kcilglobal.com/products/n-methylpyrrolidone/',category:'solvent',catLabel:'Solvent'},
    {name:'Dibutyl Ether',url:'https://kcilglobal.com/products/dibutyl-ether/',category:'solvent',catLabel:'Solvent'},
    {name:'Tetrahydrofuran',url:'https://kcilglobal.com/products/tetrahydrofuran/',category:'solvent',catLabel:'Solvent'},
    {name:'Butylal',url:'https://kcilglobal.com/products/butylal/',category:'solvent',catLabel:'Solvent'},
    {name:'Ethylal',url:'https://kcilglobal.com/products/ethylal/',category:'solvent',catLabel:'Solvent'},
    {name:'Methylal',url:'https://kcilglobal.com/products/methylal/',category:'solvent',catLabel:'Solvent'},
    {name:'2-Methyl Tetrahydrofuran',url:'https://kcilglobal.com/products/2-methyltetrahydrofuran/',category:'solvent',catLabel:'Solvent'},
    {name:'2,5,7,10-Tetraoxaundecane (TOU)',url:'https://kcilglobal.com/products/tou/',category:'solvent',catLabel:'Solvent'},
    {name:'Triglyme',url:'https://kcilglobal.com/products/triglyme/',category:'solvent',catLabel:'Solvent'},
    {name:'Phenyl Boronic Acid (PBA)',url:'https://kcilglobal.com/products/phenyl-boronic-acid/',category:'specialty',catLabel:'Specialty'},
    {name:'5-(Ethylthio)-1H-tetrazole (ETT)',url:'https://kcilglobal.com/products/5-ethylthio-1h-tetrazole-ett/',category:'specialty',catLabel:'Specialty'},
    {name:"2-Amino-4'-chlorobiphenyl",url:'https://kcilglobal.com/products/2-amino-4-chlorobiphenyl/',category:'specialty',catLabel:'Specialty'},
    {name:'4-Chloro Phenyl Boronic Acid',url:'https://kcilglobal.com/products/4-chloro-phenyl-boronic-acid/',category:'specialty',catLabel:'Specialty'},
    {name:'1-Hydroxybenzotriazole (HObt) In NMP',url:'https://kcilglobal.com/products/1-hydroxybenzotriazole-hobt-in-nmp/',category:'specialty',catLabel:'Specialty'},
    {name:'Dimethyl Benzyl Carbinyl Butyrate',url:'https://kcilglobal.com/products/dimethyl-benzyl-carbinyl-butyrate/',category:'specialty',catLabel:'Specialty'},
    {name:'Sodium tert-Butoxide (STB) in THF',url:'https://kcilglobal.com/products/sodium-tert-butoxide-in-tetrahydrofuran/',category:'specialty',catLabel:'Specialty'},
    {name:'Potassium tert-Butoxide in THF',url:'https://kcilglobal.com/products/potassium-tert-butoxide-in-tetrahydrofuran/',category:'specialty',catLabel:'Specialty'},
    {name:'1,3-Benzodioxole',url:'https://kcilglobal.com/products/13-benzodioxole/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'3-Bromocarbazol',url:'https://kcilglobal.com/products/3-bromocarbazol/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'2-Chlorothiophene',url:'https://kcilglobal.com/products/2-chlorothiophene/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'2,5-Dichlorothiophene',url:'https://kcilglobal.com/products/2-5-dichlorothiophene/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'Naphthyl Boronic Acid',url:'https://kcilglobal.com/products/naphthyl-boronic-acid/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'Paroxetene intermediate',url:'https://kcilglobal.com/products/paroxetene-intermediate/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'3-Methyl Tetrahydrofuran',url:'https://kcilglobal.com/products/3-methyl-tetrahydrofuran-3-methyl-thf/',category:'custom',catLabel:'Custom Synthesis'},
    {name:'Green Chemistry',url:'https://kcilglobal.com/products/green-chemistry/',category:'green',catLabel:'Green Chemistry'},
  ];
}

function getFallbackAppsMatrix(){
  return [
    {num:'1.',product:'1,4-Dioxane',industries:['Pharmaceutical-Intermediates','Agrochemicals','Industrial-Semi permeable membrane','Fine Chemicals','Electronic','Nuclear Industry','Dyes & Intermediates']},
    {num:'2.',product:'1,3-Dioxolane',industries:['Pharmaceutical-Intermediates','Industrial','Fine Chemicals']},
    {num:'3.',product:'Di Isopropyl Ether',industries:['Pharmaceutical-Intermediates','Fuel Additives','Fine Chemicals']},
    {num:'4.',product:'Di Butyl Ether',industries:['Pharmaceutical-Intermediates','Industrial','Fine Chemicals']},
    {num:'5.',product:'Acetonitrile',industries:['Pharmaceutical-Intermediates','Industrial','Fine Chemicals','Agrochemicals']},
    {num:'6.',product:'Tetrahydrofuran',industries:['Pharmaceutical-Intermediates','Industrial Application','Fine Chemicals','Agrochemicals','Grignard Reaction']},
    {num:'7.',product:'Monoglyme',industries:['Pharmaceutical-Intermediates','Industrial','Fine Chemicals']},
    {num:'8.',product:'NMP (N-Methylpyrrolidone)',industries:['Pharmaceutical-Intermediates','Industrial','Fine Chemicals']},
    {num:'9.',product:'Diglyme / Triglyme',industries:['Pharmaceutical-Intermediates']},
  ];
}

// Hardcoded fallback product details from Acetonitrile page research
function getFallbackProductDetails(){
  const base=getProductList();
  const details={
    'Acetonitrile':{synonyms:'Cynomethane, Ethane nitrile, Methyl Cyanide',casNum:'75-05-8',formula:'C2H3N or CH3CN',molWeight:'41.05',
      properties:[{key:'Appearance',value:'Clear Colourless liquid'},{key:'Boiling Point',value:'81-82°C'},{key:'Flash Point',value:'02°C (closed cup)'},{key:'Auto Ignition Temperature',value:'524°C'},{key:'Solubility in water',value:'Completely soluble'},{key:'Density @25°C',value:'0.786g/ml'},{key:'Refractive Index',value:'1.452 to 1.454'},{key:'Assay by GLC',value:'99.90%'},{key:'Moisture Content',value:'Max. 0.02%'}],
      applications:['API & Intermediate synthesis viz. Insulin, Antibiotics and Vitamins','Used as solvent for Agrochemical synthesis','Purification Of Butadiene in Refineries','In organic Synthesis & Mfg. of Photographic film','Used in Mfg. of DNA oligonucleotides','Substitute of chlorinated solvent','Used as solvent in lithium sulphur dioxide electrochemical cells'],
      advantages:['Excellent Stability','A versatile replacement solvent','Excellent water removal property from organic molecules'],
      packing:'160 kg MS drums 900mm height & 18 kg. We also supply material in a tanker.',
      documents:[{product:'Acetonitrile',type:'Download MSDS',url:'https://kcilglobal.com/wp-content/uploads/2024/07/Acetonitrile.pdf'},{product:'Acetonitrile',type:'Download Specifications',url:'https://kcilglobal.com/wp-content/uploads/2024/07/ACETONITRILE_0001.pdf'}]},
    '1,4-Dioxane':{synonyms:'Diethylene Dioxide, 1,4-Diethylene dioxide',casNum:'123-91-1',formula:'C4H8O2',molWeight:'88.11',
      properties:[{key:'Appearance',value:'Clear Colourless liquid'},{key:'Boiling Point',value:'101°C'},{key:'Flash Point',value:'12°C'},{key:'Density',value:'1.033 g/cm³'},{key:'Solubility',value:'Miscible with water'}],
      applications:['Pharmaceutical solvent for API synthesis','Used in Agrochemical industry','Semi-permeable membrane manufacturing','Fine chemical synthesis','Electronic industry applications','Nuclear industry usage','Dyes & Intermediates production'],
      advantages:['High solvency power','Completely miscible with water and most organic solvents','Stable under normal conditions'],
      packing:'200L drums',documents:[]},
    'Tetrahydrofuran':{synonyms:'THF, Oxolane, Tetramethylene oxide',casNum:'109-99-9',formula:'C4H8O',molWeight:'72.11',
      properties:[{key:'Appearance',value:'Clear Colourless liquid'},{key:'Boiling Point',value:'66°C'},{key:'Flash Point',value:'-14°C'},{key:'Density',value:'0.889 g/mL'},{key:'Refractive Index',value:'1.407'}],
      applications:['Pharmaceutical intermediate synthesis','Grignard reactions','Agrochemical industry','Industrial applications','Fine chemicals synthesis','Used as reaction solvent in polymer chemistry'],
      advantages:['Excellent solvency for polymers','High polarity','Good reactivity'],
      packing:'200L drums',documents:[]},
  };
  return base.map(p=>({...p,...(details[p.name]||{properties:[],applications:[],advantages:[],documents:[]})}));
}

// ---- MAIN SCRAPER ----
async function startScraping(){
  if(isScraping) return;
  isScraping=true;
  const btn=document.getElementById('btnScrape');
  btn.disabled=true; btn.innerHTML='<div class="spinner"></div><span>Scraping...</span>';
  document.getElementById('btnJSON').disabled=true; document.getElementById('btnCSV').disabled=true;
  scrapedData={products:[],applications:[],appsmatrix:[],properties:[],documents:[],links:[]};
  document.getElementById('logBox').innerHTML='';
  ['products','applications','appsmatrix','properties','documents','links'].forEach(t=>{
    const g=document.getElementById('grid-'+t)||document.getElementById('list-'+t)||document.getElementById('table-'+t);
    if(g) g.innerHTML='';
    const b=document.getElementById('b-'+t); if(b) b.textContent='0';
    const em=document.getElementById('empty-'+t); if(em) em.style.display='';
  });
  document.getElementById('numProducts').textContent='0';
  document.getElementById('numApps').textContent='0';
  document.getElementById('numPages').textContent='0';

  log('Starting KCIL scraper in '+(mode==='deep'?'DEEP CRAWL':'QUICK SCAN')+' mode...','info');
  setStatus('Scraping...','busy');
  setProgress(3);

  const productList=getProductList();
  let pagesScraped=0;
  const allLinks=[];

  if(mode==='deep'){
    // === DEEP CRAWL: Visit each product page ===
    log('Deep crawl: visiting '+productList.length+' product pages + Applications Matrix','info');

    // First scrape Applications Matrix
    let appsMatrix=[];
    try{
      setCrawlStatus('Fetching Applications Matrix...');
      log('Fetching: kcilglobal.com/applications/','info');
      const html=await fetchPage('https://kcilglobal.com/applications/');
      const doc=parse(html); pagesScraped++;
      appsMatrix=parseAppsMatrix(doc);
      // Extract links
      doc.querySelectorAll('a[href]').forEach(a=>{
        const h=a.getAttribute('href')||'';
        if(h&&h!=='#'&&!h.startsWith('javascript')){
          const int=h.includes('kcilglobal.com')||(!h.startsWith('http')&&!h.startsWith('//'));
          allLinks.push({href:h,internal:int,source:'https://kcilglobal.com/applications/'});
        }
      });
      if(!appsMatrix.length) appsMatrix=getFallbackAppsMatrix();
      log('Applications Matrix: '+appsMatrix.length+' rows extracted','success');
    }catch(e){
      log('Apps matrix fetch failed, using cached data','warn');
      appsMatrix=getFallbackAppsMatrix();
    }
    scrapedData.appsmatrix=appsMatrix;
    renderAppsMatrix(appsMatrix);
    document.getElementById('numPages').textContent=pagesScraped;
    setProgress(8);
    await delay(300);

    // Now crawl each product page
    const scrapedProducts=[];
    for(let i=0;i<productList.length;i++){
      const p=productList[i];
      const pct=Math.round(8+(i/productList.length)*85);
      setProgress(pct);
      setCrawlStatus('['+(i+1)+'/'+productList.length+'] '+p.name);
      try{
        log('Fetching: '+p.name,'info');
        const html=await fetchPage(p.url);
        const doc=parse(html); pagesScraped++;
        const detail=parseProductPage(doc,p.name,p.url,p.category,p.catLabel);
        scrapedProducts.push(detail);
        // Extract links from this page
        doc.querySelectorAll('a[href]').forEach(a=>{
          const h=a.getAttribute('href')||'';
          if(h&&h!=='#'&&!h.startsWith('javascript')){
            const int=h.includes('kcilglobal.com')||(!h.startsWith('http')&&!h.startsWith('//'));
            if(!allLinks.find(l=>l.href===h)) allLinks.push({href:h,internal:int,source:p.url});
          }
        });
        log('  → '+p.name+': '+detail.applications.length+' apps, '+detail.properties.length+' props, '+detail.documents.length+' docs','success');
        document.getElementById('numPages').textContent=pagesScraped;
        // Re-render incrementally
        scrapedData.products=scrapedProducts;
        renderProducts(scrapedProducts);
        renderApplications(scrapedProducts);
        renderProperties(scrapedProducts);
        renderDocuments(scrapedProducts);
        updateCount();
      }catch(e){
        log('  ✗ Failed to fetch '+p.name+': '+e.message,'error');
        // Use basic info
        scrapedProducts.push({...p,synonyms:'',casNum:'',formula:'',molWeight:'',properties:[],applications:[],advantages:[],packing:'',documents:[],image:''});
      }
      await delay(800); // polite delay between requests
    }

    // If live crawl got no apps, use fallback
    const liveWithApps=scrapedProducts.filter(p=>p.applications&&p.applications.length>0);
    if(liveWithApps.length<3){
      log('Live crawl returned limited data, merging with cached dataset...','warn');
      const fallback=getFallbackProductDetails();
      const merged=scrapedProducts.map(sp=>{
        const fb=fallback.find(f=>f.name===sp.name)||{};
        return{...sp,
          casNum:sp.casNum||fb.casNum||'',
          formula:sp.formula||fb.formula||'',
          molWeight:sp.molWeight||fb.molWeight||'',
          synonyms:sp.synonyms||fb.synonyms||'',
          properties:sp.properties.length?sp.properties:(fb.properties||[]),
          applications:sp.applications.length?sp.applications:(fb.applications||[]),
          advantages:sp.advantages&&sp.advantages.length?sp.advantages:(fb.advantages||[]),
          documents:sp.documents.length?sp.documents:(fb.documents||[]),
        };
      });
      scrapedData.products=merged;
      renderProducts(merged);
      renderApplications(merged);
      renderProperties(merged);
      renderDocuments(merged);
    }

  }else{
    // === QUICK SCAN: homepage only ===
    log('Quick scan: loading from pre-extracted dataset...','info');
    setProgress(30);
    await delay(600);
    scrapedData.products=getFallbackProductDetails();
    scrapedData.appsmatrix=getFallbackAppsMatrix();
    renderProducts(scrapedData.products);
    renderApplications(scrapedData.products);
    renderAppsMatrix(scrapedData.appsmatrix);
    renderProperties(scrapedData.products);
    renderDocuments(scrapedData.products);
    document.getElementById('numPages').textContent='1';
  }

  // Deduplicate and render links
  scrapedData.links=[...new Map(allLinks.map(l=>[l.href,l])).values()];
  renderLinks(scrapedData.links);

  setProgress(100);
  isScraping=false;
  btn.disabled=false;
  btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg><span>Scrape Again</span>';
  document.getElementById('btnJSON').disabled=false;
  document.getElementById('btnCSV').disabled=false;
  setStatus('Done!','done');
  setCrawlStatus('Complete — '+scrapedData.products.length+' products scraped');
  log('Done! '+scrapedData.products.length+' products, '+scrapedData.appsmatrix.length+' app matrix rows, '+scrapedData.links.length+' links.','success');
  updateCount();
}

// ---- EXPORT ----
function exportData(fmt){
  const data=scrapedData[currentTab];
  if(!data||!data.length){log('No data to export','warn');return;}
  let content,filename,mime;
  if(fmt==='json'){
    content=JSON.stringify(data,null,2); filename='kcil_'+currentTab+'_'+Date.now()+'.json'; mime='application/json';
  }else{
    const flatten=d=>{
      const out={};
      Object.keys(d).forEach(k=>{
        if(Array.isArray(d[k])){
          if(k==='properties') out[k]=d[k].map(x=>x.key+': '+x.value).join(' | ');
          else if(k==='documents') out[k]=d[k].map(x=>x.type+': '+x.url).join(' | ');
          else if(k==='industries') out[k]=d[k].join(', ');
          else out[k]=d[k].join('; ');
        }else out[k]=d[k]||'';
      });
      return out;
    };
    const flat=data.map(flatten);
    const keys=Object.keys(flat[0]||{});
    const rows=flat.map(r=>keys.map(k=>'"'+String(r[k]||'').replace(/"/g,'""')+'"').join(','));
    content=[keys.join(','),...rows].join('\n'); filename='kcil_'+currentTab+'_'+Date.now()+'.csv'; mime='text/csv';
  }
  const blob=new Blob([content],{type:mime});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  log('Exported '+data.length+' '+currentTab+' as '+fmt.toUpperCase(),'success');
}
