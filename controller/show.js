const Show = require("../models/show");

const getShows = async (genre, rating, premiere_year) => {
    try {
        let shows = [];
        if (genre) {
            shows = await Show.find({ genre: genre });
        }
        else if (rating) {
            shows = await Show.find({ rating: { $gt: rating } })
        }
        else if (premiere_year) {
            shows = await Show.find({ premiere_year: { $gt: premiere_year } })
        } else {
            shows = await Show.find();
        }
        return shows
    } catch (error) {
        throw new Error(error)
    }
}

const addShow = async (title, creator, premiere_year, seasons, genre, rating ) => {
    const newShow = new Show({
        title,
        creator,
        premiere_year,
        seasons,
        genre,
        rating
    });
    await newShow.save();
    return newShow
}

const updateShow = async (show_id, title, creator, premiere_year, seasons, genre, rating ) => {
    const updatedShow = await Show.findByIdAndUpdate(show_id,{
        title,
        creator,
        premiere_year,
        seasons,
        genre,
        rating
    }, { new: true});
    return updatedShow;
}


module.exports = {
    getShows,
    addShow,
    updateShow
};
