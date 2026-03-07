# AI Healthcare News Aggregator — Technical Specification

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Core Modules](#4-core-modules)
5. [Data Pipeline](#5-data-pipeline)
6. [Web Frontend Architecture](#6-web-frontend-architecture)
7. [Automation & CI/CD](#7-automation--cicd)
8. [Design Highlights](#8-design-highlights)
9. [Extensibility](#9-extensibility)
10. [Performance Optimization](#10-performance-optimization)

---

## 1. Project Overview

### 1.1 Purpose

AI Healthcare News Aggregator is a **fully automated news aggregation system** focused on AI in healthcare, medical journals, and laboratory medicine. It addresses:

- **Information fragmentation**: Aggregates from 100+ RSS sources across all medical specialties
- **Information noise**: AI-relevance keyword filtering surfaces healthcare and AI content
- **Real-time updates**: GitHub Actions fetches data every 2 hours
- **Specialty tagging**: 21 healthcare specialties with keyword-based matching

### 1.2 Core Capabilities

```
┌────────────────────────────────────────────────────────────────┐
│                 AI Healthcare News Aggregator                   │
├────────────────┬───────────────────┬───────────────────────────┤
│  Data Layer    │  Processing Layer │  Presentation Layer       │
├────────────────┼───────────────────┼───────────────────────────┤
│ • 100+ sources │ • AI relevance    │ • React SPA              │
│ • 14 specialty │   filtering       │ • Responsive design      │
│   categories   │ • Deduplication   │ • Dark mode              │
│ • OPML parser  │ • Encoding fix    │ • Multi-filter UI        │
│ • 68 journals  │ • Translation     │ • Specialty tag badges   │
└────────────────┴───────────────────┴───────────────────────────┘
```

### 1.3 Directory Structure

```
ai-news-aggregator/
├── src/                          # Data fetching engine
│   ├── index.ts                  # Main entry point (CLI + logic)
│   ├── config.ts                 # Global configuration
│   ├── types.ts                  # TypeScript type definitions
│   ├── fetchers/                 # Data fetchers
│   │   ├── base.ts               # Fetcher base class
│   │   ├── opml-rss.ts           # OPML/RSS parser
│   │   └── ...                   # Platform-specific fetchers
│   ├── filters/                  # Filters
│   │   ├── ai-related.ts         # AI relevance filter
│   │   └── dedupe.ts             # Deduplication logic
│   ├── translate/                # Translation module
│   │   └── google.ts             # Google Translate API
│   ├── output/                   # Output module
│   └── utils/                    # Utility functions
│       ├── date.ts               # Date handling
│       ├── hash.ts               # Hash generation
│       ├── http.ts               # HTTP request wrapper
│       ├── text.ts               # Text processing
│       └── url.ts                # URL handling
├── web/                          # Web frontend
│   ├── src/
│   │   ├── App.tsx               # Main application
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom hooks
│   │   ├── types/                # Type definitions
│   │   └── utils/                # Utilities
│   │       └── healthcareTags.ts # 21 specialty tag definitions
│   └── vite.config.ts            # Vite configuration
├── data/                         # Output data (JSON)
├── feeds/                        # RSS subscription config
└── .github/workflows/            # CI/CD configuration
```

---

## 2. Tech Stack

### 2.1 Backend (Data Engine)

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **TypeScript** | 5.6+ | Type-safe development |
| **tsx** | 4.19+ | Direct TS execution |
| **Cheerio** | 1.0+ | HTML parsing |
| **rss-parser** | 3.13+ | RSS feed parsing |
| **fast-xml-parser** | 4.5+ | XML/OPML parsing |
| **dayjs** | 1.11+ | Date manipulation |
| **p-limit** | 6.1+ | Concurrency control |
| **commander** | 12.1+ | CLI argument parsing |

### 2.2 Frontend (Web UI)

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **React** | 18.3+ | UI framework |
| **TypeScript** | 5.6+ | Type safety |
| **Vite** | 5.4+ | Build tool with HMR |
| **Tailwind CSS** | 3.4+ | Utility-first CSS |
| **Lucide React** | 0.453+ | Icon library |

### 2.3 DevOps

| Technology | Purpose |
|:-----------|:--------|
| **GitHub Actions** | CI/CD automation |
| **GitHub Pages** | Static site hosting |
| **pnpm** | Package manager |
| **ESLint** | Code quality |

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
                                ┌─────────────────────────────────┐
                                │       GitHub Actions            │
                                │   (Triggered every 2 hours)     │
                                └────────────┬────────────────────┘
                                             │
                                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Data Collection Layer                      │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────────┐     │
│  │ Platform     │  │   OPML RSS  │  │  Journal RSS Feeds   │     │
│  │ Fetchers     │  │ Aggregator  │  │ (68 medical journals)│     │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬───────────┘     │
│         └────────────────┴─────────────────────┘                  │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      Data Processing Layer                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │ AI Relevance    │  │ Deduplication   │  │ Title            │  │
│  │ Filter          │  │ (title + url)   │  │ Translation      │  │
│  │ (keywords+regex)│  │                 │  │ (Google API)     │  │
│  └─────────┬───────┘  └─────────┬───────┘  └─────────┬────────┘  │
│            └────────────────────┴────────────────────┘            │
│                    ┌────────────────────────┐                     │
│                    │   Archive Management   │                     │
│                    │ (45-day history)       │                     │
│                    └────────────────────────┘                     │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Output Layer                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐      │
│  │ latest-24h.json│  │ archive.json   │  │ source-status  │      │
│  │ (Latest news)  │  │ (History)      │  │ (Fetch status) │      │
│  └────────────────┘  └────────────────┘  └────────────────┘      │
└──────────────────────────────┬───────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Web Presentation Layer                         │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    React SPA Application                    │   │
│  │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐ ┌────────┐│   │
│  │  │ Header │ │ Stats  │ │Specialty │ │NewsList│ │ Modal  ││   │
│  │  │        │ │ Cards  │ │ Filter   │ │        │ │        ││   │
│  │  └────────┘ └────────┘ └──────────┘ └────────┘ └────────┘│   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Core Modules

### 4.1 Configuration System (`config.ts`)

Centralized configuration with all tunable parameters:
- **HTTP settings**: User-Agent, timeout (30s), retries (3), retry delay (800ms)
- **RSS settings**: Concurrency limit (20), feed timeout, URL replacements
- **Filter settings**: AI keywords, tech keywords, healthcare terms, noise keywords

### 4.2 Type System (`types.ts`)

- `RawItem` — Raw fetched data (siteId, title, url, publishedAt)
- `ArchiveItem` — Stored item with bilingual support (title_en, title_zh)
- `Fetcher` — Strategy pattern interface for data fetchers

### 4.3 Fetcher Architecture (`fetchers/`)

Uses **Template Method** and **Strategy** patterns:
- `BaseFetcher` — Abstract base with common HTTP/JSON/HTML fetch methods
- `OpmlRssFetcher` — Parses OPML subscriptions and fetches RSS feeds concurrently
- Platform-specific fetchers for various data sources

### 4.4 Filters (`filters/`)

- **AI Relevance Filter** (`ai-related.ts`) — Multi-rule keyword matching
- **Deduplication** (`dedupe.ts`) — Title + URL based deduplication

### 4.5 Translation (`translate/google.ts`)

- Incremental translation (max 80 new titles per run)
- Persistent cache (`title-zh-cache.json`)
- Priority: AI items translated first, others use cache only

---

## 5. Data Pipeline

```
RawItem (fetch layer)
    │
    ▼ Merge into archive
ArchiveItem (storage layer)
    │
    ▼ Time window filter (24h)
ArchiveItem[] (recent data)
    │
    ▼ AI relevance filter
ArchiveItem[] (relevant items)
    │
    ▼ Title translation
ArchiveItem[] (with bilingual fields)
    │
    ▼ Deduplication
ArchiveItem[] (final output)
    │
    ▼ JSON serialization
latest-24h.json / latest-7d.json / archive.json
```

---

## 6. Web Frontend Architecture

### 6.1 Component Hierarchy

- **App.tsx** — Root component, orchestrates layout
- **Header** — Branding, theme toggle, time range
- **StatsCards** — Source statistics
- **FilterBar** — Search + SpecialtyFilter + SiteFilters
- **SpecialtyFilter** — 21 healthcare specialty pills (multi-select)
- **NewsList** → **NewsCard** — Paginated news display with specialty badges
- **Modals** — Favorites, Reading History, Source Details

### 6.2 Core Hook: `useNewsData`

Manages all data state: fetching, filtering (site, source, specialty, search), pagination, and statistics.

### 6.3 Healthcare Specialty System

Defined in `web/src/utils/healthcareTags.ts`:
- 21 specialties with emoji icons, keyword arrays, and color classes
- `matchSpecialtyTags(title)` — cached keyword-based matching
- `SpecialtyFilter` component for multi-select pill UI

---

## 7. Automation & CI/CD

### GitHub Actions Workflow

```yaml
on:
  schedule:
    - cron: "0 */2 * * *"    # Every 2 hours
  workflow_dispatch:          # Manual trigger

jobs:
  update:
    steps:
      1. Checkout code
      2. Setup Node.js 20 + pnpm
      3. Install dependencies
      4. Prepare OPML (from secrets)
      5. Fetch data (pnpm run fetch)
      6. Commit & push data changes
      7. Build web (Vite)
      8. Deploy to GitHub Pages
```

---

## 8. Design Highlights

| Pattern | Application | Benefit |
|:--------|:------------|:--------|
| **Strategy Pattern** | Fetcher interface | Easy to add new data sources |
| **Template Method** | BaseFetcher | Reuse common fetch logic |
| **Factory Pattern** | createAllFetchers | Centralized creation |
| **Separation of Concerns** | Module structure | High cohesion, low coupling |

### Robustness
- HTTP retry with exponential backoff
- Dual encoding detection (UTF-8 / GB18030)
- Fallback data extraction (multiple strategies)
- Translation cache reuse

### Performance
- Concurrent fetching with p-limit (5/20)
- Incremental archive updates
- Translation rate limiting (80/run)
- Frontend pagination (50 items, load more)

---

## 9. Extensibility

### Adding a New Data Source

```typescript
// 1. Create a new fetcher class
class NewSourceFetcher extends BaseFetcher {
  siteId = 'newsource';
  siteName = 'New Source';

  async fetch(now: Date): Promise<RawItem[]> {
    const html = await this.fetchHtml('https://newsource.com');
    // ...parse and return items
  }
}

// 2. Register in createAllFetchers()
// 3. Add filter keywords to config.ts if needed
```

### Adding New Filter Rules

Add keywords to `config.ts` → `filter.aiKeywords` or `filter.techKeywords`.

### Adding New Specialty Tags

Add entries to `web/src/utils/healthcareTags.ts` → `HEALTHCARE_TAGS` array.

---

## 10. Performance Optimization

| Layer | Strategy | Implementation |
|:------|:---------|:---------------|
| **Fetch** | Concurrency control | p-limit(5) / p-limit(20) |
| **Fetch** | Request timeout | AbortController (30s) |
| **Fetch** | Exponential backoff | retryDelay × (attempt + 1) |
| **Process** | Incremental merge | Map<id, ArchiveItem> for O(1) lookup |
| **Process** | Translation cache | title-zh-cache.json persistence |
| **Process** | Translation throttle | Max 80 new translations/run |
| **Frontend** | Lazy rendering | displayCount + loadMore pagination |
| **Frontend** | Memoization | useMemo for filtered results |
| **Frontend** | Animation cap | Math.min(index × 30, 300)ms delay |
