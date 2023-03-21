/// <reference path="android-declarations.d.ts"/>

declare module com {
	export module rd {
		export class IndicatorManager extends java.lang.Object implements com.rd.animation.controller.ValueController.UpdateListener {
			public static class: java.lang.Class<com.rd.IndicatorManager>;
			public drawer(): com.rd.draw.DrawManager;
			public onValueUpdated(param0: com.rd.animation.data.Value): void;
			public indicator(): com.rd.draw.data.Indicator;
			public animate(): com.rd.animation.AnimationManager;
		}
		export module IndicatorManager {
			export class Listener extends java.lang.Object {
				public static class: java.lang.Class<com.rd.IndicatorManager.Listener>;
				/**
				 * Constructs a new instance of the com.rd.IndicatorManager$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onIndicatorUpdated(): void;
				});
				public constructor();
				public onIndicatorUpdated(): void;
			}
		}
	}
}

declare module com {
	export module rd {
		export class PageIndicatorView extends globalAndroid.view.View implements com.rd.IndicatorManager.Listener, globalAndroid.view.View.OnTouchListener {
			public static class: java.lang.Class<com.rd.PageIndicatorView>;
			public setRtlMode(param0: com.rd.draw.data.RtlMode): void;
			public setSelection(param0: number): void;
			public setProgress(param0: number, param1: number): void;
			public setSelectedColor(param0: number): void;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
			public onMeasure(param0: number, param1: number): void;
			public setCount(param0: number): void;
			public getPadding(): number;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
			public getSelectedColor(): number;
			public getUnselectedColor(): number;
			public getCount(): number;
			public setPadding(param0: number, param1: number, param2: number, param3: number): void;
			public setInteractiveAnimation(param0: boolean): void;
			public setClickListener(param0: com.rd.draw.controller.DrawController.ClickListener): void;
			public constructor(param0: globalAndroid.content.Context);
			public onDetachedFromWindow(): void;
			public sendAccessibilityEvent(param0: number): void;
			public setScaleFactor(param0: number): void;
			public getAnimationDuration(): number;
			public getStrokeWidth(): number;
			public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
			public onIndicatorUpdated(): void;
			public setViewPager(param0: androidx.viewpager.widget.ViewPager): void;
			public getRadius(): number;
			public onAdapterChanged(param0: androidx.viewpager.widget.ViewPager, param1: androidx.viewpager.widget.PagerAdapter, param2: androidx.viewpager.widget.PagerAdapter): void;
			public setSelected(param0: boolean): void;
			public setRadius(param0: number): void;
			public setFadeOnIdle(param0: boolean): void;
			public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
			public onRestoreInstanceState(param0: globalAndroid.os.Parcelable): void;
			public releaseViewPager(): void;
			public getSelection(): number;
			public setStrokeWidth(param0: number): void;
			public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
			public setSelected(param0: number): void;
			public onDraw(param0: globalAndroid.graphics.Canvas): void;
			public onPageScrolled(param0: number, param1: number, param2: number): void;
			public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
			public setAnimationType(param0: com.rd.animation.type.AnimationType): void;
			public onPageScrollStateChanged(param0: number): void;
			public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
			public getScaleFactor(): number;
			public setIdleDuration(param0: number): void;
			public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
			public setPadding(param0: number): void;
			public onSaveInstanceState(): globalAndroid.os.Parcelable;
			public setOrientation(param0: com.rd.draw.data.Orientation): void;
			public onTouch(param0: globalAndroid.view.View, param1: globalAndroid.view.MotionEvent): boolean;
			public setAutoVisibility(param0: boolean): void;
			public setAnimationDuration(param0: number): void;
			public onPageSelected(param0: number): void;
			public clearSelection(): void;
			public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
			public setDynamicCount(param0: boolean): void;
			public setUnselectedColor(param0: number): void;
			public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public onAttachedToWindow(): void;
			public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
		}
	}
}

declare module com {
	export module rd {
		export class PageIndicatorView2 extends globalAndroid.view.View implements com.rd.IndicatorManager.Listener, globalAndroid.view.View.OnTouchListener {
			public static class: java.lang.Class<com.rd.PageIndicatorView2>;
			public setRtlMode(param0: com.rd.draw.data.RtlMode): void;
			public setSelection(param0: number): void;
			public setProgress(param0: number, param1: number): void;
			public setSelectedColor(param0: number): void;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
			public onMeasure(param0: number, param1: number): void;
			public setCount(param0: number): void;
			public getPadding(): number;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
			public getSelectedColor(): number;
			public getUnselectedColor(): number;
			public getCount(): number;
			public setPadding(param0: number, param1: number, param2: number, param3: number): void;
			public setInteractiveAnimation(param0: boolean): void;
			public setClickListener(param0: com.rd.draw.controller.DrawController.ClickListener): void;
			public constructor(param0: globalAndroid.content.Context);
			public onDetachedFromWindow(): void;
			public sendAccessibilityEvent(param0: number): void;
			public setScaleFactor(param0: number): void;
			public getAnimationDuration(): number;
			public getStrokeWidth(): number;
			public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
			public onIndicatorUpdated(): void;
			public getRadius(): number;
			public setSelected(param0: boolean): void;
			public setRadius(param0: number): void;
			public setFadeOnIdle(param0: boolean): void;
			public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
			public onRestoreInstanceState(param0: globalAndroid.os.Parcelable): void;
			public releaseViewPager(): void;
			public getSelection(): number;
			public setStrokeWidth(param0: number): void;
			public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
			public setSelected(param0: number): void;
			public onDraw(param0: globalAndroid.graphics.Canvas): void;
			public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
			public setAnimationType(param0: com.rd.animation.type.AnimationType): void;
			public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
			public getScaleFactor(): number;
			public setIdleDuration(param0: number): void;
			public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
			public setPadding(param0: number): void;
			public onSaveInstanceState(): globalAndroid.os.Parcelable;
			public setOrientation(param0: com.rd.draw.data.Orientation): void;
			public onTouch(param0: globalAndroid.view.View, param1: globalAndroid.view.MotionEvent): boolean;
			public setViewPager(param0: androidx.viewpager2.widget.ViewPager2): void;
			public setAutoVisibility(param0: boolean): void;
			public setAnimationDuration(param0: number): void;
			public clearSelection(): void;
			public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
			public setDynamicCount(param0: boolean): void;
			public setUnselectedColor(param0: number): void;
			public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
			public onAttachedToWindow(): void;
			public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export class AnimationManager extends java.lang.Object {
				public static class: java.lang.Class<com.rd.animation.AnimationManager>;
				public basic(): void;
				public interactive(param0: number): void;
				public constructor(param0: com.rd.draw.data.Indicator, param1: com.rd.animation.controller.ValueController.UpdateListener);
				public end(): void;
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module controller {
				export class AnimationController extends java.lang.Object {
					public static class: java.lang.Class<com.rd.animation.controller.AnimationController>;
					public interactive(param0: number): void;
					public end(): void;
					public basic(): void;
					public constructor(param0: com.rd.draw.data.Indicator, param1: com.rd.animation.controller.ValueController.UpdateListener);
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module controller {
				export class ValueController extends java.lang.Object {
					public static class: java.lang.Class<com.rd.animation.controller.ValueController>;
					public slide(): com.rd.animation.type.SlideAnimation;
					public thinWorm(): com.rd.animation.type.ThinWormAnimation;
					public fill(): com.rd.animation.type.FillAnimation;
					public color(): com.rd.animation.type.ColorAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public swap(): com.rd.animation.type.SwapAnimation;
					public worm(): com.rd.animation.type.WormAnimation;
					public scaleDown(): com.rd.animation.type.ScaleDownAnimation;
					public scale(): com.rd.animation.type.ScaleAnimation;
					public drop(): com.rd.animation.type.DropAnimation;
				}
				export module ValueController {
					export class UpdateListener extends java.lang.Object {
						public static class: java.lang.Class<com.rd.animation.controller.ValueController.UpdateListener>;
						/**
						 * Constructs a new instance of the com.rd.animation.controller.ValueController$UpdateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onValueUpdated(param0: com.rd.animation.data.Value): void;
						});
						public constructor();
						public onValueUpdated(param0: com.rd.animation.data.Value): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export class AnimationValue extends java.lang.Object {
					public static class: java.lang.Class<com.rd.animation.data.AnimationValue>;
					public getSwapAnimationValue(): com.rd.animation.data.type.SwapAnimationValue;
					public getThinWormAnimationValue(): com.rd.animation.data.type.ThinWormAnimationValue;
					public constructor();
					public getWormAnimationValue(): com.rd.animation.data.type.WormAnimationValue;
					public getFillAnimationValue(): com.rd.animation.data.type.FillAnimationValue;
					public getDropAnimationValue(): com.rd.animation.data.type.DropAnimationValue;
					public getColorAnimationValue(): com.rd.animation.data.type.ColorAnimationValue;
					public getScaleAnimationValue(): com.rd.animation.data.type.ScaleAnimationValue;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export class Value extends java.lang.Object {
					public static class: java.lang.Class<com.rd.animation.data.Value>;
					/**
					 * Constructs a new instance of the com.rd.animation.data.Value interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
					});
					public constructor();
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class ColorAnimationValue extends java.lang.Object implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.ColorAnimationValue>;
						public getColor(): number;
						public constructor();
						public getColorReverse(): number;
						public setColor(param0: number): void;
						public setColorReverse(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class DropAnimationValue extends java.lang.Object implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.DropAnimationValue>;
						public constructor();
						public setWidth(param0: number): void;
						public getWidth(): number;
						public setRadius(param0: number): void;
						public setHeight(param0: number): void;
						public getRadius(): number;
						public getHeight(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class FillAnimationValue extends com.rd.animation.data.type.ColorAnimationValue implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.FillAnimationValue>;
						public getStrokeReverse(): number;
						public constructor();
						public setRadius(param0: number): void;
						public getRadiusReverse(): number;
						public getRadius(): number;
						public setRadiusReverse(param0: number): void;
						public getStroke(): number;
						public setStrokeReverse(param0: number): void;
						public setStroke(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class ScaleAnimationValue extends com.rd.animation.data.type.ColorAnimationValue implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.ScaleAnimationValue>;
						public constructor();
						public setRadius(param0: number): void;
						public getRadiusReverse(): number;
						public getRadius(): number;
						public setRadiusReverse(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class SlideAnimationValue extends java.lang.Object implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.SlideAnimationValue>;
						public constructor();
						public getCoordinate(): number;
						public setCoordinate(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class SwapAnimationValue extends java.lang.Object implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.SwapAnimationValue>;
						public constructor();
						public getCoordinate(): number;
						public getCoordinateReverse(): number;
						public setCoordinate(param0: number): void;
						public setCoordinateReverse(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class ThinWormAnimationValue extends com.rd.animation.data.type.WormAnimationValue implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.ThinWormAnimationValue>;
						public constructor();
						public setHeight(param0: number): void;
						public getHeight(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module data {
				export module type {
					export class WormAnimationValue extends java.lang.Object implements com.rd.animation.data.Value {
						public static class: java.lang.Class<com.rd.animation.data.type.WormAnimationValue>;
						public constructor();
						public getRectStart(): number;
						public setRectStart(param0: number): void;
						public setRectEnd(param0: number): void;
						public getRectEnd(): number;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class AnimationType {
					public static class: java.lang.Class<com.rd.animation.type.AnimationType>;
					public static NONE: com.rd.animation.type.AnimationType;
					public static COLOR: com.rd.animation.type.AnimationType;
					public static SCALE: com.rd.animation.type.AnimationType;
					public static WORM: com.rd.animation.type.AnimationType;
					public static SLIDE: com.rd.animation.type.AnimationType;
					public static FILL: com.rd.animation.type.AnimationType;
					public static THIN_WORM: com.rd.animation.type.AnimationType;
					public static DROP: com.rd.animation.type.AnimationType;
					public static SWAP: com.rd.animation.type.AnimationType;
					public static SCALE_DOWN: com.rd.animation.type.AnimationType;
					public static valueOf(param0: string): com.rd.animation.type.AnimationType;
					public static values(): androidNative.Array<com.rd.animation.type.AnimationType>;
					public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export abstract class BaseAnimation<T>  extends java.lang.Object {
					public static class: java.lang.Class<com.rd.animation.type.BaseAnimation<any>>;
					public static DEFAULT_ANIMATION_TIME: number;
					public animationDuration: number;
					public listener: com.rd.animation.controller.ValueController.UpdateListener;
					public animator: T;
					public end(): void;
					public createAnimator(): T;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public duration(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public start(): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class ColorAnimation extends com.rd.animation.type.BaseAnimation<globalAndroid.animation.ValueAnimator> {
					public static class: java.lang.Class<com.rd.animation.type.ColorAnimation>;
					public static DEFAULT_UNSELECTED_COLOR: string;
					public static DEFAULT_SELECTED_COLOR: string;
					public with(param0: number, param1: number): com.rd.animation.type.ColorAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public progress(param0: number): com.rd.animation.type.ColorAnimation;
					public createAnimator(): globalAndroid.animation.ValueAnimator;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class DropAnimation extends com.rd.animation.type.BaseAnimation<globalAndroid.animation.AnimatorSet> {
					public static class: java.lang.Class<com.rd.animation.type.DropAnimation>;
					public createAnimator(): globalAndroid.animation.AnimatorSet;
					public progress(param0: number): com.rd.animation.type.DropAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public duration(param0: number): com.rd.animation.type.DropAnimation;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public duration(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public with(param0: number, param1: number, param2: number, param3: number, param4: number): com.rd.animation.type.DropAnimation;
				}
				export module DropAnimation {
					export class AnimationType {
						public static class: java.lang.Class<com.rd.animation.type.DropAnimation.AnimationType>;
						public static Width: com.rd.animation.type.DropAnimation.AnimationType;
						public static Height: com.rd.animation.type.DropAnimation.AnimationType;
						public static Radius: com.rd.animation.type.DropAnimation.AnimationType;
						public static valueOf(param0: string): com.rd.animation.type.DropAnimation.AnimationType;
						public static values(): androidNative.Array<com.rd.animation.type.DropAnimation.AnimationType>;
						public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class FillAnimation extends com.rd.animation.type.ColorAnimation {
					public static class: java.lang.Class<com.rd.animation.type.FillAnimation>;
					public static DEFAULT_STROKE_DP: number;
					public with(param0: number, param1: number): com.rd.animation.type.ColorAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public with(param0: number, param1: number, param2: number, param3: number): com.rd.animation.type.FillAnimation;
					public createAnimator(): globalAndroid.animation.ValueAnimator;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class ScaleAnimation extends com.rd.animation.type.ColorAnimation {
					public static class: java.lang.Class<com.rd.animation.type.ScaleAnimation>;
					public static DEFAULT_SCALE_FACTOR: number;
					public static MIN_SCALE_FACTOR: number;
					public static MAX_SCALE_FACTOR: number;
					public with(param0: number, param1: number, param2: number, param3: number): com.rd.animation.type.ScaleAnimation;
					public with(param0: number, param1: number): com.rd.animation.type.ColorAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public createAnimator(): globalAndroid.animation.ValueAnimator;
					public createScalePropertyHolder(param0: boolean): globalAndroid.animation.PropertyValuesHolder;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class ScaleDownAnimation extends com.rd.animation.type.ScaleAnimation {
					public static class: java.lang.Class<com.rd.animation.type.ScaleDownAnimation>;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createScalePropertyHolder(param0: boolean): globalAndroid.animation.PropertyValuesHolder;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class SlideAnimation extends com.rd.animation.type.BaseAnimation<globalAndroid.animation.ValueAnimator> {
					public static class: java.lang.Class<com.rd.animation.type.SlideAnimation>;
					public progress(param0: number): com.rd.animation.type.SlideAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public with(param0: number, param1: number): com.rd.animation.type.SlideAnimation;
					public createAnimator(): globalAndroid.animation.ValueAnimator;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class SwapAnimation extends com.rd.animation.type.BaseAnimation<globalAndroid.animation.ValueAnimator> {
					public static class: java.lang.Class<com.rd.animation.type.SwapAnimation>;
					public with(param0: number, param1: number): com.rd.animation.type.SwapAnimation;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public progress(param0: number): com.rd.animation.type.SwapAnimation;
					public createAnimator(): globalAndroid.animation.ValueAnimator;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class ThinWormAnimation extends com.rd.animation.type.WormAnimation {
					public static class: java.lang.Class<com.rd.animation.type.ThinWormAnimation>;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public duration(param0: number): com.rd.animation.type.ThinWormAnimation;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public duration(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public with(param0: number, param1: number, param2: number, param3: boolean): com.rd.animation.type.WormAnimation;
					public progress(param0: number): com.rd.animation.type.WormAnimation;
					public duration(param0: number): com.rd.animation.type.WormAnimation;
					public progress(param0: number): com.rd.animation.type.ThinWormAnimation;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module animation {
			export module type {
				export class WormAnimation extends com.rd.animation.type.BaseAnimation<globalAndroid.animation.AnimatorSet> {
					public static class: java.lang.Class<com.rd.animation.type.WormAnimation>;
					public createAnimator(): globalAndroid.animation.AnimatorSet;
					public constructor(param0: com.rd.animation.controller.ValueController.UpdateListener);
					public createAnimator(): any;
					public progress(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public duration(param0: number): com.rd.animation.type.BaseAnimation<any>;
					public with(param0: number, param1: number, param2: number, param3: boolean): com.rd.animation.type.WormAnimation;
					public progress(param0: number): com.rd.animation.type.WormAnimation;
					public duration(param0: number): com.rd.animation.type.WormAnimation;
				}
				export module WormAnimation {
					export class RectValues extends java.lang.Object {
						public static class: java.lang.Class<com.rd.animation.type.WormAnimation.RectValues>;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export class DrawManager extends java.lang.Object {
				public static class: java.lang.Class<com.rd.draw.DrawManager>;
				public measureViewSize(param0: number, param1: number): globalAndroid.util.Pair<java.lang.Integer,java.lang.Integer>;
				public initAttributes(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet): void;
				public touch(param0: globalAndroid.view.MotionEvent): void;
				public updateValue(param0: com.rd.animation.data.Value): void;
				public indicator(): com.rd.draw.data.Indicator;
				public draw(param0: globalAndroid.graphics.Canvas): void;
				public setClickListener(param0: com.rd.draw.controller.DrawController.ClickListener): void;
				public constructor();
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module controller {
				export class AttributeController extends java.lang.Object {
					public static class: java.lang.Class<com.rd.draw.controller.AttributeController>;
					public constructor(param0: com.rd.draw.data.Indicator);
					public init(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module controller {
				export class DrawController extends java.lang.Object {
					public static class: java.lang.Class<com.rd.draw.controller.DrawController>;
					public touch(param0: globalAndroid.view.MotionEvent): void;
					public constructor(param0: com.rd.draw.data.Indicator);
					public updateValue(param0: com.rd.animation.data.Value): void;
					public setClickListener(param0: com.rd.draw.controller.DrawController.ClickListener): void;
					public draw(param0: globalAndroid.graphics.Canvas): void;
				}
				export module DrawController {
					export class ClickListener extends java.lang.Object {
						public static class: java.lang.Class<com.rd.draw.controller.DrawController.ClickListener>;
						/**
						 * Constructs a new instance of the com.rd.draw.controller.DrawController$ClickListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onIndicatorClicked(param0: number): void;
						});
						public constructor();
						public onIndicatorClicked(param0: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module controller {
				export class MeasureController extends java.lang.Object {
					public static class: java.lang.Class<com.rd.draw.controller.MeasureController>;
					public constructor();
					public measureViewSize(param0: com.rd.draw.data.Indicator, param1: number, param2: number): globalAndroid.util.Pair<java.lang.Integer,java.lang.Integer>;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module data {
				export class Indicator extends java.lang.Object {
					public static class: java.lang.Class<com.rd.draw.data.Indicator>;
					public static DEFAULT_COUNT: number;
					public static MIN_COUNT: number;
					public static COUNT_NONE: number;
					public static DEFAULT_RADIUS_DP: number;
					public static DEFAULT_PADDING_DP: number;
					public static IDLE_ANIMATION_DURATION: number;
					public setCount(param0: number): void;
					public getCount(): number;
					public setHeight(param0: number): void;
					public setDynamicCount(param0: boolean): void;
					public setScaleFactor(param0: number): void;
					public setLastSelectedPosition(param0: number): void;
					public setSelectedColor(param0: number): void;
					public isFadeOnIdle(): boolean;
					public getScaleFactor(): number;
					public constructor();
					public getPaddingLeft(): number;
					public setOrientation(param0: com.rd.draw.data.Orientation): void;
					public setPaddingTop(param0: number): void;
					public getAnimationType(): com.rd.animation.type.AnimationType;
					public getPaddingTop(): number;
					public getLastSelectedPosition(): number;
					public getPaddingRight(): number;
					public setPaddingRight(param0: number): void;
					public getSelectedColor(): number;
					public getHeight(): number;
					public getUnselectedColor(): number;
					public setIdleDuration(param0: number): void;
					public getPaddingBottom(): number;
					public getRadius(): number;
					public setAnimationType(param0: com.rd.animation.type.AnimationType): void;
					public setPaddingLeft(param0: number): void;
					public getPadding(): number;
					public setPadding(param0: number): void;
					public isInteractiveAnimation(): boolean;
					public getOrientation(): com.rd.draw.data.Orientation;
					public setAnimationDuration(param0: number): void;
					public getRtlMode(): com.rd.draw.data.RtlMode;
					public getStroke(): number;
					public setSelectingPosition(param0: number): void;
					public isDynamicCount(): boolean;
					public setPaddingBottom(param0: number): void;
					public getViewPagerId(): number;
					public getSelectingPosition(): number;
					public getSelectedPosition(): number;
					public setIdle(param0: boolean): void;
					public getIdleDuration(): number;
					public setRtlMode(param0: com.rd.draw.data.RtlMode): void;
					public setWidth(param0: number): void;
					public setViewPagerId(param0: number): void;
					public getWidth(): number;
					public setFadeOnIdle(param0: boolean): void;
					public setSelectedPosition(param0: number): void;
					public getAnimationDuration(): number;
					public isAutoVisibility(): boolean;
					public isIdle(): boolean;
					public setRadius(param0: number): void;
					public setStroke(param0: number): void;
					public setUnselectedColor(param0: number): void;
					public setInteractiveAnimation(param0: boolean): void;
					public setAutoVisibility(param0: boolean): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module data {
				export class Orientation {
					public static class: java.lang.Class<com.rd.draw.data.Orientation>;
					public static HORIZONTAL: com.rd.draw.data.Orientation;
					public static VERTICAL: com.rd.draw.data.Orientation;
					public static values(): androidNative.Array<com.rd.draw.data.Orientation>;
					public static valueOf(param0: string): com.rd.draw.data.Orientation;
					public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module data {
				export class PositionSavedState extends globalAndroid.view.View.BaseSavedState {
					public static class: java.lang.Class<com.rd.draw.data.PositionSavedState>;
					public static CREATOR: globalAndroid.os.Parcelable.Creator<com.rd.draw.data.PositionSavedState>;
					public constructor(param0: globalAndroid.os.Parcel);
					public describeContents(): number;
					public constructor(param0: globalAndroid.os.Parcel, param1: java.lang.ClassLoader);
					public getSelectingPosition(): number;
					public setSelectedPosition(param0: number): void;
					public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
					public constructor(param0: globalAndroid.os.Parcelable);
					public setSelectingPosition(param0: number): void;
					public getLastSelectedPosition(): number;
					public getSelectedPosition(): number;
					public setLastSelectedPosition(param0: number): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module data {
				export class RtlMode {
					public static class: java.lang.Class<com.rd.draw.data.RtlMode>;
					public static On: com.rd.draw.data.RtlMode;
					public static Off: com.rd.draw.data.RtlMode;
					public static Auto: com.rd.draw.data.RtlMode;
					public static values(): androidNative.Array<com.rd.draw.data.RtlMode>;
					public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
					public static valueOf(param0: string): com.rd.draw.data.RtlMode;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export class Drawer extends java.lang.Object {
					public static class: java.lang.Class<com.rd.draw.drawer.Drawer>;
					public drawThinWorm(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public constructor(param0: com.rd.draw.data.Indicator);
					public drawFill(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawBasic(param0: globalAndroid.graphics.Canvas, param1: boolean): void;
					public drawDrop(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawSwap(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawWorm(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawColor(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawScaleDown(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public setup(param0: number, param1: number, param2: number): void;
					public drawScale(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
					public drawSlide(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class BaseDrawer extends java.lang.Object {
						public static class: java.lang.Class<com.rd.draw.drawer.type.BaseDrawer>;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class BasicDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.BasicDrawer>;
						public draw(param0: globalAndroid.graphics.Canvas, param1: number, param2: boolean, param3: number, param4: number): void;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class ColorDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.ColorDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number, param4: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class DropDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.DropDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class FillDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.FillDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number, param4: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class ScaleDownDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.ScaleDownDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number, param4: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class ScaleDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.ScaleDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number, param4: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class SlideDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.SlideDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class SwapDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.SwapDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number, param4: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class ThinWormDrawer extends com.rd.draw.drawer.type.WormDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.ThinWormDrawer>;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module draw {
			export module drawer {
				export module type {
					export class WormDrawer extends com.rd.draw.drawer.type.BaseDrawer {
						public static class: java.lang.Class<com.rd.draw.drawer.type.WormDrawer>;
						public rect: globalAndroid.graphics.RectF;
						public constructor(param0: globalAndroid.graphics.Paint, param1: com.rd.draw.data.Indicator);
						public draw(param0: globalAndroid.graphics.Canvas, param1: com.rd.animation.data.Value, param2: number, param3: number): void;
					}
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module pageindicatorview {
			export class BuildConfig extends java.lang.Object {
				public static class: java.lang.Class<com.rd.pageindicatorview.BuildConfig>;
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module rd {
		export module pageindicatorview {
			export class R extends java.lang.Object {
				public static class: java.lang.Class<com.rd.pageindicatorview.R>;
			}
			export module R {
				export class anim extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.anim>;
					public static abc_fade_in: number;
					public static abc_fade_out: number;
					public static abc_grow_fade_in_from_bottom: number;
					public static abc_popup_enter: number;
					public static abc_popup_exit: number;
					public static abc_shrink_fade_out_from_bottom: number;
					public static abc_slide_in_bottom: number;
					public static abc_slide_in_top: number;
					public static abc_slide_out_bottom: number;
					public static abc_slide_out_top: number;
					public static abc_tooltip_enter: number;
					public static abc_tooltip_exit: number;
					public static btn_checkbox_to_checked_box_inner_merged_animation: number;
					public static btn_checkbox_to_checked_box_outer_merged_animation: number;
					public static btn_checkbox_to_checked_icon_null_animation: number;
					public static btn_checkbox_to_unchecked_box_inner_merged_animation: number;
					public static btn_checkbox_to_unchecked_check_path_merged_animation: number;
					public static btn_checkbox_to_unchecked_icon_null_animation: number;
					public static btn_radio_to_off_mtrl_dot_group_animation: number;
					public static btn_radio_to_off_mtrl_ring_outer_animation: number;
					public static btn_radio_to_off_mtrl_ring_outer_path_animation: number;
					public static btn_radio_to_on_mtrl_dot_group_animation: number;
					public static btn_radio_to_on_mtrl_ring_outer_animation: number;
					public static btn_radio_to_on_mtrl_ring_outer_path_animation: number;
				}
				export class attr extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.attr>;
					public static actionBarDivider: number;
					public static actionBarItemBackground: number;
					public static actionBarPopupTheme: number;
					public static actionBarSize: number;
					public static actionBarSplitStyle: number;
					public static actionBarStyle: number;
					public static actionBarTabBarStyle: number;
					public static actionBarTabStyle: number;
					public static actionBarTabTextStyle: number;
					public static actionBarTheme: number;
					public static actionBarWidgetTheme: number;
					public static actionButtonStyle: number;
					public static actionDropDownStyle: number;
					public static actionLayout: number;
					public static actionMenuTextAppearance: number;
					public static actionMenuTextColor: number;
					public static actionModeBackground: number;
					public static actionModeCloseButtonStyle: number;
					public static actionModeCloseDrawable: number;
					public static actionModeCopyDrawable: number;
					public static actionModeCutDrawable: number;
					public static actionModeFindDrawable: number;
					public static actionModePasteDrawable: number;
					public static actionModePopupWindowStyle: number;
					public static actionModeSelectAllDrawable: number;
					public static actionModeShareDrawable: number;
					public static actionModeSplitBackground: number;
					public static actionModeStyle: number;
					public static actionModeWebSearchDrawable: number;
					public static actionOverflowButtonStyle: number;
					public static actionOverflowMenuStyle: number;
					public static actionProviderClass: number;
					public static actionViewClass: number;
					public static activityChooserViewStyle: number;
					public static alertDialogButtonGroupStyle: number;
					public static alertDialogCenterButtons: number;
					public static alertDialogStyle: number;
					public static alertDialogTheme: number;
					public static allowStacking: number;
					public static alpha: number;
					public static alphabeticModifiers: number;
					public static arrowHeadLength: number;
					public static arrowShaftLength: number;
					public static autoCompleteTextViewStyle: number;
					public static autoSizeMaxTextSize: number;
					public static autoSizeMinTextSize: number;
					public static autoSizePresetSizes: number;
					public static autoSizeStepGranularity: number;
					public static autoSizeTextType: number;
					public static background: number;
					public static backgroundSplit: number;
					public static backgroundStacked: number;
					public static backgroundTint: number;
					public static backgroundTintMode: number;
					public static barLength: number;
					public static borderlessButtonStyle: number;
					public static buttonBarButtonStyle: number;
					public static buttonBarNegativeButtonStyle: number;
					public static buttonBarNeutralButtonStyle: number;
					public static buttonBarPositiveButtonStyle: number;
					public static buttonBarStyle: number;
					public static buttonCompat: number;
					public static buttonGravity: number;
					public static buttonIconDimen: number;
					public static buttonPanelSideLayout: number;
					public static buttonStyle: number;
					public static buttonStyleSmall: number;
					public static buttonTint: number;
					public static buttonTintMode: number;
					public static checkboxStyle: number;
					public static checkedTextViewStyle: number;
					public static closeIcon: number;
					public static closeItemLayout: number;
					public static collapseContentDescription: number;
					public static collapseIcon: number;
					public static color: number;
					public static colorAccent: number;
					public static colorBackgroundFloating: number;
					public static colorButtonNormal: number;
					public static colorControlActivated: number;
					public static colorControlHighlight: number;
					public static colorControlNormal: number;
					public static colorError: number;
					public static colorPrimary: number;
					public static colorPrimaryDark: number;
					public static colorSwitchThumbNormal: number;
					public static commitIcon: number;
					public static contentDescription: number;
					public static contentInsetEnd: number;
					public static contentInsetEndWithActions: number;
					public static contentInsetLeft: number;
					public static contentInsetRight: number;
					public static contentInsetStart: number;
					public static contentInsetStartWithNavigation: number;
					public static controlBackground: number;
					public static coordinatorLayoutStyle: number;
					public static customNavigationLayout: number;
					public static defaultQueryHint: number;
					public static dialogCornerRadius: number;
					public static dialogPreferredPadding: number;
					public static dialogTheme: number;
					public static displayOptions: number;
					public static divider: number;
					public static dividerHorizontal: number;
					public static dividerPadding: number;
					public static dividerVertical: number;
					public static drawableBottomCompat: number;
					public static drawableEndCompat: number;
					public static drawableLeftCompat: number;
					public static drawableRightCompat: number;
					public static drawableSize: number;
					public static drawableStartCompat: number;
					public static drawableTopCompat: number;
					public static drawerArrowStyle: number;
					public static dropDownListViewStyle: number;
					public static dropdownListPreferredItemHeight: number;
					public static editTextBackground: number;
					public static editTextColor: number;
					public static editTextStyle: number;
					public static elevation: number;
					public static expandActivityOverflowButtonDrawable: number;
					public static fastScrollEnabled: number;
					public static fastScrollHorizontalThumbDrawable: number;
					public static fastScrollHorizontalTrackDrawable: number;
					public static fastScrollVerticalThumbDrawable: number;
					public static fastScrollVerticalTrackDrawable: number;
					public static firstBaselineToTopHeight: number;
					public static font: number;
					public static fontFamily: number;
					public static fontProviderAuthority: number;
					public static fontProviderCerts: number;
					public static fontProviderFetchStrategy: number;
					public static fontProviderFetchTimeout: number;
					public static fontProviderPackage: number;
					public static fontProviderQuery: number;
					public static fontStyle: number;
					public static fontVariationSettings: number;
					public static fontWeight: number;
					public static gapBetweenBars: number;
					public static goIcon: number;
					public static height: number;
					public static hideOnContentScroll: number;
					public static homeAsUpIndicator: number;
					public static homeLayout: number;
					public static icon: number;
					public static iconTint: number;
					public static iconTintMode: number;
					public static iconifiedByDefault: number;
					public static imageButtonStyle: number;
					public static indeterminateProgressStyle: number;
					public static initialActivityCount: number;
					public static isLightTheme: number;
					public static itemPadding: number;
					public static keylines: number;
					public static lastBaselineToBottomHeight: number;
					public static layout: number;
					public static layoutManager: number;
					public static layout_anchor: number;
					public static layout_anchorGravity: number;
					public static layout_behavior: number;
					public static layout_dodgeInsetEdges: number;
					public static layout_insetEdge: number;
					public static layout_keyline: number;
					public static lineHeight: number;
					public static listChoiceBackgroundIndicator: number;
					public static listChoiceIndicatorMultipleAnimated: number;
					public static listChoiceIndicatorSingleAnimated: number;
					public static listDividerAlertDialog: number;
					public static listItemLayout: number;
					public static listLayout: number;
					public static listMenuViewStyle: number;
					public static listPopupWindowStyle: number;
					public static listPreferredItemHeight: number;
					public static listPreferredItemHeightLarge: number;
					public static listPreferredItemHeightSmall: number;
					public static listPreferredItemPaddingEnd: number;
					public static listPreferredItemPaddingLeft: number;
					public static listPreferredItemPaddingRight: number;
					public static listPreferredItemPaddingStart: number;
					public static logo: number;
					public static logoDescription: number;
					public static maxButtonHeight: number;
					public static measureWithLargestChild: number;
					public static multiChoiceItemLayout: number;
					public static navigationContentDescription: number;
					public static navigationIcon: number;
					public static navigationMode: number;
					public static numericModifiers: number;
					public static overlapAnchor: number;
					public static paddingBottomNoButtons: number;
					public static paddingEnd: number;
					public static paddingStart: number;
					public static paddingTopNoTitle: number;
					public static panelBackground: number;
					public static panelMenuListTheme: number;
					public static panelMenuListWidth: number;
					public static piv_animationDuration: number;
					public static piv_animationType: number;
					public static piv_autoVisibility: number;
					public static piv_count: number;
					public static piv_dynamicCount: number;
					public static piv_fadeOnIdle: number;
					public static piv_idleDuration: number;
					public static piv_interactiveAnimation: number;
					public static piv_orientation: number;
					public static piv_padding: number;
					public static piv_radius: number;
					public static piv_rtl_mode: number;
					public static piv_scaleFactor: number;
					public static piv_select: number;
					public static piv_selectedColor: number;
					public static piv_strokeWidth: number;
					public static piv_unselectedColor: number;
					public static piv_viewPager: number;
					public static popupMenuStyle: number;
					public static popupTheme: number;
					public static popupWindowStyle: number;
					public static preserveIconSpacing: number;
					public static progressBarPadding: number;
					public static progressBarStyle: number;
					public static queryBackground: number;
					public static queryHint: number;
					public static radioButtonStyle: number;
					public static ratingBarStyle: number;
					public static ratingBarStyleIndicator: number;
					public static ratingBarStyleSmall: number;
					public static reverseLayout: number;
					public static searchHintIcon: number;
					public static searchIcon: number;
					public static searchViewStyle: number;
					public static seekBarStyle: number;
					public static selectableItemBackground: number;
					public static selectableItemBackgroundBorderless: number;
					public static showAsAction: number;
					public static showDividers: number;
					public static showText: number;
					public static showTitle: number;
					public static singleChoiceItemLayout: number;
					public static spanCount: number;
					public static spinBars: number;
					public static spinnerDropDownItemStyle: number;
					public static spinnerStyle: number;
					public static splitTrack: number;
					public static srcCompat: number;
					public static stackFromEnd: number;
					public static state_above_anchor: number;
					public static statusBarBackground: number;
					public static subMenuArrow: number;
					public static submitBackground: number;
					public static subtitle: number;
					public static subtitleTextAppearance: number;
					public static subtitleTextColor: number;
					public static subtitleTextStyle: number;
					public static suggestionRowLayout: number;
					public static switchMinWidth: number;
					public static switchPadding: number;
					public static switchStyle: number;
					public static switchTextAppearance: number;
					public static textAllCaps: number;
					public static textAppearanceLargePopupMenu: number;
					public static textAppearanceListItem: number;
					public static textAppearanceListItemSecondary: number;
					public static textAppearanceListItemSmall: number;
					public static textAppearancePopupMenuHeader: number;
					public static textAppearanceSearchResultSubtitle: number;
					public static textAppearanceSearchResultTitle: number;
					public static textAppearanceSmallPopupMenu: number;
					public static textColorAlertDialogListItem: number;
					public static textColorSearchUrl: number;
					public static textLocale: number;
					public static theme: number;
					public static thickness: number;
					public static thumbTextPadding: number;
					public static thumbTint: number;
					public static thumbTintMode: number;
					public static tickMark: number;
					public static tickMarkTint: number;
					public static tickMarkTintMode: number;
					public static tint: number;
					public static tintMode: number;
					public static title: number;
					public static titleMargin: number;
					public static titleMarginBottom: number;
					public static titleMarginEnd: number;
					public static titleMarginStart: number;
					public static titleMarginTop: number;
					public static titleMargins: number;
					public static titleTextAppearance: number;
					public static titleTextColor: number;
					public static titleTextStyle: number;
					public static toolbarNavigationButtonStyle: number;
					public static toolbarStyle: number;
					public static tooltipForegroundColor: number;
					public static tooltipFrameBackground: number;
					public static tooltipText: number;
					public static track: number;
					public static trackTint: number;
					public static trackTintMode: number;
					public static ttcIndex: number;
					public static viewInflaterClass: number;
					public static voiceIcon: number;
					public static windowActionBar: number;
					public static windowActionBarOverlay: number;
					public static windowActionModeOverlay: number;
					public static windowFixedHeightMajor: number;
					public static windowFixedHeightMinor: number;
					public static windowFixedWidthMajor: number;
					public static windowFixedWidthMinor: number;
					public static windowMinWidthMajor: number;
					public static windowMinWidthMinor: number;
					public static windowNoTitle: number;
				}
				export class bool extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.bool>;
					public static abc_action_bar_embed_tabs: number;
					public static abc_allow_stacked_button_bar: number;
					public static abc_config_actionMenuItemAllCaps: number;
				}
				export class color extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.color>;
					public static abc_background_cache_hint_selector_material_dark: number;
					public static abc_background_cache_hint_selector_material_light: number;
					public static abc_btn_colored_borderless_text_material: number;
					public static abc_btn_colored_text_material: number;
					public static abc_color_highlight_material: number;
					public static abc_hint_foreground_material_dark: number;
					public static abc_hint_foreground_material_light: number;
					public static abc_input_method_navigation_guard: number;
					public static abc_primary_text_disable_only_material_dark: number;
					public static abc_primary_text_disable_only_material_light: number;
					public static abc_primary_text_material_dark: number;
					public static abc_primary_text_material_light: number;
					public static abc_search_url_text: number;
					public static abc_search_url_text_normal: number;
					public static abc_search_url_text_pressed: number;
					public static abc_search_url_text_selected: number;
					public static abc_secondary_text_material_dark: number;
					public static abc_secondary_text_material_light: number;
					public static abc_tint_btn_checkable: number;
					public static abc_tint_default: number;
					public static abc_tint_edittext: number;
					public static abc_tint_seek_thumb: number;
					public static abc_tint_spinner: number;
					public static abc_tint_switch_track: number;
					public static accent_material_dark: number;
					public static accent_material_light: number;
					public static background_floating_material_dark: number;
					public static background_floating_material_light: number;
					public static background_material_dark: number;
					public static background_material_light: number;
					public static bright_foreground_disabled_material_dark: number;
					public static bright_foreground_disabled_material_light: number;
					public static bright_foreground_inverse_material_dark: number;
					public static bright_foreground_inverse_material_light: number;
					public static bright_foreground_material_dark: number;
					public static bright_foreground_material_light: number;
					public static button_material_dark: number;
					public static button_material_light: number;
					public static dim_foreground_disabled_material_dark: number;
					public static dim_foreground_disabled_material_light: number;
					public static dim_foreground_material_dark: number;
					public static dim_foreground_material_light: number;
					public static error_color_material_dark: number;
					public static error_color_material_light: number;
					public static foreground_material_dark: number;
					public static foreground_material_light: number;
					public static highlighted_text_material_dark: number;
					public static highlighted_text_material_light: number;
					public static material_blue_grey_800: number;
					public static material_blue_grey_900: number;
					public static material_blue_grey_950: number;
					public static material_deep_teal_200: number;
					public static material_deep_teal_500: number;
					public static material_grey_100: number;
					public static material_grey_300: number;
					public static material_grey_50: number;
					public static material_grey_600: number;
					public static material_grey_800: number;
					public static material_grey_850: number;
					public static material_grey_900: number;
					public static notification_action_color_filter: number;
					public static notification_icon_bg_color: number;
					public static primary_dark_material_dark: number;
					public static primary_dark_material_light: number;
					public static primary_material_dark: number;
					public static primary_material_light: number;
					public static primary_text_default_material_dark: number;
					public static primary_text_default_material_light: number;
					public static primary_text_disabled_material_dark: number;
					public static primary_text_disabled_material_light: number;
					public static ripple_material_dark: number;
					public static ripple_material_light: number;
					public static secondary_text_default_material_dark: number;
					public static secondary_text_default_material_light: number;
					public static secondary_text_disabled_material_dark: number;
					public static secondary_text_disabled_material_light: number;
					public static switch_thumb_disabled_material_dark: number;
					public static switch_thumb_disabled_material_light: number;
					public static switch_thumb_material_dark: number;
					public static switch_thumb_material_light: number;
					public static switch_thumb_normal_material_dark: number;
					public static switch_thumb_normal_material_light: number;
					public static tooltip_background_dark: number;
					public static tooltip_background_light: number;
				}
				export class dimen extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.dimen>;
					public static abc_action_bar_content_inset_material: number;
					public static abc_action_bar_content_inset_with_nav: number;
					public static abc_action_bar_default_height_material: number;
					public static abc_action_bar_default_padding_end_material: number;
					public static abc_action_bar_default_padding_start_material: number;
					public static abc_action_bar_elevation_material: number;
					public static abc_action_bar_icon_vertical_padding_material: number;
					public static abc_action_bar_overflow_padding_end_material: number;
					public static abc_action_bar_overflow_padding_start_material: number;
					public static abc_action_bar_stacked_max_height: number;
					public static abc_action_bar_stacked_tab_max_width: number;
					public static abc_action_bar_subtitle_bottom_margin_material: number;
					public static abc_action_bar_subtitle_top_margin_material: number;
					public static abc_action_button_min_height_material: number;
					public static abc_action_button_min_width_material: number;
					public static abc_action_button_min_width_overflow_material: number;
					public static abc_alert_dialog_button_bar_height: number;
					public static abc_alert_dialog_button_dimen: number;
					public static abc_button_inset_horizontal_material: number;
					public static abc_button_inset_vertical_material: number;
					public static abc_button_padding_horizontal_material: number;
					public static abc_button_padding_vertical_material: number;
					public static abc_cascading_menus_min_smallest_width: number;
					public static abc_config_prefDialogWidth: number;
					public static abc_control_corner_material: number;
					public static abc_control_inset_material: number;
					public static abc_control_padding_material: number;
					public static abc_dialog_corner_radius_material: number;
					public static abc_dialog_fixed_height_major: number;
					public static abc_dialog_fixed_height_minor: number;
					public static abc_dialog_fixed_width_major: number;
					public static abc_dialog_fixed_width_minor: number;
					public static abc_dialog_list_padding_bottom_no_buttons: number;
					public static abc_dialog_list_padding_top_no_title: number;
					public static abc_dialog_min_width_major: number;
					public static abc_dialog_min_width_minor: number;
					public static abc_dialog_padding_material: number;
					public static abc_dialog_padding_top_material: number;
					public static abc_dialog_title_divider_material: number;
					public static abc_disabled_alpha_material_dark: number;
					public static abc_disabled_alpha_material_light: number;
					public static abc_dropdownitem_icon_width: number;
					public static abc_dropdownitem_text_padding_left: number;
					public static abc_dropdownitem_text_padding_right: number;
					public static abc_edit_text_inset_bottom_material: number;
					public static abc_edit_text_inset_horizontal_material: number;
					public static abc_edit_text_inset_top_material: number;
					public static abc_floating_window_z: number;
					public static abc_list_item_height_large_material: number;
					public static abc_list_item_height_material: number;
					public static abc_list_item_height_small_material: number;
					public static abc_list_item_padding_horizontal_material: number;
					public static abc_panel_menu_list_width: number;
					public static abc_progress_bar_height_material: number;
					public static abc_search_view_preferred_height: number;
					public static abc_search_view_preferred_width: number;
					public static abc_seekbar_track_background_height_material: number;
					public static abc_seekbar_track_progress_height_material: number;
					public static abc_select_dialog_padding_start_material: number;
					public static abc_switch_padding: number;
					public static abc_text_size_body_1_material: number;
					public static abc_text_size_body_2_material: number;
					public static abc_text_size_button_material: number;
					public static abc_text_size_caption_material: number;
					public static abc_text_size_display_1_material: number;
					public static abc_text_size_display_2_material: number;
					public static abc_text_size_display_3_material: number;
					public static abc_text_size_display_4_material: number;
					public static abc_text_size_headline_material: number;
					public static abc_text_size_large_material: number;
					public static abc_text_size_medium_material: number;
					public static abc_text_size_menu_header_material: number;
					public static abc_text_size_menu_material: number;
					public static abc_text_size_small_material: number;
					public static abc_text_size_subhead_material: number;
					public static abc_text_size_subtitle_material_toolbar: number;
					public static abc_text_size_title_material: number;
					public static abc_text_size_title_material_toolbar: number;
					public static compat_button_inset_horizontal_material: number;
					public static compat_button_inset_vertical_material: number;
					public static compat_button_padding_horizontal_material: number;
					public static compat_button_padding_vertical_material: number;
					public static compat_control_corner_material: number;
					public static compat_notification_large_icon_max_height: number;
					public static compat_notification_large_icon_max_width: number;
					public static disabled_alpha_material_dark: number;
					public static disabled_alpha_material_light: number;
					public static fastscroll_default_thickness: number;
					public static fastscroll_margin: number;
					public static fastscroll_minimum_range: number;
					public static highlight_alpha_material_colored: number;
					public static highlight_alpha_material_dark: number;
					public static highlight_alpha_material_light: number;
					public static hint_alpha_material_dark: number;
					public static hint_alpha_material_light: number;
					public static hint_pressed_alpha_material_dark: number;
					public static hint_pressed_alpha_material_light: number;
					public static item_touch_helper_max_drag_scroll_per_frame: number;
					public static item_touch_helper_swipe_escape_max_velocity: number;
					public static item_touch_helper_swipe_escape_velocity: number;
					public static notification_action_icon_size: number;
					public static notification_action_text_size: number;
					public static notification_big_circle_margin: number;
					public static notification_content_margin_start: number;
					public static notification_large_icon_height: number;
					public static notification_large_icon_width: number;
					public static notification_main_column_padding_top: number;
					public static notification_media_narrow_margin: number;
					public static notification_right_icon_size: number;
					public static notification_right_side_padding_top: number;
					public static notification_small_icon_background_padding: number;
					public static notification_small_icon_size_as_large: number;
					public static notification_subtext_size: number;
					public static notification_top_pad: number;
					public static notification_top_pad_large_text: number;
					public static tooltip_corner_radius: number;
					public static tooltip_horizontal_padding: number;
					public static tooltip_margin: number;
					public static tooltip_precise_anchor_extra_offset: number;
					public static tooltip_precise_anchor_threshold: number;
					public static tooltip_vertical_padding: number;
					public static tooltip_y_offset_non_touch: number;
					public static tooltip_y_offset_touch: number;
				}
				export class drawable extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.drawable>;
					public static abc_ab_share_pack_mtrl_alpha: number;
					public static abc_action_bar_item_background_material: number;
					public static abc_btn_borderless_material: number;
					public static abc_btn_check_material: number;
					public static abc_btn_check_material_anim: number;
					public static abc_btn_check_to_on_mtrl_000: number;
					public static abc_btn_check_to_on_mtrl_015: number;
					public static abc_btn_colored_material: number;
					public static abc_btn_default_mtrl_shape: number;
					public static abc_btn_radio_material: number;
					public static abc_btn_radio_material_anim: number;
					public static abc_btn_radio_to_on_mtrl_000: number;
					public static abc_btn_radio_to_on_mtrl_015: number;
					public static abc_btn_switch_to_on_mtrl_00001: number;
					public static abc_btn_switch_to_on_mtrl_00012: number;
					public static abc_cab_background_internal_bg: number;
					public static abc_cab_background_top_material: number;
					public static abc_cab_background_top_mtrl_alpha: number;
					public static abc_control_background_material: number;
					public static abc_dialog_material_background: number;
					public static abc_edit_text_material: number;
					public static abc_ic_ab_back_material: number;
					public static abc_ic_arrow_drop_right_black_24dp: number;
					public static abc_ic_clear_material: number;
					public static abc_ic_commit_search_api_mtrl_alpha: number;
					public static abc_ic_go_search_api_material: number;
					public static abc_ic_menu_copy_mtrl_am_alpha: number;
					public static abc_ic_menu_cut_mtrl_alpha: number;
					public static abc_ic_menu_overflow_material: number;
					public static abc_ic_menu_paste_mtrl_am_alpha: number;
					public static abc_ic_menu_selectall_mtrl_alpha: number;
					public static abc_ic_menu_share_mtrl_alpha: number;
					public static abc_ic_search_api_material: number;
					public static abc_ic_star_black_16dp: number;
					public static abc_ic_star_black_36dp: number;
					public static abc_ic_star_black_48dp: number;
					public static abc_ic_star_half_black_16dp: number;
					public static abc_ic_star_half_black_36dp: number;
					public static abc_ic_star_half_black_48dp: number;
					public static abc_ic_voice_search_api_material: number;
					public static abc_item_background_holo_dark: number;
					public static abc_item_background_holo_light: number;
					public static abc_list_divider_material: number;
					public static abc_list_divider_mtrl_alpha: number;
					public static abc_list_focused_holo: number;
					public static abc_list_longpressed_holo: number;
					public static abc_list_pressed_holo_dark: number;
					public static abc_list_pressed_holo_light: number;
					public static abc_list_selector_background_transition_holo_dark: number;
					public static abc_list_selector_background_transition_holo_light: number;
					public static abc_list_selector_disabled_holo_dark: number;
					public static abc_list_selector_disabled_holo_light: number;
					public static abc_list_selector_holo_dark: number;
					public static abc_list_selector_holo_light: number;
					public static abc_menu_hardkey_panel_mtrl_mult: number;
					public static abc_popup_background_mtrl_mult: number;
					public static abc_ratingbar_indicator_material: number;
					public static abc_ratingbar_material: number;
					public static abc_ratingbar_small_material: number;
					public static abc_scrubber_control_off_mtrl_alpha: number;
					public static abc_scrubber_control_to_pressed_mtrl_000: number;
					public static abc_scrubber_control_to_pressed_mtrl_005: number;
					public static abc_scrubber_primary_mtrl_alpha: number;
					public static abc_scrubber_track_mtrl_alpha: number;
					public static abc_seekbar_thumb_material: number;
					public static abc_seekbar_tick_mark_material: number;
					public static abc_seekbar_track_material: number;
					public static abc_spinner_mtrl_am_alpha: number;
					public static abc_spinner_textfield_background_material: number;
					public static abc_switch_thumb_material: number;
					public static abc_switch_track_mtrl_alpha: number;
					public static abc_tab_indicator_material: number;
					public static abc_tab_indicator_mtrl_alpha: number;
					public static abc_text_cursor_material: number;
					public static abc_text_select_handle_left_mtrl_dark: number;
					public static abc_text_select_handle_left_mtrl_light: number;
					public static abc_text_select_handle_middle_mtrl_dark: number;
					public static abc_text_select_handle_middle_mtrl_light: number;
					public static abc_text_select_handle_right_mtrl_dark: number;
					public static abc_text_select_handle_right_mtrl_light: number;
					public static abc_textfield_activated_mtrl_alpha: number;
					public static abc_textfield_default_mtrl_alpha: number;
					public static abc_textfield_search_activated_mtrl_alpha: number;
					public static abc_textfield_search_default_mtrl_alpha: number;
					public static abc_textfield_search_material: number;
					public static abc_vector_test: number;
					public static btn_checkbox_checked_mtrl: number;
					public static btn_checkbox_checked_to_unchecked_mtrl_animation: number;
					public static btn_checkbox_unchecked_mtrl: number;
					public static btn_checkbox_unchecked_to_checked_mtrl_animation: number;
					public static btn_radio_off_mtrl: number;
					public static btn_radio_off_to_on_mtrl_animation: number;
					public static btn_radio_on_mtrl: number;
					public static btn_radio_on_to_off_mtrl_animation: number;
					public static notification_action_background: number;
					public static notification_bg: number;
					public static notification_bg_low: number;
					public static notification_bg_low_normal: number;
					public static notification_bg_low_pressed: number;
					public static notification_bg_normal: number;
					public static notification_bg_normal_pressed: number;
					public static notification_icon_background: number;
					public static notification_template_icon_bg: number;
					public static notification_template_icon_low_bg: number;
					public static notification_tile_bg: number;
					public static notify_panel_notification_icon_bg: number;
					public static tooltip_frame_dark: number;
					public static tooltip_frame_light: number;
				}
				export class id extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.id>;
					public static accessibility_action_clickable_span: number;
					public static accessibility_custom_action_0: number;
					public static accessibility_custom_action_1: number;
					public static accessibility_custom_action_10: number;
					public static accessibility_custom_action_11: number;
					public static accessibility_custom_action_12: number;
					public static accessibility_custom_action_13: number;
					public static accessibility_custom_action_14: number;
					public static accessibility_custom_action_15: number;
					public static accessibility_custom_action_16: number;
					public static accessibility_custom_action_17: number;
					public static accessibility_custom_action_18: number;
					public static accessibility_custom_action_19: number;
					public static accessibility_custom_action_2: number;
					public static accessibility_custom_action_20: number;
					public static accessibility_custom_action_21: number;
					public static accessibility_custom_action_22: number;
					public static accessibility_custom_action_23: number;
					public static accessibility_custom_action_24: number;
					public static accessibility_custom_action_25: number;
					public static accessibility_custom_action_26: number;
					public static accessibility_custom_action_27: number;
					public static accessibility_custom_action_28: number;
					public static accessibility_custom_action_29: number;
					public static accessibility_custom_action_3: number;
					public static accessibility_custom_action_30: number;
					public static accessibility_custom_action_31: number;
					public static accessibility_custom_action_4: number;
					public static accessibility_custom_action_5: number;
					public static accessibility_custom_action_6: number;
					public static accessibility_custom_action_7: number;
					public static accessibility_custom_action_8: number;
					public static accessibility_custom_action_9: number;
					public static action_bar: number;
					public static action_bar_activity_content: number;
					public static action_bar_container: number;
					public static action_bar_root: number;
					public static action_bar_spinner: number;
					public static action_bar_subtitle: number;
					public static action_bar_title: number;
					public static action_container: number;
					public static action_context_bar: number;
					public static action_divider: number;
					public static action_image: number;
					public static action_menu_divider: number;
					public static action_menu_presenter: number;
					public static action_mode_bar: number;
					public static action_mode_bar_stub: number;
					public static action_mode_close_button: number;
					public static action_text: number;
					public static actions: number;
					public static activity_chooser_view_content: number;
					public static add: number;
					public static alertTitle: number;
					public static async: number;
					public static auto: number;
					public static blocking: number;
					public static bottom: number;
					public static buttonPanel: number;
					public static checkbox: number;
					public static checked: number;
					public static chronometer: number;
					public static color: number;
					public static content: number;
					public static contentPanel: number;
					public static custom: number;
					public static customPanel: number;
					public static decor_content_parent: number;
					public static default_activity_button: number;
					public static dialog_button: number;
					public static drop: number;
					public static edit_query: number;
					public static end: number;
					public static expand_activities_button: number;
					public static expanded_menu: number;
					public static fill: number;
					public static forever: number;
					public static group_divider: number;
					public static home: number;
					public static horizontal: number;
					public static icon: number;
					public static icon_group: number;
					public static image: number;
					public static info: number;
					public static italic: number;
					public static item_touch_helper_previous_elevation: number;
					public static left: number;
					public static line1: number;
					public static line3: number;
					public static listMode: number;
					public static list_item: number;
					public static message: number;
					public static multiply: number;
					public static none: number;
					public static normal: number;
					public static notification_background: number;
					public static notification_main_column: number;
					public static notification_main_column_container: number;
					public static off: number;
					public static on: number;
					public static parentPanel: number;
					public static progress_circular: number;
					public static progress_horizontal: number;
					public static radio: number;
					public static right: number;
					public static right_icon: number;
					public static right_side: number;
					public static scale: number;
					public static scale_down: number;
					public static screen: number;
					public static scrollIndicatorDown: number;
					public static scrollIndicatorUp: number;
					public static scrollView: number;
					public static search_badge: number;
					public static search_bar: number;
					public static search_button: number;
					public static search_close_btn: number;
					public static search_edit_frame: number;
					public static search_go_btn: number;
					public static search_mag_icon: number;
					public static search_plate: number;
					public static search_src_text: number;
					public static search_voice_btn: number;
					public static select_dialog_listview: number;
					public static shortcut: number;
					public static slide: number;
					public static spacer: number;
					public static split_action_bar: number;
					public static src_atop: number;
					public static src_in: number;
					public static src_over: number;
					public static start: number;
					public static submenuarrow: number;
					public static submit_area: number;
					public static swap: number;
					public static tabMode: number;
					public static tag_accessibility_actions: number;
					public static tag_accessibility_clickable_spans: number;
					public static tag_accessibility_heading: number;
					public static tag_accessibility_pane_title: number;
					public static tag_screen_reader_focusable: number;
					public static tag_transition_group: number;
					public static tag_unhandled_key_event_manager: number;
					public static tag_unhandled_key_listeners: number;
					public static text: number;
					public static text2: number;
					public static textSpacerNoButtons: number;
					public static textSpacerNoTitle: number;
					public static thinWorm: number;
					public static time: number;
					public static title: number;
					public static titleDividerNoCustom: number;
					public static title_template: number;
					public static top: number;
					public static topPanel: number;
					public static unchecked: number;
					public static uniform: number;
					public static up: number;
					public static vertical: number;
					public static worm: number;
					public static wrap_content: number;
				}
				export class integer extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.integer>;
					public static abc_config_activityDefaultDur: number;
					public static abc_config_activityShortDur: number;
					public static cancel_button_image_alpha: number;
					public static config_tooltipAnimTime: number;
					public static status_bar_notification_info_maxnum: number;
				}
				export class interpolator extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.interpolator>;
					public static btn_checkbox_checked_mtrl_animation_interpolator_0: number;
					public static btn_checkbox_checked_mtrl_animation_interpolator_1: number;
					public static btn_checkbox_unchecked_mtrl_animation_interpolator_0: number;
					public static btn_checkbox_unchecked_mtrl_animation_interpolator_1: number;
					public static btn_radio_to_off_mtrl_animation_interpolator_0: number;
					public static btn_radio_to_on_mtrl_animation_interpolator_0: number;
					public static fast_out_slow_in: number;
				}
				export class layout extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.layout>;
					public static abc_action_bar_title_item: number;
					public static abc_action_bar_up_container: number;
					public static abc_action_menu_item_layout: number;
					public static abc_action_menu_layout: number;
					public static abc_action_mode_bar: number;
					public static abc_action_mode_close_item_material: number;
					public static abc_activity_chooser_view: number;
					public static abc_activity_chooser_view_list_item: number;
					public static abc_alert_dialog_button_bar_material: number;
					public static abc_alert_dialog_material: number;
					public static abc_alert_dialog_title_material: number;
					public static abc_cascading_menu_item_layout: number;
					public static abc_dialog_title_material: number;
					public static abc_expanded_menu_layout: number;
					public static abc_list_menu_item_checkbox: number;
					public static abc_list_menu_item_icon: number;
					public static abc_list_menu_item_layout: number;
					public static abc_list_menu_item_radio: number;
					public static abc_popup_menu_header_item_layout: number;
					public static abc_popup_menu_item_layout: number;
					public static abc_screen_content_include: number;
					public static abc_screen_simple: number;
					public static abc_screen_simple_overlay_action_mode: number;
					public static abc_screen_toolbar: number;
					public static abc_search_dropdown_item_icons_2line: number;
					public static abc_search_view: number;
					public static abc_select_dialog_material: number;
					public static abc_tooltip: number;
					public static custom_dialog: number;
					public static notification_action: number;
					public static notification_action_tombstone: number;
					public static notification_template_custom_big: number;
					public static notification_template_icon_group: number;
					public static notification_template_part_chronometer: number;
					public static notification_template_part_time: number;
					public static select_dialog_item_material: number;
					public static select_dialog_multichoice_material: number;
					public static select_dialog_singlechoice_material: number;
					public static support_simple_spinner_dropdown_item: number;
				}
				export class style extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.style>;
					public static AlertDialog_AppCompat: number;
					public static AlertDialog_AppCompat_Light: number;
					public static Animation_AppCompat_Dialog: number;
					public static Animation_AppCompat_DropDownUp: number;
					public static Animation_AppCompat_Tooltip: number;
					public static Base_AlertDialog_AppCompat: number;
					public static Base_AlertDialog_AppCompat_Light: number;
					public static Base_Animation_AppCompat_Dialog: number;
					public static Base_Animation_AppCompat_DropDownUp: number;
					public static Base_Animation_AppCompat_Tooltip: number;
					public static Base_DialogWindowTitleBackground_AppCompat: number;
					public static Base_DialogWindowTitle_AppCompat: number;
					public static Base_TextAppearance_AppCompat: number;
					public static Base_TextAppearance_AppCompat_Body1: number;
					public static Base_TextAppearance_AppCompat_Body2: number;
					public static Base_TextAppearance_AppCompat_Button: number;
					public static Base_TextAppearance_AppCompat_Caption: number;
					public static Base_TextAppearance_AppCompat_Display1: number;
					public static Base_TextAppearance_AppCompat_Display2: number;
					public static Base_TextAppearance_AppCompat_Display3: number;
					public static Base_TextAppearance_AppCompat_Display4: number;
					public static Base_TextAppearance_AppCompat_Headline: number;
					public static Base_TextAppearance_AppCompat_Inverse: number;
					public static Base_TextAppearance_AppCompat_Large: number;
					public static Base_TextAppearance_AppCompat_Large_Inverse: number;
					public static Base_TextAppearance_AppCompat_Light_Widget_PopupMenu_Large: number;
					public static Base_TextAppearance_AppCompat_Light_Widget_PopupMenu_Small: number;
					public static Base_TextAppearance_AppCompat_Medium: number;
					public static Base_TextAppearance_AppCompat_Medium_Inverse: number;
					public static Base_TextAppearance_AppCompat_Menu: number;
					public static Base_TextAppearance_AppCompat_SearchResult: number;
					public static Base_TextAppearance_AppCompat_SearchResult_Subtitle: number;
					public static Base_TextAppearance_AppCompat_SearchResult_Title: number;
					public static Base_TextAppearance_AppCompat_Small: number;
					public static Base_TextAppearance_AppCompat_Small_Inverse: number;
					public static Base_TextAppearance_AppCompat_Subhead: number;
					public static Base_TextAppearance_AppCompat_Subhead_Inverse: number;
					public static Base_TextAppearance_AppCompat_Title: number;
					public static Base_TextAppearance_AppCompat_Title_Inverse: number;
					public static Base_TextAppearance_AppCompat_Tooltip: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionBar_Menu: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionBar_Subtitle: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionBar_Subtitle_Inverse: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionBar_Title: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionBar_Title_Inverse: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionMode_Subtitle: number;
					public static Base_TextAppearance_AppCompat_Widget_ActionMode_Title: number;
					public static Base_TextAppearance_AppCompat_Widget_Button: number;
					public static Base_TextAppearance_AppCompat_Widget_Button_Borderless_Colored: number;
					public static Base_TextAppearance_AppCompat_Widget_Button_Colored: number;
					public static Base_TextAppearance_AppCompat_Widget_Button_Inverse: number;
					public static Base_TextAppearance_AppCompat_Widget_DropDownItem: number;
					public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Header: number;
					public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Large: number;
					public static Base_TextAppearance_AppCompat_Widget_PopupMenu_Small: number;
					public static Base_TextAppearance_AppCompat_Widget_Switch: number;
					public static Base_TextAppearance_AppCompat_Widget_TextView_SpinnerItem: number;
					public static Base_TextAppearance_Widget_AppCompat_ExpandedMenu_Item: number;
					public static Base_TextAppearance_Widget_AppCompat_Toolbar_Subtitle: number;
					public static Base_TextAppearance_Widget_AppCompat_Toolbar_Title: number;
					public static Base_ThemeOverlay_AppCompat: number;
					public static Base_ThemeOverlay_AppCompat_ActionBar: number;
					public static Base_ThemeOverlay_AppCompat_Dark: number;
					public static Base_ThemeOverlay_AppCompat_Dark_ActionBar: number;
					public static Base_ThemeOverlay_AppCompat_Dialog: number;
					public static Base_ThemeOverlay_AppCompat_Dialog_Alert: number;
					public static Base_ThemeOverlay_AppCompat_Light: number;
					public static Base_Theme_AppCompat: number;
					public static Base_Theme_AppCompat_CompactMenu: number;
					public static Base_Theme_AppCompat_Dialog: number;
					public static Base_Theme_AppCompat_DialogWhenLarge: number;
					public static Base_Theme_AppCompat_Dialog_Alert: number;
					public static Base_Theme_AppCompat_Dialog_FixedSize: number;
					public static Base_Theme_AppCompat_Dialog_MinWidth: number;
					public static Base_Theme_AppCompat_Light: number;
					public static Base_Theme_AppCompat_Light_DarkActionBar: number;
					public static Base_Theme_AppCompat_Light_Dialog: number;
					public static Base_Theme_AppCompat_Light_DialogWhenLarge: number;
					public static Base_Theme_AppCompat_Light_Dialog_Alert: number;
					public static Base_Theme_AppCompat_Light_Dialog_FixedSize: number;
					public static Base_Theme_AppCompat_Light_Dialog_MinWidth: number;
					public static Base_V21_ThemeOverlay_AppCompat_Dialog: number;
					public static Base_V21_Theme_AppCompat: number;
					public static Base_V21_Theme_AppCompat_Dialog: number;
					public static Base_V21_Theme_AppCompat_Light: number;
					public static Base_V21_Theme_AppCompat_Light_Dialog: number;
					public static Base_V22_Theme_AppCompat: number;
					public static Base_V22_Theme_AppCompat_Light: number;
					public static Base_V23_Theme_AppCompat: number;
					public static Base_V23_Theme_AppCompat_Light: number;
					public static Base_V26_Theme_AppCompat: number;
					public static Base_V26_Theme_AppCompat_Light: number;
					public static Base_V26_Widget_AppCompat_Toolbar: number;
					public static Base_V28_Theme_AppCompat: number;
					public static Base_V28_Theme_AppCompat_Light: number;
					public static Base_V7_ThemeOverlay_AppCompat_Dialog: number;
					public static Base_V7_Theme_AppCompat: number;
					public static Base_V7_Theme_AppCompat_Dialog: number;
					public static Base_V7_Theme_AppCompat_Light: number;
					public static Base_V7_Theme_AppCompat_Light_Dialog: number;
					public static Base_V7_Widget_AppCompat_AutoCompleteTextView: number;
					public static Base_V7_Widget_AppCompat_EditText: number;
					public static Base_V7_Widget_AppCompat_Toolbar: number;
					public static Base_Widget_AppCompat_ActionBar: number;
					public static Base_Widget_AppCompat_ActionBar_Solid: number;
					public static Base_Widget_AppCompat_ActionBar_TabBar: number;
					public static Base_Widget_AppCompat_ActionBar_TabText: number;
					public static Base_Widget_AppCompat_ActionBar_TabView: number;
					public static Base_Widget_AppCompat_ActionButton: number;
					public static Base_Widget_AppCompat_ActionButton_CloseMode: number;
					public static Base_Widget_AppCompat_ActionButton_Overflow: number;
					public static Base_Widget_AppCompat_ActionMode: number;
					public static Base_Widget_AppCompat_ActivityChooserView: number;
					public static Base_Widget_AppCompat_AutoCompleteTextView: number;
					public static Base_Widget_AppCompat_Button: number;
					public static Base_Widget_AppCompat_ButtonBar: number;
					public static Base_Widget_AppCompat_ButtonBar_AlertDialog: number;
					public static Base_Widget_AppCompat_Button_Borderless: number;
					public static Base_Widget_AppCompat_Button_Borderless_Colored: number;
					public static Base_Widget_AppCompat_Button_ButtonBar_AlertDialog: number;
					public static Base_Widget_AppCompat_Button_Colored: number;
					public static Base_Widget_AppCompat_Button_Small: number;
					public static Base_Widget_AppCompat_CompoundButton_CheckBox: number;
					public static Base_Widget_AppCompat_CompoundButton_RadioButton: number;
					public static Base_Widget_AppCompat_CompoundButton_Switch: number;
					public static Base_Widget_AppCompat_DrawerArrowToggle: number;
					public static Base_Widget_AppCompat_DrawerArrowToggle_Common: number;
					public static Base_Widget_AppCompat_DropDownItem_Spinner: number;
					public static Base_Widget_AppCompat_EditText: number;
					public static Base_Widget_AppCompat_ImageButton: number;
					public static Base_Widget_AppCompat_Light_ActionBar: number;
					public static Base_Widget_AppCompat_Light_ActionBar_Solid: number;
					public static Base_Widget_AppCompat_Light_ActionBar_TabBar: number;
					public static Base_Widget_AppCompat_Light_ActionBar_TabText: number;
					public static Base_Widget_AppCompat_Light_ActionBar_TabText_Inverse: number;
					public static Base_Widget_AppCompat_Light_ActionBar_TabView: number;
					public static Base_Widget_AppCompat_Light_PopupMenu: number;
					public static Base_Widget_AppCompat_Light_PopupMenu_Overflow: number;
					public static Base_Widget_AppCompat_ListMenuView: number;
					public static Base_Widget_AppCompat_ListPopupWindow: number;
					public static Base_Widget_AppCompat_ListView: number;
					public static Base_Widget_AppCompat_ListView_DropDown: number;
					public static Base_Widget_AppCompat_ListView_Menu: number;
					public static Base_Widget_AppCompat_PopupMenu: number;
					public static Base_Widget_AppCompat_PopupMenu_Overflow: number;
					public static Base_Widget_AppCompat_PopupWindow: number;
					public static Base_Widget_AppCompat_ProgressBar: number;
					public static Base_Widget_AppCompat_ProgressBar_Horizontal: number;
					public static Base_Widget_AppCompat_RatingBar: number;
					public static Base_Widget_AppCompat_RatingBar_Indicator: number;
					public static Base_Widget_AppCompat_RatingBar_Small: number;
					public static Base_Widget_AppCompat_SearchView: number;
					public static Base_Widget_AppCompat_SearchView_ActionBar: number;
					public static Base_Widget_AppCompat_SeekBar: number;
					public static Base_Widget_AppCompat_SeekBar_Discrete: number;
					public static Base_Widget_AppCompat_Spinner: number;
					public static Base_Widget_AppCompat_Spinner_Underlined: number;
					public static Base_Widget_AppCompat_TextView: number;
					public static Base_Widget_AppCompat_TextView_SpinnerItem: number;
					public static Base_Widget_AppCompat_Toolbar: number;
					public static Base_Widget_AppCompat_Toolbar_Button_Navigation: number;
					public static Platform_AppCompat: number;
					public static Platform_AppCompat_Light: number;
					public static Platform_ThemeOverlay_AppCompat: number;
					public static Platform_ThemeOverlay_AppCompat_Dark: number;
					public static Platform_ThemeOverlay_AppCompat_Light: number;
					public static Platform_V21_AppCompat: number;
					public static Platform_V21_AppCompat_Light: number;
					public static Platform_V25_AppCompat: number;
					public static Platform_V25_AppCompat_Light: number;
					public static Platform_Widget_AppCompat_Spinner: number;
					public static RtlOverlay_DialogWindowTitle_AppCompat: number;
					public static RtlOverlay_Widget_AppCompat_ActionBar_TitleItem: number;
					public static RtlOverlay_Widget_AppCompat_DialogTitle_Icon: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem_InternalGroup: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Shortcut: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem_SubmenuArrow: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Text: number;
					public static RtlOverlay_Widget_AppCompat_PopupMenuItem_Title: number;
					public static RtlOverlay_Widget_AppCompat_SearchView_MagIcon: number;
					public static RtlOverlay_Widget_AppCompat_Search_DropDown: number;
					public static RtlOverlay_Widget_AppCompat_Search_DropDown_Icon1: number;
					public static RtlOverlay_Widget_AppCompat_Search_DropDown_Icon2: number;
					public static RtlOverlay_Widget_AppCompat_Search_DropDown_Query: number;
					public static RtlOverlay_Widget_AppCompat_Search_DropDown_Text: number;
					public static RtlUnderlay_Widget_AppCompat_ActionButton: number;
					public static RtlUnderlay_Widget_AppCompat_ActionButton_Overflow: number;
					public static TextAppearance_AppCompat: number;
					public static TextAppearance_AppCompat_Body1: number;
					public static TextAppearance_AppCompat_Body2: number;
					public static TextAppearance_AppCompat_Button: number;
					public static TextAppearance_AppCompat_Caption: number;
					public static TextAppearance_AppCompat_Display1: number;
					public static TextAppearance_AppCompat_Display2: number;
					public static TextAppearance_AppCompat_Display3: number;
					public static TextAppearance_AppCompat_Display4: number;
					public static TextAppearance_AppCompat_Headline: number;
					public static TextAppearance_AppCompat_Inverse: number;
					public static TextAppearance_AppCompat_Large: number;
					public static TextAppearance_AppCompat_Large_Inverse: number;
					public static TextAppearance_AppCompat_Light_SearchResult_Subtitle: number;
					public static TextAppearance_AppCompat_Light_SearchResult_Title: number;
					public static TextAppearance_AppCompat_Light_Widget_PopupMenu_Large: number;
					public static TextAppearance_AppCompat_Light_Widget_PopupMenu_Small: number;
					public static TextAppearance_AppCompat_Medium: number;
					public static TextAppearance_AppCompat_Medium_Inverse: number;
					public static TextAppearance_AppCompat_Menu: number;
					public static TextAppearance_AppCompat_SearchResult_Subtitle: number;
					public static TextAppearance_AppCompat_SearchResult_Title: number;
					public static TextAppearance_AppCompat_Small: number;
					public static TextAppearance_AppCompat_Small_Inverse: number;
					public static TextAppearance_AppCompat_Subhead: number;
					public static TextAppearance_AppCompat_Subhead_Inverse: number;
					public static TextAppearance_AppCompat_Title: number;
					public static TextAppearance_AppCompat_Title_Inverse: number;
					public static TextAppearance_AppCompat_Tooltip: number;
					public static TextAppearance_AppCompat_Widget_ActionBar_Menu: number;
					public static TextAppearance_AppCompat_Widget_ActionBar_Subtitle: number;
					public static TextAppearance_AppCompat_Widget_ActionBar_Subtitle_Inverse: number;
					public static TextAppearance_AppCompat_Widget_ActionBar_Title: number;
					public static TextAppearance_AppCompat_Widget_ActionBar_Title_Inverse: number;
					public static TextAppearance_AppCompat_Widget_ActionMode_Subtitle: number;
					public static TextAppearance_AppCompat_Widget_ActionMode_Subtitle_Inverse: number;
					public static TextAppearance_AppCompat_Widget_ActionMode_Title: number;
					public static TextAppearance_AppCompat_Widget_ActionMode_Title_Inverse: number;
					public static TextAppearance_AppCompat_Widget_Button: number;
					public static TextAppearance_AppCompat_Widget_Button_Borderless_Colored: number;
					public static TextAppearance_AppCompat_Widget_Button_Colored: number;
					public static TextAppearance_AppCompat_Widget_Button_Inverse: number;
					public static TextAppearance_AppCompat_Widget_DropDownItem: number;
					public static TextAppearance_AppCompat_Widget_PopupMenu_Header: number;
					public static TextAppearance_AppCompat_Widget_PopupMenu_Large: number;
					public static TextAppearance_AppCompat_Widget_PopupMenu_Small: number;
					public static TextAppearance_AppCompat_Widget_Switch: number;
					public static TextAppearance_AppCompat_Widget_TextView_SpinnerItem: number;
					public static TextAppearance_Compat_Notification: number;
					public static TextAppearance_Compat_Notification_Info: number;
					public static TextAppearance_Compat_Notification_Line2: number;
					public static TextAppearance_Compat_Notification_Time: number;
					public static TextAppearance_Compat_Notification_Title: number;
					public static TextAppearance_Widget_AppCompat_ExpandedMenu_Item: number;
					public static TextAppearance_Widget_AppCompat_Toolbar_Subtitle: number;
					public static TextAppearance_Widget_AppCompat_Toolbar_Title: number;
					public static ThemeOverlay_AppCompat: number;
					public static ThemeOverlay_AppCompat_ActionBar: number;
					public static ThemeOverlay_AppCompat_Dark: number;
					public static ThemeOverlay_AppCompat_Dark_ActionBar: number;
					public static ThemeOverlay_AppCompat_Dialog: number;
					public static ThemeOverlay_AppCompat_Dialog_Alert: number;
					public static ThemeOverlay_AppCompat_Light: number;
					public static Theme_AppCompat: number;
					public static Theme_AppCompat_CompactMenu: number;
					public static Theme_AppCompat_DayNight: number;
					public static Theme_AppCompat_DayNight_DarkActionBar: number;
					public static Theme_AppCompat_DayNight_Dialog: number;
					public static Theme_AppCompat_DayNight_DialogWhenLarge: number;
					public static Theme_AppCompat_DayNight_Dialog_Alert: number;
					public static Theme_AppCompat_DayNight_Dialog_MinWidth: number;
					public static Theme_AppCompat_DayNight_NoActionBar: number;
					public static Theme_AppCompat_Dialog: number;
					public static Theme_AppCompat_DialogWhenLarge: number;
					public static Theme_AppCompat_Dialog_Alert: number;
					public static Theme_AppCompat_Dialog_MinWidth: number;
					public static Theme_AppCompat_Light: number;
					public static Theme_AppCompat_Light_DarkActionBar: number;
					public static Theme_AppCompat_Light_Dialog: number;
					public static Theme_AppCompat_Light_DialogWhenLarge: number;
					public static Theme_AppCompat_Light_Dialog_Alert: number;
					public static Theme_AppCompat_Light_Dialog_MinWidth: number;
					public static Theme_AppCompat_Light_NoActionBar: number;
					public static Theme_AppCompat_NoActionBar: number;
					public static Widget_AppCompat_ActionBar: number;
					public static Widget_AppCompat_ActionBar_Solid: number;
					public static Widget_AppCompat_ActionBar_TabBar: number;
					public static Widget_AppCompat_ActionBar_TabText: number;
					public static Widget_AppCompat_ActionBar_TabView: number;
					public static Widget_AppCompat_ActionButton: number;
					public static Widget_AppCompat_ActionButton_CloseMode: number;
					public static Widget_AppCompat_ActionButton_Overflow: number;
					public static Widget_AppCompat_ActionMode: number;
					public static Widget_AppCompat_ActivityChooserView: number;
					public static Widget_AppCompat_AutoCompleteTextView: number;
					public static Widget_AppCompat_Button: number;
					public static Widget_AppCompat_ButtonBar: number;
					public static Widget_AppCompat_ButtonBar_AlertDialog: number;
					public static Widget_AppCompat_Button_Borderless: number;
					public static Widget_AppCompat_Button_Borderless_Colored: number;
					public static Widget_AppCompat_Button_ButtonBar_AlertDialog: number;
					public static Widget_AppCompat_Button_Colored: number;
					public static Widget_AppCompat_Button_Small: number;
					public static Widget_AppCompat_CompoundButton_CheckBox: number;
					public static Widget_AppCompat_CompoundButton_RadioButton: number;
					public static Widget_AppCompat_CompoundButton_Switch: number;
					public static Widget_AppCompat_DrawerArrowToggle: number;
					public static Widget_AppCompat_DropDownItem_Spinner: number;
					public static Widget_AppCompat_EditText: number;
					public static Widget_AppCompat_ImageButton: number;
					public static Widget_AppCompat_Light_ActionBar: number;
					public static Widget_AppCompat_Light_ActionBar_Solid: number;
					public static Widget_AppCompat_Light_ActionBar_Solid_Inverse: number;
					public static Widget_AppCompat_Light_ActionBar_TabBar: number;
					public static Widget_AppCompat_Light_ActionBar_TabBar_Inverse: number;
					public static Widget_AppCompat_Light_ActionBar_TabText: number;
					public static Widget_AppCompat_Light_ActionBar_TabText_Inverse: number;
					public static Widget_AppCompat_Light_ActionBar_TabView: number;
					public static Widget_AppCompat_Light_ActionBar_TabView_Inverse: number;
					public static Widget_AppCompat_Light_ActionButton: number;
					public static Widget_AppCompat_Light_ActionButton_CloseMode: number;
					public static Widget_AppCompat_Light_ActionButton_Overflow: number;
					public static Widget_AppCompat_Light_ActionMode_Inverse: number;
					public static Widget_AppCompat_Light_ActivityChooserView: number;
					public static Widget_AppCompat_Light_AutoCompleteTextView: number;
					public static Widget_AppCompat_Light_DropDownItem_Spinner: number;
					public static Widget_AppCompat_Light_ListPopupWindow: number;
					public static Widget_AppCompat_Light_ListView_DropDown: number;
					public static Widget_AppCompat_Light_PopupMenu: number;
					public static Widget_AppCompat_Light_PopupMenu_Overflow: number;
					public static Widget_AppCompat_Light_SearchView: number;
					public static Widget_AppCompat_Light_Spinner_DropDown_ActionBar: number;
					public static Widget_AppCompat_ListMenuView: number;
					public static Widget_AppCompat_ListPopupWindow: number;
					public static Widget_AppCompat_ListView: number;
					public static Widget_AppCompat_ListView_DropDown: number;
					public static Widget_AppCompat_ListView_Menu: number;
					public static Widget_AppCompat_PopupMenu: number;
					public static Widget_AppCompat_PopupMenu_Overflow: number;
					public static Widget_AppCompat_PopupWindow: number;
					public static Widget_AppCompat_ProgressBar: number;
					public static Widget_AppCompat_ProgressBar_Horizontal: number;
					public static Widget_AppCompat_RatingBar: number;
					public static Widget_AppCompat_RatingBar_Indicator: number;
					public static Widget_AppCompat_RatingBar_Small: number;
					public static Widget_AppCompat_SearchView: number;
					public static Widget_AppCompat_SearchView_ActionBar: number;
					public static Widget_AppCompat_SeekBar: number;
					public static Widget_AppCompat_SeekBar_Discrete: number;
					public static Widget_AppCompat_Spinner: number;
					public static Widget_AppCompat_Spinner_DropDown: number;
					public static Widget_AppCompat_Spinner_DropDown_ActionBar: number;
					public static Widget_AppCompat_Spinner_Underlined: number;
					public static Widget_AppCompat_TextView: number;
					public static Widget_AppCompat_TextView_SpinnerItem: number;
					public static Widget_AppCompat_Toolbar: number;
					public static Widget_AppCompat_Toolbar_Button_Navigation: number;
					public static Widget_Compat_NotificationActionContainer: number;
					public static Widget_Compat_NotificationActionText: number;
					public static Widget_Support_CoordinatorLayout: number;
				}
				export class styleable extends java.lang.Object {
					public static class: java.lang.Class<com.rd.pageindicatorview.R.styleable>;
					public static ActionBar: androidNative.Array<number>;
					public static ActionBar_background: number;
					public static ActionBar_backgroundSplit: number;
					public static ActionBar_backgroundStacked: number;
					public static ActionBar_contentInsetEnd: number;
					public static ActionBar_contentInsetEndWithActions: number;
					public static ActionBar_contentInsetLeft: number;
					public static ActionBar_contentInsetRight: number;
					public static ActionBar_contentInsetStart: number;
					public static ActionBar_contentInsetStartWithNavigation: number;
					public static ActionBar_customNavigationLayout: number;
					public static ActionBar_displayOptions: number;
					public static ActionBar_divider: number;
					public static ActionBar_elevation: number;
					public static ActionBar_height: number;
					public static ActionBar_hideOnContentScroll: number;
					public static ActionBar_homeAsUpIndicator: number;
					public static ActionBar_homeLayout: number;
					public static ActionBar_icon: number;
					public static ActionBar_indeterminateProgressStyle: number;
					public static ActionBar_itemPadding: number;
					public static ActionBar_logo: number;
					public static ActionBar_navigationMode: number;
					public static ActionBar_popupTheme: number;
					public static ActionBar_progressBarPadding: number;
					public static ActionBar_progressBarStyle: number;
					public static ActionBar_subtitle: number;
					public static ActionBar_subtitleTextStyle: number;
					public static ActionBar_title: number;
					public static ActionBar_titleTextStyle: number;
					public static ActionBarLayout: androidNative.Array<number>;
					public static ActionBarLayout_android_layout_gravity: number;
					public static ActionMenuItemView: androidNative.Array<number>;
					public static ActionMenuItemView_android_minWidth: number;
					public static ActionMenuView: androidNative.Array<number>;
					public static ActionMode: androidNative.Array<number>;
					public static ActionMode_background: number;
					public static ActionMode_backgroundSplit: number;
					public static ActionMode_closeItemLayout: number;
					public static ActionMode_height: number;
					public static ActionMode_subtitleTextStyle: number;
					public static ActionMode_titleTextStyle: number;
					public static ActivityChooserView: androidNative.Array<number>;
					public static ActivityChooserView_expandActivityOverflowButtonDrawable: number;
					public static ActivityChooserView_initialActivityCount: number;
					public static AlertDialog: androidNative.Array<number>;
					public static AlertDialog_android_layout: number;
					public static AlertDialog_buttonIconDimen: number;
					public static AlertDialog_buttonPanelSideLayout: number;
					public static AlertDialog_listItemLayout: number;
					public static AlertDialog_listLayout: number;
					public static AlertDialog_multiChoiceItemLayout: number;
					public static AlertDialog_showTitle: number;
					public static AlertDialog_singleChoiceItemLayout: number;
					public static AnimatedStateListDrawableCompat: androidNative.Array<number>;
					public static AnimatedStateListDrawableCompat_android_constantSize: number;
					public static AnimatedStateListDrawableCompat_android_dither: number;
					public static AnimatedStateListDrawableCompat_android_enterFadeDuration: number;
					public static AnimatedStateListDrawableCompat_android_exitFadeDuration: number;
					public static AnimatedStateListDrawableCompat_android_variablePadding: number;
					public static AnimatedStateListDrawableCompat_android_visible: number;
					public static AnimatedStateListDrawableItem: androidNative.Array<number>;
					public static AnimatedStateListDrawableItem_android_drawable: number;
					public static AnimatedStateListDrawableItem_android_id: number;
					public static AnimatedStateListDrawableTransition: androidNative.Array<number>;
					public static AnimatedStateListDrawableTransition_android_drawable: number;
					public static AnimatedStateListDrawableTransition_android_fromId: number;
					public static AnimatedStateListDrawableTransition_android_reversible: number;
					public static AnimatedStateListDrawableTransition_android_toId: number;
					public static AppCompatImageView: androidNative.Array<number>;
					public static AppCompatImageView_android_src: number;
					public static AppCompatImageView_srcCompat: number;
					public static AppCompatImageView_tint: number;
					public static AppCompatImageView_tintMode: number;
					public static AppCompatSeekBar: androidNative.Array<number>;
					public static AppCompatSeekBar_android_thumb: number;
					public static AppCompatSeekBar_tickMark: number;
					public static AppCompatSeekBar_tickMarkTint: number;
					public static AppCompatSeekBar_tickMarkTintMode: number;
					public static AppCompatTextHelper: androidNative.Array<number>;
					public static AppCompatTextHelper_android_drawableBottom: number;
					public static AppCompatTextHelper_android_drawableEnd: number;
					public static AppCompatTextHelper_android_drawableLeft: number;
					public static AppCompatTextHelper_android_drawableRight: number;
					public static AppCompatTextHelper_android_drawableStart: number;
					public static AppCompatTextHelper_android_drawableTop: number;
					public static AppCompatTextHelper_android_textAppearance: number;
					public static AppCompatTextView: androidNative.Array<number>;
					public static AppCompatTextView_android_textAppearance: number;
					public static AppCompatTextView_autoSizeMaxTextSize: number;
					public static AppCompatTextView_autoSizeMinTextSize: number;
					public static AppCompatTextView_autoSizePresetSizes: number;
					public static AppCompatTextView_autoSizeStepGranularity: number;
					public static AppCompatTextView_autoSizeTextType: number;
					public static AppCompatTextView_drawableBottomCompat: number;
					public static AppCompatTextView_drawableEndCompat: number;
					public static AppCompatTextView_drawableLeftCompat: number;
					public static AppCompatTextView_drawableRightCompat: number;
					public static AppCompatTextView_drawableStartCompat: number;
					public static AppCompatTextView_drawableTopCompat: number;
					public static AppCompatTextView_firstBaselineToTopHeight: number;
					public static AppCompatTextView_fontFamily: number;
					public static AppCompatTextView_fontVariationSettings: number;
					public static AppCompatTextView_lastBaselineToBottomHeight: number;
					public static AppCompatTextView_lineHeight: number;
					public static AppCompatTextView_textAllCaps: number;
					public static AppCompatTextView_textLocale: number;
					public static AppCompatTheme: androidNative.Array<number>;
					public static AppCompatTheme_actionBarDivider: number;
					public static AppCompatTheme_actionBarItemBackground: number;
					public static AppCompatTheme_actionBarPopupTheme: number;
					public static AppCompatTheme_actionBarSize: number;
					public static AppCompatTheme_actionBarSplitStyle: number;
					public static AppCompatTheme_actionBarStyle: number;
					public static AppCompatTheme_actionBarTabBarStyle: number;
					public static AppCompatTheme_actionBarTabStyle: number;
					public static AppCompatTheme_actionBarTabTextStyle: number;
					public static AppCompatTheme_actionBarTheme: number;
					public static AppCompatTheme_actionBarWidgetTheme: number;
					public static AppCompatTheme_actionButtonStyle: number;
					public static AppCompatTheme_actionDropDownStyle: number;
					public static AppCompatTheme_actionMenuTextAppearance: number;
					public static AppCompatTheme_actionMenuTextColor: number;
					public static AppCompatTheme_actionModeBackground: number;
					public static AppCompatTheme_actionModeCloseButtonStyle: number;
					public static AppCompatTheme_actionModeCloseDrawable: number;
					public static AppCompatTheme_actionModeCopyDrawable: number;
					public static AppCompatTheme_actionModeCutDrawable: number;
					public static AppCompatTheme_actionModeFindDrawable: number;
					public static AppCompatTheme_actionModePasteDrawable: number;
					public static AppCompatTheme_actionModePopupWindowStyle: number;
					public static AppCompatTheme_actionModeSelectAllDrawable: number;
					public static AppCompatTheme_actionModeShareDrawable: number;
					public static AppCompatTheme_actionModeSplitBackground: number;
					public static AppCompatTheme_actionModeStyle: number;
					public static AppCompatTheme_actionModeWebSearchDrawable: number;
					public static AppCompatTheme_actionOverflowButtonStyle: number;
					public static AppCompatTheme_actionOverflowMenuStyle: number;
					public static AppCompatTheme_activityChooserViewStyle: number;
					public static AppCompatTheme_alertDialogButtonGroupStyle: number;
					public static AppCompatTheme_alertDialogCenterButtons: number;
					public static AppCompatTheme_alertDialogStyle: number;
					public static AppCompatTheme_alertDialogTheme: number;
					public static AppCompatTheme_android_windowAnimationStyle: number;
					public static AppCompatTheme_android_windowIsFloating: number;
					public static AppCompatTheme_autoCompleteTextViewStyle: number;
					public static AppCompatTheme_borderlessButtonStyle: number;
					public static AppCompatTheme_buttonBarButtonStyle: number;
					public static AppCompatTheme_buttonBarNegativeButtonStyle: number;
					public static AppCompatTheme_buttonBarNeutralButtonStyle: number;
					public static AppCompatTheme_buttonBarPositiveButtonStyle: number;
					public static AppCompatTheme_buttonBarStyle: number;
					public static AppCompatTheme_buttonStyle: number;
					public static AppCompatTheme_buttonStyleSmall: number;
					public static AppCompatTheme_checkboxStyle: number;
					public static AppCompatTheme_checkedTextViewStyle: number;
					public static AppCompatTheme_colorAccent: number;
					public static AppCompatTheme_colorBackgroundFloating: number;
					public static AppCompatTheme_colorButtonNormal: number;
					public static AppCompatTheme_colorControlActivated: number;
					public static AppCompatTheme_colorControlHighlight: number;
					public static AppCompatTheme_colorControlNormal: number;
					public static AppCompatTheme_colorError: number;
					public static AppCompatTheme_colorPrimary: number;
					public static AppCompatTheme_colorPrimaryDark: number;
					public static AppCompatTheme_colorSwitchThumbNormal: number;
					public static AppCompatTheme_controlBackground: number;
					public static AppCompatTheme_dialogCornerRadius: number;
					public static AppCompatTheme_dialogPreferredPadding: number;
					public static AppCompatTheme_dialogTheme: number;
					public static AppCompatTheme_dividerHorizontal: number;
					public static AppCompatTheme_dividerVertical: number;
					public static AppCompatTheme_dropDownListViewStyle: number;
					public static AppCompatTheme_dropdownListPreferredItemHeight: number;
					public static AppCompatTheme_editTextBackground: number;
					public static AppCompatTheme_editTextColor: number;
					public static AppCompatTheme_editTextStyle: number;
					public static AppCompatTheme_homeAsUpIndicator: number;
					public static AppCompatTheme_imageButtonStyle: number;
					public static AppCompatTheme_listChoiceBackgroundIndicator: number;
					public static AppCompatTheme_listChoiceIndicatorMultipleAnimated: number;
					public static AppCompatTheme_listChoiceIndicatorSingleAnimated: number;
					public static AppCompatTheme_listDividerAlertDialog: number;
					public static AppCompatTheme_listMenuViewStyle: number;
					public static AppCompatTheme_listPopupWindowStyle: number;
					public static AppCompatTheme_listPreferredItemHeight: number;
					public static AppCompatTheme_listPreferredItemHeightLarge: number;
					public static AppCompatTheme_listPreferredItemHeightSmall: number;
					public static AppCompatTheme_listPreferredItemPaddingEnd: number;
					public static AppCompatTheme_listPreferredItemPaddingLeft: number;
					public static AppCompatTheme_listPreferredItemPaddingRight: number;
					public static AppCompatTheme_listPreferredItemPaddingStart: number;
					public static AppCompatTheme_panelBackground: number;
					public static AppCompatTheme_panelMenuListTheme: number;
					public static AppCompatTheme_panelMenuListWidth: number;
					public static AppCompatTheme_popupMenuStyle: number;
					public static AppCompatTheme_popupWindowStyle: number;
					public static AppCompatTheme_radioButtonStyle: number;
					public static AppCompatTheme_ratingBarStyle: number;
					public static AppCompatTheme_ratingBarStyleIndicator: number;
					public static AppCompatTheme_ratingBarStyleSmall: number;
					public static AppCompatTheme_searchViewStyle: number;
					public static AppCompatTheme_seekBarStyle: number;
					public static AppCompatTheme_selectableItemBackground: number;
					public static AppCompatTheme_selectableItemBackgroundBorderless: number;
					public static AppCompatTheme_spinnerDropDownItemStyle: number;
					public static AppCompatTheme_spinnerStyle: number;
					public static AppCompatTheme_switchStyle: number;
					public static AppCompatTheme_textAppearanceLargePopupMenu: number;
					public static AppCompatTheme_textAppearanceListItem: number;
					public static AppCompatTheme_textAppearanceListItemSecondary: number;
					public static AppCompatTheme_textAppearanceListItemSmall: number;
					public static AppCompatTheme_textAppearancePopupMenuHeader: number;
					public static AppCompatTheme_textAppearanceSearchResultSubtitle: number;
					public static AppCompatTheme_textAppearanceSearchResultTitle: number;
					public static AppCompatTheme_textAppearanceSmallPopupMenu: number;
					public static AppCompatTheme_textColorAlertDialogListItem: number;
					public static AppCompatTheme_textColorSearchUrl: number;
					public static AppCompatTheme_toolbarNavigationButtonStyle: number;
					public static AppCompatTheme_toolbarStyle: number;
					public static AppCompatTheme_tooltipForegroundColor: number;
					public static AppCompatTheme_tooltipFrameBackground: number;
					public static AppCompatTheme_viewInflaterClass: number;
					public static AppCompatTheme_windowActionBar: number;
					public static AppCompatTheme_windowActionBarOverlay: number;
					public static AppCompatTheme_windowActionModeOverlay: number;
					public static AppCompatTheme_windowFixedHeightMajor: number;
					public static AppCompatTheme_windowFixedHeightMinor: number;
					public static AppCompatTheme_windowFixedWidthMajor: number;
					public static AppCompatTheme_windowFixedWidthMinor: number;
					public static AppCompatTheme_windowMinWidthMajor: number;
					public static AppCompatTheme_windowMinWidthMinor: number;
					public static AppCompatTheme_windowNoTitle: number;
					public static ButtonBarLayout: androidNative.Array<number>;
					public static ButtonBarLayout_allowStacking: number;
					public static ColorStateListItem: androidNative.Array<number>;
					public static ColorStateListItem_alpha: number;
					public static ColorStateListItem_android_alpha: number;
					public static ColorStateListItem_android_color: number;
					public static CompoundButton: androidNative.Array<number>;
					public static CompoundButton_android_button: number;
					public static CompoundButton_buttonCompat: number;
					public static CompoundButton_buttonTint: number;
					public static CompoundButton_buttonTintMode: number;
					public static CoordinatorLayout: androidNative.Array<number>;
					public static CoordinatorLayout_keylines: number;
					public static CoordinatorLayout_statusBarBackground: number;
					public static CoordinatorLayout_Layout: androidNative.Array<number>;
					public static CoordinatorLayout_Layout_android_layout_gravity: number;
					public static CoordinatorLayout_Layout_layout_anchor: number;
					public static CoordinatorLayout_Layout_layout_anchorGravity: number;
					public static CoordinatorLayout_Layout_layout_behavior: number;
					public static CoordinatorLayout_Layout_layout_dodgeInsetEdges: number;
					public static CoordinatorLayout_Layout_layout_insetEdge: number;
					public static CoordinatorLayout_Layout_layout_keyline: number;
					public static DrawerArrowToggle: androidNative.Array<number>;
					public static DrawerArrowToggle_arrowHeadLength: number;
					public static DrawerArrowToggle_arrowShaftLength: number;
					public static DrawerArrowToggle_barLength: number;
					public static DrawerArrowToggle_color: number;
					public static DrawerArrowToggle_drawableSize: number;
					public static DrawerArrowToggle_gapBetweenBars: number;
					public static DrawerArrowToggle_spinBars: number;
					public static DrawerArrowToggle_thickness: number;
					public static FontFamily: androidNative.Array<number>;
					public static FontFamily_fontProviderAuthority: number;
					public static FontFamily_fontProviderCerts: number;
					public static FontFamily_fontProviderFetchStrategy: number;
					public static FontFamily_fontProviderFetchTimeout: number;
					public static FontFamily_fontProviderPackage: number;
					public static FontFamily_fontProviderQuery: number;
					public static FontFamilyFont: androidNative.Array<number>;
					public static FontFamilyFont_android_font: number;
					public static FontFamilyFont_android_fontStyle: number;
					public static FontFamilyFont_android_fontVariationSettings: number;
					public static FontFamilyFont_android_fontWeight: number;
					public static FontFamilyFont_android_ttcIndex: number;
					public static FontFamilyFont_font: number;
					public static FontFamilyFont_fontStyle: number;
					public static FontFamilyFont_fontVariationSettings: number;
					public static FontFamilyFont_fontWeight: number;
					public static FontFamilyFont_ttcIndex: number;
					public static GradientColor: androidNative.Array<number>;
					public static GradientColor_android_centerColor: number;
					public static GradientColor_android_centerX: number;
					public static GradientColor_android_centerY: number;
					public static GradientColor_android_endColor: number;
					public static GradientColor_android_endX: number;
					public static GradientColor_android_endY: number;
					public static GradientColor_android_gradientRadius: number;
					public static GradientColor_android_startColor: number;
					public static GradientColor_android_startX: number;
					public static GradientColor_android_startY: number;
					public static GradientColor_android_tileMode: number;
					public static GradientColor_android_type: number;
					public static GradientColorItem: androidNative.Array<number>;
					public static GradientColorItem_android_color: number;
					public static GradientColorItem_android_offset: number;
					public static LinearLayoutCompat: androidNative.Array<number>;
					public static LinearLayoutCompat_android_baselineAligned: number;
					public static LinearLayoutCompat_android_baselineAlignedChildIndex: number;
					public static LinearLayoutCompat_android_gravity: number;
					public static LinearLayoutCompat_android_orientation: number;
					public static LinearLayoutCompat_android_weightSum: number;
					public static LinearLayoutCompat_divider: number;
					public static LinearLayoutCompat_dividerPadding: number;
					public static LinearLayoutCompat_measureWithLargestChild: number;
					public static LinearLayoutCompat_showDividers: number;
					public static LinearLayoutCompat_Layout: androidNative.Array<number>;
					public static LinearLayoutCompat_Layout_android_layout_gravity: number;
					public static LinearLayoutCompat_Layout_android_layout_height: number;
					public static LinearLayoutCompat_Layout_android_layout_weight: number;
					public static LinearLayoutCompat_Layout_android_layout_width: number;
					public static ListPopupWindow: androidNative.Array<number>;
					public static ListPopupWindow_android_dropDownHorizontalOffset: number;
					public static ListPopupWindow_android_dropDownVerticalOffset: number;
					public static MenuGroup: androidNative.Array<number>;
					public static MenuGroup_android_checkableBehavior: number;
					public static MenuGroup_android_enabled: number;
					public static MenuGroup_android_id: number;
					public static MenuGroup_android_menuCategory: number;
					public static MenuGroup_android_orderInCategory: number;
					public static MenuGroup_android_visible: number;
					public static MenuItem: androidNative.Array<number>;
					public static MenuItem_actionLayout: number;
					public static MenuItem_actionProviderClass: number;
					public static MenuItem_actionViewClass: number;
					public static MenuItem_alphabeticModifiers: number;
					public static MenuItem_android_alphabeticShortcut: number;
					public static MenuItem_android_checkable: number;
					public static MenuItem_android_checked: number;
					public static MenuItem_android_enabled: number;
					public static MenuItem_android_icon: number;
					public static MenuItem_android_id: number;
					public static MenuItem_android_menuCategory: number;
					public static MenuItem_android_numericShortcut: number;
					public static MenuItem_android_onClick: number;
					public static MenuItem_android_orderInCategory: number;
					public static MenuItem_android_title: number;
					public static MenuItem_android_titleCondensed: number;
					public static MenuItem_android_visible: number;
					public static MenuItem_contentDescription: number;
					public static MenuItem_iconTint: number;
					public static MenuItem_iconTintMode: number;
					public static MenuItem_numericModifiers: number;
					public static MenuItem_showAsAction: number;
					public static MenuItem_tooltipText: number;
					public static MenuView: androidNative.Array<number>;
					public static MenuView_android_headerBackground: number;
					public static MenuView_android_horizontalDivider: number;
					public static MenuView_android_itemBackground: number;
					public static MenuView_android_itemIconDisabledAlpha: number;
					public static MenuView_android_itemTextAppearance: number;
					public static MenuView_android_verticalDivider: number;
					public static MenuView_android_windowAnimationStyle: number;
					public static MenuView_preserveIconSpacing: number;
					public static MenuView_subMenuArrow: number;
					public static PageIndicatorView: androidNative.Array<number>;
					public static PageIndicatorView_piv_animationDuration: number;
					public static PageIndicatorView_piv_animationType: number;
					public static PageIndicatorView_piv_autoVisibility: number;
					public static PageIndicatorView_piv_count: number;
					public static PageIndicatorView_piv_dynamicCount: number;
					public static PageIndicatorView_piv_fadeOnIdle: number;
					public static PageIndicatorView_piv_idleDuration: number;
					public static PageIndicatorView_piv_interactiveAnimation: number;
					public static PageIndicatorView_piv_orientation: number;
					public static PageIndicatorView_piv_padding: number;
					public static PageIndicatorView_piv_radius: number;
					public static PageIndicatorView_piv_rtl_mode: number;
					public static PageIndicatorView_piv_scaleFactor: number;
					public static PageIndicatorView_piv_select: number;
					public static PageIndicatorView_piv_selectedColor: number;
					public static PageIndicatorView_piv_strokeWidth: number;
					public static PageIndicatorView_piv_unselectedColor: number;
					public static PageIndicatorView_piv_viewPager: number;
					public static PopupWindow: androidNative.Array<number>;
					public static PopupWindow_android_popupAnimationStyle: number;
					public static PopupWindow_android_popupBackground: number;
					public static PopupWindow_overlapAnchor: number;
					public static PopupWindowBackgroundState: androidNative.Array<number>;
					public static PopupWindowBackgroundState_state_above_anchor: number;
					public static RecycleListView: androidNative.Array<number>;
					public static RecycleListView_paddingBottomNoButtons: number;
					public static RecycleListView_paddingTopNoTitle: number;
					public static RecyclerView: androidNative.Array<number>;
					public static RecyclerView_android_descendantFocusability: number;
					public static RecyclerView_android_orientation: number;
					public static RecyclerView_fastScrollEnabled: number;
					public static RecyclerView_fastScrollHorizontalThumbDrawable: number;
					public static RecyclerView_fastScrollHorizontalTrackDrawable: number;
					public static RecyclerView_fastScrollVerticalThumbDrawable: number;
					public static RecyclerView_fastScrollVerticalTrackDrawable: number;
					public static RecyclerView_layoutManager: number;
					public static RecyclerView_reverseLayout: number;
					public static RecyclerView_spanCount: number;
					public static RecyclerView_stackFromEnd: number;
					public static SearchView: androidNative.Array<number>;
					public static SearchView_android_focusable: number;
					public static SearchView_android_imeOptions: number;
					public static SearchView_android_inputType: number;
					public static SearchView_android_maxWidth: number;
					public static SearchView_closeIcon: number;
					public static SearchView_commitIcon: number;
					public static SearchView_defaultQueryHint: number;
					public static SearchView_goIcon: number;
					public static SearchView_iconifiedByDefault: number;
					public static SearchView_layout: number;
					public static SearchView_queryBackground: number;
					public static SearchView_queryHint: number;
					public static SearchView_searchHintIcon: number;
					public static SearchView_searchIcon: number;
					public static SearchView_submitBackground: number;
					public static SearchView_suggestionRowLayout: number;
					public static SearchView_voiceIcon: number;
					public static Spinner: androidNative.Array<number>;
					public static Spinner_android_dropDownWidth: number;
					public static Spinner_android_entries: number;
					public static Spinner_android_popupBackground: number;
					public static Spinner_android_prompt: number;
					public static Spinner_popupTheme: number;
					public static StateListDrawable: androidNative.Array<number>;
					public static StateListDrawable_android_constantSize: number;
					public static StateListDrawable_android_dither: number;
					public static StateListDrawable_android_enterFadeDuration: number;
					public static StateListDrawable_android_exitFadeDuration: number;
					public static StateListDrawable_android_variablePadding: number;
					public static StateListDrawable_android_visible: number;
					public static StateListDrawableItem: androidNative.Array<number>;
					public static StateListDrawableItem_android_drawable: number;
					public static SwitchCompat: androidNative.Array<number>;
					public static SwitchCompat_android_textOff: number;
					public static SwitchCompat_android_textOn: number;
					public static SwitchCompat_android_thumb: number;
					public static SwitchCompat_showText: number;
					public static SwitchCompat_splitTrack: number;
					public static SwitchCompat_switchMinWidth: number;
					public static SwitchCompat_switchPadding: number;
					public static SwitchCompat_switchTextAppearance: number;
					public static SwitchCompat_thumbTextPadding: number;
					public static SwitchCompat_thumbTint: number;
					public static SwitchCompat_thumbTintMode: number;
					public static SwitchCompat_track: number;
					public static SwitchCompat_trackTint: number;
					public static SwitchCompat_trackTintMode: number;
					public static TextAppearance: androidNative.Array<number>;
					public static TextAppearance_android_fontFamily: number;
					public static TextAppearance_android_shadowColor: number;
					public static TextAppearance_android_shadowDx: number;
					public static TextAppearance_android_shadowDy: number;
					public static TextAppearance_android_shadowRadius: number;
					public static TextAppearance_android_textColor: number;
					public static TextAppearance_android_textColorHint: number;
					public static TextAppearance_android_textColorLink: number;
					public static TextAppearance_android_textFontWeight: number;
					public static TextAppearance_android_textSize: number;
					public static TextAppearance_android_textStyle: number;
					public static TextAppearance_android_typeface: number;
					public static TextAppearance_fontFamily: number;
					public static TextAppearance_fontVariationSettings: number;
					public static TextAppearance_textAllCaps: number;
					public static TextAppearance_textLocale: number;
					public static Toolbar: androidNative.Array<number>;
					public static Toolbar_android_gravity: number;
					public static Toolbar_android_minHeight: number;
					public static Toolbar_buttonGravity: number;
					public static Toolbar_collapseContentDescription: number;
					public static Toolbar_collapseIcon: number;
					public static Toolbar_contentInsetEnd: number;
					public static Toolbar_contentInsetEndWithActions: number;
					public static Toolbar_contentInsetLeft: number;
					public static Toolbar_contentInsetRight: number;
					public static Toolbar_contentInsetStart: number;
					public static Toolbar_contentInsetStartWithNavigation: number;
					public static Toolbar_logo: number;
					public static Toolbar_logoDescription: number;
					public static Toolbar_maxButtonHeight: number;
					public static Toolbar_navigationContentDescription: number;
					public static Toolbar_navigationIcon: number;
					public static Toolbar_popupTheme: number;
					public static Toolbar_subtitle: number;
					public static Toolbar_subtitleTextAppearance: number;
					public static Toolbar_subtitleTextColor: number;
					public static Toolbar_title: number;
					public static Toolbar_titleMargin: number;
					public static Toolbar_titleMarginBottom: number;
					public static Toolbar_titleMarginEnd: number;
					public static Toolbar_titleMarginStart: number;
					public static Toolbar_titleMarginTop: number;
					public static Toolbar_titleMargins: number;
					public static Toolbar_titleTextAppearance: number;
					public static Toolbar_titleTextColor: number;
					public static View: androidNative.Array<number>;
					public static View_android_focusable: number;
					public static View_android_theme: number;
					public static View_paddingEnd: number;
					public static View_paddingStart: number;
					public static View_theme: number;
					public static ViewBackgroundHelper: androidNative.Array<number>;
					public static ViewBackgroundHelper_android_background: number;
					public static ViewBackgroundHelper_backgroundTint: number;
					public static ViewBackgroundHelper_backgroundTintMode: number;
					public static ViewPager2: androidNative.Array<number>;
					public static ViewPager2_android_orientation: number;
					public static ViewStubCompat: androidNative.Array<number>;
					public static ViewStubCompat_android_id: number;
					public static ViewStubCompat_android_inflatedId: number;
					public static ViewStubCompat_android_layout: number;
					public static <clinit>(): void;
				}
			}
		}
	}
}

declare module com {
	export module rd {
		export module utils {
			export class CoordinatesUtils extends java.lang.Object {
				public static class: java.lang.Class<com.rd.utils.CoordinatesUtils>;
				public static getCoordinate(param0: com.rd.draw.data.Indicator, param1: number): number;
				public static getProgress(param0: com.rd.draw.data.Indicator, param1: number, param2: number, param3: boolean): globalAndroid.util.Pair<java.lang.Integer,java.lang.Float>;
				public static getPosition(param0: com.rd.draw.data.Indicator, param1: number, param2: number): number;
				public static getXCoordinate(param0: com.rd.draw.data.Indicator, param1: number): number;
				public static getYCoordinate(param0: com.rd.draw.data.Indicator, param1: number): number;
				public constructor();
			}
		}
	}
}

declare module com {
	export module rd {
		export module utils {
			export class DensityUtils extends java.lang.Object {
				public static class: java.lang.Class<com.rd.utils.DensityUtils>;
				public static dpToPx(param0: number): number;
				public static pxToDp(param0: number): number;
				public constructor();
			}
		}
	}
}

declare module com {
	export module rd {
		export module utils {
			export class IdUtils extends java.lang.Object {
				public static class: java.lang.Class<com.rd.utils.IdUtils>;
				public static generateViewId(): number;
				public constructor();
			}
		}
	}
}

//Generics information:
//com.rd.animation.type.BaseAnimation:1

