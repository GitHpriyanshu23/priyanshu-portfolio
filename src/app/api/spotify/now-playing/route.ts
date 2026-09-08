import { NextResponse } from "next/server";
import { lastPlayedTrack } from "@/config/spotify";

export const dynamic = "force-dynamic";

type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
};

type SpotifyNowPlaying = {
  is_playing: boolean;
  item: SpotifyTrack | null;
};

type SpotifyRecentlyPlayed = {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

function getSpotifyEnv(name: "clientId" | "clientSecret" | "refreshToken") {
  if (name === "clientId") {
    return process.env.SPOTIFY_CLIENT_ID ?? process.env.spotify_client_id;
  }

  if (name === "clientSecret") {
    return process.env.SPOTIFY_CLIENT_SECRET ?? process.env.spotify_client_secret;
  }

  return process.env.SPOTIFY_REFRESH_TOKEN ?? process.env.spotify_refresh_token;
}

function fallbackResponse(setupRequired = false) {
  return NextResponse.json(
    {
      title: lastPlayedTrack.title,
      artist: lastPlayedTrack.artist,
      album: lastPlayedTrack.album,
      albumArt: lastPlayedTrack.albumArt,
      songUrl: lastPlayedTrack.songUrl,
      previewUrl: lastPlayedTrack.audioSrc ?? null,
      isPlaying: false,
      isLive: false,
      setupRequired,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

async function getAccessToken() {
  const clientId = getSpotifyEnv("clientId");
  const clientSecret = getSpotifyEnv("clientSecret");
  const refreshToken = getSpotifyEnv("refreshToken");

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function serializeTrack(track: SpotifyTrack, isPlaying: boolean) {
  const image = track.album.images[0]?.url ?? lastPlayedTrack.albumArt;

  return {
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumArt: image,
    songUrl: track.external_urls.spotify,
    previewUrl: track.preview_url,
    durationMs: track.duration_ms,
    isPlaying,
    isLive: isPlaying,
    setupRequired: false,
  };
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return fallbackResponse(true);
  }

  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (nowPlayingResponse.status === 200) {
    const nowPlaying = (await nowPlayingResponse.json()) as SpotifyNowPlaying;

    if (nowPlaying.item) {
      return NextResponse.json(serializeTrack(nowPlaying.item, nowPlaying.is_playing), {
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  }

  const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!recentlyPlayedResponse.ok) {
    return fallbackResponse();
  }

  const recentlyPlayed = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayed;
  const recentTrack = recentlyPlayed.items[0]?.track;

  if (!recentTrack) {
    return fallbackResponse();
  }

  return NextResponse.json(serializeTrack(recentTrack, false), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
