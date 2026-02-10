<template>
  <div class="dashboard-overview">
    <div v-if="statusStore.loading" class="loading">加载中...</div>
    <div v-else-if="statusStore.error" class="error">
      {{ statusStore.error }}
    </div>
    <div v-else class="overview-content">
      <!-- 描述 -->
      <div class="description-section">
        <p class="description">{{ description }}</p>
      </div>

      <!-- 正在使用的应用名 -->
      <div class="app-section">
        <div class="using-text">正在使用</div>
        <div class="app-name">{{ appName }}</div>
      </div>

      <!-- 两个按钮 -->
      <div class="buttons-section">
        <button class="btn btn-message" @click="openMessageModal">
          稍一句话
        </button>
        <button class="btn btn-tap" @click="tapTap">
          戳一戳
        </button>
      </div>
    </div>

    <!-- 留言弹窗 -->
    <div v-if="showMessageModal" class="modal-overlay" @click.self="closeMessageModal">
      <div class="modal-content message-modal">
        <h3 class="modal-title">稍一句话</h3>
        <div class="modal-body">
          <el-input
            v-model="modalMessage"
            type="textarea"
            :rows="4"
            placeholder="输入你想说的话..."
            class="message-input"
            :autosize="{ minRows: 4, maxRows: 6 }"
          />
          <div class="modal-actions">
            <button class="btn btn-cancel" @click="closeMessageModal">取消</button>
            <button 
              class="btn btn-confirm" 
              @click="sendMessage"
              :disabled="!modalMessage.trim()"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 状态提示弹窗 -->
    <div v-if="showStatusModal" class="modal-overlay">
      <div class="modal-content status-modal">
        <div class="status-icon" :class="statusModalType">
          <el-icon v-if="statusModalType === 'loading'" class="loading-icon">
            <i-ep-loading />
          </el-icon>
          <el-icon v-else-if="statusModalType === 'success'" class="success-icon">
            <i-ep-check />
          </el-icon>
          <el-icon v-else class="error-icon">
            <i-ep-close />
          </el-icon>
        </div>
        <div class="status-text">{{ statusModalText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStatusStore } from '@/stores/statusStore'
import { sendNotification } from '@/services/api'
import { Loading as IEpLoading, Check as IEpCheck, Close as IEpClose } from '@element-plus/icons-vue'

const statusStore = useStatusStore()

// 初始化加载和轮询
onMounted(() => {
  statusStore.startPolling()
  startAutoRefresh()
})

onUnmounted(() => {
  statusStore.stopPolling()
  stopAutoRefresh()
})

// 计算主设备状态
const primaryDevice = computed(() => statusStore.primaryDevice)
const primaryStatus = computed(() => {
  if (primaryDevice.value === 'computer') return statusStore.computerStatus ?? null
  if (primaryDevice.value === 'phone') return statusStore.phoneStatus ?? null
  return null
})

// 计算属性
const description = computed(() => {
  return primaryStatus.value?.data?.description || ''
})

const appName = computed(() => {
  return statusStore.displayAppName(primaryStatus.value) || '神秘应用'
})

// 弹窗状态
const showMessageModal = ref(false)
const showStatusModal = ref(false)
const modalMessage = ref('')
const statusModalType = ref<'loading' | 'success' | 'error'>('loading')
const statusModalText = ref('')

// 自动刷新定时器
const refreshTimer = ref<number | null>(null)

// 戳一戳功能
const tapTap = async () => {
  showStatusModal.value = true
  statusModalType.value = 'loading'
  statusModalText.value = '发送中...'
  
  try {
    await sendNotification('TapTap', '')
    statusModalType.value = 'success'
    statusModalText.value = '戳一戳发送成功！'
  } catch (error) {
    statusModalType.value = 'error'
    statusModalText.value = '发送失败，请重试'
  }
  
  // 2秒后自动关闭
  setTimeout(() => {
    showStatusModal.value = false
  }, 2000)
}

// 打开留言弹窗
const openMessageModal = () => {
  modalMessage.value = ''
  showMessageModal.value = true
}

// 关闭留言弹窗
const closeMessageModal = () => {
  showMessageModal.value = false
}

// 发送留言
const sendMessage = async () => {
  if (!modalMessage.value.trim()) {
    return
  }
  
  showMessageModal.value = false
  showStatusModal.value = true
  statusModalType.value = 'loading'
  statusModalText.value = '发送中...'
  
  try {
    await sendNotification('DropLine', modalMessage.value)
    statusModalType.value = 'success'
    statusModalText.value = '留言发送成功！'
  } catch (error) {
    statusModalType.value = 'error'
    statusModalText.value = '发送失败，请重试'
  }
  
  // 2秒后自动关闭
  setTimeout(() => {
    showStatusModal.value = false
  }, 2000)
}

// 启动自动刷新（每10秒）
const startAutoRefresh = () => {
  stopAutoRefresh()
  refreshTimer.value = window.setInterval(() => {
    statusStore.loadStatus()
  }, 10000) // 10秒
}

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshTimer.value !== null) {
    clearInterval(refreshTimer.value)
    refreshTimer.value = null
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.dashboard-overview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #000000;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.overview-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.loading, .error {
  text-align: center;
  padding: $spacing-4;
  color: $text-secondary;
}

