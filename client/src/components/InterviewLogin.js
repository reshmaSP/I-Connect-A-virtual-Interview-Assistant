import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

const InterviewerLogin = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      style={{
        display: "block",
        width: "100%",
        justifyContent: "center",
        marginTop: "8%",
        border: "2px solid Black",
        borderRadius: "25px",
        backgroundColor: "rgb(210, 210, 210, 0.6)",
        zIndex: "5",
        boxShadow: "2px 5px"
      }}
    >
      <h1
        style={{
          marginBottom: "2%",
          marginTop: "5%",
          paddingLeft: "15%",
          color: "black",
        }}
      >
        Welcome to Virtual Interview Assistant Lobby<br></br>
        Login 
      </h1>
      <hr style={{ marginLeft: "15%", marginRight: "15%", color: "black"}}></hr>
      <Form
        onSubmit={handleSubmitForm}
        style={{
          marginBottom: "5%",
          marginLeft: "20%",
          marginRight: "20%",
          color: "black",
          fontSize: "20px",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>Enter Username</b></Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><b>Enter Password</b></Form.Label>
          <Form.Control
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Row xs={6}>
        <Col>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "4%" }}
          >
            Login
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "4%" }}
          >
            Sign up
          </Button>
        </Col>
        </Row>
        
      </Form>
    </Container>
  );
};

export default InterviewerLogin;