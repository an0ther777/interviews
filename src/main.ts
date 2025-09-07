import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'

import { initializeApp } from "firebase/app";

import Button from "primevue/button"
import InputText  from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Card  from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import InlineMessage from 'primevue/inlinemessage'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import Radio from 'primevue/radiobutton'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyBCUhxncq0QMXURbc_6TRW-QaHNFFCHRHg",
  authDomain: "interviews-27956.firebaseapp.com",
  projectId: "interviews-27956",
  storageBucket: "interviews-27956.firebasestorage.app",
  messagingSenderId: "993721144802",
  appId: "1:993721144802:web:5281e24d911b0ca091d5bb",
  measurementId: "G-YR4M6MD1L3"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress', ProgressSpinner)
app.component('app-card', Card)
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', InlineMessage)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-calendar', Calendar)
app.component('app-radio', Radio)

app.mount('#app')
