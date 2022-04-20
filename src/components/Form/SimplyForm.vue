<template>
  <validate-form @form-submit="onFormSubmit($event)">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validtate-input
        ref="inputRef"
        placeholder="请输入邮箱地址"
        type="text"
        :rules="emailRules"
        v-model="emailVal"
      ></validtate-input>
      {{ emailVal }}
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <validtate-input
        placeholder="请输入密码"
        type="password"
        :rules="passwordRules"
      ></validtate-input>
    </div>
    <template #submit>
      <button class="btn btn-warning">具名插槽的按钮</button>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from 'vue'
import ValidtateInput, { RulesProp } from './ValidtateInput.vue'
import ValidateForm from './ValidateForm.vue'
import mitt from 'mitt'

// mitt3.0.0 定义一个events 类型, 这个定义是为了让事件与callback对应
type Events = {
  'form-item-created': string
}
// 创建一个实例化的mitt 将event作为泛型传入
export const InputEmitter = mitt<Events>()
export default defineComponent({
  name: 'SimplyForm',
  components: {
    ValidtateInput,
    ValidateForm
  },
  setup () {
    const emailRules = reactive<RulesProp>([
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ])
    const passwordRules = reactive<RulesProp>([
      { type: 'required', message: '密码不能为空' }
    ])
    const emailVal = ref('123@test.com')
    const inputRef = ref<any>()

    const onFormSubmit = (valid: boolean) => {
      console.log(666, valid)
      console.log(777, inputRef.value.validateInput())
    }
    // 监听回调
    const callback = (test: string) => {
      console.log('result', test)
    }
    // 添加监听
    // InputEmitter.on('form-item-created', test => console.log('off mitt', test))
    InputEmitter.on('form-item-created', callback)

    onUnmounted(() => {
      // 删除监听
      InputEmitter.off('form-item-created', test => console.log('off mitt', test))
    })

    return {
      emailRules,
      passwordRules,
      emailVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>
<style></style>
