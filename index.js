const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const loginRouter = require('./routes/loginRoutes'); 
const searchRouter = require('./routes/searchRoutes');
const homeRouter = require('./routes/homeRoutes');
const authRouter = require('./routes/authRoutes');

// middleware to accept json request bodies
app.use(express.json()); 
// allows requests from cross-origin (not same origin)
app.use(cors()); 

app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});