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
		// 'nuxt-aos', // Replaced with manual plugin calls in plugins/aos.client.ts
		'@nuxt/image',
	],

	i18n: {
		defaultLocale: 'es',
		strategy: 'prefix_except_default',
		langDir: '../app/locales',
		locales: [
			{ code: 'es', file: 'es.json', name: 'Español' },
			{ code: 'en', file: 'en.json', name: 'English' },
			{ code: 'pl', file: 'pl.json', name: 'Polski' },
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root', // recommended
		},
	},

	telemetry: false, // Disable telemetry for speed
	vite: {
		plugins: [
			// @ts-expect-error Type mismatch with Nuxt's Vite interface
			tailwindcss(),
		],
		optimizeDeps: {
			include: ['aos', 'lucide-vue-next'],
		},
	},
})
