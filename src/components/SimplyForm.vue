<template>
  <form action="">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="emailRef.val"
        @blur="validateEmail"
      />
      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
const emailReg = new RegExp(
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
)
export default defineComponent({
  name: 'SimplyForm',
  setup () {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    // 检验函数
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      } else {
        emailRef.error = false
        emailRef.message = ''
      }
    }

    return {
      emailRef,
      validateEmail
    }
  }
})
</script>
<style></style>
