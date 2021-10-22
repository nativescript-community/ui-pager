import { AddChildFromBuilder, CoercibleProperty, Color, ContainerView, GridLayout, ItemsSource, KeyedTemplate, Property, Template, View, ViewBase, CoreTypes } from '@nativescript/core';
export declare type Orientation = 'horizontal' | 'vertical';
export declare const ITEMLOADING = "itemLoading";
export declare const ITEMDISPOSING = "itemDisposing";
export declare const LOADMOREITEMS = "loadMoreItems";
export declare namespace knownTemplates {
    const itemTemplate = "itemTemplate";
}
export declare namespace knownMultiTemplates {
    const itemTemplates = "itemTemplates";
}
export declare namespace knownCollections {
    const items = "items";
}
export declare const pagerTraceCategory = "ns-pager";
export declare function PagerLog(message: string): void;
export declare function PagerError(message: string): void;
export { ItemsSource };
export interface ItemEventData {
    eventName: string;
    object: any;
    index: number;
    view: View;
    android: any;
    ios: any;
}
export declare enum Transformer {
    SCALE = "scale"
}
export declare enum Indicator {
    Disabled = "disable",
    None = "none",
    Worm = "worm",
    Fill = "fill",
    Swap = "swap",
    THIN_WORM = "thin_worm",
    Flat = "flat"
}
export declare abstract class PagerBase extends ContainerView implements AddChildFromBuilder {
    items: any[] | ItemsSource;
    selectedIndex: number;
    itemTemplate: string | Template;
    itemTemplates: string | KeyedTemplate[];
    canGoRight: boolean;
    canGoLeft: boolean;
    spacing: CoreTypes.PercentLengthType;
    peaking: CoreTypes.PercentLengthType;
    perPage: number;
    indicator: Indicator;
    circularMode: boolean;
    autoPlayDelay: number;
    autoPlay: boolean;
    static selectedIndexChangedEvent: string;
    static selectedIndexChangeEvent: string;
    static scrollEvent: string;
    static swipeEvent: string;
    static swipeStartEvent: string;
    static swipeOverEvent: string;
    static swipeEndEvent: string;
    static loadMoreItemsEvent: string;
    static itemLoadingEvent: string;
    orientation: Orientation;
    _effectiveItemHeight: number;
    _effectiveItemWidth: number;
    transformers: string;
    loadMoreCount: number;
    _childrenViews: {
        view: PagerItem;
        type: number;
    }[];
    readonly _childrenCount: number;
    disableSwipe: boolean;
    showIndicator: boolean;
    indicatorColor: Color | string;
    indicatorSelectedColor: Color | string;
    static knownFunctions: string[];
    abstract refresh(): void;
    getChildView(index: number): View;
    _removeView(view: ViewBase): void;
    protected _removeChildView(index: number): void;
    protected _addChildView(view: any, type: any): void;
    _addChildFromBuilder(name: string, value: any): void;
    private _itemTemplateSelector;
    private _itemTemplateSelectorBindable;
    _defaultTemplate: KeyedTemplate;
    _itemTemplatesInternal: KeyedTemplate[];
    private _itemIdGenerator;
    get itemIdGenerator(): (item: any, index: number, items: any) => number;
    set itemIdGenerator(generatorFn: (item: any, index: number, items: any) => number);
    get itemTemplateSelector(): string | ((item: any, index: number, items: any) => string);
    set itemTemplateSelector(value: string | ((item: any, index: number, items: any) => string));
    onItemViewLoaderChanged(): void;
    _itemViewLoader: Function;
    get itemViewLoader(): Function;
    set itemViewLoader(value: Function);
    _getItemTemplateKey(index: number): string;
    _getItemTemplate(index: number): KeyedTemplate;
    _prepareItem(item: View, index: number): void;
    _getDataItem(index: number): any;
    _getDefaultItemContent(index: number): View;
    abstract get disableAnimation(): boolean;
    abstract set disableAnimation(value: boolean);
    abstract itemTemplateUpdated(oldData: any, newData: any): void;
    onLayout(left: number, top: number, right: number, bottom: number): void;
    convertToSize(length: any): number;
    abstract _onItemsChanged(oldValue: any, newValue: any): void;
}
export declare class PagerItem extends GridLayout {
}
export declare const indicatorColorProperty: Property<PagerBase, string | Color>;
export declare const indicatorSelectedColorProperty: Property<PagerBase, string | Color>;
export declare const circularModeProperty: Property<PagerBase, boolean>;
export declare const indicatorProperty: Property<PagerBase, Indicator>;
export declare const selectedIndexProperty: CoercibleProperty<PagerBase, number>;
export declare const spacingProperty: Property<PagerBase, CoreTypes.LengthType>;
export declare const peakingProperty: Property<PagerBase, CoreTypes.LengthType>;
export declare const itemsProperty: Property<PagerBase, any>;
export declare const itemTemplateProperty: Property<PagerBase, string | Template>;
export declare const itemTemplatesProperty: Property<PagerBase, string | KeyedTemplate[]>;
export declare const canGoRightProperty: Property<PagerBase, boolean>;
export declare const canGoLeftProperty: Property<PagerBase, boolean>;
export declare const orientationProperty: Property<PagerBase, Orientation>;
export declare const disableSwipeProperty: Property<PagerBase, boolean>;
export declare const perPageProperty: Property<PagerBase, number>;
export declare const transformersProperty: Property<PagerBase, string>;
export declare const showIndicatorProperty: Property<PagerBase, boolean>;
export declare const autoPlayProperty: Property<PagerBase, boolean>;
export declare const autoplayDelayProperty: Property<PagerBase, number>;
