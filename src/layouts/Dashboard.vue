<template>
    <div class="layout" :class="{ 'layout--mobile': isMobileMenuOpen }">
        <button class="mobile-toggle" @click="toggleMobileMenu">
            <i class="pi pi-bars"></i>
        </button>
        
        <Sidebar class="sidebar" 
                 :is-mobile-menu-open="isMobileMenuOpen"
                 @close-mobile-menu="closeMobileMenu" />
        
        <div class="content">
            <router-view />
        </div>

        <!-- Overlay cho mobile -->
        <div v-if="isMobileMenuOpen" 
             class="mobile-overlay"
             @click="closeMobileMenu">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/layouts/Sidebar.vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};
</script>

<style lang="scss" scoped>
.layout {
    display: grid;
    height: 100vh;
    grid-template-columns: 250px 1fr;
    grid-template-areas: "sidebar content";
    background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
    background-size: 16px 16px;
    position: relative;
    
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-areas: "content";
    }
}

.sidebar {
    grid-area: sidebar;
    height: 100vh;
    background: #fafafa;
    border-right: 1px solid var(--surface-200);
    
    @media (max-width: 767px) {
        position: fixed;
        left: -250px;
        top: 0;
        width: 250px;
        z-index: 1000;
        transition: left 0.3s ease;
        
        .layout--mobile & {
            left: 0;
        }
    }
}

.content {
    grid-area: content;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    
    @media (max-width: 767px) {
        padding-top: 60px; // Để tránh bị che bởi mobile-toggle
    }
}

.mobile-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 999;
    background: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
    
    @media (max-width: 767px) {
        display: block;
    }
    
    &:hover {
        background: #f5f5f5;
    }
}

.mobile-overlay {
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
</style>