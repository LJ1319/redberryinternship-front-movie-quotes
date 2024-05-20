import { createApp } from 'vue'

import router from '@/router'
import { createPinia } from 'pinia'
import i18n from '@/plugins/i18n'
import veevalidate from '@/plugins/veevalidate'

import '@/assets/main.css'
import App from '@/App.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(veevalidate)

app.mount('#app')
