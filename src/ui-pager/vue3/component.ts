import { ItemsSource, Pager as NSPager } from '..';
import { ItemEventData, ObservableArray, PropertyChangeData } from '@nativescript/core';
import { ItemContext, PropType, createItemContext, defineComponent, h, ref, useItemTemplates, watch } from 'nativescript-vue';

type Items = any[] | ItemsSource;

function isItemsSource(items: Items): items is ItemsSource {
    return typeof (items as ItemsSource).getItem === 'function';
}

export const Pager = defineComponent({
    name: 'Pager',
    props: {
        /** Items rendered through the slot templates. Without it the default slot holds static `PagerItem`s. */
        items: Object as PropType<Items>,
        alias: {
            type: String,
            default: 'item'
        },
        indexAlias: {
            type: String,
            default: '$index'
        },
        selectedIndex: Number,
        itemTemplateSelector: Function as PropType<(item: any, index: number, items: Items) => string | undefined>
    },
    emits: {
        'update:selectedIndex': (index: number) => typeof index === 'number',
        selectedIndexChange: (event: PropertyChangeData) => !!event
    },
    setup(props, ctx) {
        const getSlotName = (item: any, index: number, items: Items) => props.itemTemplateSelector?.(item, index, items) ?? 'default';

        const { itemTemplates, renderCell, disposeCell, cellVNodes } = useItemTemplates<ItemContext>({
            slots: ctx.slots,
            selectTemplate: (itemCtx) => getSlotName(itemCtx[props.alias], itemCtx.index, props.items),
            componentName: 'Pager'
        });

        const pager = ref<any & { nativeView: NSPager }>(null);

        function refresh() {
            // ObservableArray notifies the native view of changes itself
            if (props.items instanceof ObservableArray) {
                return;
            }
            pager.value?.nativeView?.refresh();
        }

        // depth 1 tracks the array's length without walking into the items
        // themselves; cells re-render on their own when item fields change
        watch(() => props.items, refresh, { deep: 1 });

        function itemAt(index: number) {
            const items = props.items;
            return isItemsSource(items) ? items.getItem(index) : items[index];
        }

        function onItemLoading(event: ItemEventData) {
            const itemCtx = createItemContext(itemAt(event.index), event.index, { alias: props.alias, indexAlias: props.indexAlias });
            event.view = renderCell(itemCtx, event.view);
        }

        function onItemDisposing(event: ItemEventData) {
            disposeCell(event.view);
        }

        function onSelectedIndexChange(event: PropertyChangeData) {
            ctx.emit('update:selectedIndex', event.value);
            ctx.emit('selectedIndexChange', event);
        }

        return () =>
            props.items
                ? h(
                      'NativePager',
                      {
                          ref: pager,
                          items: props.items,
                          selectedIndex: props.selectedIndex,
                          itemTemplates,
                          itemTemplateSelector: getSlotName,
                          onItemLoading,
                          onItemDisposing,
                          onSelectedIndexChange
                      },
                      cellVNodes()
                  )
                : h('NativePager', { ref: pager, selectedIndex: props.selectedIndex, onSelectedIndexChange }, ctx.slots.default?.());
    }
});
