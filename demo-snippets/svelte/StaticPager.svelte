<script lang="ts">
    import { goBack } from 'svelte-native';
</script>

<page>
    <actionBar title="Static Pager">
        <navigationButton text="Go back" on:tap={() => goBack()} />
    </actionBar>
    <gridlayout class="page">
        <pager>
            <pageritem backgroundColor="#e67e22"><label class="label" text="First" /></pageritem>
            <pageritem backgroundColor="#3498db"><label class="label" text="Second" /></pageritem>
            <pageritem backgroundColor="#e74c3c"><label class="label" text="Third" /></pageritem>
            <pageritem backgroundColor="#9b59b6"><label class="label" text="Fourth" /></pageritem>
        </pager>
    </gridlayout>
</page>

<style>
    .label {
        font-size: 35;
        horizontal-alignment: center;
        vertical-alignment: center;
        color: #ffffff;
        text-transform: uppercase;
    }
</style>
