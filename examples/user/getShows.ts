import { EOL } from 'os';
import mcfetch, { UserAPIGetShowsParams } from '../../';

const username = 'nicolemoudaber';
const user = mcfetch.user(username);

const params: UserAPIGetShowsParams = {
  limit: 30,
  orderBy: 'trending'
};

user.getShows(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results) {
    if (results.nextPageToken) {
      params.pageToken = results.nextPageToken;
      user.getShows(params).then((results) => {
        console.log(`${EOL}Next set of results:`);
        console.log(JSON.stringify(results, null, 2));
      });
    }
    else {
      console.log(`${EOL}We have reached the end of the list!`);
    }
  }
});
