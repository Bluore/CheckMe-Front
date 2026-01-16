<template>
  <div class="history-page">
    <h1>历史记录</h1>
    <p class="subtitle">最近2小时的活动记录</p>

    <div v-if="historyStore.loading">加载中...</div>
    <div v-else-if="historyStore.error" class="error">
      {{ historyStore.error }}
    </div>
    <div v-else>
      <el-tabs v-model="activeTab" type="border-card">
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
.history-page {
  padding: 20px;

  h1 {
    margin-top: 0;
    color: #333;
  }

  .subtitle {
    color: #666;
    margin-bottom: 30px;
  }

  .error {
    color: #f56c6c;
    padding: 10px;
    background: #fef0f0;
    border-radius: 4px;
  }

  :deep(.el-tabs--border-card) {
    background: transparent;
    backdrop-filter: blur(10px);
    border-color: rgba(255, 255, 255, 0.2);
  }

  :deep(.el-tabs--border-card .el-tabs__header) {
    background-color: rgba(255, 255, 255, 0.1);
  }

  :deep(.el-tabs--border-card .el-tabs__item) {
    color: #333;
  }

  :deep(.el-tabs--border-card .el-tabs__item.is-active) {
    color: #409eff;
    background-color: rgba(64, 158, 255, 0.1);
  }
}
</style>