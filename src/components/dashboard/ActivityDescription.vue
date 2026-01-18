<template>
  <div class="activity-card">
    <!-- 成功提示条 -->
    <div v-if="showSuccess" class="success-banner">
      <el-icon class="success-icon"><i-ep-success /></el-icon>
      <span>{{ successMessage }}</span>
    </div>

    <!-- <h3>我正在。。。</h3> -->
    <div class="activity-content">
      <el-icon class="activity-icon"><i-ep-star /></el-icon>
      <p class="activity-text">{{ activity }}</p>
    </div>
    <p class="hint">正在玩 {{ activity }} </p>
    <p class="hint">看到我摆烂记得提醒我学习(￣y▽,￣)╭ </p>

    <!-- 根据 type 显示交互按钮 -->
    <div v-if="type" class="interaction-section">
      <div v-if="type === 'study'" class="study-section">
        <div v-if="!showSuccess" class="study-row">
          <p class="hint left-hint">点击后我会收到提醒哦～</p>
          <el-button
            class="glass-button study-button"
            size="small"
            :loading="isSending"
            @click="handleStudyClick"
          >
            提醒学习
          </el-button>
        </div>
        <div v-else class="success-placeholder">
          <p class="hint">提醒已发送！</p>
        </div>
      </div>

      <div v-else-if="type === 'game'" class="game-section">
        <div v-if="!showInput">
          <div v-if="!showSuccess" class="game-row">
            <p class="hint left-hint">点击后输入消息发送给我</p>
            <el-button
              class="glass-button game-button"
              size="small"
              @click="handleGameClick"
            >
              一起开黑
            </el-button>
          </div>
          <div v-else class="success-placeholder">
            <p class="hint">消息已发送！</p>
          </div>
        </div>
        <div v-else class="input-section">
          <el-input
            v-model="inputMessage"
            placeholder="输入消息"
            size="small"
            class="glass-input"
            @focus="pausePolling"
            @blur="resumePolling"
            @keyup.enter="handleSendMessage"
          />
          <div class="input-buttons">
            <el-button
              class="glass-button send-button"
              size="small"
              :loading="isSending"
              @click="handleSendMessage"
            >
              发送
            </el-button>
            <el-button
              class="glass-button cancel-button"
              size="small"
              @click="cancelInput"
            >
              取消
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star as IEpStar, CircleCheck as IEpSuccess } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useStatusStore } from '@/stores/statusStore'
import { sendNotification } from '@/services/api'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  activity: string
  type?: string
}>()

const statusStore = useStatusStore()
const isSending = ref(false)
const showInput = ref(false)
const inputMessage = ref('')
const showSuccess = ref(false)
const successMessage = ref('')

// 暂停轮询
const pausePolling = () => {
  statusStore.stopPolling()
}

// 恢复轮询
const resumePolling = () => {
  // 延迟恢复以避免立即触发
  setTimeout(() => {
    statusStore.startPolling()
  }, 100)
}

