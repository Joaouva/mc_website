# MCA — Manuel Cruchinho Arquitectos (Portfolio Rebuild)

A premium, modern architectural portfolio website built using **Next.js**, **React**, **TypeScript**, and **Vanilla CSS Modules**, coupled with an integrated, zero-cost, local-first **Visual CMS Dashboard**.

The website's design has been crafted with a warm, minimalist architectural aesthetic—incorporating linen-sand backgrounds, custom watercolor gradient halos, fine outline SVG icons, and terracotta-rose highlight colors.

---

## 📐 Project Overview & Pages

The application is structured using the modern **Next.js App Router**:

* **🏛️ Home Page (`/`):** Full-bleed responsive hero header, minimalist quotes, dynamic highlight grid of featured works, and clean design philosophy cards.
* **🎨 Selected Works Gallery (`/projects`):** Filterable portfolio categorized by *Residential*, *Interior*, and *Urban Public Space*. Uses search parameter query navigation (`?category=residential`) wrapped inside a React `<Suspense>` boundary for prime SEO indexing and loading performance.
* **📏 Project Details (`/projects/[slug]`):** Dynamic routes showcasing project locations, tags, detailed sidebar summaries, and structural image layout grids. Dynamic metadata generation is fully enabled for SEO.
* **🧭 Practice / About (`/practice`):** Circular black-and-white portrait of Manuel Cruchinho framed by custom watercolor background halos, complete Portuguese bio timeline, and vertical curriculum vitae blocks.
* **✉️ Contact (`/contact`):** Lisbon studio details, social coordinates, and a fully interactive form supporting submitting spinner animations and success confirmation overlays.
* **🔐 Visual CMS (`/admin`):** A custom visual dashboard gated behind a secure passphrase screen.

---

## 🛠️ Integrated local-first CMS Architecture

To give the client absolute, zero-friction content management capabilities without database bills or server setups, we engineered a custom, serverless visual CMS:

1. **Local-First Saving API (`/api/save-content`):** In local development mode (`npm run dev`), the CMS writes updates directly back into `src/data/portfolio.json` using Node's filesystem module (`fs.writeFileSync`). Making visual edits and hitting "Save" updates the source files instantly!
2. **Production Exporter:** In production, the file system is read-only. Hitting "Save" triggers an alert and opens the visual **Export JSON** utility, letting the user visually download the edited `portfolio.json` file to easily replace and commit changes.

---

## 🚀 Getting Started

Follow these steps to run the portfolio website and CMS locally:

### 1. Installation
Clone this repository and install all clean dependencies:
```bash
git clone https://github.com/Joaouva/mc_website.git
cd mc_website
npm install
```

### 2. Run the Development Server
Launch the compiler:
```bash
npm run dev
```
Open your browser and navigate to:
* **Website Preview:** `http://localhost:3000`
* **Visual CMS Editor:** `http://localhost:3000/admin`

> [!IMPORTANT]
> **CMS Access Passphrase:** The visual CMS is securely locked. The default passphrases configured in the codebase are **`arquitetura`** or **`mcaStudio`**. (You can modify this check inside `src/app/admin/page.tsx` line 44).

---

## 🏗️ Production Build

To test production compilation, compile Turbopack:
```bash
npm run build
```
This generates a highly optimized static build under `.next` with static pages pre-rendered for maximum loading speed and SEO ranking.
