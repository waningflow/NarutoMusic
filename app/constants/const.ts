import { MenuItem } from '@/types';

const sessionKey = {
  MUSIC_U: 'MUSIC_U'
};

const lsKey = {
  SONG_URLS: 'N_Song_Urls',
  Cookie: 'N_Cookie',
  USER_INFO: 'N_User_Info',
  RecommendSongs: 'N_Recommennd_Songs',
  HistoryRecommend: 'N_History_Recommend',
  HistoryRecommendKeys: 'N_History_Recommend_Keys'
};

const menuList: MenuItem[] = [
  {
    key: 'MUSIC_FIND',
    label: '发现音乐',
    href: '/',
    hidden: true
  },
  {
    key: 'PERSONAL_FM',
    label: '私人FM',
    href: '/music_play',
    hidden: true
  },
  {
    key: 'DAILY_RECOMMENDED',
    label: '今日推荐',
    href: '/music_sheet?type=daily_recommended'
  },
  {
    key: 'HISTORY_RECOMMEND',
    label: '历史日推',
    href: '/history_recommend'
  }
];

export { sessionKey, lsKey, menuList };
