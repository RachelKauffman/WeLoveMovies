const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex('movies').select('*')
}

function listIsShowing() {
    return knex('movies as m')
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .select('m.*')
        .where({'is_showing': true})
}

function read() {
    const movieId = req.body.data.movie_id;

    return knex('movies')
        .select('*')
        .where({'movie_id': movieId})
        .first() //returns first row in the table
}

function theaters(){
    const theaterId = req.body.data.theater_id;
    return knex('theaters as t')
           .join('movie_theaters as mt', 't.theater_id', 'mt.theater_id')
           .select('t.*')
           .where({'theater_id': theaterId})
}

//add critics to review
function mapReviews(reviews) {
    return reviews.map(
        mapProperties({
            critic_id: critic.critic_id,
            preferred_name: critic.preferred_name,
            surname: critic.surname,
            organization_name: critic.organization_name,
            created_at: critic.created_at,
            updated_at: critic.updated_at,
        })
    )
}
function reviews(movieId) {
  return knex('reviews as r')
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .select('r.*', 'c.*')
        .where({ 'r.movie_id': movieId })
        .then(mapReviews)
}


module.exports = {
    list,
    listIsShowing,
    read,
    theaters,
    reviews,
}