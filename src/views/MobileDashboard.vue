<template>
  <div class="mobile-dashboard">
    <!-- 顶部栏（可选，可以显示标题或隐藏） -->
    <div class="mobile-header">
      <h1>CheckMe</h1>
      <div class="user-avatar">
        <el-avatar :size="36" :src="userStore.profile.avatar" />
      </div>
    </div>

    <!-- 主要内容区域，根据当前标签显示 -->
    <div class="mobile-content">
      <transition name="mobile-tab" mode="out-in">
        <component :is="currentComponent" :key="activeTab" />
      </transition>
    </div>

    <!-- 底部标签栏 -->
    <mobile-tab-bar v-model="activeTab" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from 'vue'
import { useUserStore } from '@/stores/userStore'
import MobileTabBar from '@/components/mobile/MobileTabBar.vue'
import MobileHome from '@/components/mobile/MobileHome.vue'
import MobileHistory from '@/components/mobile/MobileHistory.vue'
import MobileAbout from '@/components/mobile/MobileAbout.vue'

const userStore = useUserStore()

// 当前激活的标签
const activeTab = ref('home')

// 标签与组件映射
const tabComponents: Record<string, Component> = {
  home: MobileHome,
  history: MobileHistory,
  about: MobileAbout,
}

const currentComponent = computed(() => tabComponents[activeTab.value])
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.mobile-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: $bg-color;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-2 $spacing-3;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;

  h1 {
    font-size: 20px;
    color: $primary-color;
    margin: 0;
  }

  .user-avatar {
    display: flex;
    align-items: center;
  }
}

.mobile-content {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-3;
  min-height: 0; /* 修复 flex 收缩问题 */
}

// 标签切换动画
.mobile-tab-enter-active,
.mobile-tab-leave-active {
  transition: all 0.3s ease;
  will-change: transform, opacity;
}

.mobile-tab-enter-from {
  opacity: 0;
  transform: translate3d(30px, 0, 0);
}

.mobile-tab-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}

.mobile-tab-enter-to,
.mobile-tab-leave-from {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>