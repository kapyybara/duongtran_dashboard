import { ref } from "vue";
import { Product } from "@/types/product";
import ProductController from "@/controllers/product.controller";

export class ProductFormViewModel {
    static toast: any
    static mode = ref<'add' | 'edit'>('add')
    static product = ref<Product>({
        name: '',
        price: 0,
        image: '',
        description: ''
    });
    static show = ref(false)
    static title = ref('')

    static openNewForm() {
        this.show.value = true
        this.title.value = 'Thêm sản phẩm'
        this.product.value = {
            name: '',
            price: 0,
            image: '',
            description: ''
        }
        this.mode.value = 'add'
    }

    static openEditForm(product: Product) {
        this.show.value = true
        this.title.value = 'Sửa sản phẩm'
        this.product.value = product
        this.mode.value = 'edit'
    }

    static handleSubmit() {
        switch (this.mode.value) {
            case 'add':
                this.addProduct()
                break
            case 'edit':
                this.editProduct()
                break
        }
    }

    static async addProduct() {
        console.log(this.toast)
        await ProductController.addProduct(this.product.value)
        this.show.value = false
        this.toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Thêm sản phẩm thành công',
            life: 3000
        })
    }

    static async editProduct() {
        await ProductController.editProduct(this.product.value)
        this.show.value = false
        this.toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Sửa sản phẩm thành công',
            life: 3000
        })
    }
}