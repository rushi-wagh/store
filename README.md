# Mulyankanam

Mulyankanam is a full-stack store rating platform where users can discover stores and submit ratings from 1 to 5. The platform supports role-based access for System Administrators, Normal Users, and Store Owners.

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Zod
- JWT
- bcrypt

## User Roles

### System Administrator
- View dashboard statistics
- Add new stores
- Add normal users and admin users
- View users and stores
- Filter and sort listings
- View user details
- View store ratings
- Log out

### Normal User
- Register and log in
- View all registered stores
- Search stores by name and address
- View overall store ratings
- Submit a rating from 1 to 5
- Modify their submitted rating
- Change password
- Log out

### Store Owner
- Log in
- View store average rating
- View users who submitted ratings for their store
- Change password
- Log out

## Database Design

The application uses PostgreSQL with Prisma ORM.

The database contains three main entities:

- `User`
- `Store`
- `Rating`

### Relationships

- A User can own a Store.
- A User can submit ratings for multiple Stores.
- A Store can receive ratings from multiple Users.
- Each User can submit only one rating for a particular Store.

A composite unique constraint is applied to:

```text
(user_id, store_id)

This allows users to modify their existing rating without creating duplicate ratings.

Ratings are restricted to values between 1 and 5.

Validation

The application validates data on the backend using Zod.

Validation includes:

Name: 20–60 characters
Address: maximum 400 characters
Password: 8–16 characters
Password must contain at least one uppercase letter
Password must contain at least one special character
Email must follow a valid email format
Rating must be between 1 and 5
Authentication & Authorization

The application uses JWT-based authentication with HTTP-only cookies.

Role-based authorization is implemented on the backend to restrict access to role-specific functionality.

Project Structure
Mulyankanam/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
│
└── README.md
Getting Started
Prerequisites

Make sure the following are installed:

Node.js
PostgreSQL
npm
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Mulyankanam
2. Backend Setup
cd backend
npm install

Create a .env file in the backend directory:

DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET="your_jwt_secret"
PORT=5000
NODE_ENV="development"

Run Prisma migrations:

npx prisma migrate dev

Start the backend:

npm run dev
3. Frontend Setup

Open another terminal:

cd frontend
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

The frontend will be available at the URL provided by Vite.

Environment Variables
Backend
Variable	Description
DATABASE_URL	PostgreSQL database connection string
JWT_SECRET	Secret used for JWT authentication
PORT	Backend server port
FRONTEND_URL  frontends url
Frontend
Variable	Description
VITE_API_BASE_URL	Backend API base URL
Main Application Flow

<img width="1087" height="973" alt="Screenshot 2026-09-10 162044" src="https://github.com/user-attachments/assets/c208857d-f3d7-4517-b34f-dbfb2857b52b" />

Rating Flow
Normal User
     ↓
Select Store
     ↓
Submit Rating (1–5)
     ↓
Rating Stored
     ↓
Overall Store Rating Updated
     ↓
User Can Modify Their Rating
Security
Passwords are hashed before being stored.
Authentication uses HTTP-only cookies.
Role-based authorization is enforced on the backend.
User input is validated before processing.
Database constraints prevent duplicate ratings for the same user and store.
Author

Rushikesh Wagh
