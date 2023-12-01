import mcfetch from '../../';

const playlistId = 'UGxheWxpc3Q6NjUwMjE4';
const playlist = mcfetch.playlist(playlistId);

playlist.getInfo().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
