<template>
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
						@click.prevent="closeModal">
						Cancelar
					</button>
					<button
						class="btn h-12 flex-1 rounded-xl border-none bg-[#ff0000] font-bold text-[#FFFFFF] shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:bg-[#cc0000]"
						@click.prevent="executeDelete">
						<span v-if="isDeleting" class="loading loading-spinner"></span>
						Sí, Eliminar
					</button>
				</div>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop bg-[#000000]/80 backdrop-blur-md">
			<button>close</button>
		</form>
	</dialog>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { AlertTriangle } from 'lucide-vue-next'

	const deleteModal = ref<HTMLDialogElement | null>(null)
	const userToDelete = ref<any | null>(null)
	const isDeleting = ref(false)

	const emit = defineEmits(['refresh', 'toast'])

	const showModal = (user: any) => {
		userToDelete.value = user
		deleteModal.value?.showModal()
	}

	const closeModal = () => {
		deleteModal.value?.close()
	}

	const executeDelete = async () => {
		if (!userToDelete.value) return
		isDeleting.value = true

		try {
			await $fetch(`/api/users/${userToDelete.value.user_id}`, {
				method: 'DELETE',
			})
			userToDelete.value = null
			emit('refresh')
			emit('toast', { message: 'Usuario eliminado exitosamente', type: 'success' })
		} catch (error: any) {
			console.error('Error deleting user:', error)
			emit('toast', {
				message: error.data?.statusMessage || 'Error al eliminar el usuario',
				type: 'error',
			})
		} finally {
			isDeleting.value = false
			closeModal()
		}
	}

	defineExpose({
		showModal,
	})
</script>
