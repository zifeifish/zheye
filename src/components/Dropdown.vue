<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownHandler = (e: MouseEvent) => {
      // e.target as HTMLElement 类型断言防止报错
      if (!dropdownRef.value?.contains(e.target as HTMLElement) && isOpen.value) {
        isOpen.value = false
      }
    }
    onMounted(() => {
      document.addEventListener('click', dropdownHandler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', dropdownHandler)
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef // 返回的变量名与绑定的ref名称一致
    }
  }
})
</script>
