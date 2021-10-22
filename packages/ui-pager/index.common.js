import { Builder, CSSType, CoercibleProperty, ContainerView, GridLayout, Label, Observable, ObservableArray, Property, Trace, addWeakEventListener, makeParser, makeValidator, removeWeakEventListener, } from '@nativescript/core';
import { layout } from '@nativescript/core/utils/utils';
export const ITEMLOADING = 'itemLoading';
export const ITEMDISPOSING = 'itemDisposing';
export const LOADMOREITEMS = 'loadMoreItems';
export var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = 'itemTemplate';
})(knownTemplates || (knownTemplates = {}));
export var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = 'itemTemplates';
})(knownMultiTemplates || (knownMultiTemplates = {}));
export var knownCollections;
(function (knownCollections) {
    knownCollections.items = 'items';
})(knownCollections || (knownCollections = {}));
export const pagerTraceCategory = 'ns-pager';
export function PagerLog(message) {
    Trace.write(message, pagerTraceCategory);
}
export function PagerError(message) {
    Trace.write(message, pagerTraceCategory, Trace.messageType.error);
}
const autoEffectiveItemHeight = 100;
const autoEffectiveItemWidth = 100;
export var Transformer;
(function (Transformer) {
    Transformer["SCALE"] = "scale";
})(Transformer || (Transformer = {}));
export var Indicator;
(function (Indicator) {
    Indicator["Disabled"] = "disable";
    Indicator["None"] = "none";
    Indicator["Worm"] = "worm";
    Indicator["Fill"] = "fill";
    Indicator["Swap"] = "swap";
    Indicator["THIN_WORM"] = "thin_worm";
    Indicator["Flat"] = "flat";
})(Indicator || (Indicator = {}));
const booleanConverter = (v) => String(v) === 'true';
let UNIQUE_VIEW_TYPE = 0;
let PagerBase = class PagerBase extends ContainerView {
    constructor() {
        super(...arguments);
        this.canGoRight = true;
        this.canGoLeft = true;
        this.loadMoreCount = 1;
        this.disableSwipe = false;
        this._itemTemplateSelectorBindable = new Label();
        this._defaultTemplate = {
            key: 'default',
            createView: () => {
                if (this.itemTemplate) {
                    return Builder.parse(this.itemTemplate, this);
                }
                return undefined;
            },
        };
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        this._itemIdGenerator = (_item, index) => index;
    }
    getChildView(index) {
        return this._childrenViews && this._childrenViews[index].view;
    }
    _removeView(view) {
        if (view instanceof PagerItem && this._childrenViews) {
            const index = this._childrenViews.findIndex(s => s.view === view);
            if (index !== -1) {
                this._removeChildView(index);
                this.refresh();
            }
        }
        else {
            super._removeView(view);
        }
    }
    _removeChildView(index) {
        this._childrenViews.splice(index, 1);
    }
    _addChildView(view, type) {
        this._childrenViews.push({ view, type });
    }
    _addChildFromBuilder(name, value) {
        if (value instanceof PagerItem && value.parent !== this) {
            if (!this._childrenViews) {
                this._childrenViews = [];
            }
            this._addChildView(value, UNIQUE_VIEW_TYPE++);
            if (this.isLoaded) {
                this.refresh();
            }
        }
    }
    get itemIdGenerator() {
        return this._itemIdGenerator;
    }
    set itemIdGenerator(generatorFn) {
        this._itemIdGenerator = generatorFn;
    }
    get itemTemplateSelector() {
        return this._itemTemplateSelector;
    }
    set itemTemplateSelector(value) {
        if (typeof value === 'string') {
            this._itemTemplateSelectorBindable.bind({
                sourceProperty: null,
                targetProperty: 'templateKey',
                expression: value,
            });
            this._itemTemplateSelector = (item, index, items) => {
                item['$index'] = index;
                if (this._itemTemplateSelectorBindable.bindingContext === item) {
                    this._itemTemplateSelectorBindable.bindingContext = null;
                }
                this._itemTemplateSelectorBindable.bindingContext = item;
                return this._itemTemplateSelectorBindable.get('templateKey');
            };
        }
        else if (typeof value === 'function') {
            this._itemTemplateSelector = value;
        }
    }
    onItemViewLoaderChanged() { }
    get itemViewLoader() {
        return this._itemViewLoader;
    }
    set itemViewLoader(value) {
        if (this._itemViewLoader !== value) {
            this._itemViewLoader = value;
            this.onItemViewLoaderChanged();
        }
    }
    _getItemTemplateKey(index) {
        let templateKey = 'default';
        if (this.itemTemplateSelector) {
            const dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }
        return templateKey;
    }
    _getItemTemplate(index) {
        const templateKey = this._getItemTemplateKey(index);
        const length = this._itemTemplatesInternal.length;
        for (let i = 0; i < length; i++) {
            if (this._itemTemplatesInternal[i].key === templateKey) {
                return this._itemTemplatesInternal[i];
            }
        }
        return this._itemTemplatesInternal[0];
    }
    _prepareItem(item, index) {
        if (this.items && item) {
            item.bindingContext = this._getDataItem(index);
        }
    }
    _getDataItem(index) {
        const thisItems = this.items;
        if (thisItems) {
            return thisItems && thisItems.getItem
                ? thisItems.getItem(index)
                : thisItems[index];
        }
    }
    _getDefaultItemContent(index) {
        const lbl = new Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value',
        });
        return lbl;
    }
    onLayout(left, top, right, bottom) {
        super.onLayout(left, top, right, bottom);
        this._effectiveItemWidth = this.getMeasuredWidth() - this.effectivePaddingLeft - this.effectivePaddingRight;
        this._effectiveItemHeight = this.getMeasuredHeight() - this.effectivePaddingTop - this.effectivePaddingBottom;
        if (global.isIOS && this.iosOverflowSafeAreaEnabled) {
            const safeArea = this.getSafeAreaInsets();
            this._effectiveItemHeight += safeArea.top + safeArea.bottom;
        }
    }
    convertToSize(length) {
        let size = 0;
        if (this.orientation === 'horizontal') {
            size = global.isIOS
                ? layout.getMeasureSpecSize(this._currentWidthMeasureSpec)
                : this.getMeasuredWidth();
        }
        else {
            size = global.isIOS
                ? layout.getMeasureSpecSize(this._currentHeightMeasureSpec)
                : this.getMeasuredHeight();
        }
        let converted = 0;
        if (length && length.unit === 'px') {
            converted = length.value;
        }
        else if (length && length.unit === 'dip') {
            converted = layout.toDevicePixels(length.value);
        }
        else if (length && length.unit === '%') {
            converted = size * length.value;
        }
        else if (typeof length === 'string') {
            if (length.indexOf('px') > -1) {
                converted = parseInt(length.replace('px', ''), 10);
            }
            else if (length.indexOf('dip') > -1) {
                converted = layout.toDevicePixels(parseInt(length.replace('dip', ''), 10));
            }
            else if (length.indexOf('%') > -1) {
                converted = size * (parseInt(length.replace('%', ''), 10) / 100);
            }
            else {
                converted = layout.toDevicePixels(parseInt(length, 10));
            }
        }
        else if (typeof length === 'number') {
            converted = layout.toDevicePixels(length);
        }
        if (isNaN(converted)) {
            return 0;
        }
        return converted;
    }
};
PagerBase.selectedIndexChangedEvent = 'selectedIndexChanged';
PagerBase.selectedIndexChangeEvent = 'selectedIndexChange';
PagerBase.scrollEvent = 'scroll';
PagerBase.swipeEvent = 'swipe';
PagerBase.swipeStartEvent = 'swipeStart';
PagerBase.swipeOverEvent = 'swipeOver';
PagerBase.swipeEndEvent = 'swipeEnd';
PagerBase.loadMoreItemsEvent = LOADMOREITEMS;
PagerBase.itemLoadingEvent = ITEMLOADING;
PagerBase.knownFunctions = ['itemTemplateSelector', 'itemIdGenerator'];
PagerBase = __decorate([
    CSSType('Pager')
], PagerBase);
export { PagerBase };
export class PagerItem extends GridLayout {
}
function onItemsChanged(pager, oldValue, newValue) {
    if (oldValue instanceof Observable) {
        removeWeakEventListener(oldValue, ObservableArray.changeEvent, pager.refresh, pager);
    }
    if (newValue instanceof Observable &&
        !(newValue instanceof ObservableArray)) {
        addWeakEventListener(newValue, ObservableArray.changeEvent, pager.refresh, pager);
    }
    if (!(newValue instanceof Observable) ||
        !(newValue instanceof ObservableArray)) {
        pager.refresh();
    }
    pager._onItemsChanged(oldValue, newValue);
}
function onItemTemplateChanged(pager, oldValue, newValue) {
    pager.itemTemplateUpdated(oldValue, newValue);
}
export const indicatorColorProperty = new Property({
    name: 'indicatorColor',
});
indicatorColorProperty.register(PagerBase);
export const indicatorSelectedColorProperty = new Property({
    name: 'indicatorSelectedColor',
});
indicatorSelectedColorProperty.register(PagerBase);
export const circularModeProperty = new Property({
    name: 'circularMode',
    defaultValue: false,
    valueConverter: booleanConverter,
});
circularModeProperty.register(PagerBase);
export const indicatorProperty = new Property({
    name: 'indicator',
    defaultValue: Indicator.None,
});
indicatorProperty.register(PagerBase);
export const selectedIndexProperty = new CoercibleProperty({
    name: 'selectedIndex',
    defaultValue: -1,
    coerceValue: (target, value) => {
        const items = target._childrenCount;
        if (items) {
            const max = items - 1;
            if (value < 0) {
                value = 0;
            }
            if (value > max) {
                value = max;
            }
        }
        else {
            value = -1;
        }
        return value;
    },
    valueConverter: (v) => parseInt(v, 10),
});
selectedIndexProperty.register(PagerBase);
export const spacingProperty = new Property({
    name: 'spacing',
    defaultValue: { value: 0, unit: 'dip' },
    affectsLayout: true,
});
spacingProperty.register(PagerBase);
export const peakingProperty = new Property({
    name: 'peaking',
    defaultValue: { value: 0, unit: 'dip' },
    affectsLayout: true,
});
peakingProperty.register(PagerBase);
export const itemsProperty = new Property({
    name: 'items',
    affectsLayout: true,
    valueChanged: onItemsChanged,
});
itemsProperty.register(PagerBase);
export const itemTemplateProperty = new Property({
    name: 'itemTemplate',
    affectsLayout: true,
    valueChanged: (target) => {
        target.refresh();
    },
});
itemTemplateProperty.register(PagerBase);
export const itemTemplatesProperty = new Property({
    name: 'itemTemplates',
    affectsLayout: true,
    valueConverter: (value) => {
        if (typeof value === 'string') {
            return Builder.parseMultipleTemplates(value);
        }
        return value;
    },
});
itemTemplatesProperty.register(PagerBase);
export const canGoRightProperty = new Property({
    name: 'canGoRight',
    defaultValue: false,
    valueConverter: booleanConverter,
});
canGoRightProperty.register(PagerBase);
export const canGoLeftProperty = new Property({
    name: 'canGoLeft',
    defaultValue: false,
    valueConverter: booleanConverter,
});
canGoLeftProperty.register(PagerBase);
const converter = makeParser(makeValidator('horizontal', 'vertical'));
export const orientationProperty = new Property({
    name: 'orientation',
    defaultValue: 'horizontal',
    affectsLayout: true,
    valueChanged: (target, oldValue, newValue) => {
        target.refresh();
    },
    valueConverter: converter,
});
orientationProperty.register(PagerBase);
export const disableSwipeProperty = new Property({
    name: 'disableSwipe',
    defaultValue: false,
    valueConverter: booleanConverter,
});
disableSwipeProperty.register(PagerBase);
export const perPageProperty = new Property({
    name: 'perPage',
    defaultValue: 1,
});
perPageProperty.register(PagerBase);
export const transformersProperty = new Property({
    name: 'transformers',
});
transformersProperty.register(PagerBase);
export const showIndicatorProperty = new Property({
    name: 'showIndicator',
    defaultValue: false,
    valueConverter: booleanConverter,
});
showIndicatorProperty.register(PagerBase);
export const autoPlayProperty = new Property({
    name: 'autoPlay',
    defaultValue: false,
    valueConverter: booleanConverter,
});
autoPlayProperty.register(PagerBase);
export const autoplayDelayProperty = new Property({
    name: 'autoPlayDelay',
    defaultValue: 3000,
});
autoplayDelayProperty.register(PagerBase);
//# sourceMappingURL=index.common.js.map