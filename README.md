# Rental Platform (Frontend)

A React + TypeScript + Vite frontend for a rental marketplace. The codebase is organized by feature (auth, bookings, payments, properties) and role (guest, host), with shared UI components, Zustand stores, and an Axios-based API layer.

## Tech stack
- React 19 + TypeScript 5
- Vite 7 (dev server, build, preview)
- React Router (client-side routing)
- Zustand (state management)
- Axios (API calls)
- Tailwind CSS + PostCSS (styling)
- Formik + Yup (forms + validation)
- date-fns, framer-motion, react-toastify, react-icons

## Getting started
1. Install dependencies
   - `npm install`
2. Configure environment variables
   - Create/update `.env` at the project root.
   - Required variables:
     - `VITE_API_BASE_URL` (base URL for the backend API)
3. Start the dev server
   - `npm run dev`

The Vite dev server runs on port `5173` and will open a browser automatically.

## Scripts
- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Project structure
```
public/
src/
  api/
    axiosInstance.ts
    auth.api.ts
    booking.api.ts
    favorite.api.ts
    inquiry.api.ts
    payment.api.ts
    property.api.ts
    user.api.ts
  assets/
    styles/
      global.css
      variable.css
  components/
    common/
      Button.tsx
      Input.tsx
      Loader.tsx
      Modal.tsx
    features/
      auth/
      bookings/
      favorites/
      payments/
      properties/
    layout/
      Footer.tsx
      MainLayout.tsx
      Navbar.tsx
      Sidebar.tsx
    ui/
      ImageSlider.tsx
      PriceTag.tsx
      PropertyCard.tsx
  data/
    mock-database.json
  hooks/
    useAuth.ts
    useDebounce.ts
    useFetch.ts
    useRole.ts
  pages/
    guest/
      BrowseProperties.tsx
      Favorite.tsx
      GuestDashboard.tsx
      myBooking.tsx
    host/
      Booking.tsx
      HostDashboard.tsx
      MyProperties.tsx
      ReportPage.tsx
    public/
      LandingPage.tsx
      NotFound.tsx
      Unauthorized.tsx
    shared/
      EditProfile.tsx
      inquiry.tsx
      Profile.tsx
      PropertyDetails.tsx
  routes/
    AppRoutes.tsx
    ProtectedRoutes.tsx
    RoleRoute.tsx
  services/
    analytics.service.ts
    notification.service.ts
    storage.service.ts
  store/
    auth.store.ts
    user.store.ts
  utils/
    calculatePrice.ts
    constants.ts
    formatDate.ts
    validateForm.ts
  App.tsx
  index.css
  main.tsx
  tailwind.config.cjs
vite.config.ts
```

## App flow overview
- `main.tsx` mounts the app and sets up `BrowserRouter`.
- `App.tsx` is the root component.
- `routes/` contains scaffolding for route guards and role-based routing.
- `pages/` are grouped by user role and visibility.
- `components/` holds reusable UI and feature components.
- `api/` and `services/` organize API calls and helper services.
- `store/` keeps global state with Zustand.

## Path aliases
The alias `@` maps to `/src` (configured in `vite.config.ts` via `vite-tsconfig-paths`).

Example:
```
import { Button } from "@/components/common/Button";
```

## Notes
- Tailwind config lives in `src/tailwind.config.cjs` and is referenced by `src/index.css`.
- `AppRoutes.tsx` and `pages/index.ts` are currently empty scaffolds.
