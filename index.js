const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = 3400;
app.listen(PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Client started at port ${PORT}`);
});