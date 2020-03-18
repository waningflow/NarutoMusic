import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Button, Icon } from 'rsuite';
import { recommendSongs } from '@/api/api';
import './MusicSheet.less';

const { Column, HeaderCell, Cell } = Table;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MusicSheetTitle = () => {
  return (
    <div className="music-sheet-title-container">
      <div className="music-sheet-title">每日歌曲推荐</div>
      <div className="music-sheet-subtitle">根据你的音乐口味生成</div>
      <Button appearance="primary" size="sm" block>
        <Icon icon="play-circle-o" />
        播放全部
      </Button>
    </div>
  );
};

const MusicSheet = () => {
  const query = useQuery();
  const type = query.get('type');

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
  return (
    <div className="music-sheet-container">
      <MusicSheetTitle />
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
              <span className="music-sheet-table-index">{rowIndex + 1}</span>
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
                {rowData.hMusic.playTime}
              </span>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default MusicSheet;
