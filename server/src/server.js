const express = require("express");
require('dotenv').config();
const http = require("http");

const PORT = process.env.PORT;

const { expressConfig } = require("./config/expressConfig");
const { connectToDB } = require("./config/databaseConfig");
const router = require("./routes");

const app = express();
expressConfig(app);
app.use(router);

const { initSocket } = require("./socket.js");
const { syncHeadAdmin } = require("./config/headAdminSync.js");

const server = http.createServer(app);
const io = initSocket(server);

syncHeadAdmin();

server.listen(PORT, () => {
    console.log(`Server (API + WebSocket) running on port ${PORT}`);
    connectToDB()
        .then(() => console.log("Successfully connected to the database"))
        .catch((err) => console.log(`Error connecting to the database: ${err}`));
});
module.exports = io;