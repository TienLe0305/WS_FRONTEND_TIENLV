import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import en from './locales/en.json'
import vi from './locales/vi.json'
import ja from './locales/ja.json'

const messages = {
  en,
  vi,
  ja
}

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)

app.mount('#app')