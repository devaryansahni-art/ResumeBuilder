# CraftCV — Premium Privacy-Focused Resume & CV Builder

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue.svg?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-purple.svg?logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg?logo=tailwindcss" alt="TailwindCSS v4" />
  <img src="https://img.shields.io/badge/Node.js-Express-green.svg?logo=express" alt="Express Backend" />
  <img src="https://img.shields.io/badge/Prisma-SQLite-2d3748.svg?logo=prisma" alt="Prisma SQLite" />
</p>

CraftCV is a modern, high-performance, ATS-friendly **Resume & CV Builder** application. Built with **React 19**, **Vite 8**, **TailwindCSS v4**, and an **Express + Prisma SQLite** backend, CraftCV provides 13 unique template designs, live real-time preview, vector PDF exports, and optional secure cloud saving.

---

## ✨ Features

- **🎨 13 Unique Resume Templates**:
  1. `Minimal Clean`: 100% ATS-parser safe, linear single-column layout.
  2. `Modern Sidebar`: Split two-column layout with dark/accent sidebar for skills & contact.
  3. `Executive Classic`: Elegant serif typography with centered traditional executive headers.
  4. `Compact Single-Page`: High-density grid layout to fit extensive experience onto 1 page.
  5. `Creative Banner`: Contemporary header block with skill badge pills.
  6. `Terminal Tech / Code`: Dark IDE terminal styling with monospaced code blocks and syntax accents for developers.
  7. `Executive Pro Banner`: Full-bleed accent header bar with golden timeline accents for C-suite leaders.
  8. `Infographic Visual`: Skill progress bars, metric callout cards, and dynamic visual badges.
  9. `Editorial Magazine`: High-end luxury editorial design with drop-quote styling and wide margins.
  10. `Bold Impact Headline`: Oversized impact titles, high contrast headers, and pill tags.
  11. `Chronological Timeline`: Continuous milestone node graph connecting career timeline entries.
  12. `Academic Research CV`: Research & publication friendly format with grant highlights and formal dividers.
  13. `Startup Founder`: Neomorphic card grid layout with tech stack pills and founder vision box.

- **🔐 Dedicated Authentication Landing Page**:
  - Full-page **Sign In** and **Register** landing view.
  - Secured with **JWT Tokens** and **Bcrypt** password encryption.
  - **Try Demo as Guest** mode available for instant access without signing in.

- **💾 Cloud Database & Local Storage**:
  - Sync and save multiple resume versions to an **SQLite database** powered by **Prisma ORM**.
  - LocalStorage automatic backup fallback so your work is never lost.

- **📄 High-Fidelity Vector PDF Export**:
  - Clean `@media print` CSS engine optimized for crisp, single or multi-page A4 PDF downloads without blank page bugs.

- **⚡ Presets & Data Backup**:
  - Pre-loaded sample content for *Software Engineers*, *Product Managers*, *UI/UX Designers*, and *Executives*.
  - Export and Restore full resume backups via JSON files.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **ORM**: [Prisma 6](https://www.prisma.io/)
- **Database**: SQLite (`dev.db`)
- **Security**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### 1. Clone the Repository
```bash
git clone https://github.com/devaryansahni-art/ResumeBuilder.git
cd ResumeBuilder
```

### 2. Install Dependencies

#### Install Root Frontend Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

---

## 🏃 Running the Application

### Option A: Run Both Frontend & Backend

1. **Start the Express API Server** (Port 5001):
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Vite Dev Server** (Port 5173):
   In a new terminal window at the project root:
   ```bash
   npm run dev
   ```

3. Open **`http://localhost:5173`** in your browser!

---

### Option B: Database Commands (Prisma)

If you modify [schema.prisma](file:///Users/aryan/.gemini/antigravity-ide/scratch/craftcv/server/prisma/schema.prisma), sync your SQLite database with:

```bash
cd server
npm run prisma:db
```

To regenerate the Prisma Client types:
```bash
cd server
npm run prisma:generate
```

---

## 📂 Project Structure

```
ResumeBuilder/
├── server/                    # Express + Prisma + SQLite Backend
│   ├── prisma/
│   │   ├── dev.db             # SQLite database file
│   │   └── schema.prisma      # Prisma schema (User & Resume models)
│   ├── src/
│   │   ├── index.ts           # Express server entry point
│   │   ├── prisma.ts          # Prisma client instantiation
│   │   ├── middleware/        # JWT auth protection middleware
│   │   └── routes/            # Auth (/api/auth) & Resumes (/api/resumes)
│   ├── package.json
│   └── tsconfig.json
│
├── src/                       # React Frontend Application
│   ├── components/
│   │   ├── AuthPage.tsx       # Login & Register landing screen
│   │   ├── AuthModal.tsx      # Auth modal dialog
│   │   ├── ErrorBoundary.tsx  # React error fallback boundary
│   │   ├── Header.tsx         # Navbar & action controls
│   │   ├── Editor/            # Form editor section components
│   │   ├── Modals/            # Template selection & Cloud modals
│   │   └── Preview/           # Live preview & 13 Template components
│   ├── context/               # AuthContext state provider
│   ├── services/              # API fetch client wrapper
│   ├── styles/                # Print CSS & Tailwind styling
│   ├── types/                 # TypeScript interfaces
│   └── utils/                 # Theme & color presets
│
├── index.html
├── package.json
├── vite.config.js             # Vite config with API proxy to localhost:5001
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
