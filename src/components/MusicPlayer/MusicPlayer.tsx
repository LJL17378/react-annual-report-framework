import React, { useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './MusicPlayer.module.scss';

const MusicPlayer: React.FC = () => {
  const { isPlaying, setIsPlaying } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        playAudio();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log('Audio play failed:', e));
    }
  };

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.musicPlayer} onClick={toggle}>
      <Music
        className={`${styles.icon} ${isPlaying ? styles.rotating : ''}`}
        size={24}
      />
    </div>
  );
};

export default MusicPlayer;
