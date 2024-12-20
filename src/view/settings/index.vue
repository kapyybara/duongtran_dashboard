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

        <div class="frame" :class="{ 'frame--hidden': !showFrame }">
            <img class="w-full sticky top-4" src="/frame.png" alt="">
        </div>

        <Button class="frame-toggle" @click="toggleFrame">
            <i class="pi" :class="showFrame ? 'pi-eye-slash' : 'pi-eye'"></i>
        </Button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ImageViewModel from './image.viewmodel';
import SettingsViewModel from './index.viewmodel';
const section1 = SettingsViewModel.section1
const section2 = SettingsViewModel.section2
const section3 = SettingsViewModel.section3
const section4 = SettingsViewModel.section4
const section5 = SettingsViewModel.section5
const section6 = SettingsViewModel.section6
const section7 = SettingsViewModel.section7

const showFrame = ref(true);
const isMobile = ref(false);

// Kiểm tra và set trạng thái mặc định cho mobile
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
    if (isMobile.value) {
        showFrame.value = false; // Mặc định ẩn trên mobile
    } else {
        showFrame.value = true; // Luôn hiện trên desktop
    }
};

// Theo dõi resize và khởi tạo
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

const toggleFrame = () => {
    showFrame.value = !showFrame.value;
};

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
    position: relative;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
}

.form {
    width: 50%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    @media (max-width: 768px) {
        width: 100%;
    }
}

.frame {
    width: 50%;
    padding: 12px;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
        width: 100%;
        position: fixed;
        right: 0;
        bottom: 60px;
        background: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        z-index: 98;
        transform: translateX(100%); // Mặc định ẩn
        
        &:not(.frame--hidden) {
            transform: translateX(0); // Chỉ hiện khi không có class hidden
        }
    }
}

.frame-toggle {
    display: none;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 99;
    cursor: pointer;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
            transform: scale(1.1);
        }
        
        i {
            font-size: 1.2rem;
        }
    }
}
</style>
