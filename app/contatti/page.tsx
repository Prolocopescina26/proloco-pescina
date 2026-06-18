"use client";

import React from "react";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.cardIcon}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.cardIcon}>
      <path d="M19 3H5C3.9 3 3 3.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 3.9 20.1 3 19 3ZM14 7H18V9H14V7ZM14 11H18V13H14V11ZM6 7H11V13H6V7ZM19 17H5V15H19V17Z" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.cardIcon}>
      <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.cardIcon}>
      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4.01 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24, color: "#967346" }}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor" />
    </svg>
  );
}

export default function ContattiPage() {
  return (
    <div style={styles.page}>
      {/* Hero Header */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.overline}>Relazioni con il Pubblico</span>
          <h1 style={styles.title}>Contatti</h1>
          <p style={styles.intro}>
            Hai domande sulle nostre iniziative, proposte culturali o desideri tesserarti alla Pro Loco? 
            Il nostro team è a tua completa disposizione.
          </p>
        </div>
      </section>

      {/* Grid Principale Contatti */}
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Sede */}
          <div style={styles.card}>
            <LocationIcon />
            <h2 style={styles.cardTitle}>Sede Legale</h2>
            <p style={styles.cardText}>Via S. Rinaldi, 1</p>
            <p style={styles.cardTextBold}>67057 PESCINA (AQ)</p>
          </div>

          {/* Dati Fiscali */}
          <div style={styles.card}>
            <TaxIcon />
            <h2 style={styles.cardTitle}>Dati Fiscali</h2>
            <div style={styles.taxContainer}>
              <p style={styles.taxText}><strong>P. IVA:</strong> 01520550664</p>
              <p style={styles.taxText}><strong>C.F.:</strong> 81006210660</p>
              <p style={styles.taxText}><strong>Codice SDI:</strong> 0000000</p>
            </div>
          </div>

          {/* Telefono */}
          <div style={styles.card}>
            <PhoneIcon />
            <h2 style={styles.cardTitle}>Contatti Telefonici</h2>
            <div style={styles.phoneList}>
              <a href="tel:3208616691" style={styles.phoneItem}>
                <span style={styles.phoneName}>Stefano</span>
                <span style={styles.phoneNumber}>320 861 6691</span>
              </a>
              <a href="tel:3338578429" style={styles.phoneItem}>
                <span style={styles.phoneName}>Marco</span>
                <span style={styles.phoneNumber}>333 857 8429</span>
              </a>
            </div>
          </div>

          {/* Email & PEC */}
          <div style={styles.card}>
            <EmailIcon />
            <h2 style={styles.cardTitle}>Canali Digitali</h2>
            <div style={styles.emailContainer}>
              <span style={styles.emailLabel}>Email Istituzionale:</span>
              <a href="mailto:prolocopescina2026@gmail.com" style={styles.mailLink}>
                prolocopescina2026@gmail.com
              </a>
              
              <span style={{ ...styles.emailLabel, marginTop: 12 }}>PEC (Posta Certificata):</span>
              <a href="mailto:proloco.pescina@pec.it" style={styles.pecLink}>
                proloco.pescina@pec.it
              </a>
            </div>
          </div>
        </div>

        {/* Orari e Social Layout */}
        <div style={styles.bottomSection}>
          {/* Orari */}
          <div style={styles.cardLarge}>
            <div style={styles.clockHeader}>
              <ClockIcon />
              <h2 style={{ ...styles.cardTitle, margin: 0 }}>Orari di Apertura</h2>
            </div>
            <div style={styles.hoursGrid}>
              <div style={styles.hoursRow}>
                <span style={styles.dayLabel}>Lunedì - Venerdì</span>
                <span style={styles.hoursValue}>09:00 — 13:00</span>
              </div>
              <div style={styles.hoursRow}>
                <span style={styles.dayLabel}>Sabato</span>
                <span style={styles.hoursValue}>10:00 — 13:00</span>
              </div>
              <div style={styles.hoursRow}>
                <span style={styles.dayLabel}>Domenica</span>
                <span style={styles.hoursValueClose}>Chiuso</span>
              </div>
            </div>
          </div>

          {/* Social Network */}
          <div style={styles.socialSection}>
            <h2 style={{ ...styles.cardTitle, color: "#fffdf9" }}>Seguici sui canali Social</h2>
            <p style={styles.socialText}>
              Resta sempre aggiornato in tempo reale sulle manifestazioni, i bandi storici e i cammini del nostro territorio.
            </p>

            <div style={styles.socialButtons}>
              <a
                href="https://www.instagram.com/proloco_pescina?igsh=MWF2MmR6YWczdnh1ZA=="
                target="_blank"
                rel="noreferrer"
                style={styles.instagramButton}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialIcon}>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37C16.1 12.16 15.84 12.95 15.29 13.5C14.74 14.05 13.95 14.31 13.16 14.21C12.37 14.1 11.63 13.79 11.03 13.2C10.43 12.61 10.12 11.86 10.01 11.08C9.91 10.29 10.17 9.5 10.72 8.95C11.27 8.4 12.06 8.14 12.85 8.25C13.64 8.36 14.38 8.67 14.98 9.26C15.58 9.85 15.89 10.59 16 11.37Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                Instagram
              </a>

              <a
                href="https://www.facebook.com/share/18aPPMVQ1N/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                style={styles.facebookButton}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.socialIcon}>
                  <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H12V14.5H9.5V11H12V8.7C12 6.21 13.57 4.5 16.05 4.5H18V8H16.05C15.38 8 15 8.36 15 9.03V11H18L17.5 14.5H15V22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z" fill="currentColor" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
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
    paddingBottom: 80,
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
    marginBottom: 50,
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
  overline: {
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
  title: {
    fontSize: 44,
    lineHeight: 1.15,
    margin: "0 0 16px 0",
    letterSpacing: "-0.02em",
    fontWeight: 800,
    textShadow: "0 3px 10px rgba(0,0,0,0.3)",
  },
  intro: {
    margin: "0 auto",
    maxWidth: 640,
    fontSize: 17,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.9)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
    marginBottom: 32,
  },
  card: {
    background: "#fffdf9",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardIcon: {
    width: 32,
    height: 32,
    color: "#967346",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#2d4a3e",
    margin: "0 0 14px 0",
    letterSpacing: "-0.01em",
  },
  cardText: {
    fontSize: 15,
    color: "#5c5346",
    lineHeight: 1.6,
    margin: 0,
  },
  cardTextBold: {
    fontSize: 16,
    fontWeight: 700,
    color: "#2d4a3e",
    margin: "4px 0 0 0",
  },
  taxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
  },
  taxText: {
    fontSize: 14,
    color: "#5c5346",
    margin: 0,
    borderBottom: "1px solid rgba(150, 115, 70, 0.08)",
    paddingBottom: 4,
  },
  phoneList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  phoneItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 14,
    background: "rgba(150, 115, 70, 0.06)",
    border: "1px solid rgba(150, 115, 70, 0.12)",
    textDecoration: "none",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  phoneName: {
    fontSize: 12,
    fontWeight: 700,
    color: "#967346",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: 700,
    color: "#2d4a3e",
    marginTop: 2,
  },
  emailContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  emailLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#5c5346",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: "0.02em",
  },
  mailLink: {
    fontSize: 14,
    fontWeight: 700,
    color: "#2d4a3e",
    textDecoration: "none",
    wordBreak: "break-all",
    background: "rgba(45, 74, 62, 0.06)",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(45, 74, 62, 0.1)",
  },
  pecLink: {
    fontSize: 14,
    fontWeight: 700,
    color: "#967346",
    textDecoration: "none",
    wordBreak: "break-all",
    background: "rgba(150, 115, 70, 0.06)",
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(150, 115, 70, 0.1)",
  },
  bottomSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: 24,
    alignItems: "stretch",
    breakInside: "avoid",
    (WebkitBreakInside as any): "avoid",
  },
  cardLarge: {
    background: "#fffdf9",
    borderRadius: 24,
    padding: 32,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  clockHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: "1px solid rgba(150, 115, 70, 0.12)",
    paddingBottom: 14,
  },
  hoursGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  hoursRow: {
    display: "flex",
    justifyContent: "span-between",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 15,
  },
  dayLabel: {
    fontWeight: 600,
    color: "#5c5346",
  },
  hoursValue: {
    fontWeight: 700,
    color: "#2d4a3e",
  },
  hoursValueClose: {
    fontWeight: 700,
    color: "#b85c37",
    textTransform: "uppercase",
    fontSize: 13,
    letterSpacing: "0.02em",
  },
  socialSection: {
    background: "#2d4a3e",
    borderRadius: 24,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 12px 35px rgba(45, 74, 62, 0.15)",
  },
  socialText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 1.6,
    margin: "0 0 24px 0",
  },
  socialButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
  },
  instagramButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 22px",
    borderRadius: 14,
    background: "#967346",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    transition: "transform 0.2s ease, background-color 0.2s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  facebookButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 22px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  socialIcon: {
    width: 18,
    height: 18,
  },
};