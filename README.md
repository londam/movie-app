Folder structure

src/
│
├── app/
│ ├── (pages will go here)
│
├── components/
│ ├── ui/ # shadcn/ui components go here
│ ├── common/ # shared small UI bits (buttons, cards, etc.)
│ ├── navbar/ # all navbar-related components
│ ├── movie/ # movie-specific components (like MovieCard)
│ ├── search/ # search bar, live results
│ ├── favorites/ # favorites dropdown etc.
│ ├── skeletons/ # loading skeleton components
│
├── features/
│ ├── favorites/ # favorite state logic
│ ├── movies/ # API calls, movie types
│
├── hooks/
│ ├── useFavorites.ts
│ ├── useDebounce.ts
│
├── lib/
│ ├── api.ts # Axios instance setup
│ ├── utils.ts # (optional) general helpers like `cn` for classNames
│
├── public/
│ ├── images/ (optional: for logos, placeholders)
│
├── styles/
│ ├── globals.css
│ ├── theme.css (later if we want custom themes)
│
├── tests/
│ ├── (unit and component tests later)
