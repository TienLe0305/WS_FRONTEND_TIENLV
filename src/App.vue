<template>
  <div>
    <header>
      <h1 class="title">{{ t('title') }}</h1>
      <LanguageSelector />
    </header>
    <ProductImageManager />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProductImageManager from './components/ProductImageManager.vue'
import LanguageSelector from './components/LanguageSelector.vue';

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