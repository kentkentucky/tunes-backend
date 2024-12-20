require("dotenv").config();

const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let redirect_uri = 'http://localhost:5173/home';

let access_token = null;

const getAuth = (req, res) => {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';

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

const requestAccessToken = async(req, res) => {
    const { code } = req.body;
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token", 
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:5173/home',
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
        access_token = response.data.access_token;
        res.json(response.data.access_token);
    } catch (error) {
        console.error(error);
    }
};

const getAccessToken = () => access_token;

module.exports = { getAuth, requestAccessToken, getAccessToken };