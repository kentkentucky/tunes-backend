require("dotenv").config();

const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:5173/login';

const getAuth = (req, res) => {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-currently-playing';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
};

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const requestAccessToken = async (req, res) => {
    const { code } = req.body;
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token", 
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
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
        res.json(response.data.access_token);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { getAuth, requestAccessToken };