import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchHistory } from '@/services/api'
import type { DeviceHistory, HistoryRecord, DeviceType } from '@/services/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const useHistoryStore = defineStore('history', () => {
  const historyList = ref<DeviceHistory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取历史记录
  async function loadHistory() {
    loading.value = true
    error.value = null
    try {
      const res = await fetchHistory()
      historyList.value = res.data.list
    } catch (err: any) {
      error.value = err.message || '获取历史记录失败'
      console.error('Failed to fetch history:', err)
    } finally {
      loading.value = false
    }
  }

  // 按设备过滤
  const computerHistory = computed(() => {
    const device = historyList.value.find(d => d.device_name === 'computer')
    return device ? device.record : []
  })

  const phoneHistory = computed(() => {
    const device = historyList.value.find(d => d.device_name === 'phone')
    return device ? device.record : []
  })

  // 格式化时间
  function formatTime(iso: string) {
    return dayjs(iso).format('YYYY-MM-DD HH:mm:ss')
  }

  function fromNow(iso: string) {
    return dayjs(iso).fromNow()
  }

  // 计算持续时间（秒）
  function duration(start: string, end: string) {
    const startMs = dayjs(start).valueOf()
    const endMs = dayjs(end).valueOf()
    const seconds = Math.floor((endMs - startMs) / 1000)
    if (seconds < 60) return `${seconds}秒`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}分${remainingSeconds}秒`
  }

  return {
    historyList,
    computerHistory,
    phoneHistory,
    loading,
    error,
    loadHistory,
    formatTime,
    fromNow,
    duration,
  }
})