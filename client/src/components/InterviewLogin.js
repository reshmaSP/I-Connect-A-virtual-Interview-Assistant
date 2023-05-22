import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Modal, Row } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../screens/firebase";


const auth =getAuth(app);
const InterviewerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = React.useState(false);


  const Register=()=>{
    // alert("registering");
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  const signinUser=()=>{
    signInWithEmailAndPassword(auth,email,password).then((value)=>{
      alert("successfully signed in");
    })
    .catch(()=>{
      alert("Invalid username or password");
    })
  }
  const handleSubmitForm = (event) => {
    event.preventDefault();
    signinUser();
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
        // onSubmit={handleSubmitForm}
        style={{
          marginBottom: "5%",
          marginLeft: "20%",
          marginRight: "20%",
          color: "black",
          fontSize: "20px",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>Enter Email</b></Form.Label>
          <Form.Control
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Row xs={6}>
        <Col>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "4%" }}
            onClick={handleSubmitForm}
          >
            Login
          </Button>
        </Col>
        </Row>
        <Col>
          <Button
            variant="success"
            type="submit"
            style={{ marginTop: "4%" }}
            onClick={Register}
          >
            Sign up
          </Button>
        </Col>
        
        </Form>

      
    </Container>
  );
};

export default InterviewerLogin;