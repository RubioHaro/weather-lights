# Setup

## Project Creation

Nest Installation:

npm i -g @nestjs/cli

API Creaction:

nest new api --package-manager npm

Front Creation:

npm create vite@latest web -- --template react-ts

## How to Run

### API

```bash
npm run start:api
```

### Frontend

```bash
npm run start:web
```

### API and Frontend

```bash
npm run dev
```

## .env file's

### API

```env
PORT=3000
OPENWEATHER_API_KEY=your_openweather_api_key
```

### Frontend

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```