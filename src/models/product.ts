
import { reactive } from "vue";
import { Product } from "@/types/product";

export class ProductModel {
    static products: Product[] = reactive([]);
}
