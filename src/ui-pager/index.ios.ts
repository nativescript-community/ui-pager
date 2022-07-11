import { ChangeType, Color, EventData, KeyedTemplate, Observable, ObservableArray, Property, ProxyViewContainer, StackLayout, Utils, View, ViewBase, profile } from '@nativescript/core';
import { layout } from '@nativescript/core/utils/utils';
import {
    Indicator,
    ItemEventData,
    Orientation,
    PagerBase,
    autoPlayProperty,
    autoplayDelayProperty,
    disableSwipeProperty,
    indicatorColorProperty,
    indicatorProperty,
    indicatorSelectedColorProperty,
    itemTemplatesProperty,
    itemsProperty,
    orientationProperty,
    selectedIndexProperty,
    showIndicatorProperty
} from './index.common';

export * from './index.common';
export { ItemsSource, Transformer } from './index.common';

const main_queue = dispatch_get_current_queue();

export enum ContentInsetAdjustmentBehavior {
    Always = UIScrollViewContentInsetAdjustmentBehavior.Always,
    Automatic = UIScrollViewContentInsetAdjustmentBehavior.Automatic,
    Never = UIScrollViewContentInsetAdjustmentBehavior.Never,
    ScrollableAxes = UIScrollViewContentInsetAdjustmentBehavior.ScrollableAxes
}

function parseContentInsetAdjustmentBehavior(value: string | number) {
    if (typeof value === 'string') {
        switch (value) {
            case 'always':
                return ContentInsetAdjustmentBehavior.Always;
            case 'never':
                return ContentInsetAdjustmentBehavior.Never;
            case 'scrollableAxes':
                return ContentInsetAdjustmentBehavior.ScrollableAxes;
            default:
            case 'automatic':
                return ContentInsetAdjustmentBehavior.Automatic;
        }
    } else {
        return value;
    }
}
export const contentInsetAdjustmentBehaviorProperty = new Property<Pager, ContentInsetAdjustmentBehavior>({
    name: 'contentInsetAdjustmentBehavior',
    valueConverter: parseContentInsetAdjustmentBehavior,
    defaultValue: ContentInsetAdjustmentBehavior.Automatic
});

@NativeClass
class UICellView extends UIView {
    view: WeakRef<View>;
    layoutSubviews() {
        const view = this.view && this.view.get();
        if (!view) {
            return;
        }
        this.frame = this.superview.bounds;
        const size = this.bounds.size;
        View.layoutChild(null, view, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
    }
}

const PFLAG_FORCE_LAYOUT = 1;
export class Pager extends PagerBase {
    lastEvent: number = 0;
    private mDisableSwipe: boolean = false;
    private mDisableAnimation: boolean = false;
    mLayout: UICollectionViewFlowLinearLayoutImpl;
    mPreparingCell: boolean = false;
    mDelegate: UICollectionDelegateImpl;
    nativeViewProtected: UIView;
    private mDataSource: UICollectionViewDataSourceImpl;
    mMap: Map<PagerCell, View>;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: any;
    mIsRefreshing: boolean = false;
    private mPager: UICollectionView;
    private mIndicatorView: any;
    private mObservableArrayInstance: ObservableArray<any>;
    mIsInit: boolean = false;

    public mInnerWidth: number = 0;
    public mInnerHeight: number = 0;
    mLastLayoutKey: string;

    constructor() {
        super();
        this.mMap = new Map<PagerCell, View>();
    }

    get pager() {
        return this.mPager;
    }

    get indicatorView() {
        return this.mIndicatorView;
    }

    createNativeView() {
        const nativeView = UIView.new();
        this.mLayout = UICollectionViewFlowLinearLayoutImpl.initWithOwner(new WeakRef(this));
        this.mLayout.scrollDirection = UICollectionViewScrollDirection.Horizontal;
        this.mLayout.minimumInteritemSpacing = 0;
        const pager = (this.mPager = UICollectionView.alloc().initWithFrameCollectionViewLayout(CGRectZero, this.mLayout));
        pager.backgroundColor = UIColor.clearColor;
        pager.autoresizesSubviews = false;
        pager.autoresizingMask = UIViewAutoresizing.None;
        pager.showsHorizontalScrollIndicator = false;
        pager.showsVerticalScrollIndicator = false;
        pager.decelerationRate = UIScrollViewDecelerationRateFast;
        nativeView.addSubview(pager);
        return nativeView;
    }

    initNativeView() {
        super.initNativeView();
        const nativeView = this.pager;
        nativeView.registerClassForCellWithReuseIdentifier(PagerCell.class(), this._defaultTemplate.key);
        nativeView.backgroundColor = UIColor.clearColor;
        nativeView.autoresizesSubviews = false;
        nativeView.autoresizingMask = 0;
        nativeView.dataSource = this.mDataSource = UICollectionViewDataSourceImpl.initWithOwner(new WeakRef(this));
        nativeView.scrollEnabled = !this.disableSwipe;
        if (this.orientation === 'vertical') {
            this.mLayout.scrollDirection = UICollectionViewScrollDirection.Vertical;
            nativeView.alwaysBounceVertical = true;
            nativeView.alwaysBounceHorizontal = false;
        } else {
            this.mLayout.scrollDirection = UICollectionViewScrollDirection.Horizontal;
            nativeView.alwaysBounceHorizontal = true;
            nativeView.alwaysBounceVertical = false;
        }
        this._setIndicator(this.indicator);
        this.mDelegate = UICollectionDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._initAutoPlay(this.autoPlay);
    }

