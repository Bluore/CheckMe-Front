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
      <span class="tab-label">{{ tab.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tabs = [
  { id: 'overview', label: '概览' },
  { id: 'detail', label: '详情' },
  { id: 'history', label: '历史' },
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
  background: rgba(173, 216, 230, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  padding: $spacing-1 0;
  flex-shrink: 0;
  height: 60px;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  .tab-indicator {
    position: absolute;
    top: 10%;
    left: 0;
    width: calc(100% / 3);
    height: 80%;
    background-color: rgba($primary-color, 0.25);
    border: 1px solid rgba($primary-color, 0.3);
    border-radius: 8px;
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


    .tab-label {
      font-size: 18px;
      font-weight: 500;
      transition: font-weight 0.2s;
    }
  }
}
</style>