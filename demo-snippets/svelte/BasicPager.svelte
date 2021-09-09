<style>

.label {
    font-size: 35;
    width: 100%;
    text-align: center;
    vertical-alignment: center;
    color: #FFFFFF;
    text-transform: uppercase;
}

</style>

<page>
    <actionBar title="Basic Pager">
        <navigationButton text="Go back" on:tap={goBack} />
    </actionBar>
    <stackLayout class="page">
        <pager items={items} height="100%">
            <Template let:item>
                <gridlayout backgroundColor="{item.color}">
                    <label class="label" text="{item.title}" />
                </gridlayout>
            </Template>
        </pager>
    </stackLayout>
</page>

<script lang="typescript">
    import { goBack } from 'svelte-native';
    import { Template } from 'svelte-native/components';

    const items = [
        {title: "First", color: "#e67e22"},
        {title: "Second", color: "#3498db"},
        {title: "Third", color: "#e74c3c"},
        {title: "Fourth", color: "#9b59b6"}
    ];

</script>
