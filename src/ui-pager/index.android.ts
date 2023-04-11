import { ChangeType, Device, Property, StackLayout, Utils, View, ViewBase, profile } from '@nativescript/core';
import { KeyedTemplate } from '@nativescript/core/ui/core/view';
import { isString } from '@nativescript/core/utils/types';
import {
    ItemEventData,
    Orientation,
    PagerBase,
    autoPlayProperty,
    autoplayDelayProperty,
    disableSwipeProperty,
    itemTemplatesProperty,
    itemsProperty,
    orientationProperty,
    peakingProperty,
    selectedIndexProperty,
    spacingProperty
} from './index.common';

export * from './index.common';
export { ItemsSource, Transformer } from './index.common';

function notifyForItemAtIndex(owner, nativeView: any, view: any, eventName: string, index: number) {
    const args = {
        eventName,
        object: owner,
        index,
        view,
        ios: undefined,
        android: nativeView
    };
    owner.notify(args);
    return args;
}

const PLACEHOLDER = 'PLACEHOLDER';

export class Pager extends PagerBase {
    nativeViewProtected: androidx.viewpager2.widget.ViewPager2;
    _androidViewId: number;
    private _disableAnimation: boolean;
    public pagesCount: number;
    widthMeasureSpec: number;
    heightMeasureSpec: number;
    public perPage: number;

    public itemTemplateUpdated(oldData: any, newData: any): void {}

    private _oldDisableAnimation: boolean = false;
    private _pagerAdapter: PagerRecyclerAdapter;
    private _views: any[];
    private _pageListener: any;
    // used to store viewHolder and thus their corresponding Views
    // used to "destroy" cells when possible
    _viewHolders = new Set<PagerViewHolder>();
    public _childrenViewsType = new Map<number, View>();
    public _realizedTemplates = new Map<string, Map<android.view.View, View>>();
    lastEvent = 0;
    private _lastSpacing = 0;
    private _lastPeaking = 0;
    private compositeTransformer: androidx.viewpager2.widget.CompositePageTransformer;
    private marginTransformer: androidx.viewpager2.widget.MarginPageTransformer;
    private _transformers: androidx.viewpager2.widget.ViewPager2.PageTransformer[];

    constructor() {
        super();
        this._transformers = [];
    }

    get views() {
        return this._views;
    }

    set views(value: any[]) {
        this._views = value;
    }

    @profile()
    public createNativeView() {
        const nativeView = new androidx.viewpager2.widget.ViewPager2(this._context);
        const sdkVersion = parseInt(Device.sdkVersion, 10);
        if (sdkVersion >= 21) {
            nativeView.setNestedScrollingEnabled(true);
        }
        if (this.orientation === 'vertical') {
            nativeView.setOrientation(androidx.viewpager2.widget.ViewPager2.ORIENTATION_VERTICAL);
        } else {
            nativeView.setOrientation(androidx.viewpager2.widget.ViewPager2.ORIENTATION_HORIZONTAL);
        }

        initPagerRecyclerAdapter();
        this._pagerAdapter = new PagerRecyclerAdapter(new WeakRef(this));
        this.compositeTransformer = new androidx.viewpager2.widget.CompositePageTransformer();
        nativeView.setUserInputEnabled(!this.disableSwipe);
        this.on(View.layoutChangedEvent, this.onLayoutChange, this);
        return nativeView;
    }

    public initNativeView() {
        super.initNativeView();
        // Store disable animation value
        this._oldDisableAnimation = this.disableAnimation;
        // Disable animation to set currentItem w/o animation
        this.disableAnimation = true;
        initPagerChangeCallback();
        this._pageListener = new PageChangeCallback(new WeakRef(this));
        const nativeView = this.nativeViewProtected;
        nativeView.registerOnPageChangeCallback(this._pageListener);
        nativeView.setAdapter(this._pagerAdapter);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }

