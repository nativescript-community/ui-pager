import * as React from 'react';
import { PagerItem as NativeScriptPagerItem } from '../pager';
import { registerElement } from 'react-nativescript';
import { render as RNSRender, unmountComponentAtNode, NSVRoot } from "react-nativescript";
registerElement('pager', () => require('../').Pager);
registerElement('pagerItem', () => require('../').PagerItem);
export class _Pager extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.argsViewToRootKeyAndRef = new Map();
        this.roots = new Set();
        this.defaultOnItemLoading = (args) => {
            const { logLevel, onCellRecycle, onCellFirstLoad } = this.props._debug;
            const { items, itemTemplateSelector } = this.props;
            const item = _Pager.isItemsSource(items) ? items.getItem(args.index) : items[args.index];
            const template = itemTemplateSelector
                ? typeof itemTemplateSelector === "string"
                    ? itemTemplateSelector
                    : itemTemplateSelector(item, args.index, items)
                : null;
            const cellFactory = template === null
                ? this.props.cellFactory
                : this.props.cellFactories
                    ? this.props.cellFactories.get(template).cellFactory
                    : this.props.cellFactory;
            if (typeof cellFactory === "undefined") {
                console.warn(`Pager: No cell factory found, given template ${template}!`);
                return;
            }
            let view = args.view;
            if (!view) {
                const rootKeyAndRef = this.renderNewRoot(item, cellFactory);
                args.view = rootKeyAndRef.nativeView;
                this.argsViewToRootKeyAndRef.set(args.view, rootKeyAndRef);
                if (onCellFirstLoad)
                    onCellFirstLoad(rootKeyAndRef.nativeView);
            }
            else {
                console.log(`[Pager] existing view: `, view);
                if (onCellRecycle)
                    onCellRecycle(view);
                const { rootKey, nativeView } = this.argsViewToRootKeyAndRef.get(view);
                if (typeof rootKey === "undefined") {
                    console.error(`Unable to find root key that args.view corresponds to!`, view);
                    return;
                }
                if (!nativeView) {
                    console.error(`Unable to find ref that args.view corresponds to!`, view);
                    return;
                }
                RNSRender(cellFactory(item), null, () => {
                }, rootKey);
            }
        };
        this.renderNewRoot = (item, cellFactory) => {
            const node = this.getNativeView();
            if (!node) {
                throw new Error("Unable to get ref to Pager");
            }
            console.log(`[Pager] no existing view.`);
            const rootKey = `Pager-${node._domId}-${this.roots.size.toString()}`;
            const root = new NSVRoot();
            RNSRender(cellFactory(item), root, () => {
            }, rootKey);
            this.roots.add(rootKey);
            return {
                rootKey,
                nativeView: root.baseRef.nativeView
            };
        };
        this.state = {
            nativeCells: {},
            nativeCellToItemIndex: new Map(),
            itemIndexToNativeCell: props._debug.logLevel === "debug" ? new Map() : undefined,
        };
    }
    getNativeView() {
        const ref = (this.props.forwardedRef || this.myRef);
        return ref.current ? ref.current.nativeView : null;
    }
    componentDidMount() {
        const node = this.getNativeView();
        if (!node) {
            console.warn(`React ref to NativeScript View lost, so unable to set item templates.`);
            return;
        }
        if (this.props.cellFactories) {
            const itemTemplates = [];
            this.props.cellFactories.forEach((info, key) => {
                const { placeholderItem, cellFactory } = info;
                itemTemplates.push({
                    key,
                    createView: () => {
                        console.log(`[Pager] item template "${key}"`);
                        const rootKeyAndRef = this.renderNewRoot(placeholderItem, cellFactory);
                        this.argsViewToRootKeyAndRef.set(rootKeyAndRef.nativeView, rootKeyAndRef);
                        return rootKeyAndRef.nativeView;
                    },
                });
            });
            node.itemTemplates = itemTemplates;
        }
    }
    componentWillUnmount() {
        this.roots.forEach(root => unmountComponentAtNode(root));
    }
    static isItemsSource(arr) {
        return typeof arr.getItem === "function";
    }
    render() {
        console.log(`Pager's render()`);
        const _a = this.props, { forwardedRef, children, _debug, cellFactories, cellFactory } = _a, rest = __rest(_a, ["forwardedRef", "children", "_debug", "cellFactories", "cellFactory"]);
        return (React.createElement("pager", Object.assign({}, rest, { onItemLoading: this.defaultOnItemLoading, ref: forwardedRef || this.myRef, children: children })));
    }
}
_Pager.defaultProps = {
    _debug: {
        logLevel: "info",
        onCellFirstLoad: undefined,
        onCellRecycle: undefined,
    },
};
export class _PagerItem extends React.Component {
    constructor() {
        super(...arguments);
        this.myRef = React.createRef();
        this.item = new NativeScriptPagerItem();
    }
    componentDidMount() {
        const { forwardedRef } = this.props;
        const view = (forwardedRef || this.myRef).current.nativeView;
        const parent = view && view.parent ? view.parent : null;
        if (parent) {
            parent._removeView(view);
            this.item.addChild(view);
            parent._addChildFromBuilder('PagerItem', this.item);
        }
    }
    render() {
        const _a = this.props, { forwardedRef, children } = _a, rest = __rest(_a, ["forwardedRef", "children"]);
        return React.createElement('pagerItem', Object.assign(Object.assign({}, rest), { ref: forwardedRef || this.myRef }), children);
    }
}
export const Pager = React.forwardRef((props, ref) => {
    return React.createElement(_Pager, Object.assign({}, props, { forwardedRef: ref }));
});
export const PagerItem = React.forwardRef((props, ref) => {
    return React.createElement(_PagerItem, Object.assign({}, props, { forwardedRef: ref }));
});
//# sourceMappingURL=index.js.map