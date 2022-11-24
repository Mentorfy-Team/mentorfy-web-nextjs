import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  show: boolean;
  video: string;
  volume: number;
};

const Player: React.FC<Props> = ({ show, video, volume }) => {
  return (
    <ReactPlayer
      id="goto"
      className={(show ? '' : 'hide') + ' video' + ' react-player'}
      url={show ? video : ''}
      width="100%"
      loop={true}
      height="100%"
      playing={true}
      controls={false}
      volume={volume}
      config={{
        youtube: {
          playerVars: {
            showinfo: 0,
            controls: 0,
            autoplay: 1,
            disablekb: 0,
          },
        },
      }}
    />
  );
};

export default Player;
