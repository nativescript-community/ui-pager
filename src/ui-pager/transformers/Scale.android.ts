import { Pager } from '..';

@NativeClass
@Interfaces([androidx.viewpager2.widget.ViewPager2.PageTransformer])
export default class Scale extends java.lang.Object {
    owner: WeakRef<Pager>;

    constructor() {
        super();
        return global.__native(this);
    }

    public transformPage(view, position) {
        const MIN_SCALE = 0.85;
        if (position <= 1 || position >= -1) {
            const scale = Math.max(MIN_SCALE, 1 - Math.abs(position));
            view.setScaleX(scale);
            view.setScaleY(scale);
        } else {
            view.setScaleX(1);
            view.setScaleY(1);
        }
    }
}
