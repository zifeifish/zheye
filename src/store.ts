import { ColumnProps, PostProps, testData, testPosts } from './testData'
import { createStore } from 'vuex'

/** 用户信息定义 */
interface UserProps {
  /** 是否登录 */
  isLogin: boolean,
  /** 名称 */
  name?: string,
  /** id */
  id?: number
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
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'hcy' }
    }
  }
})
export default store
