# Smart Ration Shop Management System

React Native (Expo) mobile app for the Smart Ration Shop Management System — a government-style ration distribution platform with AI voice assistant, IoT stock monitoring, and real-time updates.

## Architecture

```
PostgreSQL Database
        ▲
        │
Node.js + Express APIs
        ▲
┌───────┼───────────────┐
│       │               │
▼       ▼               ▼
React Native   React Web   ESP32 IoT
Mobile App     Dashboard   Sensors
        │
        ▼
AI Voice Assistant
```

## Project Structure

```
src/
├── assets/          # Images, fonts
├── components/      # Reusable UI components
├── navigation/      # Auth + role-based navigators
├── screens/
│   ├── auth/        # Splash, Login, OTP, Register, Role Selection
│   ├── citizen/     # Quota, Complaints, Voice Assistant
│   ├── shopkeeper/  # Scan QR, Issue Ration, Stock
│   ├── district/    # Shop & Stock Monitoring, Analytics
│   └── stateAdmin/  # User, Shop, District Management
├── services/        # API, Auth, Socket.IO
├── hooks/           # Custom React hooks
├── context/         # Auth & Theme providers
├── store/           # Lightweight app state
├── utils/           # Formatters, offline storage
├── constants/       # Routes, config
└── types/           # TypeScript types
```

## Getting Started

```bash
cd smart-ration-shop
npm install
npm start
```

Demo login: any 10-digit phone number + OTP `123456`

## Development Roadmap

| Phase | Focus |
|-------|-------|
| **Phase 1** | Authentication, Navigation, Citizen Module |
| **Phase 2** | Shopkeeper, District Officer, State Admin modules |
| **Phase 3** | Node.js backend, PostgreSQL, JWT, Axios |
| **Phase 4** | Socket.IO, AI Voice Assistant, ESP32, Push notifications |

## Features

- Role-based navigation (Citizen, Shopkeeper, District Officer, State Admin)
- Material Design 3 green/white government theme + dark mode
- Offline queue & local cache utilities
- Socket.IO service scaffold for real-time updates
- Tamil & English voice assistant placeholder

## Environment Variables

Create a `.env` file:

```
EXPO_PUBLIC_API_URL=http://localhost:4000/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:4000
```
