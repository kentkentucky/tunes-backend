const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// middleware to accept json request bodies
app.use(express.json()); 
// allows requests from cross-origin (not same origin)
app.use(cors()); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});