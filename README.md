# AWS Demo - Frontend & Backend Connection

A full-stack application demonstrating connection between a Next.js frontend and Node.js backend.

## Project Structure

- `frontend/` - Next.js application with React components
- `backend/` - Node.js HTTP server with API endpoints

## Features

- **GET Request**: Frontend fetches "Hello from backend!" message
- **PUT Request**: Frontend sends data to backend and displays response
- **CORS Support**: Proper cross-origin handling for browser requests

## Getting Started

### Backend
```bash
cd backend
node index.js
```
Server runs on http://127.0.0.1:5000

### Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:3000

## API Endpoints

- `GET /api/hello` - Returns a welcome message
- `PUT /api/update` - Accepts JSON data and returns confirmation

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Node.js (vanilla HTTP server)
- **Features**: CORS handling, JSON communication
