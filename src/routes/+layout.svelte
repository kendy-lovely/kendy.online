<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import "../style.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="outer" >
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