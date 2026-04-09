# Where's Ilya Repin?

A full-stack **Where's Waldo-style game** built around the paintings of Russian realist master **Ilya Repin**. Find hidden characters across multiple iconic artworks — as fast as you can.

🎮 **[Play it live](https://where-is-ilya-repin.vercel.app/)**

---

## Features

- 🖼️ **Multiple paintings** — each level is a different Repin artwork with unique characters to find
- ⏱️ **Timer** — your time is tracked from the moment you start a level
- 🏆 **Leaderboard** — submit your name and compete for the fastest completion times
- ✅ **Click validation** — the backend verifies character coordinates server-side, preventing cheating

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express |
| Database / ORM | PostgreSQL, Prisma |
| Deployment | Vercel |

---

## How It Works

1. Select a painting to start a level — the timer begins immediately
2. Click on the canvas where you think a target character is hiding
3. A dropdown confirms or rejects your guess (coordinates validated by the API)
4. Find all characters to finish — your time is recorded
5. Submit your name to the leaderboard

---

## Project Structure

```
Where_Ilya_Repin/
├── client/         # React + Vite frontend
└── server/         # Express API + Prisma schema
```


## Author

**Ignacio** · [GitHub](https://github.com/nimbusphagia)
