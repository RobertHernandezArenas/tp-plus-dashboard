<template>
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
				@click="$emit('toggle-filters')"
				class="btn btn-ghost relative h-12 rounded-2xl border border-[#FFFFFF]/10 px-4 font-semibold transition-colors"
				:class="
					filtersActive
						? 'border-[#FFFF00]/30 bg-[#FFFF00]/10 text-[#FFFF00] hover:bg-[#FFFF00]/20'
						: 'text-[#FFFFFF] hover:bg-[#FFFFFF]/10'
				">
				<Filter class="mr-2 h-5 w-5" />
				Filtros
				<!-- Punto indicador -->
				<span v-if="filtersActive" class="absolute -top-1 -right-1 flex h-3 w-3">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFFF00] opacity-75"></span>
					<span class="relative inline-flex h-3 w-3 rounded-full bg-[#FFFF00]"></span>
				</span>
			</button>
			<button
				@click="$emit('create')"
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
</template>

<script setup lang="ts">
	import { Filter, Plus, Search } from 'lucide-vue-next'

	const searchQuery = defineModel<string>()

	defineProps<{
		filtersActive?: boolean
	}>()

	defineEmits(['create', 'toggle-filters'])
</script>
