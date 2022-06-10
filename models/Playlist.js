const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: { type: String },
  private: {
    type: Boolean,
    default: true,
  },
  movieid: [
    {
      imdbID: { type: String },
    },
  ],
});

module.exports = mongoose.model("playlist", PlaylistSchema);
