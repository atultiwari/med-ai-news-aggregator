# Changelog

## [2.0.0] - 2026-03-07

### Major Changes - Healthcare Fork

#### Healthcare Specialty Tags
- **21 healthcare specialty tags**: Pathology, Radiology, Oncology, Surgery, Medicine, Cardiology, Neurology, Microbiology, Biochemistry, Pharmacology, Genomics, Dermatology, Pediatrics, Ophthalmology, Orthopedics, Psychiatry, OB/GYN, Emergency Medicine, Public Health, Digital Health, AI & Technology
- **Specialty filter component**: Multi-select pill UI in the filter bar
- **Card badges**: Up to 3 specialty tags displayed on each news card
- **Keyword matching**: Cached client-side matching via `healthcareTags.ts`

#### Expanded Medical Journal Sources (68 journals)
- **General Medicine** (12): NEJM, NEJM AI, The Lancet, Lancet Digital Health, BMJ, JAMA, JAMA Network Open, Annals of Internal Medicine, Nature Medicine, Nature Digital Medicine, BMC Medicine, PLOS Medicine
- **Oncology** (6): Lancet Oncology, JAMA Oncology, Nature Cancer, Cancer Research, JCO, British Journal of Cancer
- **Cardiology** (5): JACC, European Heart Journal, Circulation, Nature Cardiovascular Research
- **Neurology** (5): Lancet Neurology, JAMA Neurology, Nature Neuroscience, Brain, Annals of Neurology
- **Surgery** (4): JAMA Surgery, Annals of Surgery, British Journal of Surgery
- **Radiology** (4): Radiology, Radiology: AI, European Radiology, AJR
- **Pathology & Lab** (8): J Pathology Informatics, Modern Pathology, AJCP, Clinical Chemistry, JCLA, Diagnostic Pathology, J Pathology, Archives of Pathology & Lab Medicine
- **Microbiology** (4): Lancet Infectious Diseases, Clinical Microbiology Reviews, Nature Microbiology, J Clinical Microbiology
- **Ophthalmology** (3): Ophthalmology, JAMA Ophthalmology, BJO
- **Pediatrics** (3): JAMA Pediatrics, Lancet Child & Adolescent Health, Pediatrics
- **Psychiatry** (3): JAMA Psychiatry, Lancet Psychiatry, Nature Mental Health
- **Dermatology** (2): JAMA Dermatology, British Journal of Dermatology
- **Genomics** (4): Nature Biotechnology, Nature Genetics, Genome Biology, Genome Medicine
- **Pharmacology** (2): Nature Reviews Drug Discovery, Clinical Pharmacology & Therapeutics
- **Public Health** (3): Lancet Public Health, Lancet Global Health, BMJ Global Health
- **Medical Informatics** (3): BMC Medical Informatics, J Biomedical Informatics, JAMIA

#### Broadened Keyword Filter
- Added 100+ clinical and specialty terms to ensure journal articles are not filtered out
- Terms cover: clinical, patient, diagnosis, treatment, oncology, cardiac, neurological, surgical, infectious disease, etc.

#### Documentation
- Replaced Chinese `推荐公众号.md` with English `recommended-sources.md`
- Rewrote README in English with healthcare focus
- Added author info: Dr. Atul Tiwari
- Added credits to original author (SuYxh)
- Rewrote TECH_SPEC.md in English
- Rewrote CHANGELOG.md in English

---

## [1.2.1] - 2026-03-01

### Added

#### WeChat Public Account Sources
- **WeChat platform support**: Fetch articles from selected WeChat official accounts
- **52 subscription sources**: Covering AI, tech media, development, finance, and bloggers
- **Data source**: Third-party RSS service (decemberpei.cyou)
- **Concurrency**: p-limit set to 10 for balanced performance

### Technical
- New `WechatRssFetcher` class for WeChat RSS fetching
- New test script `test/test-wechat-rss.ts`

---

## [1.2.0] - 2026-03-01

### Added

#### Time Range Switching Optimization
- **Preloading**: After loading 24h data, 7d data auto-preloads in background
- **Switching states**: Differentiated "initial load" (skeleton screen) vs "switching" (overlay)
- **Button loading state**: Spinner icon and disabled state during loading
- **Top loading indicator**: "Loading X-day data..." floating notification

### Technical
- New `isSwitching` state to distinguish initial load from switching
- New `SwitchingOverlay` component for switching feedback
- `AbortController` for request cancellation (React StrictMode compatibility)
- `useRef` for cached preloaded data

---

## [1.1.0] - 2026-02-28

### Added

#### Reading History
- Article titles displayed in history modal (priority: `title_zh` > `title_en` > `title_bilingual`)
- Clear confirmation dialog with impact details
- Full datetime format for reading timestamps

#### UI/UX Improvements
- Removed header read-count badge for cleaner interface
- Improved reading history layout with aligned timestamps

#### Read Tracking
- Auto-mark articles as read on click with "Read" badge on cards
- Full reading history recording with clear/export support

#### Favorites
- Star button on news cards for bookmarking
- Favorites modal with list view
- Single/bulk unfavorite with confirmation
- localStorage persistence (max 500 items)

#### Data Export
- Export favorites as JSON
- Export reading history as JSON
- Includes URL, title, timestamp, and formatted time

#### YouTube Source
- YouTube platform support with RSS feeds
- Built-in channels: Peter Yang, Lenny's Podcast, 20VC

#### Xinzhiyuan Source
- Chinese AI media platform via WordPress REST API

#### NewsNow Time Optimization
- Precise timestamps from original platform APIs (HackerNews, GitHub, etc.)
- Fallback to block update time when precise time unavailable
- Concurrent request optimization with p-limit

### Technical
- New `useVisitedLinks` hook for read state management
- New `useFavorites` hook for favorites management
- New `exportToJson` utility
- Data migration for legacy localStorage format
- New `ConfirmDialog`, `ReadingHistoryModal`, `FavoritesModal` components

---

## [1.0.0] - 2026-02-21

### Features
- AI news aggregation and display
- Multi-platform data source support
- 24h / 7-day time range switching
- Platform and source filtering
- Full-text search
- Dark / light theme toggle
