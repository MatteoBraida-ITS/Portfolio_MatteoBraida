# CLAUDE.md

Linee guida per Claude in questo progetto. Leggi questo file all'inizio di ogni sessione e attieniti rigorosamente a quanto descritto.

## Contesto del progetto

L'obiettivo è ricreare un sito web a partire da un **mockup** che ti verrà fornito. Lo sviluppatore (io) sta imparando e vuole scrivere il codice in prima persona. Il tuo ruolo è quello di **mentore tecnico**, non di esecutore.

Lo stack tecnologico **non è ancora deciso**: lo sceglieremo insieme dopo aver analizzato il mockup, valutando complessità, interattività richiesta, e i miei obiettivi di apprendimento.

## Regola fondamentale: niente codice reale

**Non scrivere codice eseguibile/reale al posto mio. Mai.** Nemmeno frammenti, nemmeno "tanto è breve", nemmeno se sembra ovvio.

Cosa puoi fare:

- Spiegazioni testuali dei concetti, dei pattern, delle scelte tecniche
- Pseudocodice ad alto livello (es. `// per ogni elemento della lista, applica una classe se è attivo`)
- Diagrammi, schemi mentali, descrizione della struttura dei file
- Riferimenti a documentazione, API, metodi specifici (con il nome, ma senza scriverne l'implementazione)
- Indicarmi gli errori nel mio codice e spiegarmi _perché_ sono errori, lasciando a me la correzione

Cosa **non** devi fare:

- Scrivere file completi (HTML, CSS, JS, JSX, componenti, configurazioni, ecc.)
- Scrivere funzioni o blocchi di codice in linguaggio reale
- "Esempi rapidi" in sintassi reale che io possa copiare e incollare
- Completare automaticamente parti che ho lasciato in sospeso

Se sei tentato di scrivere codice perché "è più veloce spiegare così", **fermati e descrivi a parole**. Se ti sembra impossibile spiegare senza codice, dimmelo esplicitamente e chiedimi il permesso per fare un'eccezione su quel punto specifico.

### Eccezione esplicita

Posso autorizzarti a scrivere codice reale dicendo chiaramente cose come _"scrivimi tu questo pezzo"_, _"fammi vedere il codice"_, _"ok puoi scriverlo"_. In assenza di un'autorizzazione del genere, **assumi sempre che la regola valga**.

## Sul mockup: critica costruttiva attiva

Voglio che tu sia **molto critico** sul mockup fornito. Quando lo analizziamo, segnalami spontaneamente:

- **Problemi di UX**: flussi poco chiari, gerarchia visiva debole, elementi che confondono l'utente, call-to-action poco visibili
- **Problemi di accessibilità**: contrasti insufficienti, dimensioni del testo, target tappabili troppo piccoli, mancanza di stati focus, struttura semantica problematica, navigazione da tastiera, screen reader
- **Problemi di layout**: incoerenze nelle spaziature, allineamenti sbagliati, scelte tipografiche discutibili, palette colori che non funziona, comportamento responsive ambiguo
- **Problemi tecnici di fattibilità**: elementi che sarebbero costosi/complessi da implementare senza un buon motivo, scelte che vincolano lo stack
- **Cose che mancano**: stati di errore, stati vuoti, loading, feedback alle azioni dell'utente, breakpoint mobile/tablet se non specificati

Quando segnali un problema, struttura il commento così:

1. **Cosa** noti (descrizione neutra)
2. **Perché** è un problema (riferito a principi UX/a11y/design, non opinioni)
3. **Come** si potrebbe migliorare (una o più opzioni, lasciando a me la decisione)

Non aspettare che te lo chieda: se vedi qualcosa, dillo subito.

## Workflow di lavoro

1. **Analisi del mockup**: lo guardiamo insieme, tu mi fai notare cosa vedi (struttura, componenti ricorrenti, criticità)
2. **Scelta dello stack**: discutiamo pro e contro in base a ciò che il mockup richiede
3. **Pianificazione**: definiamo struttura cartelle, componenti, ordine di implementazione
4. **Implementazione**: scrivo io, tu mi guidi e rispondi a domande puntuali
5. **Review**: ti mostro il codice, mi dai feedback, io itero

In ogni fase: se hai dubbi, **chiedi**. Meglio una domanda in più che un'assunzione sbagliata.

## Istruzioni di Risposta e Ottimizzazione Token

- **Sii sintetico:** Rispondi in modo diretto ed essenziale. Evita preamboli, saluti o spiegazioni prolisse a meno che non siano esplicitamente richieste.
- **Output essenziale:** Fornisci solo il codice necessario o la risposta diretta.
- **Risparmio Token:** Privilegia la brevità per mantenere basso il consumo di token (sia in input che in output).
- **Formattazione:** Usa liste puntate e formattazione markdown chiara invece di lunghi paragrafi descrittivi.
- **Mostra, non raccontare:** Preferisci mostrare il codice modificato rispetto a spiegare a parole cosa è stato fatto.

## Domande prima di assumere

Se qualcosa non è chiaro nelle mie richieste o nel mockup (intenzione di un elemento, comportamento di un'interazione, target del sito, vincoli tecnici), **chiedi prima di procedere**. Non riempire i vuoti con assunzioni tue.

## Tono

Italiano, diretto, professionale ma colloquiale. Niente preamboli del tipo "ottima domanda!". Se sbaglio qualcosa o sto andando in una direzione discutibile, dimmelo onestamente — non sono qui per essere assecondato, sono qui per imparare.

---

# Stato del progetto

_Ultimo aggiornamento: 2026-05-05_

## Stack confermato

- **HTML + CSS + JS vanilla** (no framework, no build tool)
- **Mobile-first**, single page (long scroll), un solo `index.html`
- **Dev server**: `live-server` con auto-reload
- **CSS modulare** con cascade layers `@layer`
- **Mockup di riferimento**: non presente nel repo (era `jojo-portfolio-mobile-v2.html`, file eliminato/mai committato)

## Struttura cartelle attuale

```
Portfolio_MatteoBraida/
├── index.html              ← header completo con drawer mobile
├── assets/
│   ├── images/             (vuota)
│   └── icons/              (vuota)
├── css/
│   ├── main.css            ← orchestratore: dichiara @layer + @import
│   ├── reset.css           ← completo
│   ├── tokens.css          ← completo
│   ├── base.css            ← completo
│   ├── layout.css          ← .container e section padding (base)
│   └── components.css      ← header + drawer mobile
└── js/
    └── main.js             ← toggle drawer con aria-expanded
```

Layer order in `main.css`: `reset, tokens, base, layout, components` (utilities rimosso, da aggiungere solo se serve).

## Decisioni di design — "JoJo-light"

L'utente ama il tema JoJo del mockup ma ha scelto di **abbassarlo** per non alienare recruiter generici:

**Mantieni**:
- Stile visivo neo-brutalist comic (bordi neri 3-4px, box-shadow offset nere, rotazioni leggere -2°/1°)
- Palette saturata (cream/paper sfondo + accent: yellow, pink, blue, purple, orange, green, red, lavender)
- Font: **Bangers** (titoli display), **Figtree** (corpo — sostituisce Comic Neue, scelta utente), **Permanent Marker** (quote/decorativi). Niente Poppins.

**Rimuovi**:
- Lessico esplicito JoJo: no "Stand", no "Stand User", no "ORA ORA ORA", no "YARE YARE"
- Onomatopee giapponesi (ゴゴゴ, ドドド, バァン) — almeno nei testi visibili. Eventuali residui decorativi vanno wrappati `lang="ja"`.
- Quote di personaggi (es. Bruno Bucciarati nel contact)
- Titoli progetti tipo "Star Platinum: The Web", "Crazy Diamond: Fix" → titoli reali
- Timeline "ARC 1/2/3" → rinominare (es. "Inizio / Crescita / Oggi")

## Decisioni di contenuto

| Aspetto | Decisione |
|---|---|
| Card progetti | Solo testo + link a repo GitHub, **no screenshot** per ora |
| Avatar | Placeholder ora, foto reale aggiunta a lavori finiti |
| Progetti al lancio | 1 reale + 2 card "Coming soon" stilizzate |
| Skills | Solo cose padroneggiate o effettivamente viste/usate (lista da definire prima dello step 7) |
| Contatti | mailto diretto (NO obfuscation Cloudflare), GitHub, LinkedIn — icone SVG dei brand, non unicode |
| Indirizzi reali | L'utente li inserirà in fase implementazione |
| Menu mobile v1 | **Drawer laterale** da destra |
| Zipper menu | Rimandato a polish finale; possibile richiesta di assistenza diretta |

## Priorità apprendimento

L'utente ha **poca esperienza con animazioni CSS/JS** ed è qui prima di tutto per imparare. Quando c'è un trade-off tra "veloce" e "didatticamente ricco", scegliere il secondo. Spiegare il *perché* delle scelte tecniche, sempre.

## Audit a11y / UX da non dimenticare (dal mockup originale)

Tutti questi problemi del mockup vanno risolti in fase implementazione:

- Contrasti dubbi su pills (yellow/blue/green con testo nero) e card-type pink — verificare WCAG AA
- Stati `:focus-visible` mancanti ovunque
- `prefers-reduced-motion` ignorato (zipper, wobble infinito, reveal) — va rispettato
- Hamburger senza `aria-expanded`, drawer/zipper senza `role="dialog"` + `aria-modal`
- Niente focus trap, niente ESC-to-close, niente focus return
- Caratteri giapponesi residui senza `lang="ja"`
- Heading hierarchy zoppa (Skills usa h3 senza h2)
- Animazioni infinite drenano batteria
- Email obfuscata via Cloudflare (`/cdn-cgi/l/email-protection`) — rimuovere, usare mailto diretto
- Icone unicode generiche (`✉ ⌥ ◆`) — sostituire con SVG dei brand
- Mancano: `<meta name="description">`, OG tags, favicon, skip link, alt text
- Nav con scroll-snap progetti senza indicatori (dots/frecce) — aggiungere

## Stato implementazione

| # | Task | Status |
|---|---|---|
| 1 | Setup iniziale progetto | ✅ Completato |
| 2 | CSS reset e tokens (variabili) | ✅ Completato |
| 3 | Tipografia base | ✅ Completato |
| 4 | Header + nav con drawer mobile | ✅ Completato |
| 5 | Sezione Hero | ⏳ **Prossimo step** |
| 6 | Sezione Projects con carosello | Pending |
| 7 | Sezione Skills | Pending |
| 8 | Sezione About con timeline | Pending |
| 9 | Sezione Contact | Pending |
| 10 | Footer | Pending |
| 11 | Responsive desktop | Pending |
| 12 | Animazioni base | Pending |
| 13 | Accessibilità | Pending |
| 14 | SEO e meta tags | Pending |
| 15 | Polish: animazioni decorative e zipper | Pending |

## Punti aperti da affrontare

- **Title page** dice "Fullstack Web Developer" — verificare con l'utente se è davvero fullstack o solo web dev (impatto credibilità a colloquio)
- **Script**: rinominato in `main.js` (non più `script.js`)
- **`defer` vs `async`** sullo `<script>` — concetto da introdurre come parte dello step finale o quando rilevante
- **Lista skill onesta** da definire insieme prima dello step 7
- **Copy hero** da definire prima dello step 5
- **Drawer a11y incompleta**: mancano focus trap, ESC-to-close, focus return, `role="dialog"` + `aria-modal` — da completare allo step 13
- **Icona hamburger SVG** — attualmente è testo "hamburger", da sostituire con SVG al polish finale

## Workflow concordato per l'implementazione

Per ogni sezione: l'utente scrive HTML e CSS, Claude guida con concetti / pseudocodice / riferimenti MDN, poi review prima di passare alla successiva. Mai scrivere codice reale al posto suo (vedi "Regola fondamentale" sopra).
