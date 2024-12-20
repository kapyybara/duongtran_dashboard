<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
            <!-- Logo và Tiêu đề -->
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    Đăng nhập vào hệ thống
                </h2>
                <!-- <p class="mt-2 text-sm text-gray-600">
                    Hoặc
                    <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                        đăng ký tài khoản mới
                    </router-link>
                </p> -->
            </div>

            <!-- Form đăng nhập -->
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <!-- Email input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                            id="email" 
                            v-model="formData.email"
                            type="email" 
                            required
                            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập email của bạn"
                        />
                    </div>

                    <!-- Password input -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <div class="relative">
                            <input 
                                id="password" 
                                v-model="formData.password"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nhập mật khẩu"
                            />
                            <button 
                                type="button"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                @click="togglePassword"
                            >
                                <i class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Remember me và Quên mật khẩu -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input 
                            id="remember-me" 
                            v-model="formData.remember"
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <div class="text-sm">
                        <router-link to="/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Quên mật khẩu?
                        </router-link>
                    </div>
                </div>

                <!-- Nút đăng nhập -->
                <div>
                    <button 
                        type="submit"
                        :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <i class="pi pi-lock h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                               aria-hidden="true"></i>
                        </span>
                        {{ loading ? 'Đang xử lý...' : 'Đăng nhập' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const showPassword = ref(false);

const formData = reactive({
    email: '',
    password: '',
    remember: false
});

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    try {
        loading.value = true;
        // Thực hiện logic đăng nhập ở đây
        console.log('Login data:', formData);
        
        // Giả lập delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Chuyển hướng sau khi đăng nhập thành công
        router.push('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};
</script> 