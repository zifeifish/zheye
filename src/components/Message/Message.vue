<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObject"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button type="button" class="btn-close" @click="hide"></button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { onUnmounted, PropType, ref } from 'vue'

export type MessageType = 'success' | 'error' | 'default';
export default {
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['colse-message'],
  setup (props: any, context: any) {
    // 创建message DOM并挂载到页面
    const node = document.createElement('div')
    node.id = 'message'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
    const isVisible = ref(true)
    // message样式
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      context.emit('colse-message', true)
    }
    return {
      isVisible,
      classObject,
      hide
    }
  }
}
</script>
<style></style>
