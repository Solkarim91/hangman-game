# 🔤 Hangman Word Game

A fun and interactive word-guessing game where players uncover hidden phrases by selecting letters. Featuring responsive animations, category-based word sets, and dynamic win/loss states.

---

## 🎮 Gameplay Preview

* **Playing:** <br>
![Playing the Game](https://i.ibb.co/Cs0HMTpY/Playing-gif.gif) 
* **Winning:** <br>
![Win State](https://i.ibb.co/pS3ZBxN/Game-won-gif.gif)
* **Losing:** <br>
![Lose State](https://i.ibb.co/hxDPVRxh/Game-lost-gif.gif)

---

## ✨ Features

* ✅ Dynamic category-based word generation
* 🎯 Responsive keyboard input
* ❤️ Lives-based gameplay mechanics
* 🔠 Animated tiles for letter reveals
* 🎉 Confetti celebration on win
* 🔁 Replay or select a new category
* 📱 Mobile-optimized layout

---

## 🛠️ Tech Stack

* **React** + **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS** for styling
* **Framer Motion** for animations
* **Canvas Confetti** for win effects

---

## ⚙️ Getting Started

Clone the repository:

```bash
git clone git@github.com:Solkarim91/hangman-game.git
cd hangman-game
```

Install dependencies:

```bash
cd ui
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start playing.

---

## 📁 Project Structure

```
├── app/
├── components/
│   ├── category-carousel/
│   ├── game/
│   ├── nav/
│   ├── ui/
├── hooks/
│   └── use-game-logic.ts
├── lib/
├── public/
```

---

## 🛣️ Roadmap

* [ ] Add difficulty level selector
* [ ] Track player stats (wins/losses)
* [ ] Improve accessibility (ARIA roles, screen reader support)
* [ ] Improved responsive layout for larger screen sizes
* [ ] Deploy live demo
