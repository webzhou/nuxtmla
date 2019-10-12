<template>
  <div>
    <Header />
    <main class="py-4 py-lg-5">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-8">
            <Ad />
            <section class="post-list list-grid list-bordered my-n4">
              <div v-for="postListItem in postList" :key="postListItem.id" class="list-item-content">
                <!--无特色图片&&文章内不含有图片-->
                <div v-if="!postListItem.article_info.fimg_url&&postListItem.article_info.otherimages.length == 0" class="list-item">
                  <div class="list-item">
                    <div class="list-c py-lg-2">
                      <div class="list-b">
                        <div class="text-lg h-2x">
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="list-title" v-text="postListItem.title.rendered" />
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
                        <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="list-title" v-text="postListItem.title.rendered" />
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
                      <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="media-c" :style="{backgroundImage: 'url( '+ postListItem.article_info.fimg_url +')'}" />
                    </div>
                  </div>
                </div>
                <!--有特色图片&&文章内含有至少3个图片-->
                <div v-else class="list-item">
                  <div class="list-c py-lg-1">
                    <div class="list-b ">
                      <div class="text-lg h-2x">
                        <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="list-title" v-text="postListItem.title.rendered" />
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
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="media-c" :style="{backgroundImage: 'url( '+ postListItem.article_info.fimg_url +')'}" />
                        </div>
                      </div>
                      <div v-for="(item,index) in postListItem.article_info.otherimages.slice(0,3)" :key="index" class="col-3">
                        <div class="media">
                          <nuxt-link :to="{path:'/article'+postListItem.link, query:{id:postListItem.id, tag_ID:postListItem.categories[0]}}" class="media-c" :style="{backgroundImage: 'url( '+ item +')'}" />
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
            <Sidebar />
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
import Ad from '~/components/Ad.vue'
import Sidebar from '~/components/Sidebar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Ad,
    Footer,
    Sidebar
  },
  watchQuery: ['pagenum'],
  computed: {
    ...mapState(['adList']),
    ...mapState(['postList', 'total', 'currentPage'])
  },
  fetch ({ store, query }) {
    return store.dispatch('updatePostListActions', {
      page: query.pagenum,
      per_page: 10,
      _embed: true
    })
  },
  methods: {
    _changePagination (pagenum) {
      this.$store.commit('setCurrentPage', pagenum)
      this.$router.push({
        path: this.$route.path,
        query: {
          pagenum
        }
      })
    }
  },
  head () {
    return {
      title: `${this.adList.title}`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: `${this.adList.keywords}` },
        { hid: 'description', name: 'description', content: `${this.adList.description}` }
      ]
    }
  }
}
</script>

<style>

</style>
