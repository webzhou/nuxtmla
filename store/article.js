export const state = () => ({
  detail: {},
  viewCount: 1
})
export const mutations = {
  setDetail (state, data) {
    state.detail = data
  },
  updateViewCount (state, data) {
    state.viewCount = data
  }
}
export const actions = {
  // 获取文章详情
  async updateSetDetailActions ({ commit }, id) {
    try {
      const { data } = await this.$axios.$get(`${process.env.baseUrl}/wp/v2/posts/${id}`, {
        data: { progress: false }
      })
      commit('setDetail', data)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 更新阅读量
  async updateViewCountActions ({ commit }, requestData) {
    try {
      const { data } = await this.$axios.$post(`${process.env.baseUrl}/api/view-count`, requestData, {
        headers: {
          progress: false
        }
      })
      commit('updateViewCount', data)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
