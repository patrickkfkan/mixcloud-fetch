import { EOL } from 'os';
import mcfetch, { SearchAPIGetShowsParams } from '../../';

const keywords = 'ambient lounge';
const search = mcfetch.search(keywords);

const params: SearchAPIGetShowsParams = {
  limit: 10,
  dateUploaded: 'pastYear'
};

search.getShows(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results.nextPageToken) {
    params.pageToken = results.nextPageToken;
    search.getShows(params).then((results) => {
      console.log(`${EOL}Next set of results:`);
      console.log(JSON.stringify(results, null, 2));
    });
  }
  else {
    console.log(`${EOL}We have reached the end of the list!`);
  }
});
