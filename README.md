<p align="center">
  <a href="https://www.mongodb.com/mean-stack" target="_blank">
    <img alt="MEAN Stack Backend with Node.js and MongoDB" src="https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-intro-mongo--a9be9a71-1d5c-4b84-a92a-f44482cd775f.png" width="100" />
  </a>
</p>

<h1 align="center">
  MEAN Stack Backend - Node.js & MongoDB
</h1>

<p align="center">
  RESTful API built with Node.js, Express, and MongoDB
</p>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    Node.js
  </a>
  ·
  <a href="https://expressjs.com/" target="_blank">
    Express
  </a>
  ·
  <a href="https://www.mongodb.com/" target="_blank">
    MongoDB
  </a>
</p>

* [Quick Guide](#-quick-guide)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [API Endpoints](#-api-endpoints)

### 🤖 Quick Guide

1. **Start Development**
   
   Clone the repository
   ```sh
   git clone <repository-url>
   cd backend
   ```

   Install dependencies
   ```sh
   npm install
   ```

   Set up environment variables
   ```sh
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

   Run development server
   ```sh
   npm run dev
   ```
   Server will start on `http://localhost:3000`

2. **Build for Production**
   ```sh
   npm run start
   ```

### 🚀 Features

1. **Authentication**
   - JWT-based authentication
   - User signup and login
   - Password encryption with bcrypt
   - Token verification middleware

2. **Post Management**
   - CRUD operations for posts
   - File upload for images
   - Posts pagination
   - User-specific posts

3. **Security Features**
   - JWT authentication
   - Password hashing
   - Route protection
   - Input validation
   - Error handling

### 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**:
  - bcryptjs
  - Express middleware
  - CORS
- **File Upload**: Multer
- **Validation**: Express-validator

### 📁 Project Structure

```
backend/
├── middleware/
│   └── check-auth.middleware.js
├── images/
├── models/
│   ├── post.js
│   └── user.js
├── routes/
│   ├── posts.route.js
│   └── users.route.js
└── server.js
```

### 🛠️ API Endpoints

#### Authentication
```
POST /api/users/signup - Register a new user
POST /api/users/login  - Login user
```

#### Posts
```
GET    /api/posts     - Get all posts
POST   /api/posts     - Create new post
GET    /api/posts/:id - Get specific post
PUT    /api/posts/:id - Update post
DELETE /api/posts/:id - Delete post
```

### 🔐 Environment Setup

Create `.env` in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 📦 Dependencies

Main dependencies:
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5"
}
```

### 🚀 Running the Server

Development mode with nodemon:
```sh
npm run dev
```

Production mode:
```sh
npm start
```

### 🔍 Error Handling

The API uses a centralized error handling mechanism:
- Custom error messages
- Proper HTTP status codes
- Validation error responses

### 📚 Documentation

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### 🙏 Acknowledgments

- Node.js team
- Express.js team
- MongoDB team

Happy coding! 🚀