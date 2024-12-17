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