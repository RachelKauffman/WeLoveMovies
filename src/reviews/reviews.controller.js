const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validReview(req,res,next) {
    const {reviewId} = req.params;
    const data = await reviewsService.list()
    const validReview = data.find((review) => reviewId == review.review_id)
    
    if (validReview) {
      res.locals.validReview = validReview;
      return next()
    } 
  next ({status: 404, message: 'Cannot be found.'})
}

async function update(req,res) {
  const review_id = req.params.reviewId
    const updatedReview = {
        ...req.body.data,
        review_id: review_id,
    }
    const review = await reviewsService.update(updatedReview)
    const critic = await reviewsService.addCritic(review_id)
    res.json({data:{...review, ...critic}})
}

    async function destroy(req, res, next) {
    const {reviewId} = req.params;
    await reviewsService.destroy(reviewId)
    res.sendStatus(204)
}


module.exports = {
    update:[asyncErrorBoundary(validReview),asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(validReview), asyncErrorBoundary(destroy)],

}