<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <Label text="Static Pager" />
        </ActionBar>

        <StackLayout class="page">
            <Pager height="100%">
                <PagerItem backgroundColor="#e67e22"><Label text="First" /></PagerItem>
                <PagerItem backgroundColor="#3498db"><Label text="Second" /></PagerItem>
                <PagerItem backgroundColor="#e74c3c"><Label text="Third" /></PagerItem>
                <PagerItem backgroundColor="#9b59b6"><Label text="Fourth" /></PagerItem>
            </Pager>
        </StackLayout>
    </Page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.page Label {
    font-size: 35;
    horizontal-alignment: center;
    vertical-alignment: center;
    color: #ffffff;
    text-transform: uppercase;
}

</style>