    getChildView(index: number): View {
        if (this._childrenViews) {
            return this._childrenViews[index].view;
        }
        let result: View;
        if (this.nativeViewProtected) {
            const cell = this.mPager.cellForItemAtIndexPath(NSIndexPath.indexPathForRowInSection(index, 0)) as PagerCell;
            return cell?.view;
        }

        return result;
    }

    _getRealWidthHeight(): { width: number; height: number } {
        let height = 0;
        let width = 0;
        width = (layout.toDeviceIndependentPixels(this._effectiveItemWidth) - (this.perPage * 2 * this._getSpacing() + this._getPeaking() * 2)) / this.perPage;
        height = (layout.toDeviceIndependentPixels(this._effectiveItemHeight) - (this.perPage * 2 * this._getSpacing() + this._getPeaking() * 2)) / this.perPage;
        return { height, width };
    }

    _nextIndex(): number {
        if (this.circularMode) {
            // TODO
            return 0;
        } else {
            const next = this.selectedIndex + 1;
            if (next > this.lastIndex) {
                return 0;
            }
            return next;
        }
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

    getPosition(index: number): number {
        let position = index;
        if (this.circularMode) {
            if (position === 0) {
                position = this.lastDummy;
            } else if (position === this.firstDummy) {
                position = 0;
            } else {
                position = position - 1;
            }
        }
        return position;
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

    get firstDummy(): number {
        const count = this.itemCount;
        if (count === 0) {
            return 0;
        }
        return this.itemCount - 1;
    }

    get lastDummy(): number {
        return this.lastIndex;
    }

    private _setIndicator(value: Indicator) {
        if (this.mIndicatorView) {
            this.mIndicatorView.removeFromSuperview();
        }
        switch (value) {
            case Indicator.None:
                this.mIndicatorView = CHIPageControlAji.new();
                break;
            case Indicator.Worm:
                this.mIndicatorView = CHIPageControlAleppo.new();
                break;
            case Indicator.Fill:
                this.mIndicatorView = CHIPageControlChimayo.new();
                break;
            case Indicator.Swap:
                this.mIndicatorView = CHIPageControlPuya.new();
                break;
            case Indicator.THIN_WORM:
                this.mIndicatorView = CHIPageControlJalapeno.new();
                break;
            case Indicator.Flat:
                this.mIndicatorView = CHIPageControlJaloro.new();
                break;
            default:
                break;
        }
        this.mIndicatorView.tintColor = UIColor.whiteColor;
        this.mIndicatorView.currentPageTintColor = UIColor.whiteColor;

        switch (value) {
            case Indicator.None:
            case Indicator.Worm:
            case Indicator.Fill:
            case Indicator.Swap:
            case Indicator.THIN_WORM:
            case Indicator.Disabled:
                this.mIndicatorView.radius = 4;
                break;

            case Indicator.Flat:
                this.mIndicatorView.radius = 2;
                this.mIndicatorView.transform = CGAffineTransformScale(CGAffineTransformIdentity, 0.7, 0.5);
                break;
        }
    }

    public get _childrenCount() {
        return this.items?.length || this._childrenViews?.length || 0;
    }

    public itemTemplateUpdated(oldData: any, newData: any): void {}

    public _setNativeClipToBounds(): void {
        this.pager.clipsToBounds = true;
    }

    public [orientationProperty.setNative](value: Orientation) {
        if (value === 'horizontal') {
            this.mLayout.scrollDirection = UICollectionViewScrollDirection.Horizontal;
        } else {
            this.mLayout.scrollDirection = UICollectionViewScrollDirection.Vertical;
        }
    }

    public eachChildView(callback: (child: View) => boolean): void {
        this.mMap.forEach((view, key) => callback(view));
    }
    public eachChild(callback: (child: ViewBase) => boolean) {
        this.mMap.forEach((view, key) => callback(view));
    }

    _updateScrollPosition() {
        const view = this.pager;
        const size = this.orientation === 'vertical' ? view.contentSize.height : view.contentSize.width;
        if (!view || size === 0) {
            return;
        }
        this.scrollToIndexAnimated(this.selectedIndex, false);
    }

    [selectedIndexProperty.setNative](value: number) {
        if (this.isLoaded) {
            this.scrollToIndexAnimated(value, !this.disableAnimation);
        }
    }

    [itemTemplatesProperty.getDefault](): KeyedTemplate[] {
        return null;
    }

    [itemTemplatesProperty.setNative](value: KeyedTemplate[]) {
        this._itemTemplatesInternal = new Array<KeyedTemplate>(this._defaultTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.pager.registerClassForCellWithReuseIdentifier(PagerCell.class(), value[i].key);
            }
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
    }

    [itemsProperty.setNative](value: any) {
        if (this.indicatorView && value && value.length) {
            this.indicatorView.numberOfPages = value.length;
        }
        // remove old instance
        if (this.mObservableArrayInstance) {
            this.mObservableArrayInstance.off(ObservableArray.changeEvent, this._observableArrayHandler);
            this.mObservableArrayInstance = null;
        }
        if (value instanceof ObservableArray) {
            this.mObservableArrayInstance = value as any;
            this.mObservableArrayInstance.on(ObservableArray.changeEvent, this._observableArrayHandler);
        } else {
            this.refresh();
        }

        if (!value) {
            this.mIsInit = false;
        }
        selectedIndexProperty.coerce(this);
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

    [showIndicatorProperty.setNative](value: boolean) {
        if (!this.indicatorView) {
            this._setIndicator(this.indicatorView);
        }
        if (!this.nativeView) {
            return;
        }
        this.indicatorView.center = CGPointMake(this.nativeView.center.x, this.nativeView.bounds.size.height - this.indicatorView.intrinsicContentSize.height);
        const hasParent = this.indicatorView.superview;
        if (value) {
            if (!hasParent) {
                this.nativeView.addSubview(this.indicatorView);
            }
        } else {
            if (hasParent) {
                this.indicatorView.removeFromSuperview();
            }
        }
    }

    private _observableArrayHandler = (args) => {
        if (!this.pager) {
            return;
        }
        if (this.indicatorView && this.mObservableArrayInstance && this.mObservableArrayInstance.length) {
            this.indicatorView.numberOfPages = this.mObservableArrayInstance.length;
        }

        const collectionView = this.pager;
        if (collectionView) {
            try {
                let offset = 0;
                collectionView.performBatchUpdatesCompletion(() => {
                    this.mIsRefreshing = true;
                    const array = [];
                    switch (args.action) {
                        case ChangeType.Add:
                            for (let i = 0; i < args.addedCount; i++) {
                                array.push(NSIndexPath.indexPathForRowInSection(args.index + i, 0));
                            }
                            offset = collectionView.contentSize.width - collectionView.contentOffset.x;
                            collectionView.insertItemsAtIndexPaths(array);
                            break;
                        case ChangeType.Delete:
                            for (let i = 0; i < args.removed.length; i++) {
                                array.push(NSIndexPath.indexPathForItemInSection(args.index + i, 0));
                            }
                            collectionView.deleteItemsAtIndexPaths(array);
                            break;
                        case ChangeType.Splice:
                            if (args.removed && args.removed.length > 0) {
                                for (let i = 0; i < args.removed.length; i++) {
                                    array.push(NSIndexPath.indexPathForRowInSection(args.index + i, 0));
                                }
                                collectionView.deleteItemsAtIndexPaths(array);
                            } else {
                                const addedArray = [];
                                for (let i = 0; i < args.addedCount; i++) {
                                    addedArray.push(NSIndexPath.indexPathForRowInSection(args.index + i, 0));
                                }
                                collectionView.insertItemsAtIndexPaths(addedArray);
                            }
                            break;
                        case ChangeType.Update:
                            collectionView.reloadItemsAtIndexPaths([NSIndexPath.indexPathForRowInSection(args.index, 0)]);
                            break;
                        default:
                            break;
                    }
                    this._initAutoPlay(this.autoPlay);
                    if (this.itemCount === 0) {
                        this.mIsInit = false;
                    }
                }, null);
            } catch (err) {}
        }
    };

    _onItemsChanged(oldValue: any, newValue: any): void {}

    scrollToIndexAnimated(index: number, animate: boolean) {
        if (!this.pager) return;

        const contentSize = this.pager.contentSize;
        const size = this.orientation === 'vertical' ? contentSize.height : contentSize.width;
        if (size === 0) {
            return;
        }
        if (this._childrenCount === 0) {
            return;
        }
        const maxMinIndex = Math.min(Math.max(0, index), this._childrenCount - 1);
        if (!this.isLoaded) {
            return selectedIndexProperty.nativeValueChange(this, maxMinIndex);
        }
        const frame = this.page && this.page.frame;
        if (this.page && frame) {
            if (frame._executingContext) {
                if (frame._executingContext.entry.resolvedPage !== this.page) {
                    return selectedIndexProperty.nativeValueChange(this, maxMinIndex);
                }
            } else if (frame.currentPage !== this.page) {
                return selectedIndexProperty.nativeValueChange(this, maxMinIndex);
            }
        }
        // dispatch_async(main_queue, () => {
        if (this.mDataSource.collectionViewNumberOfItemsInSection(this.pager, 0) > maxMinIndex) {
            this.pager.scrollToItemAtIndexPathAtScrollPositionAnimated(
                NSIndexPath.indexPathForItemInSection(maxMinIndex, 0),
                this.orientation === 'vertical' ? UICollectionViewScrollPosition.CenteredVertically : UICollectionViewScrollPosition.CenteredHorizontally,
                !!animate
            );
        }

        selectedIndexProperty.nativeValueChange(this, maxMinIndex);
        // });
    }

    @profile
    public refresh() {
        if (!this.isLoaded || !this.nativeView) {
            this._isDataDirty = true;
            return;
        }
        this._isDataDirty = false;
        this.mLastLayoutKey = this.mInnerWidth + '_' + this.mInnerHeight;

        // clear bindingContext when it is not observable because otherwise bindings to items won't reevaluate
        this.mMap.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });

        // TODO: this is ugly look here: https://github.com/nativescript-vue/nativescript-vue/issues/525
        // this.clearRealizedCells();
        // dispatch_async(main_queue, () => {
        this.pager.reloadData();
        this.pager.collectionViewLayout.invalidateLayout();
        this._updateScrollPosition();
        this._initAutoPlay(this.autoPlay);
        // });
    }

    _isDataDirty = false;
    public onLoaded() {
        super.onLoaded();
        if (this.showIndicator && this.indicatorView) {
            this.nativeView.addSubview(this.indicatorView);
        }
        if (this._isDataDirty && this.mInnerWidth !== undefined && this.mInnerHeight !== undefined) {
            this.refresh();
        }

        this.pager.delegate = this.mDelegate;
        if (!this.items && this._childrenCount > 0) {
            selectedIndexProperty.coerce(this);
            this._updateScrollPosition();
        }
    }

    public onUnloaded() {
        if (this.pager) {
            this.pager.delegate = null;
        }
        super.onUnloaded();
    }

    public disposeNativeView() {
        this.mDelegate = null;
        this.mDataSource = null;
        if (this.mPager) {
            this.mPager.delegate = null;
            this.mPager = null;
        }
        this.mIndicatorView = null;
        this.mLayout = null;
        if (this.mObservableArrayInstance) {
            this.mObservableArrayInstance.off(ObservableArray.changeEvent, this._observableArrayHandler);
            this.mObservableArrayInstance = null;
        }
        this.clearRealizedCells();
        super.disposeNativeView();
    }

    private clearRealizedCells() {
        const that = new WeakRef<Pager>(this);
        this.mMap.forEach(function (value, key: PagerCell) {
            that.get()._removeContainer(key);
            that.get()._clearCellViews(key);
        }, that);
        this.mMap.clear();
    }
    private _clearCellViews(cell: PagerCell) {
        // if (cell && cell.view) {
        //     if (cell.view.nativeViewProtected) {
        //         cell.view.nativeViewProtected.removeFromSuperview();
        //     }

        //     cell.owner = undefined;
        // }
        const view = cell.view;
        if (!view) {
            return;
        }
        // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
        if (view.parent && !(view.parent instanceof Pager)) {
            this._removeView(view.parent);
        }
        // No need to request layout when we are removing cells.
        cell.owner = undefined;
        const preparing = this.mPreparingCell;
        this.mPreparingCell = true;
        if (view.parent && !(view.parent instanceof Pager)) {
            if (!(view.parent instanceof Pager)) {
                this._removeView(view.parent);
            } else {
                view.parent._removeView(view);
            }
        }
        this.mPreparingCell = preparing;
        this.mMap.delete(cell);
    }

    [indicatorProperty.setNative](value: Indicator) {
        this._setIndicator(value);
    }

    [indicatorColorProperty.setNative](value: Color | string) {
        if (this.indicatorView) {
            const color = !value || value instanceof Color ? (value as Color) : new Color(value);
            this.indicatorView.tintColor = color ? color.ios : null;
        }
    }

    [indicatorSelectedColorProperty.setNative](value: Color | string) {
        if (this.indicatorView) {
            const color = !value || value instanceof Color ? (value as Color) : new Color(value);
            this.indicatorView.currentPageTintColor = color ? color.ios : null;
        }
    }

    [disableSwipeProperty.setNative](value: boolean) {
        this.mPager.scrollEnabled = !value;
        this.mDisableSwipe = value;
    }

    [contentInsetAdjustmentBehaviorProperty.setNative](value: ContentInsetAdjustmentBehavior) {
        this.mPager.contentInsetAdjustmentBehavior = value as any;
    }
    get disableAnimation(): boolean {
        return this.mDisableAnimation;
    }

    set disableAnimation(value: boolean) {
        this.mDisableAnimation = value;
    }

    public _removeContainer(cell: PagerCell, index?: number): void {
        let view = cell.view;

        const args = {
            eventName: Pager.itemDisposingEvent,
            object: this,
            index,
            android: undefined,
            ios: cell,
            view
        } as ItemEventData;
        this.notify(args);
        view = args.view;
        if (view && view.parent) {
            // This is to clear the StackLayout that is used to wrap ProxyViewContainer instances.
            if (!(view.parent instanceof Pager)) {
                this._removeView(view.parent);
            }

            view.parent._removeView(view);
        }
        this.mMap.delete(cell);
    }

    // called by N when the size actually changed
    // _onSizeChanged() {
    //     dispatch_async(main_queue, () => {
    //         if (!this.pager) {
    //             return;
    //         }
    //         this.pager.reloadData();
    //         // if (changed) {
    //         this._updateScrollPosition();
    //         // }
    //         this._initAutoPlay(this.autoPlay);
    //     });
    // }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        this.mMap.forEach((childView: any, pagerCell) => {
            View.measureChild(this, childView, childView._currentWidthMeasureSpec, childView._currentHeightMeasureSpec);
        });
    }
    iosOverflowSafeAreaEnabledLayoutHackNeeded = true;
    protected updateInnerSize() {
        const width = this.getMeasuredWidth();
        const height = this.getMeasuredHeight();
        this.mInnerWidth = width - this.effectivePaddingLeft - this.effectivePaddingRight;
        this.mInnerHeight = height - this.effectivePaddingTop - this.effectivePaddingBottom;
    }
    public onLayout(left: number, top: number, right: number, bottom: number) {
        super.onLayout(left, top, right, bottom);
        this.updateInnerSize();
        if (!this.nativeView) {
            return;
        }
        this.pager.frame = this.nativeView.bounds;
        if (this.indicatorView && this.indicatorView.intrinsicContentSize) {
            this.indicatorView.center = CGPointMake(this.nativeView.center.x, this.nativeView.bounds.size.height - this.indicatorView.intrinsicContentSize.height);
        }
        const layoutView = this.pager.collectionViewLayout;
        if (!layoutView) {
            return;
        }

        layoutView.invalidateLayout();

        const size = this._getSize();
        this.mMap.forEach((childView, pagerCell) => {
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            View.layoutChild(this, childView, 0, 0, width, height);
        });

        // there is no need to call refresh if it was triggered before with same size.
        // this refresh is just to handle size change
        const layoutKey = this.mInnerWidth + '_' + this.mInnerHeight;
        if (this.mLastLayoutKey !== layoutKey) {
            this.refresh();
        }
    }

    public requestLayout(): void {
        // When preparing cell don't call super - no need to invalidate our measure when cell desiredSize is changed.
        if (!this.mPreparingCell) {
            super.requestLayout();
        }
    }

    public _prepareCell(cell: PagerCell, indexPath: NSIndexPath) {
        try {
            this.mPreparingCell = true;
            const index = indexPath.row;

            let view = cell.view;
            const template = this._getItemTemplate(indexPath.row);

            if (!view) {
                view = template.createView();
                if (!view && this._itemViewLoader !== undefined) {
                    view = this._itemViewLoader(this._getItemTemplateKey(indexPath.row));
                }
            }
            const bindingContext = this._getDataItem(indexPath.row);
            const args = {
                eventName: Pager.itemLoadingEvent,
                object: this,
                index,
                android: undefined,
                ios: cell,
                view,
                bindingContext
            } as ItemEventData;

            this.notify(args);

            view = args.view || this._getDefaultItemContent(indexPath.row);

            // Proxy containers should not get treated as layouts.
            // Wrap them in a real layout as well.
            if (view instanceof ProxyViewContainer) {
                const sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }

            // If cell is reused it have old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                this.mMap.delete(cell);
                this._removeContainer(cell, index);
                (cell.view.nativeViewProtected as UIView).removeFromSuperview();
                cell.owner = new WeakRef(view);
            }
            if (view) {
                view.bindingContext = bindingContext;
            }
            this.mMap.set(cell, view);

            if (view && !view.parent) {
                this._addView(view);
                // prevent infinit request layout
                // view['performLayout'] = () => {
                //     this._layoutCell(view, indexPath);
                //     const size = this._getSize();
                //     const width = layout.toDevicePixels(size.width);
                //     const height = layout.toDevicePixels(size.height);
                //     if (view && view.isLayoutRequired) {
                //         View.layoutChild(this, view, 0, 0, width, height);
                //     }
                // };
                if (this.iosOverflowSafeArea) {
                    const innerView = UICellView.new() as UICellView;
                    innerView.view = new WeakRef(view);
                    innerView.addSubview(view.nativeViewProtected);
                    cell.contentView.addSubview(innerView);
                } else {
                    cell.contentView.addSubview(view.nativeViewProtected);
                }
            }

            this._layoutCell(view, indexPath);
        } finally {
            this.mPreparingCell = false;
        }
    }

    _layoutCell(cellView: View, index: NSIndexPath) {
        if (cellView) {
            const size = this._getSize();
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            const widthMeasureSpec = layout.makeMeasureSpec(width, layout.EXACTLY);

            const heightMeasureSpec = layout.makeMeasureSpec(height, layout.EXACTLY);

            const measured = View.measureChild(this, cellView, widthMeasureSpec, heightMeasureSpec);
        }
    }

    get horizontalOffset(): number {
        return this.pager ? this.pager.contentOffset.x : 0;
    }

    get verticalOffset(): number {
        return this.pager ? this.pager.contentOffset.y : 0;
    }

    _getSpacing(): number {
        return layout.toDeviceIndependentPixels(this.convertToSize(this.spacing));
    }

    _getPeaking(): number {
        return layout.toDeviceIndependentPixels(this.convertToSize(this.peaking));
    }

    _getSize(): { width: number; height: number } {
        let width = layout.toDeviceIndependentPixels(this._effectiveItemWidth);
        let height = layout.toDeviceIndependentPixels(this._effectiveItemHeight);
        if (this.orientation === 'vertical') {
            height = (height - (this._getSpacing() * 2 + this._getPeaking() * 2)) / this.perPage;
        } else {
            width = (width - (this._getSpacing() * 2 + this._getPeaking() * 2)) / this.perPage;
        }
        if (Number.isNaN(width)) {
            width = 0;
        }

        if (Number.isNaN(height)) {
            height = 0;
        }
        return { width, height };
    }
}

