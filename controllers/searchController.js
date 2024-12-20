const axios = require('axios');

const { getAccessToken } = require('./authController');

const spotifySearch = async (req, res) => {
    const { search } = req.query;
    const access_token = getAccessToken();
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${search}&type=album,artist,playlist,track&limit=4`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token,
                },
            }
        );
        const albums = response.data.albums.items || [];
        const artists = response.data.artists.items || [];
        const playlists = response.data.playlists.items || [];
        const tracks = response.data.tracks.items || [];
        res.json({ albums, artists, playlists, tracks })
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve search");
    }
};

const getTrack = async (req, res) => {
    const { trackID } = req.query;
    const access_token = getAccessToken();
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get track");
    }
};


module.exports = { spotifySearch, getTrack };