# PRD: Simplify LLM - Modernization & Mobile-First Redesign

| Property | Value |
|----------|-------|
| **Version** | 2.0 |
| **Last Updated** | 2026-01-15 |
| **Status** | Draft |
| **Owner** | Development Team |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [MUST Requirements](#must-requirements-non-negotiable)
3. [Tech Stack](#tech-stack)
4. [User Stories by Priority](#user-stories-by-priority)
   - [P0 - Critical (Blocking)](#p0---critical-blocking)
   - [P1 - High Priority](#p1---high-priority)
   - [P2 - Enhancement](#p2---enhancement)
5. [Design System](#design-system)
6. [Quality Metrics](#quality-metrics)
7. [CI/CD Pipeline & Deployment](#cicd-pipeline--deployment)
8. [Project Structure](#project-structure)
9. [Dependencies](#dependencies)
10. [Out of Scope](#out-of-scope)

---

## Executive Summary

### Overview
An interactive educational platform explaining Large Language Model concepts (Softmax, Attention, Transformers, Tensors) through visualizations. This modernization focuses on **mobile-first design** and **enhanced readability** while maintaining the German-language educational content.

### Goals
| # | Goal | Success Metric |
|---|------|----------------|
| 1 | Mobile-first responsive design | All breakpoints tested & passing |
| 2 | Enhanced readability | Typography system implemented |
| 3 | Modernize tech stack | React 19, Vite 6, Tailwind 4 |
| 4 | Accessibility compliance | WCAG 2.1 AA, Lighthouse > 95 |
| 5 | Performance optimization | Core Web Vitals targets met |
| 6 | Offline support | PWA with service worker |

---

## MUST Requirements (Non-Negotiable)

> **CRITICAL:** These requirements are **MANDATORY** before any feature is considered complete.

### The Three Gates

```
┌─────────────────────────────────────────────────────────────┐
│                   MANDATORY WORKFLOW                         │
│                                                             │
│   GATE 1: TESTS           GATE 2: SYNC         GATE 3: DEPLOY
│   ─────────────           ──────────           ──────────────
│   ✓ Type check            ✓ Commit             ✓ CI passes
│   ✓ Lint pass             ✓ Push               ✓ Deploy to GH Pages
│   ✓ Build succeeds        ✓ PR (if branch)     ✓ Verify live
│   ✓ MCP DevTools tests    ✓ Sync confirmed     ✓ Smoke test
│                                                             │
│   ALL THREE GATES MUST PASS - NO EXCEPTIONS                 │
└─────────────────────────────────────────────────────────────┘
```

### Gate 1: All Tests Must Pass
- [ ] `npm run test` - Type checking passes
- [ ] `npm run lint` - Zero warnings/errors
- [ ] `npm run build` - Build succeeds
- [ ] MCP Chrome DevTools tests pass (see [US-012](#us-012-mcp-chrome-devtools-testing))

### Gate 2: Repository Sync
- [ ] Commit with semantic message (`feat:`, `fix:`, `docs:`, etc.)
- [ ] Push to repository
- [ ] Create PR for review (if on feature branch)
- [ ] Verify remote is in sync

### Gate 3: GitHub Actions Deployment
- [ ] CI pipeline triggered automatically
- [ ] All CI jobs pass (lint, test, build, security)
- [ ] Deploy to GitHub Pages succeeds
- [ ] Verify deployment is accessible

### Quick Commands
```bash
# Gate 1: Test
npm run test && npm run lint && npm run build

# Gate 2: Sync
git add . && git commit -m "feat: description" && git push

# Gate 3: Verify
gh run watch && curl -I https://ainxtgendev.github.io/simplify_llm/
```

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 6.x |
| Language | TypeScript | 5.5+ |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 11.x |
| Charts | Recharts | 2.x |
| Math | KaTeX | 0.16.x |
| Icons | Lucide React | Latest |
| Routing | React Router | 7.x |

---

## User Stories by Priority

### P0 - Critical (Blocking)

These must be completed first. Deployment is blocked until P0 items pass.

---

#### US-001: Mobile-First Foundation Setup `P0`
**Description:** Establish mobile-first design system and update dependencies.

**Acceptance Criteria:**
- [ ] Update dependencies to latest stable (React 19, Vite 6, Tailwind 4)
- [ ] Configure Tailwind mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- [ ] Base typography scale (min 16px body text)
- [ ] CSS custom properties for spacing/colors
- [ ] Viewport meta tag + touch targets (min 44x44px)

---

#### US-002: Responsive Navigation `P0`
**Description:** Mobile-first navigation with hamburger menu.

**Acceptance Criteria:**
- [ ] Collapsible hamburger menu (< 768px)
- [ ] Bottom navigation bar option for mobile
- [ ] Touch-friendly navigation items
- [ ] Smooth menu transitions
- [ ] Sticky header (hide on scroll down, show on scroll up)
- [ ] Screen reader tested (VoiceOver, TalkBack)

---

#### US-012: MCP Chrome DevTools Testing `P0`
**Description:** Comprehensive testing via Chrome DevTools MCP integration.

**Test Categories:**

| Category | Tests | Target |
|----------|-------|--------|
| Responsive | All breakpoints (320-1536px) | Pass |
| Performance | Lighthouse audit | > 90 |
| Accessibility | WCAG 2.1 AA | > 95 |
| Network | Slow 3G, Offline | Functional |
| Touch | 44x44px targets | Pass |
| Console | Zero errors | Clean |

**Device Matrix:**
| Device | Viewport | Status |
|--------|----------|--------|
| iPhone SE | 375x667 | ⬜ |
| iPhone 14 Pro | 393x852 | ⬜ |
| Pixel 7 | 412x915 | ⬜ |
| iPad | 768x1024 | ⬜ |
| Desktop | 1280x800 | ⬜ |

**MCP Commands:**
```bash
# Resize and test viewports
mcp__chrome-devtools__resize_page --width 375 --height 667

# Take snapshot for accessibility
mcp__chrome-devtools__take_snapshot

# Performance trace
mcp__chrome-devtools__performance_start_trace --reload true --autoStop true

# Network throttling
mcp__chrome-devtools__emulate --networkConditions "Slow 3G"
```

---

#### US-013: CI/CD & Deployment `P0`
**Description:** GitHub Actions pipeline for automated testing and deployment.

**Pipeline Stages:**
```
Lint → Test → E2E → Security → Lighthouse → Deploy
```

**Required CI Jobs:**
- [ ] Lint & Type Check
- [ ] Unit Tests
- [ ] Build Verification
- [ ] Security Audit (`npm audit`)
- [ ] Deploy to GitHub Pages

**Post-Deployment Checklist:**
- [ ] Verify URL accessible
- [ ] All routes return 200
- [ ] PWA installable
- [ ] Offline mode works

---

### P1 - High Priority

Core features that should be completed after P0.

---

#### US-003: Home Page Optimization `P1`
**Description:** Mobile-first home page layout.

**Acceptance Criteria:**
- [ ] Vertical stack on mobile, grid on desktop
- [ ] Card grid: 1 col → 2 col → 4 col
- [ ] Line-height 1.6-1.8 for body
- [ ] Thumb-friendly padding/margins
- [ ] Reduced motion support
- [ ] Full-width CTAs on mobile

---

#### US-004: Softmax Page `P1`
**Description:** Improve Softmax visualization readability.

**Acceptance Criteria:**
- [ ] Vertical layout on mobile
- [ ] Touch-friendly slider controls
- [ ] Expandable accordion sections
- [ ] Horizontal scroll for formulas
- [ ] Step-by-step calculation view
- [ ] Min 18px for numbers

---

#### US-005: Attention Page `P1`
**Description:** Optimize AttentionHeatmap for mobile.

**Acceptance Criteria:**
- [ ] Portrait-first heatmap design
- [ ] Pinch-to-zoom support
- [ ] Swipeable Q/K/V tabs
- [ ] Tap-to-reveal tooltips
- [ ] Readable weights on small screens
- [ ] Sticky color legend

---

#### US-006: Transformer Page `P1`
**Description:** Mobile-friendly Transformer content.

**Acceptance Criteria:**
- [ ] Vertical scrollable SVG diagram
- [ ] Progressive disclosure (show/hide)
- [ ] Anchor navigation
- [ ] Mobile encoder/decoder view
- [ ] Horizontal scroll for code blocks
- [ ] Bullet points for long paragraphs

---

#### US-007: Tensor Page `P1`
**Description:** Mobile tensor visualizations.

**Acceptance Criteria:**
- [ ] Vertical Scalar→Vector→Matrix→Tensor flow
- [ ] Swipeable GPU/TPU carousel
- [ ] Touch-friendly 3D visualization
- [ ] Legible diagrams without zoom
- [ ] Collapsible explanations
- [ ] Optimized animations

---

#### US-008: Typography System `P1`
**Description:** Comprehensive typography for readability.

**Type Scale:**
| Element | Mobile | Desktop |
|---------|--------|---------|
| Body | 16px/1.7 | 18px/1.7 |
| H1 | 28px/1.3 | 48px/1.2 |
| H2 | 24px/1.3 | 36px/1.3 |
| H3 | 20px/1.4 | 28px/1.4 |
| Code | 14px/1.5 | 16px/1.5 |

**Acceptance Criteria:**
- [ ] Type scale implemented (14-48px)
- [ ] Optimal line length (45-75 chars)
- [ ] Proper line-heights
- [ ] Letter-spacing for headings
- [ ] Dark/light mode contrast
- [ ] System fonts with fallbacks

---

#### US-009: Performance Optimization `P1`
**Description:** Mobile network/device optimization.

**Targets:**
| Metric | Target |
|--------|--------|
| FCP | < 1.5s |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTI | < 3.0s |
| Bundle | < 200KB gzip |

**Acceptance Criteria:**
- [ ] Code splitting per route
- [ ] Lazy load visualizations
- [ ] Responsive images (srcset)
- [ ] Service worker caching
- [ ] Lighthouse > 90
- [ ] Skeleton loaders

---

#### US-010: Accessibility `P1`
**Description:** WCAG 2.1 AA compliance.

**Acceptance Criteria:**
- [ ] Proper heading hierarchy (h1→h6)
- [ ] Keyboard navigation
- [ ] ARIA labels for visualizations
- [ ] Color contrast ≥ 4.5:1
- [ ] `prefers-reduced-motion` support
- [ ] Skip-to-content link
- [ ] axe-core testing

---

### P2 - Enhancement

Nice-to-have features after P0/P1 complete.

---

#### US-011: PWA Implementation `P2`
**Description:** Progressive Web App for offline access.

**Acceptance Criteria:**
- [ ] Web manifest (192x192, 512x512 icons)
- [ ] Service worker offline caching
- [ ] Install prompt
- [ ] Background sync
- [ ] iOS/Android offline tested
- [ ] Splash screen

---

#### US-014: Touch Gestures `P2`
**Description:** Touch-optimized interactions.

**Acceptance Criteria:**
- [ ] Swipe navigation
- [ ] Pull-to-refresh
- [ ] Pinch-to-zoom visualizations
- [ ] Touch-friendly sliders
- [ ] Touch equivalents for hover
- [ ] Prevent accidental navigation

---

## Design System

### Breakpoints
| Name | Min Width | Devices |
|------|-----------|---------|
| Base | 0px | Mobile (default) |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Color Palette
| Role | Light | Dark |
|------|-------|------|
| Background Primary | `#E8F4FC` | `#0D1B2A` |
| Background Secondary | `#D1E9F6` | `#1B2838` |
| Primary Blue | `#2563EB` | `#3B82F6` |
| Text Primary | `#1E293B` | `#F1F5F9` |
| Text Secondary | `#475569` | `#94A3B8` |
| Border | `#CBD5E1` | `#334155` |

### Spacing Scale
```
4px   → xs    8px  → sm    16px → md
24px  → lg    32px → xl    48px → 2xl
```

### Touch Targets
- Minimum: 44x44px (iOS) / 48x48dp (Android)
- Spacing: 8px minimum between targets

---

## Quality Metrics

### Performance Targets
| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Bundle Size (gzip) | < 200KB | Build |

### Accessibility Targets
| Requirement | Target |
|-------------|--------|
| WCAG Level | 2.1 AA |
| Lighthouse Score | > 95 |
| Screen Reader | Compatible |
| Keyboard Nav | Full support |

---

## CI/CD Pipeline & Deployment

### GitHub Actions Workflow

```yaml
name: Build, Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm audit --audit-level=high

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Pipeline Flow
```
┌────────┐    ┌────────┐    ┌────────┐
│  Lint  │───▶│ Build  │───▶│ Deploy │
│  Test  │    │ Audit  │    │ Pages  │
└────────┘    └────────┘    └────────┘
```

### Rollback
```bash
# List recent runs
gh run list --workflow=deploy.yml --limit=5

# Rerun previous successful deployment
gh run rerun <run-id>

# Or revert and redeploy
git revert HEAD && git push
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Button, Card, Accordion, Slider
│   ├── layout/                # Header, MobileNav, Footer, Layout
│   ├── visualizations/        # Softmax, Attention, Tensor
│   └── common/                # SkeletonLoader, ErrorBoundary
├── pages/                     # Home, Softmax, Attention, Transformer, Tensor
├── hooks/                     # useMediaQuery, useTouchGestures, useReducedMotion
├── utils/                     # math.ts, accessibility.ts
├── styles/                    # typography.css, index.css
├── App.tsx
└── main.tsx
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "framer-motion": "^11.0.0",
    "katex": "^0.16.10",
    "lucide-react": "^0.460.0",
    "recharts": "^2.14.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^6.0.0",
    "vite-plugin-pwa": "^0.21.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "axe-core": "^4.10.0"
  }
}
```

---

## Out of Scope

The following are explicitly **NOT** part of this PRD:

- Backend/API development
- User authentication system
- Database integration
- Multi-language support (beyond German)
- Native mobile apps (iOS/Android)
- E-commerce functionality
- User-generated content
- Real-time collaboration features

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-01-15 | Restructured with priorities, consolidated MUST requirements |
| 1.0 | Initial | Original PRD |
