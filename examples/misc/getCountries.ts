import mcfetch from '../../';

mcfetch.misc.getCountries().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
