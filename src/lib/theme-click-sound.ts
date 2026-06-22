let audioContext: AudioContext | null = null;

export function playThemeClickSound() {
  if (typeof window === "undefined") return;

  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const ctx = audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.025);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Ignore if audio is blocked
  }
}
