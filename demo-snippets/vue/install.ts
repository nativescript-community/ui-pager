import Vue from 'nativescript-vue';
import Pager from '@nativescript-community/ui-pager/vue';

import StaticPager from './StaticPager.vue';
import BasicPager from './BasicPager.vue';

export function installPlugin() {
    Vue.use(Pager);
}

export const demos = [
    { name: 'Static Pager', path: "static", component: StaticPager },
    { name: 'Basic Pager', path: "basic", component: BasicPager }
];