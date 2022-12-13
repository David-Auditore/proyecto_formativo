const mysql2 = require('mysql2');

let conexion = mysql2.createConnection({
    host: 'localhost',
    database: 'proyecto',
    user: 'root',
    password: '0622'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Connected Database');
    }
});

module.exports = conexion;