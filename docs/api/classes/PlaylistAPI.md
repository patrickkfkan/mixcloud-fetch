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

[lib/api/PlaylistAPI.ts:22](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/PlaylistAPI.ts#L22)

___

### getShows

▸ **getShows**(`params?`): `Promise`\<``null`` \| [`ItemList`](../interfaces/ItemList.md)\<[`Cloudcast`](../interfaces/Cloudcast.md)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`APIPaginationParams`](../interfaces/APIPaginationParams.md) |

#### Returns

`Promise`\<``null`` \| [`ItemList`](../interfaces/ItemList.md)\<[`Cloudcast`](../interfaces/Cloudcast.md)\>\>

#### Defined in

[lib/api/PlaylistAPI.ts:36](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/PlaylistAPI.ts#L36)
