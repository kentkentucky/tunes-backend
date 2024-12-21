const { Recent, User } = require('../data/mongodb');

const addRecent = async (userID, search) => {
    const existingRecent = await Recent.findOne(search);
    if(!existingRecent) {
        const addRecent = await Recent.create(search);
        const addRecentID = await User.findByIdAndUpdate(userID, { $push: { recents: addRecent._id } });
        if(addRecentID) return { success: true, message: "Successfully added recent" };
    }
    return { success: false, message: "Recent exists" };
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
        // add to recents
        const recentquery = await addRecent(userID, search);
        if (recentquery.success) res.status(201).send(recentquery.message);
        else res.status(200).send(recentquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
};

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
        // add to recents
        const recentquery = await addRecent(userID, search);
        if (recentquery.success) res.status(201).send(recentquery.message);
        else res.status(200).send(recentquery.message);
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to add search");
    }
}

module.exports = { addAlbum, addPlaylist };