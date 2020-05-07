import { RouterItem, MenuItem } from '@/types';
import Home from '@/pages/Home';
import MusicFind from '@/pages/MusicFind';
import MusicSheet from '@/pages/MusicSheet';
import MusicPlay from '@/pages/MusicPlay';
import HistoryRecommend from '@/pages/HistoryRecommend';
import PersonalRecommendation from '@/pages/PersonalRecommendation';
import SheetFind from '@/pages/SheetFind';
import RankingList from '@/pages/RankingList';

const routerConfig: RouterItem[] = [
  {
    key: 'HOME',
    path: '/',
    exact: true,
    component: Home
  },
  {
    key: 'MUSIC_FIND',
    path: '/music_find',
    exact: true,
    component: MusicFind
  },
  {
    key: 'MUSIC_SHEET',
    path: '/music_sheet',
    component: MusicSheet
  },
  {
    key: 'MUSIC_PLAY',
    path: '/music_play',
    exact: true,
    component: MusicPlay
  },
  {
    key: 'HISTORY_RECOMMEND',
    path: '/history_recommend',
    exact: true,
    component: HistoryRecommend
  },
  {
    key: 'PERSONAL_RECOMMENDATION',
    path: '/music_find/personal_recommendation',
    exact: true,
    component: PersonalRecommendation
  },
  {
    key: 'SHEET_FIND',
    path: '/music_find/sheet_find',
    exact: true,
    component: SheetFind
  },
  {
    key: 'RANKING_LIST',
    path: '/music_find/ranking_list',
    exact: true,
    component: RankingList
  }
];

const menuList: MenuItem[] = [
  {
    key: 'MUSIC_FIND',
    label: '发现音乐',
    path: '/music_find',
    href: '/music_find/personal_recommendation',
    subMenu: [
      {
        key: 'PERSONAL_RECOMMENDATION',
        label: '个性推荐',
        href: '/music_find/personal_recommendation'
      },
      {
        key: 'SHEET_FIND',
        label: '歌单',
        href: '/music_find/sheet_find'
      },
      {
        key: 'RANKING_LIST',
        label: '排行榜',
        href: '/music_find/ranking_list',
        hidden: true
      }
    ]
  },
  // {
  //   key: 'PERSONAL_FM',
  //   label: '私人FM',
  //   href: '/music_play',
  //   hidden: true
  // },
  {
    key: 'DAILY_RECOMMENDED',
    label: '每日推荐',
    href: '/music_sheet?type=daily_recommended'
  },
  {
    key: 'HISTORY_RECOMMEND',
    label: '历史日推',
    href: '/history_recommend'
  }
];

export { routerConfig, menuList };
