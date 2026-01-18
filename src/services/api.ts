import axios from 'axios'
import type { StatusResponse, HistoryResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:11451/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 获取实时状态
 */
export async function fetchStatus(): Promise<StatusResponse> {
  const response = await api.get<StatusResponse>('/guest/record')
  return response.data
}

/**
 * 获取历史记录
 */
export async function fetchHistory(): Promise<HistoryResponse> {
  const response = await api.get<HistoryResponse>('/guest/history')
  return response.data
}

/**
 * 更新记录（管理员用，可选）
 */
export async function updateRecord(token: string, device: string, application: string, time?: string) {
  const response = await api.post('/admin/record', {
    token,
    device,
    application,
    time,
  })
  return response.data
}

/**
 * 发送通知
 */
export async function sendNotification(type: string, msg?: string) {
  const response = await api.post('/guest/notify', {
    type,
    msg,
  })
  return response.data
}

export default api