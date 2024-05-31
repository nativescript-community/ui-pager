<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" />
            <Label text="Basic Pager" />
        </ActionBar>

        <StackLayout class="page">
            <Pager for="item in items" height="100%" transformers="scale">
                <v-template>
                    <GridLayout :backgroundColor="item.color">
                        <Label :text="item.title" />
                    </GridLayout>
                </v-template>
            </Pager>
        </StackLayout>
    </Page>
</template>

<script>
import { Pager } from '@nativescript-community/ui-pager';
import transformer from '@nativescript-community/ui-pager/transformers/Scale';

Pager.registerTransformer('scale', transformer);
export default {
    data() {
        return {
            items: [
                { title: 'First', color: '#e67e22' },
                { title: 'Second', color: '#3498db' },
                { title: 'Third', color: '#e74c3c' },
                { title: 'Fourth', color: '#9b59b6' }
            ]
        };
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
