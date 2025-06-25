// Quick database connection test
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render PostgreSQL
  });

  try {
    console.log('🔗 Testing database connection...');
    console.log('📍 Database URL:', process.env.DATABASE_URL ? 'Set ✅' : 'Missing ❌');
    
    await client.connect();
    console.log('✅ Connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('⏰ Database time:', result.rows[0].current_time);
    
    console.log('🎉 Database is ready for migration!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check your DATABASE_URL in .env file');
    console.log('2. Make sure the Render PostgreSQL database is running');
    console.log('3. Verify the connection string format');
  } finally {
    await client.end();
  }
}

testConnection();