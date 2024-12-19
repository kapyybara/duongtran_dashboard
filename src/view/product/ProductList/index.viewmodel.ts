import ProductController from "@/controllers/product.controller";
import { ProductModel } from "@/models/product";
import { Product } from "@/types/product";
import { computed, ref, type ComputedRef } from "vue";

export class ProductListViewModel {
    static toast: any
    static products: ComputedRef<Product[]> = computed(() => ProductModel.products.filter(product => 
        product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(
            ProductListViewModel.searchText.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )
    ));
    static searchText = ref('');

    static async deleteProduct(product: Product) {
        if (product.id) {
            await ProductController.deleteProduct(product.id!)
            this.toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Xóa sản phẩm thành công',
                life: 3000
            })
        }
    }
}