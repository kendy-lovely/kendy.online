<script lang="ts">
    import { getStations, type Area } from "$lib/krl";
    import { onMount } from "svelte";

    let area: Area

    onMount(async () => {
        area = await getStations()
        .then(res => res)
        .catch((err: string) => ({ area: "ERROR", stations: new Map([["err", err]]) }));
    });
</script>

<h1>KRL tracker based on CommunalLine</h1>
<p>track all ur indonesian trains today !</p>
<select name="stations" id="sta">
{#if !area}
    <option value="wait">Waiting...</option>
{:else}
    <optgroup label={area.area}>
    {#each area.stations as [id, name]}
        <option value={id}>{name}</option>
    {/each}
    </optgroup>
{/if}
</select>