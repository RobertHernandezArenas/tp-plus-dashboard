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
		class="bg-base-200 relative flex min-h-screen items-center justify-center overflow-hidden p-4 font-sans">
		<!-- Elementos decorativos de fondo con efecto Glass/Blur -->
		<div
			class="bg-primary/20 animate-blob absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full opacity-70 mix-blend-multiply blur-[100px] filter"></div>
		<div
			class="bg-secondary/20 animate-blob animation-delay-2000 absolute top-[20%] right-[-10%] h-96 w-96 rounded-full opacity-70 mix-blend-multiply blur-[100px] filter"></div>
		<div
			class="bg-accent/20 animate-blob animation-delay-4000 absolute bottom-[-20%] left-[20%] h-96 w-96 rounded-full opacity-70 mix-blend-multiply blur-[100px] filter"></div>

		<!-- Contenedor Principal del Error -->
		<div
			class="bg-base-100/70 relative z-10 w-full max-w-lg space-y-8 rounded-[2.5rem] border border-white/10 p-10 text-center shadow-2xl backdrop-blur-2xl sm:p-14 dark:border-white/5">
			<!-- Icono Central con Resplandor -->
			<div class="relative flex justify-center">
				<div class="bg-error/20 absolute inset-0 scale-150 rounded-full blur-3xl"></div>
				<div
					class="bg-base-100/80 border-base-content/5 ring-error/20 relative rounded-3xl border p-6 shadow-xl ring-1">
					<AlertCircle class="text-error size-20" stroke-width="1.5" />
				</div>
			</div>

			<!-- Detalles del Error -->
			<div class="space-y-5">
				<h1
					class="from-base-content to-base-content/40 bg-linear-to-br bg-clip-text text-8xl font-black tracking-tighter text-transparent drop-shadow-sm select-none sm:text-9xl">
					{{ error?.statusCode || '500' }}
				</h1>
				<h2 class="text-base-content/90 text-2xl font-bold tracking-tight sm:text-3xl">
					¡Oops! Algo no salió bien
				</h2>
				<p class="text-base-content/60 mx-auto max-w-sm text-lg leading-relaxed font-medium">
					{{
						error?.statusMessage ||
						error?.message ||
						'No hemos podido conectarnos o se ha producido un error inesperado. Intenta de nuevo.'
					}}
				</p>
			</div>

			<!-- Botones de Acción -->
			<div class="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
				<button
					@click="handleReload"
					class="btn btn-ghost btn-lg hover:bg-base-content/5 rounded-2xl font-semibold transition-colors">
					<RefreshCcw class="mr-2 size-5" />
					Reintentar
				</button>
				<button
					@click="handleError"
					class="btn btn-primary btn-lg shadow-primary/25 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1">
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
		animation: blob 7s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
