# Full-Stack Portfolio & Blog Application (Capstone Project)

##  Project Overview
This is a complete, production-ready Full-Stack Personal Portfolio and Blog Application.
*   **Front-End**: Built with React + Vite. Features client-side routing (React Router), global state management via Context API (Authentication), and a responsive UI.
*   **Back-End**: A secure RESTful API built with Node.js, Express, and MongoDB (Mongoose). Features JWT authentication, password hashing (bcrypt), protected routes, and relational data modeling (Users, Projects, BlogPosts, Comments, Messages).

##  Live URLs
*   **Live Front-End URL**: `https://my-portfolio-pi-one-37.vercel.app`
*   **Live Back-End API URL**: `https://7a70b31.r34.cpolar.top`

>  **IMPORTANT NETWORK ACCESS NOTES:**
> 1. Due to regional network restrictions in China, Vercel's default domains (`*.vercel.app`) may sometimes time out. **If you cannot open the front-end website, please try connecting via a mobile hotspot, or refer to the source code and demonstration video provided.**
> 2. The Back-End API is hosted using **cpolar (Intranet Penetration)** for demonstration purposes, as free cloud hosting platforms were restricted. **If the API is unreachable, it means the local demonstration computer is turned off or asleep. Please try again later.** The local service is kept running during the grading period.

##  API Endpoints
Here is the list of all available RESTful API endpoints:

### Users (Authentication)
*   `POST /api/users/register` - Register a new user
*   `POST /api/users/login` - Authenticate user and return JWT

### Projects (Portfolio)
*   `GET /api/projects` - Get all projects (Public)
*   `GET /api/projects/:id` - Get a single project (Public)
*   `POST /api/projects` - Create a new project (Protected)
*   `PUT /api/projects/:id` - Update a project (Protected)
*   `DELETE /api/projects/:id` - Delete a project (Protected)

### Blog Posts
*   `GET /api/blog` - Get all blog posts, populated with author username (Public)
*   `GET /api/blog/:id` - Get a single post with author and associated comments (Public)
*   `POST /api/blog` - Create a new blog post (Protected)
*   `PUT /api/blog/:id` - Update a blog post (Protected & Authorized)
*   `DELETE /api/blog/:id` - Delete a blog post (Protected & Authorized)

### Comments
*   `GET /api/blog/:postId/comments` - Get all comments for a specific post (Public)
*   `POST /api/blog/:postId/comments` - Create a new comment (Protected)

### Contact
*   `POST /api/contact` - Receive contact form data and save to database (Public)

##  Local Development Guide

### 1. Prerequisites
*   Node.js (v18+)
*   A MongoDB Atlas connection string

### 2. Back-End Setup (Server)
```bash
cd server
npm install
# Create a .env file in the server directory and add the following:
# PORT=3000
# MONGO_URI=my_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
npm run dev