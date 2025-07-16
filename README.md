# PlanIT - Task Management Application

![PlanIT Logo](https://via.placeholder.com/150x50?text=PlanIT+Logo) <!-- Replace with your actual logo -->

PlanIT is a comprehensive task management application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It offers a beautiful, interactive interface with animations, authentication, task management, and even productivity enhancement features like music, games, and exercises.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Task Management
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (pending/completed)
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes for authenticated users only

### Productivity Features
- **Refreshment Break**:
  - Music player to relax
  - Mini-games for mental break
  - Exercise suggestions
  - Motivational quotes generator
- **Theme Switching**:
  - Light/dark mode toggle
  - Smooth theme transitions

### Technical Features
- RESTful API backend
- MongoDB database with Mongoose
- Error handling and validation
- Environment variable configuration

## Screenshots

<!-- Add your screenshots here with appropriate captions -->
<img width="823" height="372" alt="image" src="https://github.com/user-attachments/assets/ab71dd8e-8460-4405-8cdd-9733d34b4ece" />
*Login Screen with dark/light mode toggle*

![Task Dashboard]<img width="948" height="380" alt="image" src="https://github.com/user-attachments/assets/bbfacf3b-c9bf-4a06-b337-7a245cfd7b11" />
<img width="936" height="395" alt="image" src="https://github.com/user-attachments/assets/7d262487-87e9-422e-99a7-3faaa2756d05" />


*Main task dashboard with filter options*

![Task Creation Modal](<img width="958" height="378" alt="image" src="https://github.com/user-attachments/assets/c04fd29a-a1f3-48f0-ac6c-8164a7b25c38" />)
*Modal for creating/editing tasks*

![Refreshment Break](<img width="743" height="422" alt="image" src="https://github.com/user-attachments/assets/c5d73b2f-0b31-4b7d-94f4-5a46e092df38" />
)
*Refreshment break section with music and games*

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account or local MongoDB installation

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/PlanIT.git
   cd PlanIT
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   - Create a `.env` file in the `backend` directory with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```
   - Create a `.env` file in the `frontend` directory with:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

5. **Run the application**
   - In one terminal (backend):
     ```bash
     cd backend
     npm run dev
     ```
   - In another terminal (frontend):
     ```bash
     cd frontend
     npm start
     ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Configuration

### Backend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT token generation | `your-secret-key-here` |
| `PORT` | Port for the backend server | `5000` |

### Frontend Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Base URL for API requests | `http://localhost:5000/api` |

## API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication
#### Register User
- **Endpoint**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

#### Login User
- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Tasks (Requires Authentication)
#### Create Task
- **Endpoint**: `POST /tasks`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "pending"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

#### Get All Tasks
- **Endpoint**: `GET /tasks`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

#### Get Single Task
- **Endpoint**: `GET /tasks/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

#### Update Task
- **Endpoint**: `PUT /tasks/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "completed"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

#### Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Deployment

### Backend Deployment to Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm install`
   - Start command: `npm run dev`
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=10000`
5. Deploy!

### Frontend Deployment to Vercel/Netlify
1. Create a new project on Vercel/Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm install && npm run build`
   - Publish directory: `build`
4. Set environment variables:
   - `REACT_APP_API_URL` (your deployed backend URL)
5. Deploy!

### MongoDB Atlas Setup
1. Create a free cluster on MongoDB Atlas
2. Add your connection IP to the whitelist
3. Create a database user
4. Get the connection string and replace in your backend `.env`

## Technologies Used

### Frontend
- React.js
- Redux (state management)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Axios (API calls)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- JSON Web Tokens (authentication)
- Bcrypt (password hashing)
- CORS (cross-origin requests)
- Dotenv (environment variables)

### Development Tools
- Postman (API testing)
- Git (version control)
- NPM (package management)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**PlanIT** - Manage your tasks efficiently with a delightful experience! ✨
