# Task Management Web Application

This is a full-stack web application built for managing tasks. It allows users to create, read, update, and delete tasks. The application is developed using Node.js, Express, React, and MongoDB.

## Features

- Create a new task using a form.
- Update existing tasks.
- Delete tasks.
- Retrieve a list of tasks.
- User authentication and authorization for API endpoints.
- Secure API implementation to protect against common web application attacks.
- Task search functionality by keyword.
- Task filtering by status or priority.
- Pagination for the table of tasks.

## Technologies Used

- Backend:
  - Node.js
  - Express

- Frontend:
  - React

- Database:
  - MongoDB

- Authentication and Authorization:
  - JSON Web Tokens (JWT)

- Version Control:
  - Git (Hosted on GitHub)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/maatif-us/task-manager.git
2. Backend Setup:
  - Install Docker
  - Install MongoDB
  - cd to ptoject directory
  - Run npm install
  - Run docker compose build --no-cache
  - Run docker compose up
  - Server will start at http://localhost:3000
3. Frontend Setup:
  - cd /client
  - Run npm install
  - Run npm run start
  - Server will start at http://localhost:3001

4. Database Setup:
  - Local
    - Install MongoDB
    - Install MongoDB Compass
    - Connect to your local MongoDB
    - Connecttion String:- mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2
  - Production
    - Update the DB_CONNECT in .env with your cluster
    - Start the server

5. Access the Application:

- Open your web browser and visit http://localhost:3001 to access the application.

## Backend
The backend of the application is built using Node.js and Express. It provides the API endpoints for managing tasks.

The backend directory contains the following files and folders:

- app.js: The entry point of the backend application.

- routes/: Defines the routes and handlers for the following:-
  - /auth.js: Defines the routes and handlers for the auth-related API
  - /users.js: Defines the routes and handlers for the user-related API
  - /tasks.js: Defines the routes and handlers for the task-related API

- controllers/: Contains the controller functions for the following.
  - /auth.js: controller functions for handling the logic of auth operations.
  - /user.js: controller functions for handling the logic of user operations.
  - /tasks.js: controller functions for handling the logic of task operations.

- models/: Defines the model for the follwoing to interacting with the MongoDB database.
  - Task.js: Defines the task schema
  - User.js: Defines the user schema

- middleware/: Defines the middleware functions for the follwoing
  - /auth.js: Middleware for authentication and authorization.
  - /authValidation.js: Middleware for checking validations
  - /validateResult.js: Middleware for checking the validattion result.
  - /errorHandler.js: Error handling middleware.
- config/: Defines the configuration for database and passport

## Security Considerations
The application implements secure authentication and authorization using JSON Web Tokens (JWT).
Proper validation and sanitization of user inputs are performed to prevent common web application attacks, such as cross-site scripting (XSS) and SQL injection.
Contributing
