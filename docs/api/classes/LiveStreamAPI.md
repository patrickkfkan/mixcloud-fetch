[mixcloud-fetch](../README.md) / LiveStreamAPI

# Class: LiveStreamAPI

## Hierarchy

- `default`

  ↳ **`LiveStreamAPI`**

## Table of contents

### Methods

- [getCategories](LiveStreamAPI.md#getcategories)
- [getCurrent](LiveStreamAPI.md#getcurrent)

## Methods

### getCategories

▸ **getCategories**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[lib/api/LiveStreamAPI.ts:19](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/api/LiveStreamAPI.ts#L19)

___

### getCurrent

▸ **getCurrent**(`params?`): `Promise`\<\{ `items`: [`LiveStream`](../interfaces/LiveStream.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `category`: `string` ; `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"popular"`` \| ``"mostRecent"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`LiveStreamAPIGetCurrentParams`](../interfaces/LiveStreamAPIGetCurrentParams.md) |

#### Returns

`Promise`\<\{ `items`: [`LiveStream`](../interfaces/LiveStream.md)[] ; `nextPageToken?`: `string` ; `params`: \{ `category`: `string` ; `limit`: `number` ; `orderBy`: `NonNullable`\<`undefined` \| ``"popular"`` \| ``"mostRecent"``\> ; `pageToken`: `undefined` \| `string`  } = sanitizedParams }\>

#### Defined in

[lib/api/LiveStreamAPI.ts:24](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/api/LiveStreamAPI.ts#L24)
