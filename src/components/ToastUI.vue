<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :class="['toast', toast.type]"
    >
      {{ t(toast.message) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/store/toastStore'
import { useI18n } from 'vue-i18n'

const toastStore = useToastStore()
const { t } = useI18n()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast {
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 4px;
  color: #fff;
  animation:
    fadein 0.5s,
    fadeout 0.5s 2.5s;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
