import { useState, useEffect, useRef, useCallback } from "react";
import { ARN_BOLAG, ARN_ARENDEN, getBolagStats, getBolagFlaggor } from "./arnData.js";

const BV_TOKEN_URL = "/api/token";
const BV_API_URL = "/api/bolag/";

const SNI_LIST = [
  ["01","Jordbruk och jakt"],["02","Skogsbruk"],["03","Fiske och vattenbruk"],
  ["10","Livsmedelsframställning"],["11","Dryckesvaruframställning"],
  ["14","Tillverkning av kläder"],["18","Grafisk produktion"],
  ["25","Metallvarutillverkning"],["26","Tillverkning av elektronik"],
  ["29","Tillverkning av motorfordon"],["33","Reparation av maskiner"],
  ["35","Energiförsörjning"],["38","Avfallshantering"],
  ["41","Byggande av hus"],["42","Anläggningsarbeten"],
  ["43","Bygg & installation"],["45","Handel med motorfordon"],
  ["46","Partihandel"],["47","Detaljhandel"],
  ["49","Landtransport & åkeri"],["52","Lager & logistik"],
  ["53","Post & kurir"],["55","Hotell & logi"],
  ["56","Restaurang & café"],["58","Förlag & media"],
  ["59","Film & musik"],["61","Telekommunikation"],
  ["62","IT & systemutveckling"],["63","Informationstjänster"],
  ["64","Bank & finans"],["65","Försäkring"],
  ["66","Övrig finansverksamhet"],["68","Fastighet"],
  ["69","Juridik & redovisning"],["70","Konsult & företagsledning"],
  ["71","Arkitekter & tekniska konsulter"],["72","Forskning & utveckling"],
  ["73","Reklam & marknadsföring"],["74","Annan specialisttjänst"],
  ["77","Uthyrning"],["78","Bemanning & rekrytering"],
  ["79","Resebyråer & turism"],["80","Säkerhet & bevakning"],
  ["81","Städ & fastighetsskötsel"],["85","Utbildning"],
  ["86","Hälso- & sjukvård"],["87","Vård med boende"],
  ["88","Sociala tjänster"],["90","Kultur & nöje"],
  ["93","Sport & fritid"],["95","Reparation"],
  ["96","Övriga konsumenttjänster"],
];

let cachedToken = null;
let tokenExpiry = 0;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  const res = await fetch(BV_TOKEN_URL, { method: "POST" });
  if (!res.ok) throw new Error("Token-fel: " + res.status);
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 30) * 1000;
  return cachedToken;
}

