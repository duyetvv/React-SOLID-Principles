import type {
  IAudioPlayer,
  IVideoPlayer,
  ISubtitlePlayer,
  IMediaLoader,
  ILogger,
} from '../types';

/**
 * @class FineGrainedVideoPlayer
 * @description This class implements a wider set of interfaces because it's a more feature-rich component.
 * It handles audio, video, subtitles, and media loading. This is perfectly fine because
 * it actually uses all the methods from the interfaces it implements.
 * It is a powerful example of how ISP allows for flexible and scalable components.
 */
export class FineGrainedVideoPlayer
  implements IAudioPlayer, IVideoPlayer, ISubtitlePlayer, IMediaLoader
{
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  playAudio(): void {
    this.logger.log('FineGrainedVideoPlayer: Playing accompanying audio...');
  }

  playVideo(): void {
    this.logger.log('FineGrainedVideoPlayer: Playing video...');
  }

  displaySubtitles(): void {
    this.logger.log('FineGrainedVideoPlayer: Displaying subtitles...');
  }

  async loadMedia(url: string): Promise<void> {
    this.logger.log(`FineGrainedVideoPlayer: Loading media from ${url}...`);
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
}
