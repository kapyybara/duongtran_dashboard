<template>
    <div class="container">
        <div class="header">
            <div class="title">
                Danh sách sản phẩm
            </div>
            <div class="tools">
                <span class="p-input-icon-left">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-search"></i>
                        </InputGroupAddon>
                        <InputText v-model="searchText" placeholder="Tìm kiếm sản phẩm" />
                    </InputGroup>
                </span>
                <Button icon="pi pi-plus" rounded severity="success" class="mr-2"
                    @click="ProductFormViewModel.openNewForm.bind(ProductFormViewModel)()" />
            </div>
        </div>
        <DataTable :value="ProductListViewModel.products.value" tableStyle="min-width: 50rem" class="border border-1 rounded-lg overflow-hidden w-full border-gray-300" scrollable
            scrollHeight="calc(100vh - 200px)">
            <Column field="name" header="Tên sản phẩm"></Column>
            <Column field="image" header="Hình ảnh">
                <template #body="slotProps">
                    <Image alt="Image" preview>
                        <template #previewicon>
                            <i class="pi pi-search"></i>
                        </template>
                        <template #image>
                            <img :src="slotProps.data.image" alt="image" class="product-image" />
                        </template>
                        <template #preview="imageSlotProps">
                            <img :src="slotProps.data.image" alt="preview" :style="imageSlotProps.style" />
                        </template>
                    </Image>
                </template>
            </Column>
            <Column field="price" header="Giá">
                <template #body="slotProps">
                    <div class="flex justify-content-center">
                        {{ new Intl.NumberFormat('vi-VN', {
                            style: 'currency', currency: 'VND'
                        }).format(slotProps.data.price) }}
                    </div>
                </template>
            </Column>
            <Column header="Thao tác" :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <div class="flex gap-2 justify-content-center">
                        <Button icon="pi pi-pencil" rounded outlined severity="success" class="mr-2" @click="() => ProductFormViewModel.openEditForm(slotProps.data)" />
                        <Button icon="pi pi-trash" rounded outlined severity="danger" 
                            @click="() => confirm.require({
                                message: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
                                accept: () => ProductListViewModel.deleteProduct(slotProps.data),
                                acceptClass: 'p-button-danger',
                                acceptLabel: 'Xóa',
                                acceptIcon: 'pi pi-check',
                                rejectLabel: 'Hủy',
                                rejectIcon: 'pi pi-times',
                                rejectClass: 'p-button-secondary'
                            })" 
                        />
                    </div>
                </template>
            </Column>
        </DataTable>

    </div>
    <Dialog v-model:visible="formVisible" maximizable modal :header="ProductFormViewModel.title.value" :style="{ width: '40rem' }">
        <ProductForm />
    </Dialog>
</template>

<script setup lang="ts">
import { useEventStore } from './index.eventstore';

import ProductForm from './form/index.vue';

import { ProductListViewModel } from './index.viewmodel';
import { ProductFormViewModel } from './form/form.viewmodel';
import { useConfirm } from 'primevue';
useEventStore()
const confirm = useConfirm()


const searchText = ProductListViewModel.searchText
const formVisible = ProductFormViewModel.show
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
}

.table {
    width: 100%;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    padding: 12px 16px;

    &>* {
        font-size: 14px;
    }

    & :deep(.p-datatable-table-container) {

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
}

.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
}

.title {
    font-size: 24px;
    font-weight: 600;
}

.tools {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>