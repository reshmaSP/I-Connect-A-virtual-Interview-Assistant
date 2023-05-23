import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useReactMediaRecorder } from 'react-media-recorder';

const ScreenRecorder = ({urlCapturer}) => {
    const [url, setUrl] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    screen: true,
    onStop: (blobUrl) => {
      // Do something with the recorded audio blob URL
      console.log('Recorded video:', blobUrl);
    },
  });
  useEffect(()=>{
    setUrl(mediaBlobUrl);
    urlCapturer(mediaBlobUrl);
  })
  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  return (
    <>
      <Button onClick={handleStartRecording} disabled={isRecording}>
        Start Recording
      </Button>
      <Button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </Button>
    </>
  );
};

export default ScreenRecorder;