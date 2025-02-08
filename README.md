# 🎬 UpMovie

<div align="center">

![UpMovie Banner](https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png)

A Netflix-inspired movie discovery platform built with modern web technologies.

[![Author](https://img.shields.io/badge/author-nogoezen-E50914.svg?style=for-the-badge)](https://github.com/nogoezen)
[![License](https://img.shields.io/badge/license-MIT-E50914.svg?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/nogoezen/upmovie?color=E50914&style=for-the-badge)](https://github.com/nogoezen/upmovie/stargazers)

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Screenshots](#screenshots)

</div>

## ✨ Features

### Core Features
- 🎯 **Intuitive Navigation** - Netflix-inspired interface with smooth transitions
- 🌙 **Dark Theme** - Elegant dark theme for comfortable viewing
- 📱 **Responsive Design** - Perfect experience on any device
- 🔍 **Smart Search** - Real-time movie search with debouncing

### Movie Discovery
- 🔥 Browse popular, top-rated, upcoming, and now playing movies
- 🎭 Filter movies by genres
- ⭐ View detailed movie information including ratings, cast, and crew
- 📊 See movie statistics like budget, revenue, and runtime
- 🎬 Watch trailers and related videos
- 💫 Get personalized movie recommendations

### User Experience
- 🚀 Fast and responsive interface
- 💾 Persistent user preferences
- 🌐 Integration with TMDB API
- 📈 Infinite scroll for movie lists
- 🎨 Beautiful animations and transitions

## 🛠️ Tech Stack

### Core
- ⚛️ **Next.js 14** - React framework for production
- 🎨 **Material-UI v5** - UI component library
- 🔄 **Redux Toolkit** - State management
- 🎯 **TypeScript** - Type safety
- 🚀 **RTK Query** - API data fetching

### Styling & UI
- 💅 **Emotion** - CSS-in-JS styling
- 🎭 **Material Icons** - Beautiful icon set
- 📱 **Responsive Design** - Mobile-first approach

### APIs & Services
- 🎬 **TMDB API** - Movie database
- 🔄 **Axios** - HTTP client

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/nogoezen/upmovie.git
cd upmovie
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Copy the example environment file
cp .env.example .env
```

Then edit `.env` and add your API keys:
- Get your TMDB API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- Get your Alan AI key from [https://alan.app/](https://alan.app/)

Required environment variables:
```env
NEXT_PUBLIC_TMDB_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_ALAN_SDK_KEY=your_alan_ai_key_here
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📸 Screenshots

<div align="center">
<img src="screenshots/home.png" alt="Home Screen" width="45%">
<img src="screenshots/movie-details.png" alt="Movie Details" width="45%">
</div>

## 📁 Project Structure

```
src/
├── components/     # React components
├── services/      # API services
├── store/         # Redux store
├── theme/         # MUI theme
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nogoezen**
- GitHub: [@nogoezen](https://github.com/nogoezen)

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their excellent API
- Netflix for design inspiration
- The open-source community

---

<div align="center">
Made with ❤️ by <a href="https://github.com/nogoezen">Nogoezen</a>
</div>
