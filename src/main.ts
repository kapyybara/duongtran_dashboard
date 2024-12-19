import PrimeVue from 'primevue/config';

import Aura from '@primevue/themes/aura';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { installPrimevueComponents } from './utils/primevue';
import './style.css';

import 'primeicons/primeicons.css'


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            dark: false,
            darkModeSelector: false
        }
    }
});
installPrimevueComponents(app);

app.use(router);
app.mount('#app');