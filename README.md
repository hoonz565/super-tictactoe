# Super Tic Tac Toe

A strategic web-based implementation of **Super Tic Tac Toe** (also known as Ultimate Tic Tac Toe). Unlike the classic game, this version requires players to think multiple steps ahead as every move dictates where the opponent can play next.

## 🎮 How it Works
The game is played on a large 3x3 grid, where each square contains a smaller 3x3 Tic Tac Toe board.
- **The Goal:** Win 3 small boards in a row to win the main game.
- **The Rule:** If you place an 'X' in the top-right corner of a small board, your opponent *must* play their next move in the top-right small board of the large grid.
- **Strategic Depth:** You aren't just trying to win a square; you are trying to force your opponent into a board they can't win.

## ✨ Features
- **Player vs. Player (PvP):** Local multiplayer support.
- **Interactive Tutorial:** An overlay guide helps new players understand the rules before starting.
- **Smart UI:**
  - **Dynamic Highlighting:** Green zones show exactly where valid moves can be made.
  - **Light Mode:** A clean, modern, and accessible color scheme.
  - **Visual Feedback:** Boards light up when won or drawn.

## 🛠️ Tech Stack
- **HTML5** (Structure)
- **CSS3** (Styling, CSS Grid, Flexbox)
- **JavaScript** (Game logic, DOM manipulation)
- No external frameworks or libraries used.

## 🚀 How to Play
\[[You can click here to play](https://hoonz565.github.io/super-tictactoe/)\]