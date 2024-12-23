# Task Management Application

A full-stack task management application built with Node.js, Express, MongoDB, and React for effective task organization and management.

---

## Features

- **Task Management**: Create, update, delete, and retrieve tasks.
- **User-Friendly Interface**: React-based frontend for seamless interaction.
- **Secure Backend**: JWT authentication for secure API communication (if implemented).
- **RESTful APIs**: Fully functional endpoints for managing tasks.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v16+)
- npm (v8+)
- MongoDB

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone [https://github.com/sujaylande/task-Management-.git]
cd task-management
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory and add the following variables:
```env
MONGO_URI=<your_mongo_database_uri>
PORT=<your_server_port>
JWT_SECRET_KEY=<your_secret_key>
```

### 3. Backend Setup
Navigate to the `server` folder:
```bash
cd server
```
Install dependencies:
```bash
npm install
```
Start the server:
```bash
npm run dev
```

### 4. Frontend Setup
Navigate to the `client` folder:
```bash
cd client
```
Install dependencies:
```bash
npm install
```
Start the frontend application:
```bash
npm start
```

---

## Usage

1. Start the backend server by running the `npm run dev` command in the `server` directory.
2. Start the frontend application by running the `npm start` command in the `client` directory.
3. Open your browser and navigate to `http://localhost:3000` to access the application.

---

## Folder Structure

```
task-management/
|
├── server/          # Backend code (Node.js, Express, MongoDB)
│   ├── models/      # Mongoose models
│   ├── controllers/ # API controllers
│   ├── routes/      # API routes
│   └── ...
│
├── client/          # Frontend code (React)
│   ├── src/         # Source files
│   └── ...
│
└── .env             # Environment variables
```

---

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, socket.io
- **Frontend**: React.js, Axios
- **Others**: JWT (for authentication), dotenv (for environment variables)

---
