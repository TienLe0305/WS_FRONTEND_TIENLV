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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

interface Language {
  code: string
  name: string
  flag: string
}

const { locale } = useI18n()
const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: new URL('@/assets/flags/en.png', import.meta.url).href,
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    flag: new URL('@/assets/flags/vi.png', import.meta.url).href,
  },
  {
    code: 'ja',
    name: 'Japanese',
    flag: new URL('@/assets/flags/ja.png', import.meta.url).href,
  },
]

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectLanguage = (code: string) => {
  locale.value = code
  closeDropdown()
}

const currentLocale = computed(() => locale.value)

const currentLanguage = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.name : ''
})

const currentFlag = computed(() => {
  const lang = languages.find(l => l.code === currentLocale.value)
  return lang ? lang.flag : ''
})

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    closeDropdown()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-selector {
  position: relative;
  width: 140px;
  cursor: pointer;
  user-select: none;
}
.selected-language {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
}
.flag-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.dropdown-arrow {
  margin-left: auto;
  width: 16px;
  height: 16px;
}
.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-dropdown-background);
  margin-top: 4px;
  box-shadow: 0 2px 8px var(--color-shadow-deep);
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
}
.language-dropdown li {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  transition: background-color 0.2s;
}
.language-dropdown li:hover {
  background-color: var(--color-hover);
}
.language-dropdown li.active {
  background-color: var(--color-active);
}
</style>
