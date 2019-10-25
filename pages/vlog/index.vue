<template>
  <div>
    <Header />
    <main class="py-4 py-lg-5">
      <div class="container-fluid">
        <div class="row">
          <div v-for="vListItem in vList" :key="vListItem.id" class="list-item-content col-lg-3 col-md-4 col-sm-6 mt-3">
            <div class="media shadow-2x">
              <a :href="vListItem.aid | bilibiliaid">
                <div class="media-c" :style="{backgroundImage: 'url( '+ vListItem.pic +')'}" />
              </a>
            </div>
            <div class="text-lg h-2x mt-3">
              <a class="list-title" :href="vListItem.aid | bilibiliaid">
                {{ vListItem.title }}
              </a>
            </div>
            <div class="list-f d-flex">
              <div class="text-xs text-muted">
                <span class="d-inline-block">
                  {{ vListItem.created | formatDate }}
                </span>
                <i class="text-primary px-2">•</i>
                <span class="d-inline-block">{{ vListItem.length }}</span>
                <i class="text-primary px-2">•</i>
                <span class="d-inline-block">浏览:{{ vListItem.play }}</span>
              </div>
            </div>
          </div>
          <div class="col-12 mt-5">
            <el-pagination
              layout="pager"
              class="mt-3"
              :page-size="12"
              :current-page="currentPage"
              :total="totalcount"
              @current-change="_changePagination"
            />
          </div>
        </div>
        <!--row-->
      </div>
      <!--container-->
    </main>
    <Footer />
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'Vlog',
  components: {
    Header,
    Footer
  },
  watchQuery: ['page', 'pagesize'],
  filters: {
    formatDate (value) {
      const date = new Date(value * 1000)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    bilibiliaid (aid) {
      return 'https://www.bilibili.com/video/av' + aid
    }
  },
  computed: {
    ...mapState('vlog', ['vList', 'totalcount', 'currentPage'])
  },
  fetch ({ store, query }) {
    store.commit('vlog/setCurrentPage', +query.page)
    return store.dispatch('vlog/updateVListActions', {
      page: query.page,
      pagesize: 12,
      tag_ID: 1101,
      _embed: true
    })
  },
  methods: {
    _changePagination (page) {
      this.$store.commit('vlog/setCurrentPage', page)
      this.$router.push({
        path: this.$route.path,
        query: {
          page,
          pagesize: 12,
          tag_ID: 1101
        }
      })
    }
  },
  head () {
    return {
      title: 'vlog',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'vlog' },
        { hid: 'description', name: 'description', content: 'vlog' }
      ]
    }
  }
}
</script>

<style>

</style>
