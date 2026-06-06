import adapter from 'svelte-adapter-nekoweb';

export default {
	kit: {
		adapter: adapter({
		    apiKey: '24ac52b5f43155f90bf6fc53718ec522f466075e7820b5c8f702099fb9748810',
			cookie: '7714aae2c4ffc63002c5870bd5bf7cd08abb12cda5ad24e605b7bb10de420d40',
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
