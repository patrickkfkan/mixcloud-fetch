import mcfetch from '../../';

const cloudcastId = 'Q2xvdWRjYXN0OjE1MDg0MzQzNA==';
const cloudcast = mcfetch.cloudcast(cloudcastId);

cloudcast.getInfo().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
