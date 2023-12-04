[mixcloud-fetch](../README.md) / PlaylistAPI

# Class: PlaylistAPI

## Hierarchy

- `default`

  ↳ **`PlaylistAPI`**

## Table of contents

### Methods

- [getInfo](PlaylistAPI.md#getinfo)
- [getShows](PlaylistAPI.md#getshows)

## Methods

### getInfo

▸ **getInfo**(): `Promise`\<``null`` \| [`Playlist`](../interfaces/Playlist.md)\>

#### Returns

`Promise`\<``null`` \| [`Playlist`](../interfaces/Playlist.md)\>

#### Defined in

[lib/api/PlaylistAPI.ts:22](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/api/PlaylistAPI.ts#L22)

___

### getShows

▸ **getShows**(`params?`): `Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`APIPaginationParams`](../interfaces/APIPaginationParams.md) |

#### Returns

`Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Defined in

[lib/api/PlaylistAPI.ts:36](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/api/PlaylistAPI.ts#L36)
