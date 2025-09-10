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

### Environment Setup

Environment variables are already configured in:
- `backend/.env` - Backend server configuration
- `frontend/.env` - Frontend API endpoint configuration

You can modify these files to change URLs and ports as needed.

### Backend
```bash
cd backend
npm install
node index.js
```
Server runs on http://127.0.0.1:5000

### Frontend
```bash
cd frontend
npm install
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

## Manual Lambda + API Gateway Deployment (No Amplify Backend)

Steps to deploy the backend independently:

1. Package Lambda code (from repo root or backend folder):
	- Install prod deps (none currently) and create zip:
	  ```powershell
	  cd backend
	  npm install --omit=dev
	  npm run package:lambda
	  ```
	  Output: `backend/dist/lambda.zip` (contains `lambda.js` + `node_modules` if any).
2. Create Lambda in AWS Console:
	- Runtime: Node.js 20.x
	- Handler: `lambda.handler`
	- Upload `dist/lambda.zip`
	- Set environment variable: `FRONTEND_URL = https://<your-amplify-domain>` (add localhost for testing if needed).
3. Create API Gateway (HTTP API or REST):
	- Routes: `GET /api/hello`, `PUT /api/update` pointing to the Lambda.
	- Enable CORS (Origins: your Amplify domain + http://localhost:3000; Methods: GET,PUT,OPTIONS; Headers: Content-Type).
4. Note the Invoke URL; in Amplify Console set env var `NEXT_PUBLIC_BACKEND_URL` to that base (no trailing slash).
5. Re-deploy frontend via Amplify so it picks up the new env var.
6. Test:
	- `GET <invoke-url>/api/hello`
	- `PUT <invoke-url>/api/update` with JSON `{ "value": "test" }`.

If you later add dependencies, re-run the packaging script before uploading a new version.

## Amplify Frontend Hosting (Only Frontend)

1. Push this repo to Git hosting (GitHub/GitLab/CodeCommit).
2. In AWS Amplify Console → Host Web App → Connect repository/branch (e.g. master).
3. Amplify detects `amplify.yml`; accept it. Ensure build image supports Node 20 (we set NODE_VERSION in `amplify.yml`; `.nvmrc` also added).
4. Add environment variable: `NEXT_PUBLIC_BACKEND_URL` = your API base (no trailing slash).
5. Start build. On success, open the provided Amplify URL and verify API calls.
6. (Optional) Add custom domain: Amplify Console → Domain management.
7. (Optional) After going live, tighten CORS in Lambda & API to just the Amplify domain.

Deployment triggers: every commit to the connected branch. To change backend URL, update the env var in Amplify and redeploy.
