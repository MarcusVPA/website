const path = require('path');

module.exports = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'hbstudent',
        password : 'hbstudent',
        database : 'website',
        /*filename: path.resolve(__dirname, 'src', 'database', 'teste.sql')*/
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
    /*useNullAsDefault: true,*/
};
