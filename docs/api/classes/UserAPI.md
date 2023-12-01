[mixcloud-fetch](../README.md) / UserAPI

# Class: UserAPI

## Hierarchy

- `default`

  ↳ **`UserAPI`**

## Table of contents

### Methods

- [getInfo](UserAPI.md#getinfo)
- [getLiveStream](UserAPI.md#getlivestream)
- [getPlaylists](UserAPI.md#getplaylists)
- [getShows](UserAPI.md#getshows)

## Methods

### getInfo

▸ **getInfo**(): `Promise`\<``null`` \| [`User`](../interfaces/User.md)\>

#### Returns

`Promise`\<``null`` \| [`User`](../interfaces/User.md)\>

#### Defined in

[lib/api/UserAPI.ts:36](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/UserAPI.ts#L36)

___

### getLiveStream

▸ **getLiveStream**(): `Promise`\<``null`` \| [`LiveStream`](../interfaces/LiveStream.md)\>

#### Returns

`Promise`\<``null`` \| [`LiveStream`](../interfaces/LiveStream.md)\>

#### Defined in

[lib/api/UserAPI.ts:74](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/UserAPI.ts#L74)

___

### getPlaylists

▸ **getPlaylists**(): `Promise`\<``null`` \| [`ItemList`](../interfaces/ItemList.md)\<[`Playlist`](../interfaces/Playlist.md)\>\>

#### Returns

`Promise`\<``null`` \| [`ItemList`](../interfaces/ItemList.md)\<[`Playlist`](../interfaces/Playlist.md)\>\>

#### Defined in

[lib/api/UserAPI.ts:43](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/UserAPI.ts#L43)

___

### getShows

▸ **getShows**(`params?`): `Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"`` \| ``"oldest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`UserAPIGetShowsParams`](../interfaces/UserAPIGetShowsParams.md) |

#### Returns

`Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"`` \| ``"oldest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Defined in

[lib/api/UserAPI.ts:50](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/UserAPI.ts#L50)
