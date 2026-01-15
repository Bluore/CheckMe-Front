<template>
  <div class="background-animation">
    <div
      v-for="(shape, index) in shapes"
      :key="index"
      class="shape"
      :class="shape.type"
      :style="{
        width: shape.size + 'px',
        height: shape.size + 'px',
        left: shape.x + 'vw',
        top: shape.y + 'vh',
        opacity: shape.opacity,
        animationDuration: shape.duration + 's',
        animationDelay: shape.delay + 's',
        backgroundColor: shape.color,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Shape {
  type: 'square' | 'circle'
  size: number
  x: number
  y: number
  opacity: number
  duration: number
  delay: number
  color: string
}

const shapes = ref<Shape[]>([])
const numShapes = 25 // 图形数量

function generateRandomShape(): Shape {
  const types = ['square', 'circle'] as const
  const type = types[Math.floor(Math.random() * types.length)] as 'square' | 'circle'
  const size = Math.random() * 90 + 30 // 30px 到 120px
  const x = Math.random() * 100 // 百分比，将在 CSS 中转换为 vw/vh
  const y = Math.random() * 100
  const opacity = Math.random() * 0.4 + 0.15 // 0.15 到 0.55
  const duration = Math.random() * 40 + 40 // 40 到 80 秒
  const delay = Math.random() * 10
  const hue = Math.floor(Math.random() * 60) + 180 // 淡蓝色调范围 180-240
  const color = `hsla(${hue}, 70%, 70%, ${opacity})`
  return { type, size, x, y, opacity, duration, delay, color }
}

function initShapes() {
  const newShapes: Shape[] = []
  for (let i = 0; i < numShapes; i++) {
    newShapes.push(generateRandomShape())
  }
  shapes.value = newShapes
}

onMounted(() => {
  initShapes()
  // 可选：定期重新生成图形以保持动态
  // setInterval(() => {
  //   shapes.value = shapes.value.map(() => generateRandomShape())
  // }, 60000)
})

onUnmounted(() => {
  // 清理定时器（如果有）
})
</script>

<style scoped lang="scss">
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 置于最底层 */
  overflow: hidden;
  pointer-events: none; /* 不拦截鼠标事件 */
  backdrop-filter: blur(10px); /* 对下层内容进行模糊 */
  background: transparent;

  .shape {
    position: absolute;
    border-radius: 0;
    animation-name: float;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    filter: blur(2px); /* 轻微模糊图形本身 */

    &.circle {
      border-radius: 50%;
    }

    &.square {
      border-radius: 10%;
    }
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(calc(3vw * var(--dx)), calc(3vh * var(--dy))) rotate(90deg);
  }
  50% {
    transform: translate(calc(6vw * var(--dx)), calc(6vh * var(--dy))) rotate(180deg);
  }
  75% {
    transform: translate(calc(3vw * var(--dx)), calc(3vh * var(--dy))) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

/* 为每个形状生成随机的 --dx 和 --dy */
.shape:nth-child(odd) {
  --dx: 2;
  --dy: 1;
}
.shape:nth-child(even) {
  --dx: -1;
  --dy: 2;
}
.shape:nth-child(3n) {
  --dx: 1.5;
  --dy: -1.5;
}
.shape:nth-child(5n) {
  --dx: -2;
  --dy: -0.8;
}
.shape:nth-child(7n) {
  --dx: 0.8;
  --dy: 2.5;
}
.shape:nth-child(11n) {
  --dx: -2.5;
  --dy: 0.5;
}
</style>