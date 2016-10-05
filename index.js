"use strict";
const express = require("express");
const socketIO = require("socket.io");
const minimist = require("minimist");
const app = express();
const argv = minimist(process.argv.slice(2));
const port = argv["p"] || 8000;
const host = argv["h"] || "localhost";
app.use(express.static(__dirname + "/static"));
const server = app.listen(port, host, () => {
    console.log(`api Server is listening: ${host}:${port}`);
});
const io = socketIO(server);
io.on("connection", socket => {
    const room = socket.handshake.query.room;
    if (!room) {
        socket.disconnect(true);
    }
    else {
        socket.join(room);
        socket.on("copy", (data) => {
            io.in(room).emit("copy", data);
        });
    }
});
//# sourceMappingURL=index.js.map