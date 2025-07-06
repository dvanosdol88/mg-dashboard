# MG Dashboard (Experimental - Not Live)

⚠️ **This is an experimental project and is NOT the live dashboard**

The actual live personal dashboard is:
- **Frontend**: [Dashboard_May10](https://github.com/dvanosdol88/Dashboard_May10) 
- **Backend**: [calendar-backend](https://github.com/dvanosdol88/calendar-backend)
- **Live URL**: https://dashboard.davidcfacfp.com

This mg-dashboard project is a Next.js exploration with advanced features.

## Features

- 📊 Task management dashboard
- 🤖 Google Gemini AI integration
- 🗄️ PostgreSQL database
- 🚀 Deployed on Render
- ⚡ Express.js API backend

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Express.js API routes
- **Database**: PostgreSQL
- **AI**: Google Gemini API
- **Deployment**: Render

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- PostgreSQL (local development)
- Google Gemini API key

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo-url>
   cd mg-dashboard
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your actual values:
   - `DATABASE_URL`: PostgreSQL connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key

3. **Set up the database**:
   ```bash
   # Create database and run migrations
   npm run db:migrate
   ```

4. **Development commands**:
   ```bash
   # Run Next.js development server (frontend only)
   npm run dev:next

   # Run Express server (API backend)
   npm run dev:server

   # Build for production
   npm run build

   # Start production server
   npm start
   ```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

### Gemini AI
- `POST /api/gemini` - Generate AI response
- `GET /api/gemini/models` - List available models

### Health Check
- `GET /api/health` - System health status
- `GET /api/health/database` - Database health check

## Database Schema

The PostgreSQL database includes:
- `tasks` table: Task management
- `users` table: User management (future use)
- Automatic timestamps and UUID primary keys

## Deployment on Render

### Automatic Deployment

1. **Connect GitHub repository** to Render
2. **Use render.yaml** for automatic configuration
3. **Set environment variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `DATABASE_URL`: Automatically provided by Render PostgreSQL

### Manual Setup

1. **Create PostgreSQL database** on Render
2. **Create web service** with:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
3. **Set environment variables** in Render dashboard

### Database Migration

Run the database schema on first deployment:
```bash
npm run db:migrate
```

## Migration from Firebase

This project was migrated from Firebase to PostgreSQL + Render:

✅ **Completed**:
- Firestore → PostgreSQL
- Firebase Functions → Express.js APIs
- Firebase Hosting → Render deployment
- Kept Google Gemini AI integration

🗑️ **Removed**:
- Firebase SDK
- Firestore client code
- Firebase configuration files

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 3000) | No |

## Troubleshooting

### Database Issues
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Verify database migrations: `npm run db:migrate`
- Test connection: `GET /api/health/database`

### API Issues
- Verify `GEMINI_API_KEY` is set correctly
- Check API quotas and limits
- Monitor logs in Render dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.