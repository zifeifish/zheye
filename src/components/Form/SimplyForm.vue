<template>
  <form action="">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validtate-input
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
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ValidtateInput, { RulesProp } from './ValidtateInput.vue'

export default defineComponent({
  name: 'SimplyForm',
  components: {
    ValidtateInput
  },
  setup () {
    const emailRules = reactive<RulesProp>([
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ])
    const passwordRules = reactive<RulesProp>([
      { type: 'required', message: '密码不能为空' }
    ])
    const emailVal = ref('哈哈哈')

    return {
      emailRules,
      passwordRules,
      emailVal
    }
  }
})
</script>
<style></style>
