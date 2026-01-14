<template>
  <div class="mobile-tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-item"
      :class="{ active: activeTab === tab.id }"
      @click="switchTab(tab.id)"
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

const activeTab = props.modelValue

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

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s;
    color: $text-secondary;

    &:hover {
      color: $primary-color;
    }

    &.active {
      color: $primary-color;
      font-weight: bold;
    }

    .tab-icon {
      font-size: 20px;
      margin-bottom: 4px;
    }

    .tab-label {
      font-size: 12px;
    }
  }
}
</style>