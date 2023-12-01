import { EOL } from 'os';
import mcfetch, { PlaylistAPIGetShowsParams } from '../../';

const playlistId = 'UGxheWxpc3Q6MTM5NDM2MA==';
const playlist = mcfetch.playlist(playlistId);

const params: PlaylistAPIGetShowsParams = {
  limit: 50
};

playlist.getShows(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results) {
    if (results.nextPageToken) {
      params.pageToken = results.nextPageToken;
      playlist.getShows(params).then((results) => {
        console.log(`${EOL}Next set of results:`);
        console.log(JSON.stringify(results, null, 2));
      });
    }
    else {
      console.log(`${EOL}We have reached the end of the list!`);
    }
  }
});
