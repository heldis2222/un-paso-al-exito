import { useState, useRef } from 'react';

export const useAudioVoice = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // 🗣️ 1. Asistente de Voz Motivacional (Web Speech API)
  const speakMotivation = (materia = 'tus tareas', nombre = 'Estudiante') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Detener audios anteriores
      const frases = [
        `¡Vamos ${nombre}! Es momento de avanzar en ${materia}. ¡Confío en tu capacidad!`,
        `¡Atención ${nombre}! Recuerda que cada minuto dedicado a ${materia} te acerca a tus metas. ¡Tú puedes!`,
        `¡Hola ${nombre}! Vamos a dar lo mejor en ${materia}. Mantén el enfoque y verás excelentes resultados.`
      ];
      const frase = frases[Math.floor(Math.random() * frases.length)];
      const utterance = new SpeechSynthesisUtterance(frase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakText = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // 🎵 2. Música Ambiental de Concentración (Web Audio API)
  const toggleAmbientMusic = () => {
    if (isMusicPlaying) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  const startAmbientMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      // Acorde suave Cmaj7 (Do, Mi, Sol, Si) relajante
      const frecuencias = [261.63, 329.63, 392.00, 493.88];
      
      oscillatorsRef.current = frecuencias.map((freq) => {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime); // Volumen al 2%
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        return osc;
      });

      setIsMusicPlaying(true);
    } catch (e) {
      console.warn('AudioContext bloqueado hasta interacción del usuario', e);
    }
  };

  const stopAmbientMusic = () => {
    if (oscillatorsRef.current.length) {
      oscillatorsRef.current.forEach((osc) => osc.stop());
      oscillatorsRef.current = [];
    }
    setIsMusicPlaying(false);
  };

  // 🔔 3. Tonos Sintetizados para Alarma
  const playAlarmTone = (type = 'animado') => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      let freq = type === 'animado' ? 587.33 : type === 'tranquilo' ? 329.63 : 880;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn('Error al reproducir tono de alarma', e);
    }
  };

  return {
    isMusicPlaying,
    toggleAmbientMusic,
    speakMotivation,
    speakText,
    playAlarmTone
  };
};