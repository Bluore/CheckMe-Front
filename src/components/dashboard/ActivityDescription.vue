<template>
  <div class="activity-card">
    <h3>我正在。。。</h3>
    <div class="activity-content">
      <el-icon class="activity-icon"><i-ep-star /></el-icon>
      <p class="activity-text">{{ activity }}</p>
    </div>
    <p class="hint">正在玩 {{ activity }} </p>
    <p class="hint">看到我摆烂记得提醒我学习(￣y▽,￣)╭ </p>
  </div>
</template>

<script setup lang="ts">
import { Star as IEpStar } from '@element-plus/icons-vue'

defineProps<{
  activity: string
}>()
</script>

<style scoped lang="scss">
.activity-card {
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

  .activity-content {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    .activity-icon {
      font-size: 28px;
      color: #e6a23c;
    }

    .activity-text {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: #e6a23c;
    }
  }

  .hint {
    margin: 0;
    color: #909399;
    font-size: 14px;
  }
}
</style>