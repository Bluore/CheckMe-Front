<template>
  <div class="description-card">
    <h3>描述</h3>
    <div class="description-content">
      <el-icon class="description-icon"><i-ep-document /></el-icon>
      <p class="description-text">{{ displayDescription }}</p>
    </div>
    <p class="hint">这是当前活动的详细说明</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Document as IEpDocument } from '@element-plus/icons-vue'

const props = defineProps<{
  description?: string
}>()

const displayDescription = computed(() => {
  return props.description?.trim() || '暂无描述'
})
</script>

<style scoped lang="scss">
.description-card {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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