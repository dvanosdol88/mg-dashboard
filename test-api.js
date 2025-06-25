// Test API endpoints directly
import fetch from 'node-fetch';

async function testAPIs() {
  const baseUrl = 'http://localhost:3000';

  try {
    // Test health check
    console.log('🏥 Testing health check...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health:', healthData.status);

    // Test tasks API
    console.log('\n📋 Testing tasks API...');
    const tasksResponse = await fetch(`${baseUrl}/api/tasks`);
    const tasksData = await tasksResponse.json();
    console.log('✅ Tasks found:', tasksData.length);

    // Test Gemini API
    console.log('\n🤖 Testing Gemini AI...');
    const geminiResponse = await fetch(`${baseUrl}/api/gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Hello! Please respond with just: Migration successful!'
      })
    });

    if (geminiResponse.ok) {
      const geminiData = await geminiResponse.json();
      console.log('✅ Gemini Response:', geminiData.response);
    } else {
      const errorData = await geminiResponse.json();
      console.log('❌ Gemini Error:', errorData);
    }

    console.log('\n🎉 API testing complete!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIs();