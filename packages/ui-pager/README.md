<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
<!--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      DO NOT EDIT THIS READEME DIRECTLY! Edit "bluesprint.md" instead.
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<h1 align="center">@nativescript-community/ui-pager</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/ui-pager?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/ui-pager.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/ui-pager"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/ui-pager.svg" height="20"/></a>
	</p>

<p align="center">
  <b>A NativeScript Pager / Carousel component that allows the user to swipe left and right through pages of data. </b></br>
  <sub><sub>
</p>

<br />


| <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-ios.gif" height="500" /> | <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |


[](#table-of-contents)

## Table of Contents

* [Installation](#installation)
* [API](#api)
	* [Properties](#properties)
* [Usage in Angular](#usage-in-angular)
	* [Examples](#examples)
* [Usage in React](#usage-in-react)
	* [Examples](#examples-1)
* [Usage in Svelte](#usage-in-svelte)
	* [Examples](#examples-2)
* [Usage in Vue](#usage-in-vue)
	* [Examples](#examples-3)
* [Custom Transformer](#custom-transformer)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/ui-pager`


[](#api)

## API

### Properties

| Property | Type |
| - | - |
| items | `array` or `ItemsSource` 
| selectedIndex | `number` |
| canGoRight | `boolean` |
| canGoLeft | `boolean` |
| spacing | `PercentLengthType` |
| peaking | `PercentLengthType` |
| perPage | `number` |
| indicator | `string`  ('disable', 'none', 'worm', 'fill', 'swap', 'thin_worm', 'flat')|
| circularMode | `boolean` |
| autoPlayDelay | `number` |
| autoPlay | `boolean` |
| orientation | `string` ('horizontal' or 'vertical') |
| autoPlay | `boolean` |
| disableSwipe | `boolean` |
| showIndicator | `boolean` |
| transformers | `string` |


```
Pager for NativeScript supports the core ObservableArray module part of the core NativeScript modules collection. Using an ObservableArray instance as a source for Pager will ensure that changes in the source collection will be automatically taken care of by the control.
```



[](#usage-in-angular)

## Usage in Angular

Import the module into your project.

```typescript
import { PagerModule } from "@nativescript-community/ui-pager/angular";

@NgModule({
    imports: [
        PagerModule,
    ],
})
```

### Examples

- [Static Pager](demo-snippets/ng/static-pager)
  - A simple pager example using static content.
- [Basic Pager](demo-snippets/ng/basic-pager)
  - A simple pager example using dynamic content.


[](#usage-in-react)

## Usage in React

Import the module into your project.

```typescript
import { Pager } from '@nativescript-community/ui-pager/react';
```

### Examples

- [Basic Pager](demo-snippets/react/BasicPager.tsx)
  - A simple pager example using dynamic content.

[](#usage-in-svelte)

## Usage in Svelte

Import the module into your project.

```typescript
import { registerNativeViewElement } from 'svelte-native/dom';

import PagerElement from '@nativescript-community/ui-pager/svelte';
import { PagerItem } from '@nativescript-community/ui-pager';

PagerElement.register();
registerNativeViewElement('pageritem', () => PagerItem);
```

### Examples

- [Static Pager](demo-snippets/svelte/StaticPager.svelte)
  - A simple pager example using static content.
- [Basic Pager](demo-snippets/svelte/BasicPager.svelte)
  - A simple pager example using dynamic content.


[](#usage-in-vue)

## Usage in Vue

Import the module into your project.

```typescript
import Vue from 'nativescript-vue';
import Pager from '@nativescript-community/ui-pager/vue';

Vue.use(Pager);
```

### Examples

- [Static Pager](demo-snippets/vue/StaticPager.vue)
  - A simple pager example using static content.
- [Basic Pager](demo-snippets/vue/BasicPager.vue)
  - A simple pager example using dynamic content.



[](#custom-transformer)

## Custom Transformer

You can define custom transformer for iOS/Android

You can follow the `Scale` example for [iOS](src/ui-pager/transformers/Scale.ios.ts) and [Android](src/ui-pager/transformers/Scale.android.ts) to create your custom transformer.

Then you can register your transformer on app start with (this example registered the included but not registered Scale transformer): 
```ts
import { Pager } from '@nativescript-community/ui-pager';
import transformer from '@nativescript-community/ui-pager/transformers/Scale';

Pager.registerTransformer('scale', transformer)
```
Then you can use that transformer with the `transformers` property of `Pager`