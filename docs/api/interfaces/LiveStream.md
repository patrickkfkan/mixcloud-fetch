[mixcloud-fetch](../README.md) / LiveStream

# Interface: LiveStream

## Table of contents

### Properties

- [currentSpectators](LiveStream.md#currentspectators)
- [description](LiveStream.md#description)
- [id](LiveStream.md#id)
- [images](LiveStream.md#images)
- [isUnlisted](LiveStream.md#isunlisted)
- [name](LiveStream.md#name)
- [owner](LiveStream.md#owner)
- [plays](LiveStream.md#plays)
- [scheduledEnd](LiveStream.md#scheduledend)
- [scheduledStart](LiveStream.md#scheduledstart)
- [secondaryTags](LiveStream.md#secondarytags)
- [startedAt](LiveStream.md#startedat)
- [status](LiveStream.md#status)
- [streams](LiveStream.md#streams)
- [type](LiveStream.md#type)

## Properties

### currentSpectators

• `Optional` **currentSpectators**: `number`

#### Defined in

[lib/entities/LiveStream.ts:12](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L12)

___

### description

• `Optional` **description**: `string`

#### Defined in

[lib/entities/LiveStream.ts:8](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L8)

___

### id

• **id**: `string`

#### Defined in

[lib/entities/LiveStream.ts:6](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L6)

___

### images

• `Optional` **images**: [`ImageVariants`](ImageVariants.md)

#### Defined in

[lib/entities/LiveStream.ts:18](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L18)

___

### isUnlisted

• `Optional` **isUnlisted**: `boolean`

#### Defined in

[lib/entities/LiveStream.ts:13](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L13)

___

### name

• **name**: `string`

#### Defined in

[lib/entities/LiveStream.ts:7](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L7)

___

### owner

• `Optional` **owner**: [`User`](User.md)

#### Defined in

[lib/entities/LiveStream.ts:10](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L10)

___

### plays

• `Optional` **plays**: `number`

#### Defined in

[lib/entities/LiveStream.ts:11](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L11)

___

### scheduledEnd

• `Optional` **scheduledEnd**: ``null`` \| `string`

#### Defined in

[lib/entities/LiveStream.ts:17](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L17)

___

### scheduledStart

• `Optional` **scheduledStart**: ``null`` \| `string`

#### Defined in

[lib/entities/LiveStream.ts:16](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L16)

___

### secondaryTags

• `Optional` **secondaryTags**: [`LiveStreamSecondaryTag`](LiveStreamSecondaryTag.md)[]

#### Defined in

[lib/entities/LiveStream.ts:14](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L14)

___

### startedAt

• `Optional` **startedAt**: `string`

#### Defined in

[lib/entities/LiveStream.ts:15](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L15)

___

### status

• **status**: `string`

#### Defined in

[lib/entities/LiveStream.ts:9](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L9)

___

### streams

• `Optional` **streams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hls?` | `string` |

#### Defined in

[lib/entities/LiveStream.ts:19](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L19)

___

### type

• **type**: ``"liveStream"``

#### Defined in

[lib/entities/LiveStream.ts:5](https://github.com/patrickkfkan/mixcloud-fetch/blob/a2692f0/src/lib/entities/LiveStream.ts#L5)
