import mcfetch from '../../';

const username = 'Jazzmo';
const user = mcfetch.user(username);

user.getPlaylists().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
