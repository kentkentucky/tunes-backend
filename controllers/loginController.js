const { User } = require('../data/mongodb');

const validateLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }, "email password username");
    if(!user) return res.status(404).send("Account not found! Please register.");
    if(user.email == email && user.password == password) return res.json({ id: user._id, username: user.username });
    res.status(400).send("Wrong email/password combination");
};

module.exports = { validateLogin };