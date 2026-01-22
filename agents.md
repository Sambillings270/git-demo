# Agent Instructions (Cursor)

## Project
Guest-post marketplace (static site)

## Goal
Build a clean, fast, client-side website that lists guest-post sites and supports:
- search
- filters (DA/DR, traffic, price, spam score, country, niche/category)
- sorting
- pagination
- details view
- export filtered results (CSV)
- contact/request flow via mailto (no backend)

## Tech Constraints
- Pure HTML/CSS/JS only (no React/Next, no backend).
- Data stored in `/data/sites.json`.
- No external build tools required. Must run by opening `index.html` (or via Live Server).

## UX Requirements
- Responsive (mobile-first)
- Clean table view (desktop) + card view (mobile)
- Clear empty states (no results)
- Fast filtering (debounced search)
- Accessible form labels + keyboard-friendly modal

## File Structure
- index.html
- about.html
- contact.html
- /assets/styles.css
- /assets/app.js
- /data/sites.json
- /assets/utils.js (optional)

## Development Steps
1. Create skeleton pages + shared header/footer nav.
2. Implement data loading + render list.
3. Add filters + search + sort.
4. Add pagination + details modal.
5. Add export CSV.
6. Final polish + QA checklist.

## Output Rules
- Keep each step runnable.
- After each milestone, provide a quick test checklist.
