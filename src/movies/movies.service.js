
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex('movies').select('*');
}

function listIsShowing() {
    return knex('movies as m')
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .select('m.*', 'mt.is_showing')
        .where('mt.is_showing', true)
        .distinct('mt.is_showing');
}

function read(movie_id) {
    return knex('movies')
        .select('*')
        .where({movie_id})
        .first() //returns first row in the table
}

function theaters(movie_id){
    return knex('movies_theaters as mt')
           .join('theaters as t', 't.theater_id', 'mt.theater_id' )
           .select('*')
           .where({'mt.movie_id': movie_id, 'mt.is_showing': true})
}

//add critics to review
const addCritic = 
        mapProperties({
            critic_id: 'critic.critic_id',
            preferred_name: 'critic.preferred_name',
            surname: 'critic.surname',
            organization_name: 'critic.organization_name',
            created_at: 'critic.created_at',
            updated_at: 'critic.updated_at',
        })
    
function reviews(movieId) {
  return knex('reviews as r')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('*')
        .where({ 'movie_id': movieId })
        .then((data) => data.map(addCritic))
}


module.exports = {
    list,
    listIsShowing,
    read,
    theaters,
    reviews,
}