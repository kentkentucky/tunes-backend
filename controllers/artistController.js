const axios = require('axios');

const { getAccessToken } = require('../api/spotify');

const getArtist = async (req, res) => {
    const { artistID } = req.query;
    const access_token = getAccessToken();
    try {
        const artistResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }
        );
        const topTracksResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }
        );
        const albumsResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }
        );
        const artist = artistResponse.data;
        const tracks = topTracksResponse.data;
        const albums = albumsResponse.data
        res.json({ artist, tracks, albums });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get album");
    }
};

module.exports = { getArtist };