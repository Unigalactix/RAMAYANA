export interface AudioConfig {
  volume: number;
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

export interface SoundEffect {
  name: string;
  url: string;
  volume?: number;
}

export interface BackgroundMusic {
  name: string;
  url: string;
  kanda?: string;
  volume?: number;
}

class AudioManager {
  private static instance: AudioManager;
  private backgroundMusic: HTMLAudioElement | null = null;
  private soundEffects: Map<string, HTMLAudioElement> = new Map();
  private isMusicEnabled: boolean = true;
  private isSoundEnabled: boolean = true;
  private musicVolume: number = 0.3;
  private soundVolume: number = 0.5;
  private currentTrack: string | null = null;
  private isInitialized: boolean = false;

  private constructor() {
    // Load user preferences
    this.loadPreferences();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Add user interaction listener for mobile browsers
    const enableAudio = () => {
      this.createAudioContext();
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    
    this.isInitialized = true;
  }

  private createAudioContext(): void {
    // Create a silent audio element to unlock audio context
    const silentAudio = new Audio();
    silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAAAAAAAAAAAACAAAAAAAAAAZGF0YQAAAAA=';
    silentAudio.play().catch(() => {});
  }

  public async preloadBackgroundMusic(): Promise<void> {
    const musicTracks: BackgroundMusic[] = [
      { name: 'main', url: '/audio/ramayana-devotional.mp3', volume: 0.3 },
      { name: 'balakanda', url: '/audio/peaceful-chant.mp3', kanda: 'Bala Kanda', volume: 0.25 },
      { name: 'ayodhyakanda', url: '/audio/melancholic-flute.mp3', kanda: 'Ayodhya Kanda', volume: 0.3 },
      { name: 'aranyakanda', url: '/audio/forest-meditation.mp3', kanda: 'Aranya Kanda', volume: 0.35 },
      { name: 'kishkindhakanda', url: '/audio/rhythmic-drums.mp3', kanda: 'Kishkindha Kanda', volume: 0.4 },
      { name: 'sundarakanda', url: '/audio/hanuman-chant.mp3', kanda: 'Sundara Kanda', volume: 0.35 },
      { name: 'lankakanda', url: '/audio/epic-battle.mp3', kanda: 'Lanka Kanda', volume: 0.4 },
      { name: 'uttarakanda', url: '/audio/victory-celebration.mp3', kanda: 'Uttara Kanda', volume: 0.3 }
    ];

    // For now, we'll use a placeholder approach since we don't have actual audio files
    // In a real implementation, you would host these audio files
    console.log('Background music tracks configured:', musicTracks.map(t => t.name));
  }

  public async preloadSoundEffects(): Promise<void> {
    const effects: SoundEffect[] = [
      { name: 'bell', url: '/audio/temple-bell.mp3', volume: 0.6 },
      { name: 'chime', url: '/audio/wind-chime.mp3', volume: 0.4 },
      { name: 'gong', url: '/audio/meditation-gong.mp3', volume: 0.5 },
      { name: 'conch', url: '/audio/conch-shell.mp3', volume: 0.7 },
      { name: 'tabla', url: '/audio/tabla-beat.mp3', volume: 0.5 },
      { name: 'sitar', url: '/audio/sitar-pluck.mp3', volume: 0.4 },
      { name: 'mantra', url: '/audio/om-chant.mp3', volume: 0.3 },
      { name: 'page-turn', url: '/audio/page-rustle.mp3', volume: 0.3 }
    ];

    console.log('Sound effects configured:', effects.map(e => e.name));
  }

  public playBackgroundMusic(trackName: string = 'main'): void {
    if (!this.isMusicEnabled) return;

    try {
      // Stop current track
      if (this.backgroundMusic) {
        this.fadeOut(this.backgroundMusic, 1000);
      }

      // For demonstration, we'll create a simple audio oscillator
      // In production, you would load actual audio files
      this.createSyntheticMusic(trackName);
      this.currentTrack = trackName;
    } catch (error) {
      console.warn('Could not play background music:', error);
    }
  }

  private createSyntheticMusic(trackName: string): void {
    // This creates a simple ambient tone as a placeholder
    // Replace with actual audio file loading in production
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different kandas
      const frequencies: { [key: string]: number } = {
        'main': 220,
        'balakanda': 196,
        'ayodhyakanda': 174,
        'aranyakanda': 146,
        'kishkindhakanda': 130,
        'sundarakanda': 123,
        'lankakanda': 110,
        'uttarakanda': 98
      };

      oscillator.frequency.setValueAtTime(frequencies[trackName] || 220, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.1, audioContext.currentTime + 2);

      oscillator.start(audioContext.currentTime);
      
      // Stop after 30 seconds (in real app, this would be a looping audio file)
      setTimeout(() => {
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
        setTimeout(() => oscillator.stop(), 2000);
      }, 30000);

    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  public playSoundEffect(effectName: string): void {
    if (!this.isSoundEnabled) return;

    try {
      // Create a simple beep sound as placeholder
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different tones for different effects
      const tones: { [key: string]: { freq: number; duration: number } } = {
        'bell': { freq: 800, duration: 1000 },
        'chime': { freq: 1200, duration: 500 },
        'gong': { freq: 200, duration: 2000 },
        'conch': { freq: 150, duration: 1500 },
        'tabla': { freq: 100, duration: 200 },
        'sitar': { freq: 400, duration: 800 },
        'mantra': { freq: 300, duration: 1000 },
        'page-turn': { freq: 600, duration: 100 }
      };

      const tone = tones[effectName] || { freq: 440, duration: 200 };
      
      oscillator.frequency.setValueAtTime(tone.freq, audioContext.currentTime);
      oscillator.type = effectName === 'gong' ? 'sawtooth' : 'sine';
      
      gainNode.gain.setValueAtTime(this.soundVolume * 0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + tone.duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + tone.duration / 1000);

    } catch (error) {
      console.warn('Could not play sound effect:', error);
    }
  }

  private fadeOut(audio: HTMLAudioElement, duration: number): void {
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = audio.volume / steps;

    const fadeInterval = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - volumeStep);
      if (audio.volume <= 0) {
        clearInterval(fadeInterval);
        audio.pause();
        audio.currentTime = 0;
      }
    }, stepTime);
  }

  public setMusicEnabled(enabled: boolean): void {
    this.isMusicEnabled = enabled;
    if (!enabled && this.backgroundMusic) {
      this.backgroundMusic.pause();
    } else if (enabled && this.currentTrack) {
      this.playBackgroundMusic(this.currentTrack);
    }
    this.savePreferences();
  }

  public setSoundEnabled(enabled: boolean): void {
    this.isSoundEnabled = enabled;
    this.savePreferences();
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.musicVolume;
    }
    this.savePreferences();
  }

  public setSoundVolume(volume: number): void {
    this.soundVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
  }

  public getMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  public getSoundEnabled(): boolean {
    return this.isSoundEnabled;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getSoundVolume(): number {
    return this.soundVolume;
  }

  private savePreferences(): void {
    try {
      localStorage.setItem('ramayana-audio-prefs', JSON.stringify({
        musicEnabled: this.isMusicEnabled,
        soundEnabled: this.isSoundEnabled,
        musicVolume: this.musicVolume,
        soundVolume: this.soundVolume
      }));
    } catch (error) {
      console.warn('Could not save audio preferences:', error);
    }
  }

  private loadPreferences(): void {
    try {
      const prefs = localStorage.getItem('ramayana-audio-prefs');
      if (prefs) {
        const parsed = JSON.parse(prefs);
        this.isMusicEnabled = parsed.musicEnabled ?? true;
        this.isSoundEnabled = parsed.soundEnabled ?? true;
        this.musicVolume = parsed.musicVolume ?? 0.3;
        this.soundVolume = parsed.soundVolume ?? 0.5;
      }
    } catch (error) {
      console.warn('Could not load audio preferences:', error);
    }
  }
}

export default AudioManager;