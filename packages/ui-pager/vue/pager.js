const VUE_VIEW = '__vueVNodeRef__';
function getItemContext(item, index = -1, alias = this.$props['+alias'], index_alias = this.$props['+index']) {
    return {
        [alias]: item,
        [index_alias || '$index']: index,
        $even: index % 2 === 0,
        $odd: index % 2 !== 0,
    };
}
export default {
    model: {
        prop: 'selectedIndex',
        event: 'selectedIndexChange',
    },
    props: {
        items: {
            type: Array | Object,
        },
        '+alias': {
            type: String,
            default: 'item',
        },
        '+index': {
            type: String,
            default: '$index',
        },
        selectedIndex: {
            type: Number,
            default: 0,
        },
        itemTemplateSelector: {
            type: Function,
            default: undefined,
        },
    },
    template: `
    <NativePager
      ref="pagerView"
      :items="items"
	  v-bind="$attrs"
	  v-on="listeners"
      :selectedIndex="selectedIndex"
	  @itemLoading="onItemLoading"
	  @itemDisposing="onItemDisposing">
      <slot />
    </NativePager>
  `,
    watch: {
        items: {
            handler(newVal) {
                this.$refs.pagerView.setAttribute('items', newVal);
                this.$refs.pagerView.nativeView.refresh();
            },
            deep: true,
        },
    },
    computed: {
        listeners() {
            return Object.assign({}, this.$listeners, {
                selectedIndexChange: this.onSelectedIndexChange,
            });
        },
    },
    created() {
        this.getItemContext = getItemContext.bind(this);
    },
    mounted() {
        const pagerView = this.$refs.pagerView;
        this.pagerView = pagerView.nativeView;
        if (this.$templates) {
            pagerView.setAttribute('itemTemplates', this.$templates.getKeyedTemplates());
            const itemTemplateSelector = this.itemTemplateSelector
                ? this.itemTemplateSelector
                : (item, index, items) => this.$templates.selectorFn(this.getItemContext(item, index));
            pagerView.setAttribute('itemTemplateSelector', itemTemplateSelector);
        }
    },
    methods: {
        onItemLoading(args) {
            if (!this.items) {
                return;
            }
            const index = args.index;
            const items = args.object.items;
            const currentItem = args.bindingContext;
            const name = args.object._itemTemplateSelector(currentItem, index, items);
            const context = this.getItemContext(currentItem, index);
            const oldVnode = (args.view && args.view[VUE_VIEW]);
            args.view = this.$templates.patchTemplate(name, context, oldVnode);
        },
        onItemDisposing(args) {
        },
        onSelectedIndexChange({ value }) {
            this.$emit('selectedIndexChange', {
                value,
                selectedIndex: value,
                object: {
                    selectedIndex: value
                }
            });
        },
    },
};
//# sourceMappingURL=pager.js.map