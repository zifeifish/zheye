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
      >
      </validtate-input>
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
      <button class="btn btn-primary">提交</button>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ValidtateInput, { RulesProp } from './ValidtateInput.vue'
import ValidateForm from './ValidateForm.vue'

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
    const emailVal = ref() // 邮箱
    const inputRef = ref<any>()

    const onFormSubmit = (valid: boolean) => {
      console.log(777, valid)
    }

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
