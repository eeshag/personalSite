# Eesha Site

This project now uses Vite for development and production builds.

## Scripts

- `npm run dev`: start the frontend and backend together for local development
- `npm run dev:client`: start only the Vite dev server
- `npm run dev:server`: start only the backend API server
- `npm start`: start only the Vite dev server
- `npm run build`: create a production build in `build/`
- `npm run preview`: preview the production build locally
- `npm test`: run the Vitest test suite

## Local AI Search

- Start both frontend and backend with `npm run dev`
- In local development, the frontend calls `/api/answer` and Vite proxies that to `http://localhost:3002` by default
- To use a different backend target in dev, set `VITE_SITE_AI_PROXY_TARGET`

## Notes

- Static assets remain in `public/`.
- The production output directory is `build/` to match the previous CRA deployment path.
