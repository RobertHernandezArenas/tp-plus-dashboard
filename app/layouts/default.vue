<template>
	<div
		class="drawer lg:drawer-open relative min-h-screen overflow-hidden bg-[#12110D] font-sans text-[#FFFFFF]">
		<!-- Elementos Decorativos de Fondo (Globales) -->
		<div
			class="animate-blob pointer-events-none fixed top-[-10%] left-[-5%] z-0 h-[600px] w-[600px] rounded-full bg-[#FFFF00]/5 blur-[120px] filter"></div>
		<div
			class="animate-blob animation-delay-2000 pointer-events-none fixed top-[40%] right-[-10%] z-0 h-[700px] w-[700px] rounded-full bg-[#FFFFFF]/5 blur-[150px] filter"></div>

		<input id="my-drawer-4" v-model="isDrawerOpen" type="checkbox" class="drawer-toggle" />

		<div class="drawer-content relative z-10 flex min-h-screen flex-col">
			<!-- NAVBAR (Glassmorphism) -->
			<nav
				class="sticky top-0 z-50 w-full border-b border-[#FFFFFF]/10 bg-[#000000]/60 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
				<div class="flex w-full items-center">
					<div class="flex-none lg:hidden">
						<label
							for="my-drawer-4"
							aria-label="open sidebar"
							class="btn btn-square btn-ghost text-[#FFFFFF] hover:bg-[#FFFFFF]/10 hover:text-[#FFFF00]">
							<Transition name="swap" mode="out-in">
								<PanelLeftClose v-if="isDrawerOpen" class="h-6 w-6" />
								<PanelLeftOpen v-else class="h-6 w-6" />
							</Transition>
						</label>
					</div>

					<div class="mx-2 flex-1 px-2">
						<!-- Breadcrumb / Titulo en top bar (Opcional, futuro) -->
					</div>

					<div class="flex-none gap-4">
						<!-- Selector de Idioma estético -->
						<div class="group relative">
							<select
								v-model="locale"
								class="cursor-pointer appearance-none rounded-xl border border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 py-2 pr-8 text-sm font-bold text-[#FFFFFF] transition-colors outline-none hover:bg-[#FFFFFF]/10 focus:border-[#FFFF00]/50 focus:ring-1 focus:ring-[#FFFF00]/50">
								<option
									v-for="l in locales"
									:key="l.code"
									:value="l.code"
									class="bg-[#12110D] text-[#FFFFFF]">
									{{ l.name }}
								</option>
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#FFFFFF]/50 transition-colors group-hover:text-[#FFFF00]">
								<svg
									class="h-4 w-4 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path
										d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>

						<!-- Perfil / Notificaciones -->
						<button
							class="btn btn-ghost btn-circle avatar group border border-[#FFFFFF]/10 transition-all hover:border-[#FFFF00]/50 hover:bg-[#FFFFFF]/5">
							<div class="relative w-9 overflow-hidden rounded-full">
								<div
									class="absolute inset-0 bg-[#FFFF00]/20 opacity-0 mix-blend-overlay transition-opacity group-hover:opacity-100"></div>
								<img
									src="https://i.pravatar.cc/150?u=1"
									alt="Profile"
									class="h-full w-full object-cover brightness-110 saturate-0 transition-all group-hover:saturate-100" />
							</div>
						</button>
					</div>
				</div>
			</nav>

			<!-- Contenido de la Página -->
			<main class="w-full flex-1 overflow-y-auto">
				<slot />
			</main>
		</div>

		<!-- SIDEBAR (Glassmorphism) -->
		<div class="drawer-side z-50">
			<label
				for="my-drawer-4"
				aria-label="close sidebar"
				class="drawer-overlay bg-[#000000]/80 backdrop-blur-sm lg:hidden"></label>
			<aside
				class="flex h-full w-72 flex-col items-start border-r border-[#FFFFFF]/10 bg-[#000000]/60 shadow-[4px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 lg:w-72">
				<!-- Glow lateral en sidebar -->
				<div
					class="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-[#FFFF00]/5 to-transparent"></div>

				<!-- LOGO SPACE -->
				<div
					class="relative z-10 flex h-[73px] w-full items-center justify-start gap-3 border-b border-[#FFFFFF]/10 p-6">
					<div class="group relative">
						<div
							class="absolute inset-0 rounded-full bg-[#FFFF00]/20 blur-md transition-all group-hover:blur-lg"></div>
						<NuxtLink to="/">
							<NuxtImg src="/images/tp-dash.svg" class="relative w-9 drop-shadow-lg" alt="Logo" />
						</NuxtLink>
					</div>
					<NuxtLink to="/">
						<span class="text-xl font-black tracking-tighter text-[#FFFFFF] drop-shadow-sm">
							TRANSPALLET+
						</span>
					</NuxtLink>
				</div>

				<!-- Navegación -->
				<div class="relative z-10 w-full grow overflow-y-auto px-4 py-6">
					<p class="mb-4 px-4 text-[10px] font-black tracking-widest text-[#FFFFFF]/40 uppercase">
						Menú Principal
					</p>

					<ul class="flex w-full flex-col gap-2">
						<li v-for="item in navItems" :key="item.to || item.label">
							<NuxtLink
								v-if="item.to"
								:to="item.to"
								class="group flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300"
								:class="
									route.path === item.to
										? 'border border-[#FFFF00]/20 bg-[#FFFF00]/10 text-[#FFFF00] shadow-[inset_0_0_10px_rgba(255,255,0,0.1)]'
										: 'text-[#FFFFFF]/60 hover:bg-[#FFFFFF]/5 hover:text-[#FFFFFF]'
								">
								<component
									:is="item.icon"
									class="h-5 w-5 transition-transform group-hover:scale-110"
									:class="
										route.path === item.to
											? 'text-[#FFFF00] drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]'
											: ''
									" />
								<span class="text-sm font-bold tracking-wide">{{ t(item.label) }}</span>

								<!-- Indicador activo (borde izquierdo brillante) -->
								<div
									v-if="route.path === item.to"
									class="absolute left-0 h-8 w-1.5 rounded-r-full bg-[#FFFF00] shadow-[0_0_10px_#FFFF00]"></div>
							</NuxtLink>

							<button
								v-else
								class="group flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left text-[#FFFFFF]/60 transition-all duration-300 hover:bg-[#FFFFFF]/5 hover:text-[#FFFFFF]">
								<component
									:is="item.icon"
									class="h-5 w-5 transition-transform group-hover:scale-110" />
								<span class="text-sm font-bold tracking-wide">{{ t(item.label) }}</span>
							</button>
						</li>
					</ul>
				</div>

				<!-- Footer del Sidebar -->
				<div class="relative z-10 flex w-full flex-col gap-4 border-t border-[#FFFFFF]/10 p-6">
					<button
						class="group flex w-full items-center justify-center gap-3 rounded-2xl border border-[#ff0000]/20 bg-[#ff0000]/10 px-4 py-3 font-bold text-[#ff0000] transition-all hover:bg-[#ff0000] hover:text-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
						<LogOut class="h-5 w-5 transition-transform group-hover:-translate-x-1" />
						<span class="text-sm">Cerrar Sesión</span>
					</button>
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useI18n } from 'vue-i18n'
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
		LogOut,
	} from 'lucide-vue-next'

	const { t, locale } = useI18n()
	const localeCookie = useCookie('i18n_redirected')
	const route = useRoute()

	watch(locale, newLocale => {
		localeCookie.value = newLocale
	})

	const locales = [
		{ code: 'es', name: 'Español' },
		{ code: 'en', name: 'English' },
		{ code: 'pl', name: 'Polski' },
	]
	const isDrawerOpen = ref(false)

	const navItems = [
		{ to: '/overview', label: 'nav.dashboard', icon: LayoutDashboard },
		{ to: '/usuarios', label: 'nav.users', icon: UsersRound },
		{ to: null, label: 'nav.clients', icon: Building2 },
		{ to: null, label: 'nav.drivers', icon: IdCard },
		{ to: null, label: 'nav.fleet', icon: Van },
		{ to: null, label: 'nav.routes', icon: Waypoints },
		{ to: null, label: 'nav.settings', icon: SlidersHorizontal },
	]
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

	/* Scrollbar custom para el sidebar */
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 0, 0.5);
	}
</style>
