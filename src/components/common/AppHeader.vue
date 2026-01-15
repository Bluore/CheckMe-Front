<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <el-icon class="logo-icon"><i-ep-monitor /></el-icon>
        <span class="logo-text">CheckMe</span>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active">
          <el-icon><i-ep-house /></el-icon> 首页
        </router-link>
        <router-link to="/history" class="nav-link" active-class="active">
          <el-icon><i-ep-timer /></el-icon> 历史记录
        </router-link>
        <router-link to="/about" class="nav-link" active-class="active">
          <el-icon><i-ep-info-filled /></el-icon> 关于
        </router-link>
      </nav>
      <div class="user-info">
        <el-avatar :size="36" :src="userStore.profile.avatar" />
        <span class="user-name">{{ userStore.profile.name }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import {
  Monitor as IEpMonitor,
  House as IEpHouse,
  Timer as IEpTimer,
  InfoFilled as IEpInfoFilled,
} from '@element-plus/icons-vue'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.app-header {
  background: rgba(173, 216, 230, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: $spacing-2 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-3;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    font-size: 20px;
    color: $primary-color;

    .logo-icon {
      font-size: 28px;
    }
  }

  .nav {
    display: flex;
    gap: $spacing-4;

    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: $text-secondary;
      padding: $spacing-1 $spacing-2;
      border-radius: $border-radius;
      transition: all 0.3s;

      &:hover {
        color: $primary-color;
        background: rgba($primary-color, 0.1);
      }

      &.active {
        color: $primary-color;
        background: rgba($primary-color, 0.1);
        font-weight: bold;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .user-name {
      font-weight: 500;
    }
  }
}
</style>