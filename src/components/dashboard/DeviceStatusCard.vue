<template>
  <div class="device-card" :class="{ online: isOnline, primary: isPrimary, mobile: mobile }">
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
          <div class="grid-label">正在使用</div>
          <div class="grid-value">{{ displayAppName(status) }}</div>
        </div>
        <div class="grid-item charge">
          <el-icon class="grid-icon"><i-ep-odometer /></el-icon>
          <div class="grid-label">当前电量</div>
          <div class="grid-value">{{ displayCharge }}</div>
        </div>
        <div class="grid-item music">
          <el-icon class="grid-icon"><i-ep-headset /></el-icon>
          <div class="grid-label">正在播放</div>
          <div class="grid-value">{{ displayMusic }}</div>
        </div>
        <div class="grid-item location">
          <el-icon class="grid-icon"><i-ep-location /></el-icon>
          <div class="grid-label">IP属地</div>
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
  mobile?: boolean
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &.online {
    border-color: #67c23a;
  }

  &.primary {
    border-color: #3498db;
    border-width: 3px;
  }

  &.mobile {
    padding: 16px;
    margin-bottom: 16px;

    .header {
      margin-bottom: 12px;

      .device-icon {
        font-size: 20px;
      }

      h3 {
        font-size: 16px;
      }
    }

    .details .grid-container {
      gap: 12px;
      margin-bottom: 16px;

      .grid-item {
        padding: 12px;
        min-height: 80px;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);

        .grid-icon {
          font-size: 22px;
        }

        .grid-label {
          font-size: 12px;
        }

        .grid-value {
          font-size: 16px;
        }
      }
    }
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
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

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
          background: linear-gradient(135deg, rgba(196, 226, 255, 0.4), rgba(102, 177, 255, 0.4));
          color: #1573b1;
          border: 3px solid #acd8ff;
        }
        &.charge {
          background: linear-gradient(135deg, rgba(221, 251, 206, 0.4), rgba(133, 206, 97, 0.4));
          color: #529c2d;
          border: 3px solid #caeeb3;
        }
        &.music {
          background: linear-gradient(135deg, rgba(231, 209, 255, 0.4), rgba(195, 150, 237, 0.4));
          color: #8654b5;
          border: 3px solid #e1c2ff;
        }
        &.location {
          background: linear-gradient(135deg, rgba(255, 236, 208, 0.4), rgba(235, 181, 99, 0.4));
          color: #c88b30;
          border: 3px solid #ffe7c2;
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