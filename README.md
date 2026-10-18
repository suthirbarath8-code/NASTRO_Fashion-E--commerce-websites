# NOSTRA+ New World

A static, three-page fashion storefront built with plain **HTML, CSS and vanilla JavaScript**. The three pages share one stylesheet (`style.css`) and one script (`script.js`). There is no build step, framework or backend. Open the files in a browser and they work.

| Page | Purpose |
| --- | --- |
| `index.html` | Home page: animated hero, curated collection, lookbook, 3D category card stack, auth, cart and favourites |
| `collections.html` | Collections Archive: full product catalogue with filters, search, sorting and quick view |
| `contact.html` | Contact page: background image with mouse-hover parallax, a hover-animated model image and a contact form |
| `style.css` | All styles for the three pages (shared footer + one scoped section per page) |
| `script.js` | All behaviour for the three pages (shared footer script + one block per page) |

---

## Project structure

```
project-folder/
├── index.html
├── collections.html
├── contact.html
├── style.css
├── script.js
├── README.md
│
├── g.jpg                                      # contact page background
├── Fashion Model and Orange Disc Cutouts.png  # hero / contact model image
├── green (1).png, green (2).png               # hero slides / category cards
├── iii.png, i.jpg_2K_20261017150142.jpg       # hero slide / category card
│
├── mj/       # men's jackets and outerwear images
├── mshirt/   # men's shirts
├── wshirt/   # women's shirts
├── mpant/    # pants
├── tshirt/   # t-shirts
└── accero/   # accessories
```

> The three HTML files, `style.css` and `script.js` must stay in the **same folder**. The pages link to each other and to the shared files with relative paths.

### How the shared files are organised

Each page tells the shared files which page it is by putting a class on its `<html>` tag: `page-home`, `page-collections` or `page-contact`.

- **`style.css`** has a SHARED section (the footer) followed by one section per page. Every rule in a page section starts with `:where(.page-xxx)`, so one page's styles never affect another page, and the specificity is unchanged.
- **`script.js`** has a SHARED block (footer back-to-top button) followed by one block per page. A page block only runs when its class is present, and each block keeps its own variables. Functions called from inline `onclick="..."` attributes are exposed on `window` at the end of their block.

When you add a new page, give its `<html>` tag a new class, add a matching section to `style.css`, and add a matching block to `script.js`.

---

## Running locally

**Option 1: open the file.** Double-click `index.html`.

**Option 2: local server (recommended).**

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

No installation is needed. Google Fonts (Cormorant Garamond, Playfair Display, Poppins) load from the web, so an internet connection is required for the intended typography. Some catalogue images in `collections.html` also load from Unsplash.

---

## Features

### Shared across pages
- Responsive navbar with an **animated hamburger** and a slide-in mobile drawer.
- A consistent footer with brand text, social buttons, Company and Customer Care links, contact details, and a back-to-top button.
- Cart, favourites and user sign-in state saved in `localStorage`, shared between `index.html` and `collections.html`.
- Toast notifications and a consistent orange accent colour (`#f26a1b`).

### `index.html` (Home)
- Hero slider with thumbnails, arrows, parallax, and a mouse-follow glow.
- Navbar that turns into a blurred bar after you scroll.
- Curated collection and "Our Works" lookbook sections.
- **3D card deck** (Curated Categories): scatter and stack modes, and a clicked card pops to the centre.
- Auth modal with sign in and sign up, a VIP profile drawer, cart drawer with a fly-to-cart animation, and favourites drawer.
- Floating "Contact Us" tab that links to `contact.html`.
- Opens the sign-in modal automatically when loaded as `index.html#signin`, which is where the "Sign In" buttons on the other pages send you.
- Light and dark mode support through `prefers-color-scheme`.