async function fetchBolag(orgnr) {
  const token = await getToken();
  const res = await fetch(BV_API_URL + orgnr, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("API-fel: " + res.status);
  const data = await res.json();
  return data?.organisationer?.[0] ?? data;
}

function fmtOrgnr(s) {
  const d = s.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 6)}-${d.slice(6)}`;
  return s;
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function searchIndex(index, q, cityQ, sniKod, inkluderaAvregistrerade) {
  const ql = q.toLowerCase().trim();
  const cl = cityQ.toLowerCase().trim();
  const exact = [], starts = [], wordStarts = [], contains = [];
  let containsCount = 0;

  for (let i = 0; i < index.length; i++) {
    const row = index[i];
    const n = row[1].toLowerCase();
    const c = (row[2] ?? "").toLowerCase();
    const sni = row[4] ?? "";
    const aktiv = row[5] ?? 1;

    if (!inkluderaAvregistrerade && aktiv === 0) continue;
    if (cl && !c.includes(cl)) continue;
    if (sniKod && !sni.startsWith(sniKod)) continue;

    if (!ql) { contains.push(row); if (++containsCount >= 500) break; continue; }
    if (n === ql) exact.push(row);
    else if (n.startsWith(ql)) starts.push(row);
    else if (n.split(/\s+/).some(w => w.startsWith(ql))) wordStarts.push(row);
    else if (n.includes(ql)) { contains.push(row); if (++containsCount >= 500) break; }
  }

  const sortByName = (a, b) => a[1].localeCompare(b[1], "sv");
  return [
    ...exact.sort(sortByName),
    ...starts.sort(sortByName),
    ...wordStarts.sort(sortByName),
    ...contains.sort(sortByName),
  ];
}

// ── ARN helpers ──────────────────────────────────────────────────────────────
function arnOrgnrKey(orgnr) {
  return orgnr.replace(/\D/g, "");
}

function getArnStats(orgnr) {
  const key = arnOrgnrKey(orgnr);
  const arnKey = Object.keys(ARN_BOLAG).find(k => arnOrgnrKey(k) === key);
  if (!arnKey) return null;
  return getBolagStats(arnKey);
}

function getArnFlaggor(orgnr) {
  const key = arnOrgnrKey(orgnr);
  const arnKey = Object.keys(ARN_BOLAG).find(k => arnOrgnrKey(k) === key);
  if (!arnKey) return null;
  return getBolagFlaggor(arnKey);
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [index, setIndex] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [query, setQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [sniQuery, setSniQuery] = useState("");
  const [selectedSni, setSelectedSni] = useState(null);
  const [sniDropdown, setSniDropdown] = useState(false);
  const [inkluderaAvregistrerade, setInkluderaAvregistrerade] = useState(false);
  const [hits, setHits] = useState([]);
  const [fullResults, setFullResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const files = [
      ...Array.from({ length: 9 }, (_, i) => `/bolag_${i}.json`),
      '/bolag_test.json'
    ];
    Promise.all(files.map(f => fetch(f).then(r => r.json())))
      .then(chunks => setIndex(chunks.flat()))
      .catch(e => setLoadError(e.message));
  }, []);

  const totalAktiva = index ? index.filter(r => r[5] === 1).length : 0;
  const totalAlla = index ? index.length : 0;

  const sniSuggestions = sniQuery.length > 0
    ? SNI_LIST.filter(([kod, namn]) =>
        namn.toLowerCase().includes(sniQuery.toLowerCase()) || kod.startsWith(sniQuery))
    : SNI_LIST;

  useEffect(() => {
    if (!index || fullResults !== null) return;
    if (query.length < 2 && !cityQuery) { setHits([]); return; }
    if (selectedSni) { setHits([]); return; }
    setHits(searchIndex(index, query, cityQuery, "", false).slice(0, 20));
  }, [query, cityQuery, selectedSni, index, fullResults]);

  const runFullSearch = useCallback(() => {
    if (!index) return;
    setFullResults(searchIndex(index, query, cityQuery, selectedSni?.kod ?? "", inkluderaAvregistrerade));
    setHits([]);
  }, [index, query, cityQuery, selectedSni, inkluderaAvregistrerade]);

  const handleEnter = useCallback(() => {
    if (!index) return;
    if (query.length < 2 && !selectedSni && !cityQuery) return;
    setSniDropdown(false);
    runFullSearch();
  }, [index, query, cityQuery, selectedSni, runFullSearch]);

  const selectBolag = useCallback(async (row) => {
    setSelected(row);
    setHits([]);
    setFullResults(null);
    setQuery(row[1]);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    try {
      const data = await fetchBolag(row[0]);
      setDetail(data);
    } catch (e) {
      setDetailError(e.message);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const reset = () => {
    setQuery(""); setCityQuery(""); setSniQuery(""); setSelectedSni(null);
    setHits([]); setFullResults(null); setSelected(null);
    setDetail(null); setDetailError(null); setSniDropdown(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const isLoading = !index && !loadError;
  const hasSearch = query.length >= 2 || !!selectedSni || cityQuery.length > 0;

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={reset} style={{ cursor: "pointer" }}>
          <div className="logo-mark">
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <span className="logo-text">ARN<span>kollen</span></span>
        </div>
        <nav className="nav">
          <span>Om tjänsten</span>
          <span>För företag</span>
          <span>API</span>
        </nav>
      </header>

      <main className="hero">
        <p className="eyebrow">Konsumentskydd &amp; transparens</p>
        <h1 className="hero-title">Kolla företaget<br />innan du handlar</h1>
        <p className="hero-sub">Sök på bolagsnamn, bransch eller ort — eller kombinera alla tre.</p>

        <div className="search-row">
          <div className="search-wrap" style={{ flex: 2 }}>
            <svg className="search-icon" viewBox="0 0 16 16" fill="none" width="16" height="16">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input ref={inputRef} className="search-input" type="text"
              placeholder={isLoading ? "Laddar register…" : "Bolagsnamn…"}
              value={query} disabled={isLoading || !!loadError}
              onChange={e => { setSelected(null); setDetail(null); setFullResults(null); setQuery(e.target.value); }}
              onKeyDown={e => e.key === "Enter" && handleEnter()} autoFocus />
            {query && <button className="clear-btn" onClick={() => { setQuery(""); setFullResults(null); }}>✕</button>}
          </div>

          <div className="search-wrap" style={{ flex: 2, position: "relative" }}>
            <svg className="search-icon" viewBox="0 0 16 16" fill="none" width="16" height="16">
              <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            <input className="search-input" type="text" placeholder="Bransch…"
              value={selectedSni ? selectedSni.namn : sniQuery}
              disabled={isLoading || !!loadError}
              onFocus={() => { setSniDropdown(true); if (selectedSni) { setSelectedSni(null); setSniQuery(""); } }}
              onBlur={() => setTimeout(() => setSniDropdown(false), 150)}
              onChange={e => { setSniQuery(e.target.value); setSelectedSni(null); setFullResults(null); }}
              onKeyDown={e => e.key === "Enter" && handleEnter()} />
            {(selectedSni || sniQuery) && (
              <button className="clear-btn" onClick={() => { setSelectedSni(null); setSniQuery(""); setFullResults(null); }}>✕</button>
            )}
            {sniDropdown && (
              <div className="sni-dropdown">
                {sniSuggestions.length === 0
                  ? <div className="sni-item" style={{ color: "#aaa" }}>Inga träffar</div>
                  : sniSuggestions.map(([kod, namn]) => (
                    <div key={kod} className="sni-item" onMouseDown={() => {
                      setSelectedSni({ kod, namn }); setSniQuery(""); setSniDropdown(false); setFullResults(null);
                    }}>
                      <span className="sni-kod">{kod}</span><span>{namn}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="search-wrap" style={{ flex: 1 }}>
            <svg className="search-icon" viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            <input className="search-input" type="text" placeholder="Ort…"
              value={cityQuery} disabled={isLoading || !!loadError}
              onChange={e => { setFullResults(null); setCityQuery(e.target.value); }}
              onKeyDown={e => e.key === "Enter" && handleEnter()} />
            {cityQuery && <button className="clear-btn" onClick={() => { setCityQuery(""); setFullResults(null); }}>✕</button>}
          </div>

          <button className="search-btn" disabled={!hasSearch || isLoading} onClick={handleEnter}>Sök</button>
        </div>

        <div className="filter-row">
          <label className="checkbox-label">
            <input type="checkbox" checked={inkluderaAvregistrerade}
              onChange={e => { setInkluderaAvregistrerade(e.target.checked); setFullResults(null); setHits([]); }} />
            Inkludera avregistrerade bolag
          </label>
          {index && (
            <span className="register-count">
              {inkluderaAvregistrerade ? `${totalAlla.toLocaleString("sv-SE")} bolag totalt` : `${totalAktiva.toLocaleString("sv-SE")} aktiva bolag`}
            </span>
          )}
        </div>

        {loadError && <p className="load-error">Kunde inte ladda bolagsregistret: {loadError}</p>}
        <p className="search-hint">Tryck Enter eller Sök för alla träffar</p>

        {selectedSni && (
          <div className="filter-chips">
            <div className="chip">
              <span className="chip-kod">{selectedSni.kod}</span>{selectedSni.namn}
              <button onClick={() => { setSelectedSni(null); setFullResults(null); }}>✕</button>
            </div>
          </div>
        )}

        {hits.length > 0 && !selected && !fullResults && (
          <div className="dropdown">
            <div className="dropdown-label">
              {hits.length === 20 ? "Visar 20 — tryck Enter eller Sök för alla" : `${hits.length} träffar`}
            </div>
            {hits.map(row => (
              <div key={row[0]} className="dropdown-item" onClick={() => selectBolag(row)}>
                <div className="avatar">{initials(row[1])}</div>
                <div>
                  <div className="item-name">{row[1]}</div>
                  <div className="item-meta">
                    {fmtOrgnr(row[0])} · {row[2]}
                    {row[5] === 0 && <span className="avregistrerad-tag">Avregistrerad</span>}
                  </div>
                </div>
                <span className="item-arrow">›</span>
              </div>
            ))}
          </div>
        )}

        {fullResults && !selected && (
          <div className="full-results">
            <div className="full-results-header">
              <span>
                {fullResults.length.toLocaleString("sv-SE")} träffar
                {selectedSni ? ` · ${selectedSni.namn}` : ""}
                {cityQuery ? ` i ${cityQuery}` : ""}
                {inkluderaAvregistrerade ? " · inkl. avregistrerade" : ""}
              </span>
              <button className="close-btn" onClick={() => setFullResults(null)}>Stäng ✕</button>
            </div>
            <div className="full-results-list">
              {fullResults.slice(0, 200).map(row => (
                <div key={row[0]} className="dropdown-item" onClick={() => selectBolag(row)}>
                  <div className="avatar" style={{ opacity: row[5] === 0 ? 0.5 : 1 }}>{initials(row[1])}</div>
                  <div>
                    <div className="item-name" style={{ color: row[5] === 0 ? "#888" : undefined }}>{row[1]}</div>
                    <div className="item-meta">
                      {fmtOrgnr(row[0])} · {row[2]}
                      {row[5] === 0 && <span className="avregistrerad-tag">Avregistrerad</span>}
                    </div>
                  </div>
                  <span className="item-arrow">›</span>
                </div>
              ))}
              {fullResults.length > 200 && (
                <div className="dropdown-label" style={{ padding: "12px", textAlign: "center" }}>
                  Visar 200 av {fullResults.length.toLocaleString("sv-SE")} — förfina sökningen
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <div className="trust-bar">
        <span className="trust-item"><span className="dot green" />Källa: Bolagsverket, SCB &amp; ARN</span>
        <span className="trust-item"><span className="dot green" />Uppdateras löpande</span>
        <span className="trust-item"><span className="dot green" />Öppna offentliga data</span>
      </div>

      {selected && (
        <section className="detail-section">
          {detailLoading && <div className="loading-card"><div className="spinner" />Hämtar data från Bolagsverket…</div>}
          {detailError && <div className="error-card"><strong>Kunde inte hämta detaljdata</strong><p>{detailError}</p></div>}
          {detail && !detailLoading && <DetailCard bolag={selected} data={detail} />}
        </section>
      )}
    </div>
  );
}

// ── Detail Card ───────────────────────────────────────────────────────────────
function DetailCard({ bolag, data }) {
  const [openArende, setOpenArende] = useState(null);

  const namn = data?.organisationsnamn?.organisationsnamnLista?.[0]?.namn ?? bolag[1];
  const orgnr = fmtOrgnr(bolag[0]);
  const regdatum = data?.organisationsdatum?.registreringsdatum ?? bolag[3] ?? "—";
  const post = data?.postadressOrganisation?.postadress ?? null;
  const city = post?.postort ?? bolag[2] ?? "—";
  const street = post?.utdelningsadress ?? "—";
  const zip = post?.postnummer ?? "—";
  const sniArr = data?.naringsgrenOrganisation?.sni;
  const sniText = Array.isArray(sniArr) ? sniArr.map(s => `${s.kod} – ${s.klartext}`).join(", ") : sniArr ?? null;
  const verksamhet = data?.verksamhetsbeskrivning?.beskrivning ?? null;
  const isActive = data?.verksamOrganisation?.kod === "JA";
  const form = data?.organisationsform?.klartext ?? "Aktiebolag";
  const konkurs = data?.pagaendeAvvecklingsEllerOmstruktureringsforfarande
    ?.pagaendeAvvecklingsEllerOmstruktureringsforfarandeLista?.[0]?.klartext ?? null;

  const arnStats = getArnStats(bolag[0]);

  return (
    <div className="detail-card">
      <div className="detail-header">
        <div className="detail-avatar">{initials(namn)}</div>
        <div className="detail-title-wrap">
          <h2 className="detail-company">{namn}</h2>
          <code className="detail-orgnr">{orgnr}</code>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flexShrink: 0 }}>
          <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
            {isActive ? "Aktiv" : "Avregistrerad"}
          </span>
          {konkurs && <span className="status-badge inactive">{konkurs}</span>}
        </div>
      </div>

      <div className="detail-grid">
        <Cell label="Bolagsform" value={form} />
        <Cell label="Säte" value={city} />
        <Cell label="Registrerad" value={regdatum} />
        <Cell label="Adress" value={`${street}, ${zip} ${city}`} />
        {sniText && <Cell label="Bransch (SNI)" value={sniText} span />}
        {verksamhet && <Cell label="Verksamhet" value={verksamhet} span />}
      </div>

      {/* ARN Section */}
      <div className="arn-section">
        <div className="arn-section-title">ARN-historik</div>

        {arnStats ? (
          <>
            <div className="flag-row" style={{ marginBottom: "1rem" }}>
              <div className={`flag flag-${arnStats.flaggArenden}`} title={arnStats.kontextArenden}>
                <div className="flag-dot" />
                <div>
                  <div className="flag-label">Ärenden hos ARN</div>
                  <div className="flag-context">{arnStats.kontextArenden}</div>
                </div>
              </div>
              <div className={`flag flag-${arnStats.flaggFalld}`} title={arnStats.kontextFalld}>
                <div className="flag-dot" />
                <div>
                  <div className="flag-label">Fälld av ARN</div>
                  <div className="flag-context">{arnStats.kontextFalld}</div>
                </div>
              </div>
              <div className={`flag flag-${arnStats.flaggFoljt}`} title={arnStats.kontextFoljt}>
                <div className="flag-dot" />
                <div>
                  <div className="flag-label">Följt ARN:s beslut</div>
                  <div className="flag-context">{arnStats.kontextFoljt}</div>
                </div>
              </div>
            </div>

            {/* Ärenden list */}
            <div className="arenden-list">
              {arnStats.arenden.map(a => (
                <div key={a.arendenr} className="arende-row">
                  <div className="arende-header" onClick={() => setOpenArende(openArende === a.arendenr ? null : a.arendenr)}>
                    <div className="arende-meta">
                      <span className="arende-nr">{a.arendenr}</span>
                      <span className="arende-datum">{a.datum_beslut}</span>
                      <span className="arende-vara">{a.vara_tjanst}</span>
                    </div>
                    <div className="arende-badges">
                      <span className={`arn-outcome outcome-${a.beslutskod === "Bifall" ? "bifall" : a.beslutskod === "Avslag" ? "avslag" : a.beslutskod === "Avvisat" ? "avvisat" : "delvis"}`}>
                        {a.beslutskod}
                      </span>
                      {(a.beslutskod === "Bifall" || a.beslutskod === "Delvis bifall") && (
                        <span className={`arn-foljt ${a.foljt_beslut ? "foljt-ja" : "foljt-nej"}`}>
                          {a.foljt_beslut ? "✓ Följt" : "✗ Ej följt"}
                        </span>
                      )}
                      <span className="arende-chevron">{openArende === a.arendenr ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {openArende === a.arendenr && (
                    <div className="arende-body">
                      <p className="arende-beskrivning">{a.beskrivning}</p>
                      {a.belopp_yrkat > 0 && (
                        <p className="arende-belopp">Yrkat belopp: {a.belopp_yrkat.toLocaleString("sv-SE")} kr</p>
                      )}
                      <div className="beslut-text">
                        <div className="beslut-text-label">Beslut (anonymiserat)</div>
                        <pre className="beslut-pre">{a.beslut_text}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="arn-placeholder">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.75" fill="currentColor"/>
              </svg>
              Inga registrerade ARN-ärenden för detta bolag.
            </div>
            <div className="flag-row">
              <div className="flag flag-gron"><div className="flag-dot" /><div><div className="flag-label">Ärenden hos ARN</div><div className="flag-context">Inga ärenden registrerade</div></div></div>
              <div className="flag flag-gron"><div className="flag-dot" /><div><div className="flag-label">Fälld av ARN</div><div className="flag-context">Inga prövade ärenden</div></div></div>
              <div className="flag flag-gron"><div className="flag-dot" /><div><div className="flag-label">Följt ARN:s beslut</div><div className="flag-context">Inga fällningar</div></div></div>
            </div>
          </>
        )}
      </div>

      <div className="detail-footer">
        <span className="footer-note">Data från Bolagsverket, SCB &amp; ARN · Värdefulla datamängder v1</span>
      </div>
    </div>
  );
}

function Cell({ label, value, span }) {
  return (
    <div className={`detail-cell${span ? " span" : ""}`}>
      <div className="cell-label">{label}</div>
      <div className="cell-value">{value || "—"}</div>
    </div>
  );
}
