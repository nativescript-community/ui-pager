const VUE_VIEW = '__vueVNodeRef__';

module.exports = function pager(Vue) {
    return {
        model: {
            prop: 'selectedIndex',
            event: 'selectedIndexChange',
        },
        props: {
            items: {
                //@ts-ignore
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
            pagerView.setAttribute('itemTemplates', this.$templates.getKeyedTemplates());

            const itemTemplateSelector = this.itemTemplateSelector
                ? this.itemTemplateSelector // custom template selector if any
                : (item, index, items) => {
                    const isSelected = false;
                    return this.$templates.selectorFn(this.getItemContext(item, index, isSelected));
                };
            pagerView.setAttribute('itemTemplateSelector', itemTemplateSelector);
        },
        methods: {
            onItemLoading(args) {
                if (!this.items) return;
                const index = args.index;
                const items = args.object.items;
                const currentItem =
                    typeof items.getItem === 'function'
                        ? items.getItem(index)
                        : items[index];
                const name = args.object._itemTemplateSelector(
                    currentItem,
                    index,
                    items
                );
                const context = this.getItemContext(currentItem, index);
                const oldVnode = args.view && args.view[VUE_VIEW];
                args.view = this.$templates.patchTemplate(
                    name,
                    context,
                    oldVnode
                );
            },
            onItemDisposing(args) {
                // TODO: handle disposing template
                // const oldVnode = args.view && args.view[ VUE_VIEW ];
                // console.log("disposing", !!oldVnode, VUE_VIEW);
                // if (oldVnode) {
                // 	Vue.prototype.__patch__(oldVnode, null);
                // }
            },
            onSelectedIndexChange({ value }) {
                this.$emit('selectedIndexChange', {
                    value,
                    selectedIndex: value ,
                    object: {
                        selectedIndex: value
                    }
                });
            },
        },
    };

    function getItemContext(item, index = -1, selected = false, alias = this.$props['+alias'], index_alias = this.$props['+index']) {
        return {
            [alias]: item,
            [index_alias]: index,
            $even: index % 2 === 0,
            $odd: index % 2 !== 0,
        };
    }
};