// 显示成功提示
const showSuccessBanner = (message: string) => {
  showSuccess.value = true
  successMessage.value = message
  // 3秒后隐藏
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const handleStudyClick = async () => {
  isSending.value = true
  try {
    await sendNotification('study')
    showSuccessBanner('提醒已发送！')
  } catch (error) {
    console.error('发送提醒失败:', error)
    ElMessage.error('发送失败，请重试')
  } finally {
    isSending.value = false
  }
}

const handleGameClick = () => {
  showInput.value = true
  pausePolling()
}

const handleSendMessage = async () => {
  if (!inputMessage.value.trim()) {
    ElMessage.warning('请输入消息')
    return
  }
  isSending.value = true
  try {
    await sendNotification('game', inputMessage.value)
    showSuccessBanner('消息已发送！')
    inputMessage.value = ''
    showInput.value = false
  } catch (error) {
    console.error('发送消息失败:', error)
    ElMessage.error('发送失败，请重试')
  } finally {
    isSending.value = false
    resumePolling()
  }
}

const cancelInput = () => {
  showInput.value = false
  inputMessage.value = ''
  resumePolling()
}
</script>

<style scoped lang="scss">
.activity-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
  }

  .activity-content {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    .activity-icon {
      font-size: 28px;
      color: #e6a23c;
    }

    .activity-text {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: #e6a23c;
    }
  }

  .hint {
    margin: 0;
    color: #909399;
    font-size: 14px;
    margin-top: 5px;
  }

  .interaction-section {
    margin-top: 5px;
    padding-top: 15px;
    border-top: 1px dashed rgba(255, 255, 255, 0.3);
  }

  .study-section,
  .game-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .study-row,
  .game-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
  }

  .left-hint {
    margin: 0;
    color: #909399;
    font-size: 14px;
    flex: none;
  }

  .input-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  // 成功横幅
  .success-banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, rgba(103, 194, 58, 0.9), rgba(67, 160, 71, 0.9));
    backdrop-filter: blur(10px);
    color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 12px 12px 0 0;
    z-index: 10;
    animation: slideDown 0.3s ease-out;

    .success-icon {
      font-size: 18px;
    }
  }

  // 毛玻璃按钮 - 更新为白色背景，更大尺寸
  .glass-button {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    color: #333;
    font-weight: 600;
    font-size: 14px;
    padding: 1px 12px;
    height: 24px;
    min-height: 36px;
    line-height: 24px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
      opacity: 0;
      transition: opacity 0.3s;
      border-radius: inherit;
    }

    &:hover {
      background: rgba(255, 255, 255, 1);
      border-color: rgba(255, 255, 255, 1);
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1);
      &::after {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(-1px) scale(0.98);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
      transition-duration: 0.1s;
    }

    // 加载状态
    &.is-loading {
      opacity: 0.8;
      cursor: not-allowed;
    }

    // 特定按钮颜色
    &.study-button {
      background: linear-gradient(135deg, rgba(64, 158, 255, 0.95), rgba(64, 158, 255, 0.8));
      border-color: rgba(64, 158, 255, 0.9);
      color: #fff;
      &:hover {
        background: linear-gradient(135deg, rgba(64, 158, 255, 1), rgba(64, 158, 255, 0.9));
        border-color: rgba(64, 158, 255, 1);
      }
    }

    &.game-button {
      background: linear-gradient(135deg, rgba(90, 212, 14, 0.5), rgba(205, 222, 196, 0.1));
      border-color: rgba(169, 255, 122, 0.9);
      color: #52bf60;
      &:hover {
        background: linear-gradient(135deg, rgba(132, 226, 88, 0.8), rgba(69, 203, 1, 0.9));
        border-color: rgb(17, 52, 0);
        color: #fff;
      }
    }

    &.send-button {
      background: linear-gradient(135deg, rgba(64, 158, 255, 0.95), rgba(64, 158, 255, 0.8));
      border-color: rgba(64, 158, 255, 0.9);
      color: #fff;
      &:hover {
        background: linear-gradient(135deg, rgba(64, 158, 255, 1), rgba(64, 158, 255, 0.9));
        border-color: rgba(64, 158, 255, 1);
      }
    }

    &.cancel-button {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(200, 200, 200, 0.8);
      color: #666;
      &:hover {
        background: rgba(255, 255, 255, 1);
        border-color: rgba(150, 150, 150, 0.9);
        color: #333;
      }
    }
  }

  // 毛玻璃输入框
  .glass-input {
    :deep(.el-input__wrapper) {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.6);
      }

      &:focus-within {
        background: rgba(255, 255, 255, 0.4);
        border-color: rgba(64, 158, 255, 0.8);
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
      }
    }

    :deep(.el-input__inner) {
      color: #333;
      &::placeholder {
        color: #999;
      }
    }
  }

  // 成功占位符
  .success-placeholder {
    text-align: center;
    padding: 10px;
    color: #67c23a;
    font-size: 14px;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>