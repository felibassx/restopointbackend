require('dotenv').config();

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'pipexx221',
    database: 'restpoint',
    entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
    synchronize: true,
};