<script lang="ts" setup>
	definePageMeta({
		layout: 'auth',
	})
</script>

<template>
	<section
		class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#12110D] font-sans text-[#FFFFFF]">
		<!-- Elementos decorativos de fondo con efecto Glass/Blur -->
		<!-- Blob 1 -->
		<div
			class="animate-blob absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#FFFF00]/10 blur-[120px] filter"></div>
		<!-- Blob 2 -->
		<div
			class="animate-blob animation-delay-2000 absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#FFFFFF]/5 blur-[150px] filter"></div>
		<!-- Blob 3 -->
		<div
			class="animate-blob animation-delay-4000 absolute bottom-[-20%] left-[20%] h-[500px] w-[500px] rounded-full bg-[#FFFF00]/10 blur-[120px] filter"></div>

		<!-- Contenedor del Formulario -->
		<div class="relative z-10 w-full px-4">
			<FormLogin />
		</div>
	</section>
</template>

<style scoped>
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}

	.animate-blob {
		animation: blob 10s infinite alternate;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
