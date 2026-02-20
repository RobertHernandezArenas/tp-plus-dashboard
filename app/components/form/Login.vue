<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import { z } from 'zod'
	import { useMutation } from '@tanstack/vue-query'
	import { useRouter } from 'vue-router'
	import { useI18n } from 'vue-i18n'
	import { useAuthStore } from '~/stores/auth' // Auto-imported usually, but explicit is safer
	import { AlertCircle, LockKeyhole, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

	// definePageMeta removed - only allowed in pages

	const { t } = useI18n()
	const router = useRouter()
	const authStore = useAuthStore()

	// State
	const showPassword = ref(false)
	const form = reactive({
		email: '',
		password: '',
	})
	// reactive errors object...
	const errors = reactive({
		email: '',
		password: '',
	})

	// Validation Schema
	// Note: replacing schema messages with function calls might be tricky if not reactive.
	// Zod schemas are usually static. But we can make them getters or recreate on submit if needed for dynamic locale change.
	// For now, let's keep it simple or use computed if possible. But z.object is not reactive.
	// A common pattern is to parse and map errors manually or create schema inside a computed/function.
	// Let's create schema inside onSubmit to support dynamic locale, or just accept English/Spanish fixed for now (mixed).
	// Actually, better to move validation message to template if possible or use t() here but it won't react to locale change dynamically unless we rebuild schema.
	// Let's use t() here, it will take current locale at execution time (onSubmit).
	const loginSchema = z.object({
		email: z.string().email('Ingresa un correo válido'), // TODO: key for validation
		password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'), // TODO: key for validation
	})

	// API Login Function
	const loginFn = async (credentials: typeof form) => {
		// Aquí es donde se conecta a la API real.
		// Ejemplo: return await $fetch('/api/auth/login', { method: 'POST', body: credentials })

		// MOCK TEMPORAL para probar la UI (Carga/Error)
		// Simular retardo de red
		await new Promise(resolve => setTimeout(resolve, 2000))

		// Simular error si usa un email específico
		if (credentials.email.includes('error')) {
			throw new Error(t('auth.login.error'))
		}

		// Simular éxito
		return {
			user: { id: 1, name: 'Usuario Demo', email: credentials.email },
			token: 'mock-jwt-token-123456',
		}
	}

	// React Query Mutation
	const { mutate, isPending, isError, error, reset } = useMutation({
		mutationFn: loginFn,
		onSuccess: data => {
			authStore.setAuth(data.user, data.token)
			router.push('/overview') // Redirigir al dashboard
		},
	})

	// Handlers
	const onSubmit = () => {
		// Reset errors
		errors.email = ''
		errors.password = ''

		// Validate
		const result = loginSchema.safeParse(form)

		if (!result.success) {
			const formattedErrors = result.error.format()
			errors.email = formattedErrors.email?._errors[0] || ''
			errors.password = formattedErrors.password?._errors[0] || ''
			return
		}

		// Submit
		mutate(form)
	}

	const resetMutation = () => {
		reset() // Resetea el estado de error de la mutación
	}

	const clearError = (field: 'email' | 'password') => {
		errors[field] = ''
	}
</script>

<template>
	<div class="mx-auto w-full max-w-md">
		<div
			class="relative space-y-8 rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/60 p-8 shadow-2xl backdrop-blur-3xl sm:p-12">
			<!-- Glow sutil dentro de la tarjeta -->
			<div
				class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#FFFF00]/5 to-transparent"></div>

			<div class="relative z-10 w-full">
				<!-- Loading Screen -->
				<div v-if="isPending" class="flex h-full w-full flex-col items-center justify-center gap-5 py-10">
					<div class="relative">
						<div class="absolute inset-0 rounded-full bg-[#FFFF00]/20 blur-2xl"></div>
						<LogoTPLoader class="relative h-20 w-20" />
					</div>
					<p class="animate-pulse text-xl font-bold tracking-wide text-[#FFFFFF]/90">
						Iniciando sesión...
					</p>
				</div>

				<!-- Error Screen -->
				<div v-else-if="isError" class="flex flex-col items-center justify-center py-6 text-center">
					<div
						class="mb-5 rounded-full bg-[#ff0000]/10 p-4 text-[#ff0000] shadow-[0_0_30px_rgba(255,0,0,0.2)] ring-1 ring-[#ff0000]/30">
						<AlertCircle class="h-10 w-10" />
					</div>
					<h2 class="mb-3 text-2xl font-bold text-[#ff0000]">Error de Acceso</h2>
					<p class="mb-8 max-w-xs text-center text-sm font-medium text-[#FFFFFF]/60">
						{{ error?.message || 'Ocurrió un error inesperado al conectar.' }}
					</p>
					<button
						class="btn btn-ghost h-14 w-full rounded-2xl border border-[#FFFFFF]/10 font-semibold text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF]/10"
						@click="resetMutation">
						Intentar de nuevo
					</button>
				</div>

				<!-- Login Form -->
				<form v-else class="flex flex-col gap-8" @submit.prevent="onSubmit">
					<div class="flex flex-col items-center gap-3 text-center">
						<!-- Logo con resplandor -->
						<div class="relative mb-3">
							<div class="absolute inset-0 scale-110 rounded-full bg-[#FFFF00]/20 blur-2xl"></div>
							<LogoTP class="relative h-20 w-20 drop-shadow-2xl" />
						</div>
						<h2 class="text-4xl font-black tracking-tighter text-[#FFFFFF]">
							{{ t('auth.login.platform') }}
						</h2>
						<p class="text-xs font-bold tracking-widest text-[#FFFFFF]/50 uppercase">
							Plataforma de gestión de rutas
						</p>
					</div>

					<div class="space-y-6">
						<div class="form-control">
							<label class="label pb-2">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ t('auth.login.email') }}
								</span>
							</label>
							<div class="group relative">
								<input
									v-model="form.email"
									type="email"
									inputmode="email"
									autocomplete="username"
									placeholder="usuario@ejemplo.com"
									class="input input-bordered h-14 w-full rounded-2xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 pl-12 text-lg font-medium text-[#FFFFFF] transition-all outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000]/80 focus:ring-2 focus:ring-[#FFFF00]/20"
									:class="{
										'border-[#ff0000]/50 focus:border-[#ff0000]/50 focus:ring-[#ff0000]/20':
											errors.email,
									}"
									@input="clearError('email')" />
								<Mail
									class="absolute top-4 left-4 h-6 w-6 text-[#FFFFFF]/40 transition-colors group-focus-within:text-[#FFFF00]"
									:class="{ 'text-[#ff0000]/70': errors.email }" />
							</div>
							<span v-if="errors.email" class="mt-2 ml-1 text-xs font-bold text-[#ff0000]">
								{{ errors.email }}
							</span>
						</div>

						<div class="form-control">
							<label class="label flex justify-between pb-2">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ t('auth.login.password') }}
								</span>
							</label>
							<div class="group relative">
								<input
									v-model="form.password"
									:type="showPassword ? 'text' : 'password'"
									inputmode="text"
									autocomplete="current-password"
									placeholder="••••••••"
									class="input input-bordered h-14 w-full rounded-2xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 pr-12 pl-12 text-lg font-medium tracking-widest text-[#FFFFFF] transition-all outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000]/80 focus:ring-2 focus:ring-[#FFFF00]/20"
									:class="{
										'border-[#ff0000]/50 focus:border-[#ff0000]/50 focus:ring-[#ff0000]/20':
											errors.password,
									}"
									@input="clearError('password')" />
								<Lock
									class="absolute top-4 left-4 h-6 w-6 text-[#FFFFFF]/40 transition-colors group-focus-within:text-[#FFFF00]"
									:class="{ 'text-[#ff0000]/70': errors.password }" />
								<button
									type="button"
									class="absolute top-4 right-4 text-[#FFFFFF]/40 transition-colors hover:text-[#FFFF00] focus:outline-none"
									@click="showPassword = !showPassword">
									<Eye v-if="showPassword" class="h-6 w-6" />
									<EyeOff v-else class="h-6 w-6" />
								</button>
							</div>
							<span
								v-if="errors.password"
								class="mt-2 ml-1 text-xs font-bold tracking-normal text-[#ff0000]">
								{{ errors.password }}
							</span>
						</div>
					</div>

					<div class="form-control mt-4">
						<button
							class="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#FFFF00] text-lg font-black tracking-wide text-[#000000] uppercase shadow-[0_0_20px_rgba(255,255,0,0.15)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,0,0.3)] disabled:opacity-70 disabled:hover:scale-100"
							type="submit"
							:disabled="isPending">
							<span class="relative z-10 flex items-center justify-center gap-2">
								{{ t('auth.login.button') }}
							</span>
							<!-- Efecto de brillo en hover -->
							<div
								class="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[#FFFFFF]/60 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}

	/* Fix browser autofill background color */
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0 30px #12110d inset !important;
		-webkit-text-fill-color: #ffffff !important;
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
