// Test Gemini AI integration directly
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  try {
    console.log('🤖 Testing Gemini AI integration...');
    console.log('🔑 API Key:', process.env.GEMINI_API_KEY ? 'Set ✅' : 'Missing ❌');
    
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ No API key found');
      return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('📤 Sending test prompt...');
    const result = await model.generateContent('Hello! Can you respond with just "API working!"?');
    const responseText = result.response.text();

    console.log('✅ Gemini AI Response:', responseText);
    console.log('🎉 Gemini AI integration working!');
    
  } catch (error) {
    console.error('❌ Gemini AI Error:', error.message);
    if (error.message?.includes('API key')) {
      console.log('💡 Check your GEMINI_API_KEY in .env file');
    }
    if (error.message?.includes('quota')) {
      console.log('💡 API quota may be exceeded');
    }
    if (error.message?.includes('location')) {
      console.log('💡 Check if Gemini API is available in your region');
    }
  }
}

testGemini();