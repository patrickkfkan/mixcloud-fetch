import mcfetch from '../../';
import util from 'util';

/**
 * To get information about a user, you need the user's username.
 */
const username = 'spartacus';

/**
 * Then obtain a User object from mixcloud-fetch.
 */
const user = mcfetch.user(username);

/**
 * Finally, fetch information about the user.
 */
user.getInfo().then((results) => {
  console.log(util.inspect(results, false, null, false));
});
