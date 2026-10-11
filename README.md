# AidFlow · Flood Response & Dispatch Coordination

> "During a local flood, people submit aid requests from their phones, with an optional photo. A model rates the photo's damage severity (S1 Critical to S4 Low). A volunteer coordinator reviews each request, confirms or overrides the rating, and assigns a volunteer team. The model only suggests. A person always makes the final call."

AidFlow is a crisis-response web application designed for disaster relief operations (Hamilton County, IN Flood Response). It implements a **Human-in-the-Loop (HITL)** triage system where machine learning models provide rapid severity proposals while human coordinators retain authoritative control over rating overrides and volunteer dispatch.

---

## 🛠 Tech Stack

- **React** (v19)
- **TypeScript** (strict typed domain models)
- **React Router** (`react-router-dom` v7)
- **CSS** (warm disaster-response design system tokens matching the AidFlow mockups)
- **Lucide Icons** (`lucide-react`)
- **Vite** (bundler and dev server)

---

## 📂 Repository Structure

```
aidflow-repo/
├── README.md
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── vite.config.ts
    ├── index.html
    ├── public/
    │   ├── sample-flood-house.svg       # S1 Critical flood damage graphic
    │   ├── sample-flood-roof.svg        # S2 High roof stranded graphic
    │   ├── sample-flood-basement.svg    # S3 Moderate flooded basement graphic
    │   └── sample-dark-photo.svg        # Underexposed photo check graphic
    └── src/
        ├── types/
        │   └── index.ts                 # AidRequest, VolunteerTeam, SeverityLevel, etc.
        ├── context/
        │   └── AidFlowContext.tsx       # Live reactive store with realistic flood seed data
        ├── components/
        │   ├── AidFlowLogo.tsx           # Brand icon and title
        │   ├── SeverityBadge.tsx        # S1 to S4 and Unscored badges + picker cards
        │   ├── StatusTracker.tsx        # Vertical and horizontal 4-step dispatch timeline
        │   ├── AssignModal.tsx          # Team dispatch dialog (White River, Morse Lake, etc.)
        │   ├── CoordinatorSidebar.tsx   # Fixed dark navigation with real-time badges
        │   ├── CoordinatorHeader.tsx    # Incident banner, active status, coordinator profile
        │   └── SystemScenarioBanner.tsx # Prominent operational principle banner
        ├── pages/
        │   ├── requester/
        │   │   ├── RequesterLayout.tsx      # Mobile citizen view container & language toggle
        │   │   ├── RequestHelpPage.tsx      # Step 1: Need selector, party stepper, address, notes
        │   │   ├── AddPhotosPage.tsx        # Step 2: Damage upload with AI lighting check
        │   │   ├── RequestStatusPage.tsx    # Live ticket tracker, SMS alert, emergency 911
        │   │   └── RegisterResourcePage.tsx # Community shelter & aid group registration
        │   └── coordinator/
        │       ├── CoordinatorLayout.tsx       # Desktop triage portal shell
        │       ├── SortingQueuePage.tsx        # Triage queue with filters, search, empty state
        │       ├── RequestReviewPage.tsx       # Triage review, AI suggestion, override reason
        │       ├── AssignTeamsPage.tsx         # Dedicated team assignment route
        │       ├── CoverageMapPage.tsx         # Interactive Hamilton County zone map & gap alert
        │       ├── OperationsOverviewPage.tsx  # Metrics, severity/town bars, override logs, CSV export
        │       └── ReferralsPage.tsx           # Approved shelters & SMS referral directory
        ├── App.tsx                      # Application router and layout hierarchy
        ├── main.tsx                     # React root mount
        └── index.css                    # Design tokens and custom aesthetics
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` (or the port Vite outputs).

### 3. Build for Production
```bash
npm run build
```

---

## 🎯 Key Application Flows

### 1. Requester Flow (Mobile / Citizen)
- **`http://localhost:5173/request`**: Intake form allowing citizens to select needs (`Medical`, `Water Rescue`, `Shelter`, `Food & Water`, `Debris`, `Other`), party count, contact phone, geolocation pin, and incident narrative.
- **`http://localhost:5173/request/photos`**: Step 2 photo submission with AI quality detection (`Too dark to see` warning with Retake / Keep anyway options).
- **`http://localhost:5173/request/status/:id`**: Real-time status ticket tracking with step-by-step dispatch timeline (`Received` → `Assigned` → `Help on the way` → `Done`).
- **`http://localhost:5173/register-resource`**: Public community registration for churches and community shelters.

### 2. Coordinator Dashboard (Desktop / Triage)
- **`http://localhost:5173/coordinator`**: All Requests Sorting Queue sorted by severity and wait time. Supports town filtering, need filters, search, and empty queue state preview.
- **`http://localhost:5173/coordinator/review/:id`**: Deep triage review for requests (e.g. `Request-50`). Shows AI model confidence (`0.71`), vulnerability flags (`Elderly · Medical`), and allows coordinators to confirm model rating or select an override with required justification notes.
- **Team Assignment Modal**: Dispatches local volunteer units (`White River`, `Morse Lake`, `Cool Creek`) based on proximity and real-time availability.
- **`http://localhost:5173/coordinator/map`**: Interactive SVG map of Hamilton County districts (Noblesville, Carmel, Westfield, Cicero, Arcadia, Sheridan, and Fishers coverage gap alert).
- **`http://localhost:5173/coordinator/operations`**: Real-time operations overview with KPI cards, severity distribution, town breakdowns, oldest untouched requests, and complete audit log of coordinator overrides with CSV export.
- **`http://localhost:5173/coordinator/referrals`**: Community resources directory for SMS referrals.
