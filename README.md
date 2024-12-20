# AnimeQuotes
AnimeQuotes is a React.js web app that displays random quotes from various anime. The app relies on a simple backend server built with Express.js, which fetches both a random anime quote and an associated anime image. The app uses two APIs: [AnimeChan](https://animechan.io/) for the quotes and [Jikan](https://jikan.moe/) for the anime images.


# Features
- Random Anime Quotes: Displays random quotes from various anime, along with the character who said each quote.
- Like Quotes: Users can like quotes, with a like button.
- Dark/Light Mode: Toggle between dark and light modes, with settings that persist even after a browser refresh (app currently utilizes local storage to remember last selected theme).
- Quote Animation: Smooth animations when displaying a new random quote.
- AnimeChan API Integration: The app currently fetches quotes using the free AnimeChan API, which is limited to 20 requests per hour.

# Demo
https://github.com/user-attachments/assets/e3184132-a0cc-4de4-8d7b-0b2b4b04d7e1


# Setup:
- run `npm i && npm run dev`
