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
| color | `Color` or `string` |
| selectedColor | `Color` or `string` |


```
PagerIndicator add page control for Pager or other Paging Views.
```


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