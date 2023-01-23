import { View } from '@nativescript/core';
import { PagerIndicatorBase } from './index.common';

export declare class PagerIndicator extends PagerIndicatorBase {}

export interface IndicatorHolder {
    setIndicator(indicator: PagerIndicator);
}
