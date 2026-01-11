<template>
  <div class="section-card">
    <h3>{{ title }}</h3>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.section-card {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    font-size: 20px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
  }

  .content {
    flex: 1;
    color: #555;

    p {
      margin: 0 0 10px;
      line-height: 1.6;
    }

    ul {
      margin: 0;
      padding-left: 20px;

      li {
        margin-bottom: 8px;
      }
    }

    a {
      color: #3498db;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>