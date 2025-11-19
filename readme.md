# Task Manager — Full-Stack Application
A fully containerized Task Management System built using:

- Frontend: React + Vite + Tailwind  
- Backend: Node.js + Express + Prisma ORM  
- Database: PostgreSQL  
- Auth: JWT  
- Roles: User & Admin  
- Docker: Runs with a single `docker-compose up`

---

## Features

### User Management
- User Registration & Login (JWT)
- Secure password hashing (bcrypt)
- Roles:
  - User → Can manage only their own tasks  
  - Admin → Can view & manage all users and tasks  

### Task Management
- Full CRUD operations
- Task fields: title, description, status (TO_DO, IN_PROGRESS, DONE)
- Role-based permissions

---

## Docker Setup

Run the entire application:

docker-compose up --build

Stop all services:

docker-compose down

---

## Project Structure

root/
│── backend/
│── frontend/
│── docker-compose.yml
└── README.md

---

## Backend

### Tech Stack
- Express  
- Prisma ORM  
- PostgreSQL  
- JWT, bcrypt  
- Nodemon  

### Scripts
npm run dev  
npm run start  
npm run prisma:migrate  

### Backend .env
DATABASE_URL="postgresql://USER:PASSWORD@db:5432/DBNAME?schema=public"  
JWT_SECRET="your_secret"

---

## Frontend

### Tech Stack
- React 19  
- Vite  
- TailwindCSS  
- Axios  
- React Router 7  
- Lucide Icons  

### Scripts
npm run dev  
npm run build  
npm run preview  

---

## 🔌 API Endpoints

---

## Admin Routes (Role: ADMIN)

### Auth Middleware  
- **All admin routes require:** `protect` + `allowRoles("ADMIN")`

### Profile  
- **DELETE** /api/admin/delete-profile  
  → Delete admin account

---

## Auth Routes (Public + Protected)

### Public  
- **POST** /api/auth/login  
  → Login & get token

### Protected  
- **GET** /api/auth/user  
  → Get logged-in user  
- **POST** /api/auth/logout  
  → Logout user

---

## Task Routes (Role: USER)

### Auth Middleware  
- **All task routes require:** `protect` + `allowRoles("USER")`

### Tasks  
- **POST** /api/tasks/create  
  → Create a new task  
- **GET** /api/tasks/  
  → Get all tasks of logged-in user  
- **GET** /api/tasks/:id  
  → Get a single task  
- **PUT** /api/tasks/:id  
  → Update a task  
- **DELETE** /api/tasks/:id  
  → Delete a task

---

## Run Locally (Without Docker)

### Backend
cd backend  
npm install  
npx prisma migrate dev  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## Prisma Commands
npx prisma migrate dev --name init  
npx prisma generate  

---

## Role Permissions

### User
- Can create/read/update/delete only their tasks  

### Admin
- Full access to all tasks & users  

---

## Start App

docker-compose up --build

Frontend → http://localhost:5173  
Backend → http://localhost:5000



