<template>
	<div class="flex items-center justify-between border-t border-[#FFFFFF]/10 px-6 py-4">
		<div class="flex flex-1 items-center justify-between sm:hidden">
			<button
				@click="prevPage"
				:disabled="currentPage <= 1"
				class="btn btn-sm btn-ghost border-[#FFFFFF]/10 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:border-[#FFFFFF]/10 disabled:text-[#FFFFFF] disabled:opacity-50 disabled:hover:bg-transparent">
				Anterior
			</button>
			<button
				@click="nextPage"
				:disabled="currentPage >= totalPages"
				class="btn btn-sm btn-ghost border-[#FFFFFF]/10 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:border-[#FFFFFF]/10 disabled:text-[#FFFFFF] disabled:opacity-50 disabled:hover:bg-transparent">
				Siguiente
			</button>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-[#FFFFFF]/50">
					Mostrando
					<span class="font-medium text-[#FFFFFF]">{{ startItem }}</span>
					a
					<span class="font-medium text-[#FFFFFF]">{{ endItem }}</span>
					de
					<span class="font-medium text-[#FFFFFF]">{{ totalItems }}</span>
					resultados
				</p>
			</div>
			<div>
				<div class="join">
					<button
						@click="prevPage"
						:disabled="currentPage <= 1"
						class="btn btn-sm join-item border-[#FFFFFF]/10 bg-[#FFFFFF]/5 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 focus:outline-[#FFFF00] disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-[#FFFFFF] disabled:opacity-50 disabled:hover:bg-[#FFFFFF]/5">
						<ChevronLeft class="h-4 w-4" />
					</button>

					<button
						v-for="page in pages"
						:key="page"
						@click="setPage(page)"
						class="btn btn-sm join-item border-[#FFFFFF]/10"
						:class="
							currentPage === page
								? 'bg-[#FFFF00] text-[#000000] hover:bg-[#FFFF00]/80'
								: 'bg-[#FFFFFF]/5 text-[#FFFFFF] hover:bg-[#FFFFFF]/10'
						">
						{{ page }}
					</button>

					<button
						@click="nextPage"
						:disabled="currentPage >= totalPages"
						class="btn btn-sm join-item border-[#FFFFFF]/10 bg-[#FFFFFF]/5 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 focus:outline-[#FFFF00] disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-[#FFFFFF] disabled:opacity-50 disabled:hover:bg-[#FFFFFF]/5">
						<ChevronRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

	const props = defineProps<{
		totalItems: number
		itemsPerPage: number
		modelValue: number // currentPage
	}>()

	const emit = defineEmits(['update:modelValue'])

	const currentPage = computed({
		get: () => props.modelValue,
		set: val => emit('update:modelValue', val),
	})

	const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

	const startItem = computed(() => {
		if (props.totalItems === 0) return 0
		return (currentPage.value - 1) * props.itemsPerPage + 1
	})

	const endItem = computed(() => {
		const end = currentPage.value * props.itemsPerPage
		return end > props.totalItems ? props.totalItems : end
	})

	// Calculate which page numbers to show (simple approach: show all if <= 7, otherwise just the first, last, and neighbors)
	const pages = computed(() => {
		const total = totalPages.value
		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1)
		}

		const current = currentPage.value

		// Complex logic for ellipsis can be added here if needed, keeping it simple for now (up to ~7 visible pages)
		const visiblePages = new Set([1, total, current, current - 1, current + 1])

		// Clean up limits
		if (current === 1 || current === 2) {
			visiblePages.add(3).add(4)
		}
		if (current === total || current === total - 1) {
			visiblePages.add(total - 2).add(total - 3)
		}

		const sortedPages = Array.from(visiblePages)
			.filter(p => p >= 1 && p <= total)
			.sort((a, b) => a - b)

		return sortedPages
	})

	const prevPage = () => {
		if (currentPage.value > 1) {
			currentPage.value--
		}
	}

	const nextPage = () => {
		if (currentPage.value < totalPages.value) {
			currentPage.value++
		}
	}

	const setPage = (page: number) => {
		currentPage.value = page
	}
</script>
