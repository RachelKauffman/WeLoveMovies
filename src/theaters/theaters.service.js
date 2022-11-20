const knex = require("knex");
const reduceProperties = require("../utils/reduce-properties");


const reduceMovies = reduceProperties('theater_id', {
    movie_id: ['movies', null, 'movie_id'],
    title: ['movies', null, 'title'],
    runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
    rating: ['movies', null, 'rating'],
    description:['movies', null, 'description'],
    image_url: ['movies', null, 'image_url'],
    created_at: ['movies', null, 'created_at'],
    updated_at: ['movies', null, 'updated_at'],
    is_showing: ['movies_theaters', null, 'is_showing'],
    theater_id: ['movies_theaters', null, 'theater_id']
})

function list() {
    return knex('theaters as t')
        .join('movies as m', 'm.movie_id', 'mt.movie_id')
        .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
        .select('*')
        .then(reduceMovies)
}

module.exports = {
    list,
}