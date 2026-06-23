# Talent Corner — Campus Drive Portal
## Frontend Setup Guide (copy-paste ready)

---

## STEP 1 — Install Node.js (if not installed)

Go to https://nodejs.org → download **LTS version** → install it.

Check it worked — open Terminal / Command Prompt and type:
```
node -v
npm -v
```
Both should show version numbers.

---

## STEP 2 — Copy the project folder

Copy the entire `talent-corner` folder to wherever you want to work (Desktop, Documents, etc.)

---

## STEP 3 — Open terminal in the project folder

**Windows:** Open the `talent-corner` folder in File Explorer → right-click in empty space → "Open in Terminal"
**Mac:** Open Terminal → type `cd ` (with space) → drag the `talent-corner` folder into the Terminal window → press Enter

---

## STEP 4 — Install dependencies

Type this and press Enter:
```
npm install
```
Wait for it to finish (it will download React and everything needed).

---

## STEP 5 — Start the app

```
npm start
```

The browser will automatically open at **http://localhost:3000**
You'll see the full portal with Dashboard, Candidates, Events, Register, Corporates tabs.

---

## STEP 6 — Make changes

Every time you save a file, the browser auto-refreshes. You don't need to restart.

---

## PROJECT STRUCTURE (what's in each file)

```
talent-corner/
├── public/
│   └── index.html          ← HTML shell (Tabler icons + Google Fonts loaded here)
│
└── src/
    ├── index.js             ← Entry point (don't touch)
    ├── App.jsx              ← Navigation shell — controls which page shows
    │
    ├── components/
    │   ├── Navbar.jsx       ← Top navigation bar
    │   └── Navbar.css       ← Navbar styles
    │
    ├── pages/
    │   ├── Dashboard.jsx    ← Dashboard with metrics, pipeline, events, B2B leads
    │   ├── Candidates.jsx   ← Candidate table with search + filters
    │   ├── Events.jsx       ← Event cards + corporate assignments table
    │   ├── Register.jsx     ← Multi-step registration form (5 steps)
    │   └── Corporates.jsx   ← Corporate partners table
    │
    └── styles/
        └── global.css       ← All shared CSS (cards, buttons, tags, tables, etc.)
```

---

## FOR YOUR BACKEND TEAMMATES

Every API connection point is marked with a comment like:
```
// ─── BACKEND TEAM: replace with GET /api/candidates ───
```

They should search for `BACKEND TEAM` in each file to find every place that needs a real API call.

### Summary of API endpoints needed:

| Page       | Method | Endpoint                        | What it does                    |
|------------|--------|---------------------------------|---------------------------------|
| Dashboard  | GET    | /api/dashboard/stats            | Metric numbers (registered, offers, etc.) |
| Candidates | GET    | /api/candidates                 | List candidates (accepts ?search=&city=&status=&profile=) |
| Candidates | POST   | /api/candidates/export          | Download CSV of filtered candidates |
| Events     | GET    | /api/events                     | List events with stats          |
| Events     | POST   | /api/events                     | Create new event                |
| Register   | POST   | /api/register                   | Submit candidate registration   |
| Register   | POST   | /api/upload/resume              | Upload resume file              |
| Corporates | GET    | /api/corporates                 | List corporate partners         |
| Corporates | POST   | /api/corporates                 | Add new corporate               |
| Corporates | GET    | /api/corporates/:id/report      | Download impact PDF             |

---

## HOW TO ADD A NEW PAGE

1. Create `src/pages/YourPage.jsx`
2. Import it in `src/App.jsx`
3. Add it to the `PAGES` object and the `tabs` array in `Navbar.jsx`

---

## COLORS (for reference)

| Name         | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| Purple       | #7F77DD   | Primary accent, buttons  |
| Purple Dark  | #3C3489   | Logo, headings           |
| Purple Light | #EEEDFE   | Tag bg, chip selected    |
| Teal         | #1D9E75   | Success, green tags      |
| Amber        | #BA7517   | Warning, pending         |
| Coral        | #D85A30   | Alert, needs attention   |

---

## BUILD FOR PRODUCTION

```
npm run build
```

This creates a `build/` folder. Give this to your backend team to serve.
