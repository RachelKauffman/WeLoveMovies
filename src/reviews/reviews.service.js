const knex = require("../db/connection");

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

function update(updatedReview) {
    return knex('reviews')
           .select("*")
           .where({review_id: updatedReview.review_id})
           .update(updatedReview, "*")
           .then((updatedReview) => updatedReview[0]);
}

function destroy(reviewId) {
    return knex('reviews')
           .select('*')
           .where({'review_id': reviewId})
           .first()
           .del()
}


module.exports = {
    update,
    delete: [destroy],
}