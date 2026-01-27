// Audio Constants
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.3,
  FADE_OUT_DURATION: 800,
  FADE_IN_DURATION: 1200,
  TRACK_SWITCH_DELAY: 100,
} as const;

// Animation Constants
export const ANIMATION_CONFIG = {
  SLIDE_TRANSITION_DURATION: 0.6,
  CONTROLS_ANIMATION_DURATION: 0.3,
  INSTRUCTIONS_TIMEOUT: 2000,
} as const;

// Touch/Swipe Constants
export const TOUCH_CONFIG = {
  SWIPE_THRESHOLD: 50,
} as const;

// Slide indices with video
export const SLIDES_WITH_VIDEO = [2, 3, 5] as const;

// Background music tracks
export const BACKGROUND_MUSIC_TRACKS = [
  'https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Gratitude%20-%20Johnny%20Brazilian%20LIve%20Sessions.mp3',
  'https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Cover%20Move%20(Adam%20Port)%20Johnny%20Rebouc%CC%A7as%20Audio%20Wave.mp3',
  'https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Baiana%20System%20Track%20Final%20Sincronizado%20Wave.mp3',
  'https://pub-af28e085dd0b492cbfd160d5cbfa0cdf.r2.dev/Johnny%20GT%2001-2.mp4'
] as const;
