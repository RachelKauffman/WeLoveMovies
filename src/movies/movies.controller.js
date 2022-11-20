const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list all movies, if is_showing is true, only show those movies

async function list (req, res, next) {
    if (req.query) {
      req.query.is_showing === "true" &&
        res.json({ data: await moviesService.listIsShowing() });
    }
    res.json({ data: await moviesService.list() });
  };


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

async function read(req,res) {
    const movie = res.locals.movie.movie_id
    res.json({data:await moviesService.read(movie)})
}

async function theaters(req,res) {
    const movie = res.locals.movie.movie_id;
    res.json({data: await moviesService.theaters(movie)})
}

async function reviews(req,res) {
    const movie = res.locals.movie.movie_id;
    res.json({data: await moviesService.reviews(movie)})
}



module.exports = {
    read: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(read)],
    theaters:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(theaters)],
    reviews:[asyncErrorBoundary(movieIsValid), asyncErrorBoundary(reviews)],
   list: [asyncErrorBoundary(list)],
}