### `collections.html` (Collections Archive)
- About 60 products across jackets, shirts, pants, t-shirts, shoes, glasses and accessories (the data lives in the `PRODUCTS` array in the script).
- Filters: department, category, price range, colour, size and edition badges. Active filters appear as removable chips.
- Live search, sorting (featured, price, rating, newest) and grid density switcher (4, 3, 2 columns, or list).
- Quick-view modal with size selection, a cart drawer and a wishlist drawer.
- **Mobile:** the filter opens as a compact bottom sheet with collapsible sections and a "Show N pieces" button.
- Supports deep links: `collections.html?gender=men`, `?category=shoes`, `?badge=NEW`, `?search=denim`.

### `contact.html` (Contact)
- Full-screen background image with a subtle **mouse-hover parallax** and no overlay shading.
- One model image with a 3D tilt, float and zoom on hover (hidden on mobile).
- Click-to-copy contact cards and a live "studio open / closed" badge, based on the visitor's local time.
- Contact form with topic chips, floating labels, a character counter, validation with shake feedback, a loading state and an animated success screen.

---

## Data and storage

State is stored in the browser's `localStorage`:

| Key | Contents |
| --- | --- |
| `fplus_cart` | Items in the cart |
| `fplus_favs` | Favourited product names |
| `fplus_user` | Signed-in user (name, email, initials, tier, points) |

Authentication is **simulated on the client**. There is no server and no real accounts or payments. Clearing site data resets everything.

---

## Customisation

**Change images.** Set the paths in the contact page section of `style.css` (search for `--bg-img`):

```css
--bg-img: url("g.jpg");
--model-img: url("Fashion Model and Orange Disc Cutouts.png");
```

**Change the catalogue.** Edit the `PRODUCTS` array in `script.js` (search for `PAGE: COLLECTIONS`). Each product needs `id`, `name`, `gender`, `category`, `price`, `rating`, `reviews`, `color`, `sizes`, `image` and `description`. Category values used are `jacktes` (spelled this way in the code), `shirts`, `pants`, `t-shirt`, `shoes`, `glasses` and `accessories`.

**Change a category card image.** In `index.html`, find the `Card N:` comments inside `deck3dStage`. Each card's `.deck-card-bg-wrap` holds either an `<img>` or an inline SVG that you can replace.

**Change brand colours.** Edit the CSS variables in the `:root:where(.page-xxx)` block at the start of each page section in `style.css` (`--acc`, `--ink` / `--text`, `--teal`).

**Update contact details.** Search for `concierge@nostra-atelier.example`, `+00 000 000 0000` and `Studio Street, Your City` in `contact.html` and in the footer of all three HTML files.

---

## Known placeholders and to-dos

- **Placeholder contact details:** the email, phone and address are examples. Replace them with real ones.
- **Contact form is not connected:** it validates and shows a success screen but sends nothing. Connect it to a service such as Formspree, EmailJS or your own API in the submit handler in `script.js` (search for `PAGE: CONTACT`).
- **Dead links:** the social buttons and the Privacy and Terms links in the footer use `href="#"`. The Customer Care links (Track Your Order, Shipping & Returns, FAQs) currently point to the contact page.
- **Missing `#shop` anchor:** the "Shop All" links, "Shop now" button and empty-cart buttons point to `#shop`, but the current `index.html` has no section with `id="shop"`. Either add the shop grid back with that id, or point those links to `collections.html`.
- **Checkout is a demo:** it only shows a confirmation message. There are no payments or orders.
- Some image filenames contain spaces, dots and parentheses (for example `mj...............jpg`). Renaming them to simple names such as `jacket-01.jpg` is safer for hosting.
- `collections.html` falls back to `Fashion Model and Orange Disc Cutouts.png` if a product image fails to load.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The pages use CSS grid, `backdrop-filter`, CSS variables, `IntersectionObserver` and the Clipboard API. Animations are disabled for users who prefer reduced motion on the contact page.

---

## Credits

- Fonts: [Google Fonts](https://fonts.google.com) (Cormorant Garamond, Playfair Display, Poppins).
- Some catalogue photos are loaded from [Unsplash](https://unsplash.com).
- Icons are inline SVGs in the style of [Lucide](https://lucide.dev).

&copy; 2026 NOSTRA+ New World. All rights reserved.
