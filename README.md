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

Here, `mcfetch` is the default [MixcloudFetch](docs/api/classes/MixcloudFetch.md) instance exported by `mixcloud-fetch`. The `MixcloudFetch` class defines methods for accessing the underlying APIs.

## Tag API

#### Access method

#### `MixcloudFetch#tag(slug | slug[])`

Returns a [TagAPI](docs/api/classes/TagAPI.md) instance targeting the tag given by `slug`, or multiple tags given by `slug[]`.

#### Description

A tag is used to discover shows and is identified by its **slug**. To access the Tag API, call the `tag()` method of a `MixcloudFetch` instance, passing into it the slug of the target tag.

```
const slug = 'jazz';
const tag = mcfetch.tag(slug);
```

To target multiple tags, put their slugs into an array and pass the array into `tag()`:

```
const slugs = [
    'jazz',
    'funk'
];
const tag = mcfetch.tag(slugs);
```

You can then call methods provided by `TagAPI`.

#### API methods

<details>
<summary><code>TagAPI#getInfo()</code></summary>
<br />

[Example](examples/tag/getInfo.ts) ➔ [Output](examples/tag/getInfo_output.txt)

<p>Fetches information about the target tag(s).</p>

**Returns**

Promise:
- If none of the target tag(s) exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an Array of [Tag](docs/api/interfaces/Tag.md) items. Only tags that exist will be included in the Array.

---
</details>

<details>
<summary><code>TagAPI#getShows([params])</code></summary>
<br />

[Example](examples/tag/getShows.ts) ➔ [Output](examples/tag/getShows_output.txt)

<p>Fetches Cloudcasts matching the target tag(s).</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `orderBy`     | (string) `trending` \| `popular` \| `latest`. Default: `trending`      |
| `country`     | <p>(string) Country code - **only supported when `orderBy` is `trending`.**</p><p>If specified, return Cloudcasts originating from  `country`. For the list of values you can specify, call [MiscAPI#getCountries()](#api-methods-6).</p><p>If not specified, the default value will be determined by Mixcloud.</p> |
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

- If none of the target tag(s) exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Cloudcast](docs/api/interfaces/Cloudcast.md) items fetched.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `selectedTags` | (Array) The [Tag](docs/api/interfaces/Tag.md) items representing the target tags. |
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

<details>
<summary><code>TagAPI#getFeatured([params])</code></summary>
<br />

[Example](examples/tag/getFeatured.ts) ➔ [Output](examples/tag/getFeatured_output.txt)

<p>Fetches featured Cloudcasts matching the target tag(s).</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `orderBy`     | (string) `popular` \| `latest`. Default: `latest`      |
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise:
- If none of the target tag(s) exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Cloudcast](docs/api/interfaces/Cloudcast.md) items fetched.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `selectedTags` | (Array) The [Tag](docs/api/interfaces/Tag.md) items representing the target tags. |
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

## User API

#### Access method

#### `MixcloudFetch#user(username)`

Returns a [UserAPI](docs/api/classes/UserAPI.md) instance targeting the user given by `username`.

#### Description

A user is identified by **username**. To access the User API, call the `user()` method of a `MixcloudFetch` instance, passing into it the username of the target user:

```
const username = 'jazzcat';
const user = mcfetch.user(username);
```

You can then call methods provided by `UserAPI`.

#### API methods

<details>
<summary><code>UserAPI#getInfo()</code></summary>
<br />

[Example](examples/user/getInfo.ts) ➔ [Output](examples/user/getInfo_output.txt)

<p>Fetches information about the target user.</p>

**Returns**

Promise resolving to [User](docs/api/interfaces/User.md), or `null` if target user does not exist.

---
</details>

<details>
<summary><code>UserAPI#getShows([params])</code></summary>
<br />

[Example](examples/user/getShows.ts) ➔ [Output](examples/user/getShows_output.txt)

<p>Fetches Cloudcasts uploaded by the target user.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `orderBy`     | (string) 'trending' \| 'popular' \| 'latest' \| 'oldest'. Default: `latest`      |
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise:
- If target user does not exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Cloudcast](docs/api/interfaces/Cloudcast.md) items fetched.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

<details>
<summary><code>UserAPI#getPlaylists()</code></summary>
<br />

[Example](examples/user/getPlaylists.ts) ➔ [Output](examples/user/getPlaylists_output.txt)

<p>Fetches playlists owned by the target user.</p>

**Returns**

Promise:
- If target user does not exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an Array of [Playlist](docs/api/interfaces/Playlist.md) items.

---
</details>

<details>
<summary><code>UserAPI#getLiveStream()</code></summary>
<br />

[Example](examples/user/getLiveStream.ts) ➔ [Output](examples/user/getLiveStream_output.txt)

<p>Fetches the target user's live stream.</p>

**Returns**