.error {
  color: $danger-color;
}

.description-section {
  margin-bottom: 50px;
  
  .description {
    font-size: 22px;
    line-height: 1.6;
    color: #333;
    margin: 0;
  }
}

.app-section {
  margin-bottom: 60px;
  
  .using-text {
    font-size: 18px;
    color: #666;
    margin-bottom: 12px;
  }
  
  .app-name {
    font-size: 36px;
    font-weight: bold;
    color: #000;
    line-height: 1.2;
  }
}

.buttons-section {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-top: 40px;
  
  .btn {
    padding: 18px 36px;
    border-radius: 16px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    min-width: 160px;
    
    &:active {
      transform: scale(0.98);
    }
    
    &-message {
      background: linear-gradient(135deg, #409EFF20, #66b1ff20);
      color: rgb(114, 222, 255);
      box-shadow: inset 0 6px 20px rgba(64, 158, 255, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #66b1ff, #409EFF);
        box-shadow: 0 8px 24px rgba(64, 158, 255, 0.4);
      }
    }
    
    &-tap {
      background: linear-gradient(135deg, #67C23A2f, #85ce612f);
      color: rgb(65, 160, 41);
      box-shadow: 0 6px 20px rgba(103, 194, 58, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #85ce61, #67C23A);
        box-shadow: 0 8px 24px rgba(103, 194, 58, 0.4);
      }
    }
  }
}

// 弹窗样式
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  max-width: 90%;
  width: 400px;
  animation: slideIn 0.3s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.message-modal {
  .modal-title {
    margin: 0 0 16px 0;
    font-size: 20px;
    color: #000;
    text-align: center;
  }
  
  .modal-body {
    .message-input {
      margin-bottom: 20px;
      
      :deep(.el-textarea__inner) {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        color: #000;
        
        &:focus {
          border-color: #409EFF;
          box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
        }
      }
    }
    
    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      
      .btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        
        &-cancel {
          background: #f0f0f0;
          color: #666;
          
          &:hover {
            background: #e0e0e0;
          }
        }
        
        &-confirm {
          background: #409EFF;
          color: white;
          
          &:hover:not(:disabled) {
            background: #66b1ff;
          }
          
          &:disabled {
            background: #c0c4cc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

.status-modal {
  text-align: center;
  padding: 32px 24px;
  
  .status-icon {
    margin-bottom: 16px;
    font-size: 48px;
    
    .el-icon {
      font-size: inherit;
      
      &.loading-icon {
        animation: spin 1s linear infinite;
        color: #409EFF;
      }
      
      &.success-icon {
        color: #67C23A;
      }
      
      &.error-icon {
        color: #F56C6C;
      }
    }
  }
  
  .status-text {
    font-size: 16px;
    color: #000;
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>