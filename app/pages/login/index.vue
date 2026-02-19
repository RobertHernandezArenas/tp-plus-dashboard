<script lang="ts" setup>
	import LoginForm from '~/components/forms/login/LoginForm.vue'

	definePageMeta({
		layout: 'auth',
	})
</script>

<template>
	<section class="flex h-screen w-full items-center justify-center bg-[#12110D]">
		<LoginForm />
	</section>
</template>
