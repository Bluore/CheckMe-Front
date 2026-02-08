import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile } from '@/services/types'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile>({
    name: 'bluore',
    avatar: '/image/avatar.png',
    email: 'a@bluore.top',
    socialLinks: {
      github: 'https://github.com/Bluore',
      twitter: 'https://x.com/a_ekac',
      wechat: 'wx',
      blog: 'https://bluore.top',
    },
  })

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    profile.value = { ...profile.value, ...newProfile }
  }

  return {
    profile,
    updateProfile,
  }
})