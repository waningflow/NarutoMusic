import { UPDATE_PLAYLIST } from '@/store/types';

function updatePlaylist(playlist: any) {
  return {
    type: UPDATE_PLAYLIST,
    payload: playlist
  };
}

export { updatePlaylist };
