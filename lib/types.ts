export type SpotifyImage = { url: string; width: number; height: number };

export type SimplifiedArtist = { id: string; name: string };

export type Track = {
  id: string;
  name: string;
  artists: SimplifiedArtist[];
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
    release_date: string;
  };
  external_urls: { spotify: string };
  duration_ms: number;
  popularity?: number;
};

export type Artist = {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  followers: { total: number };
  popularity: number;
  external_urls: { spotify: string };
};

export type AlbumSimplified = {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  artists: SimplifiedArtist[];
  external_urls: { spotify: string };
};
