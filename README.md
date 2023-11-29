# mixcloud-fetch

Node module for fetching Mixcloud resources.

Note: `mixcloud-fetch` does not support user login, so you won't be able to fetch exclusive content or access account-specific features.

# Installation

```
npm i mixcloud-fetch --save
```

# Usage

```
import mcfetch from 'mixcloud-fetch';

// Get shows matching the 'ambient' and 'lounge' tags
const shows = await mcfetch.tag(['ambient', 'lounge']).getShows();

// Search for tags matching 'jazz funk'
const tags = await mcfetch.search('jazz funk').getTags();
```

Here, `mcfetch` is a `MixcloudFetch` instance that provides access to the underlying APIs.

### Tag API

A tag is used to discover shows and is identified by its **slug**. To access the Tag API, call `tag(slug)` of a `MixcloudFetch` instance:

```
const slug = 'jazz';
const tag = mcfetch.tag(slug);

// Fetch shows matching the 'jazz' tag
const shows = await tag.getShows();
```

Multiple slugs are supported:

```
const slugs = [
    'jazz',
    'funk'
];
const tag = mcfetch.tag(slugs);

// Fetch shows matching both the 'jazz' and 'funk' tags
const shows = await tag.getShows();
```

The following methods are provided by the Tag API. Each method returns a Promise that resolves to the data requested.

| Function              | Resolves To                                 |                                                                                         |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getInfo()`             | Info about the target tag(s)             |
| `getShows([params])`*   | Cloudcasts matching the target tag(s)    |[Example](examples/tag/getShows.js) ([output](examples/tag/getShows_output.txt))           |
| `getFeatured([params])`*| Featured cloudcasts matching the target tag(s)|[Example](examples/tag/getFeatured.js) ([output](examples/tag/getFeatured_output.txt))|

*`params` specify what to return in the results. Check the example for what params you can specify.

### User API

A user is identified by **username**. To access the User API, call `user(username)` of a `MixcloudFetch` instance:

```
const username = 'jazzcat';
const user = mcfetch.user(username);

// Fetch shows uploaded by the user
const shows = await user.getShows();
```

The following methods are provided by the User API. Each method returns a Promise that resolves to the data requested.

| Function              | Resolves To                                 |                                                                                           |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getInfo()`             | Information about the user                    |[Example](examples/user/getInfo.js) ([output](examples/user/getInfo_output.txt))           |
| `getShows([params])`*   | Cloudcasts uploaded by the user               |[Example](examples/user/getShows.js) ([output](examples/user/getShows_output.txt))         |
| `getPlaylists()`        | Playlists owned by the user                   |[Example](examples/user/getPlaylists.js) ([output](examples/user/getPlaylists_output.txt)) |

*`params` specify what to return in the results. Check the example for what params you can specify.

### Playlist API

A playlist is identified by its ID. To access the Playlist API, call `playlist(playlistID)` of a `MixcloudFetch` instance:

```
const playlistId = 'UGxheWxpc3Q6MTM5NDM2MA==';
const playlist = mcfetch.playlist(playlistId);

// Fetch shows in the playlist
const shows = await playlist.getShows();
```

The following methods are provided by the Playlist API. Each method returns a Promise that resolves to the data requested.

| Function              | Resolves To                                 |                                                                                           |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getInfo()`             | Information about the playlist                |[Example](examples/playlist/getInfo.js) ([output](examples/playlist/getInfo_output.txt))   |
| `getShows([params])`*   | Cloudcasts in the playlist                    |[Example](examples/playlist/getShows.js) ([output](examples/playlist/getShows_output.txt)) |

*`params` specify what to return in the results. Check the example for what params you can specify.

### Cloudcast API

A Cloudcast is identified by its ID. To access the Cloudcast API, call `cloudcast(cloudcastID)` of a `MixcloudFetch` instance:

```
const cloudcastId = 'Q2xvdWRjYXN0OjE1MDg0MzQzNA==';
const cloudcast = mcfetch.cloudcast(cloudcastId);

// Fetch info about the Cloudcast
const info = await cloudcast.getInfo();
```

There is only one method provided by the Cloudcast API:

| Function              | Resolves To                                 |                                                                                           |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getInfo()`             | Information about the Cloudcast               |[Example](examples/cloudcast/getInfo.js) ([output](examples/cloudcast/getInfo_output.txt)) |

### Search API

`mixcloud-fetch` supports searching Tags, Shows and Users. To access the Search API, call `search(keywords)` of a `MixcloudFetch` instance, where `keywords` indicates the search terms:

```
const keywords = 'ambient lounge';
const search = mcfetch.search(keywords);

// Fetch shows matching 'ambient lounge':
const shows = await search.getShows();
```

The following methods are provided by the Search API. Each method returns a Promise that resolves to the data requested.

| Function              | Resolves To                                 |                                                                                           |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getTags([params])`     | Tags matching the given keywords              |[Example](examples/search/getTags.js) ([output](examples/search/getTags_output.txt))       |
| `getShows([params])`    | Cloudcasts matching the given keywords        |[Example](examples/search/getShows.js) ([output](examples/search/getShows_output.txt))     |
| `getUsers([params])`    | Users matching the given keywords             |[Example](examples/search/getUsers.js) ([output](examples/search/getUsers_output.txt))     |

`params` specify what to return in the results. Check the example for what params you can specify.

### Miscellaneous

```
// Get Mixcloud categories
const categories = await mcfetch.misc.getCategories();

// Get the list of available countries as well as the default
const countries = await mcfetch.misc.getCountries();
```

| Function              | Resolves To                                 |                                                                                           |
|-----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `getCategories()`       | Mixcloud categories                           |[Example](examples/misc/getCategories.js) ([output](examples/misc/getCategories_output.txt)) |
| `getCountries()`        | Available countries and the default           |[Example](examples/misc/getCountries.js) ([output](examples/misc/getCountries_output.txt)) |

# Rate Limiting

Fetch requests are rate limited by default. Rate limiting is useful when you need to make a large number of queries and don't want to run the risk of getting rejected by the server for making too many requests within a short time interval.

The library uses [Bottleneck](https://www.npmjs.com/package/bottleneck) for rate limiting. You can configure the rate limiter like this:

```
mcfetch.limiter.setOptions({
    maxConcurrent: 10,  // default: 5
    minTime: 100        // default: 200
});
```
`setOptions()` is just a passthrough function to Bottleneck's `updateSettings()`. Check the [Bottleneck doc](https://www.npmjs.com/package/bottleneck#docs) for the list of options you can set.

To check if the rate limiter is enabled:

```
mcfetch.limiter.isEnabled()
```

To disable the rate limiter:

```
mcfetch.limiter.setEnabled(false);
```

# Caching

The library maintains an in-memory cache for storing results of fetch requests. You can access the cache functions as follows:

```
// Set the expiry time of cache entries (seconds)
mcfetch.cache.setTTL(500); // Default: 300

// Set the maximum number of entries that can be stored in the cache
// Specify a negative value (e.g -1) for unlimited entries.
mcfetch.cache.setMaxEntries(20); // Default: 10

// Clears the cache
mcfetch.cache.clear();
```

# Changelog

0.1.1:
- Fix fetch errors due to Mixcloud changing their GraphQL URL.

# License

MIT