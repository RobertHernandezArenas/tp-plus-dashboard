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
				<label for="users-search" class="sr-only">Buscar usuarios</label>
				<input
					id="users-search"
					v-model="searchQuery"
					type="search"
					placeholder="Buscar por nombre, correo o rol..."
					class="input input-bordered h-14 w-full rounded-2xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 pl-14 text-lg font-medium text-[#FFFFFF] backdrop-blur-md transition-all outline-none placeholder:text-[#FFFFFF]/30 focus:border-[#FFFF00]/50 focus:bg-[#000000]/80 focus:ring-2 focus:ring-[#FFFF00]/20" />
				<Search
					class="absolute top-4 left-5 h-6 w-6 text-[#FFFFFF]/40 transition-colors group-focus-within:text-[#FFFF00]"
					aria-hidden="true" />
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
						<tbody v-if="status === 'pending'">
							<tr v-for="i in 5" :key="i" class="border-b border-[#FFFFFF]/5">
								<td class="px-6 py-4">
									<div class="skeleton h-12 w-48 rounded bg-[#FFFFFF]/10"></div>
								</td>
								<td class="px-6 py-4">
									<div class="skeleton h-6 w-24 rounded bg-[#FFFFFF]/10"></div>
								</td>
								<td class="px-6 py-4">
									<div class="skeleton h-6 w-20 rounded bg-[#FFFFFF]/10"></div>
								</td>
								<td class="px-6 py-4 text-right">
									<div class="skeleton ml-auto h-8 w-32 rounded bg-[#FFFFFF]/10"></div>
								</td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr
								v-for="user in filteredUsers"
								:key="user.user_id"
								class="cursor-pointer border-b border-[#FFFFFF]/5 transition-colors hover:bg-[#FFFFFF]/10"
								@click="openUserModal(user)">
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
										<ShieldCheck v-if="user.role === 'ADMIN'" class="h-4 w-4 text-[#FFFF00]" />
										<User v-else class="h-4 w-4 text-[#FFFFFF]/40" />
										<span class="text-sm font-bold text-[#FFFFFF]/80">
											{{ user.role === 'ADMIN' ? 'Administrador' : 'Usuario' }}
										</span>
									</div>
								</td>
								<td class="px-6 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black tracking-wide uppercase shadow-sm"
										:class="
											user.status === 'ON'
												? 'bg-[#FFFF00]/10 text-[#FFFF00] ring-1 ring-[#FFFF00]/30'
												: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/50 ring-1 ring-[#FFFFFF]/10'
										">
										<div
											class="h-1.5 w-1.5 rounded-full"
											:class="
												user.status === 'ON' ? 'animate-pulse bg-[#FFFF00]' : 'bg-[#FFFFFF]/30'
											"></div>
										{{ user.status === 'ON' ? 'Activo' : 'Inactivo' }}
									</div>
								</td>
								<td class="px-6 py-4 text-right">
									<div class="flex items-center justify-end gap-2">
										<!-- Toggle Activar/Desactivar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
											:aria-label="user.status === 'ON' ? 'Desactivar Usuario' : 'Activar Usuario'"
											title="Cambiar Estado"
											@click.stop="toggleUserStatus(user)">
											<ToggleRight v-if="user.status === 'ON'" class="h-5 w-5 text-[#FFFF00]" />
											<ToggleLeft v-else class="h-5 w-5 text-[#FFFFFF]/40" />
										</button>

										<!-- Editar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
											aria-label="Editar Usuario"
											title="Editar Usuario"
											@click.stop="openUserModal(user)">
											<Pencil class="h-4 w-4 text-[#FFFFFF]/70" />
										</button>

										<!-- Eliminar -->
										<button
											class="btn btn-circle btn-sm btn-ghost hover:bg-[#ff0000]/20"
											aria-label="Eliminar Usuario"
											title="Eliminar Usuario"
											@click.stop="confirmDelete(user)">
											<Trash2 class="h-4 w-4 text-[#ff0000]/80" />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- Empty State -->
					<div
						v-if="status !== 'pending' && filteredUsers.length === 0"
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
		<dialog ref="userModal" class="modal">
			<div
				class="modal-box relative w-11/12 max-w-4xl rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/80 p-8 text-[#FFFFFF] shadow-2xl backdrop-blur-3xl">
				<!-- Glow interno del modal -->
				<div
					class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#FFFF00]/10 to-transparent"></div>

				<!-- Botón cerrar modal -->
				<button
					type="button"
					aria-label="Cerrar modal de usuario"
					class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 z-20 text-xl text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
					@click="userModal?.close()">
					✕
				</button>

				<div class="relative z-10">
					<h3 class="mb-6 text-2xl font-black tracking-tight">
						{{ editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario' }}
					</h3>

					<div class="grid gap-4 md:grid-cols-2">
						<div class="form-control">
							<label class="label pb-1" for="user-name">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Nombre
								</span>
							</label>
							<input
								id="user-name"
								v-model="form.name"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-surname">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Apellidos
								</span>
							</label>
							<input
								id="user-surname"
								v-model="form.surname"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-email">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Correo Electrónico
								</span>
							</label>
							<input
								id="user-email"
								v-model="form.email"
								type="email"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-password">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Contraseña
								</span>
							</label>
							<input
								id="user-password"
								v-model="form.password"
								type="password"
								:placeholder="editingUser ? '(Opcional) Dejar en blanco' : 'Requerida'"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>

						<div class="form-control relative">
							<label class="label pb-1" id="label-doctype">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Tipo Documento
								</span>
							</label>
							<div
								tabindex="0"
								role="button"
								aria-labelledby="label-doctype"
								class="input input-bordered flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none hover:bg-[#FFFFFF]/10 focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50"
								@click="toggleDropdown('docType')"
								@keydown.enter.prevent="toggleDropdown('docType')"
								@keydown.space.prevent="toggleDropdown('docType')"
								@blur="closeDropdownDelayed('docType')">
								<span>
									{{ form.document_type === 'PASSPORT' ? 'Pasaporte' : form.document_type }}
								</span>
								<ChevronDown class="h-4 w-4 opacity-50" />
							</div>
							<Transition
								enter-active-class="transition duration-100 ease-out"
								enter-from-class="transform scale-95 opacity-0"
								enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-75 ease-in"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-95 opacity-0">
								<ul
									v-show="openDropdown === 'docType'"
									class="absolute top-[72px] left-0 z-50 w-full rounded-xl border border-[#FFFFFF]/10 bg-[#12110D] p-1.5 shadow-2xl">
									<li
										v-for="type in [
											{ value: 'DNI', label: 'DNI' },
											{ value: 'PASSPORT', label: 'Pasaporte' },
											{ value: 'NIE', label: 'NIE' },
										]"
										:key="type.value">
										<a
											class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
											:class="{
												'bg-[#FFFF00]/10 font-bold text-[#FFFF00]':
													form.document_type === type.value,
											}"
											@click="selectOption('document_type', type.value)">
											{{ type.label }}
										</a>
									</li>
								</ul>
							</Transition>
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-docnum">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Núm Documento
								</span>
							</label>
							<input
								id="user-docnum"
								v-model="form.document_number"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>

						<div class="form-control">
							<label class="label pb-1" for="user-phone">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Teléfono
								</span>
							</label>
							<input
								id="user-phone"
								v-model="form.phone"
								type="tel"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control relative">
							<label class="label pb-1" id="label-role">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Rol
								</span>
							</label>
							<div
								tabindex="0"
								role="button"
								aria-labelledby="label-role"
								class="input input-bordered flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none hover:bg-[#FFFFFF]/10 focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50"
								@click="toggleDropdown('role')"
								@keydown.enter.prevent="toggleDropdown('role')"
								@keydown.space.prevent="toggleDropdown('role')"
								@blur="closeDropdownDelayed('role')">
								<span>{{ form.role === 'ADMIN' ? 'Administrador' : 'Usuario' }}</span>
								<ChevronDown class="h-4 w-4 opacity-50" />
							</div>
							<Transition
								enter-active-class="transition duration-100 ease-out"
								enter-from-class="transform scale-95 opacity-0"
								enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-75 ease-in"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-95 opacity-0">
								<ul
									v-show="openDropdown === 'role'"
									class="absolute top-[72px] left-0 z-50 w-full rounded-xl border border-[#FFFFFF]/10 bg-[#12110D] p-1.5 shadow-2xl">
									<li
										v-for="role in [
											{ value: 'ADMIN', label: 'Administrador' },
											{ value: 'USER', label: 'Usuario' },
										]"
										:key="role.value">
										<a
											class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
											:class="{
												'bg-[#FFFF00]/10 font-bold text-[#FFFF00]': form.role === role.value,
											}"
											@click="selectOption('role', role.value)">
											{{ role.label }}
										</a>
									</li>
								</ul>
							</Transition>
						</div>

						<div class="form-control md:col-span-2">
							<label class="label pb-1" for="user-address">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Dirección
								</span>
							</label>
							<input
								id="user-address"
								v-model="form.address"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>

						<div class="form-control">
							<label class="label pb-1" for="user-city">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									Ciudad
								</span>
							</label>
							<input
								id="user-city"
								v-model="form.city"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-country">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									País
								</span>
							</label>
							<input
								id="user-country"
								v-model="form.country"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
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
							:disabled="isSaving"
							@click.prevent="saveUser">
							<span v-if="isSaving" class="loading loading-spinner"></span>
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
		ChevronDown,
	} from 'lucide-vue-next'

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
		surname: '',
		email: '',
		password: '',
		document_type: 'DNI',
		document_number: '',
		phone: '',
		address: '',
		city: '',
		country: '',
		role: 'USER',
	})

	// --- Custom Dropdown Logic ---
	const openDropdown = ref<string | null>(null)

	const toggleDropdown = (name: string) => {
		openDropdown.value = openDropdown.value === name ? null : name
	}

	const closeDropdownDelayed = (name: string) => {
		setTimeout(() => {
			if (openDropdown.value === name) openDropdown.value = null
		}, 150)
	}

	const selectOption = (field: 'document_type' | 'role', value: string) => {
		form[field] = value
		openDropdown.value = null
	}

	// --- Acciones CRUD simuladas ---
	const openUserModal = (user: UserData | null) => {
		editingUser.value = user
		if (user) {
			form.name = user.name || ''
			form.surname = user.surname || ''
			form.email = user.email || ''
			form.password = ''
			form.document_type = user.document_type || 'DNI'
			form.document_number = user.document_number || ''
			form.phone = user.phone || ''
			form.address = user.address || ''
			form.city = user.city || ''
			form.country = user.country || ''
			form.role = user.role || 'USER'
		} else {
			form.name = ''
			form.surname = ''
			form.email = ''
			form.password = ''
			form.document_type = 'DNI'
			form.document_number = ''
			form.phone = ''
			form.address = ''
			form.city = ''
			form.country = ''
			form.role = 'USER'
		}
		userModal.value?.showModal()
	}

	const isSaving = ref(false)

	const saveUser = async () => {
		isSaving.value = true
		try {
			if (editingUser.value) {
				await $fetch(`/api/users/${editingUser.value.user_id}`, {
					method: 'PUT',
					body: form,
				})
				showToast('Usuario actualizado exitosamente', 'success')
			} else {
				await $fetch(`/api/users`, {
					method: 'POST',
					body: form,
				})
				showToast('Usuario creado exitosamente', 'success')
			}
			await refresh()
			userModal.value?.close()
		} catch (error: any) {
			console.error('Error saving user:', error)
			showToast(error.data?.statusMessage || 'Error al guardar el usuario', 'error')
		} finally {
			isSaving.value = false
		}
	}

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

	const confirmDelete = (user: UserData) => {
		userToDelete.value = user
		deleteModal.value?.showModal()
	}

	const executeDelete = async () => {
		if (userToDelete.value) {
			try {
				await $fetch(`/api/users/${userToDelete.value.user_id}`, {
					method: 'DELETE',
				})
				userToDelete.value = null
				await refresh()
				showToast('Usuario eliminado exitosamente', 'success')
			} catch (error: any) {
				console.error('Error deleting user:', error)
				showToast(error.data?.statusMessage || 'Error al eliminar el usuario', 'error')
			}
		}
		deleteModal.value?.close()
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
