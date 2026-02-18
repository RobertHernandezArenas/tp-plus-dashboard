<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
	useHead({
		titleTemplate: titleChunk => {
			return titleChunk ? `${titleChunk} - Transpallet+ Plataforma` : 'Transpallet+ Plataforma'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'description', content: 'Transpallet+ Plataforma' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'keywords', content: 'Transpallet+ Plataforma' },
			{ name: 'author', content: 'Transpallet+ Plataforma' },
			{ name: 'robots', content: 'index, follow' },
			{ name: 'og:title', content: 'Transpallet+ Plataforma' },
			{ name: 'og:description', content: 'Transpallet+ Plataforma' },
			{ name: 'og:type', content: 'website' },
			{ name: 'og:url', content: 'https://transpallet.com' },
			{ name: 'og:image', content: 'https://transpallet.com/images/tp-dash.svg' },
			{ name: 'og:site_name', content: 'Transpallet+ Plataforma' },
			{ name: 'og:locale', content: 'es_MX' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@transpallet' },
			{ name: 'twitter:title', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:description', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:image', content: 'https://transpallet.com/images/tp-dash.svg' },
			{ name: 'twitter:creator', content: '@transpallet' },
			{ name: 'twitter:domain', content: 'transpallet.com' },
			{ name: 'twitter:app:name:iphone', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:iphone', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:iphone', content: 'https://transpallet.com' },
			{ name: 'twitter:app:name:ipad', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:ipad', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:ipad', content: 'https://transpallet.com' },
			{ name: 'twitter:app:name:googleplay', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:googleplay', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:googleplay', content: 'https://transpallet.com' },
			{ name: 'twitter:app:name:windows', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:windows', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:windows', content: 'https://transpallet.com' },
			{ name: 'twitter:app:name:windowsphone', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:windowsphone', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:windowsphone', content: 'https://transpallet.com' },
			{ name: 'twitter:app:name:android', content: 'Transpallet+ Plataforma' },
			{ name: 'twitter:app:id:android', content: 'com.transpallet.transpallet' },
			{ name: 'twitter:app:url:android', content: 'https://transpallet.com' },
		],
	})
</script>
