// packages
import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

// Instances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serving HTML File
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

// Define a connection event handler
io.on("connection", (client) => {
    console.log("User Connected To (server)");
    // console.log(socket);

    // ----
    // Emit a 'message' event to the client
    // client.emit("message", "welcome to the server. Server is sending that data to the client."); 
    // Này gửi từ server tới client (gửi bằng emit)
    
    // Gửi từ client lên cho server nhận và nhận bằng on
    client.on("message", (message) => {
        console.log(message)
    })
    // ----
    
    client.on('disconnect', () => {
        console.log('User Dissconnected From (Server)');
    })
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});