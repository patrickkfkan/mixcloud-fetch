import mcfetch from '../../';

const username = 'spartacus';
const user = mcfetch.user(username);

user.getInfo().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
