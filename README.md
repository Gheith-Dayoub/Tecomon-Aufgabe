# 🌤️ Widget & Weather API — Fullstack App with React Frontend

This is a fullstack project combining a modern frontend and backend architecture to provide weather-based widgets. The project includes:

- **Express.js backend** with MongoDB Atlas
- **Next.js (React)** frontend
- Weather data via **Open-Meteo API**
- Simple in-memory caching for performance

---

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A MongoDB Atlas account

---

### 📦 Backend (Express.js API)

1. Clone the repository:

   ```bash
   git clone <REPO-URL>
   cd backend
   `

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/widgetdb
   ```

4. Start the backend server::

   ```bash
   npm start
   ```

Backend is now running at  
**http://localhost:5000**

---

### Frontend (Next.js)

1. Navigate to the `frontend/` directory

   ```bash
   
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Frontend is now running at  
**http://localhost:3000**

---

## API Overview

### Widget API Endpoints

| Methode | Pfad                 | Beschreibung                       |
| ------- | -------------------- | ---------------------------------- |
| GET     | `/api/widgets`       | Fetch all widgets                  |
| GET     | `/api/widgetDetails` | Fetch weather details for a widget |
| POST    | `/api/widgets`       | Create a new widget                |
| DELETE  | `/api/widgets/:id`   | Delete a widget by ID              |

## Project Overview

This application provides a smooth interface for creating weather widgets based on geolocation. It fetches live weather data from Open-Meteo, caches it in memory for five minutes, and serves it via an API. The frontend allows users to add, view, and delete widgets seamlessly

### Project Structure

```
/
├── backend/
│   ├── config/
│   │   └── dataBase.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── models/
│   │   └── Weather.js
│   ├── routes/
│   │   └── weatherRoutes.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── .next/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       └── app/
│           ├── components/
│           │   ├── CreateWidgetModal.tsx
│           │   ├── Widget.tsx
│           │   └── WidgetList.tsx
│           ├── pages/index.tsx
│           ├── styles/ globals.css

```

---
