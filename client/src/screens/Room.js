import React, { useEffect, useCallback, useState } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
// import { useParams } from "react-router-dom";
// import Offcanvas from "./Offcanvas";
// import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
// Importing Custom Components
import Footer from "./Footer";
import Chat from "./Chat";
import BlankScreen from "./BlankScreen";
import VideoPlayer from "./VideoPlayer";

const RoomPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(true);
  const [remoteStream, setRemoteStream] = useState(true);
  const { roomId } = queryParams.get("roomId");
  // const { name } = queryParams.get("name");
  // const [remoteSocketName, setRemotesocketname] = useState(null);
  const [message, setMessage] = useState("");
  // const [show, setShow] = useState(false);
  const [micOn, setMicon] = useState(false);
  const [camOn, setCamon] = useState(false);
  const [remoteCamstatus, setRemotecamstatus] = useState(false);
  const [remoteMikestatus, setRemoteMikestatus] = useState(false);
  const [recording, setRecording] = useState(null);

  const handleUserCameraStream = useCallback(() => {
    let state = !camOn;
    setCamon(!camOn);
    socket.emit("user-cam-status", {
      camStatus: state,
      remoteID: remoteSocketId,
    });
  });

  const setRecordingURL = (url) => {
    setRecording(url);
  }

  const handleUserMikeStream = useCallback(() => {
    let state = !micOn;
    setMicon(!micOn);
    socket.emit("user-mike-status", {
      mikeStatus: state,
      remoteID: remoteSocketId,
    });
  });

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    // setRemotesocketname(email);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleSendMessage = (event) => {
    event.preventDefault();
    let message = event.target.message.value;
    event.target.message.value = "";
    socket.emit("send-message-to-room", { msg: message, roomId: roomId });
  };

  function handleRemotecamStatus(camStatus) {
    setRemotecamstatus(camStatus);
  }

  function handleRemotemikeStatus(mikeStatus) {
    setRemoteMikestatus(mikeStatus);
  }

  const handleReceiveMessage = useCallback((data) => {
    const { from, message } = data;
    setMessage(message);
    console.log("Message received: " + message + " from " + from);
  });

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  // const handleShow = () => {
  //   setShow(true);
  // };

  // const handleClose = () => {
  //   setShow(false);
  // };

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("receive-incoming-message", handleReceiveMessage);
    socket.on("remote-cam-status", handleRemotecamStatus);
    socket.on("remote-mike-status", handleRemotemikeStatus);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("receive-incoming-message", handleReceiveMessage);
      socket.off("remote-cam-status", handleRemotecamStatus);
      socket.off("remote-mike-status", handleRemotemikeStatus);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleReceiveMessage,
    handleRemotecamStatus,
    handleRemotemikeStatus,
  ]);

  return (
    <Container
      fluid
      style={{
        display: "block",
        width: "100%",
        justifyContent: "center",
        marginTop: "2%",
        // border: "2px solid white",
        borderRadius: "25px",
        marginBottom: "5%",
        paddingBottom: "5%",
      }}
    >
      {/* <Button onClick={handleShow}>Chat</Button> */}
      {/* <Offcanvas handleShow={handleShow} show={show} handleClose={handleClose}></Offcanvas> */}
      console.log("Message state is" + ${message}) console.log("Remote Cam state
      is" + ${remoteCamstatus})
      console.log("Recording URL state is" + ${recording})
      <h1 style={{ marginTop: "1%", color: "green" }}>Room Page</h1>
      <h2 style={{ marginBottom: "2%", color: "green" }}>
        {remoteSocketId ? "Connected" : "No one in room"}
      </h2>
      {myStream && (
        <Button onClick={sendStreams} style={{ marginRight: "1%" }}>
          Send Stream
        </Button>
      )}
      {remoteSocketId && <Button onClick={handleCallUser}>CALL</Button>}
      <Row style={{ paddingTop: "3%" }}>
        <Col xs={6}>
          {remoteStream && (
            <>
              <h1 style={{ color: "green" }}>Remote Stream</h1>
              {!remoteCamstatus && <BlankScreen />}

              {remoteCamstatus && (
                <VideoPlayer
                  play={true}
                  micStatus={remoteMikestatus}
                  stream={remoteStream}
                />
              )}
            </>
          )}
        </Col>
        <Col xs={6}>
          {myStream && (
            <>
              <h1 style={{ color: "green" }}>My Stream</h1>
              {!camOn && <BlankScreen />}

              {camOn && (
                <VideoPlayer play={true} micStatus={micOn} stream={myStream} />
              )}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Chat handleSendMessage={handleSendMessage} />
      </Row>
      {/* Footer Starts Here */}
      <Footer
        micOn={micOn}
        handleUserMikeStream={handleUserMikeStream}
        camOn={camOn}
        handleUserCameraStream={handleUserCameraStream}
        setRecordingURL={setRecordingURL}
      />
    </Container>
  );
};

export default RoomPage;
