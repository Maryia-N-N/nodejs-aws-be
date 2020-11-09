const {Client} = require('pg');

export const getClient = () => new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

export const close = (client) => {
  if (client) {
    client.end();
  }
};
