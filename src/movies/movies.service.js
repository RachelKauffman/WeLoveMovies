const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex('movies').select('*');
}

function listIsShowing() {
    return knex('movies_theaters as mt')
        .join('movies as m', 'm.movie_id', 'mt.movie_id')
        .select('*')
        .where('mt.is_showing', true)
}

function read(movie_id) {
    return knex('movies as m')
        .select('*')
        .where({movie_id: movie_id})
        .first() //returns first row in the table
}

function theaters({movie_id}){
    return knex('movies_theaters as mt')
           .join('theaters as t', 't.theater_id', 'mt.theater_id' )
           .select('*')
           .where({'mt.movie_id': movie_id, 'mt.is_showing': true})
}

//add critics to review
function mapReviews(reviews) {
    return reviews.map(
        mapProperties({
            critic_id: 'critic.critic_id',
            preferred_name: 'critic.preferred_name',
            surname: 'critic.surname',
            organization_name: 'critic.organization_name',
            created_at: 'critic.created_at',
            updated_at: 'critic.updated_at',
        })
    )
}
function reviews({movie_id}) {
  return knex('reviews as r')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('r.*', 'c.*')
        .where({ 'r.movie_id': movie_id })
        .then(mapReviews)
}


module.exports = {
    list,
    listIsShowing,
    read,
    theaters,
    reviews,
}