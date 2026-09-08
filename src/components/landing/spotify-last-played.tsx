"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { lastPlayedTrack } from "@/config/spotify";
import { cn } from "@/lib/utils";

type SpotifyTrackState = {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  previewUrl: string | null;
  isPlaying: boolean;
  isLive: boolean;
  setupRequired?: boolean;
};

const staticTrack = {
  title: lastPlayedTrack.title,
  artist: lastPlayedTrack.artist,
  album: lastPlayedTrack.album,
  albumArt: lastPlayedTrack.albumArt,
  songUrl: lastPlayedTrack.songUrl,
  previewUrl: lastPlayedTrack.audioSrc || null,
};

const fallbackStatus: SpotifyTrackState = {
  ...staticTrack,
  isPlaying: false,
  isLive: false,
};

export function SpotifyLastPlayed() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [spotifyStatus, setSpotifyStatus] =
    useState<SpotifyTrackState>(fallbackStatus);
  const [isPlayingOnSite, setIsPlayingOnSite] = useState(false);

  const playableSource = staticTrack.previewUrl ?? spotifyStatus.previewUrl;
  const statusLabel = spotifyStatus.isLive ? "Listening now" : "Last listened";
  const statusTrack = spotifyStatus.title
    ? `${spotifyStatus.title} · ${spotifyStatus.artist}`
    : `${staticTrack.title} · ${staticTrack.artist}`;

  useEffect(() => {
    let mounted = true;

    async function loadSpotifyStatus() {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const nextStatus = (await response.json()) as SpotifyTrackState;

        if (mounted) {
          setSpotifyStatus(nextStatus);
        }
      } catch {
        // Keep the static fallback if Spotify is unreachable.
      }
    }

    void loadSpotifyStatus();
    const interval = window.setInterval(() => void loadSpotifyStatus(), 20_000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playableSource) return;

    if (isPlayingOnSite) {
      audio.play().catch(() => setIsPlayingOnSite(false));
    } else {
      audio.pause();
    }
  }, [isPlayingOnSite, playableSource]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlayingOnSite(false);
    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <LiquidGlassCard
      glowIntensity="sm"
      shadowIntensity="sm"
      borderRadius="14px"
      blurIntensity="sm"
      className="w-full p-3"
      contentClassName="relative z-10"
    >
      <audio ref={audioRef} src={playableSource ?? undefined} preload="metadata" />

      <div className="flex items-center gap-3">
        <div className="relative flex h-[84px] w-[108px] shrink-0 items-center">
          <button
            type="button"
            onClick={() => setIsPlayingOnSite((current) => !current)}
            disabled={!playableSource}
            className="group relative z-20 size-20 overflow-hidden rounded-full bg-black shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/15 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed"
            aria-label={isPlayingOnSite ? "Pause Apocalypse" : "Play Apocalypse"}
          >
            <Image
              src="/assets/apocalypse-vinyl.png"
              alt="Apocalypse vinyl record"
              fill
              sizes="80px"
              className={cn(
                "rounded-full object-contain",
                isPlayingOnSite && "animate-vinyl-spin",
              )}
              priority={false}
            />
          </button>

          <div
            className={cn(
              "pointer-events-none absolute right-1 top-2 z-30 h-4 w-10 origin-right transition-transform duration-700 ease-out",
              isPlayingOnSite ? "rotate-0" : "rotate-[18deg]",
            )}
          >
            <span className="absolute right-0 top-1/2 size-4 -translate-y-1/2 rounded-full bg-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
            <span className="absolute right-2 top-1/2 h-1 w-9 -translate-y-1/2 rounded-full bg-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.18)]" />
            <span className="absolute -left-0.5 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#1DB954] shadow-sm" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[10px] font-medium text-secondary">
            <span
              className={cn(
                "size-1.5 rounded-full",
                spotifyStatus.isLive ? "bg-emerald-500" : "bg-secondary/60",
              )}
            />
            {spotifyStatus.isLive ? "Live" : "Favorite"}
          </p>

          <Link
            href={staticTrack.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block truncate text-sm font-semibold text-foreground hover:underline"
          >
            {staticTrack.title}
          </Link>
          <p className="truncate text-xs text-secondary">{staticTrack.artist}</p>

          <Link
            href={spotifyStatus.songUrl || staticTrack.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block truncate text-[10px] text-secondary underline-offset-2 hover:text-foreground hover:underline"
          >
            {statusLabel}: {statusTrack}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsPlayingOnSite((current) => !current)}
          disabled={!playableSource}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1DB954] text-white shadow-sm transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={isPlayingOnSite ? "Pause Apocalypse" : "Play Apocalypse"}
        >
          {isPlayingOnSite ? (
            <Pause className="size-4" weight="fill" />
          ) : (
            <Play className="ml-0.5 size-4" weight="fill" />
          )}
        </button>
      </div>

      {!playableSource && (
        <p className="mt-2 text-[10px] leading-relaxed text-secondary">
          Add an audio file to enable website playback.
        </p>
      )}
    </LiquidGlassCard>
  );
}
