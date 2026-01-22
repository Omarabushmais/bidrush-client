# 🔨 BidRush Client (React)

This is the **frontend** for **BidRush**, a full-stack auction web application built with **React 19 + Vite**. [cite_start]It enables users to participate in online auctions safely and efficiently[cite: 69].

## 🎯 Description

BidRush provides a secure platform for real-time online bidding. [cite_start]The application connects to an Express.js server and PostgreSQL database[cite: 83].

The app supports two main user roles:

- 👤 **Registered Users**:
  - [cite_start]Browse and bid on active auctions[cite: 70].
  - [cite_start]Create and manage their own auction listings[cite: 77].
  - [cite_start]Track activity via a personal dashboard (active bids, wins, history)[cite: 76].
- 🛠️ **Administrators**:
  - [cite_start]View platform analytics (total users, bids, active auctions)[cite: 80].
  - [cite_start]Manage users (view, suspend accounts)[cite: 81].
  - [cite_start]Moderate content (remove illegal or completed auctions)[cite: 81].

## 🧑‍💻 User Requirements

1. **Authentication**: Secure Login and Registration for all users[cite: 86].
2. **Regular Users**:
   - [cite_start]**Browse**: View active auctions with real-time updates[cite: 90].
   - [cite_start]**Bid**: Place bids on items; the system ensures only valid higher bids are accepted[cite: 96].
   - [cite_start]**Manage**: Create new auctions, edit existing ones, or delete them[cite: 101].
   - [cite_start]**Profile**: Update personal information and password[cite: 104].
3. **Admin Users**:
   - [cite_start]Access a specialized dashboard to oversee platform activity[cite: 80].
   - [cite_start]Maintain platform security by suspending violating users[cite: 81].

## 📂 Project Structure

The project follows a modular structure for better maintainability:

```text
BidRush_Client/
├── public/
├── src/
│   ├── Api/          # API integration logic (Axios setup)
│   ├── assets/       # Static images and global assets
│   ├── Components/   # Reusable UI components
│   ├── Layout/       # Layout wrappers (Navbar, Footer, etc.)
│   ├── Pages/        # Main application pages (Login, Dashboard, Auction Details)
│   ├── App.css       # Global styles
│   ├── App.jsx       # Main App component
│   └── main.jsx      # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Technologies

- **Core**: React 19 + Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Auth**: JWT Decode
- **Linting**: ESLint

## 🚀 Getting Started

```bash
# 1. Go to the folder
cd bidrush-client

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev