// This file is deprecated - Gemini API has been moved to Express.js server
// Please use the Express.js endpoint instead: POST /api/gemini

export default async function handler(req, res) {
  return res.status(410).json({ 
    message: "This endpoint is deprecated. Please use the Express.js server.",
    endpoint: "/api/gemini",
    method: "POST"
  });
}
