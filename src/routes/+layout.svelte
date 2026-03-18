<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.ico';
	import "../style.css";

	let { children } = $props();
  const currentPath = $derived(page.url.pathname)

  let kendy = $derived(`/kendys/${page.url.pathname === '/' ? 'home' : page.url.pathname.split('/')[1] }.png`)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div style="margin:auto;min-height:98vh;position:relative;display:flex;">
  <div style="margin-bottom: 335px;margin-top:0" class="outer">
	  <nav>
		  <a class="navitem" href="/">home</a>
		  <a class="navitem" href="/about">about</a>
		  <a class="navitem" href="/blog">blog</a>
		  <a class="navitem" href="/microblog">microblog</a>
	  </nav>
	  <hr>
	  <div class="main">
	  	{@render children()}
  	</div>
  </div>
  <div class="kendy" 
       style="background-image:url({kendy});background-size:cover;">
  </div>
</div>

<style>
  .kendy {
    height: 335px;
    aspect-ratio: 1;
    position: absolute;
    right: 0;
    bottom: -10px;
  }
</style>
