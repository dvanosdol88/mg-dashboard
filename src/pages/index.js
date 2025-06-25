// Simple API info page for mg-dashboard
export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>MG Dashboard API</h1>
      <p>PostgreSQL + Express.js backend for mg-dashboard</p>
      
      <h2>Available Endpoints:</h2>
      <ul>
        <li><strong>GET /api/health</strong> - System health check</li>
        <li><strong>GET /api/tasks</strong> - Get all tasks</li>
        <li><strong>POST /api/tasks</strong> - Create new task</li>
        <li><strong>PUT /api/tasks/:id</strong> - Update task</li>
        <li><strong>DELETE /api/tasks/:id</strong> - Delete task</li>
        <li><strong>POST /api/gemini</strong> - Generate AI response</li>
      </ul>
      
      <h2>Technology Stack:</h2>
      <ul>
        <li>Next.js 15</li>
        <li>Express.js API</li>
        <li>PostgreSQL Database</li>
        <li>Google Gemini AI</li>
      </ul>
    </div>
  );
}
