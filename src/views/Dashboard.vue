<template>
  <div class="dashboard">
    <div class="main-content">
      <!-- 主栏 -->
      <div class="primary-column">
        <h1>视奸我在干什么 O.O</h1>
        <div v-if="statusStore.loading">加载中...</div>
        <div v-else-if="statusStore.error" class="error">
          {{ statusStore.error }}
        </div>
        <div v-else>
          <description-card :description="primaryDescription" />
          <activity-description :activity="primaryActivity" />
          <device-status-card
          :device="primaryDevice"
          :status="primaryStatus"
          :is-primary="true"
          />
          <avatar-card />
          <live-timer :last-updated="statusStore.lastUpdated" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="sidebar">
        <h3>另一设备状态</h3>
        <device-status-card
          v-if="secondaryDevice"
          :device="secondaryDevice"
          :status="secondaryStatus"
          :is-primary="false"
        />
        <div v-else class="offline-hint">
          <p>电脑似乎似了？</p>
        </div>

        <div class="contact-info">
          <h3>来找我玩叭</h3>
          <p>Email: {{ userStore.profile.email }}</p>
          <p>
            GitHub:
            <a :href="userStore.profile.socialLinks.github" target="_blank">
              {{ userStore.profile.socialLinks.github }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useStatusStore } from '@/stores/statusStore'
import { useUserStore } from '@/stores/userStore'
import AvatarCard from '@/components/dashboard/AvatarCard.vue'
import DeviceStatusCard from '@/components/dashboard/DeviceStatusCard.vue'
import ActivityDescription from '@/components/dashboard/ActivityDescription.vue'
import LiveTimer from '@/components/dashboard/LiveTimer.vue'
import DescriptionCard from '@/components/dashboard/DescriptionCard.vue'

const statusStore = useStatusStore()
const userStore = useUserStore()

// 计算主设备
const primaryDevice = computed(() => statusStore.primaryDevice)
const primaryStatus = computed(() => {
  if (primaryDevice.value === 'computer') return statusStore.computerStatus ?? null
  if (primaryDevice.value === 'phone') return statusStore.phoneStatus ?? null
  return null
})
const primaryActivity = computed(() => {
  if (!primaryStatus.value) return '似乎似了'
  return statusStore.displayAppName(primaryStatus.value)
})
const primaryDescription = computed(() => primaryStatus.value?.data?.description)

// 计算副设备
const secondaryDevice = computed(() => {
  if (primaryDevice.value === 'computer') return 'phone'
  if (primaryDevice.value === 'phone') return 'computer'
  return null
})
const secondaryStatus = computed(() => {
  if (secondaryDevice.value === 'computer') return statusStore.computerStatus ?? null
  if (secondaryDevice.value === 'phone') return statusStore.phoneStatus ?? null
  return null
})

// 初始化加载和轮询
onMounted(() => {
  statusStore.startPolling()
})

onUnmounted(() => {
  statusStore.stopPolling()
})
</script>

<style scoped lang="scss">
.dashboard {
  padding: 20px;
}

.main-content {
  display: flex;
  gap: 30px;
}

.primary-column {
  flex: 3;
}

.sidebar {
  flex: 1;
  border-left: 1px solid #e0e0e0;
  padding-left: 20px;
}

.error {
  color: #f56c6c;
  padding: 10px;
  background: #fef0f0;
  border-radius: 4px;
}

.offline-hint {
  color: #909399;
  font-style: italic;
}

.contact-info {
  margin-top: 30px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}
</style>