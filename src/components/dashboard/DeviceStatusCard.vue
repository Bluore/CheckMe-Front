<template>
  <div class="device-card" :class="{ online: isOnline, primary: isPrimary }">
    <div class="header">
      <el-icon class="device-icon">
        <i-ep-monitor v-if="device === 'computer'" />
        <i-ep-iphone v-else />
      </el-icon>
      <h3>{{ device === 'computer' ? '电脑' : '手机' }}</h3>
      <el-tag :type="isOnline ? 'success' : 'info'" size="small">
        {{ isOnline ? '活着' : '似了' }}
      </el-tag>
    </div>

    <div v-if="status && isPrimary" class="details">
      <!-- 四宫格 -->
      <div class="grid-container">
        <div class="grid-item app">
          <el-icon class="grid-icon"><i-ep-cpu /></el-icon>
          <div class="grid-label">应用</div>
          <div class="grid-value">{{ displayAppName(status) }}</div>
        </div>
        <div class="grid-item charge">
          <el-icon class="grid-icon"><i-ep-odometer /></el-icon>
          <div class="grid-label">电量</div>
          <div class="grid-value">{{ displayCharge }}</div>
        </div>
        <div class="grid-item music">
          <el-icon class="grid-icon"><i-ep-headset /></el-icon>
          <div class="grid-label">音乐</div>
          <div class="grid-value">{{ displayMusic }}</div>
        </div>
        <div class="grid-item location">
          <el-icon class="grid-icon"><i-ep-location /></el-icon>
          <div class="grid-label">位置</div>
          <div class="grid-value">{{ displayLocation }}</div>
        </div>
      </div>
      <!-- 其他信息 -->
      <!-- <div class="other-info">
        <p><strong>开始时间:</strong> {{ formatTime(status.start_time) }}</p>
        <p><strong>最后更新:</strong> {{ fromNow(status.update_time) }}</p>
        <p v-if="status.ip"><strong>IP:</strong> {{ status.ip }}</p>
        <p v-if="status.duration"><strong>持续时间:</strong> {{ status.duration }} 秒</p>
      </div> -->
    </div>
    <div v-else-if="!status" class="no-data">
      暂无数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Monitor as IEpMonitor,
  Iphone as IEpIphone,
  Cpu as IEpCpu,
  Odometer as IEpOdometer,
  Headset as IEpHeadset,
  Location as IEpLocation,
} from '@element-plus/icons-vue'
import { useStatusStore } from '@/stores/statusStore'
import type { DeviceStatus, DeviceType } from '@/services/types'

const props = defineProps<{
  device: DeviceType | null
  status: DeviceStatus | null
  isPrimary: boolean
}>()

const statusStore = useStatusStore()

const isOnline = computed(() => {
  if (!props.device || !props.status) return false
  // 使用存储中的在线状态，确保与超时逻辑一致
  if (props.device === 'computer') return statusStore.isComputerOnline
  if (props.device === 'phone') return statusStore.isPhoneOnline
  return false
})

// const formatTime = statusStore.formatTime
// const fromNow = statusStore.fromNow
const displayAppName = statusStore.displayAppName

// 计算显示字段
const displayCharge = computed(() => {
  const charge = props.status?.data?.charge
  if (charge === undefined || charge === null) return '未知'
  return `${charge}%`
})

const displayMusic = computed(() => {
  const data = props.status?.data
  if (!data) return '未播放音乐'
  if (data.is_hide_music) return '未播放音乐'
  return data.music_name || '未知'
})

const displayLocation = computed(() => {
  const location = props.status?.data?.location
  return location || '未知'
})
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
    .grid-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 20px;

      .grid-item {
        padding: 15px;
        border-radius: 12px;
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100px;

        .grid-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .grid-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 4px;
        }

        .grid-value {
          font-size: 18px;
          font-weight: bold;
          word-break: break-word;
        }

        &.app {
          background: linear-gradient(135deg, #c4e2ff, #66b1ff);
          color: #1573b1;
        }
        &.charge {
          background: linear-gradient(135deg, #ddfbce, #85ce61);
          color: #529c2d;
        }
        &.music {
          background: linear-gradient(135deg, #e7d1ff, #c396ed);
          color: #8654b5;
        }
        &.location {
          background: linear-gradient(135deg, #ffecd0, #ebb563);
          color: #c88b30;
        }
      }
    }

    .other-info {
      p {
        margin: 8px 0;
        color: #555;
      }
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