        if (this.pagesCount > 0) {
            nativeView.setOffscreenPageLimit(this.pagesCount);
        } else {
            nativeView.setOffscreenPageLimit(3);
        }

        this._setPeaking(this.peaking);
        this._setSpacing(this.spacing);
        this._setTransformers(this.transformers ? this.transformers : '');
    }

    setIndicator(indicator) {
        super.setIndicator(indicator);
        if (indicator) {
            this.indicator.setCount(this.items ? this.items.length : 0);
            this.indicator.setSelection(this.selectedIndex, false);
        }
    }

    private enumerateViewHolders<T = any>(cb: (v: PagerViewHolder) => T) {
        let result: T, v: PagerViewHolder;
        for (let it = this._viewHolders.values(), cellItemView: PagerViewHolder = null; (cellItemView = it.next().value); ) {
            if (cellItemView) {
                result = cb(cellItemView);
                if (result) {
                    return result;
                }
            }
        }
        return result;
    }

    getChildView(index: number): View {
        if (this._childrenViews) {
            return this._childrenViews[index].view;
        }
        return this.enumerateViewHolders<View>((v) => (v.getAdapterPosition() === index ? v.view : undefined));
    }

    protected _removeChildView(index: number) {
        const type = this._childrenViews[index].type;
        this._childrenViewsType.delete(type);
        super._removeChildView(index);
    }
    protected _addChildView(view, type) {
        super._addChildView(view, type);
        this._childrenViewsType.set(type, view);
        this.initStaticPagerAdapter();
    }
    onLayoutChange(args: any) {
        this._setSpacing(args.object.spacing);
        this._setPeaking(args.object.peaking);
        this._setTransformers(this.transformers ? this.transformers : '');
        this._updateScrollPosition();
        // Set disableAnimation to original value
        this.disableAnimation = this._oldDisableAnimation;
    }

    private _setSpacing(value: any) {
        const size = this.convertToSize(value);
        const newSpacing = size !== this._lastSpacing;
        if (newSpacing) {
            if (this.marginTransformer) {
                this.compositeTransformer.removeTransformer(this.marginTransformer);
            }

            this.marginTransformer = new androidx.viewpager2.widget.MarginPageTransformer(size);
            this.compositeTransformer.addTransformer(this.marginTransformer);
            this._lastSpacing = size;
        }
    }

    private _setPeaking(value: any) {
        const size = this.convertToSize(value);
        const newPeaking = size !== this._lastPeaking;
        if (newPeaking) {
            const nativeView = this.nativeViewProtected;
            nativeView.setClipToPadding(false);
            const left = this.orientation === 'horizontal' ? size : 0;
            const top = this.orientation === 'horizontal' ? 0 : size;
            nativeView.setPadding(left, top, left, top);
            nativeView.setClipChildren(false);
            this._lastPeaking = size;
        }
    }

    [spacingProperty.setNative](value: any) {
        this._setSpacing(value);
    }

    [peakingProperty.setNative](value: any) {
        this._setPeaking(value);
    }

    private _setTransformers(transformers: string) {
        if (!isString(transformers)) {
            return;
        }
        const transformsArray = transformers.split(' ');
        this._transformers.forEach((transformer) => {
            this.compositeTransformer.removeTransformer(transformer);
        });
        for (const transformer of transformsArray) {
            const nativeTransformerClass = Pager.mRegisteredTransformers[transformer];
            if (nativeTransformerClass) {
                const nativeTransformer = new nativeTransformerClass();
                nativeTransformer.owner = new WeakRef<Pager>(this);
                this._transformers.push(nativeTransformer);
                this.compositeTransformer.addTransformer(nativeTransformer);
            }
        }
        if (transformsArray.length === 0) {
            this._transformers.forEach((transformer) => {
                this.compositeTransformer.removeTransformer(transformer);
            });
        }

        this.nativeViewProtected.setPageTransformer(this.compositeTransformer);
    }

    protected _observableArrayHandler = (args) => {
        if (this.pagerAdapter) {
            switch (args.action) {
                case ChangeType.Add:
                    this.pagerAdapter.notifyItemRangeInserted(args.index, args.addedCount);
                    break;
                case ChangeType.Delete:
                    this.pagerAdapter.notifyItemRangeRemoved(args.index, args.removed.length);
                    break;
                case ChangeType.Splice:
                    if (args.removed.length > 0) {
                        this.pagerAdapter.notifyItemRangeRemoved(args.index, args.removed.length);
                    }
                    if (args.addedCount > 0) {
                        this.pagerAdapter.notifyItemRangeInserted(args.index, args.addedCount);
                    }
                    break;
                case ChangeType.Update:
                    this.pagerAdapter.notifyItemChanged(args.index);
                    break;
                default:
                    break;
            }
            this._initAutoPlay(this.autoPlay);
        }
        if (this.indicator && this.mObservableArrayInstance && this.mObservableArrayInstance.length) {
            this.indicator.setCount(this.mObservableArrayInstance.length);
            this.pagerAdapter.notifyDataSetChanged();
            this.scrollToIndexAnimated(0, false);
        }
    };
    disposeViewHolderViews() {
        this.enumerateViewHolders((v) => {
            const view = v.view;
            // if (view && view.isLoaded) {
            //     view.callUnloaded();
            // }
            this._removeViewCore(view);
            // view._isAddedToNativeVisualTree = false;
            // //@ts-ignore
            // view.parent = null;
            // view._tearDownUI();
        });
        this._viewHolders = new Set();
    }
    public disposeNativeView() {
        this.off(View.layoutChangedEvent, this.onLayoutChange, this);
        this._childrenViews = null;
        this.disposeViewHolderViews();
        this._realizedTemplates.clear();
        this._pageListener = null;
        // setAdapter(null) will destroy views
        this.nativeViewProtected.setAdapter(null);
        this._pagerAdapter = null;
        this._transformers = [];
        super.disposeNativeView();
    }

    get disableAnimation(): boolean {
        return this._disableAnimation;
    }

    set disableAnimation(value: boolean) {
        this._disableAnimation = value;
    }

    get pagerAdapter() {
        return this._pagerAdapter;
    }

    get _childrenCount(): number {
        return (this.items && this.items.length) || (this._childrenViews && this._childrenViews.length) || 0;
    }

    [disableSwipeProperty.setNative](value: boolean) {
        this.nativeViewProtected.setUserInputEnabled(!value);
    }

    [itemsProperty.getDefault](): any {
        return null;
    }

    [itemsProperty.setNative](value: any) {
        this.setObservableArrayInstance(value);
    }

    private _updateScrollPosition() {
        const index = this.circularMode ? this.selectedIndex + 1 : this.selectedIndex;
        const nativeView = this.nativeViewProtected;
        if (nativeView.getCurrentItem() !== index) {
            const indicator = this.indicator;
            const toDo = () => {
                nativeView.setCurrentItem(index, false);
                if (indicator) indicator.setSelection(this.selectedIndex, false);
            };
            if (indicator) {
                indicator.withoutAnimation(toDo);
            } else {
                toDo();
            }
        }
        setTimeout(() => {
            this._initAutoPlay(this.autoPlay);
        });
    }
    initStaticPagerAdapter() {
        if (!this.items && this._childrenCount > 0) {
            initStaticPagerStateAdapter();
            const nativeView = this.nativeViewProtected;
            if (nativeView && !(this._pagerAdapter instanceof StaticPagerStateAdapter)) {
                this._pagerAdapter = new StaticPagerStateAdapter(new WeakRef(this));
                nativeView.setAdapter(this._pagerAdapter);
                selectedIndexProperty.coerce(this);
                setTimeout(() => {
                    nativeView.setCurrentItem(this.selectedIndex, false);
                    if (this.indicator) {
                        this.indicator.setSelection(this.selectedIndex);
                    }
                }, 0);
            }
        }
    }
    onLoaded(): void {
        super.onLoaded();
        this.initStaticPagerAdapter();
    }

    [selectedIndexProperty.setNative](value: number) {
        const nativeView = this.nativeViewProtected;
        if (this.isLoaded && nativeView) {
            const index = this.circularMode ? value + 1 : value;
            nativeView.setCurrentItem(index, !this.disableAnimation);
        }
    }

    public scrollToIndexAnimated(index: number, animate: boolean) {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            nativeView.setCurrentItem(this.pagerAdapter.getIndex(index), animate);
            if (!animate) {
                // without animate we wont go through the delegate
                selectedIndexProperty.nativeValueChange(this, index);
                if (this.indicator) {
                    this.indicator.setSelection(index, false);
                }
            }
        }
    }

    _onItemsChanged(oldValue: any, newValue: any): void {}

    refresh() {
        const nativeView = this.nativeViewProtected;
        if (nativeView && this._pagerAdapter) {
            nativeView.requestLayout();
            nativeView.getAdapter().notifyDataSetChanged();
        }
    }

    updatePagesCount(value: number) {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            this._pagerAdapter.notifyDataSetChanged();
            nativeView.setOffscreenPageLimit(value);
        }
    }

    onUnloaded() {
        // this._android.setAdapter(null);
        super.onUnloaded();
    }
    eachChild(callback: (child: ViewBase) => boolean) {
        super.eachChild(callback);
        // used for css updates (like theme change)
        this.enumerateViewHolders((v) => {
            const view = v.view;
            if (view) {
                if (view.parent instanceof Pager) {
                    callback(view);
                } else {
                    // in some cases (like item is unloaded from another place (like angular) view.parent becomes undefined)
                    if (view.parent) {
                        callback(view.parent);
                    }
                }
            }
        });
    }

    updateAdapter() {
        this._pagerAdapter.notifyDataSetChanged();
    }

    _selectedIndexUpdatedFromNative(newIndex: number) {}

    [itemTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [itemTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._itemTemplatesInternal = new Array<KeyedTemplate>(this._defaultTemplate);
        if (value) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }

        this._pagerAdapter = new PagerRecyclerAdapter(new WeakRef(this));
        this.nativeViewProtected.setAdapter(this._pagerAdapter);
        this.refresh();
    }

    public [orientationProperty.setNative](value: Orientation) {
        if (value === 'vertical') {
            this.nativeViewProtected.setOrientation(androidx.viewpager2.widget.ViewPager2.ORIENTATION_VERTICAL);
        } else {
            this.nativeViewProtected.setOrientation(androidx.viewpager2.widget.ViewPager2.ORIENTATION_HORIZONTAL);
        }
    }

    _horizontalOffset: number = 0;
    get horizontalOffset(): number {
        return this._horizontalOffset / Utils.layout.getDisplayDensity();
    }

    _verticalOffset: number = 0;
    get verticalOffset(): number {
        return this._verticalOffset / Utils.layout.getDisplayDensity();
    }

    [autoPlayProperty.setNative](value: boolean) {
        this._initAutoPlay(value);
    }

    private _autoPlayInterval: any;

    [autoplayDelayProperty.setNative](value: number) {
        if (this._autoPlayInterval) {
            clearInterval(this._autoPlayInterval);
            this._autoPlayInterval = undefined;
            this._initAutoPlay(this.autoPlay);
        }
    }

    _nextIndex(): number {
        const next = this.selectedIndex + 1;
        if (next > this.lastIndex) {
            return 0;
        }
        return next;
    }

    _initAutoPlay(value: boolean) {
        if (!this.items || this.items.length === 0) {
            return;
        }
        if (!value) {
            if (this._autoPlayInterval) {
                clearInterval(this._autoPlayInterval);
                this._autoPlayInterval = undefined;
            }
        } else {
            if (this.isLayoutValid && !this._autoPlayInterval) {
                this._autoPlayInterval = setInterval(() => {
                    this.selectedIndex = this._nextIndex();
                }, this.autoPlayDelay);
            }
        }
    }

    get itemCount(): number {
        return this._childrenCount ? this._childrenCount + (this.circularMode ? 2 : 0) : 0;
    }

    get lastIndex(): number {
        if (this.items && this.items.length === 0) {
            return 0;
        }
        return this.circularMode ? this.itemCount - 3 : this.itemCount - 1;
    }

    static getProgress(indicator, position, positionOffset, isRtl) {
        const count = indicator.getCount();
        let selectedPosition = indicator.getSelection();

        if (isRtl) {
            position = count - 1 - position;
        }

        if (position < 0) {
            position = 0;
        } else if (position > count - 1) {
            position = count - 1;
        }

        const isRightOverScrolled = position > selectedPosition;
        let isLeftOverScrolled;

        if (isRtl) {
            isLeftOverScrolled = position - 1 < selectedPosition;
        } else {
            isLeftOverScrolled = position + 1 < selectedPosition;
        }

        if (isRightOverScrolled || isLeftOverScrolled) {
            selectedPosition = position;
        }

        const slideToRightSide = selectedPosition === position && positionOffset !== 0;
        let selectingPosition;
        let selectingProgress;

        if (slideToRightSide) {
            selectingPosition = isRtl ? position - 1 : position + 1;
            selectingProgress = positionOffset;
        } else {
            selectingPosition = position;
            selectingProgress = 1 - positionOffset;
        }

        if (selectingProgress > 1) {
            selectingProgress = 1;
        } else if (selectingProgress < 0) {
            selectingProgress = 0;
        }

        return [selectingPosition, selectingProgress];
    }
}

