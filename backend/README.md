# Smart Ration Shop Management Backend

## Overview
This backend provides a production-ready Node.js + Express + TypeScript foundation for the Smart Ration Shop Management System with Prisma and PostgreSQL.

## Architecture
- MVC-style structure under src/
- Prisma models for users, shops, ration cards, transactions, complaints, notifications, OTPs, refresh tokens, IoT devices, and chat
- Role-based authentication for citizen, shopkeeper, district officer, and state admin

## Main modules
- Authentication: register, login, OTP, refresh token, logout
- Citizen APIs: dashboard, quota, transactions, complaints, notifications, profile
- Shopkeeper APIs: dashboard, scan beneficiary, issue ration, stock, reports
- District Officer APIs: dashboard, shops, stock monitoring, analytics
- State Admin APIs: dashboard, users, shops, districts
- Assistant APIs: chat, voice, history
- IoT APIs: device registration, stock data, sensor data, live stock

## Setup
1. Create a PostgreSQL database.
2. Copy .env.example to .env and fill in the values.
3. Run `npx prisma migrate dev --name init`.
4. Run `npm run prisma:seed`.
5. Start the server with `npm run dev`.

## API base
- Health: /health
- Auth: /api/auth
- Citizen: /api/citizen
- Shopkeeper: /api/shopkeeper
- Officer: /api/officer
- Admin: /api/admin
- Assistant: /api/assistant
- IoT: /api/iot
