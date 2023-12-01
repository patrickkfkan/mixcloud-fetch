import { EOL } from 'os';
import mcfetch, { TagAPIGetShowsParams } from '../../';

const slugs = [ 'ambient', 'funk' ];
const tag = mcfetch.tag(slugs);

const params: TagAPIGetShowsParams = {
  limit: 30,
  orderBy: 'popular'
};

tag.getShows(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));
  if (results) {
    if (results.nextPageToken) {
      params.pageToken = results.nextPageToken;
      tag.getShows(params).then( (results) => {
        console.log(`${EOL}Next set of results:`);
        console.log(JSON.stringify(results, null, 2));
      });
    }
    else {
      console.log(`${EOL}We have reached the end of the list!`);
    }
  }
});
