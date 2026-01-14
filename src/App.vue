<template>
  <div id="app">
    <app-header v-if="!isMobileRoute" />
    <main class="main-content" :class="{ 'mobile-main': isMobileRoute }">
      <router-view />
    </main>
    <app-footer v-if="!isMobileRoute" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'

const route = useRoute()
const isMobileRoute = computed(() => route.path.startsWith('/mobile'))
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  &.mobile-main {
    padding: 0;
    max-width: none;
    margin: 0;
  }
}
</style>
