import adapter from 'svelte-adapter-nekoweb';

export default {
	kit: {
		adapter: adapter({
		    apiKey: '2747452d0204cad93394b421deef79644e5f1da47bb628d65fb05655989a936b',
			cookie: 'ce2b1f63783d9a3f7dd8a89c90b473e49e5303be0402b6f83c67a26192ecc563',
			folder: '/build',
		    // Default adapter-static options are below
		    pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	},
};