@NativeClass
class PagerCell extends UICollectionViewCell {
    public owner: WeakRef<View>;
    public index: number;

    public get view(): View {
        return this.owner ? this.owner.get() : null;
    }

    public static initWithEmptyBackground(): PagerCell {
        const cell = PagerCell.new() as PagerCell;
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    }

    public willMoveToSuperview(newSuperview: UIView): void {
        const parent = (this.view ? this.view.parent : null) as Pager;

        // When inside Pager and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this, this.index);
        }
    }
}

@NativeClass
@ObjCClass(UICollectionViewDelegate, UICollectionViewDelegateFlowLayout)
class UICollectionDelegateImpl extends NSObject implements UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    private _owner: WeakRef<Pager>;

    public static initWithOwner(owner: WeakRef<Pager>): UICollectionDelegateImpl {
        const delegate = UICollectionDelegateImpl.alloc().init() as UICollectionDelegateImpl;
        delegate._owner = owner;
        return delegate;
    }

    public collectionViewLayoutInsetForSectionAtIndex(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): UIEdgeInsets {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            const inset = owner._getSpacing() + owner._getPeaking();
            if (owner.orientation === 'vertical') {
                return new UIEdgeInsets({
                    bottom: inset,
                    left: 0,
                    right: 0,
                    top: inset
                });
            }

            return new UIEdgeInsets({
                bottom: 0,
                left: inset,
                right: inset,
                top: 0
            });
        }
        return new UIEdgeInsets({ bottom: 0, left: 0, right: 0, top: 0 });
    }

    public collectionViewLayoutSizeForItemAtIndexPath(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, indexPath: NSIndexPath): CGSize {
        const owner = this._owner && this._owner.get();
        if (!owner) return CGSizeZero;
        const size = owner._getSize();
        return CGSizeMake(size.width, size.height);
    }

    public collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath) {
        const owner = this._owner && this._owner.get();
        if (owner) {
            if (!owner.mIsInit) {
                owner._updateScrollPosition();
                owner.mIsInit = true;
            }
            if (owner.items && indexPath.row === owner.lastIndex - owner.loadMoreCount) {
                owner.notify<EventData>({
                    eventName: Pager.loadMoreItemsEvent,
                    object: owner
                });
            }
        }

        if (cell.preservesSuperviewLayoutMargins) {
            cell.preservesSuperviewLayoutMargins = false;
        }

        if (cell.layoutMargins) {
            cell.layoutMargins = UIEdgeInsetsZero;
        }
    }

    public collectionViewLayoutMinimumLineSpacingForSectionAtIndex(collectionView: UICollectionView, collectionViewLayout: UICollectionViewLayout, section: number): number {
        const owner = this._owner ? this._owner.get() : null;
        if (!owner) return 0;
        const result = owner._getSpacing();
        return result;
    }

    public scrollViewWillBeginDragging(scrollView: UIScrollView): void {
        const owner = this._owner && this._owner.get();
        if (owner) {
            if (owner.lastEvent === 0) {
                owner.notify({
                    eventName: Pager.swipeStartEvent,
                    object: owner
                });
                owner.lastEvent = 1;
            }
        }
    }

    public scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            owner.notify({
                eventName: Pager.swipeEvent,
                object: owner
            });
        }
    }

    public scrollViewDidScroll(scrollView: UIScrollView): void {
        const owner = this._owner.get();
        if (owner) {
            let width: number;
            let offset: number;
            const size = owner._getRealWidthHeight();
            let total: number;
            if (owner.orientation === 'vertical') {
                width = size.height;
                offset = scrollView.contentOffset.y;
                total = scrollView.contentSize.height - scrollView.bounds.size.height;
            } else {
                width = size.width;
                offset = scrollView.contentOffset.x;
                total = scrollView.contentSize.width - scrollView.bounds.size.width;
            }
            const percent = offset / total;
            const progress = percent * (owner.itemCount - 1);
            if (owner.indicatorView && owner.indicatorView.setWithProgressAnimated && !Number.isNaN(progress)) {
                owner.indicatorView.progress = progress;
            }
            const index = parseInt(progress.toFixed(0), 10);
            if (owner.selectedIndex !== index && !Number.isNaN(index)) {
                //  selectedIndexProperty.nativeValueChange(owner, index);
            }
            owner.notify({
                object: owner,
                eventName: Pager.scrollEvent,
                selectedIndex: Math.floor(progress),
                currentPosition: progress,
                scrollX: owner.horizontalOffset,
                scrollY: owner.verticalOffset
            });

            if (owner.lastEvent === 1) {
                owner.notify({
                    eventName: Pager.swipeOverEvent,
                    object: owner
                });
                owner.lastEvent = 1;
            }

            // (scrollView as any).scrollToItemAtIndexPathAtScrollPositionAnimated(
            //     NSIndexPath.indexPathForRowInSection(Math.round(width),0), UICollectionViewScrollPosition.CenteredHorizontally, true
            // );

            // if(owner.circularMode){
            //     if(nextIndex === 0){
            //         selectedIndexProperty.nativeValueChange(owner, owner._childrenCount - 3);
            //     }else if(nextIndex === owner._childrenCount -1){
            //         selectedIndexProperty.nativeValueChange(owner, 0);
            //     }else {
            //         selectedIndexProperty.nativeValueChange(owner, nextIndex - 1);
            //     }
            // }else {
            //     selectedIndexProperty.nativeValueChange(owner, nextIndex);
            // }

            /* if (!Number.isNaN(width)) {
                 let page = Math.ceil(width);
                 const doScroll = () => {
                     if (!Number.isNaN(width)) {
                         // scrollView.setContentOffsetAnimated(point, false);
                         scrollView.contentOffset = CGPointMake(Math.ceil(w) * page, scrollView.contentOffset.y);
                     }
                 };
                 console.log('page', page, owner.itemCount, page === owner.itemCount);
                 if (page === 0) {
                     page = owner.itemCount - 2;
                     doScroll();
                     // selectedIndexProperty.nativeValueChange(owner, owner.itemCount - 3);
                 } else if (page === owner.itemCount) {
                     page = 1;
                     doScroll();
                     //  selectedIndexProperty.nativeValueChange(owner, 0);
                 } else {
                     if (page === owner._childrenCount + 1) {
                         //    selectedIndexProperty.nativeValueChange(owner, 0);
                     } else {
                         //   selectedIndexProperty.nativeValueChange(owner, page - 1);
                     }

                 }
             } */

            /* if(owner){
                 let width = 0;
                 let w = (layout.toDeviceIndependentPixels(owner._effectiveItemWidth) - (((owner.perPage * 2) * owner._getSpacing()) + (owner._getPeaking() * 2))) / owner.perPage;
                 let h = (layout.toDeviceIndependentPixels(owner._effectiveItemHeight) - (((owner.perPage * 2) * owner._getSpacing()) + (owner._getPeaking() * 2))) / owner.perPage;
                 width = scrollView.contentOffset.x / w;
                 if (!Number.isNaN(width)) {
                     let page = Math.ceil(width);
                     const doScroll = () => {
                         if (!Number.isNaN(width)) {
                             const point = CGPointMake(Math.ceil(w) * page, scrollView.contentOffset.y);
                             scrollView.setContentOffsetAnimated(point, false);
                         }
                     };
                     if (page === 0) {
                         page = owner.itemCount - 2;
                         doScroll();
                         selectedIndexProperty.nativeValueChange(owner, owner.itemCount - 3);
                     } else if (page === owner.itemCount -1) {
                         page = 1;
                         doScroll();
                         selectedIndexProperty.nativeValueChange(owner, 0);
                     } else {
                         if(page === owner.itemCount + 1){
                             selectedIndexProperty.nativeValueChange(owner, 0);
                         }else {
                             selectedIndexProperty.nativeValueChange(owner, page - 1);
                         }
                     }
                 }
             } */

            // scrollView.setContentOffsetAnimated(CGPointMake((w * width) + 1, 0),false);
            // (owner.nativeView as UICollectionView).setContentOffsetAnimated(CGPointMake((w * width) + 1, 0),false);
        }
    }

    scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void {}

    public scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>) {
        const owner = this._owner ? this._owner.get() : null;

        if (!owner) return;

        if (owner.lastEvent === 1) {
            owner.notify({
                eventName: Pager.swipeEndEvent,
                object: owner
            });
            owner.lastEvent = 0;
        }
    }
}

