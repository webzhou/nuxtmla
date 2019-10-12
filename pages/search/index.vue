<template>
  <div>
    <Header />
    <main class="py-4 py-lg-5">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-8">
            <div class="widget widget-search mb-5">
              <div class="widget-content">
                <div class="search-input form-group mb-4">
                  <input
                    v-model="searchText"
                    type="text"
                    :placeholder="placeholderText"
                    class="form-control"
                    required=""
                    @keyup.enter="_search"
                  >
                  <button class="btn" type="button" @click="_search">
                    <i class="iconfont icon-search-outline" />
                  </button>
                </div>
              </div>
            </div>
            <div v-if="this.$route.query.s">
              关于
              <span class="title h3 font-weight-bold font-theme">`{{ this.$route.query.s }}`
              </span>
              的文章
            </div>
            <section class="post-list list-grid list-bordered my-n4">
              <div v-if="postList.length == 0" class="mt-5 mb-5">
                暂无内容！
              </div>
              <div v-for="postListItem in postList" :key="postListItem.id" class="list-item-content">
                <!--无特色图片&&文章内不含有图片-->
                <div v-if="!postListItem.article_info.fimg_url&&postListItem.article_info.otherimages.length == 0" class="list-item">
                  <div class="list-item">
                    <div class="list-c py-lg-2">
                      <div class="list-b">
                        <div class="text-lg h-2x">
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="list-title" v-text="postListItem.title.rendered" />
                        </div>
                        <div class="d-none d-md-block text-sm text-muted mt-3">
                          <div class="h-3x" v-text="postListItem.excerpt.rendered" />
                        </div>
                      </div>
                      <div class="list-f d-flex">
                        <div class="text-xs text-muted">
                          <span class="d-inline-block">
                            {{ postListItem.article_info.classify[0].name }}
                          </span>
                          <i class="text-primary px-2">•</i>
                          <span class="d-inline-block">{{ postListItem.date }}</span>
                          <i class="text-primary px-2">•</i>
                          <span class="d-inline-block">浏览:{{ postListItem.article_info.viewCount }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--有特色图片&&文章内不含有图片-->
                <div v-else-if="postListItem.article_info.fimg_url&&postListItem.article_info.otherimages.length < 3" class="list-item">
                  <div class="list-c py-lg-2">
                    <div class="list-b ">
                      <div class="text-lg h-2x">
                        <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="list-title" v-text="postListItem.title.rendered" />
                      </div>
                      <div class="d-none d-md-block text-sm text-muted mt-3">
                        <div class="h-3x" v-text="postListItem.excerpt.rendered" />
                      </div>
                    </div>
                    <div class="list-f d-flex">
                      <div class="text-xs text-muted">
                        <span class="d-inline-block">
                          {{ postListItem.article_info.classify[0].name }}
                        </span>
                        <i class="text-primary px-2">•</i>
                        <span class="d-inline-block">{{ postListItem.date }}</span>
                        <i class="text-primary px-2">•</i>
                        <span class="d-inline-block">浏览:{{ postListItem.article_info.viewCount }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="list-i col-3">
                    <div class="media shadow">
                      <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="media-c" :style="{backgroundImage: 'url( '+ postListItem.article_info.fimg_url +')'}" />
                    </div>
                  </div>
                </div>
                <!--有特色图片&&文章内含有至少3个图片-->
                <div v-else class="list-item">
                  <div class="list-c py-lg-1">
                    <div class="list-b ">
                      <div class="text-lg h-2x">
                        <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="list-title" v-text="postListItem.title.rendered" />
                      </div>
                    </div>
                    <div class="list-f d-flex">
                      <div class="text-xs text-muted">
                        <span class="d-inline-block">
                          {{ postListItem.article_info.classify[0].name }}
                        </span>
                        <i class="text-primary px-2">•</i>
                        <span class="d-inline-block">{{ postListItem.date }}</span>
                        <i class="text-primary px-2">•</i>
                        <span class="d-inline-block">浏览:{{ postListItem.article_info.viewCount }}</span>
                      </div>
                    </div>
                    <div class="list-is row row-sm mt-3">
                      <div class="col-3">
                        <div class="media">
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="media-c" :style="{backgroundImage: 'url( '+ postListItem.article_info.fimg_url +')'}" />
                        </div>
                      </div>
                      <div v-for="(item,index) in postListItem.article_info.otherimages.slice(0,3)" :key="index" class="col-3">
                        <div class="media">
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id}}" class="media-c" :style="{backgroundImage: 'url( '+ item +')'}" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <el-pagination
                layout="pager"
                :current-page="currentPage"
                :total="total"
                @current-change="_changePagination"
              />
            </section>
          </div>
          <div class="col-md-4">
            &nbsp;
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
  name: 'Search',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      placeholderText: '请输入搜索的关键词',
      searchText: ''
    }
  },
  watchQuery: ['page', 's'],
  computed: {
    ...mapState('category', ['postList', 'total', 'currentPage'])
  },
  fetch ({ store, query }) {
    store.commit('category/setCurrentPage', +query.page)
    return store.dispatch('category/updatePostListActions', {
      search: query.s,
      page: query.page,
      per_page: 10,
      _embed: true
    })
  },
  methods: {
    // 搜索
    _search () {
      this.$router.push({
        name: 'search',
        query: {
          page: 1,
          s: this.searchText
        }
      })
      this.placeholderText = this.searchText
      this.searchText = ''
    },
    _changePagination (page) {
      this.$store.commit('category/setCurrentPage', page)
      this.$router.push({
        path: this.$route.path,
        query: {
          page,
          s: this.$route.query.s
        }
      })
    }
  }
}
</script>

<style>

</style>
