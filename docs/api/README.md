mixcloud-fetch

# mixcloud-fetch

## Table of contents

### Classes

- [CloudcastAPI](classes/CloudcastAPI.md)
- [LiveStreamAPI](classes/LiveStreamAPI.md)
- [MiscAPI](classes/MiscAPI.md)
- [MixcloudFetch](classes/MixcloudFetch.md)
- [PlaylistAPI](classes/PlaylistAPI.md)
- [SearchAPI](classes/SearchAPI.md)
- [TagAPI](classes/TagAPI.md)
- [UserAPI](classes/UserAPI.md)

### Interfaces

- [APIPaginationParams](interfaces/APIPaginationParams.md)
- [Category](interfaces/Category.md)
- [Cloudcast](interfaces/Cloudcast.md)
- [Country](interfaces/Country.md)
- [CountryBundle](interfaces/CountryBundle.md)
- [ICache](interfaces/ICache.md)
- [ILimiter](interfaces/ILimiter.md)
- [ImageVariants](interfaces/ImageVariants.md)
- [ItemList](interfaces/ItemList.md)
- [LiveStream](interfaces/LiveStream.md)
- [LiveStreamAPIGetCurrentParams](interfaces/LiveStreamAPIGetCurrentParams.md)
- [LiveStreamSecondaryTag](interfaces/LiveStreamSecondaryTag.md)
- [Playlist](interfaces/Playlist.md)
- [SearchAPIGetShowsParams](interfaces/SearchAPIGetShowsParams.md)
- [SearchAPIGetUsersParams](interfaces/SearchAPIGetUsersParams.md)
- [Tag](interfaces/Tag.md)
- [TagAPIGetFeaturedParams](interfaces/TagAPIGetFeaturedParams.md)
- [TagAPIGetShowsParams](interfaces/TagAPIGetShowsParams.md)
- [User](interfaces/User.md)
- [UserAPIGetShowsParams](interfaces/UserAPIGetShowsParams.md)

### Type Aliases

- [CategoryBundle](README.md#categorybundle)
- [CategoryBundleName](README.md#categorybundlename)
- [ItemListItem](README.md#itemlistitem)
- [PlaylistAPIGetShowsParams](README.md#playlistapigetshowsparams)
- [SearchAPIGetTagsParams](README.md#searchapigettagsparams)
- [SearchAPIRecencyParam](README.md#searchapirecencyparam)
- [UserAPIGetLiveStreamParams](README.md#userapigetlivestreamparams)

### Variables

- [API\_PARAMS\_DEFAULT\_LIMIT](README.md#api_params_default_limit)
- [API\_PARAMS\_GLOBAL\_COUNTRY](README.md#api_params_global_country)
- [API\_PARAMS\_MAX\_LIMIT](README.md#api_params_max_limit)
- [default](README.md#default)

## Type Aliases

### CategoryBundle

Ƭ **CategoryBundle**: `Record`\<[`CategoryBundleName`](README.md#categorybundlename), [`Category`](interfaces/Category.md)[]\>

#### Defined in

[lib/entities/Misc.ts:8](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/entities/Misc.ts#L8)

___

### CategoryBundleName

Ƭ **CategoryBundleName**: `string`

#### Defined in

[lib/entities/Misc.ts:7](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/entities/Misc.ts#L7)

___

### ItemListItem

Ƭ **ItemListItem**: [`Cloudcast`](interfaces/Cloudcast.md) \| [`User`](interfaces/User.md) \| [`Tag`](interfaces/Tag.md) \| [`Playlist`](interfaces/Playlist.md) \| [`LiveStream`](interfaces/LiveStream.md)

#### Defined in

[lib/entities/ItemList.ts:7](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/entities/ItemList.ts#L7)

___

### PlaylistAPIGetShowsParams

Ƭ **PlaylistAPIGetShowsParams**: [`APIPaginationParams`](interfaces/APIPaginationParams.md)

#### Defined in

[lib/api/PlaylistAPI.ts:5](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/PlaylistAPI.ts#L5)

___

### SearchAPIGetTagsParams

Ƭ **SearchAPIGetTagsParams**: [`APIPaginationParams`](interfaces/APIPaginationParams.md)

#### Defined in

[lib/api/SearchAPI.ts:9](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/SearchAPI.ts#L9)

___

### SearchAPIRecencyParam

Ƭ **SearchAPIRecencyParam**: ``"pastWeek"`` \| ``"pastMonth"`` \| ``"pastYear"`` \| ``"anyTime"``

#### Defined in

[lib/api/SearchAPI.ts:26](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/SearchAPI.ts#L26)

___

### UserAPIGetLiveStreamParams

Ƭ **UserAPIGetLiveStreamParams**: ``null``

#### Defined in

[lib/api/UserAPI.ts:19](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/UserAPI.ts#L19)

## Variables

### API\_PARAMS\_DEFAULT\_LIMIT

• `Const` **API\_PARAMS\_DEFAULT\_LIMIT**: `number` = `GRAPHQL_QUERY_VARIABLES.DEFAULT_COUNT`

#### Defined in

[lib/api/BaseAPI.ts:11](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/BaseAPI.ts#L11)

___

### API\_PARAMS\_GLOBAL\_COUNTRY

• `Const` **API\_PARAMS\_GLOBAL\_COUNTRY**: `string` = `GRAPHQL_QUERY_VARIABLES.GLOBAL_COUNTRY`

#### Defined in

[lib/api/BaseAPI.ts:12](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/BaseAPI.ts#L12)

___

### API\_PARAMS\_MAX\_LIMIT

• `Const` **API\_PARAMS\_MAX\_LIMIT**: `number` = `GRAPHQL_QUERY_VARIABLES.MAX_COUNT`

#### Defined in

[lib/api/BaseAPI.ts:10](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/lib/api/BaseAPI.ts#L10)

___

### default

• **default**: [`MixcloudFetch`](classes/MixcloudFetch.md)

#### Defined in

[index.ts:31](https://github.com/patrickkfkan/mixcloud-fetch/blob/0699b4e/src/index.ts#L31)
