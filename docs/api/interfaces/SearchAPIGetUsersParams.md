[mixcloud-fetch](../README.md) / SearchAPIGetUsersParams

# Interface: SearchAPIGetUsersParams

## Hierarchy

- [`APIPaginationParams`](APIPaginationParams.md)

  ↳ **`SearchAPIGetUsersParams`**

## Table of contents

### Properties

- [dateJoined](SearchAPIGetUsersParams.md#datejoined)
- [limit](SearchAPIGetUsersParams.md#limit)
- [pageToken](SearchAPIGetUsersParams.md#pagetoken)
- [userType](SearchAPIGetUsersParams.md#usertype)

## Properties

### dateJoined

• `Optional` **dateJoined**: [`SearchAPIRecencyParam`](../README.md#searchapirecencyparam)

#### Defined in

[lib/api/SearchAPI.ts:34](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/SearchAPI.ts#L34)

___

### limit

• `Optional` **limit**: `number`

#### Inherited from

[APIPaginationParams](APIPaginationParams.md).[limit](APIPaginationParams.md#limit)

#### Defined in

[lib/api/BaseAPI.ts:6](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/BaseAPI.ts#L6)

___

### pageToken

• `Optional` **pageToken**: ``null`` \| `string`

#### Inherited from

[APIPaginationParams](APIPaginationParams.md).[pageToken](APIPaginationParams.md#pagetoken)

#### Defined in

[lib/api/BaseAPI.ts:7](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/BaseAPI.ts#L7)

___

### userType

• `Optional` **userType**: ``"any"`` \| ``"uploader"`` \| ``"listener"``

#### Defined in

[lib/api/SearchAPI.ts:35](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/SearchAPI.ts#L35)
