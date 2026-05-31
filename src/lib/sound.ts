type AudioContextConstructor = typeof AudioContext;
type WindowWithWebkitAudio = Window & { webkitAudioContext?: AudioContextConstructor };

export function makeAudioContext() {
  try {
    const AudioCtor = window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
    return AudioCtor ? new AudioCtor() : null;
  } catch {
    return null;
  }
}

export function playBeep(ac: AudioContext | null, freq = 440, duration = 0.08, gain = 0.12) {
  if (!ac) return;
  if (ac.state === 'suspended') {
    void ac.resume().then(() => {
      if (ac.state === 'running') {
        playBeep(ac, freq, duration, gain);
      }
    });
    return;
  }
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + duration);
}

export function playClick(ac: AudioContext | null) {
  playBeep(ac, 900, 0.04, 0.08);
}

export function playBomb(ac: AudioContext | null) {
  if (!ac) return;
  if (ac.state === 'suspended') {
    void ac.resume().then(() => {
      if (ac.state === 'running') {
        playBomb(ac);
      }
    });
    return;
  }

  const duration = 0.34;
  const noiseBuffer = ac.createBuffer(1, ac.sampleRate * duration, ac.sampleRate);
  const channel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i += 1) {
    const fade = 1 - i / channel.length;
    channel[i] = (Math.random() * 2 - 1) * fade;
  }

  const noise = ac.createBufferSource();
  const filter = ac.createBiquadFilter();
  const noiseGain = ac.createGain();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, ac.currentTime);
  filter.frequency.exponentialRampToValueAtTime(120, ac.currentTime + duration);
  noiseGain.gain.setValueAtTime(0.001, ac.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.28, ac.currentTime + 0.025);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  noise.buffer = noiseBuffer;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ac.destination);
  noise.start();
  noise.stop(ac.currentTime + duration);

  playBeep(ac, 95, 0.22, 0.18);
  setTimeout(() => playBeep(ac, 58, 0.18, 0.12), 70);
}

export function playCombo(ac: AudioContext | null) {
  playBeep(ac, 1200, 0.06, 0.08);
}

export function playWarning(ac: AudioContext | null) {
  playBeep(ac, 520, 0.08, 0.12);
  setTimeout(() => playBeep(ac, 640, 0.08, 0.08), 90);
}

export function playGameOver(ac: AudioContext | null) {
  playBeep(ac, 220, 0.16, 0.16);
  setTimeout(() => playBeep(ac, 160, 0.12, 0.08), 120);
}

export function playLevelClear(ac: AudioContext | null) {
  playBeep(ac, 720, 0.08, 0.1);
  setTimeout(() => playBeep(ac, 980, 0.08, 0.1), 90);
  setTimeout(() => playBeep(ac, 1320, 0.12, 0.09), 180);
}
