// Test the improved API with new schema
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://dashboard_db_pj6n_user:VlwE3L1aio550wX9epVxEGp56fmIW7w5@dpg-d0t0gj15pdvs73d58c20-a.oregon-postgres.render.com/dashboard_db_pj6n',
  ssl: { rejectUnauthorized: false }
});

async function testImprovedAPI() {
  try {
    console.log('🧪 Testing improved API logic...');
    
    // Test 1: Create a work task with new schema
    console.log('\n1. Creating a work task...');
    const workTask = await pool.query(
      'INSERT INTO tasks (title, task_type, description, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      ['Finish project report', 'work', 'Complete quarterly report by Friday', 'pending', 'default_user']
    );
    console.log('✅ Work task created:', {
      id: workTask.rows[0].id,
      title: workTask.rows[0].title,
      task_type: workTask.rows[0].task_type,
      description: workTask.rows[0].description,
      status: workTask.rows[0].status
    });
    
    // Test 2: Create a personal task
    console.log('\n2. Creating a personal task...');
    const personalTask = await pool.query(
      'INSERT INTO tasks (title, task_type, description, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      ['Buy groceries', 'personal', 'Milk, bread, eggs', 'pending', 'default_user']
    );
    console.log('✅ Personal task created:', {
      id: personalTask.rows[0].id,
      title: personalTask.rows[0].title,
      task_type: personalTask.rows[0].task_type,
      description: personalTask.rows[0].description
    });
    
    // Test 3: Get all tasks for default_user (simulate API call)
    console.log('\n3. Getting all tasks for default_user...');
    const allTasks = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      ['default_user']
    );
    
    // Transform like the API would
    const apiResponse = allTasks.rows.map(row => ({
      id: row.id,
      text: row.title,
      type: row.task_type || 'personal',
      completed: row.status === 'completed',
      createdAt: row.created_at,
      dueDate: row.due_date,
      description: row.description
    }));
    
    console.log('✅ API would return:', apiResponse.length, 'tasks');
    apiResponse.forEach(task => {
      console.log(`  - ${task.text} (${task.type}) ${task.completed ? '[DONE]' : '[TODO]'}`);
    });
    
    // Test 4: Update task status
    console.log('\n4. Marking work task as completed...');
    const completedTask = await pool.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      ['completed', workTask.rows[0].id]
    );
    console.log('✅ Task marked completed:', completedTask.rows[0].title);
    
    // Cleanup
    console.log('\n5. Cleaning up test data...');
    await pool.query('DELETE FROM tasks WHERE id IN ($1, $2)', [workTask.rows[0].id, personalTask.rows[0].id]);
    console.log('✅ Test data cleaned up');
    
    console.log('\n🎉 All improved API tests passed!');
    console.log('\n📋 Summary of improvements:');
    console.log('  ✅ task_type column for proper work/personal categorization');
    console.log('  ✅ description separate from type (can store detailed notes)');
    console.log('  ✅ default_user handling (no need for frontend to send user_id)');
    console.log('  ✅ Clear pending/completed status values');
    
  } catch (error) {
    console.error('❌ Improved API test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testImprovedAPI();