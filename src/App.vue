<template>
  <div>
    <header>
      <h1 class="title">{{ t('title') }}</h1>
      <LanguageSelector />
    </header>
    <ProductImageManager />
    <ToastUI />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProductImageManager from './components/ProductImageManager.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import ToastUI from './components/ToastUI.vue'

const { t } = useI18n()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
</style>
