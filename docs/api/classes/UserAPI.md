[mixcloud-fetch](../README.md) / UserAPI

# Class: UserAPI

## Hierarchy

- `default`

  ↳ **`UserAPI`**

## Table of contents

### Methods

- [getInfo](UserAPI.md#getinfo)
- [getPlaylists](UserAPI.md#getplaylists)
- [getShows](UserAPI.md#getshows)

## Methods

### getInfo

▸ **getInfo**(): `Promise`\<``null`` \| [`User`](../interfaces/User.md)\>

#### Returns

`Promise`\<``null`` \| [`User`](../interfaces/User.md)\>

#### Defined in

[lib/api/UserAPI.ts:34](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/UserAPI.ts#L34)

___

### getPlaylists

▸ **getPlaylists**(): `Promise`\<[`ItemList`](../interfaces/ItemList.md)\<[`Playlist`](../interfaces/Playlist.md)\>\>

#### Returns

`Promise`\<[`ItemList`](../interfaces/ItemList.md)\<[`Playlist`](../interfaces/Playlist.md)\>\>

#### Defined in

[lib/api/UserAPI.ts:41](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/UserAPI.ts#L41)

___

### getShows

▸ **getShows**(`params?`): `Promise`\<\{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"`` \| ``"oldest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`UserAPIGetShowsParams`](../interfaces/UserAPIGetShowsParams.md) |

#### Returns

`Promise`\<\{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"`` \| ``"oldest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Defined in

[lib/api/UserAPI.ts:48](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/UserAPI.ts#L48)
