const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("user-cam-status", ({camStatus, remoteID}) => {
    console.log("user cam status received as "+camStatus+" remote socket ID: "+remoteID);
    io.to(remoteID).emit("remote-cam-status", camStatus);
  })

  socket.on("user-mike-status", ({mikeStatus, remoteID}) => {
    console.log("user Mike status received as "+mikeStatus+" remote socket ID: "+remoteID);
    io.to(remoteID).emit("remote-mike-status", mikeStatus);
  })


  socket.on("send-message-to-room", (data) => {
    const {msg, roomId} = data;
    console.log("receive-incoming-message "+ msg +" from "+socket.id+" and room Id is "+roomId)
    io.to(roomId).emit("receive-incoming-message", {from: socket.id, message: msg})
  })

});