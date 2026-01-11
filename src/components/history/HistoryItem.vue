<template>
  <div class="history-item" :class="device">
    <div class="header">
      <el-icon class="device-icon">
        <i-ep-monitor v-if="device === 'computer'" />
        <i-ep-iphone v-else />
      </el-icon>
      <span class="application">{{ record.application }}</span>
      <el-tag size="small" :type="record.application === '没有相关记录' ? 'info' : 'success'">
        {{ record.application === '没有相关记录' ? '离线' : '在线' }}
      </el-tag>
    </div>
    <div class="time-info">
      <p><strong>开始时间:</strong> {{ formatTime(record.start_time) }}</p>
      <p><strong>结束时间:</strong> {{ formatTime(record.update_time) }}</p>
      <p><strong>持续时间:</strong> {{ duration(record.start_time, record.update_time) }}</p>
    </div>
    <div class="relative-time">
      {{ fromNow(record.update_time) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor as IEpMonitor, Iphone as IEpIphone } from '@element-plus/icons-vue'
import type { HistoryRecord, DeviceType } from '@/services/types'
import { useHistoryStore } from '@/stores/historyStore'

const props = defineProps<{
  record: HistoryRecord
  device: DeviceType
}>()

const historyStore = useHistoryStore()
const { formatTime, fromNow, duration } = historyStore
</script>

<style scoped lang="scss">
.history-item {
  padding: 20px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #3498db;
  position: relative;

  &.computer {
    border-left-color: #3498db;
  }

  &.phone {
    border-left-color: #67c23a;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    .device-icon {
      font-size: 20px;
      color: #606266;
    }

    .application {
      flex: 1;
      font-weight: bold;
      font-size: 18px;
      color: #333;
    }
  }

  .time-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    color: #555;
    margin-bottom: 10px;

    p {
      margin: 0;
    }
  }

  .relative-time {
    text-align: right;
    font-size: 14px;
    color: #909399;
  }
}
</style>