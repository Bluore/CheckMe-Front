<template>
  <div class="activity-card">
    <!-- <h3>我正在。。。</h3> -->
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