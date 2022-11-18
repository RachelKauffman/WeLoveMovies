const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list all movies, if is_showing is true, only show those movies

async function list(req,res) {
    let is_showing = req.query.is_showing;
    let data;

    is_showing
     ? (data = await moviesService.listIsShowing())
     : (data = await moviesService.list());

     res.json({data: data})
}


async function movieIsValid(req,res,next) {
    const {movieId} = req.params;
    const movie = await moviesService.read(Number(movieId))

    if (movie) {
        res.locals.movie = movie;
        return next();
    } next({
        status:404, message:'Movie cannot be found.'
    })
    
}

function read(req,res) {
    res.json({data:res.locals.movie})
}

async function theaters(req,res) {
    const {movieId} = req.params
    let data = await moviesService.theaters(movieId)
    res.json({data:data})
}

async function reviews(res,req) {
    const {movieId} = req.params;
    let data = await moviesService.reviews(movieId)
    res.json({data:data})
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieIsValid), read],
    theaters:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(theaters)],
    reviews:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(reviews)],
}