import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room?roomId=${room}&name=${email}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <Container
      style={{
        display: "block",
        width: "100%",
        justifyContent: "center",
        marginTop: "5%",
        border: "2px solid white",
        borderRadius: "25px",
      }}
    >
      <h1 style={{ marginBottom: "2%", marginTop: "5%", color: "green" }}>
        Welcome to Interview Assistant Lobby
      </h1>
      <hr style={{ marginLeft: "15%", marginRight: "15%" }}></hr>
      <Form
        onSubmit={handleSubmitForm}
        style={{
          marginBottom: "5%",
          marginLeft: "20%",
          marginRight: "20%",
          color: "green",
          fontSize: "20px",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your Name</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Please enter the room number: </Form.Label>
          <Form.Control
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room No"
          />
        </Form.Group>
        <Button
          variant="outline-success"
          type="submit"
          style={{ marginTop: "4%" }}
        >
          JOIN
        </Button>
      </Form>
    </Container>
  );
};

export default LobbyScreen;
