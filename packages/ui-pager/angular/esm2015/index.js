import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, NgModule, forwardRef } from '@angular/core';
import { PagerItemDirective, TEMPLATED_ITEMS_COMPONENT, TemplateKeyDirective, TemplatedItemsComponent } from './pager-items-comp';
import * as i0 from "@angular/core";
export { PagerItemDirective, TemplatedItemsComponent, TemplateKeyDirective } from './pager-items-comp';
export class PagerComponent extends TemplatedItemsComponent {
    constructor(_elementRef, _iterableDiffers) {
        super(_elementRef, _iterableDiffers);
    }
    get nativeElement() {
        return this.templatedItemsView;
    }
}
PagerComponent.ɵfac = function PagerComponent_Factory(t) { return new (t || PagerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.IterableDiffers)); };
PagerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PagerComponent, selectors: [["Pager"]], features: [i0.ɵɵProvidersFeature([
            {
                provide: TEMPLATED_ITEMS_COMPONENT,
                useExisting: forwardRef(() => PagerComponent)
            }
        ]), i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 0, consts: [["loader", ""]], template: function PagerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "DetachedContainer");
        i0.ɵɵelement(1, "Placeholder", null, 0);
        i0.ɵɵelementEnd();
    } }, encapsulation: 2, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PagerComponent, [{
        type: Component,
        args: [{
                selector: 'Pager',
                template: `
		<DetachedContainer>
			<Placeholder #loader></Placeholder>
		</DetachedContainer>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: TEMPLATED_ITEMS_COMPONENT,
                        useExisting: forwardRef(() => PagerComponent)
                    }
                ]
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }]; }, null); })();
export class PagerModule {
}
PagerModule.ɵfac = function PagerModule_Factory(t) { return new (t || PagerModule)(); };
PagerModule.ɵmod = i0.ɵɵdefineNgModule({ type: PagerModule });
PagerModule.ɵinj = i0.ɵɵdefineInjector({});
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PagerModule, [{
        type: NgModule,
        args: [{
                declarations: [PagerComponent, TemplateKeyDirective, PagerItemDirective],
                exports: [PagerComponent, TemplateKeyDirective, PagerItemDirective],
                schemas: [NO_ERRORS_SCHEMA]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PagerModule, { declarations: [PagerComponent, TemplateKeyDirective, PagerItemDirective], exports: [PagerComponent, TemplateKeyDirective, PagerItemDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWktcGFnZXIvYW5ndWxhci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFHVCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLHlCQUF5QixFQUN6QixvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQzFCLE1BQU0sb0JBQW9CLENBQUM7O0FBRTVCLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBaUJyRyxNQUFNLE9BQU8sY0FBZSxTQUFRLHVCQUF1QjtJQU92RCxZQUFZLFdBQXVCLEVBQUUsZ0JBQWlDO1FBQ2xFLEtBQUssQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBUkQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7OzRFQUhRLGNBQWM7bURBQWQsY0FBYywyREFSWjtZQUNQO2dCQUNJLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQ2hEO1NBQ0o7UUFUSCx5Q0FBbUI7UUFDbEIsdUNBQW1DO1FBQ3BDLGlCQUFvQjs7dUZBVVQsY0FBYztjQWYxQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRTs7O3VCQUdTO2dCQUNuQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQztxQkFDaEQ7aUJBQ0o7YUFDSjs7QUFtQkQsTUFBTSxPQUFPLFdBQVc7O3NFQUFYLFdBQVc7K0NBQVgsV0FBVzs7dUZBQVgsV0FBVztjQUx2QixRQUFRO2VBQUM7Z0JBQ04sWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDO2dCQUN4RSxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7Z0JBQ25FLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzlCOzt3RkFDWSxXQUFXLG1CQWpCWCxjQUFjLEVBYVEsb0JBQW9CLEVBQUUsa0JBQWtCLGFBYjlELGNBQWMsRUFjRyxvQkFBb0IsRUFBRSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEl0ZXJhYmxlRGlmZmVycyxcbiAgICBOT19FUlJPUlNfU0NIRU1BLFxuICAgIE5nTW9kdWxlLFxuICAgIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBhZ2VyIH0gZnJvbSAnQG5hdGl2ZXNjcmlwdC1jb21tdW5pdHkvdWktcGFnZXInO1xuaW1wb3J0IHtcbiAgICBQYWdlckl0ZW1EaXJlY3RpdmUsXG4gICAgVEVNUExBVEVEX0lURU1TX0NPTVBPTkVOVCxcbiAgICBUZW1wbGF0ZUtleURpcmVjdGl2ZSxcbiAgICBUZW1wbGF0ZWRJdGVtc0NvbXBvbmVudFxufSBmcm9tICcuL3BhZ2VyLWl0ZW1zLWNvbXAnO1xuXG5leHBvcnQge1BhZ2VySXRlbURpcmVjdGl2ZSwgVGVtcGxhdGVkSXRlbXNDb21wb25lbnQsIFRlbXBsYXRlS2V5RGlyZWN0aXZlfSBmcm9tICcuL3BhZ2VyLWl0ZW1zLWNvbXAnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1BhZ2VyJyxcbiAgICB0ZW1wbGF0ZTogYFxuXHRcdDxEZXRhY2hlZENvbnRhaW5lcj5cblx0XHRcdDxQbGFjZWhvbGRlciAjbG9hZGVyPjwvUGxhY2Vob2xkZXI+XG5cdFx0PC9EZXRhY2hlZENvbnRhaW5lcj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBURU1QTEFURURfSVRFTVNfQ09NUE9ORU5ULFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGFnZXJDb21wb25lbnQpXG4gICAgICAgIH1cbiAgICBdXG59KVxuXG5leHBvcnQgY2xhc3MgUGFnZXJDb21wb25lbnQgZXh0ZW5kcyBUZW1wbGF0ZWRJdGVtc0NvbXBvbmVudCB7XG4gICAgcHVibGljIGdldCBuYXRpdmVFbGVtZW50KCk6IFBhZ2VyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVkSXRlbXNWaWV3O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZWRJdGVtc1ZpZXc6IFBhZ2VyO1xuXG4gICAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgICAgICBzdXBlcihfZWxlbWVudFJlZiwgX2l0ZXJhYmxlRGlmZmVycyk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1BhZ2VyQ29tcG9uZW50LCBUZW1wbGF0ZUtleURpcmVjdGl2ZSwgUGFnZXJJdGVtRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbUGFnZXJDb21wb25lbnQsIFRlbXBsYXRlS2V5RGlyZWN0aXZlLCBQYWdlckl0ZW1EaXJlY3RpdmVdLFxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlck1vZHVsZSB7XG59XG4iXX0=