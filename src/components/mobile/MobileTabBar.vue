<template>
  <div class="mobile-tab-bar">
    <div class="tab-indicator" :style="indicatorStyle"></div>
    <div
      v-for="(tab, index) in tabs"
      :key="tab.id"
      class="tab-item"
      :class="{ active: activeTab === tab.id }"
      @click="switchTab(tab.id)"
      :data-index="index"
    >
      <el-icon class="tab-icon">
        <component :is="tab.icon" />
      </el-icon>
      <span class="tab-label">{{ tab.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  House as IEpHouse,
  Timer as IEpTimer,
  InfoFilled as IEpInfoFilled,
} from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tabs = [
  { id: 'home', label: '首页', icon: IEpHouse },
  { id: 'history', label: '历史', icon: IEpTimer },
  { id: 'about', label: '关于', icon: IEpInfoFilled },
]

const activeTab = computed(() => props.modelValue)

const activeIndex = computed(() => tabs.findIndex(tab => tab.id === activeTab.value))

const indicatorStyle = computed(() => ({
  transform: `translateX(${activeIndex.value * 100}%)`,
}))

const switchTab = (tabId: string) => {
  emit('update:modelValue', tabId)
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.mobile-tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-top: 1px solid $border-color;
  padding: $spacing-1 0;
  flex-shrink: 0;
  height: 60px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  position: relative;

  .tab-indicator {
    position: absolute;
    bottom: 6px;
    left: 0;
    width: calc(100% / 3);
    height: 4px;
    background-color: rgba($primary-color, 0.7);
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
    color: $text-secondary;
    position: relative;
    overflow: hidden;
    z-index: 2;

    &:hover {
      color: $primary-color;
    }

    &.active {
      color: $primary-color;
      font-weight: bold;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }

    .tab-icon {
      font-size: 20px;
      margin-bottom: 4px;
      transition: transform 0.2s;
    }

    &.active .tab-icon {
      transform: scale(1.1);
    }

    .tab-label {
      font-size: 12px;
      transition: font-weight 0.2s;
    }
  }
}
</style>