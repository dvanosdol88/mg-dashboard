// Test database connection and basic operations
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://dashboard_db_pj6n_user:VlwE3L1aio550wX9epVxEGp56fmIW7w5@dpg-d0t0gj15pdvs73d58c20-a.oregon-postgres.render.com/dashboard_db_pj6n',
  ssl: { rejectUnauthorized: false }
});

async function testDatabaseOperations() {
  try {
    console.log('🧪 Testing database operations...');
    
    // Test 1: Create a sample task
    console.log('\n1. Creating a test task...');
    const createResult = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      ['Test Task from API', 'work', 'pending', 'david']
    );
    console.log('✅ Task created:', createResult.rows[0]);
    
    // Test 2: Retrieve all tasks for david
    console.log('\n2. Retrieving all tasks for david...');
    const getResult = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      ['david']
    );
    console.log('✅ Found tasks:', getResult.rows.length);
    getResult.rows.forEach(task => {
      console.log(`  - ${task.title} (${task.status})`);
    });
    
    // Test 3: Update the task to completed
    console.log('\n3. Marking test task as completed...');
    const updateResult = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      ['completed', createResult.rows[0].id]
    );
    console.log('✅ Task updated:', updateResult.rows[0]);
    
    // Test 4: Delete the test task
    console.log('\n4. Cleaning up test task...');
    const deleteResult = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [createResult.rows[0].id]
    );
    console.log('✅ Task deleted:', deleteResult.rows[0].title);
    
    console.log('\n🎉 All database operations successful!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testDatabaseOperations();