import type { ISubtitlePlayer, ILogger } from '../types';

/**
 * @class StandaloneSubtitlePlayer
 * @description This class implements only the ISubtitlePlayer interface. It is a highly
 * specialized component that only cares about displaying subtitles. This demonstrates
 * the power of ISP, allowing for very lean and focused components.
 */
export class StandaloneSubtitlePlayer implements ISubtitlePlayer {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  displaySubtitles(): void {
    this.logger.log('StandaloneSubtitlePlayer: Displaying subtitles...');
  }
}
