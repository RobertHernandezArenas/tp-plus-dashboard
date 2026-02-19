<template>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-4" v-model="isDrawerOpen" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<nav class="navbar bg-base-300 w-full">
				<div class="flex-none">
					<label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<Transition name="swap" mode="out-in">
							<PanelLeftClose v-if="isDrawerOpen" class="size-5" />
							<PanelLeftOpen v-else class="size-5" />
						</Transition>
					</label>
				</div>
				<div class="flex-1"></div>
				<div class="flex-none gap-2">
					<select v-model="locale" class="select select-bordered select-sm">
						<option v-for="l in locales" :key="l.code" :value="l.code">
							{{ l.name }}
						</option>
					</select>
					<button class="btn btn-ghost btn-circle" @click="toggleTheme">
						<Sun v-if="theme === 'dark'" class="size-5" />
						<Moon v-else class="size-5" />
					</button>
				</div>
			</nav>
			<div>
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
							:data-tip="t('nav.dashboard')">
							<LayoutDashboard class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.dashboard') }}</span>
						</button>
					</li>
					<li>
						<NuxtLink
							to="/usuarios"
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							:data-tip="t('nav.users')">
							<UsersRound class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.users') }}</span>
						</NuxtLink>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							:data-tip="t('nav.clients')">
							<Building2 class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.clients') }}</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							:data-tip="t('nav.drivers')">
							<IdCard class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.drivers') }}</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							:data-tip="t('nav.fleet')">
							<Van class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.fleet') }}</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-[16px]"
							:data-tip="t('nav.routes')">
							<Waypoints class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.routes') }}</span>
						</button>
					</li>
					<li>
						<button
							class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
							:data-tip="t('nav.settings')">
							<SlidersHorizontal class="size-5" />
							<span class="is-drawer-close:hidden">{{ t('nav.settings') }}</span>
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
		Moon,
		Sun,
	} from 'lucide-vue-next'

	const { t, locale, locales } = useI18n()
	const isDrawerOpen = ref(false)
	const theme = ref('light')

	const route = useRoute()

	onMounted(() => {
		theme.value = document.documentElement.getAttribute('data-theme') || 'light'
	})

	const toggleTheme = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light'
		document.documentElement.setAttribute('data-theme', theme.value)
	}
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
