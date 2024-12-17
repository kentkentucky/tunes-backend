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

const userSchema = new mongoose.Schema({username: String, email: String, password: String, playlists: [{ type: mongoose.ObjectId, ref: 'Playlist'}], recents: [{ type: mongoose.ObjectId, ref: 'Recent'}]});
const User = mongoose.model("User", userSchema);

module.exports = { User };