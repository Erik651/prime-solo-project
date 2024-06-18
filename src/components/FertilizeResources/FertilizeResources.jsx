import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';


  const  fertilizeResources = () => {
    
    const history = useHistory();

    const videos = [
      { videoId: "Snq-L0Ut4wY", title: "At 19:24, Fertilize Guide" },
      { videoId: "1Zk2ncE2Frg", title: "At 33:24, Fertilize Guide" },
      { videoId: "1Tvyam459sQ", title: "At 11:06, Fertilize Guide" },
    ];

    const urlLinks = [
      {  url: 'https://bonsaitonight.com/2014/07/18/developing-black-pine-setting-the-first-curves/', title: 'Great Artcile by JONAS DUPUICH'  }
    ]
  
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };
  
    const onReady = (event) => {
      event.target.pauseVideo();
    };

    const goBack = () => {
      history.goBack();
    };
  
    return (
      <div>
      <button onClick={goBack}>Back</button>
      <div>
        <h3>Additional Resources:</h3>
        {urlLinks.map((link, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
          </div>
        ))}
      </div>
      {videos.map((video) => (
        <div key={video.videoId} style={{ marginBottom: '20px' }}>
          <h3>{video.title}</h3>
          <YouTube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      ))}
    </div>
  );
  };



export default fertilizeResources;