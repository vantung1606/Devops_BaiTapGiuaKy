const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'admin123',
  database: process.env.DB_NAME || 'expense_db',
};

let pool;

// Hàm kết nối lại nếu DB chưa sẵn sàng
function connectWithRetry() {
  console.log('Attempting to connect to DB...');
  pool = mysql.createPool(dbConfig).promise();
  
  // Thử chạy một query đơn giản để kiểm tra kết nối
  pool.query('SELECT 1')
    .then(async () => {
      console.log('Successfully connected to MySQL.');
      await initDb();
    })
    .catch(err => {
      console.error('Wait for DB to be ready... (5s)', err.message);
      setTimeout(connectWithRetry, 5000);
    });
}

async function initDb() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS expenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log('Table expenses is ready.');
  } catch (err) {
    console.error('Table Init Error:', err.message);
  }
}

// Routes - Chuẩn hóa tiền tố /api
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/about', (req, res) => {
  res.json({
    name: process.env.STUDENT_NAME || 'Nguyễn Văn Tùng',
    student_id: process.env.STUDENT_ID || '2251220254',
    student_class: process.env.STUDENT_CLASS || '22CT5'
  });
});

app.get('/api/expenses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    await pool.query('INSERT INTO expenses (title, amount, date, category) VALUES (?, ?, ?, ?)', [title, amount, date, category]);
    res.status(201).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ error: 'Insert error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend service listening on port ${PORT}`);
  connectWithRetry();
});
