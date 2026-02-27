<template>
	<div
		class="relative min-h-screen w-full overflow-hidden bg-[#12110D] p-6 font-sans text-[#FFFFFF] lg:p-10">
		<!-- Elementos Decorativos (Glassmorphism blobs) -->
		<div
			class="animate-blob pointer-events-none absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#FFFF00]/5 blur-[120px] filter"></div>
		<div
			class="animate-blob animation-delay-2000 pointer-events-none absolute top-[40%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#FFFFFF]/5 blur-[150px] filter"></div>

		<!-- Contenedor Principal -->
		<div class="relative z-10 mx-auto max-w-7xl space-y-8">
			<UsersUserHeader
				v-model="searchQuery"
				:filters-active="hasActiveFilters"
				@toggle-filters="showFilters = !showFilters"
				@create="userForm?.showModal(null)" />

			<!-- Filters Panel (Glassmorphism) -->
			<transition name="expand">
				<div
					v-show="showFilters"
					class="mb-6 overflow-hidden rounded-4xl border border-[#FFFFFF]/10 bg-[#000000]/40 p-6 shadow-2xl backdrop-blur-xl">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
						<!-- ROL -->
						<div>
							<h3 class="mb-3 text-[10px] font-black tracking-widest text-[#FFFFFF]/50 uppercase">
								Rol de Usuario
							</h3>
							<div class="flex flex-wrap gap-2">
								<button
									v-for="r in ['all', 'ADMIN', 'USER']"
									:key="r"
									@click="filterRole = r"
									class="rounded-xl px-4 py-2 text-xs font-bold transition-all"
									:class="
										filterRole === r
											? 'bg-[#FFFF00] text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.2)]'
											: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'
									">
									{{ r === 'all' ? 'Todos' : r === 'ADMIN' ? 'Administrador' : 'Usuario' }}
								</button>
							</div>
						</div>

						<!-- ESTADO -->
						<div>
							<h3 class="mb-3 text-[10px] font-black tracking-widest text-[#FFFFFF]/50 uppercase">
								Estado
							</h3>
							<div class="flex flex-wrap gap-2">
								<button
									v-for="s in ['all', 'ON', 'OFF']"
									:key="s"
									@click="filterStatus = s"
									class="rounded-xl px-4 py-2 text-xs font-bold transition-all"
									:class="
										filterStatus === s
											? 'bg-[#FFFF00] text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.2)]'
											: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'
									">
									{{ s === 'all' ? 'Todos' : s === 'ON' ? 'Activo' : 'Inactivo' }}
								</button>
							</div>
						</div>

						<!-- TIPO DOCUMENTO -->
						<div>
							<h3 class="mb-3 text-[10px] font-black tracking-widest text-[#FFFFFF]/50 uppercase">
								Documento
							</h3>
							<div class="flex flex-wrap gap-2">
								<button
									v-for="d in ['all', 'DNI', 'PASSPORT', 'NIE']"
									:key="d"
									@click="filterDocType = d"
									class="rounded-xl px-4 py-2 text-xs font-bold transition-all"
									:class="
										filterDocType === d
											? 'bg-[#FFFF00] text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.2)]'
											: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'
									">
									{{ d === 'all' ? 'Todos' : d }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</transition>

			<UsersUserTable
				:users="paginatedUsers"
				:pending="status === 'pending'"
				:total-items="filteredUsers.length"
				:items-per-page="itemsPerPage"
				v-model:current-page="currentPage"
				@edit="userForm?.showModal($event)"
				@delete="userDeleteModal?.showModal($event)"
				@toggle-status="toggleUserStatus" />
		</div>

		<!-- Modales -->
		<UsersUserFormModal ref="userForm" @refresh="refresh" @toast="handleToast" />
		<UsersUserDeleteModal ref="userDeleteModal" @refresh="refresh" @toast="handleToast" />

		<!-- Toasts Notificaciones -->
		<div class="toast toast-bottom toast-center sm:toast-end z-100">
			<TransitionGroup name="list">
				<div
					v-for="toast in toasts"
					:key="toast.id"
					class="alert mb-2 max-w-sm flex-row items-center border border-[#FFFFFF]/10 shadow-2xl backdrop-blur-md"
					:class="
						toast.type === 'success'
							? 'bg-[#10b981]/20 text-[#10b981]'
							: 'bg-[#ef4444]/20 text-[#ef4444]'
					">
					<span class="font-bold">{{ toast.message }}</span>
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>

<style scoped>
	/* Animación para el panel de filtros */
	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		max-height: 500px;
		opacity: 1;
		transform: translateY(0);
	}
	.expand-enter-from,
	.expand-leave-to {
		max-height: 0;
		opacity: 0;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
		border-width: 0;
		transform: translateY(-10px);
	}
