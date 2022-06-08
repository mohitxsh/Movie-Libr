const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	i: {
		type: String,
	},
    poster: {
        type: String,
    },
    plot: {
        type: String,
    },
    actors: {
        type: String,
    },
	t: {
		type: String
	},
	year: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('watchlist', WatchlistSchema);