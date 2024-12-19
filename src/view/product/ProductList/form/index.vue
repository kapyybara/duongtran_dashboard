<template>
    <div class="flex flex-col gap-4 h-fit items-start w-full">
        <InputText required class="w-full" v-model="product.name" placeholder="Tên sản phẩm" />
        <InputNumber required class="w-full" v-model="product.price" placeholder="Giá sản phẩm" />
        <FileUpload class="w-full" :multiple="false" accept="image/*" :maxFileSize="1000000" @select="onSelect"
            :auto="false" mode="basic" :customUpload="true" chooseLabel="Chọn ảnh">

        </FileUpload>

        <div v-if="product.image" class="relative">
            <img :src="product.image" class="w-full h-[400px] object-cover rounded-lg" />
            <span class="absolute top-0 right-0 translate-x-[25%] translate-y-[-25%]">
                <Button icon="pi pi-times" size="small" class="p-button-rounded p-button-danger absolute top-0 right-0"
                    @click="removeImage" />
            </span>
        </div>
        <Editor class="h-[200px]" v-model="product.description" />
        <Button class="w-full" label="Thêm" @click="() => ProductFormViewModel.handleSubmit()" />
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProductFormViewModel } from './form.viewmodel';
import Editor from 'primevue/editor';

const toast = useToast();
const product = ProductFormViewModel.product
ProductFormViewModel.toast = toast

// Lưu trữ file tạm thời để xử lý upload sau này nếu cần
const tempFile = ref<File | null>(null);

const onSelect = (event: any) => {
    const file = event.files[0]; // Chỉ lấy file đầu tiên

    // Kiểm tra kích thước file
    if (file.size > 1000000) {
        toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'File quá lớn. Kích thước tối đa là 1MB',
            life: 3000
        });
        return;
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
        toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Chỉ chấp nhận file ảnh',
            life: 3000
        });
        return;
    }

    // Nếu đã có ảnh cũ, xóa URL cũ
    if (product.value.image) {
        URL.revokeObjectURL(product.value.image);
    }

    // Tạo blob URL và lưu vào product.image
    const url = URL.createObjectURL(file);
    product.value.image = url;
    console.log(url)

    // Lưu file gốc
    tempFile.value = file;

    toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã tải ảnh lên',
        life: 3000
    });
};

const removeImage = () => {
    if (product.value.image) {
        // Xóa blob URL để tránh memory leak
        URL.revokeObjectURL(product.value.image);

        // Reset các giá trị
        product.value.image = '';
        tempFile.value = null;
    }
};

// Cleanup khi component bị hủy
onBeforeUnmount(() => {
    if (product.value.image) {
        URL.revokeObjectURL(product.value.image);
    }
});
</script>

<style scoped>
:deep(.p-fileupload) {
    width: 100%;
}

:deep(.p-fileupload-buttonbar) {
    display: flex;
    justify-content: center;
}
</style>