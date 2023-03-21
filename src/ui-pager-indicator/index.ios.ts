import { Color } from '@nativescript/core';
import { Indicator, PagerIndicatorBase, colorProperty, itemsProperty, selectedColorProperty } from './index.common';

export * from './index.common';

export class PagerIndicator extends PagerIndicatorBase {
    nativeViewProtected: CHIBasePageControl;
    createNativeView() {
        switch (this.type) {
            case Indicator.Worm:
                return CHIPageControlAleppo.new();
            case Indicator.Fill:
                return CHIPageControlChimayo.new();
            case Indicator.Swap:
                return CHIPageControlPuya.new();
            case Indicator.Thin_worm:
                return CHIPageControlJalapeno.new();
            case Indicator.Flat:
                return CHIPageControlJaloro.new();
            default:
            case Indicator.None:
                return CHIPageControlAji.new();
        }
    }

    initNativeView() {
        super.initNativeView();
        const nativeView = this.nativeView;

        nativeView.tintColor = UIColor.whiteColor;
        nativeView.currentPageTintColor = UIColor.whiteColor;

        switch (this.type) {
            case Indicator.None:
            case Indicator.Worm:
            case Indicator.Fill:
            case Indicator.Swap:
            case Indicator.Thin_worm:
            case Indicator.Disabled:
                nativeView.radius = 4;
                break;

            case Indicator.Flat:
                nativeView.radius = 2;
                nativeView.transform = CGAffineTransformScale(CGAffineTransformIdentity, 0.7, 0.5);
                break;
        }
    }

    setProgress(position: number, progress: number) {
        this.nativeViewProtected.setWithProgressAnimated(progress, true);
    }
    getCount(): number {
        return this.nativeViewProtected.numberOfPages;
    }
    getSelection(): number {
        return this.nativeViewProtected.progress;
    }
    setInteractiveAnimation(animated?: boolean) {}
    setSelection(progress: number, animated: boolean = true) {
        this.nativeViewProtected.setWithProgressAnimated(progress, animated);
    }
    setCount(count: number) {
        this.nativeViewProtected.numberOfPages = count;
    }
    withoutAnimation(callback: Function) {
        callback();
    }

    [colorProperty.setNative](value: Color | string) {
        const color = !value || value instanceof Color ? (value as Color) : new Color(value);
        this.nativeViewProtected.tintColor = color ? color.ios : null;
    }

    [selectedColorProperty.setNative](value: Color | string) {
        const color = !value || value instanceof Color ? (value as Color) : new Color(value);
        this.nativeViewProtected.currentPageTintColor = color ? color.ios : null;
    }
}
