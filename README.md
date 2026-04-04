# 📅 Tempo - Your Ultimate Smart Calendar

Welcome to **Tempo**, a modern, high-performance calendar application built for users who value speed, clarity, and a seamless scheduling experience. 🚀

---

## ✨ Key Features

* **📅 Multiple Perspectives** – Switch instantly between **Day**, **Week**, and **Month** views to visualize your time exactly how you want it.
* **➕ Effortless Event Management** – Create and edit events with a polished modal interface and distinct categorical badges.
* **🧭 Intuitive Navigation** – Jump through dates using the **Mini Calendar** sidebar or quick-access header controls.
* **🔒 Secure Authentication** – Robust sign-up and sign-in workflows powered by **Supabase**.
* **📱 Mobile-First Design** – Fully responsive layout that looks stunning on desktops, tablets, and smartphones.
* **🔔 At-a-Glance Dashboard** – A dedicated section for **Upcoming Events** so you never miss a beat.

---

## 🛠️ Tech Stack

Tempo is built with a cutting-edge frontend stack for maximum developer velocity and app performance:

* **Core**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
* **Date Logic**: [Day.js](https://day.js.org/)
* **Backend & Auth**: [Supabase](https://supabase.com/)
* **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

---

## 📂 Project Structure

```text
src/
 ├── 🏗️ components/
 │    ├── calendar/    # Core logic (DayView, WeekView, MonthView)
 │    └── ui/          # Reusable Radix-based components
 ├── ⚓ hooks/         # use-calendar-store & responsive hooks
 ├── 📄 pages/         # CalendarPage, SignIn, and SignUp
 └── 🌐 services/      # Supabase API integration layer