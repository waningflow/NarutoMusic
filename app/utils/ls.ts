import { songUrl } from '@/api/api';

const lsKey = {
  SONG_URLS: 'N_Song_Urls'
};

async function getSongUrls(ids: string) {
  const result: { [key: string]: string } = {};
  try {
    const allUrlsStr = localStorage.getItem(lsKey.SONG_URLS) || '{}';
    const allUrls = JSON.parse(allUrlsStr);
    const nIds: string[] = [];
    ids.split(',').forEach(id => {
      if (allUrls[id]) {
        result[id] = allUrls[id];
      } else {
        nIds.push(id);
      }
    });
    if (nIds.length) {
      const res = await songUrl(nIds.join(','));
      Object.assign(result, res);
      Object.assign(allUrls, res);
      localStorage.setItem(lsKey.SONG_URLS, JSON.stringify(allUrls));
    }
  } catch (e) {
    //
  }
  return result;
}

async function getSongUrls2(ids: string) {
  const result: { [key: string]: string } = {};
  ids.split(',').forEach(v => {
    result[v] = `https://music.163.com/song/media/outer/url?id=${v}.mp3`;
  });
  return result;
}

export { getSongUrls, getSongUrls2 };
