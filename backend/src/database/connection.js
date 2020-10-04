const knex = require('knex');

const connection = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'hbstudent',
      password : 'hbstudent',
      database : 'website'
    }
});

module.exports = connection;