<template>
	<div class="card bg-base-100 w-full max-w-sm shadow-xl">
		<div class="card-body rounded-lg bg-[#12110D]">
			<!-- Loading Screen -->
			<div v-if="isPending" class="flex flex-col items-center justify-center py-8">
				<span class="loading loading-spinner loading-lg text-primary"></span>
				<p class="mt-4 text-white">Autenticando...</p>
			</div>

			<!-- Error Screen -->
			<div v-else-if="isError" class="flex flex-col items-center justify-center py-8 text-center">
				<div class="bg-error/10 text-error mb-4 rounded-full p-3">
					<AlertCircle class="h-8 w-8" />
				</div>
				<h2 class="text-error mb-2 text-xl font-bold">Error de Acceso</h2>
				<p class="text-base-content/70 mb-6 text-sm">
					{{ error?.message || 'Ocurrió un error inesperado' }}
				</p>
				<button class="btn btn-primary w-full" @click="resetMutation">Intentar de nuevo</button>
			</div>

			<!-- Login Form -->
			<form v-else class="flex flex-col gap-4" @submit.prevent="onSubmit">
				<div class="flex flex-col items-center gap-3 text-center">
					<div>
						<TPPlusLogo class="h-12 w-12" />
					</div>
					<!-- <h2 class="text-2xl font-bold">TP+ Platform</h2> -->
					<p class="text-xl font-bold text-white">Transpallet Plus Platform</p>
				</div>

				<div class="form-control">
					<label class="label">
						<span class="label-text mb-2 text-[12px] text-neutral-500">Correo Electrónico</span>
					</label>
					<div class="relative">
						<input
							v-model="form.email"
							type="email"
							placeholder="usuario@ejemplo.com"
							class="input input-bordered focus:border- [#FFFF00] w-full rounded-lg pl-10 outline-2 focus:outline-[#FFFF00]"
							:class="{ 'input-error': errors.email }"
							@input="clearError('email')" />
						<Mail class="text-base-content/50 absolute top-3 left-3 h-5 w-5" />
					</div>
					<span v-if="errors.email" class="text-error mt-1 text-xs">{{ errors.email }}</span>
				</div>

				<div class="form-control">
					<label class="label">
						<span class="label-text mb-2 text-[12px] text-neutral-500">Contraseña</span>
					</label>
					<div class="relative">
						<input
							v-model="form.password"
							:type="showPassword ? 'text' : 'password'"
							placeholder="••••••••"
							class="input input-bordered w-full rounded-lg pr-10 pl-10 outline-2 focus:border-[#FFFF00] focus:outline-[#FFFF00]"
							:class="{ 'input-error': errors.password }"
							@input="clearError('password')" />
						<Lock class="text-base-content/50 absolute top-3 left-3 h-5 w-5" />
						<button
							type="button"
							class="text-base-content/50 hover:text-base-content absolute top-3 right-3"
							@click="showPassword = !showPassword">
							<Eye v-if="showPassword" class="h-5 w-5" />
							<EyeOff v-else class="h-5 w-5" />
						</button>
					</div>
					<span v-if="errors.password" class="text-error mt-1 text-xs">{{ errors.password }}</span>
				</div>

				<div class="form-control mt-2">
					<button class="group relative h-12 rounded-full border bg-[#FFFF00] px-4 text-neutral-950 w-full">
						<span class="relative inline-flex overflow-hidden" type="submit" :disabled="isPending">
							<div
								class="translate-y-0 skew-y-0 font-bold transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-[9deg]">
								Iniciar Sesión
							</div>
							<div
								class="absolute translate-y-[115%] skew-y-12 font-bold transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
								Iniciar Sesión
							</div>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import { z } from 'zod'
	import { useMutation } from '@tanstack/vue-query'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '~/stores/auth' // Auto-imported usually, but explicit is safer
	import { AlertCircle, LockKeyhole, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

	definePageMeta({
		layout: 'auth',
	})

	const router = useRouter()
	const authStore = useAuthStore()

	// State
	const showPassword = ref(false)
	const form = reactive({
		email: '',
		password: '',
	})
	const errors = reactive({
		email: '',
		password: '',
	})

	// Validation Schema
	const loginSchema = z.object({
		email: z.string().email('Ingresa un correo válido'),
		password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
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
			throw new Error('Credenciales incorrectas. Intenta de nuevo.')
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
			router.push('/') // Redirigir al dashboard
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

	useHead({
		title: 'Iniciar Sesión',
	})
</script>
