import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'rsuite';
import { recommendSongs } from '@/api/api';
import './MusicSheet.less';

const { Column, HeaderCell, Cell } = Table;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
      <Table
        autoHeight
        data={songList}
        rowHeight={36}
        onRowClick={data => {
          console.log(data);
        }}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell />
          <Cell>
            {(rowData: any, rowIndex: number) => (
              <span className="music-sheet-table-index">{rowIndex + 1}</span>
            )}
          </Cell>
        </Column>
        <Column flexGrow={5} align="left" fixed>
          <HeaderCell>音乐标题</HeaderCell>
          <Cell dataKey="name" />
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
        <Column flexGrow={1} align="left" fixed>
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
