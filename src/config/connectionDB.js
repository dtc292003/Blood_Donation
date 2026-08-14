import mysql from 'mysql2/promise';

console.log("Creating connection pool...");

const pool = mysql.createPool({

    host: 'localhost',

    user: 'root',

    password: '1234',

    database: 'blood_donation',

})

export default pool;