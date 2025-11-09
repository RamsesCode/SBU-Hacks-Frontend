import { useState, useEffect, useRef } from 'react';

interface UseVolumeMonitorProps {
  isListening: boolean;
}

export const useVolumeMonitor = ({ isListening }: UseVolumeMonitorProps) => {
  const [volume, setVolume] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState<'silent' | 'low' | 'good' | 'excellent'>('silent');
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isListening) {
      // Clean up when not listening
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
      setVolume(0);
      setVolumeLevel('silent');
      return;
    }

    const setupAudioMonitoring = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
        
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        microphoneRef.current.connect(analyserRef.current);
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        
        const updateVolume = () => {
          if (!analyserRef.current || !isListening) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate average volume
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          const normalizedVolume = Math.min(average / 32, 1); // Increased sensitivity
          
          setVolume(normalizedVolume);
          
          // Determine volume level
          if (normalizedVolume < 0.05) {
            setVolumeLevel('silent');
          } else if (normalizedVolume < 0.25) {
            setVolumeLevel('low');
          } else if (normalizedVolume < 0.5) {
            setVolumeLevel('good');
          } else {
            setVolumeLevel('excellent');
          }
          
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        };
        
        updateVolume();
      } catch (error) {
        console.error('Error accessing microphone for volume monitoring:', error);
      }
    };

    setupAudioMonitoring();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [isListening]);

  return { volume, volumeLevel };
};
