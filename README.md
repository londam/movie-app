# 🎬 Movie App

A fully functional movie browsing web app built with **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, **Redux Toolkit**, and **TMDB API** — containerized with **Docker** and tested using **Vitest** and **Testing Library**.

---

## 🚀 Features

- ✨ Home Page with newest movies, popular genres, top streaming movies
- ✨ Most Watched Page with infinite scroll and filters
- ✨ Movie Details Modal & Full Page
- ✨ Favorites Management with Redux + localStorage persistence
- ✨ Search with live dropdown, keyboard navigation, and optimized API calls
- ✨ Fully responsive (Mobile, Tablet, Desktop)
- ✨ Unit and integration tests
- ✨ Dockerized for deployment

---

## 👩‍💻 Tech Stack

- **Framework:** Next.js 14 App Router
- **Styling:** TailwindCSS, Shadcn-UI
- **State Management:** Redux Toolkit
- **API Communication:** TMDB (The Movie Database)
- **Testing:** Vitest, Testing Library
- **Containerization:** Docker, Docker Compose

---

## 📂 Project Structure

```
src/
├── app/              # Pages and routing
├── components/       # Reusable components
├── lib/              # API communication, services, utilities
├── store/            # Redux store and slices
├── styles/           # Global styles (Tailwind)
├── types/            # TypeScript types
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
(Get your API key at [TMDB Developers](https://developer.themoviedb.org/))

### 3. Run Locally
```bash
npm run dev
```
App available at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Docker Instructions

### 1. Build Docker Image
```bash
docker build -t movie-app .
```

### 2. Run Docker Container
```bash
docker run -p 3000:3000 --env-file .env.local movie-app
```

Or with Docker Compose:
```bash
docker-compose up --build
```

---

## 🧪 Testing Instructions

### Run All Tests
```bash
npm run test
```

**Tested Units:**
- Components: SearchBar, FavoritesMenu, FavoriteButton, MovieCard
- Utilities: api.ts, utils.ts, image.ts, movie-service.ts

Test coverage includes typing simulation, dropdown interactions, Redux actions, routing behavior, etc.

---

## 🔄 Assignment Checklist

| # | Requirement | Status | Notes |
|:-|:------------|:------:|:------|
| 1 | Public API (TMDB) usage | ✅ | Using `https://api.themoviedb.org/3` |
| 2 | Home Page Features | ✅ | Newest, top 3 streaming, genres (horizontal scroll), favoriting implemented |
| 3 | Most Watched Page with Infinite Scroll and Filters | ✅ | Infinite scroll + genre, year, score filters |
| 4 | Movie Details Page with All Info | ✅ | Banner, poster, description, score, genres, duration, country, cast |
| 5 | Navbar everywhere | ✅ | Favorites dropdown, live search from any page |
| 6 | Favorites Dropdown Working | ✅ | Shows movies with navigation links |
| 7 | Searchbar Live Update and Navigation | ✅ | Debounced search, up/down arrows, Enter redirects |
| 8 | Responsive Design | ✅ | Mobile, tablet, desktop fully responsive |
| 9 | Browser Caching | ✅ | Using TMDB caching headers and redux-persist (localStorage) |
| 10 | Code Best Practices | ✅ | Component reusability, clean structure |
| 11 | Dockerized with Docker Compose | ✅ | Dockerfile + docker-compose.yml included |
| 12 | Documentation | ✅ | You are reading it! |
| 13 | Modern JS (ES6+) | ✅ | Async/await, spread, destructuring, etc. |

---

## 📦 Scripts

| Command | Purpose |
|:--------|:--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build production |
| `npm run start` | Start production server |
| `npm run lint` | Lint code |
| `npm run test` | Run unit/integration tests |

---

## ✨ Credits

- Movie data by [TMDB](https://www.themoviedb.org/)
- Built with ❤️ using Next.js, TailwindCSS, Redux Toolkit

---

## 📅 License

This project is licensed under the MIT License.

---

# 🔗 Folder Structure (Important Files Only)

```
├── .env.local
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── src
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── store/
│   ├── styles/
│   └── types/
```
# 🧠 Future Improvements / Known TODOs

- Add unit tests for MovieDropdownList directly.

- Add more integration tests (full user flows like searching & favoriting combined).

- Improve error handling when TMDB API fails.

- Implement graceful fallbacks for missing images/posters.

- Add loading skeletons for better perceived performance.

- Add Lighthouse performance audit improvements (optional).

- Enhance mobile UX for dropdowns and modals.
