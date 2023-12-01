[mixcloud-fetch](../README.md) / SearchAPI

# Class: SearchAPI

## Hierarchy

- `default`

  ↳ **`SearchAPI`**

## Table of contents

### Methods

- [getShows](SearchAPI.md#getshows)
- [getTags](SearchAPI.md#gettags)
- [getUsers](SearchAPI.md#getusers)

## Methods

### getShows

▸ **getShows**(`params?`): `Promise`\<\{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `dateUploaded`: [`SearchAPIRecencyParam`](../README.md#searchapirecencyparam) ; `limit`: `number` ; `pageToken`: `undefined` \| `string` ; `requireTimestamp`: `boolean`  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`SearchAPIGetShowsParams`](../interfaces/SearchAPIGetShowsParams.md) |

#### Returns

`Promise`\<\{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `dateUploaded`: [`SearchAPIRecencyParam`](../README.md#searchapirecencyparam) ; `limit`: `number` ; `pageToken`: `undefined` \| `string` ; `requireTimestamp`: `boolean`  } = sanitizedParams }\>

#### Defined in

[lib/api/SearchAPI.ts:66](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/SearchAPI.ts#L66)

___

### getTags

▸ **getTags**(`params?`): `Promise`\<\{ `items`: [`Tag`](../interfaces/Tag.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `pageToken`: `undefined` \| `string`  } = page }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`APIPaginationParams`](../interfaces/APIPaginationParams.md) |

#### Returns

`Promise`\<\{ `items`: [`Tag`](../interfaces/Tag.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `pageToken`: `undefined` \| `string`  } = page }\>

#### Defined in

[lib/api/SearchAPI.ts:53](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/SearchAPI.ts#L53)

___

### getUsers

▸ **getUsers**(`params?`): `Promise`\<\{ `items`: [`User`](../interfaces/User.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `dateJoined`: [`SearchAPIRecencyParam`](../README.md#searchapirecencyparam) ; `limit`: `number` ; `pageToken`: `undefined` \| `string` ; `userType`: `NonNullable`\<`undefined` \| ``"any"`` \| ``"uploader"`` \| ``"listener"``\>  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`SearchAPIGetUsersParams`](../interfaces/SearchAPIGetUsersParams.md) |

#### Returns

`Promise`\<\{ `items`: [`User`](../interfaces/User.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `dateJoined`: [`SearchAPIRecencyParam`](../README.md#searchapirecencyparam) ; `limit`: `number` ; `pageToken`: `undefined` \| `string` ; `userType`: `NonNullable`\<`undefined` \| ``"any"`` \| ``"uploader"`` \| ``"listener"``\>  } = sanitizedParams }\>

#### Defined in

[lib/api/SearchAPI.ts:87](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/api/SearchAPI.ts#L87)
