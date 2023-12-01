import mcfetch from '../../';

mcfetch.liveStream.getCategories().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
