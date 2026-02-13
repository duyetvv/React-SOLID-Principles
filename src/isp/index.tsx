/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import type { ILogger } from './types';
import { FatAudioPlayer } from './components/FatAudioPlayer';
import { FineGrainedAudioPlayer } from './components/FineGrainedAudioPlayer';
import { FineGrainedVideoPlayer } from './components/FineGrainedVideoPlayer';
import { StandaloneSubtitlePlayer } from './components/StandaloneSubtitlePlayer';

// A simple in-memory logger that implements the ILogger interface.
// This will be shared across our media player instances.
class ConsoleLogger implements ILogger {
  private _logs: string[] = [];
  private _onLog: (logs: string[]) => void;

  constructor(onLog: (logs: string[]) => void) {
    this._onLog = onLog;
  }

  log(message: string): void {
    this._logs.push(message);
    this._onLog([...this._logs]);
  }

  clear(): void {
    this._logs = [];
    this._onLog([]);
  }
}

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

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const buttonStyle: React.CSSProperties = {
    margin: '4px',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Interface Segregation Principle (ISP) Demo</h1>
      <p>
        This demo shows the difference between a "fat" interface and multiple,
        segregated interfaces. Check the console logs and the code to see what happens.
      </p>
      <a href="https/github.com/duyetvv/React-SOLID-Principles/tree/main/src/isp/README.md" target="_blank">Read the documentation for more details.</a>


      {/* Log Display */}
      <div style={{...cardStyle, backgroundColor: '#f9f9f9' }}>
        <h3>Logs</h3>
        <button onClick={clearLogs} style={buttonStyle}>Clear Logs</button>
        <ul style={{ height: '150px', overflowY: 'auto', border: '1px solid #eee', padding: '8px' }}>
          {logs.map((log, index) => (
            <li key={index} style={{ fontSize: '14px' }}>{log}</li>
          ))}
        </ul>
      </div>

      {/* Problem Section */}
      <div style={cardStyle}>
        <h2>Problem: The "Fat" Interface</h2>
        <p>
          This `FatAudioPlayer` is forced to implement methods it doesn't need,
          like `playVideo`.
        </p>
        <button onClick={() => fatAudioPlayer.loadMedia('song.mp3')} style={buttonStyle}>
          Load Audio
        </button>
        <button onClick={() => fatAudioPlayer.playAudio()} style={buttonStyle}>
          Play Audio
        </button>
        <button onClick={() => fatAudioPlayer.playVideo()} style={buttonStyle}>
          Play Video (Does Nothing)
        </button>
      </div>

      {/* Solution Section */}
      <div style={cardStyle}>
        <h2>Solution: Segregated Interfaces</h2>
        <p>
          These components only implement the interfaces they need, leading to
          cleaner, more maintainable code.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <h4>Fine-Grained Audio Player</h4>
          <button onClick={() => fineGrainedAudioPlayer.loadMedia('song.mp3')} style={buttonStyle}>
            Load Audio
          </button>
          <button onClick={() => fineGrainedAudioPlayer.playAudio()} style={buttonStyle}>
            Play Audio
          </button>
           {/* The line below would cause a TypeScript error because `playVideo` does not exist on `fineGrainedAudioPlayer` */}
           {/* <button onClick={() => (fineGrainedAudioPlayer as any).playVideo()}>Play Video</button> */}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h4>Fine-Grained Video Player</h4>
          <button onClick={() => fineGrainedVideoPlayer.loadMedia('movie.mp4')} style={buttonStyle}>
            Load Video
          </button>
          <button onClick={() => fineGrainedVideoPlayer.playVideo()} style={buttonStyle}>
            Play Video
          </button>
          <button onClick={() => fineGrainedVideoPlayer.playAudio()} style={buttonStyle}>
            Play Accompanying Audio
          </button>
          <button onClick={() => fineGrainedVideoPlayer.displaySubtitles()} style={buttonStyle}>
            Show Subtitles
          </button>
        </div>

        <div>
          <h4>Standalone Subtitle Player</h4>
          <p>This component *only* knows how to display subtitles.</p>
          <button onClick={() => subtitlePlayer.displaySubtitles()} style={buttonStyle}>
            Show Subtitles (Standalone)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterfaceSegregationPrinciple;
