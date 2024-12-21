const { User } = require('../data/mongodb');

const getRecents = async (req, res) => {
    const { user: { id } } = req.query;
    try {
        const getRecents = await User.findById(id).populate("recents");
        res.json(getRecents.recents);
    } catch (error) {
        console.error(error);
        res.status(404).send("No recents");
    }
};

module.exports = { getRecents };