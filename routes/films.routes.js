const router = require('express').Router();
const films = require('../controllers/films.controllers');

router.post('/', films.postFilm).delete('/:filmsId', films.deleteFilm).get('/:filmsId', films.getFilm).get('/', films.getFilms);

module.exports = router;
