# GreenQuest Backend API

A gamified environmental education platform backend built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (Student, Teacher, NGO, Admin)
- 🏆 Gamification system with points and badges
- 🛡️ Security middleware (Helmet, Rate Limiting, CORS)
- 📊 User progress tracking
- 🎯 Environmental education focus

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd GreenQuest
```

2. Install dependencies
```bash
npm install
```

3. Environment setup
```bash
cp env.example .env
```

4. Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/greenquest
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/change-password` | Change password | Private |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |
| GET | `/` | API information |

## User Roles

- **Student**: Learn and complete challenges
- **Teacher**: Assign tasks and monitor progress
- **NGO**: Share eco-events and campaigns
- **Admin**: Manage system and analytics

## User Model

```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: ['student', 'teacher', 'ngo', 'admin'],
  points: Number (default: 0),
  badges: [{
    name: String,
    description: String,
    icon: String,
    earnedAt: Date,
    category: ['participation', 'achievement', 'milestone', 'special']
  }],
  school: String,
  grade: String,
  isActive: Boolean,
  lastLogin: Date
}
```

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 req/15min general, 5 req/15min auth)
- CORS protection
- Helmet security headers
- Input validation with express-validator

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
