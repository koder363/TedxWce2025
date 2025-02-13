import React from 'react';
import YouTube from 'react-youtube';
import './YoutubePlayer.css'; // Import CSS

function YoutubePlayer() {
  const videoId = "7yxaE442q6s"; // Replace with your YouTube video ID

  const opts = {
    playerVars: {
      autoplay: 1,         // Auto-play video
      controls: 0,         // Hide YouTube controls
      modestbranding: 1,   // Hide YouTube logo
      rel: 0,              // Prevent showing related videos
      loop: 1,             // Enable looping
      playlist: videoId,   // Required for looping
      showinfo: 0,         // Hide video title (deprecated, but works on some videos)
      disablekb: 1,        // Disable keyboard controls
      fs: 0,               // Disable full-screen button
      mute: 1
    },
  };

  return (
    <div className="video-container">
      <YouTube videoId={videoId} opts={opts} className="youtube-player" />
    </div>
  );
}

export default YoutubePlayer;
