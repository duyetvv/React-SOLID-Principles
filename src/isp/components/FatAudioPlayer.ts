import type { IMediaPlayer, ILogger } from '../types';

/**
 * @class FatAudioPlayer
 * @description This class is forced to implement the entire IMediaPlayer interface,
 * even though it only cares about audio. The `playVideo` and `displaySubtitles`
 * methods are useless for it and are often implemented to do nothing or throw an error.
 * This is a classic violation of ISP.
 */
export class FatAudioPlayer implements IMediaPlayer {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  playAudio(): void {
    this.logger.log('FatAudioPlayer: Playing audio...');
  }

  // Unused method, forced upon the class by the "fat" interface
  playVideo(): void {
    this.logger.log('FatAudioPlayer: This player cannot play videos.');
    // This could throw an error, which would be a violation of the Liskov Substitution Principle (LSP)
  }

  // Unused method
  displaySubtitles(): void {
    this.logger.log('FatAudioPlayer: This player cannot display subtitles.');
  }

  async loadMedia(url: string): Promise<void> {
    this.logger.log(`FatAudioPlayer: Loading media from ${url}...`);
    // Simulate network request
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
