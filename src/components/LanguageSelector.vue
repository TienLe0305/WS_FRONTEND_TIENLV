<template>
  <div class="language-selector" @click="toggleDropdown">
    <div class="selected-language">
      <img :src="currentFlag" :alt="currentLanguage" class="flag-icon" />
      <span>{{ currentLanguage }}</span>
      <IconDown />
    </div>
    <ul v-if="isOpen" class="language-dropdown">
      <li
        v-for="lang in languages"
        :key="lang.code"
        @click="selectLanguage(lang.code)"
        :class="{ active: lang.code === currentLocale }"
      >
        <img :src="lang.flag" :alt="lang.name" class="flag-icon" />
        <span>{{ lang.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLanguageSelector } from '@/composables/useLanguageSelector'
import IconDown from './icons/IconDown.vue'

const {
  languages,
  isOpen,
  toggleDropdown,
  selectLanguage,
  currentLocale,
  currentLanguage,
  currentFlag,
} = useLanguageSelector()
</script>

<style scoped></style>
