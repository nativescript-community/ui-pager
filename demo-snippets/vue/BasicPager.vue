<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" />
            <Label text="Basic Pager" />
        </ActionBar>

        <GridLayout class="page" rows="*,auto">
            <Pager ref="pager" for="item in items" height="100%">
                <v-template>
                    <GridLayout :backgroundColor="item.color">
                        <Label :text="item.title" />
                    </GridLayout>
                </v-template>
            </Pager>
            <StackLayout orientation="horizontal" row="1">
                <Button text="moveTo0" @tap="moveTo0"></Button>
                <Button text="moveTo3" @tap="moveTo3"></Button>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import { Pager } from '@nativescript-community/ui-pager/index.android';
export default {
    data() {
        return {
            items: [
                {title: "First", color: "#e67e22"},
                {title: "Second", color: "#3498db"},
                {title: "Third", color: "#e74c3c"},
                {title: "Fourth", color: "#9b59b6"},
            ]
        }
    },
    methods: {
        moveTo3() {
            (this.$refs.pager.nativeView as Pager).scrollToIndexAnimated(3, true);
        },
        moveTo0() {
            (this.$refs.pager.nativeView as Pager).scrollToIndexAnimated(0, false);
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