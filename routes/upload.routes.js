const router = require('express').Router();
const upload = require('../controllers/upload.controllers');

router.post('/', upload.postUpload);

module.exports = router;
