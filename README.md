# Eclipso

**Align Your Habits, Unlock Your Potential.**

Eclipso is a cosmic-themed habit tracker that gamifies your daily routines, helping you stay consistent and reach your goals in an engaging way.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Eclipso">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#folder-structure">Folder Structure</a></li>
        <li><a href="#color-palette">Color Palette</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="# environment-variables">Environment Variables</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#future-enhancements">Future Enhancements</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
  </ol>
</details>

## Features

- 🚀 **Track Habits** – Stay on top of your daily routines.
- 🌌 **Gamification** – Earn streaks and rewards for consistency.
- 📈 **Progress Visualization** – Circular progress tracking on your profile.
- 📚 **Self-Improvement Articles** – Explore insights on habits, time management, and productivity.
- 🎨 **Minimalist UI** – Clean and phone-responsive interface.

## Tech Stack

[![Tech Stack](https://skillicons.dev/icons?i=vite,ts,tailwind,prisma,mongodb,nextjs,react,css)](https://skillicons.dev)

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Authentication:** NextAuth.js
- **Fonts:**
  - Flazie
  - Absans

## Folder Structure

```
eclipso/
│── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── habits/
│   │   ├── profile/
│   │   ├── articles/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── utils/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│── public/
│── .gitignore
│── next.config.mjs
│── package.json
│── README.md
│── tailwind.config.mjs
```

## Color Palette

| Color             | Hex Code  | Description |
| ----------------- | --------- | ----------- |
| Background        | `#262627` | Dark Gray   |
| Text              | `#FFFFFF` | White       |
| Text (Accent)     | `#F5A9B8` | Soft Pink   |
| Cards             | `#505050` | Muted Gray  |
| Buttons & Borders | `#303030` | Deep Gray   |

# Getting Started

## Environment Variables

The following environment variables are required and must be stored in an `.env` file:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/jane-does-coding/eclipso.git
   ```
2. Navigate to the project directory:
   ```sh
   cd eclipso
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Future Enhancements

- 🌠 Dark & Light Mode
- 🏆 Achievement System
- 📅 Calendar View
- 🔔 Habit Reminders

---

Made with 💫 by [Jane Doe](https://github.com/jane-does-coding).

## Screenshots

<img width="1209" alt="Screenshot 2025-03-14 at 10 31 27 PM" src="https://github.com/user-attachments/assets/f47cc1f7-827f-4577-986f-d7b92f55ded2" />

<details>
    <summary>Click to open the rest</summary>
    <img width="1209" alt="Screenshot 2025-03-14 at 10 31 50 PM" src="https://github.com/user-attachments/assets/56b1018c-b088-47dd-85bb-f73ad03e0599" />
    <img width="375" alt="Screenshot 2025-03-14 at 10 32 39 PM" src="https://github.com/user-attachments/assets/209c17c3-f718-4a48-8896-d349fbf3dc1b" /><img width="375" alt="Screenshot 2025-03-14 at 10 32 46 PM" src="https://github.com/user-attachments/assets/dd133c89-e9d0-43d9-ba2f-ae33d40b2b23" />
</details>
