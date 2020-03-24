import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Icon } from 'rsuite';
import { recommendSongs, songUrl } from '@/api/api';
import { parseTime, num2str } from '@/utils/utils';
import { updatePlaylist } from '@/actions/playlist';
import { getSongUrls, getSongUrls2 } from '@/utils/ls';
import './MusicSheet.less';

const { Column, HeaderCell, Cell } = Table;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MusicSheetTitle = (props: { onClickPlayAll: () => void }) => {
  const { onClickPlayAll } = props;
  return (
    <div className="music-sheet-title-container">
      <div className="music-sheet-title">每日歌曲推荐</div>
      <div className="music-sheet-subtitle">根据你的音乐口味生成</div>
      <Button appearance="primary" size="sm" block onClick={onClickPlayAll}>
        <Icon icon="play-circle-o" />
        播放全部
      </Button>
    </div>
  );
};

const MusicSheet = () => {
  const query = useQuery();
  const type = query.get('type');
  const dispatch = useDispatch();

  const [songList, setSongList] = useState<any[]>([]);
  useEffect(() => {
    (async function update() {
      try {
        const songs = await recommendSongs();
        setSongList(songs);
      } catch (e) {
        //
      }
    })();
  }, [type]);

  const handlePlayAll = async () => {
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
  return (
    <div className="music-sheet-container">
      <MusicSheetTitle onClickPlayAll={handlePlayAll} />
      <Table
        autoHeight
        data={songList}
        rowHeight={34}
        onRowClick={data => {
          console.log(data);
        }}
        hover={false}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell />
          <Cell>
            {(_: any, rowIndex: number) => (
              <span className="music-sheet-table-index">
                {rowIndex + 1 >= 100 ? rowIndex + 1 : num2str(rowIndex + 1)}
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={5} align="left" fixed>
          <HeaderCell>音乐标题</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <span className="music-sheet-table-name">{rowData.name}</span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={2} align="left" fixed>
          <HeaderCell>歌手</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <span className="music-sheet-table-artist">
                {rowData.artists.map(v => v.name).join('/')}
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={3} align="left" fixed>
          <HeaderCell>专辑</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <span className="music-sheet-table-album">
                {rowData.album.name}
              </span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1.25} align="left" fixed>
          <HeaderCell>时长</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <span className="music-sheet-table-playtime">
                {parseTime(rowData.hMusic.playTime / 1000)}
              </span>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default MusicSheet;
