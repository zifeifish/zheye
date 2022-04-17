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
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    // const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    // const toggleOpen = () => {
    //   isOpen.value = !isOpen.value
    // }

    const isClickOutSide = useClickOutSide(dropdownRef)
    // watch(isClickOutSide, () => {
    //   console.log(666, isOpen.value, isClickOutSide)

    //   // setup函数只执行一次,如果需要多次执行需监听isClickOutSide
    //   if (isOpen.value && isClickOutSide) {
    //     isOpen.value = false
    //   }
    // })
    return {
      isClickOutSide,
      // toggleOpen,
      dropdownRef // 返回的变量名与绑定的ref名称一致
    }
  }
})
</script>