export const pagesCountProperty = new Property<Pager, number>({
    name: 'pagesCount',
    defaultValue: 0,
    valueConverter: (v) => parseInt(v, 10),
    valueChanged: (pager: Pager, oldValue, newValue) => {
        pager.updatePagesCount(pager.pagesCount);
    }
});
pagesCountProperty.register(Pager);

let PageChangeCallback;

function initPagerChangeCallback() {
    if (PageChangeCallback) {
        return PageChangeCallback;
    }

    @NativeClass
    class PageChangeCallbackImpl extends androidx.viewpager2.widget.ViewPager2.OnPageChangeCallback {
        private readonly owner: WeakRef<Pager>;

        constructor(owner: WeakRef<Pager>) {
            super();
            this.owner = owner;
            return global.__native(this);
        }

        onPageSelected(position: number) {
            const owner = this.owner && this.owner.get();
            if (owner) {
                if (owner.lastEvent === 0 && !owner.circularMode) {
                    // page changing without scroll so do the indicator etc.
                    selectedIndexProperty.nativeValueChange(owner, position);
                    if (owner.indicator) {
                        owner.indicator.setSelection(position, true);
                    }
                }

                owner.notify({
                    eventName: Pager.swipeEvent,
                    object: owner
                });
            }
        }

        onPageScrolled(position, positionOffset, positionOffsetPixels) {
            const owner = this.owner && this.owner.get();
            if (owner && owner.isLayoutValid) {
                if (owner.circularMode) {
                    position = owner.pagerAdapter.getPosition(position);
                }
                const offset = position * positionOffsetPixels;
                if (owner.orientation === 'vertical') {
                    owner._horizontalOffset = 0;
                    owner._verticalOffset = offset;
                } else if (owner.orientation === 'horizontal') {
                    owner._horizontalOffset = offset;
                    owner._verticalOffset = 0;
                }
                owner.notify({
                    eventName: Pager.scrollEvent,
                    object: owner,
                    selectedIndex: position,
                    currentPosition: position + positionOffset,
                    scrollX: owner.horizontalOffset,
                    scrollY: owner.verticalOffset
                });
                if (owner.items && position === owner.pagerAdapter.lastIndex() - owner.loadMoreCount) {
                    owner.notify({ eventName: Pager.loadMoreItemsEvent, object: owner });
                }
                const indicator = owner.indicator;
                if (indicator) {
                    const progress = Pager.getProgress(indicator, position, positionOffset, false);
                    const selectingPosition = progress[0];
                    const selectingProgress = progress[1];
                    indicator.setInteractiveAnimation(true);
                    if (position < owner.lastIndex) {
                        indicator.setSelection(position, false);
                        indicator.setProgress(selectingPosition, selectingProgress);
                    }
                }
            }
        }

        onPageScrollStateChanged(state) {
            const owner = this.owner && this.owner.get();
            if (owner) {
                if (owner.lastEvent === 0 && state === 1) {
                    owner.notify({
                        eventName: Pager.swipeStartEvent,
                        object: owner
                    });
                    owner.lastEvent = 1;
                } else if (owner.lastEvent === 1 && state === 1) {
                    owner.notify({
                        eventName: Pager.swipeOverEvent,
                        object: owner
                    });
                    owner.lastEvent = 1;
                } else if (owner.lastEvent === 1 && state === 2) {
                    owner.notify({
                        eventName: Pager.swipeEndEvent,
                        object: owner
                    });
                    owner.lastEvent = 2;
                } else {
                    owner.lastEvent = 0;
                }
                if (owner.isLayoutValid && state === androidx.viewpager2.widget.ViewPager2.SCROLL_STATE_IDLE) {
                    // ts-ignore
                    const count = owner.pagerAdapter.getItemCount();
                    const index = owner.nativeViewProtected.getCurrentItem();
                    const indicator = owner.indicator;
                    if (owner.circularMode) {
                        if (index === 0) {
                            const toDo = () => {
                                owner.nativeViewProtected.setCurrentItem(count - 2, false);
                                selectedIndexProperty.nativeValueChange(owner, count - 3);
                                if (indicator) {
                                    indicator.setSelection(count - 3, false);
                                }
                            };
                            if (indicator) {
                                indicator.withoutAnimation(toDo);
                            } else {
                                toDo();
                            }
                        } else if (index === count - 1) {
                            // first item
                            const toDo = () => {
                                owner.nativeViewProtected.setCurrentItem(1, false);
                                selectedIndexProperty.nativeValueChange(owner, 0);
                                if (indicator) {
                                    indicator.setSelection(0, false);
                                }
                            };
                            if (indicator) {
                                indicator.withoutAnimation(toDo);
                            } else {
                                toDo();
                            }
                        } else {
                            selectedIndexProperty.nativeValueChange(owner, index - 1);
                        }
                    } else {
                        selectedIndexProperty.nativeValueChange(owner, index);
                        if (indicator) {
                            indicator.setSelection(index, false);
                        }
                    }
                }
            }
        }
    }

    PageChangeCallback = PageChangeCallbackImpl;
}
interface PagerRecyclerAdapter extends androidx.recyclerview.widget.RecyclerView.Adapter<any> {
    // tslint:disable-next-line:no-misused-new
    new (owner: WeakRef<Pager>): PagerRecyclerAdapter;
    getPosition(index: number): number;
    lastIndex(): number;
    getIndex(index: number): number;
}
// eslint-disable-next-line no-redeclare
let PagerRecyclerAdapter: PagerRecyclerAdapter;

