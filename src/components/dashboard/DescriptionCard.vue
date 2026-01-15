<template>
  <div class="description-card">
    <div class="description-content">
      <el-icon class="description-icon"><i-ep-document /></el-icon>
      <p class="description-text">{{ displayDescription }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Document as IEpDocument } from '@element-plus/icons-vue'

const props = defineProps<{
  description?: string
}>()

const displayDescription = computed(() => {
  return props.description?.trim() || '啊呜~ 这里什么都没有描述喵~'
})
</script>

<style scoped lang="scss">
.description-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
  }

  .description-content {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    .description-icon {
      font-size: 28px;
      color: #409eff;
    }

    .description-text {
      margin: 0;
      font-size: 18px;
      line-height: 1.5;
      color: #555;
    }
  }

  .hint {
    margin: 0;
    color: #909399;
    font-size: 14px;
  }
}
</style>