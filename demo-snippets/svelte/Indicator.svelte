<script lang="ts">
    import { goBack } from 'svelte-native';
    import { Template } from 'svelte-native/components';

    const items = [
        { title: 'First', color: '#e67e22' },
        { title: 'Second', color: '#3498db' },
        { title: 'Third', color: '#e74c3c' },
        { title: 'Fourth', color: '#9b59b6' }
    ];
</script>

<page>
    <actionBar title="Indicator">
        <navigationButton text="Go back" on:tap={() => goBack()} />
    </actionBar>
    <stackLayout class="page">
        <pager {items} height="300" indicator="fill" showIndicator="true">
            <Template let:item>
                <gridlayout backgroundColor={item.color}>
                    <label class="label" text={item.title} />
                </gridlayout>
            </Template>
        </pager>
    </stackLayout>
</page>

<style>
    .label {
        font-size: 35;
        width: 100%;
        text-align: center;
        vertical-alignment: center;
        color: #ffffff;
        text-transform: uppercase;
    }
</style>
