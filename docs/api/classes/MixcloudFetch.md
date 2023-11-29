[mixcloud-fetch](../README.md) / MixcloudFetch

# Class: MixcloudFetch

## Table of contents

### Constructors

- [constructor](MixcloudFetch.md#constructor)

### Accessors

- [cache](MixcloudFetch.md#cache)
- [limiter](MixcloudFetch.md#limiter)

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

lib/MixcloudFetch.ts:17

## Accessors

### cache

• `get` **cache**(): [`ICache`](../interfaces/ICache.md)

#### Returns

[`ICache`](../interfaces/ICache.md)

#### Defined in

lib/MixcloudFetch.ts:46

___

### limiter

• `get` **limiter**(): [`ILimiter`](../interfaces/ILimiter.md)

#### Returns

[`ILimiter`](../interfaces/ILimiter.md)

#### Defined in

lib/MixcloudFetch.ts:50

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

lib/MixcloudFetch.ts:26

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

lib/MixcloudFetch.ts:30

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

lib/MixcloudFetch.ts:34

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

lib/MixcloudFetch.ts:38

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

lib/MixcloudFetch.ts:42