Promise:
- If there is no live stream, or target user does not exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to a [LiveStream](docs/api/interfaces/LiveStream.md) item.

---
</details>

## Playlist API

#### Access method

#### `MixcloudFetch#playlist(playlistID)`

Returns a [PlaylistAPI](docs/api/classes/PlaylistAPI.md) instance targeting the playlist given by `playlistID`.

#### Description

A playlist is identified by its ID. To access the Playlist API, call the `playlist()` method of a `MixcloudFetch` instance, passing into it the ID of the target playlist:

```
const playlistId = 'UGxheWxpc3Q6MTM5NDM2MA==';
const playlist = mcfetch.playlist(playlistId);
```

You can then call methods provided by `PlaylistAPI`.

#### API methods

<details>
<summary><code>PlaylistAPI#getInfo()</code></summary>
<br />

[Example](examples/playlist/getInfo.ts) ➔ [Output](examples/playlist/getInfo_output.txt)

<p>Fetches information about the target playlist.</p>

**Returns**

Promise resolving to [Playlist](docs/api/interfaces/Playlist.md), or `null` if target playlist does not exist.

---
</details>

<details>
<summary><code>PlaylistAPI#getShows([params])</code></summary>
<br />

[Example](examples/playlist/getShows.ts) ➔ [Output](examples/playlist/getShows_output.txt)

<p>Fetches Cloudcasts in the target playlist.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise:
- If target playlist does not exist, the Promise resolves to `null`.
- Otherwise, the Promise resolves to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Cloudcast](docs/api/interfaces/Cloudcast.md) items fetched.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>

---
</details>

## Cloudcast API

#### Access method

#### `MixcloudFetch#cloudcast(cloudcastID)`

Returns a [CloudcastAPI](docs/api/classes/CloudcastAPI.md) instance targeting the Cloudcast given by `cloudcastID`.

#### Description

A Cloudcast is identified by its ID. To access the Cloudcast API, call the `cloudcast()` method of a `MixcloudFetch` instance, passing into it the ID of the target Cloudcast:

```
const cloudcastId = 'Q2xvdWRjYXN0OjE1MDg0MzQzNA==';
const cloudcast = mcfetch.cloudcast(cloudcastId);
```

You can then call methods provided by `CloudcastAPI`.

#### API methods

<details>
<summary><code>CloudcastAPI#getInfo()</code></summary>
<br />

[Example](examples/cloudcast/getInfo.ts) ➔ [Output](examples/cloudcast/getInfo_output.txt)

<p>Fetches information about the target Cloudcast.</p>

**Returns**

Promise resolving to [Cloudcast](docs/api/interfaces/Cloudcast.md), or `null` if target Cloudcast does not exist.

---
</details>

## Search API

#### Access method

#### `MixcloudFetch#search(keywords)`

Returns a [SearchAPI](docs/api/classes/SearchAPI.md) instance targeting the `keywords` to search for.

#### Description

`mixcloud-fetch` supports searching Tags, Shows and Users. To access the Search API, call the `search()` method of a `MixcloudFetch` instance, passing into it the keywords you would like to search for.

```
const keywords = 'ambient lounge';
const search = mcfetch.search(keywords);
```

You can then call methods provided by `SearchAPI`.

#### API methods

<details>
<summary><code>SearchAPI#getTags([params])</code></summary>
<br />

[Example](examples/search/getTags.ts) ➔ [Output](examples/search/getTags_output.txt)

<p>Searches for tags matching the target keywords.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise resolving to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Tag](docs/api/interfaces/Tag.md) items found.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

<details>
<summary><code>SearchAPI#getShows([params])</code></summary>
<br />

[Example](examples/search/getShows.ts) ➔ [Output](examples/search/getShows_output.txt)

<p>Searches for Cloudcasts matching the target keywords.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `dateUploaded`| (string) `pastWeek` \| `pastMonth` \| `pastYear` \| `anyTime`. Default: `anyTime` |
| `requireTimeStamp` | (boolean) If `true`, only return Cloudcasts that are timestamped. Default: `false` |
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise resolving to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [Cloudcast](docs/api/interfaces/Cloudcast.md) items found.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

<details>
<summary><code>SearchAPI#getUsers([params])</code></summary>
<br />

[Example](examples/search/getUsers.ts) ➔ [Output](examples/search/getUsers_output.txt)

<p>Searches for users matching the target keywords.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `dateJoined`| (string) `pastWeek` \| `pastMonth` \| `pastYear` \| `anyTime`. Default: `anyTime` |
| `userType`    | (string) `uploader` \| `listener` \| `any`. Default: `any`
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise resolving to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [User](docs/api/interfaces/User.md) items found.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

## LiveStream API

#### Access property

#### `MixcloudFetch#liveStream`

Returns a [LiveStreamAPI](docs/api/classes/LiveStreamAPI.md) isntance.

#### Description

The LiveStream API allows you to fetch Mixcloud live streams.

