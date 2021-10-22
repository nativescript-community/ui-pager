declare const _default: {
    model: {
        prop: string;
        event: string;
    };
    props: {
        items: {
            type: number;
        };
        '+alias': {
            type: StringConstructor;
            default: string;
        };
        '+index': {
            type: StringConstructor;
            default: string;
        };
        selectedIndex: {
            type: NumberConstructor;
            default: number;
        };
        itemTemplateSelector: {
            type: FunctionConstructor;
            default: any;
        };
    };
    template: string;
    watch: {
        items: {
            handler(newVal: any): void;
            deep: boolean;
        };
    };
    computed: {
        listeners(): any;
    };
    created(): void;
    mounted(): void;
    methods: {
        onItemLoading(args: any): void;
        onItemDisposing(args: any): void;
        onSelectedIndexChange({ value }: {
            value: any;
        }): void;
    };
};
export default _default;
