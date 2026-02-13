import type { IAudioPlayer, IMediaLoader, ILogger } from '../types';

/**
 * @class FineGrainedAudioPlayer
 * @description This class implements only the interfaces it needs: IAudioPlayer and IMediaLoader.
 * It is not burdened with video or subtitle methods, adhering to ISP.
 * It has a clear, single responsibility related to audio playback.
 */
export class FineGrainedAudioPlayer implements IAudioPlayer, IMediaLoader {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  playAudio(): void {
    this.logger.log('FineGrainedAudioPlayer: Playing audio...');
  }

  async loadMedia(url: string): Promise<void> {
    this.logger.log(`FineGrainedAudioPlayer: Loading media from ${url}...`);
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