@NativeClass
@ObjCClass(UICollectionViewDataSource)
class UICollectionViewDataSourceImpl extends NSObject implements UICollectionViewDataSource {
    _owner: WeakRef<Pager>;

    public static initWithOwner(owner: WeakRef<Pager>): UICollectionViewDataSourceImpl {
        const delegate = UICollectionViewDataSourceImpl.alloc().init() as UICollectionViewDataSourceImpl;
        delegate._owner = owner;
        return delegate;
    }

    public collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell {
        const owner = this._owner ? this._owner.get() : null;
        let cell;
        let count = 0;
        if (owner) {
            count = owner._childrenCount;
            if (owner.circularMode) {
                count = owner.itemCount;
                switch (indexPath.row) {
                    case 0:
                        indexPath = NSIndexPath.indexPathForRowInSection(owner.lastDummy, 0);
                        break;
                    case owner.firstDummy:
                        indexPath = NSIndexPath.indexPathForRowInSection(0, 0);
                        break;
                    default:
                        indexPath = NSIndexPath.indexPathForRowInSection(indexPath.row - 1, 0);
                        break;
                }
            }
        }
        if (owner && !owner.items && count > 0) {
            const index = indexPath.row;
            const data = owner._childrenViews[index];
            const viewType = data.type;
            owner.mPreparingCell = true;
            collectionView.registerClassForCellWithReuseIdentifier(PagerCell.class(), `static-${viewType}`);
            cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(`static-${viewType}`, indexPath) || PagerCell.initWithEmptyBackground();
            cell.index = index;
            const view = data.view;

            // if (view instanceof ProxyViewContainer) {
            //     let sp = new StackLayout();
            //     sp.addChild(view);
            //     view = sp;
            // }

            // If cell is reused it has old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            } else if (cell.view !== view) {
                owner._removeView(view);
                // (cell.view.nativeViewProtected as UIView).removeFromSuperview();
                cell.owner = new WeakRef(view);
            }

            if (view && !view.parent) {
                // view['performLayout'] = () => {
                //     View.measureChild(
                //         owner,
                //         view,
                //         view._currentWidthMeasureSpec,
                //         view._currentHeightMeasureSpec
                //     );
                //     if (view && view.isLayoutRequired) {
                //         View.layoutChild(owner, view, 0, 0, view.getMeasuredWidth(), view.getMeasuredHeight());
                //     }
                // };
                owner._addView(view);
                // if (owner.iosOverflowSafeArea) {
                const innerView = UICellView.new() as UICellView;
                innerView.view = new WeakRef(view);
                innerView.addSubview(view.nativeViewProtected);
                cell.contentView.addSubview(innerView);
                owner.mMap.set(cell, view);
                // } else {
                //     cell.contentView.addSubview(view.nativeViewProtected);
                // }
            }

            view.iosOverflowSafeArea = owner.iosOverflowSafeArea;
            view['iosIgnoreSafeArea'] = owner['iosIgnoreSafeArea'];
            owner._layoutCell(view, indexPath);
            const size = owner._getSize();
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            if (view && (view as any).isLayoutRequired) {
                View.layoutChild(owner, view, 0, 0, width, height);
            }
            owner.mPreparingCell = false;
            return cell;
        }

