import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashAlt, faPenToSquare, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faTrashAlt, faPenToSquare, faXmarkCircle)

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
