<template>
  <form action="">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <validtate-input :rules="emailRules"></validtate-input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
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

    return {
      emailRules
    }
  }
})
</script>
<style>
</style>
