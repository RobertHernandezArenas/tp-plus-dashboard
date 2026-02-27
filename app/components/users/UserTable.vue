<template>
	<div
		class="relative overflow-hidden rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/40 p-1 shadow-2xl backdrop-blur-2xl">
		<!-- Glow interno del contenedor -->
		<div
			class="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-[#FFFF00]/5 to-transparent"></div>

		<div
			class="relative z-10 h-[55vh] max-h-[600px] min-h-[400px] w-full overflow-x-auto overflow-y-auto sm:h-[60vh] lg:h-[calc(100vh-320px)]">
			<table class="table w-full border-collapse">
				<thead class="sticky top-0 z-20 bg-[#000000]/80 backdrop-blur-xl">
					<tr
						class="border-b border-[#FFFFFF]/10 text-xs font-black tracking-wider text-[#FFFFFF]/50 uppercase">
						<th class="px-6 py-5">Usuario</th>
						<th class="px-6 py-5">Rol</th>
						<th class="px-6 py-5">Estado</th>
						<th class="px-6 py-5 text-right">Acciones</th>
					</tr>
				</thead>
				<tbody v-if="pending">
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
						v-for="user in users"
						:key="user.user_id"
						class="cursor-pointer border-b border-[#FFFFFF]/5 transition-colors hover:bg-[#FFFFFF]/10"
						@click="$emit('edit', user)">
						<td class="px-6 py-4">
							<div class="flex items-center gap-4">
								<div class="avatar">
									<div
										class="ring-offset-base-100 w-12 rounded-full ring ring-[#FFFFFF]/10 ring-offset-2">
										<img
											:src="user.avatar || ''"
											alt="Avatar"
											class="object-cover brightness-110 saturate-0" />
									</div>
								</div>
								<div>
									<div class="text-base font-bold text-[#FFFFFF]">
										{{ user.name }} {{ user.surname }}
									</div>
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
								class="badge badge-lg gap-1.5 rounded-full border text-xs font-black tracking-wide uppercase shadow-sm"
								:class="
									user.status === 'ON'
										? 'border-[#FFFF00]/30 bg-[#FFFF00]/10 text-[#FFFF00]'
										: 'border-[#FFFFFF]/10 bg-[#FFFFFF]/5 text-[#FFFFFF]/50'
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
								<div
									class="tooltip tooltip-left"
									:data-tip="user.status === 'ON' ? 'Desactivar Usuario' : 'Activar Usuario'">
									<button
										class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
										:aria-label="user.status === 'ON' ? 'Desactivar Usuario' : 'Activar Usuario'"
										@click.stop="$emit('toggle-status', user)">
										<ToggleRight v-if="user.status === 'ON'" class="h-5 w-5 text-[#FFFF00]" />
										<ToggleLeft v-else class="h-5 w-5 text-[#FFFFFF]/40" />
									</button>
								</div>

								<!-- Editar -->
								<div class="tooltip tooltip-left" data-tip="Editar Usuario">
									<button
										class="btn btn-circle btn-sm btn-ghost hover:bg-[#FFFFFF]/10"
										aria-label="Editar Usuario"
										@click.stop="$emit('edit', user)">
										<Pencil class="h-4 w-4 text-[#FFFFFF]/70" />
									</button>
								</div>

								<!-- Eliminar -->
								<div class="tooltip tooltip-left tooltip-error" data-tip="Eliminar Usuario">
									<button
										class="btn btn-circle btn-sm btn-ghost hover:bg-[#ff0000]/20"
										aria-label="Eliminar Usuario"
										@click.stop="$emit('delete', user)">
										<Trash2 class="h-4 w-4 text-[#ff0000]/80" />
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Empty State -->
			<div
				v-if="!pending && users.length === 0"
				class="flex flex-col items-center justify-center py-16 text-center">
				<div class="mb-4 rounded-full bg-[#FFFFFF]/5 p-6 ring-1 ring-[#FFFFFF]/10">
					<Users class="h-12 w-12 text-[#FFFFFF]/30" />
				</div>
				<h3 class="text-xl font-bold text-[#FFFFFF]">No se encontraron usuarios</h3>
				<p class="mt-2 text-sm text-[#FFFFFF]/50">Intenta buscar con otros términos o crea uno nuevo.</p>
			</div>
		</div>

		<!-- Pagination Footer -->
		<UiAppPagination
			v-if="!pending && totalItems > itemsPerPage"
			:total-items="totalItems"
			:items-per-page="itemsPerPage"
			:model-value="currentPage"
			@update:model-value="$emit('update:currentPage', $event)" />
	</div>
</template>

<script setup lang="ts">
	import { ShieldCheck, User, ToggleLeft, ToggleRight, Pencil, Trash2, Users } from 'lucide-vue-next'

	defineProps<{
		users: any[]
		pending: boolean
		totalItems: number
		itemsPerPage: number
		currentPage: number
	}>()

	defineEmits(['edit', 'delete', 'toggle-status', 'update:currentPage'])
</script>
