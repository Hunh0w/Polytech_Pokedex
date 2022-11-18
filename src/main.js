import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'balm-ui/dist/balm-ui.css'
import BalmUI from 'balm-ui/dist/balm-ui'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'


const app = createApp(App)

app.use(router)
app.use(BalmUI)
app.use(BalmUIPlus)

app.mount('#app')
