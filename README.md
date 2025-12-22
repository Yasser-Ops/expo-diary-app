# WanderLog

WanderLog is a full-stack mobile journaling app built with **Expo Router** on the client and **Express + Prisma** on the backend (MongoDB datasource by default). Authentication, entries, and profiles now live on the server; the client handles dark mode locally.

---

## Features

- Authentication with JWT (login/register) and hashed passwords
- Entries: list, create, update, delete (scoped per user)
- Profile: update name and avatar URL through the API
- Protected tabs after login, global dark mode toggle

---

## Tech Stack

- Frontend: React Native (Expo), Expo Router, SecureStore, ImagePicker
- Backend: Express, Prisma, MongoDB (swap to Supabase/Postgres if desired)
- Auth: JWT, bcrypt

---

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment:
   - Copy `.env.example` to `.env`.
   - Set `DATABASE_URL` (Mongo URI by default), `JWT_SECRET`, and `BCRYPT_SALT_ROUNDS`.
3. Generate Prisma client and push the schema:
   ```bash
   npm run prisma:generate
   npm run prisma:db:push
   ```
4. Run the API:
   ```bash
   npm run dev
   ```
   The server defaults to `http://localhost:4000`.

---

## Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Point the app at your backend by setting `EXPO_PUBLIC_API_URL` (falls back to `http://localhost:4000`):
   ```bash
   EXPO_PUBLIC_API_URL=http://your-host:4000
   ```
3. Start the app:
   ```bash
   npx expo start
   ```

---

## Notes

- Tabs are protected; unauthenticated users are redirected to `/login`.
- Entries and profiles are stored on the backend; only theme preference stays in local storage.
