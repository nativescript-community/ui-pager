import PagerElement from '@nativescript-community/ui-pager/svelte';

import StaticPager from './StaticPager.svelte';
import BasicPager from './BasicPager.svelte';
import Indicator from './Indicator.svelte';

export function installPlugin() {
    PagerElement.register();
}

export const demos = [
    { name: 'Static Pager', path: 'static', component: StaticPager },
    { name: 'Basic Pager', path: 'basic', component: BasicPager },
    { name: 'Indicator', path: 'indicator', component: Indicator }
];
