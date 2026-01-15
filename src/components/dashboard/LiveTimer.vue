<template>
  <div class="live-timer">
    <h3>实时更新</h3>
    <div class="timer-content">
      <el-icon class="timer-icon"><i-ep-clock /></el-icon>
      <div class="timer-text">
        <!-- <p>最近更新于 <span class="time">{{ fromNow(lastUpdated) }}</span></p> -->
        <p class="next-update">下次更新在 {{ nextUpdateCountdown }} 秒后</p>
      </div>
    </div>
    <el-progress
      :percentage="progressPercentage"
      :stroke-width="8"
      :show-text="false"
      :color="progressColor"
    />
    <!-- <p class="hint">状态每30秒自动刷新</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock as IEpClock } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const props = defineProps<{
  lastUpdated: string
}>()

const now = ref(dayjs())
const timer = ref<number | null>(null)

// 更新当前时间每秒
onMounted(() => {
  timer.value = window.setInterval(() => {
    now.value = dayjs()
  }, 1000)
})

onUnmounted(() => {
  if (timer.value !== null) clearInterval(timer.value)
})

// const fromNow = (iso: string) => dayjs(iso).fromNow()

// 距离下次更新（30秒周期）
const nextUpdateCountdown = computed(() => {
  const last = dayjs(props.lastUpdated)
  const next = last.add(30, 'second')
  const diff = next.diff(now.value, 'second')
  return Math.max(0, diff)
})

// 进度条百分比（0-30秒）
const progressPercentage = computed(() => {
  const last = dayjs(props.lastUpdated)
  const elapsed = now.value.diff(last, 'second')
  const percent = (elapsed / 30) * 100
  return Math.min(100, Math.max(0, percent))
})

const progressColor = computed(() => {
  const percent = progressPercentage.value
  if (percent < 70) return '#67c23a'
  if (percent < 90) return '#e6a23c'
  return '#f56c6c'
})
</script>

<style scoped lang="scss">
.live-timer {
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    font-size: 18px;
  }

  .timer-content {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;

    .timer-icon {
      font-size: 28px;
      color: #3498db;
    }

    .timer-text {
      flex: 1;

      .time {
        font-weight: bold;
        color: #3498db;
      }

      .next-update {
        margin: 5px 0 0;
        font-size: 14px;
        color: #909399;
      }
    }
  }

  .hint {
    margin: 10px 0 0;
    font-size: 14px;
    color: #909399;
    text-align: center;
  }
}
</style>