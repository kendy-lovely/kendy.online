import adapter from 'svelte-adapter-nekoweb';

export default {
	kit: {
		adapter: adapter({
		    apiKey: 'a2ad0135b82d4eb6326602fcc6ffb5880f3857eeecf72a1cf5ca6439983bf103',
			cookie: 'ec778b99107ed3cadab78cff965dba59df04992c7ee7032a302633e5f56259b1',
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
