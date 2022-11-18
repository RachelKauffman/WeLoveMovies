const knex = require("knex");
const reduceProperties = require("../utils/reduce-properties");


const reduceMovies = reduceProperties('theater_id', {
    m_movie_id: ['movies', null, 'movie_id'],
    m_title: ['movies', null, 'title'],
    m_runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
    m_rating: ['movies', null, 'rating'],
    m_description:['movies', null, 'description'],
    m_image_url: ['movies', null, 'image_url'],
    m_created_at: ['movies', null, 'created_at'],
    m_updated_at: ['movies', null, 'updated_at'],
    mt_is_showing: ['movies_theaters', null, 'is_showing'],
    mt_theater_id: ['movies_theaters', null, 'theater_id']
})

function list() {
    return knex('theaters as t')
        .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
        .select('*')
        .where({'mt.is_showing': true})
        .then(reduceMovies)
}

module.exports = {
    list,
}