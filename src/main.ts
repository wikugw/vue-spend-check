import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(ElementPlus).use(pinia).mount("#app");
