import { EOL } from 'os';
import mcfetch, { LiveStreamAPIGetCurrentParams } from '../../';

const params: LiveStreamAPIGetCurrentParams = {
  limit: 25,
  orderBy: 'mostRecent'
};

mcfetch.liveStream.getCurrent(params).then((results) => {
  console.log(JSON.stringify(results, null, 2));

  if (results.nextPageToken) {
    params.pageToken = results.nextPageToken;
    mcfetch.liveStream.getCurrent(params).then((results) => {
      console.log(`${EOL}Next set of results:`);
      console.log(JSON.stringify(results, null, 2));
    });
  }
  else {
    console.log(`${EOL}We have reached the end of the list!`);
  }
});
