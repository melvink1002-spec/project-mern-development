Pro-Tasker

Pro-Tasker is a full-stack task and project management application built with React, Node.js/Express**, and MongoDB. Users can create projects, add tasks, and manage progress. The app supports authentication, project CRUD operations, and task management.

Features:
- User authentication (login/register)
- Create, update, and delete projects
- Add, update, and delete tasks per project
- Task board
- Responsive UI

Live Demo:
Frontend: https://project-mern-development-frontend.onrender.com
Backend:  https://project-mern-development-backend.onrender.com

Setup and Running Locally:

Clone the repository:
```bash
git clone https://github.com/yourusername/pro-tasker.git
cd pro-tasker

Backend Setup:

1. cd backend
npm install

2. Create a .env file with the following:
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

3. Start the backend server:
npm run dev

Frontend Setup:

1. cd frontend
npm install

2. Update src/utils/api.js to point to the local backend: const API = "http://localhost:5001/api";

3. Start the frontend:
npm run dev

API Endpoints:

Authentication:

Endpoint: /auth/register
Description: Register a new use

Endpoint: /auth/login
Description: Login and get JWT token

Endpoint: /auth/me
Description: Get current user info (JWT)

Projects:

Endpoint: GET /projects
Description: Get all projects for user

Endpoint: POST /projects
Description: Create a new project

Endpoint: PUT /projects/:id
Description: Update a project

Endpoint: DELETE /projects/:id
Description: Delete a project

Tasks:

Endpoint: GET /projects/:id/tasks
Description: Get tasks for a project

Endpoint: POST /projects/:id/tasks
Description: Add a task to a project

Endpoint: PUT /projects/:id/tasks/:taskId
Description: Update a task

Endpoint: DELETE /projects/:id/tasks/:taskId
Description: Delete a task