</style>

<script lang="ts" setup>
	import { ref, computed } from 'vue'
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()

	useHead({
		title: t('nav.users') + ' | Transpallet Plus',
		meta: [{ name: 'description', content: 'Lista y gestión de usuarios del sistema' }],
	})

	definePageMeta({
		layout: 'default',
	})

	// --- Notificaciones ---
	const toasts = ref<{ id: number; message: string; type: 'success' | 'error' }[]>([])
	const showToast = (message: string, type: 'success' | 'error' = 'success') => {
		const id = Date.now()
		toasts.value.push({ id, message, type })
		setTimeout(() => {
			toasts.value = toasts.value.filter(t => t.id !== id)
		}, 3000)
	}

	const handleToast = (payload: { message: string; type: 'success' | 'error' }) => {
		showToast(payload.message, payload.type)
	}

	interface UserData {
		user_id: string
		name: string
		surname?: string
		email: string
		phone?: string
		address?: string
		city?: string
		country?: string
		postal_code?: string
		gender?: string
		birth_date?: string
		document_type?: string
		document_number?: string
		role: string
		status: 'ON' | 'OFF'
		avatar?: string
	}

	const { data: usersData, refresh, status } = await useFetch<UserData[]>('/api/users')
	const users = computed(() => usersData.value || [])

	// --- Filtros (UI Trend 2026) ---
	const showFilters = ref(false)
	const filterRole = ref('all')
	const filterStatus = ref('all')
	const filterDocType = ref('all')

	const activeFiltersCount = computed(() => {
		let count = 0
		if (filterRole.value !== 'all') count++
		if (filterStatus.value !== 'all') count++
		if (filterDocType.value !== 'all') count++
		return count
	})

	const hasActiveFilters = computed(() => activeFiltersCount.value > 0)

	// --- Búsqueda (Search) ---
	const searchQuery = ref('')
	const filteredUsers = computed(() => {
		const query = searchQuery.value.toLowerCase()

		return users.value.filter(u => {
			// Búsqueda de texto (barra superior)
			const matchesSearch =
				!query ||
				u.name.toLowerCase().includes(query) ||
				u.email.toLowerCase().includes(query) ||
				u.role.toLowerCase().includes(query)

			// Validaciones de Filtros
			const matchesRole = filterRole.value === 'all' || u.role === filterRole.value
			const matchesStatus = filterStatus.value === 'all' || u.status === filterStatus.value
			const matchesDocType = filterDocType.value === 'all' || u.document_type === filterDocType.value

			return matchesSearch && matchesRole && matchesStatus && matchesDocType
		})
	})

	// --- Paginación ---
	const currentPage = ref(1)
	const itemsPerPage = ref(10)

	const paginatedUsers = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage.value
		const end = start + itemsPerPage.value
		return filteredUsers.value.slice(start, end)
	})

	// Reset page when searching or filtering
	watch([searchQuery, filterRole, filterStatus, filterDocType], () => {
		currentPage.value = 1
	})

	// --- Referencias a los componentes hijos ---
	const userForm = ref<any>(null)
	const userDeleteModal = ref<any>(null)

	const toggleUserStatus = async (user: UserData) => {
		try {
			const newStatus = user.status === 'ON' ? 'OFF' : 'ON'
			await $fetch(`/api/users/${user.user_id}`, {
				method: 'PUT',
				body: { status: newStatus },
			})
			await refresh()
			showToast(`Usuario ${newStatus === 'ON' ? 'activado' : 'desactivado'}`, 'success')
		} catch (error: any) {
			console.error('Error toggling status:', error)
			showToast(error.data?.statusMessage || 'Error al cambiar el estado', 'error')
		}
	}
</script>

<style scoped>
	.list-enter-active,
	.list-leave-active {
		transition: all 0.3s ease;
	}
	.list-enter-from {
		opacity: 0;
		transform: translateY(30px);
	}
	.list-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
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

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}

	/* Ocultar barra de scroll en Webkit pero permitir scroll funcional */
	.overflow-x-auto::-webkit-scrollbar {
		height: 6px;
	}
	.overflow-x-auto::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}
	.overflow-x-auto::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
	}
	.overflow-x-auto::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 0, 0.5);
	}
</style>
