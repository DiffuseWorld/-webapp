import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/style/icon.css'
import '@/assets/main.scss'
import '@/assets/globalstyle/globalstyle.scss'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
