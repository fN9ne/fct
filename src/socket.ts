import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const socket: Socket = io(SERVER_URL, {
	transports: ["websocket"],
});

export default socket;
