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
      movieid: [{imdbID: req.body.movieid}],
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
        { $push: { movieid: { imdbID: req.body.movieid } } },
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

module.exports = router;
