const { Sequelize, sequelize } = require('../db');
const Films = require('../models/Films')(sequelize, Sequelize);
const logger = require('../utils/logger');

module.exports = {
  postFilm: async (req, res) => {
    try {
      return res.send(await Films.create(req.body));
    } catch (error) {
      logger.error(`Error in postFilm: ${error}`);
      res.send(error);
    }
  },
  deleteFilm: async (req, res) => {
    try {
      await Films.destroy({ where: { id: req.params.filmsId } });
      return res.status(204).send();
    } catch (error) {
      logger.error(`Error in deleteFilm: ${error}`);
      res.send(error);
    }
  },
  getFilm: async (req, res) => {
    try {
      return res.send(await Films.findOne({ where: { id: req.params.filmsId } }));
    } catch (error) {
      logger.error(`Error in getFilm: ${error}`);
      res.send(error);
    }
  },
  getFilms: async (req, res) => {
    try {
      if (req.query.sort) {
        return res.send(await Films.findAll({ order: [['name', req.query.sort]] }));
      }
      if (req.query.name) {
        return res.send(await Films.findAll({ where: { name: { [Sequelize.Op.like]: `%${req.query.name}%` } } }));
      }
      if (req.query.actors) {
        return res.send(await Films.findAll({ where: { actors: { [Sequelize.Op.like]: `%${req.query.actors}%` } } }));
      }
      return res.send(await Films.findAll());
    } catch (error) {
      logger.error(`Error in getFilms: ${error}`);
      res.send(error);
    }
  },
};
