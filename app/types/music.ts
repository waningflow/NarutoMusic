type MusicMeta = {
  id: number;
  name: string;
  size: number;
  playTime: number;
  extension: string;
};

type Album = {
  id: number;
  name: string;
  type: string;
  size: number;
  picId: number;
  picUrl: string;
  publishTime: number;
  company: string;
  commentThreadId: string;
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
