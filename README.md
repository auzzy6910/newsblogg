# Frolick News

A full-stack news blog application built with React, TypeScript, Vite, and Convex.

## Technical Stack

- **Frontend:** React 18 + TypeScript + Vite (located in `src/`)
- **Backend:** Convex (located in `convex/`)
- **Styling:** Tailwind CSS + tailwindcss-animate
- **UI Components:** Lucide React icons, Recharts, class-variance-authority
- **Build Tool:** Vite
- **Linting:** ESLint

Backend is managed via Convex at https://secret-aardvark-456.convex.cloud. Database schema and functions are located in `/convex`.

## Backend

The backend is powered by [Convex](https://convex.dev) and is hosted at:

- **Convex Backend URL:** https://secret-aardvark-456.convex.cloud
- **Convex Dashboard:** https://dashboard.convex.dev/d/secret-aardvark-456

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and update values as needed:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```
VITE_CONVEX_URL=https://secret-aardvark-456.convex.cloud
```

### Running the App

Start both frontend and backend together:

```bash
npm run dev:all
```

Or run them separately:

```bash
npm run dev:frontend   # Frontend only
npm run dev:backend    # Convex backend only
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```
