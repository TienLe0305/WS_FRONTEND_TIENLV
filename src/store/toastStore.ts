import type { ToastMessageKey } from '@/constants/toastMessages'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toastStore', () => {
  const toasts = ref<
    { id: number; message: string; type: 'success' | 'error' }[]
  >([])

  const addToast = (
    messageKey: ToastMessageKey,
    type: 'success' | 'error' = 'success',
  ) => {
    const id = Date.now()
    toasts.value.push({ id, message: messageKey, type })
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return { toasts, addToast, removeToast }
})
