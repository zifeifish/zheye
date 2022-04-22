<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ColumnList from '../../components/ColumnList.vue'
// 引入useStore
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    // 传入定义好的类型 GlobalDataProps
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)

    // 定义完毕，就可以在应用中使用这个 getter 了
    // Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
    const biggerColumnsLen = computed(() => store.getters.biggerColumnsLen)

    return {
      list,
      biggerColumnsLen
    }
  }
})
</script>
