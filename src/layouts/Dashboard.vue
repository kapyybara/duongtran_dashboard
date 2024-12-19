<template>
    <div class="layout">
        <!-- <Header class="header" /> -->
        <Sidebar class="sidebar" />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/layouts/Sidebar.vue';
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 250px 1fr;
    grid-template-areas:
        "sidebar content"
        "sidebar content";

    background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
    background-size: 16px 16px;
    
}

.header {
    grid-area: header;
    height: 50px;
}

.sidebar {
    grid-area: sidebar;
    height: 100%;
}

.content {
    grid-area: content;
    height: calc(100vh);
    overflow: auto;

    background: #FFFFFF;
}
</style>