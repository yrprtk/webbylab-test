const fs = require('fs').promises;
const multer = require('multer');
const logger = require('../utils/logger');
const { Sequelize, sequelize } = require('../db');
const Films = require('../models/Films')(sequelize, Sequelize);

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};
const upload = multer({ dest: 'uploads/', fileFilter }).single('file');

function parseStrToJsonArray(str) {
  let array = str.split('\n\n');
  array = array.filter((el) => el !== '');
  for (let i = 0; i < array.length; i++) {
    const obj = {};
    const arr = array[i].split('\n');
    obj.name = arr[0].replace('Title: ', '');
    obj.year = arr[1].replace('Release Year: ', '');
    obj.format = arr[2].replace('Format: ', '');
    obj.actors = arr[3].replace('Stars: ', '');
    array[i] = obj;
  }
  return array;
}

module.exports = {
  postUpload: (req, res) => {
    // https://github.com/expressjs/multer/issues/909
    upload(req, res, async (err) => {
      try {
        if (err) {
          throw new Error(err);
        }
        const filePath = `./${req.file.destination}${req.file.filename}`;
        const str = await fs.readFile(filePath, 'utf8');
        fs.unlink(filePath);
        const array = parseStrToJsonArray(str);
        return res.send(await Films.bulkCreate(array, { returning: true }));
      } catch (error) {
        logger.error(`Error in postUpload: ${error}`);
        res.send(error);
      }
    });
  },
};
