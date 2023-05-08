import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import { useReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/esm/Button";

const Footer = ({
  micOn,
  handleUserMikeStream,
  camOn,
  handleUserCameraStream,
  setRecordingURL
}) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });

  const handleScreenRecording = () => {
    stopRecording();
    setRecordingURL(mediaBlobUrl)
  };

  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="secondary" fixed="bottom">
        <Container style={{ justifyContent: "center" }}>
          {!micOn && (
            <span
              class="material-symbols-outlined"
              onClick={handleUserMikeStream}
            >
              mic
            </span>
          )}
          {micOn && (
            <span
              class="material-symbols-outlined"
              onClick={handleUserMikeStream}
            >
              mic_off
            </span>
          )}
          {!camOn && (
            <span
              class="material-symbols-outlined"
              style={{ marginLeft: "3%" }}
              onClick={handleUserCameraStream}
            >
              videocam_off
            </span>
          )}
          {camOn && (
            <span
              class="material-symbols-outlined"
              style={{ marginLeft: "3%" }}
              onClick={handleUserCameraStream}
            >
              videocam
            </span>
          )}

          <p>{status}</p>
          <Button onClick={startRecording}>Start Recording</Button>
          <Button onClick={handleScreenRecording}>Stop Recording</Button>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Footer;
