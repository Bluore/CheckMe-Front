<template>
  <div class="mobile-history">
    <h2>历史记录</h2>
    <p class="subtitle">最近2小时的活动记录</p>

    <div v-if="historyStore.loading" class="loading">加载中...</div>
    <div v-else-if="historyStore.error" class="error">
      {{ historyStore.error }}
    </div>
    <div v-else>
      <el-tabs v-model="activeTab" type="card" class="mobile-tabs">
        <el-tab-pane label="电脑记录" name="computer">
          <history-list :records="historyStore.computerHistory" device="computer" />
        </el-tab-pane>
        <el-tab-pane label="手机记录" name="phone">
          <history-list :records="historyStore.phoneHistory" device="phone" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHistoryStore } from '@/stores/historyStore'
import HistoryList from '@/components/history/HistoryList.vue'

const historyStore = useHistoryStore()
const activeTab = ref('computer')

onMounted(() => {
  historyStore.loadHistory()
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.mobile-history {
  padding: $spacing-3;

  h2 {
    margin-top: 0;
    color: $primary-color;
    font-size: 20px;
  }

  .subtitle {
    color: $text-secondary;
    margin-bottom: $spacing-3;
    font-size: 14px;
  }

  .loading, .error {
    text-align: center;
    padding: $spacing-4;
    color: $text-secondary;
  }

  .error {
    color: $danger-color;
  }

  .mobile-tabs {
    :deep(.el-tabs__nav) {
      width: 100%;
      display: flex;
    }

    :deep(.el-tabs__item) {
      flex: 1;
      text-align: center;
    }
  }
}
</style>