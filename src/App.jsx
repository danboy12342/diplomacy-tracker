import { useState, useRef } from "react";

const NATIONS = {
  England:        { color:'#3d5e8c', text:'#ffffff', label:'England' },
  France:         { color:'#3a6850', text:'#ffffff', label:'France' },
  Germany:        { color:'#2e2e2e', text:'#ffffff', label:'Germany' },
  Russia:         { color:'#a5ad95', text:'#222222', label:'Russia' },
  AustriaHungary: { color:'#8c2828', text:'#ffffff', label:'Austria-Hungary' },
  Italy:          { color:'#4e6e28', text:'#ffffff', label:'Italy' },
  Turkey:         { color:'#c4961a', text:'#000000', label:'Turkey' },
  Neutral:        { color:'#c2a860', text:'#333333', label:'Neutral' },
};

const T = [
  {id:'cly',name:'Clyde',         x:163,y:168,rx:22,ry:17,sc:false,home:'England'},
  {id:'edi',name:'Edinburgh',     x:195,y:180,rx:25,ry:18,sc:true, home:'England'},
  {id:'lvp',name:'Liverpool',     x:180,y:208,rx:24,ry:17,sc:true, home:'England'},
  {id:'yor',name:'Yorkshire',     x:214,y:220,rx:22,ry:16,sc:false,home:'England'},
  {id:'wal',name:'Wales',         x:178,y:240,rx:20,ry:16,sc:false,home:'England'},
  {id:'lon',name:'London',        x:224,y:250,rx:23,ry:17,sc:true, home:'England'},
  {id:'bre',name:'Brest',         x:146,y:305,rx:26,ry:18,sc:true, home:'France'},
  {id:'pic',name:'Picardy',       x:242,y:288,rx:25,ry:17,sc:false,home:'France'},
  {id:'par',name:'Paris',         x:238,y:320,rx:25,ry:18,sc:true, home:'France'},
  {id:'bur',name:'Burgundy',      x:274,y:348,rx:26,ry:18,sc:false,home:'France'},
  {id:'gas',name:'Gascony',       x:188,y:372,rx:25,ry:18,sc:false,home:'France'},
  {id:'mar',name:'Marseilles',    x:276,y:400,rx:25,ry:18,sc:true, home:'France'},
  {id:'kie',name:'Kiel',          x:354,y:220,rx:25,ry:17,sc:true, home:'Germany'},
  {id:'ber',name:'Berlin',        x:398,y:246,rx:25,ry:17,sc:true, home:'Germany'},
  {id:'pru',name:'Prussia',       x:444,y:238,rx:25,ry:17,sc:false,home:'Germany'},
  {id:'ruh',name:'Ruhr',          x:313,y:282,rx:23,ry:17,sc:false,home:'Germany'},
  {id:'sil',name:'Silesia',       x:442,y:279,rx:25,ry:17,sc:false,home:'Germany'},
  {id:'mun',name:'Munich',        x:370,y:325,rx:25,ry:18,sc:true, home:'Germany'},
  {id:'stp',name:'St.Petersburg', x:602,y:125,rx:36,ry:19,sc:true, home:'Russia'},
  {id:'fin',name:'Finland',       x:552,y:155,rx:27,ry:19,sc:false,home:'Russia'},
  {id:'liv',name:'Livonia',       x:530,y:209,rx:25,ry:17,sc:false,home:'Russia'},
  {id:'mos',name:'Moscow',        x:642,y:239,rx:29,ry:19,sc:true, home:'Russia'},
  {id:'war',name:'Warsaw',        x:486,y:277,rx:25,ry:18,sc:true, home:'Russia'},
  {id:'ukr',name:'Ukraine',       x:560,y:315,rx:29,ry:19,sc:false,home:'Russia'},
  {id:'sev',name:'Sevastopol',    x:632,y:369,rx:29,ry:19,sc:true, home:'Russia'},
  {id:'boh',name:'Bohemia',       x:424,y:317,rx:25,ry:18,sc:false,home:'AustriaHungary'},
  {id:'tyr',name:'Tyrolia',       x:386,y:361,rx:25,ry:18,sc:false,home:'AustriaHungary'},
  {id:'vie',name:'Vienna',        x:444,y:355,rx:23,ry:17,sc:true, home:'AustriaHungary'},
  {id:'bud',name:'Budapest',      x:476,y:347,rx:25,ry:17,sc:true, home:'AustriaHungary'},
  {id:'gal',name:'Galicia',       x:500,y:307,rx:27,ry:18,sc:false,home:'AustriaHungary'},
  {id:'tri',name:'Trieste',       x:410,y:397,rx:23,ry:17,sc:true, home:'AustriaHungary'},
  {id:'pie',name:'Piedmont',      x:310,y:391,rx:23,ry:17,sc:false,home:'Italy'},
  {id:'ven',name:'Venice',        x:358,y:405,rx:23,ry:17,sc:true, home:'Italy'},
  {id:'tus',name:'Tuscany',       x:340,y:437,rx:23,ry:17,sc:false,home:'Italy'},
  {id:'rom',name:'Rome',          x:356,y:471,rx:23,ry:17,sc:true, home:'Italy'},
  {id:'apu',name:'Apulia',        x:406,y:473,rx:23,ry:17,sc:false,home:'Italy'},
  {id:'nap',name:'Naples',        x:386,y:507,rx:23,ry:18,sc:true, home:'Italy'},
  {id:'con',name:'Constantinople',x:604,y:431,rx:32,ry:18,sc:true, home:'Turkey'},
  {id:'ank',name:'Ankara',        x:658,y:429,rx:25,ry:17,sc:true, home:'Turkey'},
  {id:'smy',name:'Smyrna',        x:638,y:465,rx:25,ry:18,sc:true, home:'Turkey'},
  {id:'arm',name:'Armenia',       x:722,y:437,rx:25,ry:17,sc:false,home:'Turkey'},
  {id:'syr',name:'Syria',         x:706,y:474,rx:25,ry:18,sc:false,home:'Turkey'},
  {id:'nwy',name:'Norway',        x:426,y:105,rx:34,ry:19,sc:true, home:'Neutral'},
  {id:'swe',name:'Sweden',        x:482,y:155,rx:27,ry:19,sc:true, home:'Neutral'},
  {id:'den',name:'Denmark',       x:372,y:192,rx:25,ry:17,sc:true, home:'Neutral'},
  {id:'hol',name:'Holland',       x:290,y:255,rx:23,ry:17,sc:true, home:'Neutral'},
  {id:'bel',name:'Belgium',       x:263,y:275,rx:23,ry:17,sc:true, home:'Neutral'},
  {id:'por',name:'Portugal',      x:110,y:445,rx:23,ry:18,sc:true, home:'Neutral'},
  {id:'spa',name:'Spain',         x:166,y:439,rx:37,ry:27,sc:true, home:'Neutral'},
  {id:'ser',name:'Serbia',        x:486,y:397,rx:25,ry:18,sc:true, home:'Neutral'},
  {id:'gre',name:'Greece',        x:500,y:447,rx:23,ry:17,sc:true, home:'Neutral'},
  {id:'rum',name:'Romania',       x:540,y:365,rx:27,ry:18,sc:true, home:'Neutral'},
  {id:'bul',name:'Bulgaria',      x:546,y:407,rx:25,ry:18,sc:true, home:'Neutral'},
  {id:'tun',name:'Tunis',         x:340,y:551,rx:25,ry:18,sc:true, home:'Neutral'},
  {id:'alb',name:'Albania',       x:454,y:425,rx:21,ry:15,sc:false,home:'Neutral'},
  {id:'naf',name:'N.Africa',      x:212,y:554,rx:34,ry:19,sc:false,home:'Neutral'},
  {id:'nao',name:'N.Atlantic',    x: 63,y:257,rx:30,ry:25,sc:false,home:null,sea:true},
  {id:'mao',name:'Mid-Atlantic',  x: 83,y:361,rx:28,ry:25,sc:false,home:null,sea:true},
  {id:'iri',name:'Irish Sea',     x:134,y:236,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'eng',name:'Eng.Channel',   x:216,y:275,rx:27,ry:17,sc:false,home:null,sea:true},
  {id:'nth',name:'North Sea',     x:293,y:202,rx:29,ry:23,sc:false,home:null,sea:true},
  {id:'nwg',name:'Norweg.Sea',    x:310,y:129,rx:33,ry:25,sc:false,home:null,sea:true},
  {id:'bar',name:'Barents Sea',   x:606,y: 69,rx:36,ry:21,sc:false,home:null,sea:true},
  {id:'hgo',name:'Helgoland',     x:340,y:246,rx:21,ry:15,sc:false,home:null,sea:true},
  {id:'bal',name:'Baltic Sea',    x:435,y:212,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'bot',name:'Gulf Bothnia',  x:522,y:175,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'lyo',name:'Gulf of Lyon',  x:300,y:437,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'wes',name:'W.Med.',        x:210,y:499,rx:30,ry:21,sc:false,home:null,sea:true},
  {id:'tys',name:'Tyrrhenian',    x:372,y:519,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'adr',name:'Adriatic',      x:436,y:449,rx:23,ry:19,sc:false,home:null,sea:true},
  {id:'ion',name:'Ionian Sea',    x:474,y:501,rx:27,ry:21,sc:false,home:null,sea:true},
  {id:'aeg',name:'Aegean Sea',    x:550,y:465,rx:25,ry:19,sc:false,home:null,sea:true},
  {id:'eas',name:'E.Med.',        x:585,y:511,rx:30,ry:21,sc:false,home:null,sea:true},
  {id:'bla',name:'Black Sea',     x:652,y:402,rx:34,ry:21,sc:false,home:null,sea:true},
];

