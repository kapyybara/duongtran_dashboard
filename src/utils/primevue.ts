import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Image from 'primevue/image';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import ConfirmationService from 'primevue/confirmationservice';
import { Textarea, ToastService } from 'primevue';

import { App } from 'vue'

export const installPrimevueComponents = (app: App) => {
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    app.component('Button', Button)
    app.component('Tag', Tag)
    app.component('InputGroup', InputGroup)
    app.component('InputGroupAddon', InputGroupAddon)
    app.component('InputText', InputText)
    app.component('Image', Image)
    app.component('Dialog', Dialog)
    app.component('FileUpload', FileUpload)
    app.component('InputNumber', InputNumber)
    app.component('Textarea', Textarea)
    // app.component('FloatButton', FloatButton)
    app.use(ToastService)
    app.use(ConfirmationService)
}