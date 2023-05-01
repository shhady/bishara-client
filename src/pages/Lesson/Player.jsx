// import React, { useState, useEffect } from 'react';

// const Player = ({ videoId }) => {
//   const [playerUrl, setPlayerUrl] = useState('');

//   useEffect(() => {
//     // Load the YouTube Data API script asynchronously
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // Retrieve video metadata using the YouTube Data API
//     fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,player&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const video = data.items[0];
//         const player = video.player.embedHtml;

//         // Remove the "Watch on YouTube" button from the player URL
//         const parser = new DOMParser();
//         const dom = parser.parseFromString(player, 'text/html');
//         const iframe = dom.querySelector('iframe');
//         const src = iframe.src.replace('?feature=oembed', '');
//         setPlayerUrl(src);
//       });

//     return () => {
//       // Clean up the global reference to the player
//       window.onYouTubeIframeAPIReady = undefined;
//     };
//   }, [videoId]);

//   return (
//     <div>
//       {playerUrl && (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: playerUrl,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Player;
