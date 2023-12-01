import { EOL } from 'os';
import mcfetch, { SearchAPIGetUsersParams } from '../../';

const keywords = 'dj cool';
const search = mcfetch.search(keywords);

const params: SearchAPIGetUsersParams = {
  dateJoined: 'pastYear',
  userType: 'any'
};

search.getUsers(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results.nextPageToken) {
    params.pageToken = results.nextPageToken;
    search.getUsers(params).then((results) => {
      console.log(`${EOL}Next set of results:`);
      console.log(JSON.stringify(results, null, 2));
    });
  }
  else {
    console.log(`${EOL}We have reached the end of the list!`);
  }
});