function initPagerRecyclerAdapter() {
    if (PagerRecyclerAdapter) {
        return;
    }

    @NativeClass
    class PagerRecyclerAdapterImpl extends androidx.recyclerview.widget.RecyclerView.Adapter<any> {
        owner: WeakRef<Pager>;

        constructor(owner: WeakRef<Pager>) {
            super();
            this.owner = owner;
            return global.__native(this);
        }

        onCreateViewHolder(param0: android.view.ViewGroup, type: number): any {
            const owner = this.owner ? this.owner.get() : null;
            if (!owner) {
                return null;
            }
            const template = owner._itemTemplatesInternal[type];

            let view: View = template.createView();

            if (!view && owner._itemViewLoader !== undefined) {
                view = owner._itemViewLoader(template.key);
            }
            const sp = new StackLayout();
            if (view) {
                sp.addChild(view);
            } else {
                sp[PLACEHOLDER] = true;
            }
            owner._addView(sp);
            // sp._setupAsRootView(owner._context);
            // //@ts-ignore
            // sp.parent = owner;
            // sp._isAddedToNativeVisualTree = true;
            // sp.callLoaded();
            sp.nativeView.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));

            initPagerViewHolder();
            const holder = new PagerViewHolder(sp, new WeakRef(owner));
            owner._viewHolders.add(holder);
            return holder;
        }

        getPosition(index: number): number {
            const owner = this.owner && this.owner.get();
            let position = index;
            if (owner && owner.circularMode) {
                if (position === 0) {
                    position = this.lastDummy();
                } else if (position === this.firstDummy()) {
                    position = 0;
                } else {
                    position = position - 1;
                }
            }
            return position;
        }
        /**
         *
         * Get  the position in the CollectionView from the selected index
         *
         * @param index The position in the collectionView
         * @returns The selected Index ( i.e. the number in the slides as the user would view it).
         */
        getIndex(index: number): number {
            let position = index;
            const owner = this.owner && this.owner.get();
            if (owner && owner.circularMode) {
                if (position === 0) {
                    position = 1;
                } else if (position === this.firstDummy()) {
                    position = 0;
                } else {
                    position = position + 1;
                }
            }
            return position;
        }
        onBindViewHolder(holder: any, index: number): void {
            const owner = this.owner ? this.owner.get() : null;
            if (owner) {
                if (owner.circularMode) {
                    if (index === 0) {
                        index = this.lastDummy();
                    } else if (index === this.firstDummy()) {
                        index = 0;
                    } else {
                        index = index - 1;
                    }
                }
                const bindingContext = owner._getDataItem(index);
                const args = {
                    eventName: Pager.itemLoadingEvent,
                    object: owner,
                    android: holder,
                    ios: undefined,
                    index,
                    bindingContext,
                    view: holder.view[PLACEHOLDER] ? null : holder.view.getChildAt(0)
                } as ItemEventData;

                owner.notify(args);
                if (holder.view[PLACEHOLDER]) {
                    if (args.view) {
                        holder.view.addChild(args.view);
                    } else {
                        holder.view.addChild(owner._getDefaultItemContent(index));
                    }
                    holder.view[PLACEHOLDER] = false;
                }
                owner._prepareItem(holder.view, index);
            }
        }

        public getItemId(i: number) {
            const owner = this.owner ? this.owner.get() : null;
            let id = i;
            if (owner && owner.items) {
                const item = (owner as any).items.getItem ? (owner as any).items.getItem(i) : owner.items[i];
                if (item) {
                    id = owner.itemIdGenerator(item, i, owner.items);
                }
            }
            return long(id);
        }

        public getItemCount(): number {
            const owner = this.owner ? this.owner.get() : null;
            return owner && owner.items && owner.items.length ? owner.items.length + (owner.circularMode ? 2 : 0) : 0;
        }

        public getItemViewType(index: number) {
            const owner = this.owner ? this.owner.get() : null;
            if (owner) {
                const template = owner._getItemTemplate(index);
                return owner._itemTemplatesInternal.indexOf(template);
            }
            return 0;
        }

        lastIndex(): number {
            const owner = this.owner && this.owner.get();
            if (owner) {
                if (owner.items.length === 0) {
                    return 0;
                }
                return owner.circularMode ? this.getItemCount() - 3 : this.getItemCount() - 1;
            }
            return 0;
        }

        firstDummy() {
            const count = this.getItemCount();
            if (count === 0) {
                return 0;
            }
            return this.getItemCount() - 1;
        }

        lastDummy() {
            return this.lastIndex();
        }

        hasStableIds(): boolean {
            return true;
        }
    }

    PagerRecyclerAdapter = PagerRecyclerAdapterImpl as any;
}

