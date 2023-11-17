import { CSSType, Color, ItemsSource, Property, View, ViewBase } from '@nativescript/core';
import { IndicatorHolder } from '.';
export enum Indicator {
    Disabled = 'disable',
    None = 'none',
    Worm = 'worm',
    Fill = 'fill',
    Swap = 'swap',
    Thin_worm = 'thin_worm',
    Flat = 'flat'
}

export const colorProperty = new Property<PagerIndicatorBase, Color | string>({
    name: 'color'
});
export const selectedColorProperty = new Property<PagerIndicatorBase, Color | string>({
    name: 'selectedColor'
});
export const itemsProperty = new Property<PagerIndicatorBase, any>({
    name: 'items'
});
export const typeProperty = new Property<PagerIndicatorBase, Indicator>({
    name: 'type',
    defaultValue: Indicator.None
});
export const pagerViewIdProperty = new Property<PagerIndicatorBase, string>({
    name: 'pagerViewId'
});

@CSSType('PagerIndicator')
export abstract class PagerIndicatorBase extends View {
    public items: any[] | ItemsSource;
    public color: Color;
    public selectedColor: Color | string;
    public type: Indicator;

    pagerView: View & IndicatorHolder;
    pagerViewId: string;

    getPage() {
        if (this.page) {
            return this.page;
        } else {
            return this.getTopmost(this);
        }
    }
    getTopmost<View>(arg: ViewBase) {
        if (arg.parent) {
            return this.getTopmost(arg.parent);
        } else {
            return arg;
        }
    }

    disposeNativeView() {
        this.pagerView = null;
        super.disposeNativeView();
    }

    onLoaded() {
        super.onLoaded();
        if (this.pagerViewId) {
            this.setPagerView(this.getPage().getViewById(this.pagerViewId));
        }
    }

    setPagerView(view: View) {
        if (this.pagerView !== view) {
            if (this.pagerView) {
                this.pagerView.setIndicator(null);
                this.pagerView = null;
            }
            if (view?.['setIndicator']) {
                this.pagerView = view as View & IndicatorHolder;
                this.pagerView.setIndicator(this);
            }
        }
    }

    [pagerViewIdProperty.setNative](value) {
        if (this.page) {
            this.setPagerView(this.page?.getViewById(value));
        }
    }

    abstract setSelection(index: number, animated?: boolean);
    abstract setProgress(position: number, progress: number);
    abstract setCount(count: number);
    abstract getCount(): number;
    abstract getSelection(): number;
    abstract setInteractiveAnimation(animated?: boolean);
    abstract withoutAnimation(callback: Function);
}

colorProperty.register(PagerIndicatorBase);

selectedColorProperty.register(PagerIndicatorBase);

itemsProperty.register(PagerIndicatorBase);

typeProperty.register(PagerIndicatorBase);
pagerViewIdProperty.register(PagerIndicatorBase);
