# 🔤 Hangman Word Game

A fun and interactive word-guessing game where players uncover hidden phrases by selecting letters. Featuring responsive animations, category-based word sets, and dynamic win/loss states.

---

## 🎮 Gameplay Preview

* **Playing:** ![Playing the Game](https://ibb.co/sJ3V6MpN)
* **Winning:** ![Win State](https://ibb.co/8Hj2L0G)
* **Losing:** ![Lose State](https://ibb.co/zWGyZhWj)

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
│   ├── carousel/
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
