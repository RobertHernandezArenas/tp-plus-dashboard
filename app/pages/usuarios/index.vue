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
			<!-- Header -->
			<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 class="text-4xl font-black tracking-tighter text-[#FFFFFF] drop-shadow-lg">
						Gestión de Usuarios
					</h1>
					<p class="mt-1 text-sm font-bold tracking-widest text-[#FFFFFF]/50 uppercase">
						Administra accesos y roles
					</p>
				</div>

				<div class="flex items-center gap-4">
					<button
						class="btn btn-ghost h-12 rounded-2xl border border-[#FFFFFF]/10 px-4 font-semibold text-[#FFFFFF] hover:bg-[#FFFFFF]/10">
						<Filter class="mr-2 h-5 w-5" />
						Filtros
					</button>
					<button
						@click="openUserModal(null)"
						class="group relative flex h-12 items-center justify-center overflow-hidden rounded-2xl bg-[#FFFF00] px-6 font-black text-[#000000] uppercase shadow-[0_0_15px_rgba(255,255,0,0.15)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,0,0.3)]">
						<span class="relative z-10 flex items-center gap-2">
							<Plus class="h-5 w-5" />
							Nuevo Usuario
						</span>
						<div
							class="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[#FFFFFF]/60 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
					</button>
				</div>
			</div>

			<!-- Search Bar flotante -->
			<div class="group relative max-w-xl">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Buscar por nombre, correo o rol..."
					class="input input-bordered h-14 w-full rounded-2xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 pl-14 text-lg font-medium text-[#FFFFFF] backdrop-blur-md transition-all outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000]/80 focus:ring-2 focus:ring-[#FFFF00]/20" />
				<Search
					class="absolute top-4 left-5 h-6 w-6 text-[#FFFFFF]/40 transition-colors group-focus-within:text-[#FFFF00]" />
			</div>

			<!-- Tabla (Glass Card) -->
			<div
				class="relative overflow-hidden rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/40 p-1 shadow-2xl backdrop-blur-2xl">
				<!-- Glow interno del contenedor -->
				<div
					class="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-[#FFFF00]/5 to-transparent"></div>

				<div class="relative z-10 w-full overflow-x-auto">
					<table class="table w-full border-collapse">
						<thead>
							<tr
								class="border-b border-[#FFFFFF]/10 text-xs font-black tracking-wider text-[#FFFFFF]/50 uppercase">
								<th class="px-6 py-5">Usuario</th>
								<th class="px-6 py-5">Rol</th>
								<th class="px-6 py-5">Estado</th>
								<th class="px-6 py-5 text-right">Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="user in filteredUsers"
								:key="user.id"
								class="border-b border-[#FFFFFF]/5 transition-colors hover:bg-[#FFFFFF]/5">
								<td class="px-6 py-4">
									<div class="flex items-center gap-4">
										<div
											class="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FFFFFF]/10">
											<div class="absolute inset-0 bg-[#FFFF00]/20 mix-blend-overlay"></div>
											<img
												:src="user.avatar"
												alt="Avatar"
												class="h-full w-full object-cover brightness-110 saturate-0" />
										</div>
										<div>
											<div class="text-base font-bold text-[#FFFFFF]">{{ user.name }}</div>
											<div class="text-xs font-semibold tracking-wider text-[#FFFFFF]/50">
												{{ user.email }}
											</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-2">
										<ShieldCheck v-if="user.role === 'Admin'" class="h-4 w-4 text-[#FFFF00]" />
										<User v-else class="h-4 w-4 text-[#FFFFFF]/40" />
										<span class="text-sm font-bold text-[#FFFFFF]/80">{{ user.role }}</span>
									</div>
								</td>
								<td class="px-6 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black tracking-wide uppercase shadow-sm"
										:class="
											user.active
												? 'bg-[#FFFF00]/10 text-[#FFFF00] ring-1 ring-[#FFFF00]/30'
												: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/50 ring-1 ring-[#FFFFFF]/10'
										">
										<div
											class="h-1.5 w-1.5 rounded-full"
											:class="
												user.active ? 'animate-pulse bg-[#FFFF00]' : 'bg-[#FFFFFF]/30'
											"></div>
										{{ user.active ? 'Activo' : 'Inactivo' }}
									</div>
								</td>
								<td class="px-6 py-4 text-right">
									<div class="flex items-center justify-end gap-2">
										<!-- Toggle Activar/Desactivar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
											title="Cambiar Estado"
											@click="toggleUserStatus(user)">
											<ToggleRight v-if="user.active" class="h-5 w-5 text-[#FFFF00]" />
											<ToggleLeft v-else class="h-5 w-5 text-[#FFFFFF]/40" />
										</button>

										<!-- Editar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
											title="Editar Usuario"
											@click="openUserModal(user)">
											<Pencil class="h-4 w-4 text-[#FFFFFF]/70" />
										</button>

										<!-- Eliminar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#ff0000]/20"
											title="Eliminar Usuario"
											@click="confirmDelete(user)">
											<Trash2 class="h-4 w-4 text-[#ff0000]/80" />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- Empty State -->
					<div
						v-if="filteredUsers.length === 0"
						class="flex flex-col items-center justify-center py-16 text-center">
						<div class="mb-4 rounded-full bg-[#FFFFFF]/5 p-6 ring-1 ring-[#FFFFFF]/10">
							<Users class="h-12 w-12 text-[#FFFFFF]/30" />
						</div>
						<h3 class="text-xl font-bold text-[#FFFFFF]">No se encontraron usuarios</h3>
						<p class="mt-2 text-sm text-[#FFFFFF]/50">
							Intenta buscar con otros términos o crea uno nuevo.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- MODALES OVERLAYS -->

		<!-- 1. Modal Creación / Edición -->
		<dialog ref="userModal" class="modal modal-bottom sm:modal-middle">
			<div
				class="modal-box relative rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/80 p-8 text-[#FFFFFF] shadow-2xl backdrop-blur-3xl">
				<!-- Glow interno del modal -->
				<div
					class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#FFFF00]/10 to-transparent"></div>

				<form method="dialog" class="relative z-10">
					<button
						class="btn btn-sm btn-circle btn-ghost absolute top-0 right-0 text-xl text-[#FFFFFF]/50 hover:text-[#FFFFFF]">
						✕
					</button>
				</form>

				<div class="relative z-10">
					<h3 class="mb-6 text-2xl font-black tracking-tight">
						{{ editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
					</h3>

					<div class="space-y-5">
						<div class="form-control">
							<label class="label pb-2">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Nombre Completo
								</span>
							</label>
							<input
								v-model="form.name"
								type="text"
								placeholder="John Doe"
								class="input input-bordered h-12 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-2">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Correo Electrónico
								</span>
							</label>
							<input
								v-model="form.email"
								type="email"
								placeholder="john@ejemplo.com"
								class="input input-bordered h-12 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-2">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Rol Asignado
								</span>
							</label>
							<select
								v-model="form.role"
								class="select select-bordered h-12 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50">
								<option value="Admin">Administrador</option>
								<option value="Despachador">Despachador</option>
								<option value="Auditor">Auditor</option>
							</select>
						</div>
					</div>

					<div class="modal-action mt-8">
						<button
							class="btn btn-ghost h-12 rounded-xl px-6 text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]"
							@click.prevent="userModal?.close()">
							Cancelar
						</button>
						<button
							class="btn h-12 rounded-xl border-none bg-[#FFFF00] px-8 font-bold text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.15)] hover:bg-[#FFFF00]/80"
							@click.prevent="saveUser">
							{{ editingUser ? 'Guardar Cambios' : 'Crear Usuario' }}
						</button>
					</div>
				</div>
			</div>
			<!-- Overlay clickeable para cerrar -->
			<form method="dialog" class="modal-backdrop bg-[#000000]/60 backdrop-blur-sm">
				<button>close</button>
			</form>
		</dialog>

		<!-- 2. Modal Confirmación Borrado -->
		<dialog ref="deleteModal" class="modal modal-bottom sm:modal-middle">
			<div
				class="modal-box relative rounded-[2.5rem] border border-[#ff0000]/20 bg-[#000000]/90 p-8 text-center text-[#FFFFFF] shadow-2xl backdrop-blur-3xl">
				<!-- Glow rojo intenso -->
				<div
					class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#ff0000]/10 to-transparent"></div>

				<div class="relative z-10 flex flex-col items-center">
					<div
						class="mb-5 rounded-full bg-[#ff0000]/10 p-5 text-[#ff0000] shadow-[0_0_30px_rgba(255,0,0,0.2)] ring-1 ring-[#ff0000]/30">
						<AlertTriangle class="h-10 w-10" />
					</div>
					<h3 class="mb-2 text-2xl font-black text-[#ff0000]">Eliminar Usuario</h3>
					<p class="max-w-xs text-sm font-medium text-[#FFFFFF]/60">
						¿Estás seguro que deseas eliminar a
						<span class="font-bold text-[#FFFFFF]">{{ userToDelete?.name }}</span>
						? Esta acción no se puede deshacer.
					</p>

					<div class="mt-8 flex w-full gap-3">
						<button
							class="btn btn-ghost h-12 flex-1 rounded-xl border border-[#FFFFFF]/10 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
							@click.prevent="deleteModal?.close()">
							Cancelar
						</button>
						<button
							class="btn h-12 flex-1 rounded-xl border-none bg-[#ff0000] font-bold text-[#FFFFFF] shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:bg-[#cc0000]"
							@click.prevent="executeDelete">
							Sí, Eliminar
						</button>
					</div>
				</div>
			</div>
			<form method="dialog" class="modal-backdrop bg-[#000000]/80 backdrop-blur-md">
				<button>close</button>
			</form>
		</dialog>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive, computed } from 'vue'
	import { useI18n } from 'vue-i18n'
	import {
		Search,
		Plus,
		Filter,
		Pencil,
		Trash2,
		User,
		ShieldCheck,
		ToggleLeft,
		ToggleRight,
		Users,
		AlertTriangle,
	} from 'lucide-vue-next'

	const { t } = useI18n()

	useHead({
		title: t('nav.users') + ' | Transpallet Plus',
		meta: [{ name: 'description', content: 'Lista y gestión de usuarios del sistema' }],
	})

	definePageMeta({
		layout: 'default',
	})

	// --- Mock Data ---
	interface UserData {
		id: number
		name: string
		email: string
		role: string
		active: boolean
		avatar: string
	}

	const users = ref<UserData[]>([
		{
			id: 1,
			name: 'Robert Hernandez',
			email: 'robert@transpallet.com',
			role: 'Admin',
			active: true,
			avatar: 'https://i.pravatar.cc/150?u=1',
		},
		{
			id: 2,
			name: 'Elena Ramírez',
			email: 'elena.r@transpallet.com',
			role: 'Despachador',
			active: true,
			avatar: 'https://i.pravatar.cc/150?u=2',
		},
		{
			id: 3,
			name: 'Carlos Díaz',
			email: 'cdiaz@transpallet.com',
			role: 'Auditor',
			active: false,
			avatar: 'https://i.pravatar.cc/150?u=3',
		},
		{
			id: 4,
			name: 'María Gómez',
			email: 'mgomez@transpallet.com',
			role: 'Despachador',
			active: true,
			avatar: 'https://i.pravatar.cc/150?u=4',
		},
	])

	// --- Búsqueda (Search) ---
	const searchQuery = ref('')
	const filteredUsers = computed(() => {
		const query = searchQuery.value.toLowerCase()
		if (!query) return users.value
		return users.value.filter(
			u =>
				u.name.toLowerCase().includes(query) ||
				u.email.toLowerCase().includes(query) ||
				u.role.toLowerCase().includes(query),
		)
	})

	// --- Modales Refs ---
	const userModal = ref<HTMLDialogElement | null>(null)
	const deleteModal = ref<HTMLDialogElement | null>(null)

	// --- Estado del Formulario ---
	const editingUser = ref<UserData | null>(null)
	const userToDelete = ref<UserData | null>(null)

	const form = reactive({
		name: '',
		email: '',
		role: 'Despachador',
	})

	// --- Acciones CRUD simuladas ---
	const openUserModal = (user: UserData | null) => {
		editingUser.value = user
		if (user) {
			form.name = user.name
			form.email = user.email
			form.role = user.role
		} else {
			form.name = ''
			form.email = ''
			form.role = 'Despachador'
		}
		userModal.value?.showModal()
	}

	const saveUser = () => {
		if (editingUser.value) {
			// Update mock
			const index = users.value.findIndex(u => u.id === editingUser.value?.id)
			if (index !== -1) {
				users.value[index] = {
					...users.value[index],
					name: form.name,
					email: form.email,
					role: form.role,
				} as UserData
			}
		} else {
			// Create mock
			users.value.unshift({
				id: Date.now(),
				name: form.name,
				email: form.email,
				role: form.role,
				active: true,
				avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
			})
		}
		userModal.value?.close()
	}

	const toggleUserStatus = (user: UserData) => {
		user.active = !user.active
	}

	const confirmDelete = (user: UserData) => {
		userToDelete.value = user
		deleteModal.value?.showModal()
	}

	const executeDelete = () => {
		if (userToDelete.value) {
			users.value = users.value.filter(u => u.id !== userToDelete.value?.id)
			userToDelete.value = null
		}
		deleteModal.value?.close()
	}
</script>

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
