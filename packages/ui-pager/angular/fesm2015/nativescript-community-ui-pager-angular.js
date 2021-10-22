import * as i0 from '@angular/core';
import { EventEmitter, ɵisListLikeIterable, TemplateRef, ViewContainerRef, Component, ViewChild, Output, ContentChild, Input, InjectionToken, Directive, Inject, Host, forwardRef, ChangeDetectionStrategy, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Pager, PagerItem, PagerLog, PagerError } from '@nativescript-community/ui-pager';
import { registerElement, getSingleViewRecursive, isInvisibleNode } from '@nativescript/angular';
import { isIOS, Trace, LayoutBase } from '@nativescript/core';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { profile } from '@nativescript/core/profiling';

const _c0 = ["loader"];
registerElement('Pager', () => Pager);
registerElement('PagerItem', () => PagerItem);
const NG_VIEW = '_ngViewRef';
class ItemContext {
    constructor($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
}
class TemplatedItemsComponent {
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
        if (needDiffer && !this._differ && ɵisListLikeIterable(value)) {
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
function getItemViewRoot(viewRef, rootLocator = getSingleViewRecursive) {
    return rootLocator(viewRef.rootNodes, 0);
}
const TEMPLATED_ITEMS_COMPONENT = new InjectionToken('TemplatedItemsComponent');
class PagerItemDirective {
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
class TemplateKeyDirective {
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

class PagerComponent extends TemplatedItemsComponent {
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
class PagerModule {
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

export { PagerComponent, PagerItemDirective, PagerModule, TemplateKeyDirective, TemplatedItemsComponent };
//# sourceMappingURL=nativescript-community-ui-pager-angular.js.map
