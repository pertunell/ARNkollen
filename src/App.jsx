import { useState, useEffect, useRef, useCallback } from "react";

const BV_TOKEN_URL = "https://gw.api.bolagsverket.se/auth/realms/prod/protocol/openid-connect/token";
const BV_API_URL = "https://gw.api.bolagsverket.se/vardefulladatamangder/v1/organisationer/";
const CLIENT_ID = "lIclSqtjDit_jSjl5c7RtongaFIa";
const CLIENT_SECRET = "3n22pRi80yVBTqnYzqp_6fc0CfYa";

let cachedToken = null;
let tokenExpiry = 0;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await fetch(BV_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
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
  return res.json();
}

function fmtOrgnr(s) {
  const d = s.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 6)}-${d.slice(6)}`;
  return s;
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function App() {
  const [index, setIndex] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/bolag_index.json")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data) => setIndex(data))
      .catch((e) => setLoadError(e.message));
  }, []);

  useEffect(() => {
    if (!index || query.length < 2) { setHits([]); return; }
    const q = query.toLowerCase();
    const starts = [];
    const contains = [];
    for (let i = 0; i < index.length; i++) {
      const n = index[i][1].toLowerCase();
      if (n.startsWith(q)) starts.push(index[i]);
      else if (n.includes(q)) contains.push(index[i]);
      if (starts.length + contains.length >= 100) break;
    }
    const results = [...starts, ...contains].slice(0, 20);
    setHits(results);
    if (results.length === 1) selectBolag(results[0]);
  }, [query, index]);

  const selectBolag = useCallback(async (row) => {
    setSelected(row);
    setHits([]);
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
    setQuery("");
    setHits([]);
    setSelected(null);
    setDetail(null);
    setDetailError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const isLoading = !index && !loadError;

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
        <p className="hero-sub">
          Sök på ett bolagsnamn för att se Bolagsverkets registreringsinformation och ARN-historik.
        </p>

        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 16 16" fill="none" width="16" height="16">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder={
              isLoading ? "Laddar bolagsregister…" :
              loadError ? "Fel vid laddning" :
              "Skriv bolagsnamn, t.ex. Qualitypool eller Elgiganten…"
            }
            value={query}
            disabled={isLoading || !!loadError}
            onChange={(e) => { setSelected(null); setDetail(null); setQuery(e.target.value); }}
            autoFocus
          />
          {query && <button className="clear-btn" onClick={reset}>✕</button>}
        </div>

        {loadError && (
          <p className="load-error">Kunde inte ladda bolagsregistret: {loadError}</p>
        )}

        <p className="search-hint">
          {index ? `${index.length.toLocaleString("sv-SE")} aktiva aktiebolag tillgängliga` :
           isLoading ? "Laddar register…" : ""}
        </p>

        {hits.length > 1 && !selected && (
          <div className="dropdown">
            <div className="dropdown-label">
              {hits.length === 20 ? "20+ träffar — förfina sökningen" : `${hits.length} träffar`}
            </div>
            {hits.map((row) => (
              <div key={row[0]} className="dropdown-item" onClick={() => selectBolag(row)}>
                <div className="avatar">{initials(row[1])}</div>
                <div>
                  <div className="item-name">{row[1]}</div>
                  <div className="item-meta">{fmtOrgnr(row[0])} · {row[2]}</div>
                </div>
                <span className="item-arrow">›</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="trust-bar">
        <span className="trust-item"><span className="dot green" />Källa: Bolagsverket</span>
        <span className="trust-item"><span className="dot green" />Uppdateras veckovis</span>
        <span className="trust-item"><span className="dot green" />Öppna offentliga data</span>
      </div>

      {selected && (
        <section className="detail-section">
          {detailLoading && (
            <div className="loading-card">
              <div className="spinner" />
              Hämtar data från Bolagsverket…
            </div>
          )}
          {detailError && (
            <div className="error-card">
              <strong>Kunde inte hämta detaljdata</strong>
              <p>{detailError}</p>
              <p style={{ fontSize: "12px", marginTop: "8px", opacity: 0.7 }}>
                Bolagsverkets test-API kan ha CORS-begränsningar från Codespace.
              </p>
            </div>
          )}
          {detail && !detailLoading && <DetailCard bolag={selected} data={detail} />}
        </section>
      )}
    </div>
  );
}

function DetailCard({ bolag, data }) {
  const namn = data?.namn?.nyaSe?.[0]?.namn ?? bolag[1];
  const orgnr = fmtOrgnr(bolag[0]);
  const regdatum = data?.registreringsdatum ?? bolag[3] ?? "—";
  const adress = data?.besoksadress ?? data?.postadress ?? null;
  const city = adress?.postort ?? bolag[2] ?? "—";
  const street = adress?.adress ?? "—";
  const zip = adress?.postnummer ?? "—";
  const sni = data?.sniKoder?.[0] ?? null;
  const verksamhet = data?.verksamhetsbeskrivning ?? null;
  const isActive = !data?.avregistreringsdatum;
  const form = data?.juridiskForm?.beskrivning ?? "Aktiebolag";

  return (
    <div className="detail-card">
      <div className="detail-header">
        <div className="detail-avatar">{initials(namn)}</div>
        <div className="detail-title-wrap">
          <h2 className="detail-company">{namn}</h2>
          <code className="detail-orgnr">{orgnr}</code>
        </div>
        <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Aktiv" : "Avregistrerad"}
        </span>
      </div>

      <div className="detail-grid">
        <Cell label="Bolagsform" value={form} />
        <Cell label="Säte" value={city} />
        <Cell label="Registrerad" value={regdatum} />
        <Cell label="Adress" value={`${street}, ${zip} ${city}`} />
        {sni && <Cell label="SNI-kod" value={`${sni.kod} – ${sni.beskrivning ?? ""}`} span />}
        {verksamhet && <Cell label="Verksamhet" value={verksamhet} span />}
      </div>

      <div className="arn-section">
        <div className="arn-section-title">ARN-historik</div>
        <div className="arn-placeholder">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="0.75" fill="currentColor"/>
          </svg>
          ARN-data kopplas in i nästa steg — här visas ärenden, fällningar och efterlevnad.
        </div>
        <div className="flag-row">
          <div className="flag gray"><div className="flag-dot" />Ärenden: —</div>
          <div className="flag gray"><div className="flag-dot" />Fälld: —</div>
          <div className="flag gray"><div className="flag-dot" />Följt beslut: —</div>
        </div>
      </div>

      <div className="detail-footer">
        <span className="footer-note">Data från Bolagsverket · Värdefulla datamängder v1</span>
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
