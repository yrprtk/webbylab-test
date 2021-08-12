module.exports = (sequelize, Sequelize) =>
  sequelize.define('films', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    format: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actors: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
