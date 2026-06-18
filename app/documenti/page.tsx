"use client";

import { useEffect, useState } from "react";

type Documento = {
  id: number;
  titolo: string;
  descrizione: string | null;
  categoria: string;
  file_url: string;
};

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28, color: "#2d4a3e" }}>
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" opacity="0.1" />
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 14, height: 14 }}>
      <path d="M12 15V3M12 15L8 11M12 15L16 11M2 17V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DocumentiPage() {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/documenti", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setDocs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Raggruppamento per categoria
  const grouped = docs.reduce((acc: Record<string, Documento[]>, doc: Documento) => {
    const cat = doc.categoria || "Generale";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();
  const activeCategory = selectedCategory || categories[0];
  const activeDocuments = grouped[activeCategory] || [];

  // Mappatura cromatica coerente con la palette istituzionale/territoriale
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Verbali": "#967346",      // Oro Antico
      "Avvisi": "#b85c37",       // Terra d'Otranto / Mattone lucido
      "Eventi": "#2d4a3e",       // Verde Bosco
      "Regolamenti": "#4a6b5d",  // Verde Salvia Scuro
      "Comunicati": "#6e7e65",   // Verde Oliva Desaturato
      "Rendiconti": "#7c6a52",   // Fango / Corda Scuro
      "Bilanci": "#1e332b",      // Verde Notte profondità
      "Generale": "#5c5346",     // Grigio Caldo / Pietra
    };
    return colors[category] || "#2d4a3e";
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroTag}>Trasparenza e Comunità</span>
          <h1 style={styles.heroTitle}>Centro Documenti</h1>
          <p style={styles.heroSub}>
            Accedi e scarica agevolmente tutti gli atti ufficiali, i verbali e le pubblicazioni della Pro Loco Pescina.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={styles.container}>
        {loading ? (
          <div style={styles.centeredState}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Caricamento archivio documenti...</p>
          </div>
        ) : docs.length === 0 ? (
          <div style={styles.centeredState}>
            <span style={styles.stateIcon}>📭</span>
            <p style={styles.stateText}>Nessun documento disponibile al momento.</p>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div style={styles.tabsContainer}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const catColor = getCategoryColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      ...styles.tabButton,
                      background: isActive ? "#2d4a3e" : "#fffdf9",
                      color: isActive ? "#ffffff" : "#5c5346",
                      borderColor: isActive ? "#2d4a3e" : "rgba(150, 115, 70, 0.15)",
                      borderLeft: isActive ? `4px solid ${catColor}` : "1px solid rgba(150, 115, 70, 0.15)",
                      fontWeight: isActive ? 700 : 500,
                      boxShadow: isActive ? "0 6px 15px rgba(45, 74, 62, 0.15)" : "none",
                    }}
                  >
                    <span style={{
                      ...styles.tabCounter,
                      background: isActive ? "rgba(255,255,255,0.2)" : "rgba(150, 115, 70, 0.1)",
                      color: isActive ? "#ffffff" : catColor
                    }}>
                      {grouped[cat].length}
                    </span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Documents Grid */}
            <div style={styles.grid}>
              {activeDocuments.length === 0 ? (
                <div style={styles.noDocsContainer}>
                  Nessun documento pubblicato in questa categoria.
                </div>
              ) : (
                activeDocuments.map((doc: Documento) => (
                  <div key={doc.id} style={styles.card}>
                    <div style={styles.cardIcon}>
                      <FileIcon />
                    </div>

                    <div style={styles.cardContent}>
                      <h3 style={styles.cardTitle}>{doc.titolo}</h3>

                      {doc.descrizione && (
                        <p style={styles.cardDesc}>{doc.descrizione}</p>
                      )}

                      <div style={styles.cardFooter}>
                        <span
                          style={{
                            ...styles.categoryBadge,
                            background: `${getCategoryColor(activeCategory)}12`, // Alpha opacity 7% circa
                            color: getCategoryColor(activeCategory),
                            border: `1px solid ${getCategoryColor(activeCategory)}30`,
                          }}
                        >
                          {activeCategory}
                        </span>

                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.downloadButton}
                        >
                          <DownloadIcon /> Scarica
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ========== STYLES ==========

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#f7f4eb",
    backgroundColor: "#f7f4eb",
    color: "#3a352d",
    minHeight: "100vh",
    width: "100%",
  },
  hero: {
    position: "relative",
    minHeight: "40vh",
    display: "grid",
    placeItems: "center",
    padding: "60px 24px",
    overflow: "hidden",
    background: "#1e332b",
    textAlign: "center",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(45, 74, 62, 0.95) 0%, rgba(26, 24, 21, 0.9) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 750,
    color: "white",
  },
  heroTag: {
    display: "inline-flex",
    marginBottom: 16,
    padding: "8px 18px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.85)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: "0.08em",
    fontSize: 11,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 44,
    lineHeight: 1.15,
    margin: 0,
    letterSpacing: "-0.02em",
    fontWeight: 800,
    textShadow: "0 3px 10px rgba(0,0,0,0.3)",
  },
  heroSub: {
    margin: "16px auto 0",
    maxWidth: 600,
    fontSize: 17,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.9)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "50px 24px 100px",
  },
  tabsContainer: {
    display: "flex",
    gap: 10,
    marginBottom: 40,
    overflowX: "auto",
    paddingBottom: 10,
    WebkitOverflowScrolling: "touch",
  },
  tabButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    borderTop: "1px solid rgba(150, 115, 70, 0.15)",
    borderRight: "1px solid rgba(150, 115, 70, 0.15)",
    borderBottom: "1px solid rgba(150, 115, 70, 0.15)",
    borderRadius: 14,
    cursor: "pointer",
    fontSize: 14,
    whiteSpace: "nowrap",
    transition: "all 0.25s ease",
  },
  tabCounter: {
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 6,
    display: "inline-block",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 28,
  },
  card: {
    background: "#fffdf9",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    background: "rgba(45, 74, 62, 0.06)",
    borderRadius: 14,
    marginBottom: 18,
  },
  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#2d4a3e",
    margin: "0 0 10px 0",
    lineHeight: 1.35,
  },
  cardDesc: {
    fontSize: 14,
    color: "#5c5346",
    margin: "0 0 20px 0",
    lineHeight: 1.6,
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: "auto",
    paddingTop: 16,
    borderTop: "1px solid rgba(150, 115, 70, 0.1)",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  downloadButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    background: "#967346",
    color: "#ffffff",
    borderRadius: 12,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 700,
    transition: "background 0.2s ease, transform 0.2s ease",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(150, 115, 70, 0.15)",
  },
  noDocsContainer: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px",
    color: "#8a7e6d",
    fontSize: 15,
    fontStyle: "italic",
  },
  centeredState: {
    textAlign: "center",
    padding: "80px 24px",
    background: "#fffdf9",
    borderRadius: 24,
    border: "1px solid rgba(150, 115, 70, 0.15)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
  },
  stateIcon: {
    fontSize: 48,
    display: "block",
    marginBottom: 16,
  },
  stateText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#5c5346",
    margin: 0,
  },
  spinner: {
    width: 32,
    height: 32,
    border: "3px solid rgba(150, 115, 70, 0.15)",
    borderTopColor: "#2d4a3e",
    borderRadius: "50%",
    margin: "0 auto 16px",
    animation: "spin 1s linear infinite",
  },
};