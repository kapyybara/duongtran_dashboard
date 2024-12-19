import { ProductModel } from "@/models/product";
import { Product } from "@/types/product";

export default class ProductController {
    static async getProducts() {
        ProductModel.products.splice(0, ProductModel.products.length)
        ProductModel.products.push(
            ...[...Array(41)].map((_, index) => ({
                id: (index + 2).toString(),
                name: `Sản phẩm ${index + 2}`,
                price: Math.floor(Math.random() * 1000001) + 50000,
                image: `https://picsum.photos/201/300?random=${index + 1}`
            }))
        )

        console.log(ProductModel.products)
    }

    static async addProduct(product: Product) {
        ProductModel.products.push(product)
    }

    static async editProduct(product: Product) {
        const index = ProductModel.products.findIndex(p => p.id === product.id)
        if (index !== -1) {
            ProductModel.products[index] = product
        }
    }

    static async deleteProduct(id: string) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        ProductModel.products.splice(ProductModel.products.findIndex(p => p.id === id), 1)
    }
}