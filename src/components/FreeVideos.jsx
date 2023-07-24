import React from 'react'
import "./FreeVideos.css"

export default function FreeVideos() {
  return (
    <div className='mainFreeVideos'>
        <div style={{
              color: "black",
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: "bold",
              marginRight:"5px"
            }}>عزف مدرسون</div>
            <div className='allVideos'>
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/XcIChKQLEXU`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            <div className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/RJRhMdO8vo0`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/XbHqqqjqLsc?list=PLVyh_TRAmEfFFMHb4lkDnnp_aExzNaMli`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            <div  className="videoFree">
            <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/y1gYGUhrccs`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
            </div>
            </div>
    </div>
  )
}
