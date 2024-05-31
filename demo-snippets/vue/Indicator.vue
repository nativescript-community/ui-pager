<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Indicator" />
        </ActionBar>

        <GridLayout class="page" rows="*,auto">
            <Pager ref="pager" id="pager" :items="items" :selectedIndex="selectedIndex" @selectedIndexChange="selectedIndexChange">
                <v-template>
                    <GridLayout :backgroundColor="item.color">
                        <Label :text="item.title" />
                    </GridLayout>
                </v-template>
            </Pager>
            <PagerIndicator pagerViewId="pager" type="fill" verticalAlignment="bottom" horizontalAlignment="center" marginBottom="10" />
            <Button row="1" text="Reset" @tap="resetPager" />
        </GridLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            selectedIndex: 2,
            items: [
                { title: 'First', color: '#e67e22' },
                { title: 'Second', color: '#3498db' },
                { title: 'Third', color: '#e74c3c' },
                { title: 'Fourth', color: '#9b59b6' }
            ]
        };
    },
    methods: {
        resetPager() {
            this.selectedIndex = 0;
        },
        selectedIndexChange(args) {
            console.log('SELECTED INDEX CHANGES', args.value);
            this.selectedIndex = args.value;
        }
    }
};
</script>

<style lang="scss" scoped>
.page Label {
    font-size: 35;
    text-align: center;
    width: 100%;
    vertical-alignment: center;
    color: #ffffff;
    text-transform: uppercase;
}
</style>
