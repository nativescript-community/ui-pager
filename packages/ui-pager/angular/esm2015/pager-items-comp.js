import { Component, ContentChild, Directive, EventEmitter, Host, Inject, InjectionToken, Input, Output, TemplateRef, ViewChild, ViewContainerRef, ɵisListLikeIterable as isListLikeIterable } from '@angular/core';
import { Pager, PagerError, PagerItem, PagerLog } from '@nativescript-community/ui-pager';
import { getSingleViewRecursive, isInvisibleNode, registerElement } from '@nativescript/angular';
import { isIOS, LayoutBase, Trace } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { profile } from '@nativescript/core/profiling';
import * as i0 from "@angular/core";
const _c0 = ["loader"];
registerElement('Pager', () => Pager);
registerElement('PagerItem', () => PagerItem);
const NG_VIEW = '_ngViewRef';
export class ItemContext {
    constructor($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
}
export class TemplatedItemsComponent {
    constructor(_elementRef, _iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.setupItemView = new EventEmitter();
        this.templatedItemsView = _elementRef.nativeElement;
        this.templatedItemsView.on('itemLoading', this.onItemLoading, this);
        this.templatedItemsView.on('itemDisposing', this.onItemDisposing, this);
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
        let needDiffer = true;
        if (value instanceof ObservableArray) {
            needDiffer = false;
        }
        if (needDiffer && !this._differ && isListLikeIterable(value)) {
            this._differ = this._iterableDiffers
                .find(this._items)
                .create((_index, item) => item);
        }
        this.templatedItemsView.items = this._items;
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        this._selectedIndex = value;
        this.templatedItemsView.selectedIndex = this._selectedIndex;
    }
    ngAfterViewInit() {
        if (!!(this._selectedIndex)) {
            setTimeout(() => {
                if (isIOS) {
                    this.templatedItemsView.scrollToIndexAnimated(this._selectedIndex, false);
                }
                this.templatedItemsView.selectedIndex = this._selectedIndex;
            });
        }
    }
    ngAfterContentInit() {
        if (Trace.isEnabled()) {
            PagerLog('TemplatedItemsView.ngAfterContentInit()');
        }
        this.setItemTemplates();
    }
    ngOnDestroy() {
        this.templatedItemsView.off('itemLoading', this.onItemLoading, this);
        this.templatedItemsView.off('itemDisposing', this.onItemDisposing, this);
    }
    setItemTemplates() {
        if (!this.items)
            return;
        this.itemTemplate = this.itemTemplateQuery;
        if (this._templateMap) {
            if (Trace.isEnabled()) {
                PagerLog('Setting templates');
            }
            const templates = [];
            this._templateMap.forEach((value) => {
                templates.push(value);
            });
            this.templatedItemsView.itemTemplates = templates;
        }
    }
    registerTemplate(key, template) {
        if (Trace.isEnabled()) {
            PagerLog(`registerTemplate for key: ${key}`);
        }
        if (!this._templateMap) {
            this._templateMap = new Map();
        }
        const keyedTemplate = {
            key,
            createView: this.getItemTemplateViewFactory(template),
        };
        this._templateMap.set(key, keyedTemplate);
    }
    onItemLoading(args) {
        if (!args.view && !this.itemTemplate) {
            return;
        }
        if (!this.items)
            return;
        const index = args.index;
        const items = args.object.items;
        const currentItem = typeof items.getItem === 'function'
            ? items.getItem(index)
            : items[index];
        let viewRef;
        if (args.view) {
            if (Trace.isEnabled()) {
                PagerLog(`onItemLoading: ${index} - Reusing existing view`);
            }
            viewRef = args.view[NG_VIEW];
            if (!viewRef &&
                args.view instanceof LayoutBase &&
                args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
            if (!viewRef && Trace.isEnabled()) {
                PagerError(`ViewReference not found for item ${index}. View recycling is not working`);
            }
        }
        if (!viewRef) {
            if (Trace.isEnabled()) {
                PagerLog(`onItemLoading: ${index} - Creating view from template`);
            }
            viewRef = this.loader.createEmbeddedView(this.itemTemplate, new ItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    }
    onItemDisposing(args) {
        if (!args.view) {
            return;
        }
        let viewRef;
        if (args.view) {
            if (Trace.isEnabled()) {
                PagerLog(`onItemDisposing: ${args.index} - Removing angular view`);
            }
            viewRef = args.view[NG_VIEW];
            if (!viewRef &&
                args.view instanceof LayoutBase &&
                args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
            if (!viewRef && Trace.isEnabled()) {
                PagerError(`ViewReference not found for item ${args.index}. View disposing is not working`);
            }
        }
        if (viewRef) {
            if (Trace.isEnabled()) {
                PagerLog(`onItemDisposing: ${args.index} - Disposing view reference`);
            }
            viewRef.destroy();
        }
    }
    setupViewRef(viewRef, data, index) {
        const context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = index % 2 === 0;
        context.odd = !context.even;
        this.setupItemView.next({
            view: viewRef,
            data,
            index,
            context,
        });
    }
    getItemTemplateViewFactory(template) {
        return () => {
            const viewRef = this.loader.createEmbeddedView(template, new ItemContext(), 0);
            const resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            return resultView;
        };
    }
    detectChangesOnChild(viewRef, index) {
        if (Trace.isEnabled()) {
            PagerLog(`Manually detect changes in child: ${index}`);
        }
        viewRef.markForCheck();
        viewRef.detectChanges();
    }
    ngDoCheck() {
        if (this._differ) {
            if (Trace.isEnabled()) {
                PagerLog('ngDoCheck() - execute differ');
            }
            const changes = this._differ.diff(this._items);
            if (changes) {
                if (Trace.isEnabled()) {
                    PagerLog('ngDoCheck() - refresh');
                }
                this.templatedItemsView.refresh();
            }
        }
    }
}
TemplatedItemsComponent.ɵfac = function TemplatedItemsComponent_Factory(t) { return new (t || TemplatedItemsComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.IterableDiffers)); };
TemplatedItemsComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TemplatedItemsComponent, selectors: [["ng-component"]], contentQueries: function TemplatedItemsComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.itemTemplateQuery = _t.first);
    } }, viewQuery: function TemplatedItemsComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.loader = _t.first);
    } }, inputs: { items: "items", selectedIndex: "selectedIndex" }, outputs: { setupItemView: "setupItemView" }, decls: 0, vars: 0, template: function TemplatedItemsComponent_Template(rf, ctx) { }, encapsulation: 2 });
