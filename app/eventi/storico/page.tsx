"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Evento = {
  id: number;
  titolo: string;
  descrizione: string | null;
  data_evento: string;
  data_fine?: string | null;
  categoria: string;
  luogo?: string | null;
  created_at: string | null;
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16, marginRight: 6, color: "#967346" }}>
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4Z" fill="currentColor" opacity="0.1" />
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 14H16.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16, marginRight: 6, color: "#2d4a3e" }}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StoricoPage() {
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const res = await fetch("/api/eventi");
        if (res.ok) {
          const data = await res.json();
          const now = new Date();
          const oggi = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const passati = (Array.isArray(data) ? data : []).filter((ev: Evento) => {
            const inizio = new Date(ev.data_evento);
            const fine = ev.data_fine ? new Date(ev.data_fine) : inizio;
            return oggi > fine;
          }).sort((a, b) => {
            const fineA = a.data_fine ? new Date(a.data_fine).getTime() : new Date(a.data_evento).getTime();
            const fineB = b.data_fine ? new Date(b.data_fine).getTime() : new Date(b.data_evento).getTime();
            return fineB - fineA;
          });
          setEventi(passati);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventi();
  }, []);

  return (
    <div style={styles.page}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
            Pro Loco Pescina
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
            Archivio Eventi
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} style={styles.heroText}>
            Ripercorri i momenti, le feste e le iniziative culturali che hanno animato e valorizzato il nostro territorio.
          </motion.p>
        </div>
      </section>

      {/* ARCHIVIO GRID / EMPTY STATE */}
      <section style={styles.section}>
        {loading ? (
          <div style={styles.emptyState}>
            <div style={styles.spinner} />
            <p style={styles.emptyText}>Caricamento archivio...</p>
          </div>
        ) : eventi.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📂</span>
            <p style={styles.emptyText}>Nessun evento passato disponibile.</p>
            <p style={styles.emptySubtext}>Gli eventi conclusi appariranno in questo registro automaticamente.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {eventi.map((ev, index) => {
              const inizio = new Date(ev.data_evento);
              const fine = ev.data_fine ? new Date(ev.data_fine) : inizio;
              const isMultiDay = ev.data_fine && ev.data_fine !== ev.data_evento;

              return (
                <motion.article
                  key={ev.id}
                  style={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -6, boxShadow: "0 22px 50px rgba(45, 74, 62, 0.08)" }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.dateBlockWrapper}>
                      <div style={styles.dateBlock}>
                        <span style={styles.dateDay}>{inizio.getDate()}</span>
                        <span style={styles.dateMonth}>
                          {inizio.toLocaleDateString("it-IT", { month: "short" })}
                        </span>
                      </div>
                      {isMultiDay && (
                        <div style={styles.durationBadge}>
                          <span style={styles.durationArrow}>→</span>
                          <div style={{ ...styles.dateBlock, background: "#967346" }}>
                            <span style={styles.dateDay}>{fine.getDate()}</span>
                            <span style={styles.dateMonth}>
                              {fine.toLocaleDateString("it-IT", { month: "short" })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span style={styles.categoryBadge}>{ev.categoria}</span>
                  </div>

                  <div style={styles.cardBody}>
                    <h2 style={styles.cardTitle}>{ev.titolo}</h2>
                    {ev.descrizione && <p style={styles.cardText}>{ev.descrizione}</p>}
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.dateRange}>
                      <CalendarIcon /> {inizio.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                      {isMultiDay && (
                        <span> — {fine.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</span>
                      )}
                    </div>
                    {ev.luogo && (
                      <div style={styles.locationText}><PinIcon /> {ev.luogo}</div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

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
    textAlign: "center",
    color: "white",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    padding: "10px 20px",
    borderRadius: 999,
    background: "rgba(150, 115, 70, 0.85)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: "0.06em",
    fontSize: 12,
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
    maxWidth: 640,
    fontSize: 17,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
  },
  section: {
    padding: "60px 24px 100px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gap: 28,
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  },
  card: {
    background: "#fffdf9",
    borderRadius: 24,
    border: "1px solid rgba(150, 115, 70, 0.16)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 24px 16px",
    background: "linear-gradient(180deg, rgba(150, 115, 70, 0.04) 0%, #fffdf9 100%)",
    borderBottom: "1px solid rgba(150, 115, 70, 0.1)",
    gap: 12,
  },
  dateBlockWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dateBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#2d4a3e",
    color: "white",
    borderRadius: 12,
    padding: "8px 12px",
    minWidth: 52,
    boxShadow: "0 4px 12px rgba(45, 74, 62, 0.15)",
  },
  dateDay: {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 1,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    opacity: 0.9,
    marginTop: 2,
  },
  durationBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  durationArrow: {
    color: "#967346",
    fontWeight: 700,
    fontSize: 14,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: 700,
    color: "#967346",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#fffdf9",
    border: "1px solid rgba(150, 115, 70, 0.25)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  cardBody: {
    padding: "20px 24px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  cardTitle: {
    margin: 0,
    fontSize: 21,
    color: "#2d4a3e",
    fontWeight: 800,
    lineHeight: 1.25,
  },
  cardText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.65,
    color: "#5c5346",
    flexGrow: 1,
  },
  cardFooter: {
    padding: "18px 24px",
    borderTop: "1px solid rgba(150, 115, 70, 0.1)",
    background: "rgba(150, 115, 70, 0.02)",
  },
  dateRange: {
    fontSize: 13,
    color: "#8a7e6d",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#2d4a3e",
    fontWeight: 600,
    marginTop: 6,
    display: "flex",
    alignItems: "center",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 24px",
    background: "#fffdf9",
    borderRadius: 24,
    border: "1px solid rgba(150, 115, 70, 0.15)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
  },
  emptyIcon: {
    fontSize: 54,
    display: "block",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 19,
    fontWeight: 700,
    color: "#2d4a3e",
    margin: "0 0 6px",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#5c5346",
    margin: 0,
  },
  spinner: {
    width: 36,
    height: 36,
    border: "3px solid rgba(150, 115, 70, 0.15)",
    borderTopColor: "#2d4a3e",
    borderRadius: "50%",
    margin: "0 auto 16px",
    animation: "spin 1s linear infinite",
  },
};