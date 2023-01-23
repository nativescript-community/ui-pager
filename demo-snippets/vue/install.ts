import Vue from 'nativescript-vue';
import Pager from '@nativescript-community/ui-pager/vue';

import StaticPager from './StaticPager.vue';
import BasicPager from './BasicPager.vue';
import Indicator from './Indicator.vue';
import RenderIssue from './RenderIssue.vue';

export function installPlugin() {
    Vue.use(Pager);
    Vue.registerElement('PagerIndicator', () => require('@nativescript-community/ui-pager-indicator').PagerIndicator);
}

export const demos = [
    { name: 'Static Pager', path: 'static', component: StaticPager },
    { name: 'Basic Pager', path: 'basic', component: BasicPager },
    { name: 'Indicator', path: 'indicator', component: Indicator },
    { name: 'Render Issue', path: 'indicator', component: RenderIssue }
];
