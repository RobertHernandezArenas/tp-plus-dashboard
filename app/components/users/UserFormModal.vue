<template>
	<dialog ref="userModal" class="modal">
		<div
			class="modal-box relative w-11/12 max-w-4xl rounded-[2.5rem] border border-[#FFFFFF]/10 bg-[#000000]/80 p-8 text-[#FFFFFF] shadow-2xl backdrop-blur-3xl">
			<div
				class="pointer-events-none absolute inset-0 z-0 rounded-[2.5rem] bg-linear-to-b from-[#FFFF00]/10 to-transparent"></div>

			<button
				type="button"
				aria-label="Cerrar modal de usuario"
				class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4 z-20 text-xl text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
				@click="closeModal">
				✕
			</button>

			<div class="relative z-10">
				<h3 class="mb-6 text-2xl font-black tracking-tight">
					{{ editingUser ? $t('users.form.editTitle') : $t('users.form.createTitle') }}
				</h3>

				<form @submit.prevent="saveUser">
					<div class="grid gap-4 md:grid-cols-2">
						<div class="form-control">
							<label class="label pb-1" for="user-name">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.name') }}
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
									{{ $t('users.form.surname') }}
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
									{{ $t('users.form.email') }}
								</span>
							</label>
							<input
								id="user-email"
								v-model="form.email"
								type="email"
								:disabled="!isAdmin"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50 disabled:cursor-not-allowed disabled:opacity-50" />
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-password">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.password') }}
								</span>
							</label>
							<input
								id="user-password"
								v-model="form.password"
								type="password"
								autocomplete="new-password"
								:placeholder="
									editingUser
										? $t('users.form.passwordPlaceholderEdit')
										: $t('users.form.passwordPlaceholderNew')
								"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>

						<div class="form-control dropdown w-full">
							<label class="label pb-1" id="label-doctype">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.documentType') }}
								</span>
							</label>
							<div
								tabindex="0"
								role="button"
								class="input input-bordered flex h-11 w-full items-center justify-between rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] focus:border-[#FFFF00]/50 focus:ring-1 focus:ring-[#FFFF00]/50 focus:outline-none"
								aria-labelledby="label-doctype">
								<span class="font-medium">
									{{ form.document_type === 'PASSPORT' ? 'Pasaporte' : form.document_type }}
								</span>
								<ChevronDown class="h-4 w-4 opacity-50 transition-transform" />
							</div>
							<ul
								tabindex="0"
								class="menu dropdown-content z-100 mt-1 w-full rounded-xl border border-[#FFFFFF]/10 bg-[#000000] p-2 text-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.9)]">
								<li
									v-for="type in [
										{ value: 'DNI', label: 'DNI' },
										{ value: 'PASSPORT', label: 'Pasaporte' },
										{ value: 'NIE', label: 'NIE' },
									]"
									:key="type.value">
									<a
										class="rounded-lg px-4 py-2.5 font-medium transition-colors hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]"
										:class="
											form.document_type === type.value
												? 'bg-[#FFFF00]/10 text-[#FFFF00]'
												: 'text-[#FFFFFF]/70'
										"
										@click="selectOption('document_type', type.value)">
										{{ type.label }}
									</a>
								</li>
							</ul>
						</div>
						<div class="form-control">
							<label class="label pb-1" for="user-docnum">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.documentNumber') }}
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
									{{ $t('users.form.phone') }}
								</span>
							</label>
							<input
								id="user-phone"
								v-model="form.phone"
								type="tel"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
						<div class="form-control dropdown w-full">
							<label class="label pb-1" id="label-role">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.role') }}
								</span>
							</label>
							<div
								tabindex="0"
								role="button"
								class="input input-bordered flex h-11 w-full items-center justify-between rounded-xl border-[#FFFFFF]/10 px-4 text-[#FFFFFF]"
								:class="
									!isAdmin
										? 'cursor-not-allowed bg-[#FFFFFF]/5 opacity-50'
										: 'bg-[#FFFFFF]/5 focus:border-[#FFFF00]/50 focus:ring-1 focus:ring-[#FFFF00]/50 focus:outline-none'
								"
								@click.prevent="!isAdmin">
								<span class="font-medium">
									{{ $t('users.constants.roles.' + form.role) }}
								</span>
								<ChevronDown class="h-4 w-4 opacity-50 transition-transform" />
							</div>
							<ul
								tabindex="0"
								class="menu dropdown-content z-100 mt-1 w-full rounded-xl border border-[#FFFFFF]/10 bg-[#000000] p-2 text-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.9)]">
								<li
									v-for="role in [
										{ label: $t('users.constants.roles.USER'), value: 'USER' },
										{ label: $t('users.constants.roles.ADMIN'), value: 'ADMIN' },
									]"
									:key="role.value">
									<a
										class="rounded-lg py-2.5 font-bold transition-all"
										v-show="isAdmin"
										:class="
											form.role === role.value
												? 'bg-[#FFFF00]/10 text-[#FFFF00]'
												: 'text-[#FFFFFF]/70'
										"
										@click="selectOption('role', role.value)">
										{{ role.label }}
									</a>
								</li>
							</ul>
						</div>

						<div class="form-control md:col-span-2">
							<label class="label pb-1" for="user-address">
								<span class="label-text text-xs font-bold tracking-wider text-[#FFFFFF]/70 uppercase">
									{{ $t('users.form.address') }}
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
									{{ $t('users.form.city') }}
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
									{{ $t('users.form.country') }}
								</span>
							</label>
							<input
								id="user-country"
								v-model="form.country"
								type="text"
								class="input input-bordered h-11 w-full rounded-xl border-[#FFFFFF]/10 bg-[#FFFFFF]/5 px-4 text-[#FFFFFF] outline-none focus:border-[#FFFF00]/50 focus:bg-[#000000] focus:ring-1 focus:ring-[#FFFF00]/50" />
						</div>
					</div>

					<div class="mt-8 flex justify-end gap-3">
						<button
							type="button"
							class="btn btn-ghost h-12 rounded-xl border border-[#FFFFFF]/10 px-8 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
							@click.prevent="closeModal">
							{{ $t('common.cancel') }}
						</button>
						<button
							type="submit"
							class="btn h-12 rounded-xl border-none bg-[#FFFF00] px-8 font-bold text-[#000000] shadow-[0_0_15px_rgba(255,255,0,0.15)] hover:bg-[#FFFF00]/80"
							:disabled="isSaving">
							<span v-if="isSaving" class="loading loading-spinner"></span>
							{{ editingUser ? 'Guardar Cambios' : 'Crear Usuario' }}
						</button>
					</div>
				</form>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop bg-[#000000]/60 backdrop-blur-sm">
			<button>close</button>
		</form>
	</dialog>
</template>

<script setup lang="ts">
	import { ref, reactive, computed } from 'vue'
	import { ChevronDown } from 'lucide-vue-next'
	import { useAuthStore } from '~/stores/auth'

	const authStore = useAuthStore()
	const isAdmin = computed(() => authStore.user?.role === 'ADMIN')

	const userModal = ref<HTMLDialogElement | null>(null)
	const editingUser = ref<any | null>(null)
	const isSaving = ref(false)

	const emit = defineEmits(['refresh', 'toast'])

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

	const selectOption = (field: 'document_type' | 'role', value: string) => {
		form[field] = value
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}

	const showModal = (user: any | null) => {
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

	const closeModal = () => {
		userModal.value?.close()
	}

	const saveUser = async () => {
		isSaving.value = true
		try {
			if (editingUser.value) {
				await $fetch(`/api/users/${editingUser.value.user_id}`, {
					method: 'PUT',
					body: form,
				})
				emit('toast', { message: 'Usuario actualizado exitosamente', type: 'success' })
			} else {
				await $fetch(`/api/users`, {
					method: 'POST',
					body: form,
				})
				emit('toast', { message: 'Usuario creado exitosamente', type: 'success' })
			}
			emit('refresh')
			closeModal()
		} catch (error: any) {
			console.error('Error saving user:', error)
			emit('toast', { message: error.data?.statusMessage || 'Error al guardar el usuario', type: 'error' })
		} finally {
			isSaving.value = false
		}
	}

	defineExpose({
		showModal,
	})
</script>
