// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

// Force restart
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	css: ['~/assets/css/main.css'],
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		// 'nuxt-aos', // Replaced with manual plugin
		// '@nuxtjs/tailwindcss' // Removed for Tailwind v4 support
		'nuxt-lucide-icons',
		'@nuxt/image',
	],
	vite: {
		plugins: [
			// @ts-expect-error Type mismatch with Nuxt's Vite interface
			tailwindcss(),
		],
		optimizeDeps: {
			include: ['aos'],
		},
	},
})
