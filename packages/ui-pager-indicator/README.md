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

## Table of Contents

* [Installation](#installation)
* [API](#api)
	* [Properties](#properties)
* [Usage in Angular](#usage-in-angular)
	* [Examples](#examples)
* [Usage in Vue](#usage-in-vue)
	* [Examples](#examples-1)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/ui-pager-indicator`


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