let StaticPagerStateAdapter;

function initStaticPagerStateAdapter() {
    if (StaticPagerStateAdapter) {
        return;
    }

    @NativeClass
    class StaticPagerStateAdapterImpl extends androidx.recyclerview.widget.RecyclerView.Adapter<any> {
        owner: WeakRef<Pager>;

        constructor(owner: WeakRef<Pager>) {
            super();
            this.owner = owner;
            return global.__native(this);
        }

        onCreateViewHolder(param0: android.view.ViewGroup, type: number): any {
            const owner = this.owner ? this.owner.get() : null;
            if (!owner) {
                return null;
            }

            const view = owner._childrenViewsType.get(type);
            const sp = new StackLayout(); // Pager2 requires match_parent so add a parent with to fill
            if (view && !view.parent) {
                sp.addChild(view);
            } else {
                sp[PLACEHOLDER] = true;
            }
            owner._addView(sp);
            // sp._setupAsRootView(owner._context);
            // //@ts-ignore
            // sp.parent = owner;
            // sp._isAddedToNativeVisualTree = true;
            // sp.callLoaded();
            sp.nativeView.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));

            initPagerViewHolder();
            const holder = new PagerViewHolder(sp, new WeakRef(owner));
            owner._viewHolders.add(holder);
            return holder;
        }

        onBindViewHolder(holder: any, index: number): void {
            const owner = this.owner ? this.owner.get() : null;
            if (owner) {
                const args = {
                    eventName: Pager.itemLoadingEvent,
                    object: owner,
                    android: holder,
                    ios: undefined,
                    index,
                    view: holder.view[PLACEHOLDER] ? null : holder.view
                } as ItemEventData;

                owner.notify(args);
                if (holder.view[PLACEHOLDER]) {
                    if (args.view) {
                        holder.view.addChild(args.view);
                    }
                    holder.view[PLACEHOLDER] = false;
                }
            }
        }

        hasStableIds(): boolean {
            return true;
        }

        public getItem(i: number) {
            const owner = this.owner ? this.owner.get() : null;
            if (owner) {
                if (owner._childrenViews) {
                    return owner._childrenViews[i].view;
                }
            }
            return null;
        }

        public getItemId(i: number) {
            const owner = this.owner ? this.owner.get() : null;
            let id = i;
            if (owner) {
                const item = this.getItem(i);
                if (item) {
                    id = owner.itemIdGenerator(item, i, Array.from(owner._childrenViews));
                }
            }
            return long(id);
        }

        public getItemCount(): number {
            const owner = this.owner ? this.owner.get() : null;
            return (owner && owner._childrenViews?.length) || 0;
        }

        public getItemViewType(index: number) {
            const owner = this.owner?.get();
            if (owner && owner._childrenViews) {
                return owner._childrenViews[index].type;
            }
            return index;
        }
    }

    StaticPagerStateAdapter = StaticPagerStateAdapterImpl as any;
}

interface PagerViewHolder extends androidx.recyclerview.widget.RecyclerView.ViewHolder {
    // tslint:disable-next-line:no-misused-new
    new (owner: View, pager: WeakRef<Pager>): PagerViewHolder;
    view: View;
}
// eslint-disable-next-line no-redeclare
let PagerViewHolder: PagerViewHolder;

function initPagerViewHolder() {
    if (PagerViewHolder) {
        return;
    }

    @NativeClass
    class PagerViewHolderImpl extends androidx.recyclerview.widget.RecyclerView.ViewHolder {
        constructor(private owner: View, private pager: WeakRef<Pager>) {
            super(owner.nativeViewProtected);
            return global.__native(this);
        }

        get view(): View {
            return this.owner;
        }
    }

    PagerViewHolder = PagerViewHolderImpl as any;
}
