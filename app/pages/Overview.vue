<template>
	<div class="bg-red-50 p-4">
		<h1 class="text-2xl font-bold">{{ t('nav.dashboard') }}</h1>
		<p>Welcome to the dashboard.</p>
	</div>
</template>

<script lang="ts" setup>
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n() 

	useHead({
		title: t('nav.dashboard'),
		meta: [{ name: 'description', content: 'Panel de control principal' }],
	})
</script>
