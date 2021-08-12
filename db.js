const Sequelize = require('sequelize');
const confme = require('confme');

const { name, user, pass, host, port, dialect } = confme('config.json').db;
const sequelize = new Sequelize(name, user, pass, {
  dialect,
  host,
  port,
});
module.exports = { Sequelize, sequelize };
