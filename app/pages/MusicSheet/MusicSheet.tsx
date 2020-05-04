import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon, Dropdown, Popover, Whisper } from 'rsuite';
import cn from 'classnames';
import { parseTime, num2str, getToday } from '@/utils/utils';
import { updatePlaylist } from '@/actions/playlist';
import { getSongUrls, getSongUrls2 } from '@/utils/ls';
import { Music } from '@/types';
import { State as StateType } from '@/reducers';
import {
  log,
  getRecommendSongs,
  getHistoryRecommendSongs,
  getPlaylistDetail
} from './service';
import './MusicSheet.less';
import { DaySheetTitle, CommonSheetTitle } from './components';

const { Column, HeaderCell, Cell } = Table;

enum SheetType {
  DAY = 'day',
  COMMON = 'common'
}

const MusicSheet = () => {
  const dispatch = useDispatch();
  const { playing } = useSelector((state: StateType) => state.playlist);
  const { location } = useSelector((state: StateType) => state.router);
  const { query } = location;
  const { type } = query;
  const [sheetType, setSheetType] = useState<SheetType | string>('');
  const [songList, setSongList] = useState<any[]>([]);
  const [date, setDate] = useState(getToday());
  const [sheetDetail, setSheetDetail] = useState();
  useEffect(() => {
    (async function update() {
      if (type === 'daily_recommended') {
        setSheetType(SheetType.DAY);
        setDate(getToday());
        try {
          const songs = await getRecommendSongs();
          if (songs) setSongList(songs);
        } catch (e) {
          log.err('get recommend songs err');
        }
      } else if (type === 'history_recommend') {
        setSheetType(SheetType.DAY);
        const d = query.date;
        setDate(d.slice(5));
        const songs = getHistoryRecommendSongs(d);
        if (songs) setSongList(songs);
      } else if (type === 'common_sheet') {
        setSheetType(SheetType.COMMON);
        const sheetId = query.id;
        const res = await getPlaylistDetail(sheetId);
        setSheetDetail(res);
        setSongList(res.tracks);
      }
    })();
  }, [type]);

  const handlePlayAll = async () => {
    if (!songList || !songList.length) return;
    const ids = songList.map(v => v.id).join(',');
    const urls = await getSongUrls2(ids);
    const list = songList.map(v => {
      return {
        ...v,
        url: urls[v.id] || ''
      };
    });
    dispatch(
      updatePlaylist({
        list,
        playing: list[0],
        playingIndex: 0,
        reset: 1
      })
    );
  };

  const handleClickMusicPlay = async (rowData: Music) => {
    const { id } = rowData;
    const index = songList.findIndex(v => v.id === id);
    const ids = songList.map(v => v.id).join(',');
    const urls = await getSongUrls2(ids);
    const list = songList.map(v => {
      return {
        ...v,
        url: urls[v.id] || ''
      };
    });
    dispatch(
      updatePlaylist({
        list,
        playing: list[index],
        playingIndex: index,
        reset: 1
      })
    );
  };
  const defaultPicUrl = songList ? songList[0]?.album?.picUrl : '';
  return (
    <div className="music-sheet-container">
      {sheetType === SheetType.DAY && (
        <DaySheetTitle
          onClickPlayAll={handlePlayAll}
          date={date}
          picUrl={defaultPicUrl}
        />
      )}
      {sheetType === SheetType.COMMON && (
        <CommonSheetTitle
          onClickPlayAll={handlePlayAll}
          playlistDetail={sheetDetail}
        />
      )}
      <Table autoHeight data={songList} rowHeight={34} hover={false}>
        <Column width={60} align="center" fixed>
          <HeaderCell />
          <Cell>
            {(rowData: any, rowIndex: number) =>
              rowData.id === playing.id ? (
                <Icon icon="volume-up" className="primary-color" />
              ) : (
                <span className="music-sheet-table-index">
                  {rowIndex + 1 >= 100 ? rowIndex + 1 : num2str(rowIndex + 1)}
                </span>
              )
            }
          </Cell>
        </Column>
        <Column flexGrow={5} align="left" fixed>
          <HeaderCell>音乐标题</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <span
                className={cn('music-sheet-table-name', {
                  'primary-color': rowData.id === playing.id
                })}
              >
                {rowData.name}
                <Whisper
                  placement="rightStart"
                  trigger="click"
                  full
                  speaker={
                    <Popover full style={{ width: '100px' }}>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleClickMusicPlay(rowData)}
                        >
                          播放
                        </Dropdown.Item>
                        <Dropdown.Item>下一首播放</Dropdown.Item>
                      </Dropdown.Menu>
                    </Popover>
                  }
                >
                  <Icon
                    icon="more"
                    size="lg"
                    className="music-sheet-table-name-more"
                  />
                </Whisper>
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={2} align="left" fixed>
          <HeaderCell>歌手</HeaderCell>
          <Cell>
            {(rowData: Music) => (
              <span className="music-sheet-table-artist">
                {rowData.artists && rowData.artists.map(v => v.name).join('/')}
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={3} align="left" fixed>
          <HeaderCell>专辑</HeaderCell>
          <Cell>
            {(rowData: Music) => (
              <span className="music-sheet-table-album">
                {rowData.album && rowData.album.name}
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1.25} align="left" fixed>
          <HeaderCell>时长</HeaderCell>
          <Cell>
            {(rowData: Music) => (
              <span className="music-sheet-table-playtime">
                {rowData.duration && parseTime(rowData.duration / 1000)}
              </span>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default MusicSheet;
