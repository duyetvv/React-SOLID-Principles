// Logger interface for ISP demonstration
export interface ILogger {
  log(message: string): void;
}

// ============== Problem: "Fat" Interface ==============
// This interface violates ISP because it forces any implementation
// to define methods it might not use. For example, an AudioPlayer
// would be forced to have a `playVideo` method.

export interface IMediaPlayer {
  playAudio(): void;
  playVideo(): void;
  displaySubtitles(): void;
  loadMedia(url: string): Promise<void>;
}

// ============== Solution: Segregated Interfaces ==============
// Here, we break down the fat interface into smaller, role-specific interfaces.
// This allows classes to only implement the functionalities they actually provide.

/**
 * @description For playing audio content. It's a focused interface that only cares about audio playback.
 */
export interface IAudioPlayer {
  playAudio(): void;
}

/**
 * @description For playing video content. Components that handle video would use this.
 */
export interface IVideoPlayer {
  playVideo(): void;
}

/**
 * @description For managing and displaying subtitles. It's separate from video playback
 * because a component might only handle subtitle rendering.
 */
export interface ISubtitlePlayer {
  displaySubtitles(): void;
}

/**
 * @description For loading media from a source. This is a common capability
 * that can be shared across different player types.
 */
export interface IMediaLoader {
  loadMedia(url: string): Promise<void>;
}
