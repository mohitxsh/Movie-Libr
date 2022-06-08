const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Watchlist = require("../models/Watchlist");

// GET api/watchlist
router.get("/", auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(watchlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// POST api/watchlist
router.post("/", auth, async (req, res) => {
  const { i, poster, t, year } = req.body;
  try {
    const newWatchlist = new Watchlist({
      i,
      poster,
      t,
      year,
      user: req.user.id,
    });
    const watchlist = await newWatchlist.save();
    res.json(watchlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
