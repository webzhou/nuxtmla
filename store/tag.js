export const state = () => ({
  postList: [],
  total: 0,
  currentPage: 1
})
export const mutations = {
  updatePostList (state, data) {
    state.postList = data
  },
  setTotal (state, n) {
    state.total = n
  },
  setCurrentPage (state, n) {
    state.currentPage = n
  }
}
export const actions = {
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
