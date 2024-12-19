<template>
    <div class="container">
        <div class="form">
            <InputGroup>
                <InputGroupAddon>1</InputGroupAddon>
                <InputText v-model="section1" placeholder="" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>2</InputGroupAddon>
                <InputText v-model="section2" placeholder="" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>3</InputGroupAddon>
                <div class="w-full flex flex-col gap-2 items-start border border-gray-300 rounded-md p-2 border-l-0 rounded-tl-none rounded-bl-none">
                    <FileUpload mode="basic" @select="(event: any) => onFileSelect(event, 'image1')" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                    <img :src="ImageViewModel.image1.value" alt="">
                </div>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>4</InputGroupAddon>
                <Textarea v-model="section4" placeholder="" rows="5" class="w-full" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>5</InputGroupAddon>
                <Textarea v-model="section5" placeholder="" rows="5" class="w-full" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>6</InputGroupAddon>
                <Textarea v-model="section6" placeholder="" rows="5" class="w-full" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>7</InputGroupAddon>
                <div class="w-full flex flex-col gap-2 items-start border border-gray-300 rounded-md p-2 border-l-0 rounded-tl-none rounded-bl-none">
                    <FileUpload mode="basic" @select="(event: any) => onFileSelect(event, 'image2')" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                    <img :src="ImageViewModel.image2.value" alt="">
                </div>
            </InputGroup>
            <Button label="Lưu" />
        </div>

        <div class="frame">
            <img class="w-full sticky top-4" src="/frame.png" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
import ImageViewModel from './image.viewmodel';
import SettingsViewModel from './index.viewmodel';
const section1 = SettingsViewModel.section1
const section2 = SettingsViewModel.section2
const section3 = SettingsViewModel.section3
const section4 = SettingsViewModel.section4
const section5 = SettingsViewModel.section5
const section6 = SettingsViewModel.section6
const section7 = SettingsViewModel.section7

function onFileSelect(event: any, image: string) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        ImageViewModel[image].value = e.target?.result as string;
    };

    reader.readAsDataURL(file);
}

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;
    padding: 12px;
}

.form {
    width: 50%;
    padding: 12px;

    display: flex;
    flex-direction: column;
    gap: 12px;
}

.frame {
    width: 50%;
    padding: 12px;
}
</style>
