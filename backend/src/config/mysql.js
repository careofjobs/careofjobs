import mysql from 'mysql2/promise';
import { env } from './env.js';

export const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function initMySQL() {
    try {
        // Attempt a connection to verify credentials
        const connection = await pool.getConnection();

        // Create the contact_messages table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✅ Connected to MySQL and verfied contact_messages table.');
        connection.release();
    } catch (err) {
        // We log the error but don't strictly throw it, so the rest of the app (MongoDB jobs) 
        // can still run if MySQL isn't setup perfectly yet or if the password is wrong.
        console.error('❌ Failed to connect to MySQL:', err.message);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Hint: Make sure exactly the right MYSQL_PASSWORD is in backend/.env');
        }
    }
}
