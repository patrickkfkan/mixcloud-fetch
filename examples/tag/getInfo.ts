import mcfetch from '../../';

const slugs = [ 'ambient', 'funk' ];
const tag = mcfetch.tag(slugs);

tag.getInfo().then((results) => {
  console.log(JSON.stringify(results, null, 2));
});
