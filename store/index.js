export const state = () => ({
  adList: [],
  tagList: [],
  newestList: [],
  postList: [],
  total: 0,
  currentPage: 1,
  categoryList: []
})
export const mutations = {
  updateAdList (state, data) {
    state.adList = data
  },
  updateTagList (state, data) {
    state.tagList = data
  },
  updateNewestList (state, data) {
    state.newestList = data
  },
  updatePostList (state, data) {
    state.postList = data
  },
  setTotal (state, n) {
    state.total = n
  },
  setCurrentPage (state, n) {
    state.currentPage = n
  },
  updateCategoryList (state, data) {
    state.categoryList = data
  }
}
export const actions = {
  // 获取公共数据
  async nuxtServerInit ({ commit }) {
    try {
      const { data: adList } = await this.$axios.$get(`${process.env.apiUrl}/ad.json`)
      const { data: tagList } = await this.$axios.$get(`${process.env.baseUrl}/wp/v2/tags`)
      const { data: categoryList } = await this.$axios.$get(`${process.env.baseUrl}/wp/v2/categories`)
      const { data: newestList } = await this.$axios.$get(`${process.env.baseUrl}/wp/v2/posts/?per_page=5&page=1`)
      commit('updateAdList', adList)
      commit('updateTagList', tagList)
      commit('updateCategoryList', categoryList)
      commit('updateNewestList', newestList)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取文章列表
  async updatePostListActions ({ commit }, requestData) {
    try {
      const { data, headers } = await this.$axios.$get(`${process.env.baseUrl}/wp/v2/posts`, {
        params: requestData,
        data: { progress: false }
      })
      commit('setTotal', +headers['x-wp-total'])
      commit('updatePostList', data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
