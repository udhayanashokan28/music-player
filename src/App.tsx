import { useCallback, useMemo, useState } from "react";

import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export interface ISong {
  id: number;
  title: string;
  mp3Path: string;
  imgPath: string;
}

const MusicPlayer = () => {
  //to pass play and pause create variable
  const [playerStatus, setPlayerStatus] = useState<string>("pause");
  //entha song play pananumnu decide panrathuku oru varibale create
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  //ethana song irukurathu variable store pani vaikiren
  const [songs, setSongs] = useState<ISong[]>([
    {
      id: 3,
      title: "ukulele",
      mp3Path: "assets/music/ukulele.mp3",
      imgPath: "assets/images/ukulele.jpg",
    },
    {
      id: 1,
      title: "hey",
      mp3Path: "assets/music/hey.mp3",
      imgPath: "assets/images/hey.jpg",
    },
    {
      id: 2,
      title: "summer",
      mp3Path: "assets/music/summer.mp3",
      imgPath: "assets/images/summer.jpg",
    },
  ]);
  //declare panuna variable la irundhu inoru variable undakuna athuku usememo use pananum
  const currentSong = useMemo(() => {
    return songs[currentSongIndex];
  }, [currentSongIndex, songs]);
  console.log(currentSong);
  //play button click panuna playerstatus play set pananum
  const playMusic = useCallback(() => {
    setPlayerStatus("play");
  }, []);
   //pause button click panuna playerstatus pause set pananum
  const pauseMusic = useCallback(() => {
    setPlayerStatus("pause");
  }, []);
   //previous button click panuna previous song index set pananum
   //current song o index na poga kudathu
  const previousMusic = useCallback(() => {
    if (currentSongIndex === 0) {
      return;
    }
    setCurrentSongIndex(currentSongIndex - 1);
    setPlayerStatus("play");
  }, [currentSongIndex]);
     //next button click panuna next song index set pananum
  const nextMusic = useCallback(() => {
    console.log(currentSongIndex);
    if (currentSongIndex === songs.length - 1) {
      return;
    }
    setCurrentSongIndex(currentSongIndex + 1);
    setPlayerStatus("play");
  }, [currentSongIndex, songs.length]);
  return (
    <div>
      <div className=" text-[2em] font-bold">Music Player</div>
      <div className={`music-container ${playerStatus === "play" ? "play" : ""}`}>
        <div className="music-info">
          {playerStatus === "play" && <h4>{currentSong.title}</h4>}

          {playerStatus === "play" && 
          <div className="progress-container">
              <div className="progress"></div>
            </div>
          }
        </div>

        {playerStatus === "play" && (
          <audio src={currentSong.mp3Path} autoPlay={true}></audio>
        )}
        <div className="img-container">
          <img
            
            
            src={currentSong.imgPath}
          />
        </div>

        <div className=" flex text-center justify-center z-10">
          <button className="action-btn" onClick={previousMusic}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button
            className="action-btn action-btn-big"
            style={{
              display: playerStatus === "pause" ? "inline-block" : "none",
            }}
            onClick={playMusic}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button
            className="action-btn"
            style={{
              display: playerStatus === "play" ? "inline-block" : "none",
            }}
            onClick={pauseMusic}
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
          {/* { playerStatus === 'pause' ? <button onClick={playMusic}>Play</button> : <button onClick={pauseMusic}>Pause</button>} */}
          {/* { playerStatus === 'play' && <button onClick={pauseMusic}>Pause</button>} */}

          <button className="action-btn" onClick={nextMusic}>
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
    </div>
  );
};
function App() {
  return (
    <>
      <MusicPlayer />
    </>
  );
}

export default App;
