# NEXORA – Smart Plans for Smarter Growth

> **Responsive SaaS Pricing Website**  
> Built with Semantic HTML5, Modern CSS3, and Vanilla JavaScript.  
> Minimal Luxury Aesthetic inspired by Stripe, Linear, and Vercel.

---

## 🌟 Overview & Key Highlights

**NEXORA** is a modern, high-conversion SaaS pricing website designed to showcase flexible subscription options. The project demonstrates commercial frontend engineering practices, accessibility compliance (WCAG 2.1 AA), responsive mobile-first architecture, and interactive UI states without relying on any heavy frameworks or third-party CSS libraries.

---

## 🚀 Features

1. **Instant Billing Cycle Switcher**:
   - Seamlessly toggle between **Monthly** and **Yearly** billing with immediate price recalculations.
   - Dynamic currency rendering (₹499/mo vs ₹4,790/yr, ₹999/mo vs ₹9,590/yr, ₹1,999/mo vs ₹19,190/yr).
   - Dynamic period labels ("per month" / "per year") and discount indicators ("Save 20%").
   - Built with accessible `<button>` elements, maintaining accurate `aria-pressed` attributes.
   - Prices stored cleanly in HTML `data-monthly` and `data-yearly` attributes.

2. **3 Distinct Tiered Pricing Cards**:
   - **Starter**: Essential toolkit for individuals and early-stage projects.
   - **Professional (Most Popular)**: Visually prominent tier elevated with an electric violet gradient border, soft ambient glow, and a high-contrast `"MOST POPULAR"` ribbon badge.
   - **Enterprise (Best Value)**: Tailored for high-scale teams with dedicated support and a distinctive `"BEST VALUE"` badge.
   - Smooth 6px upward hover lift, shadow expansion, and border highlight.
   - **Mobile-optimized**: Automatically shifts the "Most Popular" plan to the top on mobile screens using CSS grid ordering.

3. **Interactive Experience**:
   - **Sticky Navigation Bar**: Frosted glass blur effect (`backdrop-filter: blur(14px)`) with active scroll-spy indicators.
   - **Mobile Hamburger Drawer**: Fully responsive slide-down menu with accessible state management (`aria-expanded`).
   - **FAQ Accordion**: Smooth expand/collapse accordion with keyboard and screen reader accessibility (`aria-controls`, `aria-labelledby`).
   - **Plan Selection Confirmation Modal**: Clicking any pricing CTA opens an accessible, beautifully styled modal summarizing the chosen tier, billing frequency, and price before triggering a toast notification.
   - **No Broken Elements**: Every single button, link, and toggle is interactive and functional.

4. **Design System & Aesthetics**:
   - **Deep Midnight Navy Background** (`#0B1020`) with secondary navy panels (`#111A2E`).
   - **Electric Violet Accents** (`#8B5CF6`) & **Subtle Blue Highlights** (`#60A5FA`).
   - High text contrast adhering to WCAG 2.1 AA (> 4.5:1 ratio).
   - Support for `prefers-reduced-motion` for motion-sensitive users.

---

## 📁 Project Structure

```text
nexora-pricing/
├── index.html        # Semantic HTML5 structure & content
├── style.css         # CSS3 styling, custom properties, and responsive media queries
├── script.js         # Vanilla JavaScript handling state, toggles, modal, & accordion
├── README.md         # Comprehensive documentation & setup instructions
└── screenshots/      # High-resolution screenshots of Monthly & Yearly pricing views
    ├── monthly-view.png
    └── yearly-view.png
```

---

## 🛠️ How to Run the Project

### Option 1: VS Code Live Server (Recommended)

1. Open **Visual Studio Code**.
2. Go to **File** → **Open Folder...** and select the `nexora-pricing` folder.
3. If not already installed, install the **Live Server** extension by Ritwick Dey from the VS Code Extensions Marketplace (`Ctrl+Shift+X` → search "Live Server").
4. Right-click `index.html` in the file explorer and click **"Open with Live Server"** (or click **"Go Live"** in the bottom-right status bar).
5. The website will automatically launch in your default web browser at `http://127.0.0.1:5500/index.html`.

### Option 2: Direct Browser Launch

Double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

---

## 📱 Responsive Testing Breakpoints

The website has been tested and verified across:
- **Desktop**: 1280px and wider (3-column CSS Grid).
- **Tablet**: 768px - 1024px (adaptive layout with proportioned card padding).
- **Mobile**: 360px - 480px (single column stack, Popular plan positioned first, touch-friendly tap targets ≥ 44px).

---

## ♿ Accessibility Features

- Semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Keyboard focus indicators with high-visibility rings (`:focus-visible`).
- Accordion and Modal state tracking with `aria-expanded`, `aria-controls`, `aria-hidden`, and `role="region"`.
- `aria-pressed` on the billing period toggle buttons.
- `prefers-reduced-motion` CSS media query that turns off non-essential transitions for accessibility.

---

## 📄 License & Attribution

Demonstration project created for internship evaluation. All branding and pricing figures are fictional.
All icons are lightweight, clean, inline SVGs with zero external dependencies.
