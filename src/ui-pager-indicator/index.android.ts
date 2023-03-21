import { Color, profile } from '@nativescript/core';
import { Indicator, PagerIndicatorBase, colorProperty, itemsProperty, selectedColorProperty, typeProperty } from './index.common';

export * from './index.common';

export class PagerIndicator extends PagerIndicatorBase {
    nativeViewProtected: com.rd.PageIndicatorView2;
    setProgress(position: number, progress: number) {
        this.nativeViewProtected.setProgress(position, progress);
    }
    getCount(): number {
        return this.nativeViewProtected.getCount();
    }
    getSelection(): number {
        return this.nativeViewProtected.getSelection();
    }
    setInteractiveAnimation(animated?: boolean) {
        this.nativeViewProtected.setInteractiveAnimation(animated);
    }
    setSelection(index: number, animated: boolean = true) {
        if (animated) {
            this.nativeViewProtected.setSelection(index);
        } else {
            this.nativeViewProtected.setSelected(index);
        }
    }
    setCount(count: number) {
        this.nativeViewProtected.setCount(count);
    }
    withoutAnimation(callback: Function) {
        this.nativeViewProtected.setInteractiveAnimation(false);
        callback();
        this.nativeViewProtected.setInteractiveAnimation(true);
    }

    @profile()
    public createNativeView() {
        const nativeView = new com.rd.PageIndicatorView2(this._context);

        nativeView.setDynamicCount(true);
        nativeView.setInteractiveAnimation(true);
        return nativeView;
    }

    public initNativeView() {
        super.initNativeView();
        // this._indicatorView.setCount(this.items ? this.items.length : 0);
    }

    [typeProperty.setNative](value: Indicator) {
        const AnimationType = com.rd.animation.type.AnimationType;
        const nativeView = this.nativeViewProtected;
        switch (value) {
            case Indicator.Worm:
                nativeView.setAnimationType(AnimationType.WORM);
                break;
            case Indicator.Fill:
                nativeView.setAnimationType(AnimationType.FILL);
                break;
            case Indicator.Swap:
                nativeView.setAnimationType(AnimationType.SWAP);
                break;
            case Indicator.Thin_worm:
                nativeView.setAnimationType(AnimationType.THIN_WORM);
                break;
            default:
            case Indicator.None:
                nativeView.setAnimationType(AnimationType.NONE);
                break;
        }
    }

    [colorProperty.setNative](value: Color | string) {
        const color = !value || value instanceof Color ? (value as Color) : new Color(value);
        this.nativeViewProtected.setUnselectedColor(color ? color.android : null);
    }

    [selectedColorProperty.setNative](value: Color | string) {
        const color = !value || value instanceof Color ? (value as Color) : new Color(value);
        this.nativeViewProtected.setSelectedColor(color ? color.android : null);
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
            indicator.setSelection(selectedPosition);
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
