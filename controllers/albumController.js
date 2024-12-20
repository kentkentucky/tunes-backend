const axios = require('axios');

const { getAccessToken } = require('./authController');

const getAlbum = async (req, res) => {
    const { albumID } = req.query;
    const access_token = getAccessToken();
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get album");
    }
}

module.exports = { getAlbum };