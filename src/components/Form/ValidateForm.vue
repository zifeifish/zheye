<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, provide } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean;
type ClearFunc = () => void;
// 定义发射函数的类型
interface CallbackProps {
  validator: ValidateFunc;
  clearInput: ClearFunc;
  formName: string | undefined;
}
// mitt3.0.0 定义一个events 类型, 这个定义是为了让事件与callback对应
type Events = {
  'form-item-created': CallbackProps
}
export const emitter = mitt<Events>()
export default defineComponent({
  emits: ['form-submit'],
  props: {
    // 请提供不同的 formName 当使用多个表单在同一个页面中的时候
    name: {
      type: String,
      default: 'default'
    }
  },
  setup (props, context) {
    provide('formName', props.name)
    let funcArr: ValidateFunc[] = []
    let clearArr: ClearFunc[] = []
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result)
      context.emit('form-submit', result)
    }
    const callback = (obj?: CallbackProps) => {
      if (obj && obj.formName === props.name) {
        funcArr.push(obj.validator)
        clearArr.push(obj.clearInput)
      }
    }
    const clearInputs = () => {
      clearArr.forEach((clear) => clear())
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
      clearArr = []
    })
    return {
      submitForm,
      clearInputs
    }
  }
})
</script>
