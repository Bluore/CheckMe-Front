<template>
  <div class="history-list">
    <div v-if="records.length === 0" class="empty">
      暂无记录
    </div>
    <div v-else>
      <history-item
        v-for="record in records"
        :key="record.start_time + record.device"
        :record="record"
        :device="device"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryRecord, DeviceType } from '@/services/types'
import HistoryItem from './HistoryItem.vue'

defineProps<{
  records: HistoryRecord[]
  device: DeviceType
}>()
</script>

<style scoped lang="scss">
.history-list {
  .empty {
    text-align: center;
    padding: 40px;
    color: #909399;
    font-style: italic;
  }
}
</style>