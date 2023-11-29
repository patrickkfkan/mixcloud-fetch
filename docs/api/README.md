mixcloud-fetch

# mixcloud-fetch

## Table of contents

### Classes

- [CloudcastAPI](classes/CloudcastAPI.md)
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
- [PlaylistAPIGetShowsParams](README.md#playlistapigetshowsparams)
- [SearchAPIGetTagsParams](README.md#searchapigettagsparams)
- [SearchAPIRecencyParam](README.md#searchapirecencyparam)

### Variables

- [default](README.md#default)

## Type Aliases

### CategoryBundle

Ƭ **CategoryBundle**: `Record`\<[`CategoryBundleName`](README.md#categorybundlename), [`Category`](interfaces/Category.md)[]\>

#### Defined in

[lib/entities/Misc.ts:8](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/entities/Misc.ts#L8)

___

### CategoryBundleName

Ƭ **CategoryBundleName**: `string`

#### Defined in

[lib/entities/Misc.ts:7](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/entities/Misc.ts#L7)

___

### PlaylistAPIGetShowsParams

Ƭ **PlaylistAPIGetShowsParams**: [`APIPaginationParams`](interfaces/APIPaginationParams.md)

#### Defined in

[lib/api/PlaylistAPI.ts:5](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/PlaylistAPI.ts#L5)

___

### SearchAPIGetTagsParams

Ƭ **SearchAPIGetTagsParams**: [`APIPaginationParams`](interfaces/APIPaginationParams.md)

#### Defined in

[lib/api/SearchAPI.ts:9](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/SearchAPI.ts#L9)

___

### SearchAPIRecencyParam

Ƭ **SearchAPIRecencyParam**: ``"pastWeek"`` \| ``"pastMonth"`` \| ``"pastYear"`` \| ``"anyTime"``

#### Defined in

[lib/api/SearchAPI.ts:26](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/lib/api/SearchAPI.ts#L26)

## Variables

### default

• **default**: [`MixcloudFetch`](classes/MixcloudFetch.md)

#### Defined in

[index.ts:27](https://github.com/patrickkfkan/mixcloud-fetch/blob/1cf2daf/src/index.ts#L27)
