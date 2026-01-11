import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'
import { fetchStatus } from '@/services/api'
import type { DeviceStatus, DeviceType } from '@/services/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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

  // 判断在线状态
  const isComputerOnline = computed(() => {
    const status = computerStatus.value
    if (!status) return false
    // 如果 application 不是“没有相关记录”且 update_time 不是默认值，则认为在线
    return status.application !== '没有相关记录' && status.update_time !== '0001-01-01T00:00:00Z'
  })

  const isPhoneOnline = computed(() => {
    const status = phoneStatus.value
    if (!status) return false
    return status.application !== '没有相关记录' && status.update_time !== '0001-01-01T00:00:00Z'
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