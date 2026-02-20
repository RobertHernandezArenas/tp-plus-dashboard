// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

// Force restart
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/main.css'],
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxt/image'],

	googleFonts: {
		families: {
			Outfit: [300, 400, 500, 600, 700, 800, 900],
		},
		display: 'swap',
	},

	telemetry: false, // Disable telemetry for speed
	vite: {
		plugins: [
			// @ts-expect-error Type mismatch with Nuxt's Vite interface
			tailwindcss(),
		],
		optimizeDeps: {
			include: ['aos', 'lucide-vue-next', '@tanstack/vue-query', 'vue-i18n', 'zod'],
		},
	},
})
