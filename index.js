const express = require('express');

const app = express();
const confme = require('confme');

const config = confme('config.json');
const { sequelize } = require('./db');
const logger = require('./utils/logger');

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/api/v1/films', require('./routes/films.routes'));
app.use('/api/v1/upload', require('./routes/upload.routes'));

app.get('/upload', (req, res) => {
  res.render('upload.ejs');
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    await sequelize.sync();
    logger.info('All models were synchronized successfully.');
    app.listen(config.listenPort, () => logger.info(`Server start in ${config.listenPort} port`));
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();