        const template = owner && owner._getItemTemplate(indexPath.row);
        cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(template.key, indexPath) || PagerCell.initWithEmptyBackground();
        cell.index = indexPath;
        if (owner) {
            const size = owner._getSize();
            owner._prepareCell(cell, indexPath);
            const cellView: any = (cell as PagerCell).view;
            cellView.iosOverflowSafeArea = owner.iosOverflowSafeArea;
            cellView['iosIgnoreSafeArea'] = owner['iosIgnoreSafeArea'];
            if (!owner.iosOverflowSafeAreaEnabled && cellView && cellView.isLayoutRequired) {
                View.layoutChild(owner, cellView, 0, 0, layout.toDevicePixels(size.width), layout.toDevicePixels(size.height));
            }
        }

        return cell;
    }

    public collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number): number {
        const owner = this._owner ? this._owner.get() : null;
        // make sure we dont start to load static view if the pager is not loaded.
        // otherwise static items wont "load"
        if (!owner || !owner.isLoaded) return 0;
        return owner.circularMode ? owner.itemCount : owner._childrenCount;
    }

    public numberOfSectionsInCollectionView(collectionView: UICollectionView): number {
        return 1;
    }
}

@NativeClass
class UICollectionViewFlowLinearLayoutImpl extends UICollectionViewFlowLayout {
    _owner: WeakRef<Pager>;
    _curl: CATransition;

