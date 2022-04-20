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
import mitt from 'mitt'
import { defineComponent, onUnmounted } from 'vue'
// 定义发射函数的类型
type Func = () => boolean
// mitt3.0.0 定义一个events 类型, 这个定义是为了让事件与callback对应
type Events = {
  'form-item-created': Func
}
// 创建一个实例化的mitt 将event作为泛型传入
export const InputEmitter = mitt<Events>()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => {
      // 执行事件集合的全部校验函数
      const result = funcArr.map(func => func()).every(valid => valid)
      context.emit('form-submit', result)
    }
    // 子组件发射出来的的事件集合
    const funcArr: Func[] = []
    // 监听回调
    const callback = (func: Func) => {
      funcArr.push(func)
    }
    // 添加监听
    // InputEmitter.on('form-item-created', test => console.log('off mitt', test))
    InputEmitter.on('form-item-created', callback)

    onUnmounted(() => {
      // 删除监听
      InputEmitter.off('form-item-created', test => console.log('off mitt', test))
    })
    return {
      submitForm
    }
  }
})
</script>
