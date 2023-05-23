import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { useRef, useState } from "react";

const Chat = ({ handleSendMessage }) => {

  const[message, setMessage] = useState('')
 
  const messageHandler = (event) => {
    event.preventDefault();
    // let message = event.target.message.value;
    console.log("event.target.message : "+message)
    handleSendMessage(message);
  }

  return (
    <Form
      onSubmit={messageHandler}
      style={{ position: "fixed", bottom: "0" }}
    >
      {/* <Row>
        <Col> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter message"
              name="message"
              onChange={(e)=> setMessage(e.target.value)} 
            />
          </Form.Group>
        {/* </Col>
        <Col> */}
          <Button variant="primary" type="submit" onClick={messageHandler}>
            Submit
          </Button>
        {/* </Col>
      </Row> */}
    </Form>
  );
};

export default Chat;
