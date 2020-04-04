import { UPDATE_PLAYLIST, PlaylistAction } from './types';

const initState = {
  playingIndex: -1,
  playing: {},
  list: [],
  paused: true,
  reset: 0
};

export default function playlist(state = initState, action: PlaylistAction) {
  switch (action.type) {
    case UPDATE_PLAYLIST: {
      const reset = action.payload.reset || state.reset + 1;
      return { ...state, ...action.payload, reset };
    }
    default:
      return state;
  }
}
