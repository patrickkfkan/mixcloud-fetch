[mixcloud-fetch](../README.md) / MixcloudFetch

# Class: MixcloudFetch

## Table of contents

### Constructors

- [constructor](MixcloudFetch.md#constructor)

### Accessors

- [cache](MixcloudFetch.md#cache)
- [limiter](MixcloudFetch.md#limiter)
- [liveStream](MixcloudFetch.md#livestream)
- [misc](MixcloudFetch.md#misc)

### Methods

- [cloudcast](MixcloudFetch.md#cloudcast)
- [playlist](MixcloudFetch.md#playlist)
- [search](MixcloudFetch.md#search)
- [tag](MixcloudFetch.md#tag)
- [user](MixcloudFetch.md#user)

## Constructors

### constructor

• **new MixcloudFetch**()

#### Defined in

[lib/MixcloudFetch.ts:24](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L24)

## Accessors

### cache

• `get` **cache**(): [`ICache`](../interfaces/ICache.md)

#### Returns

[`ICache`](../interfaces/ICache.md)

#### Defined in

[lib/MixcloudFetch.ts:63](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L63)

___

### limiter

• `get` **limiter**(): [`ILimiter`](../interfaces/ILimiter.md)

#### Returns

[`ILimiter`](../interfaces/ILimiter.md)

#### Defined in

[lib/MixcloudFetch.ts:67](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L67)

___

### liveStream

• `get` **liveStream**(): [`LiveStreamAPI`](LiveStreamAPI.md)

#### Returns

[`LiveStreamAPI`](LiveStreamAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:59](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L59)

___

### misc

• `get` **misc**(): [`MiscAPI`](MiscAPI.md)

#### Returns

[`MiscAPI`](MiscAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:55](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L55)

## Methods

### cloudcast

▸ **cloudcast**(`cloudcastID`): [`CloudcastAPI`](CloudcastAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cloudcastID` | `string` |

#### Returns

[`CloudcastAPI`](CloudcastAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:35](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L35)

___

### playlist

▸ **playlist**(`playlistID`): [`PlaylistAPI`](PlaylistAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlistID` | `string` |

#### Returns

[`PlaylistAPI`](PlaylistAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:39](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L39)

___

### search

▸ **search**(`keywords`): [`SearchAPI`](SearchAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keywords` | `string` |

#### Returns

[`SearchAPI`](SearchAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:43](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L43)

___

### tag

▸ **tag**(`slugs`): [`TagAPI`](TagAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `slugs` | `string` \| `string`[] |

#### Returns

[`TagAPI`](TagAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:47](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L47)

___

### user

▸ **user**(`username`): [`UserAPI`](UserAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |

#### Returns

[`UserAPI`](UserAPI.md)

#### Defined in

[lib/MixcloudFetch.ts:51](https://github.com/patrickkfkan/mixcloud-fetch/blob/f797afa/src/lib/MixcloudFetch.ts#L51)
