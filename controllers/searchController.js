const axios = require('axios');

const { Search, User, Recent } = require('../data/mongodb');

const addSearch = async (userID, search) => {
    const existingSearch = await Search.findOne(search);
    if(!existingSearch) {
        const addSearch = await Search.create(search);
        const addSearchID = await User.findByIdAndUpdate(userID, { $push: { searches: addSearch._id } });
        if(addSearchID) return { success: true, message: "Successfully added search" };
    }
    return { success: false, message: "Search exists" };
};

const addRecent = async (userID, search) => {
    const existingRecent = await Recent.findOne(search);
    if(!existingRecent) {
        const addRecent = await Recent.create(search);
        const addRecentID = await User.findByIdAndUpdate(userID, { $push: { recents: addRecent._id } });
        if(addRecentID) return { success: true, message: "Successfully added recent" };
    }
    return { success: false, message: "Recent exists" };
};

const spotifySearch = async (req, res) => {
    const { search, accessToken } = req.query;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${search}&type=album,artist,playlist,track&limit=4`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
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
    const { trackID, accessToken } = req.query;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${trackID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get track");
    }
};

const getAlbum = async (req, res) => {
    const { albumID, accessToken } = req.query;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get album");
    }
}

const getArtist = async (req, res) => {
    const { artistID, accessToken } = req.query;
    try {
        const artistResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
        );
        const topTracksResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}/top-tracks`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
        );
        const albumsResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${artistID}/albums`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
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

const getPlaylist = async (req, res) => {
    const { playlistID, accessToken } = req.query;

    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistID}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to get album");
    }
};

const addAlbum = async (req, res) => {
    const { user: { id: userID }, } = req.body;
    const { album: { type, id, uri, images, name, artists }, } = req.body;
    const search = {
        "type": type,
        "id": id,
        "uri": uri,
        "images": images,
        "name": name,
        "artists": artists
    };
    try {
        // add to searches
        const searchquery = await addSearch(userID, search);
        if (searchquery.success) res.status(201).send(searchquery.message);
        else res.status(200).send(searchquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
};


const addArtist = async (req, res) => {
    const { user: { id: userID }, } = req.body;
    const { artist: { type, id, uri, images, name }, } = req.body;
    const search = {
        "type": type,
        "id": id,
        "uri": uri,
        "images": images,
        "name": name,
    };
    try {
        // add to searches
        const searchquery = await addSearch(userID, search);
        if (searchquery.success) res.status(201).send(searchquery.message);
        else res.status(200).send(searchquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
}

const addPlaylist = async (req, res) => {
    const { user: { id: userID }, } = req.body;
    const { playlist: { type, id, uri, images, name }, } = req.body;
    const search = {
        "type": type,
        "id": id,
        "uri": uri,
        "images": images,
        "name": name,
    };
    try {
        // add to searches
        const searchquery = await addSearch(userID, search);
        if (searchquery.success) res.status(201).send(searchquery.message);
        else res.status(200).send(searchquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
}

const addTrack = async (req, res) => {
    const { user: { id: userID }, } = req.body;
    const { track: { type, id, uri, album, name, artists }, } = req.body;
    const search = {
        "type": type,
        "id": id,
        "uri": uri,
        "album": album,
        "name": name,
        "artists": artists
    };
    try {
        // add to searches
        const searchquery = await addSearch(userID, search);
        if (searchquery.success) res.status(201).send(searchquery.message);
        else res.status(200).send(searchquery.message);

        // add to recents
        const recentquery = await addRecent(userID, search);
        if (recentquery.success) res.status(201).send(recentquery.message);
        else res.status(200).send(recentquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
}

const getRecent = async (req, res) => {
    const { user: { id } } = req.query;
    try {
        const getSearches = await User.findById(id).populate("searches");
        res.json(getSearches.searches);
    } catch (error) {
        console.error(error);
        res.status(404).send("No recent searches");
    }
}

module.exports = { spotifySearch, getTrack, getAlbum, getArtist, getPlaylist, addAlbum, addArtist, addPlaylist, addTrack, getRecent };