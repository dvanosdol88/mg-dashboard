// Database setup script for initial migration
import { readFileSync } from 'fs';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render PostgreSQL
  });

  try {
    console.log('🔗 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected to database');

    console.log('📄 Reading schema file...');
    const schema = readFileSync('./database/schema.sql', 'utf8');
    
    console.log('🚀 Running database migration...');
    await client.query(schema);
    console.log('✅ Database schema created successfully');

    console.log('📊 Verifying tables...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('📋 Tables created:');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    console.log('🧪 Testing sample data...');
    const taskCount = await client.query('SELECT COUNT(*) FROM tasks');
    console.log(`📝 Sample tasks inserted: ${taskCount.rows[0].count}`);

    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    if (error.message.includes('permission denied')) {
      console.log('💡 Make sure your DATABASE_URL has the correct permissions');
    }
    if (error.message.includes('does not exist')) {
      console.log('💡 Make sure the database exists on Render');
    }
  } finally {
    await client.end();
  }
}

setupDatabase();