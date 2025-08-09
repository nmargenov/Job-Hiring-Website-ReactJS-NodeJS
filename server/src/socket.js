let io = null;

function initSocket(server) {
    const { Server } = require("socket.io");
    io = new Server(server, {
        cors: {
            origin: [process.env.FRONTEND_ORIGIN],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        const userID = socket.handshake.query.userId;

          if (userID) {
            socket.join(`user_${userID}`);
            console.log(`Socket ${socket.id} joined room user_${userID}`);
        } else {
            console.log(`Socket ${socket.id} connected without userId`);
        }

        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
        });
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initSocket, getIO };