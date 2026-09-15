<template>
    <Page>
        <ActionBar>
            <Label text="Basic Pager" />
        </ActionBar>

        <GridLayout class="page" rows="*,auto">
            <Pager ref="pager" v-model:selectedIndex="selectedIndex" :items="items" height="100%" peaking="30" spacing="10">
                <template #default="{ item }">
                    <GridLayout :backgroundColor="item.color">
                        <Label :text="item.title" />
                    </GridLayout>
                </template>
            </Pager>
            <StackLayout orientation="horizontal" row="1">
                <Button text="moveTo0" @tap="moveTo(0)" />
                <Button text="moveTo3" @tap="moveTo(3)" />
                <Label :text="`selected: ${selectedIndex}`" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script setup lang="ts">
import { Pager } from '@nativescript-community/ui-pager';
import { ref } from 'nativescript-vue';

const items = ref([
    { title: 'First', color: '#e67e22' },
    { title: 'Second', color: '#3498db' },
    { title: 'Third', color: '#e74c3c' },
    { title: 'Fourth', color: '#9b59b6' }
]);
const selectedIndex = ref(0);
const pager = ref<{ nativeView: Pager }>(null);

function moveTo(index: number) {
    pager.value.nativeView.scrollToIndexAnimated(index, true);
}
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
