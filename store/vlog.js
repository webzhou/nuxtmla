export const state = () => ({
  vList: [],
  totalcount: 0,
  currentPage: 1
})
export const mutations = {
  updateVList (state, data) {
    state.vList = data
  },
  setTotal (state, n) {
    state.totalcount = n
  },
  setCurrentPage (state, n) {
    state.currentPage = n
  }
}
export const actions = {
  // 获取vlog列表
  async updateVListActions ({ commit }, requestData) {
    try {
      const { data } = await this.$axios.$get(`${process.env.bilibiliUrl}/getSubmitVideos?mid=342641504&order=pubdate`, {
        params: requestData
      })
      commit('setTotal', data.data.count)
      commit('updateVList', data.data.vlist)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
