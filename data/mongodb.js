require("dotenv").config();
const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.set("strictQuery", false);

async function main() {
    try {
        await mongoose.connect(mongoDB);
        console.log("Successfully connected to database");
    } catch (error) {
        console.error(error);
    }
}

main().catch((err) => console.log(err));

const userSchema = new mongoose.Schema({username: String, email: String, password: String, playlists: [{ type: mongoose.ObjectId, ref: 'Playlist'}], recents: [{ type: mongoose.ObjectId, ref: 'Recent'}], searches: [{ type: mongoose.ObjectId, ref: 'Searche'}]});
const User = mongoose.model("User", userSchema);
const searchSchema = new mongoose.Schema({type: String, id: String, uri: String, images: Array, album: Object, name: String, artists: Array});
const Search = mongoose.model("Searche", searchSchema);
const songSchema = new mongoose.Schema({name: String, uri: String, artists: Array, images: Array, id: String});
const Song = mongoose.model("Song", songSchema);
const recentSchema = new mongoose.Schema({type: String, id: String, uri: String, images: Array, album: Object, name: String, artists: Array});
const Recent = mongoose.model("Recent", recentSchema);

module.exports = { User, Search, Song, Recent };