import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'
import { fetchStatus } from '@/services/api'
import type { DeviceStatus, DeviceType } from '@/services/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 离线超时阈值（分钟），从环境变量读取，默认5分钟
const OFFLINE_TIMEOUT_MINUTES = parseInt(
  import.meta.env.VITE_OFFLINE_TIMEOUT_MINUTES || '5',
  10
)

/**
 * 检查更新时间是否超时
 */
function isUpdateTimeout(updateTime: string, thresholdMinutes: number): boolean {
  if (!updateTime || updateTime === '0001-01-01T00:00:00Z') {
    return true // 默认值视为超时（离线）
  }
  const now = dayjs()
  const updated = dayjs(updateTime)
  const diffMinutes = now.diff(updated, 'minute')
  return diffMinutes > thresholdMinutes
}

export const useStatusStore = defineStore('status', () => {
  // 原始设备状态列表
  const deviceList = ref<DeviceStatus[]>([])
  const lastUpdated = ref<string>('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pollingInterval = ref<number | null>(null)

  // 计算电脑和手机的状态
  const computerStatus = computed(() => deviceList.value.find(d => d.device === 'computer'))
  const phoneStatus = computed(() => deviceList.value.find(d => d.device === 'phone'))

  // 判断在线状态（考虑超时）
  const isComputerOnline = computed(() => {
    const status = computerStatus.value
    if (!status) return false
    // 如果 application 是“没有相关记录”或 update_time 是默认值，则离线
    if (status.application === '没有相关记录' || status.update_time === '0001-01-01T00:00:00Z') {
      return false
    }
    // 检查是否超时
    return !isUpdateTimeout(status.update_time, OFFLINE_TIMEOUT_MINUTES)
  })

  const isPhoneOnline = computed(() => {
    const status = phoneStatus.value
    if (!status) return false
    if (status.application === '没有相关记录' || status.update_time === '0001-01-01T00:00:00Z') {
      return false
    }
    return !isUpdateTimeout(status.update_time, OFFLINE_TIMEOUT_MINUTES)
  })

  // 主设备（根据业务规则）
  const primaryDevice = computed(() => {
    if (isComputerOnline.value) return 'computer'
    if (isPhoneOnline.value) return 'phone'
    return null
  })

  // 获取实时状态
  async function loadStatus() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchStatus()
      deviceList.value = res.data.device_list
      lastUpdated.value = new Date().toISOString()
    } catch (err: any) {
      error.value = err.message || '获取状态失败'
      console.error('Failed to fetch status:', err)
    } finally {
      loading.value = false
    }
  }

  // 开始轮询
  function startPolling(intervalMs = 30000) {
    stopPolling()
    loadStatus() // 立即加载一次
    pollingInterval.value = window.setInterval(() => {
      loadStatus()
    }, intervalMs)
  }

  // 停止轮询
  function stopPolling() {
    if (pollingInterval.value !== null) {
      clearInterval(pollingInterval.value)
      pollingInterval.value = null
    }
  }

  // 格式化时间
  function formatTime(iso: string) {
    return dayjs(iso).format('YYYY-MM-DD HH:mm:ss')
  }

  // 相对时间
  function fromNow(iso: string) {
    return dayjs(iso).fromNow()
  }

  // 清理
  onUnmounted(() => {
    stopPolling()
  })

  return {
    deviceList,
    computerStatus,
    phoneStatus,
    isComputerOnline,
    isPhoneOnline,
    primaryDevice,
    lastUpdated,
    loading,
    error,
    loadStatus,
    startPolling,
    stopPolling,
    formatTime,
    fromNow,
  }
})