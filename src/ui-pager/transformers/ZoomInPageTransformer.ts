import { Pager } from '..';

@NativeClass
@Interfaces([androidx.viewpager2.widget.ViewPager2.PageTransformer])
export default class ZoomInPageTransformer extends java.lang.Object {
    owner: WeakRef<Pager>;

    constructor() {
        super();
        return global.__native(this);
    }

    public transformPage(view, position) {
        const scale = position < 0 ? position + 1.0 : Math.abs(1.0 - position);
        view.setScaleX(scale);
        view.setScaleY(scale);
        view.setPivotX(view.getWidth() * 0.5);
        view.setPivotY(view.getHeight() * 0.5);
        view.setAlpha(view < -1.0 || position > 1.0 ? 0.0 : 1.0 - (scale - 1.0));
    }
}
