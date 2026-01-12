<template>
  <div class="about-page">
    <h1>关于</h1>
    <p class="subtitle">监视我？</p>

    <div class="sections">
      <section-card title="项目介绍">
        <p>看见我打开铲铲说明我在上课，打开B站说明我在厕所没出来，如果我🛫说明我要睡觉🛌了，如果我似太久了快联系我👻</p>
        <p>前端支持: DeepSeek-chat-v3.2</p>
        <p>后端支持: 代码纯手工无添加，零糖零脂零智能体</p>
        <p>手机端统计: ROOT + KSU + MKshell</p>
        <p>电脑端统计: python + TkinterUI</p>
      </section-card>

      <section-card title="技术栈">
        <ul>
          <li><strong>后端框架</strong>: Gin, Gorm</li>
          <li><strong>数据库</strong>: MySQL</li>
          <li><strong>前端框架</strong>: Vue 3 (Composition API)</li>
          <li><strong>构建工具</strong>: Vite</li>
          <li><strong>UI 组件库</strong>: Element Plus</li>
          <li><strong>状态管理</strong>: Pinia</li>
          <li><strong>路由</strong>: Nginx</li>
        </ul>
      </section-card>

      <section-card title="联系方式">
        <p>(～￣▽￣)～来找我玩吧</p>
        <ul>
          <li>QQ：2260762800</li>
          <li>邮箱: {{ userStore.profile.email }}</li>
          <li>GitHub: <a :href="userStore.profile.socialLinks.github" target="_blank">{{ userStore.profile.socialLinks.github }}</a></li>
          <li>博客: <a :href="userStore.profile.socialLinks.blog" target="_blank">{{ userStore.profile.socialLinks.blog }}</a></li>
        </ul>
      </section-card>

      <section-card title="更新日志">
        <ul>
          <li><strong>v1.0.0</strong> (2026-01-11) - 嘿嘿，智能体加持前端开发，反正代码能跑了，功能能用了ヾ(≧▽≦*)o</li>
          <li><strong>v0.1.0</strong> (2026-01-10) - 项目启动，完成后端Golang的基本的骨架，纯手工写累丝了￣へ￣</li>
          <li><strong>v0.0.0</strong> (2025-??-??) - 项目构思，其实很早之前就想写了，懒癌发作，没有动工</li>
        </ul>
      </section-card>

      <section-card title="其他">
        <p>本项目开源，代码仓库位于 <a href="https://github.com/Bluore/CheckMe" target="_blank">GitHub</a>。</p>
        <p>如有建议或问题，欢迎提交 Issue 或 Pull Request。</p>
      </section-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import SectionCard from '@/components/about/SectionCard.vue'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.about-page {
  padding: 20px;

  h1 {
    margin-top: 0;
    color: #333;
  }

  .subtitle {
    color: #666;
    margin-bottom: 30px;
  }

  .sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
}
</style>