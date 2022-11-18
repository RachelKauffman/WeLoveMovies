const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list all movies, if is_showing is true, only show those movies

async function list(req,res) {
    const is_showing = req.body.data.is_showing;
    let data;

    is_showing
     ? data = await moviesService.listIsShowing()
     : data = await moviesService.list();

     res.json({data: data})
}


async function movieIsValid(req,res,next) {
    const movieId = req.body.data.movie_id
    const validMovie = await moviesService.read(movieId)

    if (validMovie) {
        res.locals.validMovie = validMovie
        return next()
    } next({
        status:404, message:'Movie cannot be found'
    })
    
}
function read(req,res) {
    const movieId = req.body.data.movie_id;

    res.json({data:movieId})
}

async function theaters(req,res) {
    const data = await moviesService.theaters(res.locals.validMovie)
    res.json({data:data})
}

async function reviews(res,req) {
    const data = await moviesService.reviews(res.locals.validMovie)
    res.json({data:data})
}


module.exports = {
    list: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieIsValid), read],
    theaters:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(theaters)],
    reviews:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(reviews)],
}