// Svelte 5 binding, for @nativescript-community/svelte-native >= 5. The Svelte 4 one is in ../svelte.
// Its view fields have their own names so both bindings can be compiled together.
import { ItemEventData, View } from '@nativescript/core';
import { profile } from '@nativescript/core/profiling';
import { ContentView, LayoutBase, StackLayout, ViewBase } from '@nativescript/core/ui';
import { NativeViewElementNode, TemplateElement, TemplateInstance, ViewNode, createElement, registerElement, registerNativeViewElement } from '@nativescript-community/svelte-native/dom';
import { Pager, PagerItem } from '..';

declare module '@nativescript/core/ui/core/view-base' {
    interface ViewBase {
        __Svelte5Instance__?: TemplateInstance;
        __Svelte5Builder__?: (parentView: ViewNode, item: any, index: number) => void;
        __Svelte5Index__?: number;
    }
}

class SvelteKeyedTemplate {
    _key: string;
    _templateEl: TemplateElement;
    constructor(key: string, templateEl: TemplateElement) {
        this._key = key;
        this._templateEl = templateEl;
    }
    get key() {
        return this._key;
    }
    createView() {
        // create a proxy element to eventually contain our item (once we have one to render)
        // TODO is StackLayout the best choice here?
        // const wrapper = createElement('StackLayout') as NativeViewElementNode<View>;

        const nativeEl = new ContentView();

        // because of the way {N} works we cant use that wrapper as the target for the component
        // it will trigger uncessary {N} component updates because the parent view is already attached

        nativeEl.__Svelte5Builder__ = (parentView, item, index) => {
            profile('__Svelte5Builder__', () => {
                nativeEl.__Svelte5Instance__ = this._templateEl.mount(parentView, item, index);
            })();
        };
        return nativeEl;
    }
}

export default class PagerViewElement extends NativeViewElementNode<Pager> {
    constructor() {
        super('pager', Pager);
        const nativeView = this.nativeView;
        nativeView.itemViewLoader = (viewType: any): View => this.loadView(viewType);
        this.nativeView.on(Pager.itemLoadingEvent, this.updateListItem, this);
        this.nativeView.on(Pager.itemDisposingEvent, this.disposeListItem, this);
    }

    private loadView(viewType: string): View {
        if (Array.isArray(this.nativeElement.itemTemplates)) {
            const keyedTemplate = this.nativeElement.itemTemplates.find((t) => t.key === 'default');
            if (keyedTemplate) {
                return keyedTemplate.createView();
            }
        }

        const templateEl = this.getTemplateForView(viewType);
        if (!templateEl) return null;

        const nativeEl = new ContentView();

        // in svelte we want to add the wrapper as a child of the pager ourselves
        nativeEl.__Svelte5Builder__ = (parentView, item, index) => {
            nativeEl.__Svelte5Instance__ = templateEl.mount(parentView, item, index);
        };
        return nativeEl;
    }

    // For some reason itemTemplateSelector isn't defined as a "property" on radListView, so when we set the property, it is lowercase (due to svelte's forced downcasing)
    // we intercept and fix the case here.
    setAttribute(fullkey: string, value: any): void {
        if (fullkey.toLowerCase() === 'itemtemplateselector') {
            fullkey = 'itemTemplateSelector';
        }
        super.setAttribute(fullkey, value);
    }

    private getTemplateForView(viewType: string) {
        const normalizedViewType = viewType.toLowerCase();
        return this.childNodes.find((n) => n.tagName === 'template' && String(n.getAttribute('type')).toLowerCase() === normalizedViewType) as TemplateElement | undefined;
    }

    onInsertedChild(childNode: ViewNode, index: number) {
        super.onInsertedChild(childNode, index);
        if (childNode instanceof TemplateElement) {
            const key = childNode.getAttribute('key') || 'default';
            const templateIndex = this.nativeView._itemTemplatesInternal.findIndex((t) => t.key === key);
            if (templateIndex >= 0) {
                this.nativeView._itemTemplatesInternal.splice(templateIndex, 1, new SvelteKeyedTemplate(key, childNode) as any);
            } else {
                this.nativeView._itemTemplatesInternal = this.nativeView._itemTemplatesInternal.concat(new SvelteKeyedTemplate(key, childNode) as any);
            }
        }
    }

    onRemovedChild(childNode: ViewNode) {
        super.onRemovedChild(childNode);
        if (childNode instanceof TemplateElement) {
            // the template's instances live in pages the native view may still hold
            childNode.unmountInstances();
            const key = childNode.getAttribute('key') || 'default';
            if (this.nativeView._itemTemplatesInternal && typeof this.nativeView._itemTemplatesInternal !== 'string') {
                this.nativeView._itemTemplatesInternal = this.nativeView._itemTemplatesInternal.filter((t) => t.key !== key);
            }
        }
    }
    private disposeListItem(args: ItemEventData) {
        const _view = args.view;
        if (_view.__Svelte5Instance__) {
            _view.__Svelte5Instance__.unmount();
            _view.__Svelte5Instance__ = null;
        }
    }
    private updateListItem(args: ItemEventData & { bindingContext }) {
        const _view = args.view;
        const item = args.bindingContext;
        const index = args.index;
        const instance = _view.__Svelte5Instance__;
        if (!instance) {
            if (_view.__Svelte5Builder__) {
                const dummy = createElement('fragment');
                _view.__Svelte5Builder__(dummy, item, index);
                _view.__Svelte5Builder__ = null;
                _view.__Svelte5Index__ = index;
                const nativeEl = (dummy.firstElement() as NativeViewElementNode<View>).nativeView;
                (_view as ContentView).content = nativeEl;
            }
        } else {
            _view.__Svelte5Index__ = index;
            // applied right away, and only what changed: rebinding to what the page shows does nothing
            _view._batchUpdate(() => instance.update(item, index));
        }
    }

    static register() {
        registerElement('pager', () => new PagerViewElement());
        registerNativeViewElement('pageritem', () => PagerItem);
    }
}
