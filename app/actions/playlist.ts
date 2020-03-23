import { UPDATE_PLAYLIST, PlaylistAction } from '../reducers/types';

function updatePlaylist(playlist: any): PlaylistAction {
  return {
    type: UPDATE_PLAYLIST,
    payload: playlist
  };
}

export { updatePlaylist };
