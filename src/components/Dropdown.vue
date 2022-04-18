<template>
  <div class="dropdown" ref="dropdownRef">
    <button class="btn btn-outline-light my-2 dropdown-toggle">
      {{ title }}
    </button>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isClickOutSide">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = useClickOutSide(dropdownRef)
    return {
      isClickOutSide,
      dropdownRef // 返回的变量名与绑定的ref名称一致
    }
  }
})
</script>
