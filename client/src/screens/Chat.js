import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

const Chat = ({ handleSendMessage }) => {
  return (
    <Form onSubmit={handleSendMessage} style={{ paddingTop: "2%" }}>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter message"
            name="message"
          />
        </Form.Group>
      </Col>
      <Col>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Form>
  );
};

export default Chat;
