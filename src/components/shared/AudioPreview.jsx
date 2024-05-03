import React from "react";

const AudioPreview = ({ audioUrl }) => {
  return (
    <>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioPreview;
