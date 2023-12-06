import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptModule } from '@nativescript/angular';

import { PagerModule } from '@nativescript-community/ui-pager/angular';
import { PagerIndicator } from "@nativescript-community/ui-pager-indicator";
registerElement("PagerIndicator", () => PagerIndicator)

import { StaticPagerComponent } from './static-pager/static-pager.component';
import { BasicPagerComponent } from './basic-pager/basic-pager.component';
import { IndicatorComponent } from './indicator/indicator.component';

export const COMPONENTS = [StaticPagerComponent, BasicPagerComponent, IndicatorComponent];
@NgModule({
    imports: [NativeScriptModule, PagerModule],
    declarations: [...COMPONENTS],
    exports: [PagerModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

export function installPlugin() {}

export const demos = [
    { name: 'Static Pager', path: 'static-pager', component: StaticPagerComponent },
    { name: 'Basic Pager', path: 'basic-pager', component: BasicPagerComponent },
    { name: 'Indicator', path: 'indicator', component: IndicatorComponent },
    { name: 'Carousel', path: 'carousel', component: CarouselComponent },
];
