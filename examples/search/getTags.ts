import { EOL } from 'os';
import mcfetch, { SearchAPIGetTagsParams } from '../../';

const keywords = 'ambient lounge';
const search = mcfetch.search(keywords);

const params: SearchAPIGetTagsParams = {
  limit: 10
};

search.getTags(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results.nextPageToken) {
    params.pageToken = results.nextPageToken;
    search.getTags(params).then((results) => {
      console.log(`${EOL}Next set of results:`);
      console.log(JSON.stringify(results, null, 2));
    });
  }
  else {
    console.log(`${EOL}We have reached the end of the list!`);
  }
});
