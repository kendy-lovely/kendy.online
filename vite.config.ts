import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: "https://kci.id",
				changeOrigin: true,
				secure: false
			}
		}
	}
});
