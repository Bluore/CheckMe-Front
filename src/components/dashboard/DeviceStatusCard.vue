<template>
  <div class="device-card" :class="{ online: isOnline, primary: isPrimary }">
    <div class="header">
      <el-icon class="device-icon">
        <i-ep-monitor v-if="device === 'computer'" />
        <i-ep-iphone v-else />
      </el-icon>
      <h3>{{ device === 'computer' ? '电脑' : '手机' }}</h3>
      <el-tag :type="isOnline ? 'success' : 'info'" size="small">
        {{ isOnline ? '在线' : '离线' }}
      </el-tag>
    </div>

    <div v-if="status" class="details">
      <p><strong>应用:</strong> {{ status.application }}</p>
      <p><strong>开始时间:</strong> {{ formatTime(status.start_time) }}</p>
      <p><strong>最后更新:</strong> {{ fromNow(status.update_time) }}</p>
      <p v-if="status.ip"><strong>IP:</strong> {{ status.ip }}</p>
      <p v-if="status.duration"><strong>持续时间:</strong> {{ status.duration }} 秒</p>
    </div>
    <div v-else class="no-data">
      暂无数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Monitor as IEpMonitor, Iphone as IEpIphone } from '@element-plus/icons-vue'
import { useStatusStore } from '@/stores/statusStore'
import type { DeviceStatus, DeviceType } from '@/services/types'

const props = defineProps<{
  device: DeviceType | null
  status: DeviceStatus | null
  isPrimary: boolean
}>()

const statusStore = useStatusStore()

const isOnline = computed(() => {
  if (!props.status) return false
  return props.status.application !== '没有相关记录' && props.status.update_time !== '0001-01-01T00:00:00Z'
})

const formatTime = statusStore.formatTime
const fromNow = statusStore.fromNow
</script>

<style scoped lang="scss">
.device-card {
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;

  &.online {
    border-color: #67c23a;
  }

  &.primary {
    border-color: #3498db;
    border-width: 3px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;

    .device-icon {
      font-size: 24px;
      color: #606266;
    }

    h3 {
      margin: 0;
      flex: 1;
      font-size: 18px;
    }
  }

  .details {
    p {
      margin: 8px 0;
      color: #555;
    }
  }

  .no-data {
    color: #909399;
    font-style: italic;
    text-align: center;
    padding: 20px;
  }
}
</style>