#### API methods

> For fetching the live stream of a user, call [UserAPI#getLiveStream()](#api-methods-1) instead.

<details>
<summary><code>LiveStreamAPI#getCurrent([params])</code></summary>
<br />

[Example](examples/live_stream/getCurrent.ts) ➔ [Output](examples/live_stream/getCurrent_output.txt)

<p>Fetches the current live streams on Mixcloud.</p>

**Params**

`params`: (object) (*optional* and *all properties optional*)

| Property      | Description               |
|---------------|---------------------------|
| `orderBy`     | (string) `popular` \| `mostRecent`. Default: `popular` |
| `category`    | <p>(string) If specified, return live streams in  `category`.</p><p>For the list of values you can specify, call `getCategories()` of this API.</p> |
| `limit`       | (number) Number of items to fetch (max: 100). Default: 20 |
| `pageToken`   | (string) Continuation token for fetching the next batch of items following the previous fetch.

**Returns**

Promise resolving to an object with the following properties:

| Property      | Description               |
|---------------|---------------------------|
| `items`       | (Array) The list of [LiveStream](docs/api/interfaces/LiveStream.md) items fetched.
| `nextPageToken` | <p>(string) If available, the continuation token for retrieving the next batch of items. Otherwise, there are no further items available.</p><p>To fetch the next batch of items, pass the token as `params.pageToken` in the next call to this method.</p>
| `params`      | (object) Sanitized version of `params` used to request data from Mixcloud. |

---
</details>

<details>
<summary><code>LiveStreamAPI#getCategories()</code></summary>
<br />

[Example](examples/live_stream/getCategories.ts) ➔ [Output](examples/live_stream/getCategories_output.txt)

<p>Fetches the available live stream categories.</p>

**Returns**

Promise resolving to an Array of strings. Each array element is the name of a live stream category.

---
</details>

## Miscellaneous API

#### Access property

#### `MixcloudFetch#misc`

Returns a [MiscAPI](docs/api/classes/MiscAPI.md) instance.

#### Description

The Miscellaneous API provides methods for obtaining values that can be used in other API methods.

#### API methods

<details>
<summary><code>MiscAPI#getCategories()</code></summary>
<br />

[Example](examples/misc/getCategories.ts) ➔ [Output](examples/misc/getCategories_output.txt)

Fetches the list of Mixcloud categories. See Usage below for example of fetching Cloudcasts belonging to a specific category.

**Returns**

Promise resolving to a [CategoryBundle](docs/api/interfaces/Category.md). A bundle is an object with the following structure:

```
{
  bundle1: Category[],
  bundle2: Category[]
}
```

A [Category](docs/api/interfaces/Category.md) is an object wih the following key properties:

| Property          | Description                    |
|-------------------|--------------------------------|
| `name`            | (string) Category name         |
| `slug`            | (string) Category identifier   |

**Usage**

Say we have the following category bundle obtained from `getCategories()`:

```
{
  music: [
    { name: 'Ambient', slug: 'ambient' },
    { name: 'Bass', slug: 'bass' }
    ...
  ],
  talk: [
    { name: 'Business', slug: 'business' },
    { name: 'Comedy', slug: 'comedy' }
    ...
  ]
}
```

To obtain Cloudcasts belonging to the 'Ambient' category, use its `slug` property in conjunction with the Tag API:

```
const tag = mcfetch.tag(bundle['music'][0]['slug']); 
const showsInAmbientCategory = await tag.getShows(); 
```

---
</details>

<details>
<summary><code>MiscAPI#getCountries()</code></summary>
<br />

[Example](examples/misc/getCountries.ts) ➔ [Output](examples/misc/getCountries_output.txt)

Fetches the list of countries available on Mixcloud. See Usage below for example of fetching Cloudcasts originating from a specific country.

**Returns**

Promise resolving to a [CountryBundle](docs/api/interfaces/CountryBundle.md). A bundle is an object with the following properties:

| Property          | Description                    |
|-------------------|--------------------------------|
| `default`         | (object) The default country   |
| `available`       | (Array) The list of available countries |

Each [Country](docs/api/interfaces/Country.md) is an object with the following properties:

| Property          | Description                    |
|-------------------|--------------------------------|
| `code`            | (string) Country code          |
| `name`            | (string) Country name          |

**Usage**

Say we have the following countries returned by `getCountries()`:

```
{
  default: { code: 'HKG', name: 'Hong Kong' },
  available: [
    { code: 'GLOBAL', name: 'Global' },
    { code: 'AUS', name: 'Australia' },
    { code: 'CAN', name: 'Canada' },
    ...
  ]
}
```

To obtain Cloudcasts matching the 'jazz' tag and originating from Canada:

```
const tag = mcfetch.tag('jazz'); 
const jazzShowsFromCanada = await tag.getShows({
  country: 'CAN' // Use the country code
});
```

---
</details>

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