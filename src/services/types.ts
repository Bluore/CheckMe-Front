/**
 * 设备类型
 */
export type DeviceType = 'computer' | 'phone'

/**
 * 设备数据（额外信息）
 */
export interface DeviceData {
  app_name?: string
  description?: string
  charge?: number
  location?: string
  is_hide_music?: boolean
  music_name?: string
  type?: string
  is_disable?: boolean
}

/**
 * 设备状态（实时）
 */
export interface DeviceStatus {
  device: DeviceType
  application: string
  start_time: string // ISO 8601
  update_time: string // ISO 8601
  ip?: string
  duration?: number // 秒
  data?: DeviceData
}

/**
 * 历史记录项
 */
export interface HistoryRecord {
  device: DeviceType
  application: string
  start_time: string
  update_time: string
  data?: DeviceData
}

/**
 * 历史记录分组（按设备）
 */
export interface DeviceHistory {
  device_name: DeviceType
  record: HistoryRecord[]
}

/**
 * API 响应格式（通用）
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 实时状态 API 响应
 */
export type StatusResponse = ApiResponse<{
  device_list: DeviceStatus[]
}>

/**
 * 历史记录 API 响应
 */
export type HistoryResponse = ApiResponse<{
  list: DeviceHistory[]
}>

/**
 * 用户个人信息
 */
export interface UserProfile {
  name: string
  avatar: string
  email: string
  socialLinks: {
    github?: string
    twitter?: string
    wechat?: string
    blog?: string
  }
}