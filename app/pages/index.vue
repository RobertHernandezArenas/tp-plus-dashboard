<template>
	<div class="bg-red-50 p-4">
		<h1 class="text-2xl font-bold">{{ t('nav.dashboard') }}</h1>
		<p>Welcome to the dashboard.</p>
		<TPPlusLogoLoader />
	</div>
</template>

<script lang="ts" setup>
	import TPPlusLogoLoader from '~/components/TPPlusLogoLoader.vue'

	const { t } = useI18n()

	useHead({
		title: t('nav.dashboard'),
		meta: [{ name: 'description', content: 'Panel de control principal' }],
	})
</script>