    public static initWithOwner(owner: WeakRef<Pager>): UICollectionViewFlowLinearLayoutImpl {
        const layout = UICollectionViewFlowLinearLayoutImpl.new() as UICollectionViewFlowLinearLayoutImpl;
        layout._owner = owner;
        layout._curl = CATransition.animation();
        return layout;
    }

    public layoutAttributesForElementsInRect(rect: CGRect) {
        const owner = this._owner ? this._owner.get() : null;
        const originalLayoutAttribute = super.layoutAttributesForElementsInRect(rect);
        const visibleLayoutAttributes = [];
        if (owner) {
            if (owner.transformers && owner.transformers.indexOf('scale') > -1) {
                const count = originalLayoutAttribute.count;
                for (let i = 0; i < count; i++) {
                    const attributes = originalLayoutAttribute.objectAtIndex(i);
                    visibleLayoutAttributes[i] = attributes;
                    const frame = attributes.frame;
                    const width = attributes.frame.size.width * 0.75;
                    const height = attributes.frame.size.height * 0.75;
                    attributes.frame.size.width = width;
                    attributes.frame.size.height = height;
                    const spacing = owner.convertToSize(owner.spacing);
                    const distance = Math.abs(this.collectionView.contentOffset.x + this.collectionView.contentInset.left + spacing - frame.origin.x);
                    const scale = Math.min(Math.max(1 - distance / this.collectionView.bounds.size.width, 0.75), 1);
                    attributes.transform = CGAffineTransformScale(attributes.transform, 1, scale);
                }
            } else {
                return originalLayoutAttribute;
            }
        }
        return visibleLayoutAttributes as any;
    }

