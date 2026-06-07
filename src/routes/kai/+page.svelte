<script lang="ts">
    import { getStations } from "$lib/krl";
    import { onMount } from "svelte";

    let stations: Map<string, string>;
    let areas: Array<string>;

    onMount(async () => {
        getStations().then(res => ({ stations, areas } = res));
    });
</script>

<h1>KRL tracker based on CommunalLine</h1>
<p>track all ur indonesian trains today !</p>
<select name="stations" id="sta">
{#if !areas || !stations}
  <option value="wait">Waiting...</option>
{:else}
    {#each areas as area}
        <optgroup label={area}>
        {#each stations as [id, name]}
            <option value={id}>{name}</option>
        {/each}
        </optgroup>
    {/each}
{/if}
</select>