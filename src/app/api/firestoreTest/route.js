// This file is deprecated - API routes have been moved to Express.js server
// Please use the Express.js endpoints instead:
// GET /api/tasks - Get all tasks
// POST /api/tasks - Create new task

export async function GET() {
  return new Response(JSON.stringify({ 
    message: "This endpoint is deprecated. Please use the Express.js server endpoints.",
    endpoints: {
      tasks: "/api/tasks",
      gemini: "/api/gemini",
      health: "/api/health"
    }
  }), { 
    status: 410, // Gone - endpoint no longer available
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST() {
  return new Response(JSON.stringify({ 
    message: "This endpoint is deprecated. Please use POST /api/tasks on the Express.js server."
  }), { 
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
}
