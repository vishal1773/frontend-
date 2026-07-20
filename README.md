# Smart Ration Shop

Smart Ration Shop is a full-stack mobile application for managing public-distribution ration services. It gives citizens, shopkeepers, district officers, and state administrators role-specific access to the information and actions they need.

The project includes an Expo/React Native mobile client and an Express, TypeScript, Prisma, and PostgreSQL API.

## Features

- Role-based registration, login, OTP verification, and session management
- Citizen dashboard, quota details, transactions, complaints, notifications, and profile
- Shopkeeper dashboard, beneficiary scanning, ration issuing, stock tracking, reports, and profile
- District officer and state administrator dashboards for monitoring shops, stock, users, and districts
- API modules for assistant/chat and IoT stock or sensor data
- JWT authentication, password hashing, rate limiting, CORS, Helmet security headers, and structured logging

## Technology

| Area | Tools |
| --- | --- |
| Mobile app | Expo, React Native, TypeScript, React Navigation, React Native Paper |
| API | Node.js, Express, TypeScript |
| Data | PostgreSQL, Prisma |
| Authentication | JWT, bcrypt, OTP |

## Project structure

```text
.
├── src/                 # Expo mobile app source
├── App.tsx              # App entry point
├── backend/
│   ├── src/             # Express API source
│   └── prisma/          # Database schema and seed script
├── package.json         # Mobile app scripts and dependencies
└── backend/package.json # Backend scripts and dependencies
```

## Prerequisites

- Node.js 18 or later
- npm
- PostgreSQL (for persistent backend data)
- Expo Go on a device, or an Android/iOS emulator

## Run the mobile app

```bash
npm install
npm start
```

Then scan the Expo QR code with Expo Go, or run one of the platform commands:

```bash
npm run android
npm run ios
npm run web
```

To check TypeScript types:

```bash
npm run typecheck
```

## Run the backend

1. Create a PostgreSQL database.
2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create `backend/.env` with the following values. Use strong, unique values for both JWT secrets.

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/smart_ration_shop?schema=public"
   JWT_ACCESS_SECRET="replace-with-a-secret-of-at-least-32-characters"
   JWT_REFRESH_SECRET="replace-with-a-different-secret-of-at-least-32-characters"
   JWT_ACCESS_TTL=15m
   JWT_REFRESH_TTL=30d
   OTP_TTL_MINUTES=10
   CORS_ORIGIN=*
   LOG_LEVEL=info
   ```

4. Generate the Prisma client, run migrations, and optionally seed the database:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The API listens on `http://localhost:5000` by default. Confirm it is available at:

```text
GET /health
```

## API routes

| Route prefix | Purpose |
| --- | --- |
| `/api/auth` | Registration, login, OTP, token refresh, and logout |
| `/api/citizen` | Citizen dashboard, quota, complaints, profile, and notifications |
| `/api/shopkeeper` | Beneficiaries, ration issue, stock, reports, and shopkeeper dashboard |
| `/api/officer` | District monitoring and analytics |
| `/api/admin` | State administration for users, shops, and districts |
| `/api/assistant` | Assistant chat, voice, and history |
| `/api/iot` | IoT devices, stock, and sensor data |

## Mobile-to-API configuration

The app currently uses `http://127.0.0.1:5000/api` in `src/services/api.ts`.

- For the web client or iOS simulator, this address usually works as-is.
- For an Android emulator, use `http://10.0.2.2:5000/api`.
- For a physical device, use your computer's LAN IP address, such as `http://192.168.1.10:5000/api`, and ensure the device can reach your computer.

## License

This project is available under the [MIT License](LICENSE).
