type MusicMeta = {
  id: number;
  name: string;
  playTime: number;
};

type Album = {
  id: number;
  name: string;
  picUrl: string;
};

type Artist = {
  id: number;
  name: string;
  picUrl: string;
};

type Music = {
  id?: number;
  name?: string;
  url?: string;
  hMusic?: MusicMeta;
  mMusic?: MusicMeta;
  lMusic?: MusicMeta;
  bMusic?: MusicMeta;
  album?: Album;
  artists?: Artist[];
};

type Playlist = {
  playingIndex: number;
  playing: Music;
  list: Music[];
  paused: boolean;
  reset: number;
};

export { Music, Playlist };
