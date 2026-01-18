<template>
  <div class="avatar-card">
    <el-avatar :size="100" :src="userStore.profile.avatar" />
    <div class="info">
      <h2>{{ userStore.profile.name }}</h2>
      <p class="email">{{ userStore.profile.email }}</p>
      <div class="social-links">
        <a
          v-if="userStore.profile.socialLinks.github"
          :href="userStore.profile.socialLinks.github"
          target="_blank"
        >
          <el-icon><i-ep-link /></el-icon> GitHub
        </a>
        <!-- <a
          v-if="userStore.profile.socialLinks.twitter"
          :href="userStore.profile.socialLinks.twitter"
          target="_blank"
        >
          <el-icon><i-ep-link /></el-icon> Twitter
        </a> -->
        <a
          v-if="userStore.profile.socialLinks.wechat"
          href="tencent://message/?uin=2260762800&Site=qq&Menu=yes"
        >
          <el-icon><i-ep-link /></el-icon> QQ
        </a>
        <a
          v-if="userStore.profile.socialLinks.blog"
          :href="userStore.profile.socialLinks.blog"
          target="_blank"
        >
          <el-icon><i-ep-link /></el-icon> Blog
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { Link as IEpLink } from '@element-plus/icons-vue'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.avatar-card {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;

  .info {
    h2 {
      margin: 0 0 8px;
      font-size: 24px;
      color: #333;
    }

    .email {
      margin: 0 0 12px;
      color: #666;
      font-size: 14px;
    }

    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      a {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: #3498db;
        text-decoration: none;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>