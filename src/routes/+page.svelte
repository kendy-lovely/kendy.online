<script lang="ts">  
    let sliderValue = $state(50);
</script>

<h1>Hi my name is Kender Eggins</h1>
<p>sorry that the website disappeared im upgrading it by using svelte !! i think svelte is cute</p>
<p>Visit <a href="https://kendy.online">kendy.online</a> to read the documentation</p>
<ul>
    <li><a href="/kai">kai</a></li>
    <li><a href="/rss.xml">rss feed</a></li>
</ul>
<div style="display:flex; flex-direction:column; align-content:center; align-items:center">
    <p>here have a slider to play with you silly willy -w-</p>
    <b>{sliderValue}</b>
    <input type="range" bind:value={sliderValue} min="0" max="100" style="width:50%">
</div>
