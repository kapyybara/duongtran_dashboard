import { onMounted } from "vue";
import  ProductController  from "@/controllers/product.controller";
import { ProductListViewModel } from "./index.viewmodel";
import { useToast } from "primevue/usetoast";

export const useEventStore = () => {
    onMounted(ProductController.getProducts);
    ProductListViewModel.toast = useToast()
}