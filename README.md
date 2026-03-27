# Frolick News

A full-stack news blog application built with React, TypeScript, Vite, and Convex.

## Architecture

- **Frontend:** React + TypeScript + Vite (located in `src/`)
- **Backend:** Convex (located in `convex/`)

## Backend

The backend is powered by [Convex](https://convex.dev) and is hosted at:

- **Convex Backend URL:** https://rare-elephant-985.convex.cloud
- **Convex Dashboard:** https://dashboard.convex.dev/d/rare-elephant-985

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
VITE_CONVEX_URL=https://rare-elephant-985.convex.cloud
```

### Running the App

Start the frontend dev server:

```bash
npm run dev
```

Start the Convex backend dev server (in a separate terminal):

```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```
