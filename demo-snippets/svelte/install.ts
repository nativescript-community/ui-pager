import PagerElement from '@nativescript-community/ui-pager/svelte';
import { PagerItem } from '@nativescript-community/ui-pager';
import { registerNativeViewElement } from 'svelte-native/dom';

import StaticPager from './StaticPager.svelte';
import BasicPager from './BasicPager.svelte';

export function installPlugin() {
    PagerElement.register();
    registerNativeViewElement('pageritem', () => PagerItem);
}

export const demos = [
    { name: 'Static Pager', path: "static", component: StaticPager },
    { name: 'Basic Pager', path: "basic", component: BasicPager }
];