const DEFAULT_MAP_URL = "/map.jpg";

export default function DiplomacyTracker() {
  const [terr, setTerr] = useState(() => Object.fromEntries(T.map(t => [t.id, t.home])));
  const [units, setUnits] = useState([]);
  const [selNation, setSelNation] = useState('England');
  const [unitType, setUnitType] = useState('Army');
  const [mode, setMode] = useState('territory');
  const [dragging, setDragging] = useState(null);
  const [hover, setHover] = useState(null);
  const [mapUrl, setMapUrl] = useState(DEFAULT_MAP_URL);
  const [mapInput, setMapInput] = useState('');
  const [overlayOpacity, setOverlayOpacity] = useState(0.45);
  const [showMapSettings, setShowMapSettings] = useState(false);
  const [mapError, setMapError] = useState(false);
  const svgRef = useRef(null);
  const nextId = useRef(1);
  const fileRef = useRef(null);

  const svgXY = (cx, cy) => {
    const r = svgRef.current.getBoundingClientRect();
    return [((cx - r.left) / r.width) * 1000, ((cy - r.top) / r.height) * 680];
  };

  const placeUnit = (x, y) =>
    setUnits(p => [...p, { id: nextId.current++, type: unitType, nation: selNation, x, y }]);

  const onTerrClick = (e, t) => {
    e.stopPropagation();
    if (mode === 'territory') {
      if (!t.sea) setTerr(p => ({ ...p, [t.id]: selNation }));
    } else {
      placeUnit(t.x, t.y);
    }
  };

  const onSvgClick = (e) => {
    if (mode === 'addUnit' && dragging === null) {
      const [x, y] = svgXY(e.clientX, e.clientY);
      placeUnit(x, y);
    }
  };

  const startDrag = (e, id) => { e.stopPropagation(); e.preventDefault(); setDragging(id); };

  const onMove = (e) => {
    if (dragging === null || !svgRef.current) return;
    const [x, y] = svgXY(e.clientX, e.clientY);
    setUnits(p => p.map(u => u.id === dragging ? { ...u, x, y } : u));
  };

  const delUnit = (e, id) => { e.stopPropagation(); setUnits(p => p.filter(u => u.id !== id)); };

  const loadFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setMapUrl(url);
    setMapError(false);
  };

  const hov = hover ? T.find(t => t.id === hover) : null;
  const hovNat = hov && !hov.sea ? NATIONS[terr[hover]] : null;

  const scCount = Object.entries(terr).reduce((acc, [id, nat]) => {
    if (!nat || nat === 'Neutral') return acc;
    const t = T.find(x => x.id === id);
    if (t?.sc) acc[nat] = (acc[nat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display:'flex', height:'100vh', background:'#0d1520', userSelect:'none', fontFamily:'Georgia, serif' }}>
      {/* Sidebar */}
      <div style={{ width:'190px', flexShrink:0, background:'#111e30', display:'flex', flexDirection:'column', padding:'10px', gap:'7px', overflowY:'auto', borderRight:'2px solid #4a3800' }}>
        <div style={{ textAlign:'center', padding:'4px 0 4px' }}>
          <div style={{ color:'#c4961a', fontSize:'20px', fontWeight:'bold', letterSpacing:'2px', textShadow:'0 0 12px #c4961a88' }}>Diplomacy</div>
          <div style={{ color:'#556', fontSize:'9px', letterSpacing:'1px' }}>BOARD TRACKER</div>
        </div>

        {/* Mode */}
        <div>
          <div style={lbl}>Mode</div>
          {[['territory','🗺 Color Region'],['addUnit','⚔ Place Unit']].map(([m,l]) => (
            <button key={m} onClick={() => setMode(m)} style={{ ...btn, background: mode===m?'#c4961a':'rgba(255,255,255,0.04)', color: mode===m?'#000':'#aaa', border:`1px solid ${mode===m?'#c4961a':'#334'}`, fontWeight: mode===m?'bold':'normal' }}>{l}</button>
          ))}
        </div>

        {/* Nations */}
        <div>
          <div style={lbl}>Nation</div>
          {Object.entries(NATIONS).map(([key, n]) => (
            <button key={key} onClick={() => setSelNation(key)} style={{ ...btn, background: selNation===key?n.color:'rgba(0,0,0,0.35)', color: selNation===key?n.text:'#bbb', border:`2px solid ${n.color}`, boxShadow: selNation===key?`0 0 10px ${n.color}99`:'none', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>{n.label}</span>
              {scCount[key] ? <span style={{ fontSize:'9px', opacity:0.85 }}>★{scCount[key]}</span> : null}
            </button>
          ))}
        </div>

        {/* Unit type */}
        {mode === 'addUnit' && (
          <div>
            <div style={lbl}>Unit Type</div>
            {[['Army','⚔ Army (A)'],['Fleet','▲ Fleet (F)']].map(([t,l]) => (
              <button key={t} onClick={() => setUnitType(t)} style={{ ...btn, background: unitType===t?'#c4961a':'rgba(255,255,255,0.04)', color: unitType===t?'#000':'#aaa', border:`1px solid ${unitType===t?'#c4961a':'#334'}`, fontWeight: unitType===t?'bold':'normal' }}>{l}</button>
            ))}
          </div>
        )}

        {/* Map settings */}
        <div>
          <button onClick={() => setShowMapSettings(p => !p)} style={{ ...btn, background:'rgba(255,255,255,0.05)', color:'#89a', border:'1px solid #334' }}>
            🗺 {showMapSettings ? '▲ Map Settings' : '▼ Map Settings'}
          </button>
          {showMapSettings && (
            <div style={{ background:'rgba(0,0,0,0.35)', borderRadius:'5px', padding:'8px', border:'1px solid #334', marginTop:'2px' }}>
              <div style={{ ...lbl, marginTop:0 }}>Load Image File</div>
              <input ref={fileRef} type="file" accept="image/*" onChange={loadFile} style={{ display:'none' }}/>
              <button onClick={() => fileRef.current.click()} style={{ ...btn, background:'#1a3050', color:'#7af', border:'1px solid #2a6090' }}>📁 Browse…</button>
              <div style={{ ...lbl, marginTop:'6px' }}>Or paste URL</div>
              <input
                value={mapInput}
                onChange={e => setMapInput(e.target.value)}
                placeholder="https://..."
                style={{ width:'100%', background:'#0a1520', border:'1px solid #334', color:'#ccc', padding:'4px', fontSize:'9px', borderRadius:'3px', boxSizing:'border-box' }}
              />
              <button onClick={() => { setMapUrl(mapInput || DEFAULT_MAP_URL); setMapError(false); }} style={{ ...btn, marginTop:'4px', background:'#1a4030', color:'#7fc', border:'1px solid #2a7050' }}>Apply URL</button>
              <div style={{ ...lbl, marginTop:'6px' }}>Overlay Opacity: {Math.round(overlayOpacity*100)}%</div>
              <input type="range" min="0" max="0.85" step="0.05" value={overlayOpacity}
                onChange={e => setOverlayOpacity(+e.target.value)}
                style={{ width:'100%', accentColor:'#c4961a' }}/>
              {mapError && <div style={{ color:'#f88', fontSize:'9px', marginTop:'4px' }}>⚠ Could not load image. Check URL or use file upload.</div>}
            </div>
          )}
        </div>

        {/* Hover info */}
        {hov && (
          <div style={{ background:'rgba(0,0,0,0.45)', borderRadius:'6px', padding:'8px', fontSize:'11px', border:'1px solid #334' }}>
            <div style={{ fontWeight:'bold', color:'#fff', marginBottom:'2px' }}>{hov.name}</div>
            {hov.sc && <div style={{ color:'#c4961a', fontSize:'10px' }}>★ Supply Centre</div>}
            {hovNat && <div style={{ color:hovNat.color, fontSize:'10px', marginTop:'2px' }}>{hovNat.label}</div>}
            {hov.sea && <div style={{ color:'#7aafcc', fontSize:'10px' }}>Sea Zone</div>}
          </div>
        )}

        <div style={{ marginTop:'auto', color:'#446', fontSize:'9px', lineHeight:'1.6' }}>
          {mode==='territory' ? 'Click a land region to colour it.' : 'Click to place. Drag to move. Double-click to remove.'}
        </div>

        <button onClick={() => { setTerr(Object.fromEntries(T.map(t => [t.id, t.home]))); setUnits([]); }} style={{ padding:'7px', background:'#3a0808', color:'#ffaaaa', border:'1px solid #882222', borderRadius:'4px', cursor:'pointer', fontSize:'11px' }}>↺ Reset Board</button>
      </div>

      {/* Map */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        <svg ref={svgRef} viewBox="0 0 1000 680"
          style={{ width:'100%', height:'100%', cursor: mode==='addUnit'?'crosshair':'default', display:'block' }}
          onMouseMove={onMove} onMouseUp={() => setDragging(null)} onClick={onSvgClick}>
          <defs>
            <linearGradient id="seaBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#486e8a"/>
              <stop offset="100%" stopColor="#2a4c62"/>
            </linearGradient>
            <filter id="shdw"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.55"/></filter>
          </defs>

          {/* Sea background */}
          <rect width="1000" height="680" fill="url(#seaBg)"/>

          {/* User's map image */}
          {!mapError && (
            <image
              href={mapUrl}
              x="0" y="0" width="1000" height="680"
              preserveAspectRatio="xMidYMid meet"
              onError={() => setMapError(true)}
            />
          )}

          {/* Semi-transparent colour overlay per territory */}
          {T.map(t => {
            const nat = terr[t.id];
            if (t.sea) return null;
            const fill = NATIONS[nat]?.color ?? '#c2a860';
            const tc   = NATIONS[nat]?.text ?? '#333';
            const isHov = hover === t.id;
            return (
              <g key={t.id}
                onClick={e => onTerrClick(e, t)}
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor:'pointer' }}>
                <ellipse cx={t.x} cy={t.y}
                  rx={t.rx + (isHov ? 3 : 0)} ry={t.ry + (isHov ? 2 : 0)}
                  fill={fill} fillOpacity={overlayOpacity}
                  stroke={isHov ? '#ffffffcc' : 'rgba(0,0,0,0.55)'}
                  strokeWidth={isHov ? 2 : 1.2}
                />
                {t.sc && (
                  <text x={t.x} y={t.y - t.ry + 9} textAnchor="middle" fontSize="7" fill={tc} fillOpacity={Math.min(1, overlayOpacity*2.2)} style={{pointerEvents:'none'}}>★</text>
                )}
                <text x={t.x} y={t.y + (t.sc ? 4 : 5)} textAnchor="middle"
                  fontSize="7.2" fill={tc} fontWeight={t.sc ? 'bold' : 'normal'}
                  fillOpacity={Math.min(1, overlayOpacity*2.2)}
                  style={{ pointerEvents:'none', fontFamily:'Georgia, serif' }}>
                  {t.name}
                </text>
              </g>
            );
          })}

          {/* Sea zone labels (always visible, subtle) */}
          {T.filter(t => t.sea).map(t => (
            <g key={t.id}
              onClick={e => mode==='addUnit' && onTerrClick(e, t)}
              onMouseEnter={() => setHover(t.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: mode==='addUnit'?'pointer':'default' }}>
              <ellipse cx={t.x} cy={t.y} rx={t.rx} ry={t.ry} fill="transparent" stroke="rgba(120,180,220,0.15)" strokeWidth="0.5"/>
              <text x={t.x} y={t.y+4} textAnchor="middle" fontSize="5.5"
                fill="rgba(180,220,255,0.5)" style={{ pointerEvents:'none', fontFamily:'Georgia, serif' }}>
                {t.name}
              </text>
            </g>
          ))}

          {/* Units */}
          {units.map(u => {
            const nc = NATIONS[u.nation]?.color ?? '#888';
            const tc = NATIONS[u.nation]?.text ?? '#fff';
            const isA = u.type === 'Army';
            return (
              <g key={u.id} transform={`translate(${u.x},${u.y})`}
                onMouseDown={e => startDrag(e, u.id)}
                onDoubleClick={e => delUnit(e, u.id)}
                style={{ cursor: dragging===u.id?'grabbing':'grab' }}>
                {isA ? (
                  <rect x="-14" y="-14" width="28" height="28" rx="5"
                    fill={nc} stroke="#fff" strokeWidth="2.5" filter="url(#shdw)"/>
                ) : (
                  <polygon points="0,-16 15,11 -15,11"
                    fill={nc} stroke="#fff" strokeWidth="2.5" filter="url(#shdw)"/>
                )}
                <text textAnchor="middle" dy={isA?"5":"8"}
                  fontSize={isA?"13":"10"} fontWeight="bold" fill={tc}
                  style={{ pointerEvents:'none', fontFamily:'Arial, sans-serif' }}>
                  {isA ? 'A' : 'F'}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(760,608)">
            <rect x="0" y="0" width="232" height="66" rx="6" fill="rgba(0,0,0,0.65)" stroke="#4a3800" strokeWidth="1"/>
            <text x="8" y="15" fontSize="9" fill="#c4961a" fontWeight="bold" style={{fontFamily:'Georgia',letterSpacing:'1px'}}>LEGEND</text>
            <rect x="8" y="20" width="16" height="16" rx="3" fill="#555" stroke="#fff" strokeWidth="1.5"/>
            <text x="30" y="32" fontSize="9" fill="#ccc">Army (A) — drag to move</text>
            <polygon points="16,54 28,38 4,38" fill="#555" stroke="#fff" strokeWidth="1.5"/>
            <text x="30" y="51" fontSize="9" fill="#ccc">Fleet (F) — dbl-click removes</text>
            <text x="8" y="63" fontSize="8" fill="#888">★ = Supply Centre</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

const lbl = { color:'#557799', fontSize:'9px', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'1.5px', marginTop:'2px' };
const btn = { display:'block', width:'100%', padding:'5px 7px', marginBottom:'3px', borderRadius:'4px', cursor:'pointer', fontSize:'11px', textAlign:'left', transition:'all 0.15s', fontFamily:'Georgia, serif' };