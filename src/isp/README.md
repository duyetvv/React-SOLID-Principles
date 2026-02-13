# Interface Segregation Principle (ISP)

The Interface Segregation Principle is a key part of SOLID design that helps keep your code clean, efficient, and easy to maintain. It states that:

**"No client should be forced to depend on methods it does not use."**

In simpler terms, it’s better to have many small, specific interfaces than one large, general-purpose one. This avoids forcing components or classes to implement functionality they don’t need, which would violate the Single Responsibility Principle.

## Key Ideas

1.  **Lean Interfaces**: An interface should be as small as possible, containing only what is necessary for its specific role.
2.  **Role-Based Design**: Instead of creating one big interface, identify the different "roles" an object can play and define an interface for each. For example, instead of a generic `Item` interface, you might have `CanBeSold`, `CanBeShipped`, and `CanBeViewed`.
3.  **Decoupling**: ISP helps decouple your components. A component only needs to know about the specific interface it interacts with, not the entire implementation of an object.

## Example: Media Player

In this example, we'll explore a `MediaPlayer` system.

### The "Fat" Interface (Problem)

We start with a single, large interface called `IMediaPlayer`:

```typescript
export interface IMediaPlayer {
  playAudio(): void;
  playVideo(): void;

  displaySubtitles(): void;
  loadMedia(url: string): Promise<void>;
}
```

-   An `AudioPlayer` component only needs `playAudio()` and `loadMedia()`. However, it's forced to implement `playVideo()` and `displaySubtitles()`, even if it just throws an error or does nothing.
-   A `VideoPlayer` might need everything, but a `SubtitleDisplay` component would only need `displaySubtitles()` and is unnecessarily coupled to audio/video playback methods.

This design is rigid. If we want to add a new type of player, like a simple `ImageDisplayer`, it would be forced to carry the weight of all the media-related methods it doesn't use.

### Segregated Interfaces (Solution)

Following ISP, we break down the "fat" interface into smaller, role-based interfaces:

```typescript
// For playing audio content
export interface IAudioPlayer {
  playAudio(): void;
}

// For playing video content
export interface IVideoPlayer {
  playVideo(): void;
}

// For displaying subtitles
export interface ISubtitlePlayer {
  displaySubtitles(): void;
}

// For loading media files
export interface IMediaLoader {
  loadMedia(url: string): Promise<void>;
}
```

With this approach:

-   `AudioPlayer` can implement `IAudioPlayer` and `IMediaLoader`.
-   `VideoPlayer` can implement `IVideoPlayer`, `IAudioPlayer`, `ISubtitlePlayer`, and `IMediaLoader`.
-   A new `SimpleAudioPlayer` could implement just `IAudioPlayer`, without needing a `loadMedia` method if its media is embedded.

This makes our system:

-   **Flexible**: Easy to create new components with specific capabilities.
-   **Decoupled**: Components only depend on the interfaces they need.
-   **Maintainable**: Changes to one interface (e.g., adding a parameter to `playVideo`) won't affect components that only use `IAudioPlayer`.

This aligns perfectly with other SOLID principles, promoting clean, modular, and scalable React applications.
