import React, { useState, useMemo } from 'react';

import { ConsoleLogger } from './utils/ConsoleLogger';
import { FatAudioPlayer } from './components/FatAudioPlayer';
import { FineGrainedAudioPlayer } from './components/FineGrainedAudioPlayer';
import { FineGrainedVideoPlayer } from './components/FineGrainedVideoPlayer';
import { StandaloneSubtitlePlayer } from './components/StandaloneSubtitlePlayer';

import './styles/index.scss';

const InterfaceSegregationPrinciple: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logger = useMemo(() => new ConsoleLogger(setLogs), []);

  const clearLogs = () => {
    logger.clear();
  };

  // ================= Problem Instances =================
  const fatAudioPlayer = new FatAudioPlayer(logger);

  // ================= Solution Instances =================
  const fineGrainedAudioPlayer = new FineGrainedAudioPlayer(logger);
  const fineGrainedVideoPlayer = new FineGrainedVideoPlayer(logger);
  const subtitlePlayer = new StandaloneSubtitlePlayer(logger);

  return (
    <div className="isp-container">
      <h1>Interface Segregation Principle (ISP) Demo</h1>
      <p>
        This demo shows the difference between a "fat" interface and multiple,
        segregated interfaces. Check the console logs and the code to see what happens.
      </p>
      <a href="https/github.com/duyetvv/React-SOLID-Principles/tree/main/src/isp/README.md" target="_blank">Read the documentation for more details.</a>


      {/* Log Display */}
      <div className="card log-container">
        <h3>Logs</h3>
        <button onClick={clearLogs} className="button">Clear Logs</button>
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index} className="log-item">{log}</li>
          ))}
        </ul>
      </div>

      {/* Problem Section */}
      <div className="card">
        <h2>Problem: The "Fat" Interface</h2>
        <p>
          This `FatAudioPlayer` is forced to implement methods it doesn't need,
          like `playVideo`.
        </p>
        <button onClick={() => fatAudioPlayer.loadMedia('song.mp3')} className="button">
          Load Audio
        </button>
        <button onClick={() => fatAudioPlayer.playAudio()} className="button">
          Play Audio
        </button>
        <button onClick={() => fatAudioPlayer.playVideo()} className="button">
          Play Video (Does Nothing)
        </button>
      </div>

      {/* Solution Section */}
      <div className="card">
        <h2>Solution: Segregated Interfaces</h2>
        <p>
          These components only implement the interfaces they need, leading to
          cleaner, more maintainable code.
        </p>
        
        <div className="player-section">
          <h4>Fine-Grained Audio Player</h4>
          <button onClick={() => fineGrainedAudioPlayer.loadMedia('song.mp3')} className="button">
            Load Audio
          </button>
          <button onClick={() => fineGrainedAudioPlayer.playAudio()} className="button">
            Play Audio
          </button>
           {/* The line below would cause a TypeScript error because `playVideo` does not exist on `fineGrainedAudioPlayer` */}
           {/* <button onClick={() => (fineGrainedAudioPlayer as any).playVideo()}>Play Video</button> */}
        </div>

        <div className="player-section">
          <h4>Fine-Grained Video Player</h4>
          <button onClick={() => fineGrainedVideoPlayer.loadMedia('movie.mp4')} className="button">
            Load Video
          </button>
          <button onClick={() => fineGrainedVideoPlayer.playVideo()} className="button">
            Play Video
          </button>
          <button onClick={() => fineGrainedVideoPlayer.playAudio()} className="button">
            Play Accompanying Audio
          </button>
          <button onClick={() => fineGrainedVideoPlayer.displaySubtitles()} className="button">
            Show Subtitles
          </button>
        </div>

        <div>
          <h4>Standalone Subtitle Player</h4>
          <p>This component *only* knows how to display subtitles.</p>
          <button onClick={() => subtitlePlayer.displaySubtitles()} className="button">
            Show Subtitles (Standalone)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterfaceSegregationPrinciple;
