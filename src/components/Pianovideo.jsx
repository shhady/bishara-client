import React from "react";
import PropTypes from "prop-types";

const Pianovideo = () => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="400px"
      src={`https://www.youtube.com/embed/Jk9a4OOc9-Y`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

Pianovideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default Pianovideo;
