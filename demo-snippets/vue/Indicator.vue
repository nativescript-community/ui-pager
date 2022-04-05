<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Indicator" />
        </ActionBar>

        <StackLayout class="page">
            <Pager ref="pager" for="item in items" :selectedIndex="selectedIndex" @selectedIndexChange="selectedIndexChange" height="300" indicator="fill" showIndicator="true">
                <v-template>
                    <GridLayout :backgroundColor="item.color">
                        <Label :text="item.title" />
                    </GridLayout>
                </v-template>
            </Pager>
            <Button text="Reset" @tap="resetPager" />
        </StackLayout>
    </Page>
</template>

<script>

export default {
    data() {
        return {
            selectedIndex: 2,
            items: [
                {title: 'First', color: '#e67e22'},
                {title: 'Second', color: '#3498db'},
                {title: 'Third', color: '#e74c3c'},
                {title: 'Fourth', color: '#9b59b6'},
            ]
        };
    },
    methods: {
        resetPager() {
            this.selectedIndex = 0;
        },
        selectedIndexChange(args) {
            console.log("SELECTED INDEX CHANGES", args.value)
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
