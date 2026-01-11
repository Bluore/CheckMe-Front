import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile } from '@/services/types'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile>({
    name: 'bluore',
    avatar: '/image/avatar.png',
    email: '1bluore@gmail.com',
    socialLinks: {
      github: 'https://github.com/Bluore',
      twitter: 'https://x.com/a_ekac',
      wechat: 'wxid_g3fvsh88mecy22',
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