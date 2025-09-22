import React, { useState, useEffect } from 'react';
import AudioManager from '../utils/AudioManager';

const AudioControls: React.FC = () => {
  const audioManager = AudioManager.getInstance();
  const [isMusicEnabled, setIsMusicEnabled] = useState(audioManager.getMusicEnabled());
  const [isSoundEnabled, setIsSoundEnabled] = useState(audioManager.getSoundEnabled());
  const [musicVolume, setMusicVolume] = useState(audioManager.getMusicVolume());
  const [soundVolume, setSoundVolume] = useState(audioManager.getSoundVolume());
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    audioManager.initialize();
  }, []);

  const toggleMusic = () => {
    const newState = !isMusicEnabled;
    setIsMusicEnabled(newState);
    audioManager.setMusicEnabled(newState);
    if (newState) {
      audioManager.playSoundEffect('bell');
      audioManager.playBackgroundMusic();
    }
  };

  const toggleSound = () => {
    const newState = !isSoundEnabled;
    setIsSoundEnabled(newState);
    audioManager.setSoundEnabled(newState);
    if (newState) {
      audioManager.playSoundEffect('chime');
    }
  };

  const handleMusicVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    setMusicVolume(volume);
    audioManager.setMusicVolume(volume);
  };

  const handleSoundVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    setSoundVolume(volume);
    audioManager.setSoundVolume(volume);
    audioManager.playSoundEffect('chime');
  };

  return (
    <div className="relative">
      {/* Audio Controls Toggle Button */}
      <button
        onClick={() => {
          setShowControls(!showControls);
          audioManager.playSoundEffect('bell');
        }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 transition-all duration-300 shadow-md border border-amber-300"
        title="Audio Controls"
      >
        <svg className="w-5 h-5 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
        <span className="text-amber-800 font-medium text-sm">🎵</span>
      </button>

      {/* Audio Controls Panel */}
      {showControls && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border border-amber-200 z-50 min-w-[280px]">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h3 className="text-amber-900 font-semibold text-sm">🎶 Audio Settings</h3>
              <button
                onClick={() => setShowControls(false)}
                className="text-amber-600 hover:text-amber-800 text-lg"
              >
                ×
              </button>
            </div>

            {/* Music Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-amber-800 font-medium text-sm flex items-center space-x-2">
                  <span>🎵 Devotional Music</span>
                </label>
                <button
                  onClick={toggleMusic}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    isMusicEnabled ? 'bg-amber-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      isMusicEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {isMusicEnabled && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-amber-700">🔇</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={musicVolume}
                    onChange={handleMusicVolumeChange}
                    className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xs text-amber-700">🔊</span>
                </div>
              )}
            </div>

            {/* Sound Effects Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-amber-800 font-medium text-sm flex items-center space-x-2">
                  <span>🔔 Sound Effects</span>
                </label>
                <button
                  onClick={toggleSound}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    isSoundEnabled ? 'bg-amber-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      isSoundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {isSoundEnabled && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-amber-700">🔇</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={soundVolume}
                    onChange={handleSoundVolumeChange}
                    className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xs text-amber-700">🔊</span>
                </div>
              )}
            </div>

            {/* Test Sounds */}
            <div className="space-y-2 border-t border-amber-200 pt-2">
              <p className="text-amber-800 font-medium text-xs">Test Sounds:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => audioManager.playSoundEffect('bell')}
                  className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded border border-amber-300 text-amber-800"
                >
                  🔔 Temple Bell
                </button>
                <button
                  onClick={() => audioManager.playSoundEffect('conch')}
                  className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded border border-amber-300 text-amber-800"
                >
                  🐚 Conch Shell
                </button>
                <button
                  onClick={() => audioManager.playSoundEffect('gong')}
                  className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded border border-amber-300 text-amber-800"
                >
                  🥇 Meditation Gong
                </button>
                <button
                  onClick={() => audioManager.playSoundEffect('mantra')}
                  className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 rounded border border-amber-300 text-amber-800"
                >
                  🕉️ Om Chant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AudioControls;