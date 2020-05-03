type MusicMeta = {
  id: number;
  name: string;
  size: number;
  playTime: number;
  extension: string;
};

type Album = {
  id?: number;
  name?: string;
  type?: string;
  size?: number;
  picId?: number;
  picUrl?: string;
  publishTime?: number;
  company?: string;
  commentThreadId?: string;
};

type Artist = {
  id: number;
  name: string;
  picUrl?: string;
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
  duration?: number;
  commentThreadId?: number;
};

type Playlist = {
  playingIndex: number;
  playing: Music;
  list: Music[];
  paused: boolean;
  reset: number;
};

type Sheet = {
  id: string;
  name: string;
  picUrl: string;
  playcount?: number;
  playCount?: number;
  createTime?: number;
  creator?: any;
};

type Track = {
  id: string;
  name: string;
  ar: Artist[];
  dt: number;
  al: Album;
  artists?: Artist[];
  duration?: number;
  album?: Album;
};

type PlaylistDetail = {
  id: number;
  name: string;
  subscribers: any[];
  subscribed: boolean;
  creator: any;
  tracks: Track[];
  trackIds: { id: string }[];
  updateFrequency: string;
  backgroundCoverId: string;
  backgroundCoverUrl: string;
  titleImage: string;
  titleImageUrl: string;
  englishTitle: string;
  createTime: number;
  subscribedCount: number;
  tags: string[];
  description: string;
  ordered: boolean;
  userId: number;
  updateTime: number;
  commentThreadId: string;
  trackCount: number;
  coverImgUrl: string;
  playCount: number;
  shareCount: number;
  commentCount: number;
};

export { Music, Playlist, Sheet, Track, PlaylistDetail };
