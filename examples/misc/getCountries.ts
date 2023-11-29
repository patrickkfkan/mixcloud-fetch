import mcfetch from '../../';
import util from 'util';

/**
 * The getCountries() function returns the countries available
 * on Mixcloud, as well as the default country.
 */
mcfetch.misc.getCountries().then((results) => {
  console.log(util.inspect(results, false, null, false));
});