    public shouldInvalidateLayoutForBoundsChange(newBounds: CGRect): boolean {
        return true;
    }

    public initialLayoutAttributesForAppearingItemAtIndexPath(itemIndexPath: NSIndexPath): UICollectionViewLayoutAttributes {
        const attrs = super.initialLayoutAttributesForAppearingItemAtIndexPath(itemIndexPath);
        attrs.alpha = 1;
        return attrs;
    }

    public finalLayoutAttributesForDisappearingItemAtIndexPath(itemIndexPath: NSIndexPath): UICollectionViewLayoutAttributes {
        const attrs = super.finalLayoutAttributesForDisappearingItemAtIndexPath(itemIndexPath);
        attrs.alpha = 1;
        return attrs;
    }

    targetContentOffsetForProposedContentOffsetWithScrollingVelocity(proposedContentOffset: CGPoint, velocity: CGPoint) {
        const owner = this._owner ? this._owner.get() : null;
        if (!this.collectionView || !owner) {
            return super.targetContentOffsetForProposedContentOffsetWithScrollingVelocity(proposedContentOffset, velocity);
        }
        const size = owner._getRealWidthHeight();
        if (this.scrollDirection === UICollectionViewScrollDirection.Horizontal) {
            // Page width used for estimating and calculating paging.
            const pageWidth = size.width + this.minimumInteritemSpacing;

            // Make an estimation of the current page position.
            const approximatePage = this.collectionView.contentOffset.x / pageWidth;
            // Determine the current page based on velocity.
            const currentPage = velocity.x === 0 ? Math.round(approximatePage) : velocity.x < 0.0 ? Math.floor(approximatePage) : Math.ceil(approximatePage);

            // Create custom flickVelocity.
            const flickVelocity = velocity.x * 0.3;

            // Check how many pages the user flicked, if <= 1 then flickedPages should return 0.
            const flickedPages = Math.abs(Math.round(flickVelocity)) <= 1 ? 0 : Math.round(flickVelocity);

            const newPageIndex = currentPage + flickedPages;
            selectedIndexProperty.nativeValueChange(owner, Math.min(Math.max(newPageIndex, 0), owner._childrenCount - 1));
            // Calculate newHorizontalOffset.
            const newHorizontalOffset = newPageIndex * pageWidth - this.collectionView.contentInset.left;

            return CGPointMake(newHorizontalOffset, proposedContentOffset.y);
        } else {
            // Page height used for estimating and calculating paging.
            // let pageHeight = size.height + this.minimumLineSpacing;
            const pageHeight = size.height;

            // Make an estimation of the current page position.
            const approximatePage = Math.max(0, this.collectionView.contentOffset.y / pageHeight);

            // Determine the current page based on velocity.
            const currentPage = velocity.y === 0 ? Math.round(approximatePage) : velocity.y < 0.0 ? Math.floor(approximatePage) : Math.ceil(approximatePage);

            // Create custom flickVelocity.
            const flickVelocity = velocity.y * 0.3;

            // Check how many pages the user flicked, if <= 1 then flickedPages should return 0.
            const flickedPages = Math.abs(Math.round(flickVelocity)) <= 1 ? 0 : Math.round(flickVelocity);

            const newPageIndex = currentPage + flickedPages;
            selectedIndexProperty.nativeValueChange(owner, Math.min(Math.max(newPageIndex, 0), owner._childrenCount - 1));
            const newVerticalOffset = newPageIndex * pageHeight - this.collectionView.contentInset.top;

            return CGPointMake(proposedContentOffset.x, newVerticalOffset);
        }
    }
}
