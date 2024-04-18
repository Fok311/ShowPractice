const express = require("express");

// create express router for movies
const router = express.Router();

// load all the models
const Show = require("../models/show");

router.get("/", async (req, res) => {
    try {
        const genre = req.query.genre;
        const rating = req.query.rating;
        const premiere_year = req.query.premiere_year;
      let shows = [];
      if (genre) {
        shows = await Show.find({ genre: genre });
      }  else if (rating) {
        shows = await Show.find({ rating: { $gt: rating } });
      } else if (premiere_year) {
        shows = await Show.find({ premiere_year: { $gt: premiere_year } });
      } else {
        shows = await Show.find();
      }
      res.status(200).send(shows);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });

router.get("/:id", async (req, res) => {
  try {
    //   const movie = await Movie.findOne({ _id: req.params.id });
    const show = await Show.findById(req.params.id);
    res.status(200).send(show);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
// export default router;
