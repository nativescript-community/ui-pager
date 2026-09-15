import { Pager as NativePager, PagerItem } from '..';
import { Pager as VuePager } from './component';
import '@vue/runtime-core';

const PagerPlugin = {
    install(app: any) {
        app.registerElement('NativePager', () => NativePager, {
            overwriteExisting: true,
            // static PagerItem children go to the native view; cells rendered
            // from item templates are placed by the pager itself
            nodeOps: {
                insert(child: any, parent: any) {
                    if (child.nativeView instanceof PagerItem) {
                        parent.nativeView._addChildFromBuilder('PagerItem', child.nativeView);
                    }
                },
                remove(child: any, parent: any) {
                    if (child.nativeView instanceof PagerItem && child.nativeView.parent === parent.nativeView) {
                        parent.nativeView._removeView(child.nativeView);
                    }
                }
            }
        });
        app.registerElement('PagerItem', () => PagerItem, {
            viewFlags: 4 // NSVViewFlags.LAYOUT_VIEW
        });
        app.component('Pager', VuePager);
    }
};

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Pager: typeof VuePager;
    }
}

export default PagerPlugin;
