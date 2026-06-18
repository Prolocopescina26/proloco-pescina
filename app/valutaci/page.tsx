"use client";

import React, { useState } from "react";

export default function ValutaciPage() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const tags = [
    "Eventi",
    "Accoglienza",
    "Informazioni",
    "Natura",
    "Tradizioni",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  };

  const handleSubmit = async () => {
    if (!rating) {
      alert("Seleziona una valutazione prima di inviare.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          tags: selectedTags,
          comment,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore invio feedback");
      }

      setSubmitted(true);
      setRating(0);
      setComment("");
      setSelectedTags([]);
    } catch (error) {
      console.error(error);
      alert("Errore nell'invio del feedback. Riprova più tardi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Hero Header */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.overline}>Ascolto Attivo</span>
          <h1 style={styles.title}>Aiutaci a migliorare la Pro Loco</h1>
          <p style={styles.intro}>
            Raccontaci la tua esperienza nel nostro borgo. Il tuo punto di vista ci guida nella 
            valorizzazione del territorio e nella cura delle prossime iniziative culturali.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section style={styles.grid}>
        <div style={styles.infoCard}>
          <div style={styles.infoContent}>
            <div>
              <span style={styles.cardOverline}>Il valore del tuo tempo</span>
              <h2 style={styles.cardTitle}>Perché la tua opinione conta</h2>
            </div>
            <p style={styles.infoParagraph}>
              Ogni segnalazione viene letta dal direttivo per orientare lo sviluppo della comunità:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Ottimizzazione dei flussi turistici e logistica</li>
              <li style={styles.listItem}>Innalzamento qualitativo degli eventi e delle sagre</li>
              <li style={styles.listItem}>Trasparenza e capillarità della comunicazione istituzionale</li>
            </ul>
          </div>
        </div>

        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Lascia il tuo feedback</h2>

          {/* Star Selector */}
          <div style={styles.ratingRow}>
            <span style={styles.ratingLabel}>Valutazione complessiva:</span>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((value) => {
                const isSingleActive = value <= rating;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    style={{
                      ...styles.star,
                      background: isSingleActive ? "#967346" : "rgba(150, 115, 70, 0.1)",
                      color: isSingleActive ? "#ffffff" : "#967346",
                      transform: isSingleActive ? "scale(1.05)" : "scale(1)",
                    }}
                    aria-label={`Valuta ${value} stelle su 5`}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Selector */}
          <div style={styles.tagSection}>
            <span style={styles.inputLabel}>Cosa ha riguardato la tua esperienza?</span>
            <div style={styles.tagList}>
              {tags.map((tag) => {
                const isTagActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    style={{
                      ...styles.tag,
                      background: isTagActive ? "#2d4a3e" : "#fffdf9",
                      borderColor: isTagActive ? "#2d4a3e" : "rgba(150, 115, 70, 0.25)",
                      color: isTagActive ? "#ffffff" : "#5c5346",
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment Textarea */}
          <div style={styles.inputGroup}>
            <label htmlFor="feedback-comment" style={styles.inputLabel}>
              Le tue impressioni o suggerimenti
            </label>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Scrivi qui cosa ti è piaciuto o cosa possiamo migliorare..."
              style={styles.textarea}
            />
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              ...styles.submitButton,
              backgroundColor: submitting ? "#5c5346" : "#2d4a3e",
            }}
          >
            {submitting ? "Invio in corso..." : "Invia la valutazione"}
          </button>

          {submitted && (
            <div style={styles.successBox}>
              <strong>Ricevuto con successo.</strong> Grazie per aver contribuito alla crescita della nostra comunità!
            </div>
          )}
        </div>
      </section>

      {/* Deep-dive Categories Section */}
      <section style={styles.benefitsSection}>
        <h2 style={styles.sectionTitle}>Ambiti di intervento</h2>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>📅</div>
            <strong style={styles.benefitName}>Palinsesto Eventi</strong>
            <p style={styles.benefitText}>Pertinenza delle rassegne culturali, logistica ed efficienza organizzativa.</p>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>🏡</div>
            <strong style={styles.benefitName}>Accoglienza Borgo</strong>
            <p style={styles.benefitText}>Qualità dei punti informativi, ospitalità e accessibilità dei siti storici.</p>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>📢</div>
            <strong style={styles.benefitName}>Canali Digitali</strong>
            <p style={styles.benefitText}>Chiarezza del sito web, tempestività sui social network e materiale cartaceo.</p>
          </div>
        </div>
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
    padding: "0 0 80px 0",
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
  grid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    maxWidth: 1200,
    margin: "0 auto 60px",
    padding: "0 24px",
  },
  infoCard: {
    background: "#fffdf9",
    borderRadius: 24,
    padding: 40,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  infoContent: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  cardOverline: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#967346",
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1.2,
    color: "#2d4a3e",
    margin: "4px 0 0 0",
  },
  infoParagraph: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#5c5346",
    margin: 0,
  },
  list: {
    paddingLeft: 20,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 1.5,
    color: "#3a352d",
    fontWeight: 500,
  },
  formCard: {
    background: "#fffdf9",
    borderRadius: 24,
    padding: 40,
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    border: "1px solid rgba(150, 115, 70, 0.16)",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#2d4a3e",
    margin: "0 0 24px 0",
  },
  ratingRow: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },
  ratingLabel: {
    fontWeight: 700,
    fontSize: 14,
    color: "#5c5346",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
  stars: {
    display: "flex",
    gap: 8,
  },
  star: {
    border: "none",
    borderRadius: 12,
    width: 48,
    height: 48,
    fontSize: 20,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    display: "grid",
    placeItems: "center",
  },
  tagSection: {
    marginBottom: 24,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  tag: {
    padding: "10px 18px",
    borderRadius: 14,
    border: "1px solid",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 26,
  },
  inputLabel: {
    fontWeight: 700,
    fontSize: 14,
    color: "#5c5346",
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    borderRadius: 16,
    border: "1px solid rgba(150, 115, 70, 0.25)",
    padding: 16,
    fontSize: 15,
    color: "#3a352d",
    backgroundColor: "#fffdf9",
    resize: "vertical",
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  submitButton: {
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: "16px 28px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    width: "100%",
    boxShadow: "0 4px 15px rgba(45, 74, 62, 0.15)",
    transition: "background-color 0.2s ease, transform 0.1s ease",
  },
  successBox: {
    marginTop: 20,
    background: "rgba(74, 107, 93, 0.1)",
    border: "1px solid #4a6b5d",
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: "#2d4a3e",
    lineHeight: 1.5,
  },
  benefitsSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "20px 24px 60px",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#2d4a3e",
    marginBottom: 24,
    textAlign: "center",
  },
  benefitsGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  benefitCard: {
    padding: 28,
    borderRadius: 24,
    background: "#fffdf9",
    border: "1px solid rgba(150, 115, 70, 0.16)",
    boxShadow: "0 8px 25px rgba(150, 115, 70, 0.02)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  benefitIcon: {
    fontSize: 28,
  },
  benefitName: {
    fontSize: 17,
    fontWeight: 700,
    color: "#2d4a3e",
  },
  benefitText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#5c5346",
  },
};