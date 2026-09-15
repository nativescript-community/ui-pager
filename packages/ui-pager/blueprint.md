{{ load:../../tools/readme/edit-warning.md }}
{{ template:title }}
{{ template:badges }}
{{ template:description }}

| <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-ios.gif" height="500" /> | <img src="https://github.com/nativescript-community/ui-pager/raw/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |

{{ template:toc }}

## Installation
Run the following command from the root of your project:

`ns plugin add {{ pkg.name }}`

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

## Usage in React

Import the module into your project.

```typescript
import { Pager } from '@nativescript-community/ui-pager/react';
```

### Examples

- [Basic Pager](demo-snippets/react/BasicPager.tsx)
  - A simple pager example using dynamic content.
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


## Usage in Vue 3

Register the plugin in your `app.ts`.

```typescript
import Pager from '@nativescript-community/ui-pager/vue3';

const app = createApp(YourComponent);
app.use(Pager);
app.start();
```

Pages come either from static `PagerItem` children or from `items` rendered through slot templates:

```html
<Pager peaking="30">
    <PagerItem backgroundColor="#e67e22"><Label text="First" /></PagerItem>
    <PagerItem backgroundColor="#3498db"><Label text="Second" /></PagerItem>
</Pager>

<Pager v-model:selectedIndex="selectedIndex" :items="items" :itemTemplateSelector="selector">
    <template #default="{ item, index }">
        <Label :text="item.title" />
    </template>
    <template #cover="{ item }">
        <Image :src="item.image" />
    </template>
</Pager>
```

Each named slot becomes a template; `itemTemplateSelector(item, index, items)` picks the slot name. The slot scope exposes the item as `item` (rename it with `alias`), plus `index`, `$index` (rename it with `indexAlias`), `even` and `odd`.

### Examples

- [Static Pager](demo-snippets/vue3/StaticPager.vue)
  - A simple pager example using static content.
- [Basic Pager](demo-snippets/vue3/BasicPager.vue)
  - A simple pager example using dynamic content.

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