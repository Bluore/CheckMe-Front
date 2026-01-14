/**
 * 检测当前设备是否为移动设备（基于用户代理）
 * @returns boolean
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false // SSR 环境默认非移动
  }
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'android', 'iphone', 'ipod', 'ipad', 'windows phone', 'blackberry',
    'webos', 'opera mini', 'iemobile', 'mobile', 'tablet'
  ]
  return mobileKeywords.some(keyword => userAgent.includes(keyword))
}

/**
 * 检测屏幕宽度是否为移动设备尺寸（可选）
 * @returns boolean
 */
export function isMobileScreen(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return window.innerWidth <= 768
}

/**
 * 综合判断：用户代理为移动设备或屏幕宽度较小
 */
export function shouldRedirectToMobile(): boolean {
  return isMobileDevice() || isMobileScreen()
}