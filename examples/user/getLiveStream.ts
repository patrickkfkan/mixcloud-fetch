import mcfetch from '../../';

const username = 'oncue365';
const user = mcfetch.user(username);

user.getLiveStream().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
