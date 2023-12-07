import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/styles.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import vueDompurifyHTMLPlugin from 'vue-dompurify-html'

createApp(App).use(router).use(vueDompurifyHTMLPlugin).mount('#app')
