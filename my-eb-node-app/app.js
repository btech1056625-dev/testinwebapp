const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const path = require('path');

// Basic route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});