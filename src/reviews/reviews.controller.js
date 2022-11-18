const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validReview(res,req,next) {
    const reviewId = req.body.data.review_id;
    const validReview = await reviewsService.read(reviewId)

    if (validReview) {
        res.locals.validReview = validReview
        return next()
    } next({
        status:404, message:'Review cannot be found.'
    })
}

async function update(req,res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const data = await reviewsService.updated(updatedReview)
    res.json({data})
}

    async function destroy(req, res, next) {
    const {review} = res.locals;
    const data = await reviewsService.delete(review.review_id)
    res.sendStatus(204).json({data:data})
}


module.exports = {
    update:[asyncErrorBoundary(validReview),asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(validReview), asyncErrorBoundary(destroy)],

}