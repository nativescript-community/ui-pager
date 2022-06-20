
<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Basic Pager" />
        </ActionBar>

        <StackLayout class="page">
            <Pager for="item in items" height="100%">
                <v-template>
                    <StackLayout marginTop="200">
                        <StackLayout marginBottom="50">
                            <Label :text="item.field1" />
                            <StackLayout v-show="item.field1" backgroundColor="red" height="10" width="10" />
                        </StackLayout>
                        <StackLayout marginBottom="50">
                            <Label :text="item.field2" />
                            <StackLayout v-show="item.field2" backgroundColor="green" height="10" width="10" />
                        </StackLayout>
                        <StackLayout marginBottom="50">
                            <Label :text="item.field3" />
                            <StackLayout v-show="item.field3" backgroundColor="blue" height="10" width="10"/>
                        </StackLayout>
                    </StackLayout>
                </v-template>
            </Pager>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { field1: true, field2: true, field3: true},
                { field1: true, field2: true, field3: false},
                { field1: true, field2: false, field3: true},
                { field1: false, field2: true, field3: true},
                { field1: false, field2: true, field3: true},
                { field1: true, field2: true, field3: false},
            ]
        }
    }
};
</script>

<style lang="scss" scoped>

</style>