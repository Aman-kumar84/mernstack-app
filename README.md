# MERN Todo App

A beginner-friendly full-stack MERN project:

- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **API:** REST API
- **Features:** Create, read, update, delete, and toggle todos

## Project Structure

```text
mern-todo-app/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── api.js
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

Install:

- Node.js 18+
- npm
- MongoDB (local) OR a MongoDB Atlas database

## 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## 2. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start React:

```bash
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update/toggle todo |
| DELETE | `/api/todos/:id` | Delete todo |

### Create Todo

```json
POST /api/todos

{
  "title": "Learn Docker"
}
```

## MongoDB

For local MongoDB, make sure MongoDB is running.

For MongoDB Atlas, replace `MONGO_URI` in `backend/.env` with your Atlas connection string.

Do not commit `.env` files or database credentials to GitHub.

## Troubleshooting

### MongoDB connection error

Check:

1. MongoDB is running.
2. `MONGO_URI` is correct.
3. Atlas allows your IP address if using MongoDB Atlas.

### CORS error

Make sure the frontend URL is allowed by the backend. The included backend enables CORS for development.

### Frontend cannot reach backend

Check:

```text
frontend/.env
VITE_API_URL=http://localhost:5000/api
```

Then restart the Vite development server.

## Useful Commands

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Learning Goals

This project is useful for practicing:

- React components and state
- API calls with `fetch`
- Express routes
- REST API design
- MongoDB CRUD operations
- Mongoose schemas/models
- Environment variables
- CORS
- Full-stack project structure

## License

MIT
