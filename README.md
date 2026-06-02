# 🎬 MovieStream App

A beautiful **Movie Streaming App** built with **React Native + Expo**.

Netflix-style dark theme UI with smooth navigation and modern design.

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| **Home** | Featured banner, trending carousel, category rows |
| **Search** | Search by title/actor/director, genre browse |
| **Movie Detail** | Backdrop, info, cast, play button |
| **Player** | Video player with controls overlay |
| **Favorites** | Saved movies grid |
| **Profile** | User profile, stats, settings |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for emulator)
- **Or** Expo Go app on your phone (easiest!)

### Installation

```bash
# 1. Navigate to project folder
cd MovieStreamApp

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

### Run on Device (Easiest!)

1. Install **Expo Go** on your phone:
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Run `npx expo start`

3. Scan the QR code with:
   - Android: Expo Go app
   - iOS: Camera app

### Run on Emulator

```bash
# Android
npx expo start --android

# iOS (Mac only)
npx expo start --ios
```

---

## 📁 Project Structure

```
MovieStreamApp/
├── App.js                    # Main entry point
├── package.json              # Dependencies
├── navigation/
│   └── AppNavigator.js       # Stack + Tab navigation
├── screens/
│   ├── HomeScreen.js         # Home with featured & categories
│   ├── SearchScreen.js       # Search with genre chips
│   ├── MovieDetailScreen.js  # Movie details page
│   ├── PlayerScreen.js       # Video player UI
│   ├── FavoritesScreen.js    # Favorites grid
│   └── ProfileScreen.js      # User profile & settings
├── components/
│   ├── MovieCard.js          # Reusable movie card
│   └── CategoryRow.js        # Horizontal category row
├── data/
│   └── movies.js             # Mock movie data (18 movies)
├── styles/
│   └── colors.js             # Theme, colors, spacing constants
└── assets/                   # Images & icons (add your own)
```

---

## 🎨 Features

- ✅ Dark Netflix-style theme
- ✅ Featured movie banner with gradient overlay
- ✅ Horizontal scrolling category rows
- ✅ Movie search with genre quick-access
- ✅ Movie detail page with cast & rating
- ✅ Video player with controls overlay
- ✅ Favorites & Profile screens
- ✅ Bottom tab navigation
- ✅ Smooth screen transitions
- ✅ 18 mock movies across 8 categories

---

## 🔧 Next Steps (Customize!)

When you're ready to enhance the app, consider adding:

- [ ] Real video playback with `expo-av`
- [ ] API integration (TMDB API for real movie data)
- [ ] User authentication
- [ ] Favorites save with `AsyncStorage`
- [ ] Push notifications
- [ ] Download for offline viewing
- [ ] Multi-language support (Myanmar language!)
- [ ] Splash screen with `expo-splash-screen`

---

## 📡 API Integration (TMDB)

To use real movie data, get a free API key from [The Movie Database](https://www.themoviedb.org/api):

1. Sign up at TMDB
2. Get your API key
3. Replace mock data with API calls:

```javascript
const TMDB_API_KEY = 'your_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrending = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  return response.json();
};
```

---

Built with ❤️ using React Native + Expo
