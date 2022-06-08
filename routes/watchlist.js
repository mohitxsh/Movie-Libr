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
  const { i, poster, plot, actors, t, year } = req.body;
  try {
    const newWatchlist = new Watchlist({
      i,
      poster,
      plot,
      actors,
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

//DELETE api/watchlist/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.id);
    console.log(watchlist);
    console.log(req.params);
    if (!watchlist) return res.status(404).json({ msg: "Watchlist not found" });
    if (watchlist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Watchlist.findByIdAndRemove(req.params.id);
    res.json({ msg: "Watchlist removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