__decorate([
    profile
], TemplatedItemsComponent.prototype, "onItemLoading", null);
__decorate([
    profile
], TemplatedItemsComponent.prototype, "onItemDisposing", null);
__decorate([
    profile
], TemplatedItemsComponent.prototype, "detectChangesOnChild", null);
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TemplatedItemsComponent, [{
        type: Component,
        args: [{
                template: '',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.IterableDiffers }]; }, { loader: [{
            type: ViewChild,
            args: ['loader', { read: ViewContainerRef, static: false }]
        }], setupItemView: [{
            type: Output
        }], itemTemplateQuery: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }], items: [{
            type: Input
        }], selectedIndex: [{
            type: Input
        }], onItemLoading: [], onItemDisposing: [], detectChangesOnChild: [] }); })();
export function getItemViewRoot(viewRef, rootLocator = getSingleViewRecursive) {
    return rootLocator(viewRef.rootNodes, 0);
}
export const TEMPLATED_ITEMS_COMPONENT = new InjectionToken('TemplatedItemsComponent');
export class PagerItemDirective {
    constructor(templateRef, owner, viewContainer) {
        this.templateRef = templateRef;
        this.owner = owner;
        this.viewContainer = viewContainer;
    }
    ensureItem() {
        if (!this.item) {
            this.item = new PagerItem();
        }
    }
    applyConfig() {
        this.ensureItem();
    }
    ngOnInit() {
        this.applyConfig();
        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        const realViews = viewRef.rootNodes.filter((node) => !isInvisibleNode(node));
        if (realViews.length > 0) {
            const view = realViews[0];
            this.item.addChild(view);
            this.owner.nativeElement._addChildFromBuilder('PagerItem', this.item);
        }
    }
}
PagerItemDirective.ɵfac = function PagerItemDirective_Factory(t) { return new (t || PagerItemDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(TEMPLATED_ITEMS_COMPONENT, 1), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
PagerItemDirective.ɵdir = i0.ɵɵdefineDirective({ type: PagerItemDirective, selectors: [["", "pagerItem", ""]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PagerItemDirective, [{
        type: Directive,
        args: [{
                selector: '[pagerItem]',
            }]
    }], function () { return [{ type: i0.TemplateRef }, { type: TemplatedItemsComponent, decorators: [{
                type: Inject,
                args: [TEMPLATED_ITEMS_COMPONENT]
            }, {
                type: Host
            }] }, { type: i0.ViewContainerRef }]; }, null); })();
export class TemplateKeyDirective {
    constructor(templateRef, comp) {
        this.templateRef = templateRef;
        this.comp = comp;
    }
    set pagerTemplateKey(value) {
        if (this.comp && this.templateRef) {
            this.comp.registerTemplate(value, this.templateRef);
        }
    }
}
TemplateKeyDirective.ɵfac = function TemplateKeyDirective_Factory(t) { return new (t || TemplateKeyDirective)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(TEMPLATED_ITEMS_COMPONENT, 1)); };
TemplateKeyDirective.ɵdir = i0.ɵɵdefineDirective({ type: TemplateKeyDirective, selectors: [["", "pagerTemplateKey", ""]], inputs: { pagerTemplateKey: "pagerTemplateKey" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TemplateKeyDirective, [{
        type: Directive,
        args: [{ selector: '[pagerTemplateKey]' }]
    }], function () { return [{ type: i0.TemplateRef }, { type: TemplatedItemsComponent, decorators: [{
                type: Inject,
                args: [TEMPLATED_ITEMS_COMPONENT]
            }, {
                type: Host
            }] }]; }, { pagerTemplateKey: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXItaXRlbXMtY29tcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS1wYWdlci9hbmd1bGFyL3BhZ2VyLWl0ZW1zLWNvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUlULFlBQVksRUFDWixJQUFJLEVBQ0osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBS0wsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLG1CQUFtQixJQUFJLGtCQUFrQixFQUM1QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNYLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNILHNCQUFzQixFQUN0QixlQUFlLEVBQ2YsZUFBZSxFQUNsQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBYSxLQUFLLEVBQWlCLFVBQVUsRUFBWSxLQUFLLEVBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDM0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7QUFJdkQsZUFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxlQUFlLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQztBQXVCN0IsTUFBTSxPQUFPLFdBQVc7SUFDcEIsWUFDVyxTQUFlLEVBQ2YsSUFBVSxFQUNWLEtBQWMsRUFDZCxJQUFjLEVBQ2QsR0FBYTtRQUpiLGNBQVMsR0FBVCxTQUFTLENBQU07UUFDZixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxH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Qiw2REFLZix5QkFBeUI7dURBTDVCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBSDlCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTthQUMxQjtnRUFRc0IsdUJBQXVCO3NCQUZyQyxNQUFNO3VCQUFDLHlCQUF5Qjs7c0JBQ2hDLElBQUk7O0FBb0NiLE1BQU0sT0FBTyxvQkFBb0I7SUFDN0IsWUFDWSxXQUE2QixFQUc3QixJQUE2QjtRQUg3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFHN0IsU0FBSSxHQUFKLElBQUksQ0FBeUI7SUFDdEMsQ0FBQztJQUVKLElBQ0ksZ0JBQWdCLENBQUMsS0FBVTtRQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDOzt3RkFiUSxvQkFBb0IsNkRBR2pCLHlCQUF5Qjt5REFINUIsb0JBQW9CO3VGQUFwQixvQkFBb0I7Y0FEaEMsU0FBUztlQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFO2dFQU12Qix1QkFBdUI7c0JBRnBDLE1BQU07dUJBQUMseUJBQXlCOztzQkFDaEMsSUFBSTt3QkFLTCxnQkFBZ0I7a0JBRG5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdCxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5wdXQsXG4gICAgSXRlcmFibGVEaWZmZXIsXG4gICAgSXRlcmFibGVEaWZmZXJzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIMm1aXNMaXN0TGlrZUl0ZXJhYmxlIGFzIGlzTGlzdExpa2VJdGVyYWJsZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgUGFnZXIsXG4gICAgUGFnZXJFcnJvcixcbiAgICBQYWdlckl0ZW0sXG4gICAgUGFnZXJMb2dcbn0gZnJvbSAnQG5hdGl2ZXNjcmlwdC1jb21tdW5pdHkvdWktcGFnZXInO1xuaW1wb3J0IHtcbiAgICBnZXRTaW5nbGVWaWV3UmVjdXJzaXZlLFxuICAgIGlzSW52aXNpYmxlTm9kZSxcbiAgICByZWdpc3RlckVsZW1lbnRcbn0gZnJvbSAnQG5hdGl2ZXNjcmlwdC9hbmd1bGFyJztcbmltcG9ydCB7IEV2ZW50RGF0YSwgaXNJT1MsIEtleWVkVGVtcGxhdGUsIExheW91dEJhc2UsIFRlbXBsYXRlLCBUcmFjZSwgVmlldyB9IGZyb20gJ0BuYXRpdmVzY3JpcHQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tICdAbmF0aXZlc2NyaXB0L2NvcmUvZGF0YS9vYnNlcnZhYmxlLWFycmF5JztcbmltcG9ydCB7IHByb2ZpbGUgfSBmcm9tICdAbmF0aXZlc2NyaXB0L2NvcmUvcHJvZmlsaW5nJztcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEsIEl0ZW1zU291cmNlIH0gZnJvbSAnQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL2xpc3Qtdmlldyc7XG5cblxucmVnaXN0ZXJFbGVtZW50KCdQYWdlcicsICgpID0+IFBhZ2VyKTtcbnJlZ2lzdGVyRWxlbWVudCgnUGFnZXJJdGVtJywgKCkgPT4gUGFnZXJJdGVtKTtcblxuY29uc3QgTkdfVklFVyA9ICdfbmdWaWV3UmVmJztcblxuZXhwb3J0IGludGVyZmFjZSBQYWdlclRlbXBsYXRlZEl0ZW1zVmlldyB7XG4gICAgaXRlbXM6IGFueVtdIHwgSXRlbXNTb3VyY2U7XG4gICAgaXRlbVRlbXBsYXRlOiBzdHJpbmcgfCBUZW1wbGF0ZTtcbiAgICBpdGVtVGVtcGxhdGVzPzogc3RyaW5nIHwgS2V5ZWRUZW1wbGF0ZVtdO1xuXG4gICAgcmVmcmVzaCgpOiB2b2lkO1xuXG4gICAgb24oXG4gICAgICAgIGV2ZW50OiAnaXRlbURpc3Bvc2luZycgfCAnaXRlbUxvYWRpbmcnLFxuICAgICAgICBjYWxsYmFjazogKGFyZ3M6IEl0ZW1FdmVudERhdGEpID0+IHZvaWQsXG4gICAgICAgIHRoaXNBcmc/OiBhbnlcbiAgICApO1xuXG4gICAgb2ZmKFxuICAgICAgICBldmVudDogJ2l0ZW1Mb2FkaW5nJyB8ICdpdGVtRGlzcG9zaW5nJyxcbiAgICAgICAgY2FsbGJhY2s6IChhcmdzOiBFdmVudERhdGEpID0+IHZvaWQsXG4gICAgICAgIHRoaXNBcmc/OiBhbnlcbiAgICApO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBJdGVtQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyAkaW1wbGljaXQ/OiBhbnksXG4gICAgICAgIHB1YmxpYyBpdGVtPzogYW55LFxuICAgICAgICBwdWJsaWMgaW5kZXg/OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBldmVuPzogYm9vbGVhbixcbiAgICAgICAgcHVibGljIG9kZD86IGJvb2xlYW5cbiAgICApIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0dXBJdGVtVmlld0FyZ3Mge1xuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgIGRhdGE6IGFueTtcbiAgICBpbmRleDogbnVtYmVyO1xuICAgIGNvbnRleHQ6IEl0ZW1Db250ZXh0O1xufVxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUZW1wbGF0ZWRJdGVtc0NvbXBvbmVudFxuaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXQgbmF0aXZlRWxlbWVudCgpOiBQYWdlcjtcblxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZWRJdGVtc1ZpZXc6IFBhZ2VyO1xuICAgIHByb3RlY3RlZCBfaXRlbXM6IGFueTtcbiAgICBwcm90ZWN0ZWQgX2RpZmZlcjogSXRlcmFibGVEaWZmZXI8S2V5ZWRUZW1wbGF0ZT47XG4gICAgcHJvdGVjdGVkIF90ZW1wbGF0ZU1hcDogTWFwPHN0cmluZywgS2V5ZWRUZW1wbGF0ZT47XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIEBWaWV3Q2hpbGQoJ2xvYWRlcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZSB9KVxuICAgIGxvYWRlcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBzZXR1cEl0ZW1WaWV3ID0gbmV3IEV2ZW50RW1pdHRlcjxTZXR1cEl0ZW1WaWV3QXJncz4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIGl0ZW1UZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxJdGVtQ29udGV4dD47XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPEl0ZW1Db250ZXh0PjtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuXG4gICAgc2V0IGl0ZW1zKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSB2YWx1ZTtcbiAgICAgICAgbGV0IG5lZWREaWZmZXIgPSB0cnVlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlQXJyYXkpIHtcbiAgICAgICAgICAgIG5lZWREaWZmZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmVlZERpZmZlciAmJiAhdGhpcy5fZGlmZmVyICYmIGlzTGlzdExpa2VJdGVyYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVyc1xuICAgICAgICAgICAgICAgIC5maW5kKHRoaXMuX2l0ZW1zKVxuICAgICAgICAgICAgICAgIC5jcmVhdGUoKF9pbmRleCwgaXRlbSkgPT4gaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRlbXBsYXRlZEl0ZW1zVmlldy5pdGVtcyA9IHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkSW5kZXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRlbXBsYXRlZEl0ZW1zVmlldy5zZWxlY3RlZEluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghISh0aGlzLl9zZWxlY3RlZEluZGV4KSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzSU9TKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVkSXRlbXNWaWV3LnNjcm9sbFRvSW5kZXhBbmltYXRlZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlZEl0ZW1zVmlldy5zZWxlY3RlZEluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVyc1xuICAgICkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlZEl0ZW1zVmlldyA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy50ZW1wbGF0ZWRJdGVtc1ZpZXcub24oJ2l0ZW1Mb2FkaW5nJywgdGhpcy5vbkl0ZW1Mb2FkaW5nLCB0aGlzKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZWRJdGVtc1ZpZXcub24oJ2l0ZW1EaXNwb3NpbmcnLCB0aGlzLm9uSXRlbURpc3Bvc2luZywgdGhpcyk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAoVHJhY2UuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIFBhZ2VyTG9nKCdUZW1wbGF0ZWRJdGVtc1ZpZXcubmdBZnRlckNvbnRlbnRJbml0KCknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEl0ZW1UZW1wbGF0ZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZWRJdGVtc1ZpZXcub2ZmKCdpdGVtTG9hZGluZycsIHRoaXMub25JdGVtTG9hZGluZywgdGhpcyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGVkSXRlbXNWaWV3Lm9mZihcbiAgICAgICAgICAgICdpdGVtRGlzcG9zaW5nJyxcbiAgICAgICAgICAgIHRoaXMub25JdGVtRGlzcG9zaW5nLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXRlbVRlbXBsYXRlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSByZXR1cm47XG4gICAgICAgIC8vIFRoZSBpdGVtVGVtcGxhdGVRdWVyeSBtYXkgYmUgY2hhbmdlZCBhZnRlciBsaXN0IGl0ZW1zIGFyZSBhZGRlZCB0aGF0IGNvbnRhaW4gPHRlbXBsYXRlPiBpbnNpZGUsXG4gICAgICAgIC8vIHNvIGNhY2hlIGFuZCB1c2Ugb25seSB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdG8gYXZvaWQgZXJyb3JzLlxuICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IHRoaXMuaXRlbVRlbXBsYXRlUXVlcnk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RlbXBsYXRlTWFwKSB7XG4gICAgICAgICAgICBpZiAoVHJhY2UuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICBQYWdlckxvZygnU2V0dGluZyB0ZW1wbGF0ZXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVzOiBLZXllZFRlbXBsYXRlW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlTWFwLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlZEl0ZW1zVmlldy5pdGVtVGVtcGxhdGVzID0gdGVtcGxhdGVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyVGVtcGxhdGUoa2V5OiBzdHJpbmcsIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJdGVtQ29udGV4dD4pIHtcbiAgICAgICAgaWYgKFRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBQYWdlckxvZyhgcmVnaXN0ZXJUZW1wbGF0ZSBmb3Iga2V5OiAke2tleX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fdGVtcGxhdGVNYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3RlbXBsYXRlTWFwID0gbmV3IE1hcDxzdHJpbmcsIEtleWVkVGVtcGxhdGU+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXllZFRlbXBsYXRlID0ge1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgY3JlYXRlVmlldzogdGhpcy5nZXRJdGVtVGVtcGxhdGVWaWV3RmFjdG9yeSh0ZW1wbGF0ZSksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fdGVtcGxhdGVNYXAuc2V0KGtleSwga2V5ZWRUZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQHByb2ZpbGVcbiAgICBwdWJsaWMgb25JdGVtTG9hZGluZyhhcmdzOiBJdGVtRXZlbnREYXRhKSB7XG4gICAgICAgIGlmICghYXJncy52aWV3ICYmICF0aGlzLml0ZW1UZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBhcmdzLmluZGV4O1xuICAgICAgICBjb25zdCBpdGVtcyA9ICg8YW55PmFyZ3Mub2JqZWN0KS5pdGVtcztcbiAgICAgICAgY29uc3QgY3VycmVudEl0ZW0gPVxuICAgICAgICAgICAgdHlwZW9mIGl0ZW1zLmdldEl0ZW0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/IGl0ZW1zLmdldEl0ZW0oaW5kZXgpXG4gICAgICAgICAgICAgICAgOiBpdGVtc1tpbmRleF07XG4gICAgICAgIGxldCB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8SXRlbUNvbnRleHQ+O1xuXG4gICAgICAgIGlmIChhcmdzLnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChUcmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIFBhZ2VyTG9nKGBvbkl0ZW1Mb2FkaW5nOiAke2luZGV4fSAtIFJldXNpbmcgZXhpc3Rpbmcgdmlld2ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aWV3UmVmID0gYXJncy52aWV3W05HX1ZJRVddO1xuICAgICAgICAgICAgLy8gR2V0dGluZyBhbmd1bGFyIHZpZXcgZnJvbSBvcmlnaW5hbCBlbGVtZW50IChpbiBjYXNlcyB3aGVuIFByb3h5Vmlld0NvbnRhaW5lclxuICAgICAgICAgICAgLy8gaXMgdXNlZCBOYXRpdmVTY3JpcHQgaW50ZXJuYWxseSB3cmFwcyBpdCBpbiBhIFN0YWNrTGF5b3V0KVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICF2aWV3UmVmICYmXG4gICAgICAgICAgICAgICAgYXJncy52aWV3IGluc3RhbmNlb2YgTGF5b3V0QmFzZSAmJlxuICAgICAgICAgICAgICAgIGFyZ3Mudmlldy5nZXRDaGlsZHJlbkNvdW50KCkgPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB2aWV3UmVmID0gYXJncy52aWV3LmdldENoaWxkQXQoMClbTkdfVklFV107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmlld1JlZiAmJiBUcmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIFBhZ2VyRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIGBWaWV3UmVmZXJlbmNlIG5vdCBmb3VuZCBmb3IgaXRlbSAke2luZGV4fS4gVmlldyByZWN5Y2xpbmcgaXMgbm90IHdvcmtpbmdgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmlld1JlZikge1xuICAgICAgICAgICAgaWYgKFRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgUGFnZXJMb2coXG4gICAgICAgICAgICAgICAgICAgIGBvbkl0ZW1Mb2FkaW5nOiAke2luZGV4fSAtIENyZWF0aW5nIHZpZXcgZnJvbSB0ZW1wbGF0ZWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2aWV3UmVmID0gdGhpcy5sb2FkZXIuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIG5ldyBJdGVtQ29udGV4dCgpLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhcmdzLnZpZXcgPSBnZXRJdGVtVmlld1Jvb3Qodmlld1JlZik7XG4gICAgICAgICAgICBhcmdzLnZpZXdbTkdfVklFV10gPSB2aWV3UmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXR1cFZpZXdSZWYodmlld1JlZiwgY3VycmVudEl0ZW0sIGluZGV4KTtcblxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXNPbkNoaWxkKHZpZXdSZWYsIGluZGV4KTtcbiAgICB9XG5cbiAgICBAcHJvZmlsZVxuICAgIHB1YmxpYyBvbkl0ZW1EaXNwb3NpbmcoYXJnczogSXRlbUV2ZW50RGF0YSkge1xuICAgICAgICBpZiAoIWFyZ3Mudmlldykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8SXRlbUNvbnRleHQ+O1xuXG4gICAgICAgIGlmIChhcmdzLnZpZXcpIHtcbiAgICAgICAgICAgIGlmIChUcmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIFBhZ2VyTG9nKFxuICAgICAgICAgICAgICAgICAgICBgb25JdGVtRGlzcG9zaW5nOiAke2FyZ3MuaW5kZXh9IC0gUmVtb3ZpbmcgYW5ndWxhciB2aWV3YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpZXdSZWYgPSBhcmdzLnZpZXdbTkdfVklFV107XG4gICAgICAgICAgICAvLyBHZXR0aW5nIGFuZ3VsYXIgdmlldyBmcm9tIG9yaWdpbmFsIGVsZW1lbnQgKGluIGNhc2VzIHdoZW4gUHJveHlWaWV3Q29udGFpbmVyXG4gICAgICAgICAgICAvLyBpcyB1c2VkIE5hdGl2ZVNjcmlwdCBpbnRlcm5hbGx5IHdyYXBzIGl0IGluIGEgU3RhY2tMYXlvdXQpXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIXZpZXdSZWYgJiZcbiAgICAgICAgICAgICAgICBhcmdzLnZpZXcgaW5zdGFuY2VvZiBMYXlvdXRCYXNlICYmXG4gICAgICAgICAgICAgICAgYXJncy52aWV3LmdldENoaWxkcmVuQ291bnQoKSA+IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHZpZXdSZWYgPSBhcmdzLnZpZXcuZ2V0Q2hpbGRBdCgwKVtOR19WSUVXXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF2aWV3UmVmICYmIFRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgUGFnZXJFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgYFZpZXdSZWZlcmVuY2Ugbm90IGZvdW5kIGZvciBpdGVtICR7YXJncy5pbmRleH0uIFZpZXcgZGlzcG9zaW5nIGlzIG5vdCB3b3JraW5nYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlld1JlZikge1xuICAgICAgICAgICAgaWYgKFRyYWNlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgUGFnZXJMb2coXG4gICAgICAgICAgICAgICAgICAgIGBvbkl0ZW1EaXNwb3Npbmc6ICR7YXJncy5pbmRleH0gLSBEaXNwb3NpbmcgdmlldyByZWZlcmVuY2VgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmlld1JlZi5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0dXBWaWV3UmVmKFxuICAgICAgICB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8SXRlbUNvbnRleHQ+LFxuICAgICAgICBkYXRhOiBhbnksXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHZpZXdSZWYuY29udGV4dDtcbiAgICAgICAgY29udGV4dC4kaW1wbGljaXQgPSBkYXRhO1xuICAgICAgICBjb250ZXh0Lml0ZW0gPSBkYXRhO1xuICAgICAgICBjb250ZXh0LmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGNvbnRleHQuZXZlbiA9IGluZGV4ICUgMiA9PT0gMDtcbiAgICAgICAgY29udGV4dC5vZGQgPSAhY29udGV4dC5ldmVuO1xuXG4gICAgICAgIHRoaXMuc2V0dXBJdGVtVmlldy5uZXh0KHtcbiAgICAgICAgICAgIHZpZXc6IHZpZXdSZWYsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0SXRlbVRlbXBsYXRlVmlld0ZhY3RvcnkoXG4gICAgICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxJdGVtQ29udGV4dD5cbiAgICApOiAoKSA9PiBWaWV3IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLmxvYWRlci5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgbmV3IEl0ZW1Db250ZXh0KCksXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdFZpZXcgPSBnZXRJdGVtVmlld1Jvb3Qodmlld1JlZik7XG4gICAgICAgICAgICByZXN1bHRWaWV3W05HX1ZJRVddID0gdmlld1JlZjtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFZpZXc7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQHByb2ZpbGVcbiAgICBwcml2YXRlIGRldGVjdENoYW5nZXNPbkNoaWxkKFxuICAgICAgICB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8SXRlbUNvbnRleHQ+LFxuICAgICAgICBpbmRleDogbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmIChUcmFjZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgUGFnZXJMb2coYE1hbnVhbGx5IGRldGVjdCBjaGFuZ2VzIGluIGNoaWxkOiAke2luZGV4fWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdmlld1JlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyKSB7XG4gICAgICAgICAgICBpZiAoVHJhY2UuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICBQYWdlckxvZygnbmdEb0NoZWNrKCkgLSBleGVjdXRlIGRpZmZlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5faXRlbXMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoVHJhY2UuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgUGFnZXJMb2coJ25nRG9DaGVjaygpIC0gcmVmcmVzaCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVkSXRlbXNWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRWaWV3IHtcbiAgICByb290Tm9kZXM6IGFueVtdO1xuXG4gICAgZGVzdHJveSgpOiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBSb290TG9jYXRvciA9IChub2RlczogYW55W10sIG5lc3RMZXZlbDogbnVtYmVyKSA9PiBWaWV3O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbVZpZXdSb290KFxuICAgIHZpZXdSZWY6IENvbXBvbmVudFZpZXcsXG4gICAgcm9vdExvY2F0b3I6IFJvb3RMb2NhdG9yID0gZ2V0U2luZ2xlVmlld1JlY3Vyc2l2ZSBhcyBhbnlcbik6IFZpZXcge1xuICAgIHJldHVybiByb290TG9jYXRvcih2aWV3UmVmLnJvb3ROb2RlcywgMCk7XG59XG5cbmV4cG9ydCBjb25zdCBURU1QTEFURURfSVRFTVNfQ09NUE9ORU5UID0gbmV3IEluamVjdGlvblRva2VuPFxuVGVtcGxhdGVkSXRlbXNDb21wb25lbnRcbj4oJ1RlbXBsYXRlZEl0ZW1zQ29tcG9uZW50Jyk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BhZ2VySXRlbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlckl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgaXRlbTogUGFnZXJJdGVtO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIEBJbmplY3QoVEVNUExBVEVEX0lURU1TX0NPTVBPTkVOVClcbiAgICAgICAgQEhvc3QoKVxuICAgICAgICBwcml2YXRlIG93bmVyOiBUZW1wbGF0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICAgKSB7fVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVJdGVtKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtID0gbmV3IFBhZ2VySXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVJdGVtKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDb25maWcoKTtcblxuICAgICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzIGFuZCBjb21tZW50c1xuICAgICAgICBjb25zdCByZWFsVmlld3MgPSB2aWV3UmVmLnJvb3ROb2Rlcy5maWx0ZXIoXG4gICAgICAgICAgICAobm9kZSkgPT4gIWlzSW52aXNpYmxlTm9kZShub2RlKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChyZWFsVmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHJlYWxWaWV3c1swXTtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5hZGRDaGlsZCh2aWV3KTtcbiAgICAgICAgICAgIHRoaXMub3duZXIubmF0aXZlRWxlbWVudC5fYWRkQ2hpbGRGcm9tQnVpbGRlcihcbiAgICAgICAgICAgICAgICAnUGFnZXJJdGVtJyxcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYWdlclRlbXBsYXRlS2V5XScgfSlcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUtleURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIEBJbmplY3QoVEVNUExBVEVEX0lURU1TX0NPTVBPTkVOVClcbiAgICAgICAgQEhvc3QoKVxuICAgICAgICBwcml2YXRlIGNvbXA6IFRlbXBsYXRlZEl0ZW1zQ29tcG9uZW50XG4gICAgKSB7fVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcGFnZXJUZW1wbGF0ZUtleSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXAgJiYgdGhpcy50ZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgdGhpcy5jb21wLnJlZ2lzdGVyVGVtcGxhdGUodmFsdWUsIHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19