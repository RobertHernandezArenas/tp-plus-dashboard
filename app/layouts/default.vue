<template>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<nav class="navbar bg-base-300 w-full">
				<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-linejoin="round"
						stroke-linecap="round"
						stroke-width="2"
						fill="none"
						stroke="currentColor"
						class="my-1.5 inline-block size-4">
						<path
							d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
						<path d="M9 4v16"></path>
						<path d="M14 10l2 2l-2 2"></path>
					</svg>
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
				<div class="flex w-full items-center justify-start gap-2 bg-[#0d0d05] p-4">
					<NuxtImg src="/images/tp-dash.svg" class="w-8" alt="Logo" />
					<span class="is-drawer-close:hidden text-lg font-bold text-white">TRANSPALLET+</span>
				</div>

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
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							data-tip="Usuarios">
							<UsersRound class="size-5" />
							<span class="is-drawer-close:hidden">Usuarios</span>
						</button>
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
							<IdCard  class="size-5" />
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
							data-tip="Configuraciones">
							<SlidersHorizontal class="size-5" />
							<span class="is-drawer-close:hidden">Configuraciones</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { UsersRound, LayoutDashboard, SlidersHorizontal, Waypoints, Van, IdCard, Building2 } from 'lucide-vue-next'
</script>
