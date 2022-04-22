import { ColumnProps, PostProps, testData, testPosts } from './testData'
import { createStore } from 'vuex'

/** 用户信息定义 */
interface UserProps {
  /** 是否登录 */
  isLogin: boolean,
  /** 名称 */
  name?: string,
  /** id */
  id?: number,
  /** 专栏Id */
  columnId?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false, columnId: 1 }
  },
  // 可以认为是store中的计算属性, getters的返回值会根据的它的依赖项缓存起来
  // 定义完毕，就可以在应用中使用这个 getter 了
  // Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'hcy' }
    },
    /**
     * 新建文章
     * @param state
     * @param newPost 文章详情
     */
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  }
})
export default store
