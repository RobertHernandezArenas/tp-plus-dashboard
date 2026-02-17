<template>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-4" v-model="isDrawerOpen" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<nav class="navbar bg-base-300 w-full">
				<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<Transition name="swap" mode="out-in">
						<PanelLeftClose v-if="isDrawerOpen" class="size-5" />
						<PanelLeftOpen v-else class="size-5" />
					</Transition>
				</label>
				<!-- navbar title -->
			</nav>
			<div class="p-4">
				<slot />
			</div>
		</div>

		<div class="drawer-side is-drawer-close:overflow-visible">
			<label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
			<div
				class="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start">
				<!-- LOGO SPACE -->
				<NuxtLink to="/" class="flex w-full items-center justify-start gap-2 bg-[#0d0d05] p-4">
					<NuxtImg src="/images/tp-dash.svg" class="w-8" alt="Logo" />
					<span class="is-drawer-close:hidden text-lg font-bold text-white">TRANSPALLET+</span>
				</NuxtLink>

				<ul class="menu w-full grow bg-[#0d0d05] text-[#bababa]">
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Vista General">
							<LayoutDashboard class="size-5" />
							<span class="is-drawer-close:hidden">Vista General</span>
						</button>
					</li>
					<li>
						<NuxtLink
							to="/usuarios"
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Usuarios">
							<UsersRound class="size-5" />
							<span class="is-drawer-close:hidden">Usuarios</span>
						</NuxtLink>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Clientes">
							<Building2 class="size-5" />
							<span class="is-drawer-close:hidden">Clientes</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Conductores">
							<IdCard class="size-5" />
							<span class="is-drawer-close:hidden">Conductores</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Flota">
							<Van class="size-5" />
							<span class="is-drawer-close:hidden">Flota</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Rutas">
							<Waypoints class="size-5" />
							<span class="is-drawer-close:hidden">Rutas</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
							data-tip="Configuración">
							<SlidersHorizontal class="size-5" />
							<span class="is-drawer-close:hidden">Configuración</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {
		UsersRound,
		LayoutDashboard,
		SlidersHorizontal,
		Waypoints,
		Van,
		IdCard,
		Building2,
		PanelLeftClose,
		PanelLeftOpen,
} from 'lucide-vue-next'
  
const isDrawerOpen = ref(false)

const route = useRoute()
  console.log(route)
</script>

<style scoped>
	.swap-enter-active,
	.swap-leave-active {
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.swap-enter-from,
	.swap-leave-to {
		opacity: 0;
		transform: scale(0.8) rotate(-15deg);
	}
</style>
