const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

//add critics to review
const critic = 
        mapProperties({
            preferred_name: 'critic.preferred_name',
            surname: 'critic.surname',
            organization_name: 'critic.organization_name',
        })

function list(){
  return knex('reviews')
        .select('*')
}

function update(updatedReview) {
    return knex('reviews')
           .update(updatedReview, '*')
           .where({review_id: updatedReview.review_id})
           .then((updatedReview) => updatedReview[0])
}

function destroy(review_id) {
    return knex('reviews')
           .where({review_id})
           .del()
}

function addCritic(review_id){
    return knex('reviews as r')
          .join('critics as c', 'r.critic_id', 'c.critic_id')
          .select('*')
          .where({review_id})
          .first()
          .then(critic)
}

module.exports = {
    list,
    update,
    destroy,
    addCritic
}