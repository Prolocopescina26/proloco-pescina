"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type FeedbackEntry = {
  id: number;
  rating: number;
  tags: string | null;
  comment: string | null;
  created_at: string | null;
};

type DocumentEntry = {
  id: number;
  titolo: string;
  categoria: string;
  descrizione: string | null;
  file_url: string;
  created_at: string | null;
};

type ComunicazioneEntry = {
  id: number;
  titolo: string;
  testo: string;
  created_at: string | null;
};

type EventoEntry = {
  id: number;
  titolo: string;
  descrizione: string | null;
  data_evento: string;
  data_fine: string | null;
  immagine_url: string | null;
  categoria: string;
  luogo: string | null;
  created_at: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CATEGORIE_PREDEFINITE = ["Verbali", "Avvisi", "Eventi", "Regolamenti", "Comunicati", "Rendiconti", "Bilanci"];

const styles: any = {
  page: {
    padding: "40px 20px",
    maxWidth: 900,
    margin: "0 auto",
    background: "#F8FAFC",
    minHeight: "100vh",
    display: "grid",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid rgba(11, 61, 145, 0.1)",
  },
  socioCounter: {
    background: "#fff",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid rgba(11, 61, 145, 0.1)",
  },
  counterDisplay: {
    fontSize: 64,
    fontWeight: 800,
    color: "#0B3D91",
    textAlign: "center",
    marginBottom: 16,
  },
  counterLabel: {
    fontSize: 18,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  formRow: {
    display: "flex",
    gap: 16,
  },
  label: {
    display: "block",
    fontWeight: 600,
    color: "#0B3D91",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #E2E8F0",
    borderRadius: 8,
    fontSize: 14,
        boxSizing: "border-box",
    transition: "all 0.2s",
  },
  select: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #E2E8F0",
    borderRadius: 8,
    fontSize: 14,
        boxSizing: "border-box",
    background: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#334155",
  },
  button: {
    padding: "12px 24px",
    background: "#0B3D91",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s",
  },
  feedbackCard: {
    padding: 16,
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    background: "#F8FAFC",
    transition: "all 0.2s",
  },
};

export default function AdminPage() {
  const [titolo, setTitolo] = useState("");
  const [categoria, setCategoria] = useState("Verbali");
  const [categoriaCustom, setCategoriaCustom] = useState("");
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [descrizione, setDescrizione] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sociCount, setSociCount] = useState(24);
  const [loadingSoci, setLoadingSoci] = useState(false);
  const [savingSoci, setSavingSoci] = useState(false);
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [documentEntries, setDocumentEntries] = useState<DocumentEntry[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [comunicazioneEntries, setComunicazioneEntries] = useState<ComunicazioneEntry[]>([]);
  const [loadingComunicazioni, setLoadingComunicazioni] = useState(false);
  const [comunicazioneTitolo, setComunicazioneTitolo] = useState("");
  const [comunicazioneTesto, setComunicazioneTesto] = useState("");
  const [comunicazioneLoading, setComunicazioneLoading] = useState(false);
  const [eventoEntries, setEventoEntries] = useState<EventoEntry[]>([]);
  const [loadingEventi, setLoadingEventi] = useState(false);
  const [eventoTitolo, setEventoTitolo] = useState("");
  const [eventoDescrizione, setEventoDescrizione] = useState("");
  const [eventoData, setEventoData] = useState("");
  const [eventoDataFine, setEventoDataFine] = useState("");
  const [eventoLuogo, setEventoLuogo] = useState("");
  const [eventoCategoria, setEventoCategoria] = useState("Eventi");
  const [eventoLoading, setEventoLoading] = useState(false);

  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

useEffect(() => {
    loadFeedback();
    loadDocuments();
    loadComunicazioni();
    loadEventi();
    loadSoci();
  }, []);

  async function loadSoci() {
    try {
      const response = await fetch("/api/soci");
      if (response.ok) {
        const data = await response.json();
        setSociCount(data.count || 24);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSoci(false);
    }
  }

  async function saveSoci() {
    setSavingSoci(true);
    try {
      const response = await fetch("/api/soci", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: sociCount }),
      });
      if (!response.ok) throw new Error("Errore salvataggio");
      alert("Contatore soci aggiornato!");
    } catch (error) {
      console.error(error);
      alert("Errore durante il salvataggio.");
    } finally {
      setSavingSoci(false);
    }
  }

  async function loadFeedback() {
    setLoadingFeedback(true);
    setFeedbackError("");
    try {
      const response = await fetch("/api/feedback");
      if (!response.ok) throw new Error("Impossibile caricare i feedback.");
      const data = await response.json();
      setFeedbackEntries(data);
    } catch (error) {
      console.error(error);
      setFeedbackError("Errore durante il caricamento dei feedback.");
    } finally {
      setLoadingFeedback(false);
    }
  }

  async function loadDocuments() {
    setLoadingDocuments(true);
    try {
      const response = await fetch("/api/documenti");
      if (!response.ok) throw new Error("Errore caricamento documenti");
      const data = await response.json();
      setDocumentEntries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDocuments(false);
    }
  }

  async function loadComunicazioni() {
    setLoadingComunicazioni(true);
    try {
      const response = await fetch("/api/comunicazioni");
      if (!response.ok) throw new Error("Errore caricamento comunicazioni");
      const data = await response.json();
      setComunicazioneEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComunicazioni(false);
    }
  }

  async function createComunicazione() {
    if (!comunicazioneTitolo.trim() || !comunicazioneTesto.trim()) {
      alert("Inserisci titolo e testo della comunicazione");
      return;
    }
    setComunicazioneLoading(true);
    try {
      const response = await fetch("/api/comunicazioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titolo: comunicazioneTitolo,
          testo: comunicazioneTesto,
        }),
      });
      if (!response.ok) throw new Error("Errore creazione comunicazione");
      setComunicazioneTitolo("");
      setComunicazioneTesto("");
      loadComunicazioni();
      alert("Comunicazione aggiunta!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'aggiunta della comunicazione.");
    } finally {
      setComunicazioneLoading(false);
    }
  }

  async function deleteComunicazione(id: number) {
    if (!confirm("Sei sicuro di voler eliminare questa comunicazione?")) return;
    try {
      const response = await fetch("/api/comunicazioni", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Errore eliminazione");
      setComunicazioneEntries(comunicazioneEntries.filter((c) => c.id !== id));
      alert("Comunicazione eliminata!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione.");
    }
  }

  async function loadEventi() {
    setLoadingEventi(true);
    try {
      const response = await fetch("/api/eventi");
      if (!response.ok) throw new Error("Errore caricamento eventi");
      const data = await response.json();
      setEventoEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEventi(false);
    }
  }

  async function createEvento() {
    if (!eventoTitolo.trim() || !eventoData || !eventoCategoria.trim()) {
      alert("Inserisci titolo, data e categoria");
      return;
    }
    setEventoLoading(true);
    try {
      const response = await fetch("/api/eventi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titolo: eventoTitolo,
          descrizione: eventoDescrizione,
          data_evento: eventoData,
          data_fine: eventoDataFine || null,
          categoria: eventoCategoria,
          luogo: eventoLuogo || null,
        }),
      });
      if (!response.ok) throw new Error("Errore creazione evento");
      setEventoTitolo("");
      setEventoDescrizione("");
      setEventoData("");
      setEventoDataFine("");
      setEventoLuogo("");
      setEventoCategoria("Eventi");
      loadEventi();
      alert("Evento aggiunto!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'aggiunta dell'evento.");
    } finally {
      setEventoLoading(false);
    }
  }

  async function deleteEvento(id: number) {
    if (!confirm("Sei sicuro di voler eliminare questo evento?")) return;
    try {
      const response = await fetch("/api/eventi", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Errore eliminazione");
      setEventoEntries(eventoEntries.filter((e) => e.id !== id));
      alert("Evento eliminato!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione.");
    }
  }

  async function deleteFeedback(id: number) {
    if (!confirm("Sei sicuro di voler eliminare questo feedback?")) return;
    try {
      const response = await fetch("/api/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Errore eliminazione");
      setFeedbackEntries(feedbackEntries.filter((entry) => entry.id !== id));
      alert("Feedback eliminato!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione.");
    }
  }

  async function deleteDocument(id: number) {
    if (!confirm("Sei sicuro di voler eliminare questo documento?")) return;
    try {
      const response = await fetch("/api/documenti", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Errore eliminazione");
      setDocumentEntries(documentEntries.filter((doc) => doc.id !== id));
      alert("Documento eliminato!");
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione.");
    }
  }

  async function upload() {
    const finalCategoria = useCustomCategory ? categoriaCustom : categoria;
    if (!file || !titolo || !finalCategoria.trim()) {
      alert("Compila titolo, categoria e file");
      return;
    }
    setLoading(true);
    try {
      const fileNameSafe = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("documenti")
        .upload(fileNameSafe, file);
      if (uploadError) {
        alert("Errore upload: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data } = supabase.storage
        .from("documenti")
        .getPublicUrl(fileNameSafe);
      const fileUrl = data.publicUrl;
      const { error: dbError } = await supabase
        .from("documenti")
        .insert([{
          titolo,
          categoria: finalCategoria,
          descrizione,
          file_url: fileUrl,
        }]);
      if (dbError) {
        alert("Errore DB: " + dbError.message);
        setLoading(false);
        return;
      }
      alert("Documento caricato con successo!");
      setTitolo("");
      setCategoria("Verbali");
      setCategoriaCustom("");
      setUseCustomCategory(false);
      setDescrizione("");
      setFile(null);
      setFileName("");
    } catch (err) {
      console.error(err);
      alert("Errore generico");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ margin: 0, fontSize: 28, color: "#0B3D91", marginBottom: 24 }}>📁 Carica Documento</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Titolo</label>
          <input placeholder="Titolo del documento" value={titolo} onChange={(e) => setTitolo(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Categoria</label>
          <select value={useCustomCategory ? "custom" : categoria} onChange={(e) => {
            if (e.target.value === "custom") setUseCustomCategory(true);
            else { setUseCustomCategory(false); setCategoria(e.target.value); }
          }} style={styles.select}>
            {CATEGORIE_PREDEFINITE.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="custom">➕ Aggiungi categoria personalizzata</option>
          </select>
        </div>
        {useCustomCategory && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoria personalizzata</label>
            <input placeholder="Inserisci una categoria personalizzata" value={categoriaCustom} onChange={(e) => setCategoriaCustom(e.target.value)} style={styles.input} />
          </div>
        )}
        <div style={styles.formGroup}>
          <label style={styles.label}>Descrizione</label>
          <input placeholder="Descrizione del documento (opzionale)" value={descrizione} onChange={(e) => setDescrizione(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>File</label>
          <div style={{
            border: "2px dashed #0B3D91",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
            cursor: "pointer",
            background: file ? "#E3F2FD" : "#F8FAFC",
            transition: "all 0.2s",
          }} onClick={() => document.getElementById("fileInput")?.click()}>
            {fileName ? (
              <div>
                <div style={{ fontSize: 18, color: "#0B3D91", fontWeight: 600 }}>✓ File selezionato</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{fileName}</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 18, color: "#0B3D91", fontWeight: 600 }}>Clicca per selezionare un file</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>o trascina qui il tuo documento</div>
              </div>
            )}
          </div>
          <input id="fileInput" type="file" onChange={(e) => { setFile(e.target.files?.[0] || null); setFileName(e.target.files?.[0]?.name || ""); }} style={{ display: "none" }} />
        </div>
<button onClick={upload} disabled={loading} style={{ ...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer", width: "100%", marginTop: 8 }}>
          {loading ? "⏳ Caricamento..." : "📤 Carica documento"}
        </button>
      </div>

      <div style={styles.socioCounter}>
        <h2 style={{ margin: "0 0 20px", fontSize: 24, color: "#0B3D91" }}>👥 Soci della Pro Loco</h2>
        <input 
          type="number" 
          min="0" 
          value={sociCount} 
          onChange={(e) => setSociCount(parseInt(e.target.value) || 0)} 
          style={{ ...styles.input, fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 16 }} 
        />
        <button onClick={saveSoci} disabled={savingSoci} style={{ ...styles.button, width: "100%" }}>
          {savingSoci ? "⏳ Salvataggio..." : "💾 Salva conteggio"}
        </button>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, color: "#0B3D91" }}>📝 Feedback ricevuti</h2>
          <button onClick={loadFeedback} disabled={loadingFeedback} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #0B3D91", background: "#fff", color: "#0B3D91", cursor: loadingFeedback ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>
            {loadingFeedback ? "⏳ Caricamento..." : "🔄 Aggiorna"}
          </button>
        </div>
        {loadingFeedback ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>⏳ Caricamento feedback...</p> : feedbackError ? <p style={{ color: "#b91c1c", padding: 16, background: "#FEE2E2", borderRadius: 8 }}>⚠️ {feedbackError}</p> : feedbackEntries.length === 0 ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>Nessun feedback ricevuto al momento.</p> : (
          <div style={{ display: "grid", gap: 16 }}>
            {feedbackEntries.map((entry) => (
              <div key={entry.id} style={styles.feedbackCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0B3D91" }}>⭐ {entry.rating} / 5</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{entry.created_at ? new Date(entry.created_at).toLocaleString("it-IT") : "-"}</div>
                    <button onClick={() => deleteFeedback(entry.id)} style={{ padding: "4px 12px", fontSize: 12, background: "#FEE2E2", color: "#991b1b", border: "1px solid #FCA5A5", borderRadius: 6, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>🗑️ Elimina</button>
                  </div>
                </div>
                {entry.tags && <div style={{ marginBottom: 8 }}><span style={{ display: "inline-block", background: "#E3F2FD", color: "#0B3D91", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>🏷️ {entry.tags}</span></div>}
                <p style={{ margin: 0, color: "#334155", fontSize: 14, lineHeight: 1.5 }}>💬 {entry.comment || "Nessun commento"}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, color: "#0B3D91" }}>📢 Comunicazioni importanti</h2>
          <button onClick={loadComunicazioni} disabled={loadingComunicazioni} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #0B3D91", background: "#fff", color: "#0B3D91", cursor: loadingComunicazioni ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>
            {loadingComunicazioni ? "⏳ Caricamento..." : "🔄 Aggiorna"}
          </button>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Titolo comunicazione</label>
          <input placeholder="Es. Avviso chiusura uffici" value={comunicazioneTitolo} onChange={(e) => setComunicazioneTitolo(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Testo</label>
          <textarea placeholder="Scrivi il testo della comunicazione..." value={comunicazioneTesto} onChange={(e) => setComunicazioneTesto(e.target.value)} style={{ ...styles.input, minHeight: 100, resize: "vertical" } as any} />
        </div>
        <button onClick={createComunicazione} disabled={comunicazioneLoading} style={{ ...styles.button, opacity: comunicazioneLoading ? 0.7 : 1, cursor: comunicazioneLoading ? "not-allowed" : "pointer", marginBottom: 24 }}>
          {comunicazioneLoading ? "⏳ Salvataggio..." : "➕ Aggiungi comunicazione"}
        </button>
        {loadingComunicazioni ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>⏳ Caricamento comunicazioni...</p> : comunicazioneEntries.length === 0 ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>Nessuna comunicazione inserita.</p> : (
          <div style={{ display: "grid", gap: 12 }}>
            {comunicazioneEntries.map((com) => (
              <div key={com.id} style={{ padding: 18, borderRadius: 14, border: "1px solid #E2E8F0", background: "#F8FAFC", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>{com.titolo}</div>
                  <p style={{ margin: "0 0 8px", color: "#334155", fontSize: 14, lineHeight: 1.6 }}>{com.testo}</p>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{com.created_at ? new Date(com.created_at).toLocaleString("it-IT") : "-"}</div>
                </div>
                <button onClick={() => deleteComunicazione(com.id)} style={{ padding: "6px 12px", fontSize: 12, background: "#FEE2E2", color: "#991b1b", border: "1px solid #FCA5A5", borderRadius: 8, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>🗑️ Elimina</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, color: "#0B3D91" }}>🎉 Eventi</h2>
          <button onClick={loadEventi} disabled={loadingEventi} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #0B3D91", background: "#fff", color: "#0B3D91", cursor: loadingEventi ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>
            {loadingEventi ? "⏳ Caricamento..." : "🔄 Aggiorna"}
          </button>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Titolo</label>
          <input placeholder="Es. Festa del Borgo" value={eventoTitolo} onChange={(e) => setEventoTitolo(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.formRow}>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Data inizio</label>
            <input type="date" value={eventoData} onChange={(e) => setEventoData(e.target.value)} style={styles.input} />
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Data fine (opzionale)</label>
            <input type="date" value={eventoDataFine} onChange={(e) => setEventoDataFine(e.target.value)} style={styles.input} />
          </div>
          <div style={{ ...styles.formGroup, flex: 1 }}>
            <label style={styles.label}>Luogo</label>
            <input placeholder="Es. Piazza Umberto I" value={eventoLuogo} onChange={(e) => setEventoLuogo(e.target.value)} style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Categoria</label>
          <select value={eventoCategoria} onChange={(e) => setEventoCategoria(e.target.value)} style={styles.select}>
            <option value="Eventi">Eventi</option>
            <option value="In programma">In programma</option>
            <option value="Storico">Storico</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Descrizione (opzionale)</label>
          <textarea placeholder="Descrizione dell'evento..." value={eventoDescrizione} onChange={(e) => setEventoDescrizione(e.target.value)} style={{ ...styles.input, minHeight: 90, resize: "vertical" } as any} />
        </div>
        <button onClick={createEvento} disabled={eventoLoading} style={{ ...styles.button, opacity: eventoLoading ? 0.7 : 1, cursor: eventoLoading ? "not-allowed" : "pointer", marginBottom: 20, width: "100%" }}>
          {eventoLoading ? "⏳ Salvataggio..." : "➕ Aggiungi evento"}
        </button>
        {loadingEventi ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>⏳ Caricamento eventi...</p> : eventoEntries.length === 0 ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>Nessun evento inserito.</p> : (
          <div style={{ display: "grid", gap: 12 }}>
            {eventoEntries.map((ev) => (
              <div key={ev.id} style={{ padding: 16, borderRadius: 14, border: "1px solid #E2E8F0", background: "#F8FAFC", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{ev.titolo}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    <span style={{ display: "inline-block", background: "#E3F2FD", color: "#0B3D91", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, marginRight: 8 }}>{ev.categoria}</span>
                    <span>{ev.data_evento ? new Date(ev.data_evento).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" }) : "-"}{ev.data_fine && ev.data_fine !== ev.data_evento ? ` → ${new Date(ev.data_fine).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}` : ""}</span>
                  </div>
                  {ev.luogo && <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>📍 {ev.luogo}</div>}
                  {ev.descrizione && <p style={{ margin: "8px 0 0", color: "#334155", fontSize: 14, lineHeight: 1.5 }}>{ev.descrizione}</p>}
                </div>
                <button onClick={() => deleteEvento(ev.id)} style={{ padding: "6px 12px", fontSize: 12, background: "#FEE2E2", color: "#991b1b", border: "1px solid #FCA5A5", borderRadius: 8, cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>🗑️ Elimina</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 24, color: "#0B3D91" }}>📋 Documenti Caricati</h2>
          <button onClick={loadDocuments} disabled={loadingDocuments} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #0B3D91", background: "#fff", color: "#0B3D91", cursor: loadingDocuments ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>
            {loadingDocuments ? "⏳ Caricamento..." : "🔄 Aggiorna"}
          </button>
        </div>
        {loadingDocuments ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>⏳ Caricamento documenti...</p> : documentEntries.length === 0 ? <p style={{ color: "#64748b", textAlign: "center", padding: 20 }}>Nessun documento caricato.</p> : (
          <div style={{ display: "grid", gap: 12 }}>
            {documentEntries.map((doc) => (
              <div key={doc.id} style={{ padding: 16, borderRadius: 12, border: "1px solid #E2E8F0", background: "#F8FAFC", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>{doc.titolo}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    <span style={{ display: "inline-block", background: "#E3F2FD", color: "#0B3D91", padding: "2px 8px", borderRadius: 4, marginRight: 8 }}>{doc.categoria}</span>
                    {doc.created_at && <span>{new Date(doc.created_at).toLocaleString("it-IT")}</span>}
                  </div>
                </div>
                <button onClick={() => deleteDocument(doc.id)} style={{ padding: "6px 12px", fontSize: 12, background: "#FEE2E2", color: "#991b1b", border: "1px solid #FCA5A5", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>🗑️ Elimina</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



