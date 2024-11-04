import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

interface Language {
  code: string
  name: string
  flag: string
}

export function useLanguageSelector() {
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

  return {
    languages,
    isOpen,
    toggleDropdown,
    selectLanguage,
    currentLocale,
    currentLanguage,
    currentFlag,
  }
}
