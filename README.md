# WanderLog

WanderLog is a simple mobile app built with **Expo Router** and **React Native**.  
It’s designed as a personal logging tool where you can create, edit, and manage entries, while also keeping a profile with your name and avatar. The app supports **dark mode** and saves your preferences locally so they stick between sessions.

---

## Features

- **Authentication (mock)**  
  Basic login flow with a stored session token using `expo-secure-store`.

- **Profile Management**  
  Save your name and avatar image. Data is stored in `AsyncStorage` so it persists across app restarts.

- **Entries**  
  - List all entries  
  - Create new entries  
  - Edit or delete existing entries  
  - Each entry screen respects global dark mode

- **Dark Mode**  
  Toggle dark mode in Settings. The preference is saved and restored automatically.

- **Settings**  
  - Dark mode toggle  
  - Reset all local data  
  - Logout option (clears session and profile, returns to landing)

- **Navigation**  
  - Tab bar with multiple screens (Entries, Profile, Settings, plus placeholders for future tabs)  
  - Stack navigation inside the Entries section (list, new, detail)

---

## Tech Stack

- [React Native](https://reactnative.dev/)  
- [Expo Router](https://expo.github.io/router/docs)  
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)  
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)  
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)  

---

## Project Structure
app/ _layout.tsx          # Root layout with providers landing.tsx          # Welcome screen login.tsx            # Login screen (tabs)/ _layout.tsx        # Bottom tab bar entry/ _layout.tsx      # Entry stack layout index.tsx        # Entries list new.tsx          # New entry [id].tsx         # Entry detail/edit profile.tsx        # Profile screen settings.tsx       # Settings screen hooks/ useEntries.tsx       # Entries context useTheme.tsx         # Dark mode context


---

## How to Run

1. Install dependencies:
   ```bash
   npm install

2. Start the app:
   npx expo start

3. Open in Expo Go or run on a simulator.

---

Notes- This project uses a mock login (no backend).
- Profile and entries are stored locally only.
- Dark mode is global and saved in AsyncStorage.
- The tab bar and headers adapt to dark mode automatically.



