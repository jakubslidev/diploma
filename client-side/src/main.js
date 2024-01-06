import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/styles.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import vueDompurifyHTMLPlugin from 'vue-dompurify-html'
import { globalCookiesConfig } from "vue3-cookies";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret)

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

createApp(App).use(router).use(vueDompurifyHTMLPlugin).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
