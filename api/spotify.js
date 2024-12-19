const axios = require('axios');
require("dotenv").config();

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let access_token = null;

async function main() {
    access_token = await requestAccessToken();
}

const requestAccessToken = async () => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token", 
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientID,
                client_secret: clientSecret,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log("Successfully request access token");
        return response.data.access_token;
    } catch (error) {
        console.error(error);
    }
};

const getAccessToken = () => access_token;

setInterval(async () => {
    access_token = await requestAccessToken();
}, 3600000);

main().catch((err) => console.log(err));

module.exports = { getAccessToken };