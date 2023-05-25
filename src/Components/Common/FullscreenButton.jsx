import React from 'react';

const FullScreenButton = () => {
  const handleClick = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  return (
    <button onClick={handleClick}>Go Fullscreen</button>
  );
};

export default FullScreenButton;