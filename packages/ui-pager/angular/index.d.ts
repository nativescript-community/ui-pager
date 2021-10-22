import { ElementRef, IterableDiffers } from '@angular/core';
import { Pager } from '@nativescript-community/ui-pager';
import { TemplatedItemsComponent } from './pager-items-comp';
import * as i0 from "@angular/core";
import * as i1 from "./pager-items-comp";
export { PagerItemDirective, TemplatedItemsComponent, TemplateKeyDirective } from './pager-items-comp';
export declare class PagerComponent extends TemplatedItemsComponent {
    get nativeElement(): Pager;
    protected templatedItemsView: Pager;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerComponent, "Pager", never, {}, {}, never, never>;
}
export declare class PagerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PagerModule, [typeof PagerComponent, typeof i1.TemplateKeyDirective, typeof i1.PagerItemDirective], never, [typeof PagerComponent, typeof i1.TemplateKeyDirective, typeof i1.PagerItemDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PagerModule>;
}
