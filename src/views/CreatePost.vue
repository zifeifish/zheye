<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" type="text" tag="textarea" placeholder="请输入文章详情" :rules="contentRules"
          v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">新建文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/Form/ValidtateInput.vue'
import ValidateForm from '../components/Form/ValidateForm.vue'
import { GlobalDataProps } from '@/store'
import { PostProps } from '@/testData'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { _id } = store.state.user
        if (_id) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            createdAt: new Date().toLocaleString().split('/').join('-'),
            columnId: 0
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: _id } })
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>
