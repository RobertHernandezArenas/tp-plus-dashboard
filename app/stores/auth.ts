// import { defineStore } from 'pinia' // Auto-imported by Nuxt

export const useAuthStore = defineStore('auth', () => {
	const user = ref<any>(null)
	const token = ref<string | null>(null)
	const isAuthenticated = computed(() => !!token.value)

	function setAuth(userData: any, tokenData: string) {
		user.value = userData
		token.value = tokenData
		// Save to cookies or local storage here if needed for persistence
	}

	function clearAuth() {
		user.value = null
		token.value = null
	}

	return {
		user,
		token,
		isAuthenticated,
		setAuth,
		clearAuth,
	}
})
