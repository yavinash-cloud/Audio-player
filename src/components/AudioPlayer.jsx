import React, { useState, useEffect, useRef } from "react";
import Waveform from "./Waveform";

let audioPlayer;

const AudioPlay = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audio) {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer = null;
        setButtonName("Play");
        setIsPlaying(false);
      }

      audioPlayer = new Audio(audio);
      audioPlayer.onended = () => {
        setButtonName("Play");
        setIsPlaying(false);
      };

      audioPlayer.ontimeupdate = () => {
        setCurrentTime(audioPlayer.currentTime);
      };

      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
      };

      return () => {
        if (audioPlayer) {
          audioPlayer.pause();
          audioPlayer = null;
        }
      };
    }
  }, [audio]);

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="">
      <input
        type="file"
        accept="audio/*"
        className="mb-4 p-2 border rounded"
        onChange={addFile}
      />
      <br />
      {audio && (
        <div className="">
          <span className="mr-2">
            {/* {formatTime(currentTime)} */}
            00:00
          </span>
          <Waveform url={audio} duration={formatTime(duration)} />
        </div>
      )}
    </div>
  );
};

export default AudioPlay;
