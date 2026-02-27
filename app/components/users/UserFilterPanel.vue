<template>
	<transition name="expand">
		<div
			v-show="filtersStore.showFilters"
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
							@click="filtersStore.filterRole = r"
							class="rounded-xl px-4 py-2 text-xs font-bold transition-all focus:ring-2 focus:ring-[#FFFF00] focus:outline-none"
							:aria-pressed="filtersStore.filterRole === r"
							:class="
								filtersStore.filterRole === r
									? 'bg-[#FFFF00] text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.2)]'
									: 'bg-[#FFFFFF]/5 text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'
							">
							{{ r === 'all' ? 'Todos' : r === 'ADMIN' ? 'Administrador' : 'Usuario' }}
						</button>
					</div>
				</div>

				<!-- ESTADO -->
				<div>
					<h3 class="mb-3 text-[10px] font-black tracking-widest text-[#FFFFFF]/50 uppercase">Estado</h3>
					<div class="flex flex-wrap gap-2">
						<button
							v-for="s in ['all', 'ON', 'OFF']"
							:key="s"
							@click="filtersStore.filterStatus = s"
							class="rounded-xl px-4 py-2 text-xs font-bold transition-all focus:ring-2 focus:ring-[#FFFF00] focus:outline-none"
							:aria-pressed="filtersStore.filterStatus === s"
							:class="
								filtersStore.filterStatus === s
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
							@click="filtersStore.filterDocType = d"
							class="rounded-xl px-4 py-2 text-xs font-bold transition-all focus:ring-2 focus:ring-[#FFFF00] focus:outline-none"
							:aria-pressed="filtersStore.filterDocType === d"
							:class="
								filtersStore.filterDocType === d
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
</template>

<script setup lang="ts">
	import { useUsersFilterStore } from '~/stores/useUsersFilterStore'

	const filtersStore = useUsersFilterStore()
</script>

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
