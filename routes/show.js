const express = require("express");
const { getShows, addShow, updateShow } = require("../controller/show")

// create express router for movies
const router = express.Router();

// load all the models
const Show = require("../models/show");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    const premiere_year = req.query.premiere_year;
    const shows = await getShows(genre, rating, premiere_year)
    res.status(200).send(shows);
  } catch (error) {
    res.status(400).send({
        message: error.message
      })
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

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const newShow = await addShow(
      title,
      creator,
      premiere_year,
      seasons,
      genre,
      rating
    );
    // put addMovie function here
    res.status(200).send(newShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const show_id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;
    const updatedShow = await updateShow(
      show_id,
      title,
      creator,
      premiere_year,
      seasons,
      genre,
      rating
    );
    // put addMovie function here
    res.status(200).send(updatedShow);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const show_id = req.params.id;
    await Show.findByIdAndDelete(show_id);
    res.status(200).send("Show has been succeessfully deleted.")
  } catch (error) {
    res.status(400).send({
      message: error.messsage,
    });
  }
});

module.exports = router;
// export default router;
