<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          &copy; 2026 bluore在线状态监控系统. 保留所有权利.
        </div>
        <div class="links">
          <a href="https://github.com/example" target="_blank">
            <el-icon><i-ep-link /></el-icon> GitHub
          </a>
          <a href="https://blog.example.com" target="_blank">
            <el-icon><i-ep-link /></el-icon> 博客
          </a>
          <a href="mailto:admin@example.com">
            <el-icon><i-ep-message /></el-icon> 联系
          </a>
        </div>
      </div>
      <div class="footer-note">
        本项目仅供学习交流使用，数据来源于模拟 API。
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Link as IEpLink, Message as IEpMessage } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.app-footer {
  background: #2c3e50;
  color: #ecf0f1;
  padding: $spacing-4 0;
  margin-top: auto;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-3;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-3;
    flex-wrap: wrap;
    gap: $spacing-2;

    .copyright {
      font-size: $font-size-base;
    }

    .links {
      display: flex;
      gap: $spacing-3;

      a {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .footer-note {
    text-align: center;
    font-size: $font-size-sm;
    color: #95a5a6;
    border-top: 1px solid #34495e;
    padding-top: $spacing-3;
  }
}
</style>