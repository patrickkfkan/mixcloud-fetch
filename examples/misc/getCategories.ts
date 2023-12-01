import mcfetch from '../../';

mcfetch.misc.getCategories().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
