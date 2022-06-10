const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Playlist = require("../models/Playlist");

// GET api/playlist
router.get("/", auth, async (req, res) => {
  try {
    const playlist = await Playlist.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(playlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// POST api/playlist
router.post("/", auth, async (req, res) => {
  try {
    const newPlaylist = new Playlist({
      name: req.body.name,
      private: req.body.private,
      movieid: [
        {
          imdbID: req.body.movieid[0].imdbID,
          title: req.body.movieid[0].title,
          poster: req.body.movieid[0].poster,
          imdbRating: req.body.movieid[0].imdbRating,
          runtime: req.body.movieid[0].runtime,
          actors: req.body.movieid[0].actors,
          release: req.body.movieid[0].release,
        },
      ],
      user: req.user.id,
    });
    let playlist;
    const check = await Playlist.exists({ name: req.body.name });
    if (check == null) {
      playlist = await newPlaylist.save();
      res.json(playlist);
    } else {
      Playlist.findOneAndUpdate(
        { name: req.body.name },
        {
          $push: {
            movieid: {
              imdbID: req.body.movieid[0].imdbID,
              title: req.body.movieid[0].title,
              poster: req.body.movieid[0].poster,
              imdbRating: req.body.movieid[0].imdbRating,
              runtime: req.body.movieid[0].runtime,
              actors: req.body.movieid[0].actors,
              release: req.body.movieid[0].release,
            },
          },
        },
        { upsert: true, returnOriginal: false },
        (err, doc) => {
          if (err) {
            res.send(err);
          } else {
            res.send(doc);
          }
        }
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//publicget
router.get("/:userid", async (req, res) => {
  try {
    const playlist = await Playlist.find({ user: req.params.userid }).sort({
      date: -1,
    });
    res.json(playlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
})

//delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ msg: "Playlist not found" });
    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Playlist.findByIdAndRemove(req.params.id);
    res.json({ msg: "Playlist removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
