"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Comunicazione = {
  id: number;
  titolo: string;
  testo: string;
  created_at: string;
  immagine?: string | null;
};

export default function NewsPage() {
  const [items, setItems] = useState<Comunicazione[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComunicazioni = async () => {
      try {
        const res = await fetch("/api/comunicazioni");
        if (res.ok) {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComunicazioni();
  }, []);

  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            Informatica Territoriale
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
            Ultime Notizie e Comunicazioni
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} style={styles.heroText}>
            Approfondimenti, avvisi istituzionali e iniziative culturali direttamente dal cuore del nostro territorio.
          </motion.p>
        </div>
      </section>

      {/* NEWS GRID SECTION */}
      <section style={styles.section}>
        {loading ? (
          <div style={styles.centeredState}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Caricamento aggiornamenti...</p>
          </div>
        ) : items.length === 0 ? (
          <div style={styles.centeredState}>
            <p style={styles.stateText}>Nessuna comunicazione disponibile al momento.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                style={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 22px 50px rgba(45, 74, 62, 0.08)" }}
              >
                {/* Immagine di copertina opzionale */}
                {item.immagine && (
                  <div style={{ ...styles.cardImageContainer, backgroundImage: `url(${item.immagine})` }} />
                )}
                
                <div style={styles.cardBody}>
                  <span style={styles.cardDate}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : ""}
                  </span>
                  <h2 style={styles.cardTitle}>{item.titolo}</h2>
                  <p style={styles.cardText}>{item.testo}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
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
    minHeight: "45vh",
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
    marginBottom: 20,
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
  heroText: {
    margin: "18px auto 0",
    maxWidth: 620,
    fontSize: 17,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.9)",
  },
  section: {
    padding: "60px 24px 100px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gap: 30,
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  },
  card: {
    background: "#fffdf9",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    display: "flex",
    flexDirection: "column",
    minHeight: 280,
    position: "relative",
  },
  cardImageContainer: {
    height: 180,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottom: "1px solid rgba(150, 115, 70, 0.12)",
  },
  cardBody: {
    padding: "24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cardDate: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#967346",
    padding: "4px 12px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.08)",
    alignSelf: "flex-start",
    border: "1px solid rgba(150, 115, 70, 0.15)",
  },
  cardTitle: {
    margin: 0,
    fontSize: 22,
    color: "#2d4a3e",
    fontWeight: 800,
    lineHeight: 1.3,
  },
  cardText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.65,
    color: "#5c5346",
    flex: 1,
  },
  centeredState: {
    textAlign: "center",
    padding: "80px 24px",
    background: "#fffdf9",
    borderRadius: 24,
    border: "1px solid rgba(150, 115, 70, 0.15)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
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