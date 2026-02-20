<script setup lang="ts">
	import type { NuxtError } from '#app'
	import { Home, AlertCircle, RefreshCcw } from 'lucide-vue-next'

	const props = defineProps({
		error: Object as () => NuxtError,
	})

	const handleError = () => clearError({ redirect: '/' })

	const handleReload = () => {
		window.location.reload()
	}
</script>

<template>
	<div
		class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#12110D] p-4 font-sans text-[#FFFFFF]">
		<!-- Elementos decorativos de fondo con efecto Glass/Blur -->
		<!-- Blob 1 -->
		<div
			class="animate-blob pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#FFFF00]/10 blur-[120px] filter"></div>
		<!-- Blob 2 -->
		<div
			class="animate-blob animation-delay-2000 pointer-events-none absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#FFFFFF]/5 blur-[150px] filter"></div>
		<!-- Blob 3 -->
		<div
			class="animate-blob animation-delay-4000 pointer-events-none absolute bottom-[-20%] left-[20%] h-[500px] w-[500px] rounded-full bg-[#FFFF00]/10 blur-[120px] filter"></div>

		<!-- Contenedor Principal del Error -->
		<div
			class="relative z-10 w-full max-w-lg space-y-8 rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/60 p-10 text-center shadow-2xl backdrop-blur-3xl sm:p-14">
			<!-- Glow sutil dentro de la tarjeta -->
			<div
				class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#ff0000]/5 to-transparent"></div>

			<!-- Icono Central con Resplandor (Error, color rojo) -->
			<div class="relative z-10 flex justify-center">
				<div class="relative">
					<div class="absolute inset-0 rounded-full bg-[#ff0000]/20 blur-2xl"></div>
					<div
						class="relative mb-5 rounded-full border border-[#ff0000]/20 bg-[#ff0000]/10 p-5 text-[#ff0000] shadow-[0_0_40px_rgba(255,0,0,0.2)] ring-1 ring-[#ff0000]/30">
						<AlertCircle class="h-12 w-12" stroke-width="1.5" />
					</div>
				</div>
			</div>

			<!-- Detalles del Error -->
			<div class="relative z-10 space-y-5">
				<h1
					class="bg-[#FFFF00] bg-clip-text text-8xl font-black tracking-tighter text-transparent drop-shadow-sm select-none sm:text-9xl">
					{{ error?.statusCode || '500' }}
				</h1>
				<h2 class="text-2xl font-black tracking-tighter text-[#FFFFFF] sm:text-3xl">
					¡Oops! Algo no salió bien
				</h2>
				<p class="mx-auto max-w-sm text-lg font-medium tracking-wide text-[#FFFFFF]/60">
					{{
						error?.statusMessage ||
						error?.message ||
						'No hemos podido conectarnos o se ha producido un error inesperado al procesar tu solicitud.'
					}}
				</p>
			</div>

			<!-- Botones de Acción -->
			<div class="relative z-10 flex flex-col justify-center gap-4 pt-6 sm:flex-row">
				<button
					@click="handleReload"
					class="btn btn-ghost group flex h-14 items-center justify-center rounded-2xl border border-[#FFFFFF]/10 px-6 font-semibold tracking-wide text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10 sm:w-auto">
					<RefreshCcw
						class="mr-2 h-5 w-5 text-[#FFFFFF]/60 transition-transform group-hover:rotate-180 group-hover:text-[#FFFFFF]" />
					Reintentar
				</button>
				<button
					@click="handleError"
					class="btn btn-lg rounded-2xl border-none bg-[#FFFF00] font-semibold text-[#000000] shadow-lg shadow-[#FFFF00]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFFF00]/80">
					<Home class="mr-2 size-5" />
					Volver al Inicio
				</button>
			</div>
		</div>
	</div>
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
		animation: blob 15s infinite alternate;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
</style>
