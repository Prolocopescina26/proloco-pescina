"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Comunicazione = {
  id: number;
  titolo: string;
  testo: string;
  created_at: string;
};

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

const heroImages = [
  "/images/pescina-hero.jpg",
  "/images/pescina-centro.jpg",
  "/images/pescina-natura.jpg",
  "/images/pescina-evento.jpg",
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [comunicazioni, setComunicazioni] = useState<Comunicazione[]>([]);
  const [loadingComunicazioni, setLoadingComunicazioni] = useState(true);
  const [prossimiEventi, setProssimiEventi] = useState<Evento[]>([]);
  const [loadingEventi, setLoadingEventi] = useState(true);
  const [sociCount, setSociCount] = useState(24);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [loadingSoci, setLoadingSoci] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchComunicazioni = async () => {
      try {
        const res = await fetch("/api/comunicazioni");
        if (res.ok) {
          const data = await res.json();
          setComunicazioni(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComunicazioni(false);
      }
    };
    fetchComunicazioni();
    const interval = setInterval(fetchComunicazioni, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSoci = async () => {
      try {
        const res = await fetch("/data/soci.json?t=" + Date.now());
        if (res.ok) {
          const data = await res.json();
          const target = data.sociCount || 24;
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const step = target / steps;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setAnimatedCount(target);
              clearInterval(timer);
            } else {
              setAnimatedCount(Math.floor(start));
            }
          }, stepTime);
          setSociCount(target);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSoci(false);
      }
    };
    fetchSoci();
    const interval = setInterval(fetchSoci, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const res = await fetch("/api/eventi");
        if (res.ok) {
          const data = await res.json();
          const now = new Date();
          const oggiInizio = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const limite = new Date(oggiInizio);
          limite.setDate(limite.getDate() + 20);
          const futuri = (Array.isArray(data) ? data : []).filter((ev: Evento) => {
            const inizio = new Date(ev.data_evento);
            const fine = ev.data_fine ? new Date(ev.data_fine) : inizio;
            const fineGiorno = new Date(fine.getFullYear(), fine.getMonth(), fine.getDate());
            return fineGiorno >= oggiInizio && fineGiorno <= limite;
          }).sort((a, b) => new Date(a.data_evento).getTime() - new Date(b.data_evento).getTime());
          setProssimiEventi(futuri);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEventi(false);
      }
    };
    fetchEventi();
  }, []);

  const changeImage = () => {
    setActiveIndex((current) => (current + 1) % heroImages.length);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.page}>
        {/* SECTION HERO */}
        <section style={styles.hero}>
          <div style={styles.heroBackground} onClick={changeImage}>
            <motion.img
              key={heroImages[activeIndex]}
              src={heroImages[activeIndex]}
              alt="Borgo di Pescina"
              style={styles.heroImage}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div style={styles.heroOverlay} />
          
          <div style={styles.heroContent}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={styles.heroTag}>
              Pro Loco Pescina
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} style={styles.heroTitle}>
              Il borgo, gli eventi e le tradizioni che ti aspettano
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} style={styles.heroText}>
              Vivi un&apos;esperienza autentica tra natura, storia e iniziative locali. Trova news, documenti utili e tutti i contatti della Pro Loco.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} style={styles.heroButtons}>
              <Link href="/news" style={styles.primaryButton}>Scopri le news</Link>
              <Link href="/contatti" style={styles.secondaryButton}>Contattaci</Link>
            </motion.div>

            <div style={styles.dotsContainer}>
              {heroImages.map((image, index) => (
                <button key={image} type="button" onClick={() => setActiveIndex(index)} style={index === activeIndex ? { ...styles.dot, ...styles.dotActive } : styles.dot} aria-label={`Vai all'immagine ${index + 1}`} />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION STATISTICHE & INTRO */}
        <section style={styles.section}>
          <div style={styles.sociSectionGrid}>
            
            {/* Blocco Sinistro: Info Territorio */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={styles.sideStatsCard}>
              <span style={styles.sideStatsIcon}>⛰️</span>
              <span style={styles.sideStatsValue}>735 m</span>
              <span style={styles.sideStatsLabel}>Altitudine s.l.m.</span>
            </motion.div>

            {/* Blocco Centrale: Contatore Soci */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={styles.sociCard}>
              <span style={styles.sociValue}>{loadingSoci ? "..." : animatedCount}+</span>
              <span style={styles.sociLabel}>Soci attivi</span>
              <Link href="/diventasocio" style={styles.sociLinkSub}>Unisciti a noi →</Link>
            </motion.div>

            {/* Blocco Destro: Attrazioni/Cultura */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={styles.sideStatsCard}>
              <span style={styles.sideStatsIcon}>🏛️</span>
              <span style={styles.sideStatsValue}>2 Musei</span>
              <span style={styles.sideStatsLabel}>Patrimonio Silone e Mazzarino</span>
            </motion.div>

          </div>

          <div style={styles.sectionIntro}>
            <h2 style={styles.sectionTitle}>Una Pro Loco per visitatori e cittadini</h2>
            <p style={styles.sectionDescription}>
              Segui gli eventi più importanti, consulta i documenti ufficiali e resta aggiornato con le novità del territorio.
            </p>
          </div>

          <div style={styles.featureGrid}>
            <article style={styles.featureCard}>
              <span style={styles.cardAccent}>01</span>
              <h3 style={styles.cardTitle}>Eventi in evidenza</h3>
              <p style={styles.cardText}>Calendario, feste tradizionali e iniziative stagionali per vivere Pescina al meglio.</p>
            </article>

            <article style={styles.featureCard}>
              <span style={styles.cardAccent}>02</span>
              <h3 style={styles.cardTitle}>Documenti chiari</h3>
              <p style={styles.cardText}>Statuto, verbali e materiale utile per soci e pubblica amministrazione.</p>
            </article>

            <article style={styles.featureCard}>
              <span style={styles.cardAccent}>03</span>
              <h3 style={styles.cardTitle}>Contatti rapidi</h3>
              <p style={styles.cardText}>Email e numeri aggiornati per supporto turistico, segnalazioni e collaborazione.</p>
            </article>
          </div>
        </section>

        {/* SECTION COMUNICAZIONI */}
        <section style={styles.highlightSection}>
          <div style={styles.highlightHeader}>
            <h2 style={styles.sectionTitle}>Comunicazioni importanti</h2>
            <p style={styles.sectionDescription}>Le ultime notizie e avvisi ufficiali della Pro Loco, sempre in primo piano.</p>
          </div>

          {loadingComunicazioni ? (
            <p style={{ textAlign: "center", color: "#5c5346", padding: 40 }}>Caricamento comunicazioni...</p>
          ) : comunicazioni.length === 0 ? (
            <p style={{ textAlign: "center", color: "#5c5346", padding: 40 }}>Nessuna comunicazione importante al momento.</p>
          ) : (
            <div style={styles.highlightGrid}>
              {comunicazioni.map((com, index) => (
                <motion.article 
                  key={com.id} 
                  style={styles.comunicazioneCard} 
                  initial={{ opacity: 0, y: 30, scale: 0.97 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }} 
                  whileHover={{ y: -6, scale: 1.012, boxShadow: "0 24px 60px rgba(150, 115, 70, 0.15)" }}
                >
                  <div style={styles.comunicazioneHeader}>
                    <span style={styles.comunicazioneBadge}>📢</span>
                    <div style={styles.comunicazioneDate}>{com.created_at ? new Date(com.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }) : ""}</div>
                  </div>
                  <div style={styles.comunicazioneBody}>
                    <h3 style={styles.highlightTitle}>{com.titolo}</h3>
                    <p style={styles.highlightText}>{com.testo}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* SECTION CALL TO ACTION */}
        <section style={styles.ctaSection}>
          <div style={styles.ctaOverlay} />
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Vuoi far parte della Pro Loco?</h2>
            <p style={styles.ctaText}>Unisciti a noi per vivere Pescina da protagonista e scoprire tutte le attività in programma.</p>
            <div style={styles.ctaButtons}>
              <Link href="/diventasocio" style={styles.ctaPrimary}>Diventa socio</Link>
              <Link href="/contatti" style={styles.ctaSecondary}>Contattaci</Link>
            </div>
          </div>
        </section>

        {/* SECTION PROSSIMI EVENTI */}
        <section style={styles.sectionLight}>
          <div style={styles.newsHeader}>
            <h2 style={styles.sectionTitle}>Prossimi eventi</h2>
            <p style={styles.sectionDescription}>Gli appuntamenti in arrivo nei prossimi 20 giorni: non perdere le prossime iniziative della Pro Loco.</p>
          </div>

          {loadingEventi ? (
            <p style={{ textAlign: "center", color: "#5c5346", padding: 40 }}>Caricamento eventi...</p>
          ) : prossimiEventi.length === 0 ? (
            <p style={{ textAlign: "center", color: "#5c5346", padding: 40 }}>Nessun evento previsto nei primi 20 giorni.</p>
          ) : (
            <div style={styles.newsGrid}>
              {prossimiEventi.map((ev, index) => {
                const inizio = new Date(ev.data_evento);
                const fine = ev.data_fine ? new Date(ev.data_fine) : inizio;
                const isMultiDay = ev.data_fine && ev.data_fine !== ev.data_evento;
                return (
                  <motion.article key={ev.id} style={styles.newsCard} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                      <span style={styles.newsDate}>
                        {inizio.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}
                        {isMultiDay && (<span style={{ marginLeft: 8 }}>— {fine.toLocaleDateString("it-IT", { day: "numeric", month: "short" })}</span>)}
                      </span>
                      <span style={styles.eventBadge}>{ev.categoria}</span>
                    </div>
                    <h3 style={styles.newsTitle}>{ev.titolo}</h3>
                    {ev.descrizione && (<p style={styles.newsText}>{ev.descrizione}</p>)}
                    <Link href="/eventi" style={styles.newsLink}>Scopri di più</Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            
            {/* Colonna 1: Info Istituzionali e Dati Fiscali */}
            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Pro Loco Pescina</div>
              <p style={styles.socialText}>Promuoviamo il territorio, le tradizioni e la comunità di Pescina.</p>
              
              <div style={styles.legalFiscalBox}>
                <span style={styles.legalText}>Sede: Via S. Rinaldi, 1 - 67057 Pescina (AQ)</span>
                <span style={styles.legalText}>P. IVA: 01520550664</span>
                <span style={styles.legalText}>C.F.: 81006210660</span>
              </div>
            </div>

            {/* Colonna 2: Link Rapidi */}
            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Link rapidi</div>
              <Link href="/" style={styles.footerLink}>Home</Link>
              <Link href="/eventi" style={styles.footerLink}>Eventi</Link>
              <Link href="/documenti" style={styles.footerLink}>Documenti</Link>
              <Link href="/contatti" style={styles.footerLink}>Contatti</Link>
              <Link href="/privacy" style={styles.footerLink}>Privacy Policy</Link>
              <Link href="/cookie" style={styles.footerLink}>Cookie Policy</Link>
            </div>

            {/* Colonna 3: Contatti Diretti */}
            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Contatti</div>
              <p style={styles.socialText}>✉️ prolocopescina2026@gmail.com</p>
              <p style={styles.socialText}>✉️ PEC: proloco.pescina@pec.it</p>
              <p style={styles.socialText}>📞 Stefano: 320 861 6691</p>
              <p style={styles.socialText}>📞 Marco: 333 857 8429</p>
            </div>

            {/* Colonna 4: Social Network */}
            <div style={styles.footerColumn}>
              <div style={styles.footerTitle}>Seguici</div>
              <div style={styles.socialLinks}>
                <a href="https://www.instagram.com/proloco_pescina?igsh=MWF2MmR6YWczdnh1ZA==" target="_blank" rel="noreferrer" style={styles.instagramLink}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialIconSmall}>
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 11.37C16.1 12.16 15.84 12.95 15.29 13.5C14.74 14.05 13.95 14.31 13.16 14.21C12.37 14.1 11.63 13.79 11.03 13.2C10.43 12.61 10.12 11.86 10.01 11.08C9.91 10.29 10.17 9.5 10.72 8.95C11.27 8.4 12.06 8.14 12.85 8.25C13.64 8.36 14.38 8.67 14.98 9.26C15.58 9.85 15.89 10.59 16 11.37Z" fill="currentColor" />
                    <path d="M15.5 6.5H15.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Instagram
                </a>
                <a href="https://www.facebook.com/share/18aPPMVQ1N/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={styles.facebookLink}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialIconSmall}>
                    <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H12V14.5H9.5V11H12V8.7C12 6.21 13.57 4.5 16.05 4.5H18V8H16.05C15.38 8 15 8.36 15 9.03V11H18L17.5 14.5H15V22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z" fill="currentColor" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
            
            <img src="/images/logo-proloco.jpeg" alt="Logo Pro Loco" style={styles.footerLogoLarge} />
          </div>

          <div style={styles.footerCopy}>
            © {new Date().getFullYear()} Pro Loco Pescina — Tutti i diritti riservati.
          </div>
        </footer>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: { background: "#f7f4eb", minHeight: "100vh", width: "100%" },
  page: { background: "#f7f4eb", color: "#3a352d", width: "100%" },
  
  hero: { position: "relative", minHeight: "70vh", display: "grid", placeItems: "center", padding: "80px 24px", overflow: "hidden", background: "#1e332b" },
  heroBackground: { position: "absolute", inset: 0, zIndex: 0, cursor: "pointer" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26, 24, 21, 0.85) 0%, rgba(45, 74, 62, 0.4) 60%, rgba(0,0,0,0.1) 100%)", zIndex: 1 },
  
  heroContent: { position: "relative", zIndex: 2, maxWidth: 740, textAlign: "center", color: "white" },
  heroTag: { display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 20px", borderRadius: 999, background: "rgba(45, 74, 62, 0.8)", color: "#ffffff", fontWeight: 700, letterSpacing: "0.06em", fontSize: 12, textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  heroTitle: { fontSize: 48, lineHeight: 1.15, margin: 0, letterSpacing: "-0.02em", fontWeight: 800, textShadow: "0 4px 12px rgba(0,0,0,0.6)" },
  heroText: { margin: "20px auto 0", maxWidth: 580, fontSize: 18, lineHeight: 1.7, color: "#ffffff", fontWeight: 500, textShadow: "0 2px 8px rgba(0,0,0,0.6)" },
  heroButtons: { marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 },
  dotsContainer: { marginTop: 30, display: "flex", justifyContent: "center", gap: 10 },
  dot: { width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "background 0.25s ease" },
  dotActive: { background: "#ffffff", boxShadow: "0 0 0 4px rgba(255,255,255,0.3)" },
  
  primaryButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 26px", borderRadius: 999, background: "linear-gradient(135deg, #2d4a3e 0%, #967346 100%)", color: "white", textDecoration: "none", fontWeight: 700, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" },
  secondaryButton: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 26px", borderRadius: 999, background: "rgba(255,255,255,0.95)", color: "#2d4a3e", textDecoration: "none", fontWeight: 700, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)" },
  
  section: { padding: "80px 24px", maxWidth: 1200, margin: "0 auto" },
  sociSectionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, alignItems: "center", marginBottom: 60 },
  sociCard: { background: "#fffdf9", border: "1px solid rgba(150, 115, 70, 0.25)", borderRadius: 24, padding: "30px 40px", textAlign: "center", boxShadow: "0 20px 45px rgba(150, 115, 70, 0.08)", zIndex: 2 },
  sociValue: { display: "block", fontSize: 56, fontWeight: 800, color: "#2d4a3e", marginBottom: 4, letterSpacing: "-0.02em" },
  sociLabel: { display: "block", fontSize: 16, color: "#5c5346", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 },
  sociLinkSub: { display: "inline-block", fontSize: 14, color: "#967346", fontWeight: 700, textDecoration: "none", transition: "color 0.2s" },

  sideStatsCard: { background: "rgba(255, 253, 249, 0.6)", border: "1px dashed rgba(150, 115, 70, 0.2)", borderRadius: 20, padding: "30px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  sideStatsIcon: { fontSize: 28, marginBottom: 10, display: "block" },
  sideStatsValue: { display: "block", fontSize: 28, fontWeight: 700, color: "#2d2821", marginBottom: 4 },
  sideStatsLabel: { display: "block", fontSize: 13, color: "#7a6f5e", fontWeight: 600 },

  sectionIntro: { textAlign: "center", marginBottom: 40 },
  sectionTitle: { fontSize: 36, margin: "0 auto 18px", maxWidth: 780, color: "#2d2821", fontWeight: 700 },
  sectionDescription: { fontSize: 18, lineHeight: 1.8, color: "#5c5346", maxWidth: 720, margin: "0 auto" },
  featureGrid: { display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" },
  
  featureCard: { padding: 32, borderRadius: 24, background: "#fffdf9", border: "1px solid rgba(150, 115, 70, 0.1)", boxShadow: "0 16px 45px rgba(150, 115, 70, 0.06)", minHeight: 280 },
  cardAccent: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 16, background: "#2d4a3e", color: "white", fontWeight: 800, marginBottom: 18 },
  cardTitle: { margin: "0 0 14px", fontSize: 24, color: "#2d4a3e" },
  cardText: { fontSize: 16, lineHeight: 1.8, color: "#5c5346" },
  
  highlightSection: { padding: "60px 24px", maxWidth: 1200, margin: "0 auto", background: "transparent" },
  highlightHeader: { textAlign: "center", marginBottom: 30 },
  highlightGrid: { display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" },
  
  comunicazioneCard: { padding: 0, borderRadius: 22, background: "#fffdf9", border: "1px solid rgba(150, 115, 70, 0.18)", boxShadow: "0 12px 40px rgba(150, 115, 70, 0.05)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", borderLeft: "6px solid #967346" },
  comunicazioneHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 10px", borderBottom: "1px solid rgba(150, 115, 70, 0.08)", background: "linear-gradient(180deg, rgba(247, 244, 235, 0.4), rgba(255, 255, 255, 0))" },
  comunicazioneBody: { padding: "0 22px 22px", marginTop: 14 },
  comunicazioneBadge: { fontSize: 22, filter: "drop-shadow(0 4px 6px rgba(45,74,62,0.12))" },
  highlightTitle: { fontSize: 22, margin: "0 0 14px", color: "#2d2821", fontWeight: 700 },
  highlightText: { fontSize: 16, lineHeight: 1.85, color: "#5c5346" },
  comunicazioneDate: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#967346", padding: "5px 12px", borderRadius: 999, background: "rgba(150, 115, 70, 0.1)" },
  
  ctaSection: { position: "relative", padding: "100px 24px", backgroundImage: "linear-gradient(rgba(45, 74, 62, 0.65), rgba(39, 31, 22, 0.75)), url('/images/pescina-centro.jpg')", backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "white", marginTop: 60, borderRadius: 32, overflow: "hidden" },
  ctaOverlay: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45, 74, 62, 0.75), rgba(150, 115, 70, 0.65))", zIndex: 1 },
  ctaContent: { position: "relative", zIndex: 2, maxWidth: 720 },
  ctaTitle: { fontSize: 44, margin: "0 0 20px", fontWeight: 800, textShadow: "0 4px 10px rgba(0,0,0,0.4)" },
  ctaText: { fontSize: 18, lineHeight: 1.7, color: "#ffffff", maxWidth: 560, margin: "0 auto 28px", fontWeight: 500, textShadow: "0 2px 6px rgba(0,0,0,0.4)" },
  ctaButtons: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
  ctaPrimary: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 28px", borderRadius: 999, background: "#ffffff", color: "#2d4a3e", textDecoration: "none", fontWeight: 800, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  ctaSecondary: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 28px", borderRadius: 999, background: "transparent", color: "#ffffff", border: "2px solid rgba(255,255,255,0.9)", textDecoration: "none", fontWeight: 700 },
  
  sectionLight: { padding: "80px 24px", maxWidth: 1200, margin: "0 auto", background: "transparent" },
  newsHeader: { textAlign: "center", marginBottom: 40 },
  newsGrid: { display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" },
  
  newsCard: { padding: 28, borderRadius: 24, background: "#fffdf9", border: "1px solid rgba(150, 115, 70, 0.15)", boxShadow: "0 12px 35px rgba(150, 115, 70, 0.05)", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" },
  newsDate: { fontSize: 14, fontWeight: 700, color: "#967346", marginBottom: 16 },
  newsTitle: { fontSize: 22, margin: "0 0 14px", color: "#2d2821", fontWeight: 700 },
  newsText: { fontSize: 16, lineHeight: 1.8, color: "#5c5346", marginBottom: 20, flexGrow: 1 },
  newsLink: { color: "#2d4a3e", fontWeight: 700, textDecoration: "none" },
  eventBadge: { fontSize: 12, fontWeight: 700, color: "#2d4a3e", padding: "4px 10px", borderRadius: 999, background: "#f7f4eb", border: "1px solid rgba(45, 74, 62, 0.2)", textTransform: "uppercase", letterSpacing: "0.06em" },
  
  /* STILI FOOTER RESPONSIVI */
  footer: { 
    background: "#191714", 
    color: "#e2e8f0", 
    padding: "60px 24px 32px", 
    marginTop: 80,
    borderTop: "3px solid #967346" 
  },
  footerInner: { 
    maxWidth: 1200, 
    margin: "0 auto", 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
    gap: 32, 
    alignItems: "flex-start" 
  },
  footerColumn: { 
    display: "flex", 
    flexDirection: "column", 
    gap: 12 
  },
  footerTitle: { 
    fontWeight: 800, 
    color: "#fffdf9", 
    fontSize: 14, 
    textTransform: "uppercase", 
    letterSpacing: "0.08em", 
    marginBottom: 6,
    borderBottom: "1px solid rgba(150, 115, 70, 0.2)",
    paddingBottom: 6
  },
  footerLink: { 
    color: "rgba(255,255,255,0.75)", 
    textDecoration: "none", 
    fontSize: 14, 
    lineHeight: 1.6 
  },
  socialText: { 
    color: "rgba(255,255,255,0.75)", 
    fontSize: 14, 
    lineHeight: 1.6, 
    margin: 0 
  },
  legalFiscalBox: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "10px 14px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    border: "1px solid rgba(150, 115, 70, 0.15)"
  },
  legalText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.4
  },
  socialLinks: { 
    display: "flex", 
    flexDirection: "column", 
    gap: 10,
    width: "100%"
  },
  instagramLink: { 
    color: "#ffffff", 
    textDecoration: "none", 
    fontSize: 14, 
    display: "inline-flex", 
    alignItems: "center", 
    justifyContent: "flex-start",
    gap: 8, 
    padding: "8px 12px", 
    borderRadius: 10, 
    background: "rgba(225, 48, 108, 0.15)",
    border: "1px solid rgba(225, 48, 108, 0.25)",
    fontWeight: 600,
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    flexShrink: 0,
    overflow: "hidden"
  },
  facebookLink: { 
    color: "#ffffff", 
    textDecoration: "none", 
    fontSize: 14, 
    display: "inline-flex", 
    alignItems: "center", 
    justifyContent: "flex-start",
    gap: 8, 
    padding: "8px 12px", 
    borderRadius: 10, 
    background: "rgba(24, 119, 242, 0.15)",
    border: "1px solid rgba(24, 119, 242, 0.25)",
    fontWeight: 600,
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100%",
    flexShrink: 0,
    overflow: "hidden"
  },
  socialIconSmall: { 
    width: 16, 
    height: 16,
    flexShrink: 0
  },
  footerLogoLarge: { 
    height: 80, 
    width: 80, 
    objectFit: "contain", 
    borderRadius: "50%", 
    alignSelf: "flex-start",
    border: "2px solid #967346"
  },
  footerCopy: { 
    maxWidth: 1200, 
    margin: "40px auto 0", 
    paddingTop: 20, 
    borderTop: "1px solid rgba(255,255,255,0.08)", 
    fontSize: 13, 
    color: "rgba(255,255,255,0.4)", 
    textAlign: "center" 
  }
};