import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import { useReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/esm/Button";
import Chat_offcanvas from "./Chat_offcanvas";
import ScreenRecorder from "../service/ScreenRecorder";
const Footer = ({
  micOn,
  handleUserMikeStream,
  camOn,
  handleUserCameraStream,
  handleClose,
  handleShow,
  show,
  messages,
  handleSendMessage,
  handleStopRecording,
  handleStartRecording,
  isRecording,
  handleCallEnd
}) => {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="secondary" fixed="bottom">
        <Container style={{ justifyContent: "center" }}>
          <Chat_offcanvas
            handleClose={handleClose}
            handleShow={handleShow}
            show={show}
            messages={messages}
            handleSendMessage={handleSendMessage}
          />

          {!micOn && (
            <span
              className="material-symbols-outlined"
              onClick={handleUserMikeStream}
            >
              mic
            </span>
          )}
          {micOn && (
            <span
              className="material-symbols-outlined"
              onClick={handleUserMikeStream}
            >
              mic_off
            </span>
          )}
          {!camOn && (
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: "3%" }}
              onClick={handleUserCameraStream}
            >
              videocam_off
            </span>
          )}
          {camOn && (
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: "3%" }}
              onClick={handleUserCameraStream}
            >
              videocam
            </span>
          )}

          <Button variant="secondary" onClick={handleShow}>
            Chat
          </Button>
          <Button
            onClick={handleStartRecording}
            disabled={isRecording}
            style={{ marginLeft: "1%", marginRight: "1%" }}
          >
            Start Recording
          </Button>
          <Button
            onClick={handleStopRecording}
            disabled={!isRecording}
            style={{ marginLeft: "1%", marginRight: "1%" }}
          >
            Stop Recording
          </Button>
          <span
            className="material-symbols-outlined"
            style={{ marginLeft: "1%", marginRight: "1%" }}
            onClick={handleCallEnd}
          >
            call_end
          </span>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Footer;
