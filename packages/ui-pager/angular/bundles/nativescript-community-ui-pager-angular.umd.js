(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@nativescript-community/ui-pager'), require('@nativescript/angular'), require('@nativescript/core'), require('@nativescript/core/data/observable-array'), require('@nativescript/core/profiling')) :
    typeof define === 'function' && define.amd ? define('@nativescript-community/ui-pager-angular', ['exports', '@angular/core', '@nativescript-community/ui-pager', '@nativescript/angular', '@nativescript/core', '@nativescript/core/data/observable-array', '@nativescript/core/profiling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['nativescript-community'] = global['nativescript-community'] || {}, global['nativescript-community']['ui-pager-angular'] = {}), global.ng.core, global['ns-ui-pager'], global['ns-angular'], global['ns-core'], global.observableArray, global.profiling));
}(this, (function (exports, i0, uiPager, angular, core, observableArray, profiling) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate$1(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var _c0 = ["loader"];
    angular.registerElement('Pager', function () { return uiPager.Pager; });
    angular.registerElement('PagerItem', function () { return uiPager.PagerItem; });
    var NG_VIEW = '_ngViewRef';
    var ItemContext = /** @class */ (function () {
        function ItemContext($implicit, item, index, even, odd) {
            this.$implicit = $implicit;
            this.item = item;
            this.index = index;
            this.even = even;
            this.odd = odd;
        }
        return ItemContext;
    }());
    var TemplatedItemsComponent = /** @class */ (function () {
        function TemplatedItemsComponent(_elementRef, _iterableDiffers) {
            this._iterableDiffers = _iterableDiffers;
            this.setupItemView = new i0.EventEmitter();
            this.templatedItemsView = _elementRef.nativeElement;
            this.templatedItemsView.on('itemLoading', this.onItemLoading, this);
            this.templatedItemsView.on('itemDisposing', this.onItemDisposing, this);
        }
        Object.defineProperty(TemplatedItemsComponent.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                this._items = value;
                var needDiffer = true;
                if (value instanceof observableArray.ObservableArray) {
                    needDiffer = false;
                }
                if (needDiffer && !this._differ && i0.ɵisListLikeIterable(value)) {
                    this._differ = this._iterableDiffers
                        .find(this._items)
                        .create(function (_index, item) { return item; });
                }
                this.templatedItemsView.items = this._items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TemplatedItemsComponent.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                this._selectedIndex = value;
                this.templatedItemsView.selectedIndex = this._selectedIndex;
            },
            enumerable: false,
            configurable: true
        });
        TemplatedItemsComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!!(this._selectedIndex)) {
                setTimeout(function () {
                    if (core.isIOS) {
                        _this.templatedItemsView.scrollToIndexAnimated(_this._selectedIndex, false);
                    }
                    _this.templatedItemsView.selectedIndex = _this._selectedIndex;
                });
            }
        };
        TemplatedItemsComponent.prototype.ngAfterContentInit = function () {
            if (core.Trace.isEnabled()) {
                uiPager.PagerLog('TemplatedItemsView.ngAfterContentInit()');
            }
            this.setItemTemplates();
        };
        TemplatedItemsComponent.prototype.ngOnDestroy = function () {
            this.templatedItemsView.off('itemLoading', this.onItemLoading, this);
            this.templatedItemsView.off('itemDisposing', this.onItemDisposing, this);
        };
        TemplatedItemsComponent.prototype.setItemTemplates = function () {
            if (!this.items)
                return;
            this.itemTemplate = this.itemTemplateQuery;
            if (this._templateMap) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog('Setting templates');
                }
                var templates_1 = [];
                this._templateMap.forEach(function (value) {
                    templates_1.push(value);
                });
                this.templatedItemsView.itemTemplates = templates_1;
            }
        };
        TemplatedItemsComponent.prototype.registerTemplate = function (key, template) {
            if (core.Trace.isEnabled()) {
                uiPager.PagerLog("registerTemplate for key: " + key);
            }
            if (!this._templateMap) {
                this._templateMap = new Map();
            }
            var keyedTemplate = {
                key: key,
                createView: this.getItemTemplateViewFactory(template),
            };
            this._templateMap.set(key, keyedTemplate);
        };
        TemplatedItemsComponent.prototype.onItemLoading = function (args) {
            if (!args.view && !this.itemTemplate) {
                return;
            }
            if (!this.items)
                return;
            var index = args.index;
            var items = args.object.items;
            var currentItem = typeof items.getItem === 'function'
                ? items.getItem(index)
                : items[index];
            var viewRef;
            if (args.view) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog("onItemLoading: " + index + " - Reusing existing view");
                }
                viewRef = args.view[NG_VIEW];
                if (!viewRef &&
                    args.view instanceof core.LayoutBase &&
                    args.view.getChildrenCount() > 0) {
                    viewRef = args.view.getChildAt(0)[NG_VIEW];
                }
                if (!viewRef && core.Trace.isEnabled()) {
                    uiPager.PagerError("ViewReference not found for item " + index + ". View recycling is not working");
                }
            }
            if (!viewRef) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog("onItemLoading: " + index + " - Creating view from template");
                }
                viewRef = this.loader.createEmbeddedView(this.itemTemplate, new ItemContext(), 0);
                args.view = getItemViewRoot(viewRef);
                args.view[NG_VIEW] = viewRef;
            }
            this.setupViewRef(viewRef, currentItem, index);
            this.detectChangesOnChild(viewRef, index);
        };
        TemplatedItemsComponent.prototype.onItemDisposing = function (args) {
            if (!args.view) {
                return;
            }
            var viewRef;
            if (args.view) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog("onItemDisposing: " + args.index + " - Removing angular view");
                }
                viewRef = args.view[NG_VIEW];
                if (!viewRef &&
                    args.view instanceof core.LayoutBase &&
                    args.view.getChildrenCount() > 0) {
                    viewRef = args.view.getChildAt(0)[NG_VIEW];
                }
                if (!viewRef && core.Trace.isEnabled()) {
                    uiPager.PagerError("ViewReference not found for item " + args.index + ". View disposing is not working");
                }
            }
            if (viewRef) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog("onItemDisposing: " + args.index + " - Disposing view reference");
                }
                viewRef.destroy();
            }
        };
        TemplatedItemsComponent.prototype.setupViewRef = function (viewRef, data, index) {
            var context = viewRef.context;
            context.$implicit = data;
            context.item = data;
            context.index = index;
            context.even = index % 2 === 0;
            context.odd = !context.even;
            this.setupItemView.next({
                view: viewRef,
                data: data,
                index: index,
                context: context,
            });
        };
        TemplatedItemsComponent.prototype.getItemTemplateViewFactory = function (template) {
            var _this = this;
            return function () {
                var viewRef = _this.loader.createEmbeddedView(template, new ItemContext(), 0);
                var resultView = getItemViewRoot(viewRef);
                resultView[NG_VIEW] = viewRef;
                return resultView;
            };
        };
        TemplatedItemsComponent.prototype.detectChangesOnChild = function (viewRef, index) {
            if (core.Trace.isEnabled()) {
                uiPager.PagerLog("Manually detect changes in child: " + index);
            }
            viewRef.markForCheck();
            viewRef.detectChanges();
        };
        TemplatedItemsComponent.prototype.ngDoCheck = function () {
            if (this._differ) {
                if (core.Trace.isEnabled()) {
                    uiPager.PagerLog('ngDoCheck() - execute differ');
                }
                var changes = this._differ.diff(this._items);
                if (changes) {
                    if (core.Trace.isEnabled()) {
                        uiPager.PagerLog('ngDoCheck() - refresh');
                    }
                    this.templatedItemsView.refresh();
                }
            }
        };
        return TemplatedItemsComponent;
    }());
    TemplatedItemsComponent.ɵfac = function TemplatedItemsComponent_Factory(t) { return new (t || TemplatedItemsComponent)(i0__namespace.ɵɵdirectiveInject(i0__namespace.ElementRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.IterableDiffers)); };
    TemplatedItemsComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: TemplatedItemsComponent, selectors: [["ng-component"]], contentQueries: function TemplatedItemsComponent_ContentQueries(rf, ctx, dirIndex) {
            if (rf & 1) {
                i0__namespace.ɵɵcontentQuery(dirIndex, i0.TemplateRef, 5);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.itemTemplateQuery = _t.first);
            }
        }, viewQuery: function TemplatedItemsComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵviewQuery(_c0, 5, i0.ViewContainerRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.loader = _t.first);
            }
        }, inputs: { items: "items", selectedIndex: "selectedIndex" }, outputs: { setupItemView: "setupItemView" }, decls: 0, vars: 0, template: function TemplatedItemsComponent_Template(rf, ctx) { }, encapsulation: 2 });
    __decorate([
        profiling.profile
    ], TemplatedItemsComponent.prototype, "onItemLoading", null);
    __decorate([
        profiling.profile
    ], TemplatedItemsComponent.prototype, "onItemDisposing", null);
    __decorate([
        profiling.profile
    ], TemplatedItemsComponent.prototype, "detectChangesOnChild", null);
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(TemplatedItemsComponent, [{
                type: i0.Component,
                args: [{
                        template: '',
                    }]
            }], function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.IterableDiffers }]; }, { loader: [{
                    type: i0.ViewChild,
                    args: ['loader', { read: i0.ViewContainerRef, static: false }]
                }], setupItemView: [{
                    type: i0.Output
                }], itemTemplateQuery: [{
                    type: i0.ContentChild,
                    args: [i0.TemplateRef, { static: false }]
                }], items: [{
                    type: i0.Input
                }], selectedIndex: [{
                    type: i0.Input
                }], onItemLoading: [], onItemDisposing: [], detectChangesOnChild: [] });
    })();
    function getItemViewRoot(viewRef, rootLocator) {
        if (rootLocator === void 0) { rootLocator = angular.getSingleViewRecursive; }
        return rootLocator(viewRef.rootNodes, 0);
    }
    var TEMPLATED_ITEMS_COMPONENT = new i0.InjectionToken('TemplatedItemsComponent');
    var PagerItemDirective = /** @class */ (function () {
        function PagerItemDirective(templateRef, owner, viewContainer) {
            this.templateRef = templateRef;
            this.owner = owner;
            this.viewContainer = viewContainer;
        }
        PagerItemDirective.prototype.ensureItem = function () {
            if (!this.item) {
                this.item = new uiPager.PagerItem();
            }
        };
        PagerItemDirective.prototype.applyConfig = function () {
            this.ensureItem();
        };
        PagerItemDirective.prototype.ngOnInit = function () {
            this.applyConfig();
            var viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
            var realViews = viewRef.rootNodes.filter(function (node) { return !angular.isInvisibleNode(node); });
            if (realViews.length > 0) {
                var view = realViews[0];
                this.item.addChild(view);
                this.owner.nativeElement._addChildFromBuilder('PagerItem', this.item);
            }
        };
        return PagerItemDirective;
    }());
    PagerItemDirective.ɵfac = function PagerItemDirective_Factory(t) { return new (t || PagerItemDirective)(i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef), i0__namespace.ɵɵdirectiveInject(TEMPLATED_ITEMS_COMPONENT, 1), i0__namespace.ɵɵdirectiveInject(i0__namespace.ViewContainerRef)); };
    PagerItemDirective.ɵdir = i0__namespace.ɵɵdefineDirective({ type: PagerItemDirective, selectors: [["", "pagerItem", ""]] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(PagerItemDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[pagerItem]',
                    }]
            }], function () {
            return [{ type: i0__namespace.TemplateRef }, { type: TemplatedItemsComponent, decorators: [{
                            type: i0.Inject,
                            args: [TEMPLATED_ITEMS_COMPONENT]
                        }, {
                            type: i0.Host
                        }] }, { type: i0__namespace.ViewContainerRef }];
        }, null);
    })();
    var TemplateKeyDirective = /** @class */ (function () {
        function TemplateKeyDirective(templateRef, comp) {
            this.templateRef = templateRef;
            this.comp = comp;
        }
        Object.defineProperty(TemplateKeyDirective.prototype, "pagerTemplateKey", {
            set: function (value) {
                if (this.comp && this.templateRef) {
                    this.comp.registerTemplate(value, this.templateRef);
                }
            },
            enumerable: false,
            configurable: true
        });
        return TemplateKeyDirective;
    }());
    TemplateKeyDirective.ɵfac = function TemplateKeyDirective_Factory(t) { return new (t || TemplateKeyDirective)(i0__namespace.ɵɵdirectiveInject(i0__namespace.TemplateRef), i0__namespace.ɵɵdirectiveInject(TEMPLATED_ITEMS_COMPONENT, 1)); };
    TemplateKeyDirective.ɵdir = i0__namespace.ɵɵdefineDirective({ type: TemplateKeyDirective, selectors: [["", "pagerTemplateKey", ""]], inputs: { pagerTemplateKey: "pagerTemplateKey" } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(TemplateKeyDirective, [{
                type: i0.Directive,
                args: [{ selector: '[pagerTemplateKey]' }]
            }], function () {
            return [{ type: i0__namespace.TemplateRef }, { type: TemplatedItemsComponent, decorators: [{
                            type: i0.Inject,
                            args: [TEMPLATED_ITEMS_COMPONENT]
                        }, {
                            type: i0.Host
                        }] }];
        }, { pagerTemplateKey: [{
                    type: i0.Input
                }] });
    })();

    var PagerComponent = /** @class */ (function (_super) {
        __extends(PagerComponent, _super);
        function PagerComponent(_elementRef, _iterableDiffers) {
            return _super.call(this, _elementRef, _iterableDiffers) || this;
        }
        Object.defineProperty(PagerComponent.prototype, "nativeElement", {
            get: function () {
                return this.templatedItemsView;
            },
            enumerable: false,
            configurable: true
        });
        return PagerComponent;
    }(TemplatedItemsComponent));
    PagerComponent.ɵfac = function PagerComponent_Factory(t) { return new (t || PagerComponent)(i0__namespace.ɵɵdirectiveInject(i0__namespace.ElementRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.IterableDiffers)); };
    PagerComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: PagerComponent, selectors: [["Pager"]], features: [i0__namespace.ɵɵProvidersFeature([
                {
                    provide: TEMPLATED_ITEMS_COMPONENT,
                    useExisting: i0.forwardRef(function () { return PagerComponent; })
                }
            ]), i0__namespace.ɵɵInheritDefinitionFeature], decls: 3, vars: 0, consts: [["loader", ""]], template: function PagerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "DetachedContainer");
                i0__namespace.ɵɵelement(1, "Placeholder", null, 0);
                i0__namespace.ɵɵelementEnd();
            }
        }, encapsulation: 2, changeDetection: 0 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(PagerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'Pager',
                        template: "\n\t\t<DetachedContainer>\n\t\t\t<Placeholder #loader></Placeholder>\n\t\t</DetachedContainer>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [
                            {
                                provide: TEMPLATED_ITEMS_COMPONENT,
                                useExisting: i0.forwardRef(function () { return PagerComponent; })
                            }
                        ]
                    }]
            }], function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.IterableDiffers }]; }, null);
    })();
    var PagerModule = /** @class */ (function () {
        function PagerModule() {
        }
        return PagerModule;
    }());
    PagerModule.ɵfac = function PagerModule_Factory(t) { return new (t || PagerModule)(); };
    PagerModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: PagerModule });
    PagerModule.ɵinj = i0__namespace.ɵɵdefineInjector({});
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(PagerModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [PagerComponent, TemplateKeyDirective, PagerItemDirective],
                        exports: [PagerComponent, TemplateKeyDirective, PagerItemDirective],
                        schemas: [i0.NO_ERRORS_SCHEMA]
                    }]
            }], null, null);
    })();
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(PagerModule, { declarations: [PagerComponent, TemplateKeyDirective, PagerItemDirective], exports: [PagerComponent, TemplateKeyDirective, PagerItemDirective] }); })();

    exports.PagerComponent = PagerComponent;
    exports.PagerItemDirective = PagerItemDirective;
    exports.PagerModule = PagerModule;
    exports.TemplateKeyDirective = TemplateKeyDirective;
    exports.TemplatedItemsComponent = TemplatedItemsComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nativescript-community-ui-pager-angular.umd.js.map
