<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->This monorepo contains multiple packages:<br><br><details>
<summary><b>ui-pager</b></summary>
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


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/ui-pager`


[](#api)


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
</details><details>
<summary><b>ui-pager-indicator</b></summary>
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
<h1 align="center">@nativescript-community/ui-pager-indicator</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/ui-pager-indicator?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/ui-pager-indicator.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/ui-pager-indicator"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/ui-pager-indicator.svg" height="20"/></a>
	</p>

<p align="center">
  <b>A NativeScript Indicator for Pager / Carousel /CollectionView</b></br>
  <sub><sub>
</p>

<br />


| <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-ios.gif" height="500" /> | <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |


[](#table-of-contents)


[](#table-of-contents)

## Table of Contents

* [Installation](#installation)
* [API](#api)
	* [Properties](#properties)
* [Usage in Angular](#usage-in-angular)
	* [Examples](#examples)
* [Usage in Vue](#usage-in-vue)
	* [Examples](#examples-1)


[](#installation)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/ui-pager-indicator`


[](#api)


[](#api)

## API

### Properties

| Property | Type |
| - | - |
| color | `Color` or `string` |
| selectedColor | `Color` or `string` |


```
PagerIndicator add page control for Pager or other Paging Views.
```


[](#usage-in-angular)


[](#usage-in-angular)

## Usage in Angular


If you are planning to use an indicator, add the following to your module:

```typescript
import { registerElement } from "@nativescript/angular";
import { PagerIndicator } from "@nativescript-community/ui-pager-indicator";
registerElement("PagerIndicator", () => PagerIndicator)
```

Then in your template:
```html
<Pager id="pager" [items]="items"
    ...
</Pager>
<PagerIndicator pagerViewId="pager" />
```

### Examples
- [Indicator Pager](demo-snippets/ng/indicator)
  - A simple pager example using dynamic content and indicator.


[](#usage-in-vue)


[](#usage-in-vue)

## Usage in Vue

Import the module into your project.


```typescript
import Vue from 'nativescript-vue';
Vue.registerElement('PagerIndicator', () => require('@nativescript-community/ui-pager-indicator').PagerIndicator);
```

then in your template:
```html
<Pager id="pager" :items="items"
    ...
</Pager>
<PagerIndicator pagerViewId="pager"/>
```

### Examples

- [Indicator Pager](demo-snippets/vue/Indicator.vue)
  - A simple pager example using dynamic content and indicator.
</details>

[](#demos-and-development)

## Demos and Development


### Repo Setup

The repo uses submodules. If you did not clone with ` --recursive` then you need to call
```
git submodule update --init
```

The package manager used to install and link dependencies must be `pnpm` or `yarn`. `npm` wont work.

To develop and test:
if you use `yarn` then run `yarn`
if you use `pnpm` then run `pnpm i`

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build.all
```
WARNING: it seems `yarn build.all` wont always work (not finding binaries in `node_modules/.bin`) which is why the doc explicitly uses `npm run`

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

Demo setup is a bit special in the sense that if you want to modify/add demos you dont work directly in `demo-[ng|react|svelte|vue]`
Instead you work in `demo-snippets/[ng|react|svelte|vue]`
You can start from the `install.ts` of each flavor to see how to register new demos 


[](#contributing)

## Contributing

### Update repo 

You can update the repo files quite easily

First update the submodules

```bash
npm run update
```

Then commit the changes
Then update common files

```bash
npm run sync
```
Then you can run `yarn|pnpm`, commit changed files if any

### Update readme 
```bash
npm run readme
```

### Update doc 
```bash
npm run doc
```

### Publish

The publishing is completely handled by `lerna` (you can add `-- --bump major` to force a major release)
Simply run 
```shell
npm run publish
```

### modifying submodules

The repo uses https:// for submodules which means you won't be able to push directly into the submodules.
One easy solution is t modify `~/.gitconfig` and add
```
[url "ssh://git@github.com/"]
	pushInsteadOf = https://github.com/
```

[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).