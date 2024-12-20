<template>
    <div class="sidebar" :class="{ 'sidebar--mobile': isMobileMenuOpen }">
        <!-- Thêm nút toggle cho mobile -->
        <Button class="mobile-toggle" @click="toggleMobileMenu">
            <i class="pi pi-bars"></i>
        </Button>

        <!-- Logo -->
        <div class="logo-container p-4">
            Shop Logo
        </div>

        <!-- Menu Items -->
        <div class="menu">
            <router-link v-for="item in items" :to="item.to" :key="item.label" class="menu-item" active-class="active">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
            </router-link>
        </div>

        <!-- User Profile -->
        <div class="user-profile ">
            <Avatar :image="userImage" size="normal" shape="circle" />
            <div class="user-profile__info flex-1">
                <div class="user-profile__name">{{ userName }}</div>
                <div class="user-profile__role">{{ userRole }}</div>
            </div>
            <i class="pi pi-sign-out"></i>
        </div>
    </div>

    <!-- Thêm overlay khi mở menu trên mobile -->
    <div v-if="isMobileMenuOpen" class="sidebar-overlay" @click="toggleMobileMenu"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Avatar from 'primevue/avatar';

// Menu items
const items = ref([
    {
        label: 'Sản phẩm',
        icon: 'pi pi-box',
        to: '/products',
        class: 'mb-2'
    },
    // {
    //     label: 'Đơn hàng',
    //     icon: 'pi pi-shopping-cart',
    //     to: '/orders',
    //     class: 'mb-2'
    // },
    {
        label: 'Cài đặt trang bán hàng',
        icon: 'pi pi-cog',
        to: '/settings',
        class: 'mb-2'
    }
]);

// User info
const userName = ref('Nguyễn Văn A');
const userRole = ref('Admin');
const userImage = ref('https://via.placeholder.com/150'); // Thay thế bằng ảnh thật

// Thêm state cho mobile menu
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

// Hàm kiểm tra màn hình mobile
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
    if (!isMobile.value) {
        isMobileMenuOpen.value = false;
    }
};

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Theo dõi resize màn hình
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});

defineProps({
    isMobileMenuOpen: {
        type: Boolean,
        default: false
    }
});

defineEmits(['closeMobileMenu']);
</script>

<style lang="scss" scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    padding: 20px;
    gap: 24px;
    border-right: 1px solid var(--surface-200);
    padding-top: 40px;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: rgba(0, 0, 0, 0.18);
    }

    @media (max-width: 767px) {
        position: fixed;
        left: -250px;
        top: 0;
        z-index: 1000;
        transition: left 0.3s ease;
        
        &--mobile {
            left: 0;
        }
    }
}

.menu {
    flex: 1;

    &-item {
        display: flex;
        align-items: center;
        gap: 12px;

        font-style: normal;
        font-weight: 510;
        font-size: 13px;
        line-height: 16px;

        /* Text/Primary */
        color: rgba(0, 0, 0, 0.85);
        padding: 18px;

        transition: all 0.2s ease;

        border: 1px solid transparent;

        &.active {
            background: #e9e9e9;
            border-radius: 12px;
            color: black;
            border: 1px solid #dddddd;
        }
    }
}

.user-profile {
    margin-top: auto;
    border-top: 1px solid var(--surface-200);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 4px;
    }

    &__name {
        font-weight: 510;
        font-size: 13px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.85);
    }

    &__role {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.5);
    }
}

.logo-container {
    border-bottom: 1px solid var(--surface-200);
}

.mobile-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 999;
    border: 1px solid var(--surface-200);
    border-radius: 4px;
    
    @media (max-width: 767px) {
        display: block;
    }
}

.sidebar-overlay {
    display: none;
    
    @media (max-width: 767px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
}

:deep(.main-content) {
    margin-left: 250px;
    min-height: 100vh;
    
    @media (max-width: 767px) {
        margin-left: 0;
    }
}
</style>
