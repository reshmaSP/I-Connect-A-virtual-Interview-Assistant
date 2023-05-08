import ReactPlayer from "react-player";

const VideoPlayer = ({ play, micStatus, stream }) => {
  return (
    <ReactPlayer
      playing={play}
      muted={micStatus}
      height={"450px"}
      width={"100%"}
      url={stream}
    />
  );
};

export default VideoPlayer;
