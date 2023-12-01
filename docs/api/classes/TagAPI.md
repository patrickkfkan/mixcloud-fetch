[mixcloud-fetch](../README.md) / TagAPI

# Class: TagAPI

## Hierarchy

- `default`

  ↳ **`TagAPI`**

## Table of contents

### Methods

- [getFeatured](TagAPI.md#getfeatured)
- [getInfo](TagAPI.md#getinfo)
- [getShows](TagAPI.md#getshows)

## Methods

### getFeatured

▸ **getFeatured**(`params?`): `Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"popular"`` \| ``"latest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams; `selectedTags`: [`Tag`](../interfaces/Tag.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`TagAPIGetFeaturedParams`](../interfaces/TagAPIGetFeaturedParams.md) |

#### Returns

`Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"popular"`` \| ``"latest"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams; `selectedTags`: [`Tag`](../interfaces/Tag.md)[]  }\>

#### Defined in

[lib/api/TagAPI.ts:83](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/TagAPI.ts#L83)

___

### getInfo

▸ **getInfo**(): `Promise`\<``null`` \| [`Tag`](../interfaces/Tag.md)[]\>

#### Returns

`Promise`\<``null`` \| [`Tag`](../interfaces/Tag.md)[]\>

#### Defined in

[lib/api/TagAPI.ts:49](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/TagAPI.ts#L49)

___

### getShows

▸ **getShows**(`params?`): `Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `country`: `any` ; `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"``\> = sanitizedOrderBy; `pageToken`: `undefined` \| `string`  } = sanitizedParams; `selectedTags`: [`Tag`](../interfaces/Tag.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`TagAPIGetShowsParams`](../interfaces/TagAPIGetShowsParams.md) |

#### Returns

`Promise`\<``null`` \| \{ `items`: [`Cloudcast`](../interfaces/Cloudcast.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `country`: `any` ; `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"trending"`` \| ``"popular"`` \| ``"latest"``\> = sanitizedOrderBy; `pageToken`: `undefined` \| `string`  } = sanitizedParams; `selectedTags`: [`Tag`](../interfaces/Tag.md)[]  }\>

#### Defined in

[lib/api/TagAPI.ts:56](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/TagAPI.ts#L56)
