<script lang="ts">
    import { getStations } from "$lib/krl";

    const area = await getStations().catch(err => ({ 
        area: "ERROR", 
        stations: new Map([["err", err]])
    }));
</script>

<h1>KRL tracker based on CommunalLine</h1>
<p>track all ur indonesian trains today !</p>
<select name="stations" id="sta">
    <optgroup label={area.area}>
    {#each area.stations as [id, name]}
        <option value={id}>{name}</option>
    {/each}
    </optgroup>
</select>