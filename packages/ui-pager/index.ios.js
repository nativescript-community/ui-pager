import { ChangeType, Color, Observable, ObservableArray, Property, ProxyViewContainer, StackLayout, Utils, View, profile } from '@nativescript/core';
import { layout } from '@nativescript/core/utils/utils';
import { ITEMDISPOSING, ITEMLOADING, Indicator, LOADMOREITEMS, PagerBase, autoPlayProperty, autoplayDelayProperty, disableSwipeProperty, indicatorColorProperty, indicatorProperty, indicatorSelectedColorProperty, itemTemplatesProperty, itemsProperty, orientationProperty, selectedIndexProperty, showIndicatorProperty } from './index.common';
export * from './index.common';
export { Transformer } from './index.common';
function notifyForItemAtIndex(owner, nativeView, view, eventName, index) {
    const args = {
        eventName,
        object: owner,
        index,
        view,
        ios: nativeView,
        android: undefined,
    };
    owner.notify(args);
    return args;
}
const main_queue = dispatch_get_current_queue();
export var ContentInsetAdjustmentBehavior;
(function (ContentInsetAdjustmentBehavior) {
    ContentInsetAdjustmentBehavior[ContentInsetAdjustmentBehavior["Always"] = 3] = "Always";
    ContentInsetAdjustmentBehavior[ContentInsetAdjustmentBehavior["Automatic"] = 0] = "Automatic";
    ContentInsetAdjustmentBehavior[ContentInsetAdjustmentBehavior["Never"] = 2] = "Never";
    ContentInsetAdjustmentBehavior[ContentInsetAdjustmentBehavior["ScrollableAxes"] = 1] = "ScrollableAxes";
})(ContentInsetAdjustmentBehavior || (ContentInsetAdjustmentBehavior = {}));
function parseContentInsetAdjustmentBehavior(value) {
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
    }
    else {
        return value;
    }
}
export const contentInsetAdjustmentBehaviorProperty = new Property({
    name: 'contentInsetAdjustmentBehavior',
    valueConverter: parseContentInsetAdjustmentBehavior,
    defaultValue: ContentInsetAdjustmentBehavior.Automatic
});
var UICellView = /** @class */ (function (_super) {
    __extends(UICellView, _super);
    function UICellView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICellView.prototype.layoutSubviews = function () {
        var view = this.view && this.view.get();
        if (!view) {
            return;
        }
        this.frame = this.superview.bounds;
        var size = this.bounds.size;
        View.layoutChild(null, view, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
    };
    return UICellView;
}(UIView));
const PFLAG_FORCE_LAYOUT = 1;
export class Pager extends PagerBase {
    constructor() {
        super();
        this.lastEvent = 0;
        this._disableSwipe = false;
        this._disableAnimation = false;
        this._preparingCell = false;
        this._isRefreshing = false;
        this._isInit = false;
        this._innerWidth = 0;
        this._innerHeight = 0;
        this._observableArrayHandler = (args) => {
            if (!this.pager) {
                return;
            }
            if (this.indicatorView &&
                this._observableArrayInstance &&
                this._observableArrayInstance.length) {
                this.indicatorView.numberOfPages = this._observableArrayInstance.length;
            }
            const collectionView = this.pager;
            if (collectionView) {
                try {
                    let offset = 0;
                    collectionView.performBatchUpdatesCompletion(() => {
                        this._isRefreshing = true;
                        const array = [];
                        switch (args.action) {
                            case ChangeType.Add:
                                for (let i = 0; i < args.addedCount; i++) {
                                    array.push(NSIndexPath.indexPathForRowInSection(args.index + i, 0));
                                }
                                offset =
                                    collectionView.contentSize.width -
                                        collectionView.contentOffset.x;
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
                                }
                                else {
                                    const addedArray = [];
                                    for (let i = 0; i < args.addedCount; i++) {
                                        addedArray.push(NSIndexPath.indexPathForRowInSection(args.index + i, 0));
                                    }
                                    collectionView.insertItemsAtIndexPaths(addedArray);
                                }
                                break;
                            case ChangeType.Update:
                                collectionView.reloadItemsAtIndexPaths([
                                    NSIndexPath.indexPathForRowInSection(args.index, 0),
                                ]);
                                break;
                            default:
                                break;
                        }
                        this._initAutoPlay(this.autoPlay);
                        if (this.itemCount === 0) {
                            this._isInit = false;
                        }
                    }, null);
                }
                catch (err) { }
            }
        };
        this._isDataDirty = false;
        this.iosOverflowSafeAreaEnabledLayoutHackNeeded = true;
        this._map = new Map();
    }
    get pager() {
        return this._pager;
    }
    get indicatorView() {
        return this._indicatorView;
    }
    createNativeView() {
        const nativeView = UIView.new();
        this._layout = UICollectionViewFlowLinearLayoutImpl.initWithOwner(new WeakRef(this));
        this._layout.scrollDirection =
            1;
        this._layout.minimumInteritemSpacing = 0;
        const pager = this._pager = UICollectionView.alloc().initWithFrameCollectionViewLayout(CGRectZero, this._layout);
        pager.backgroundColor = UIColor.clearColor;
        pager.autoresizesSubviews = false;
        pager.autoresizingMask = 0;
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
        nativeView.dataSource = this._dataSource = UICollectionViewDataSourceImpl.initWithOwner(new WeakRef(this));
        nativeView.scrollEnabled = !this.disableSwipe;
        if (this.orientation === 'vertical') {
            this._layout.scrollDirection =
                0;
            nativeView.alwaysBounceVertical = true;
            nativeView.alwaysBounceHorizontal = false;
        }
        else {
            this._layout.scrollDirection =
                1;
            nativeView.alwaysBounceHorizontal = true;
            nativeView.alwaysBounceVertical = false;
        }
        this._setIndicator(this.indicator);
        this._delegate = UICollectionDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
        this._initAutoPlay(this.autoPlay);
    }
    _getRealWidthHeight() {
        let height = 0;
        let width = 0;
        width =
            (layout.toDeviceIndependentPixels(this._effectiveItemWidth) -
                (this.perPage * 2 * this._getSpacing() +
                    this._getPeaking() * 2)) /
                this.perPage;
        height =
            (layout.toDeviceIndependentPixels(this._effectiveItemHeight) -
                (this.perPage * 2 * this._getSpacing() +
                    this._getPeaking() * 2)) /
                this.perPage;
        return { height, width };
    }
    _nextIndex() {
        if (this.circularMode) {
            return 0;
        }
        else {
            const next = this.selectedIndex + 1;
            if (next > this.lastIndex) {
                return 0;
            }
            return next;
        }
    }
    _initAutoPlay(value) {
        if (!this.items || this.items.length === 0) {
            return;
        }
        if (!value) {
            if (this._autoPlayInterval) {
                clearInterval(this._autoPlayInterval);
                this._autoPlayInterval = undefined;
            }
        }
        else {
            if (this.isLayoutValid && !this._autoPlayInterval) {
                this._autoPlayInterval = setInterval(() => {
                    this.selectedIndex = this._nextIndex();
                }, this.autoPlayDelay);
            }
        }
    }
    getPosition(index) {
        let position = index;
        if (this.circularMode) {
            if (position === 0) {
                position = this.lastDummy;
            }
            else if (position === this.firstDummy) {
                position = 0;
            }
            else {
                position = position - 1;
            }
        }
        return position;
    }
    get itemCount() {
        return this._childrenCount
            ? this._childrenCount + (this.circularMode ? 2 : 0)
            : 0;
    }
    get lastIndex() {
        if (this.items && this.items.length === 0) {
            return 0;
        }
        return this.circularMode ? this.itemCount - 3 : this.itemCount - 1;
    }
    get firstDummy() {
        const count = this.itemCount;
        if (count === 0) {
            return 0;
        }
        return this.itemCount - 1;
    }
    get lastDummy() {
        return this.lastIndex;
    }
    _setIndicator(value) {
        if (this._indicatorView) {
            this._indicatorView.removeFromSuperview();
        }
        switch (value) {
            case Indicator.None:
                this._indicatorView = CHIPageControlAji.new();
                break;
            case Indicator.Worm:
                this._indicatorView = CHIPageControlAleppo.new();
                break;
            case Indicator.Fill:
                this._indicatorView = CHIPageControlChimayo.new();
                break;
            case Indicator.Swap:
                this._indicatorView = CHIPageControlPuya.new();
                break;
            case Indicator.THIN_WORM:
                this._indicatorView = CHIPageControlJalapeno.new();
                break;
            case Indicator.Flat:
                this._indicatorView = CHIPageControlJaloro.new();
                break;
            default:
                break;
        }
        this._indicatorView.tintColor = UIColor.whiteColor;
        this._indicatorView.currentPageTintColor = UIColor.whiteColor;
    }
    get _childrenCount() {
        var _a, _b;
        return ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this._childrenViews) === null || _b === void 0 ? void 0 : _b.length) || 0;
    }
    itemTemplateUpdated(oldData, newData) { }
    _setNativeClipToBounds() {
        this.pager.clipsToBounds = true;
    }
    [orientationProperty.setNative](value) {
        if (value === 'horizontal') {
            this._layout.scrollDirection =
                1;
        }
        else {
            this._layout.scrollDirection =
                0;
        }
    }
    eachChildView(callback) {
        this._map.forEach((view, key) => callback(view));
    }
    eachChild(callback) {
        this._map.forEach((view, key) => callback(view));
    }
    _updateScrollPosition() {
        const view = this.pager;
        const size = this.orientation === 'vertical'
            ? view.contentSize.height
            : view.contentSize.width;
        if (!view || size === 0) {
            return;
        }
        this._scrollToIndexAnimated(this.selectedIndex, false);
    }
    [selectedIndexProperty.setNative](value) {
        if (this.isLoaded) {
            this.scrollToIndexAnimated(value, !this.disableAnimation);
        }
    }
    [itemTemplatesProperty.getDefault]() {
        return null;
    }
    [itemTemplatesProperty.setNative](value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            for (let i = 0, length = value.length; i < length; i++) {
                this.pager.registerClassForCellWithReuseIdentifier(PagerCell.class(), value[i].key);
            }
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
    }
    [itemsProperty.setNative](value) {
        if (this.indicatorView && value && value.length) {
            this.indicatorView.numberOfPages = value.length;
        }
        if (this._observableArrayInstance) {
            this._observableArrayInstance.off(ObservableArray.changeEvent, this._observableArrayHandler);
            this._observableArrayInstance = null;
        }
        if (value instanceof ObservableArray) {
            this._observableArrayInstance = value;
            this._observableArrayInstance.on(ObservableArray.changeEvent, this._observableArrayHandler);
        }
        else {
            this.refresh();
        }
        if (!value) {
            this._isInit = false;
        }
        selectedIndexProperty.coerce(this);
    }
    [autoPlayProperty.setNative](value) {
        this._initAutoPlay(value);
    }
    [autoplayDelayProperty.setNative](value) {
        if (this._autoPlayInterval) {
            clearInterval(this._autoPlayInterval);
            this._autoPlayInterval = undefined;
            this._initAutoPlay(this.autoPlay);
        }
    }
    [showIndicatorProperty.setNative](value) {
        if (!this.indicatorView) {
            this._setIndicator(this.indicatorView);
        }
        if (!this.nativeView) {
            return;
        }
        this.indicatorView.center = CGPointMake(this.nativeView.center.x, this.nativeView.bounds.size.height -
            this.indicatorView.intrinsicContentSize.height);
        const hasParent = this.indicatorView.superview;
        if (value) {
            if (!hasParent) {
                this.nativeView.addSubview(this.indicatorView);
            }
        }
        else {
            if (hasParent) {
                this.indicatorView.removeFromSuperview();
            }
        }
    }
    _onItemsChanged(oldValue, newValue) { }
    _scrollToIndexAnimated(index, animate) {
        if (!this.pager)
            return;
        const contentSize = this.pager.contentSize;
        const size = this.orientation === 'vertical'
            ? contentSize.height
            : contentSize.width;
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
            }
            else if (frame.currentPage !== this.page) {
                return selectedIndexProperty.nativeValueChange(this, maxMinIndex);
            }
        }
        dispatch_async(main_queue, () => {
            this.pager.scrollToItemAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(maxMinIndex, 0), this.orientation === 'vertical'
                ? 2
                : 16, !!animate);
            selectedIndexProperty.nativeValueChange(this, maxMinIndex);
        });
    }
    scrollToIndexAnimated(index, animate) {
        this._scrollToIndexAnimated(index, animate);
    }
    refresh() {
        if (!this.isLoaded || !this.nativeView) {
            this._isDataDirty = true;
            return;
        }
        this._isDataDirty = false;
        this._lastLayoutKey = this._innerWidth + '_' + this._innerHeight;
        this._map.forEach((view, nativeView, map) => {
            if (!(view.bindingContext instanceof Observable)) {
                view.bindingContext = null;
            }
        });
        this.pager.reloadData();
        this.pager.collectionViewLayout.invalidateLayout();
        this._updateScrollPosition();
        this._initAutoPlay(this.autoPlay);
    }
    onLoaded() {
        super.onLoaded();
        if (this.showIndicator && this.indicatorView) {
            this.nativeView.addSubview(this.indicatorView);
        }
        if (this._isDataDirty && this._innerWidth !== undefined && this._innerHeight !== undefined) {
            this.refresh();
        }
        this.pager.delegate = this._delegate;
        if (!this.items && this._childrenCount > 0) {
            selectedIndexProperty.coerce(this);
            this._updateScrollPosition();
        }
    }
    onUnloaded() {
        if (this.pager) {
            this.pager.delegate = null;
        }
        super.onUnloaded();
    }
    disposeNativeView() {
        this._delegate = null;
        this._dataSource = null;
        this._layout = null;
        if (this._observableArrayInstance) {
            this._observableArrayInstance.off(ObservableArray.changeEvent, this._observableArrayHandler);
            this._observableArrayInstance = null;
        }
        super.disposeNativeView();
    }
    [indicatorProperty.setNative](value) {
        this._setIndicator(value);
    }
    [indicatorColorProperty.setNative](value) {
        if (this.indicatorView) {
            const color = (!value || value instanceof Color) ? value : new Color(value);
            this.indicatorView.tintColor = color ? color.ios : null;
        }
    }
    [indicatorSelectedColorProperty.setNative](value) {
        if (this.indicatorView) {
            const color = (!value || value instanceof Color) ? value : new Color(value);
            this.indicatorView.currentPageTintColor = color ? color.ios : null;
        }
    }
    [disableSwipeProperty.setNative](value) {
        this._pager.scrollEnabled = !value;
        this._disableSwipe = value;
    }
    [contentInsetAdjustmentBehaviorProperty.setNative](value) {
        this._pager.contentInsetAdjustmentBehavior = value;
    }
    get disableAnimation() {
        return this._disableAnimation;
    }
    set disableAnimation(value) {
        this._disableAnimation = value;
    }
    _removeContainer(cell, index) {
        let view = cell.view;
        const args = {
            eventName: ITEMDISPOSING,
            object: this,
            index,
            android: undefined,
            ios: cell,
            view,
        };
        this.notify(args);
        view = args.view;
        if (view && view.parent) {
            if (!(view.parent instanceof Pager)) {
                this._removeView(view.parent);
            }
            view.parent._removeView(view);
        }
        this._map.delete(cell);
    }
    onMeasure(widthMeasureSpec, heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        this._map.forEach((childView, pagerCell) => {
            View.measureChild(this, childView, childView._currentWidthMeasureSpec, childView._currentHeightMeasureSpec);
        });
    }
    updateInnerSize() {
        const width = this.getMeasuredWidth();
        const height = this.getMeasuredHeight();
        this._innerWidth = width - this.effectivePaddingLeft - this.effectivePaddingRight;
        this._innerHeight = height - this.effectivePaddingTop - this.effectivePaddingBottom;
    }
    onLayout(left, top, right, bottom) {
        super.onLayout(left, top, right, bottom);
        this.updateInnerSize();
        if (!this.nativeView) {
            return;
        }
        this.pager.frame = this.nativeView.bounds;
        if (this.indicatorView && this.indicatorView.intrinsicContentSize) {
            this.indicatorView.center = CGPointMake(this.nativeView.center.x, this.nativeView.bounds.size.height -
                this.indicatorView.intrinsicContentSize.height);
        }
        const layoutView = this.pager.collectionViewLayout;
        if (!layoutView) {
            return;
        }
        layoutView.invalidateLayout();
        const size = this._getSize();
        this._map.forEach((childView, pagerCell) => {
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            View.layoutChild(this, childView, 0, 0, width, height);
        });
        const layoutKey = this._innerWidth + '_' + this._innerHeight;
        if (this._lastLayoutKey !== layoutKey) {
            this.refresh();
        }
    }
    requestLayout() {
        if (!this._preparingCell) {
            super.requestLayout();
        }
    }
    _prepareCell(cell, indexPath) {
        try {
            this._preparingCell = true;
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
                eventName: ITEMLOADING,
                object: this,
                index,
                android: undefined,
                ios: cell,
                view,
                bindingContext,
            };
            this.notify(args);
            view = args.view || this._getDefaultItemContent(indexPath.row);
            if (view instanceof ProxyViewContainer) {
                const sp = new StackLayout();
                sp.addChild(view);
                view = sp;
            }
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            }
            else if (cell.view !== view) {
                this._map.delete(cell);
                this._removeContainer(cell, index);
                cell.view.nativeViewProtected.removeFromSuperview();
                cell.owner = new WeakRef(view);
            }
            if (view) {
                view.bindingContext = bindingContext;
            }
            this._map.set(cell, view);
            if (view && !view.parent) {
                this._addView(view);
                if (this.iosOverflowSafeArea) {
                    const innerView = UICellView.new();
                    innerView.view = new WeakRef(view);
                    innerView.addSubview(view.nativeViewProtected);
                    cell.contentView.addSubview(innerView);
                }
                else {
                    cell.contentView.addSubview(view.nativeViewProtected);
                }
            }
            this._layoutCell(view, indexPath);
        }
        finally {
            this._preparingCell = false;
        }
    }
    _layoutCell(cellView, index) {
        if (cellView) {
            const size = this._getSize();
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            const widthMeasureSpec = layout.makeMeasureSpec(width, layout.EXACTLY);
            const heightMeasureSpec = layout.makeMeasureSpec(height, layout.EXACTLY);
            const measured = View.measureChild(this, cellView, widthMeasureSpec, heightMeasureSpec);
        }
    }
    get horizontalOffset() {
        return this.pager ? this.pager.contentOffset.x : 0;
    }
    get verticalOffset() {
        return this.pager ? this.pager.contentOffset.y : 0;
    }
    _getSpacing() {
        return layout.toDeviceIndependentPixels(this.convertToSize(this.spacing));
    }
    _getPeaking() {
        return layout.toDeviceIndependentPixels(this.convertToSize(this.peaking));
    }
    _getSize() {
        let width = layout.toDeviceIndependentPixels(this._effectiveItemWidth);
        let height = layout.toDeviceIndependentPixels(this._effectiveItemHeight);
        if (this.orientation === 'vertical') {
            height =
                (height - (this._getSpacing() * 2 + this._getPeaking() * 2)) /
                    this.perPage;
        }
        else {
            width =
                (width - (this._getSpacing() * 2 + this._getPeaking() * 2)) /
                    this.perPage;
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
__decorate([
    profile
], Pager.prototype, "refresh", null);
var PagerCell = /** @class */ (function (_super) {
    __extends(PagerCell, _super);
    function PagerCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PagerCell.prototype, "view", {
        get: function () {
            return this.owner ? this.owner.get() : null;
        },
        enumerable: true,
        configurable: true
    });
    PagerCell.initWithEmptyBackground = function () {
        var cell = PagerCell.new();
        // Clear background by default - this will make cells transparent
        cell.backgroundColor = null;
        return cell;
    };
    PagerCell.prototype.willMoveToSuperview = function (newSuperview) {
        var parent = (this.view ? this.view.parent : null);
        // When inside Pager and there is no newSuperview this cell is
        // removed from native visual tree so we remove it from our tree too.
        if (parent && !newSuperview) {
            parent._removeContainer(this, this.index);
        }
    };
    return PagerCell;
}(UICollectionViewCell));
var UICollectionDelegateImpl = /** @class */ (function (_super) {
    __extends(UICollectionDelegateImpl, _super);
    function UICollectionDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICollectionDelegateImpl_1 = UICollectionDelegateImpl;
    UICollectionDelegateImpl.initWithOwner = function (owner) {
        var delegate = UICollectionDelegateImpl_1.alloc().init();
        delegate._owner = owner;
        return delegate;
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutInsetForSectionAtIndex = function (collectionView, collectionViewLayout, section) {
        var owner = this._owner ? this._owner.get() : null;
        if (owner) {
            var inset = owner._getSpacing() + owner._getPeaking();
            if (owner.orientation === 'vertical') {
                return new UIEdgeInsets({
                    bottom: inset,
                    left: 0,
                    right: 0,
                    top: inset,
                });
            }
            return new UIEdgeInsets({
                bottom: 0,
                left: inset,
                right: inset,
                top: 0,
            });
        }
        return new UIEdgeInsets({ bottom: 0, left: 0, right: 0, top: 0 });
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutSizeForItemAtIndexPath = function (collectionView, collectionViewLayout, indexPath) {
        var owner = this._owner && this._owner.get();
        if (!owner)
            return CGSizeZero;
        var size = owner._getSize();
        return CGSizeMake(size.width, size.height);
    };
    UICollectionDelegateImpl.prototype.collectionViewWillDisplayCellForItemAtIndexPath = function (collectionView, cell, indexPath) {
        var owner = this._owner && this._owner.get();
        if (owner) {
            if (!owner._isInit) {
                owner._updateScrollPosition();
                owner._isInit = true;
            }
            if (owner.items &&
                indexPath.row === owner.lastIndex - owner.loadMoreCount) {
                owner.notify({
                    eventName: LOADMOREITEMS,
                    object: owner,
                });
            }
        }
        if (cell.preservesSuperviewLayoutMargins) {
            cell.preservesSuperviewLayoutMargins = false;
        }
        if (cell.layoutMargins) {
            cell.layoutMargins = UIEdgeInsetsZero;
        }
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutMinimumLineSpacingForSectionAtIndex = function (collectionView, collectionViewLayout, section) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return 0;
        var result = owner._getSpacing();
        return result;
    };
    UICollectionDelegateImpl.prototype.scrollViewWillBeginDragging = function (scrollView) {
        var owner = this._owner && this._owner.get();
        if (owner) {
            if (owner.lastEvent === 0) {
                owner.notify({
                    eventName: Pager.swipeStartEvent,
                    object: owner,
                });
                owner.lastEvent = 1;
            }
        }
    };
    UICollectionDelegateImpl.prototype.scrollViewDidEndScrollingAnimation = function (scrollView) {
        var owner = this._owner ? this._owner.get() : null;
        if (owner) {
            owner.notify({
                eventName: Pager.swipeEvent,
                object: owner,
            });
        }
    };
    UICollectionDelegateImpl.prototype.scrollViewDidScroll = function (scrollView) {
        var owner = this._owner.get();
        if (owner) {
            var width = void 0;
            var offset = void 0;
            var size = owner._getRealWidthHeight();
            var total = void 0;
            if (owner.orientation === 'vertical') {
                width = size.height;
                offset = scrollView.contentOffset.y;
                total =
                    scrollView.contentSize.height -
                        scrollView.bounds.size.height;
            }
            else {
                width = size.width;
                offset = scrollView.contentOffset.x;
                total =
                    scrollView.contentSize.width - scrollView.bounds.size.width;
            }
            var percent = offset / total;
            var progress = percent * (owner.itemCount - 1);
            if (owner.indicatorView &&
                owner.indicatorView.setWithProgressAnimated &&
                !Number.isNaN(progress)) {
                owner.indicatorView.progress = progress;
            }
            var index = parseInt(progress.toFixed(0), 10);
            if (owner.selectedIndex !== index && !Number.isNaN(index)) {
                //  selectedIndexProperty.nativeValueChange(owner, index);
            }
            owner.notify({
                object: owner,
                eventName: Pager.scrollEvent,
                selectedIndex: Math.floor(progress),
                currentPosition: progress,
                scrollX: owner.horizontalOffset,
                scrollY: owner.verticalOffset,
            });
            if (owner.lastEvent === 1) {
                owner.notify({
                    eventName: Pager.swipeOverEvent,
                    object: owner,
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
    };
    UICollectionDelegateImpl.prototype.scrollViewDidEndDraggingWillDecelerate = function (scrollView, decelerate) {
    };
    UICollectionDelegateImpl.prototype.scrollViewWillEndDraggingWithVelocityTargetContentOffset = function (scrollView, velocity, targetContentOffset) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return;
        if (owner.lastEvent === 1) {
            owner.notify({
                eventName: Pager.swipeEndEvent,
                object: owner,
            });
            owner.lastEvent = 0;
        }
    };
    var UICollectionDelegateImpl_1;
    UICollectionDelegateImpl = UICollectionDelegateImpl_1 = __decorate([
        ObjCClass(UICollectionViewDelegate, UICollectionViewDelegateFlowLayout)
    ], UICollectionDelegateImpl);
    return UICollectionDelegateImpl;
}(NSObject));
var UICollectionViewDataSourceImpl = /** @class */ (function (_super) {
    __extends(UICollectionViewDataSourceImpl, _super);
    function UICollectionViewDataSourceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICollectionViewDataSourceImpl_1 = UICollectionViewDataSourceImpl;
    UICollectionViewDataSourceImpl.initWithOwner = function (owner) {
        var delegate = UICollectionViewDataSourceImpl_1.alloc().init();
        delegate._owner = owner;
        return delegate;
    };
    UICollectionViewDataSourceImpl.prototype.collectionViewCellForItemAtIndexPath = function (collectionView, indexPath) {
        var owner = this._owner ? this._owner.get() : null;
        var cell;
        var count = 0;
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
            var index = indexPath.row;
            var data = owner._childrenViews[index];
            var viewType = data.type;
            owner._preparingCell = true;
            collectionView.registerClassForCellWithReuseIdentifier(PagerCell.class(), "static-" + viewType);
            cell =
                collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath("static-" + viewType, indexPath) || PagerCell.initWithEmptyBackground();
            cell.index = index;
            var view = data.view;
            // if (view instanceof ProxyViewContainer) {
            //     let sp = new StackLayout();
            //     sp.addChild(view);
            //     view = sp;
            // }
            // If cell is reused it has old content - remove it first.
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            }
            else if (cell.view !== view) {
                owner._removeView(view);
                cell.view.nativeViewProtected.removeFromSuperview();
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
                var innerView = UICellView.new();
                innerView.view = new WeakRef(view);
                innerView.addSubview(view.nativeViewProtected);
                cell.contentView.addSubview(innerView);
                owner._map.set(cell, view);
                // } else {
                //     cell.contentView.addSubview(view.nativeViewProtected);
                // }
            }
            view.iosOverflowSafeArea = owner.iosOverflowSafeArea;
            view['iosIgnoreSafeArea'] = owner['iosIgnoreSafeArea'];
            owner._layoutCell(view, indexPath);
            var size = owner._getSize();
            var width = layout.toDevicePixels(size.width);
            var height = layout.toDevicePixels(size.height);
            if (view && view.isLayoutRequired) {
                View.layoutChild(owner, view, 0, 0, width, height);
            }
            owner._preparingCell = false;
            return cell;
        }
        var template = owner && owner._getItemTemplate(indexPath.row);
        cell =
            collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(template.key, indexPath) || PagerCell.initWithEmptyBackground();
        cell.index = indexPath;
        if (owner) {
            var size = owner._getSize();
            owner._prepareCell(cell, indexPath);
            var cellView = cell.view;
            cellView.iosOverflowSafeArea = owner.iosOverflowSafeArea;
            cellView['iosIgnoreSafeArea'] = owner['iosIgnoreSafeArea'];
            if (!owner.iosOverflowSafeAreaEnabled && cellView && cellView.isLayoutRequired) {
                View.layoutChild(owner, cellView, 0, 0, layout.toDevicePixels(size.width), layout.toDevicePixels(size.height));
            }
        }
        return cell;
    };
    UICollectionViewDataSourceImpl.prototype.collectionViewNumberOfItemsInSection = function (collectionView, section) {
        var owner = this._owner ? this._owner.get() : null;
        // make sure we dont start to load static view if the pager is not loaded.
        // otherwise static items wont "load"
        if (!owner || !owner.isLoaded)
            return 0;
        return owner.circularMode ? owner.itemCount : owner._childrenCount;
    };
    UICollectionViewDataSourceImpl.prototype.numberOfSectionsInCollectionView = function (collectionView) {
        return 1;
    };
    var UICollectionViewDataSourceImpl_1;
    UICollectionViewDataSourceImpl = UICollectionViewDataSourceImpl_1 = __decorate([
        ObjCClass(UICollectionViewDataSource)
    ], UICollectionViewDataSourceImpl);
    return UICollectionViewDataSourceImpl;
}(NSObject));
var UICollectionViewFlowLinearLayoutImpl = /** @class */ (function (_super) {
    __extends(UICollectionViewFlowLinearLayoutImpl, _super);
    function UICollectionViewFlowLinearLayoutImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICollectionViewFlowLinearLayoutImpl.initWithOwner = function (owner) {
        var layout = UICollectionViewFlowLinearLayoutImpl.new();
        layout._owner = owner;
        layout._curl = CATransition.animation();
        return layout;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.layoutAttributesForElementsInRect = function (rect) {
        var owner = this._owner ? this._owner.get() : null;
        var originalLayoutAttribute = _super.prototype.layoutAttributesForElementsInRect.call(this, rect);
        var visibleLayoutAttributes = [];
        if (owner) {
            if (owner.transformers &&
                owner.transformers.indexOf('scale') > -1) {
                var count = originalLayoutAttribute.count;
                for (var i = 0; i < count; i++) {
                    var attributes = originalLayoutAttribute.objectAtIndex(i);
                    visibleLayoutAttributes[i] = attributes;
                    var frame = attributes.frame;
                    var width = attributes.frame.size.width * 0.75;
                    var height = attributes.frame.size.height * 0.75;
                    attributes.frame.size.width = width;
                    attributes.frame.size.height = height;
                    var spacing = owner.convertToSize(owner.spacing);
                    var distance = Math.abs(this.collectionView.contentOffset.x +
                        this.collectionView.contentInset.left +
                        spacing -
                        frame.origin.x);
                    var scale = Math.min(Math.max(1 -
                        distance /
                            this.collectionView.bounds.size.width, 0.75), 1);
                    attributes.transform = CGAffineTransformScale(attributes.transform, 1, scale);
                }
            }
            else {
                return originalLayoutAttribute;
            }
        }
        return visibleLayoutAttributes;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.shouldInvalidateLayoutForBoundsChange = function (newBounds) {
        return true;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.initialLayoutAttributesForAppearingItemAtIndexPath = function (itemIndexPath) {
        var attrs = _super.prototype.initialLayoutAttributesForAppearingItemAtIndexPath.call(this, itemIndexPath);
        attrs.alpha = 1;
        return attrs;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.finalLayoutAttributesForDisappearingItemAtIndexPath = function (itemIndexPath) {
        var attrs = _super.prototype.finalLayoutAttributesForDisappearingItemAtIndexPath.call(this, itemIndexPath);
        attrs.alpha = 1;
        return attrs;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.targetContentOffsetForProposedContentOffsetWithScrollingVelocity = function (proposedContentOffset, velocity) {
        var owner = this._owner ? this._owner.get() : null;
        if (!this.collectionView || !owner) {
            return _super.prototype.targetContentOffsetForProposedContentOffsetWithScrollingVelocity.call(this, proposedContentOffset, velocity);
        }
        var size = owner._getRealWidthHeight();
        if (this.scrollDirection === UICollectionViewScrollDirection.Horizontal) {
            // Page width used for estimating and calculating paging.
            var pageWidth = size.width + this.minimumInteritemSpacing;
            // Make an estimation of the current page position.
            var approximatePage = this.collectionView.contentOffset.x / pageWidth;
            // Determine the current page based on velocity.
            var currentPage = velocity.x === 0
                ? Math.round(approximatePage)
                : velocity.x < 0.0
                    ? Math.floor(approximatePage)
                    : Math.ceil(approximatePage);
            // Create custom flickVelocity.
            var flickVelocity = velocity.x * 0.3;
            // Check how many pages the user flicked, if <= 1 then flickedPages should return 0.
            var flickedPages = Math.abs(Math.round(flickVelocity)) <= 1
                ? 0
                : Math.round(flickVelocity);
            var newPageIndex = currentPage + flickedPages;
            selectedIndexProperty.nativeValueChange(owner, Math.min(Math.max(newPageIndex, 0), owner._childrenCount - 1));
            // Calculate newHorizontalOffset.
            var newHorizontalOffset = newPageIndex * pageWidth -
                this.collectionView.contentInset.left;
            return CGPointMake(newHorizontalOffset, proposedContentOffset.y);
        }
        else {
            // Page height used for estimating and calculating paging.
            // let pageHeight = size.height + this.minimumLineSpacing;
            var pageHeight = size.height;
            // Make an estimation of the current page position.
            var approximatePage = Math.max(0, this.collectionView.contentOffset.y / pageHeight);
            // Determine the current page based on velocity.
            var currentPage = velocity.y === 0
                ? Math.round(approximatePage)
                : velocity.y < 0.0
                    ? Math.floor(approximatePage)
                    : Math.ceil(approximatePage);
            // Create custom flickVelocity.
            var flickVelocity = velocity.y * 0.3;
            // Check how many pages the user flicked, if <= 1 then flickedPages should return 0.
            var flickedPages = Math.abs(Math.round(flickVelocity)) <= 1
                ? 0
                : Math.round(flickVelocity);
            var newPageIndex = currentPage + flickedPages;
            selectedIndexProperty.nativeValueChange(owner, Math.min(Math.max(newPageIndex, 0), owner._childrenCount - 1));
            var newVerticalOffset = newPageIndex * pageHeight -
                this.collectionView.contentInset.top;
            return CGPointMake(proposedContentOffset.x, newVerticalOffset);
        }
    };
    return UICollectionViewFlowLinearLayoutImpl;
}(UICollectionViewFlowLayout));
//# sourceMappingURL=index.ios.js.map