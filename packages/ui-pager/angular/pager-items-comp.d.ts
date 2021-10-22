import { AfterContentInit, DoCheck, ElementRef, EmbeddedViewRef, EventEmitter, InjectionToken, IterableDiffer, IterableDiffers, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Pager } from '@nativescript-community/ui-pager';
import { EventData, KeyedTemplate, Template, View } from '@nativescript/core';
import { ItemEventData, ItemsSource } from '@nativescript/core/ui/list-view';
import * as i0 from "@angular/core";
export interface PagerTemplatedItemsView {
    items: any[] | ItemsSource;
    itemTemplate: string | Template;
    itemTemplates?: string | KeyedTemplate[];
    refresh(): void;
    on(event: 'itemDisposing' | 'itemLoading', callback: (args: ItemEventData) => void, thisArg?: any): any;
    off(event: 'itemLoading' | 'itemDisposing', callback: (args: EventData) => void, thisArg?: any): any;
}
export declare class ItemContext {
    $implicit?: any;
    item?: any;
    index?: number;
    even?: boolean;
    odd?: boolean;
    constructor($implicit?: any, item?: any, index?: number, even?: boolean, odd?: boolean);
}
export interface SetupItemViewArgs {
    view: EmbeddedViewRef<any>;
    data: any;
    index: number;
    context: ItemContext;
}
export declare abstract class TemplatedItemsComponent implements DoCheck, OnDestroy, AfterContentInit {
    private _iterableDiffers;
    abstract get nativeElement(): Pager;
    protected templatedItemsView: Pager;
    protected _items: any;
    protected _differ: IterableDiffer<KeyedTemplate>;
    protected _templateMap: Map<string, KeyedTemplate>;
    private _selectedIndex;
    loader: ViewContainerRef;
    setupItemView: EventEmitter<SetupItemViewArgs>;
    itemTemplateQuery: TemplateRef<ItemContext>;
    itemTemplate: TemplateRef<ItemContext>;
    get items(): any;
    set items(value: any);
    get selectedIndex(): number;
    set selectedIndex(value: number);
    ngAfterViewInit(): void;
    constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private setItemTemplates;
    registerTemplate(key: string, template: TemplateRef<ItemContext>): void;
    onItemLoading(args: ItemEventData): void;
    onItemDisposing(args: ItemEventData): void;
    setupViewRef(viewRef: EmbeddedViewRef<ItemContext>, data: any, index: number): void;
    protected getItemTemplateViewFactory(template: TemplateRef<ItemContext>): () => View;
    private detectChangesOnChild;
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TemplatedItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TemplatedItemsComponent, "ng-component", never, { "items": "items"; "selectedIndex": "selectedIndex"; }, { "setupItemView": "setupItemView"; }, ["itemTemplateQuery"], never>;
}
export interface ComponentView {
    rootNodes: any[];
    destroy(): void;
}
export declare type RootLocator = (nodes: any[], nestLevel: number) => View;
export declare function getItemViewRoot(viewRef: ComponentView, rootLocator?: RootLocator): View;
export declare const TEMPLATED_ITEMS_COMPONENT: InjectionToken<TemplatedItemsComponent>;
export declare class PagerItemDirective implements OnInit {
    private templateRef;
    private owner;
    private viewContainer;
    private item;
    constructor(templateRef: TemplateRef<any>, owner: TemplatedItemsComponent, viewContainer: ViewContainerRef);
    private ensureItem;
    private applyConfig;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerItemDirective, [null, { host: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PagerItemDirective, "[pagerItem]", never, {}, {}, never>;
}
export declare class TemplateKeyDirective {
    private templateRef;
    private comp;
    constructor(templateRef: TemplateRef<any>, comp: TemplatedItemsComponent);
    set pagerTemplateKey(value: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<TemplateKeyDirective, [null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TemplateKeyDirective, "[pagerTemplateKey]", never, { "pagerTemplateKey": "pagerTemplateKey"; }, {}, never>;
}
