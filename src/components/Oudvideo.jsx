import React from "react";
import PropTypes from "prop-types";

const Oudvideo = () => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="400px"
      src={`https://www.youtube.com/embed/d9-J5NQ9MRo`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

Oudvideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default Oudvideo;
