<template>
  <div class="mobile-home">
    <div v-if="statusStore.loading" class="loading">加载中...</div>
    <div v-else-if="statusStore.error" class="error">
      {{ statusStore.error }}
    </div>
    <div v-else>
      <!-- 活动描述 -->
      <activity-description
        class="mobile-card"
        :activity="primaryActivity"
      />

      <!-- 描述卡片 -->
      <description-card
        class="mobile-card"
        :description="primaryDescription"
      />

      <!-- 主设备状态卡片 -->
      <device-status-card
        class="mobile-card"
        :device="primaryDevice"
        :status="primaryStatus"
        :is-primary="true"
        :mobile="true"
      />

      <!-- 实时计时器 -->
      <live-timer
        class="mobile-card"
        :last-updated="statusStore.lastUpdated"
      />

      <!-- 另一设备状态（可折叠） -->
      <div class="mobile-card secondary-device">
        <h3 @click="toggleSecondary" class="secondary-title">
          <el-icon :class="{ rotated: secondaryExpanded }">
            <i-ep-arrow-right />
          </el-icon>
          另一设备状态
        </h3>
        <div v-if="secondaryExpanded">
          <device-status-card
            v-if="secondaryDevice"
            :device="secondaryDevice"
            :status="secondaryStatus"
            :is-primary="false"
            :mobile="true"
          />
          <div v-else class="offline-hint">
            <p>电脑似乎似了？</p>
          </div>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="mobile-card contact-info">
        <h3>来找我玩叭</h3>
        <p>Email: {{ userStore.profile.email }}</p>
        <p>
          GitHub:
          <a :href="userStore.profile.socialLinks.github" target="_blank">
            {{ userStore.profile.socialLinks.github }}
          </a>
        </p>
      </div>

      <!-- 头像卡片 -->
      <avatar-card class="mobile-card" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStatusStore } from '@/stores/statusStore'
import { useUserStore } from '@/stores/userStore'
import AvatarCard from '@/components/dashboard/AvatarCard.vue'
import DeviceStatusCard from '@/components/dashboard/DeviceStatusCard.vue'
import ActivityDescription from '@/components/dashboard/ActivityDescription.vue'
import LiveTimer from '@/components/dashboard/LiveTimer.vue'
import DescriptionCard from '@/components/dashboard/DescriptionCard.vue'
import { ArrowRight as IEpArrowRight } from '@element-plus/icons-vue'

const statusStore = useStatusStore()
const userStore = useUserStore()

// 初始化加载和轮询
onMounted(() => {
  statusStore.startPolling()
})

onUnmounted(() => {
  statusStore.stopPolling()
})

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

// 折叠状态
const secondaryExpanded = ref(false)
const toggleSecondary = () => {
  secondaryExpanded.value = !secondaryExpanded.value
}
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.mobile-home {
  padding-bottom: $spacing-3;
}

.mobile-card {
  background: #fff;
  border-radius: $border-radius;
  padding: $spacing-3;
  margin-bottom: $spacing-3;
  box-shadow: $box-shadow;
}

.loading, .error {
  text-align: center;
  padding: $spacing-4;
  color: $text-secondary;
}

.error {
  color: $danger-color;
}

.secondary-device {
  .secondary-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0;
    font-size: 16px;
    color: $text-color;

    .el-icon {
      margin-right: 8px;
      transition: transform 0.3s;

      &.rotated {
        transform: rotate(90deg);
      }
    }
  }

  .offline-hint {
    color: $text-light;
    font-style: italic;
    padding: $spacing-2 0;
  }
}

.contact-info {
  h3 {
    margin-bottom: $spacing-2;
    color: $primary-color;
  }

  p {
    margin: $spacing-1 0;
  }

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>