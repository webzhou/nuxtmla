<template>
  <div>
    <Header />
    <main class="py-4 py-lg-5">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-8">
            <Ad />
            <section class="post-header py-4">
              <h1 class="title h3 font-weight-bold font-theme" v-text="detail.title.rendered" />
              <div class="meta text-sm text-muted mt-4">
                <span class="d-inline-block">
                  {{ detail.article_info.classify[0].name }}
                </span>
                <i class="text-primary px-2">•</i>
                <span class="d-inline-block pr-3">{{ detail.date }}</span>
                <i class="text-primary px-2">•</i>
                <span class="d-inline-block">浏览:{{ detail.article_info.viewCount }}</span>
              </div>
            </section>
            <div class="content-style content content-body" v-html="detail.content.rendered" />
            <div v-for="tagItem in detail.article_info.tags" :key="tagItem.name" class="post-tags mt-4">
              <router-link :to="{path:'/tag/'+tagItem.slug, query:{tags:tagItem.term_id}}">
                {{ tagItem.name }}
              </router-link>
            </div>
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
import Sidebar from '~/components/Sidebar.vue'
import Ad from '~/components/Ad.vue'
import Footer from '~/components/Footer.vue'
export default {
  name: 'Article',
  watchQuery: ['id'],
  components: {
    Header,
    Ad,
    Footer,
    Sidebar
  },
  computed: {
    ...mapState(['newestList', 'adList']),
    ...mapState('article', ['detail'])
  },
  fetch ({ store, query }) {
    store.dispatch('article/updateViewCountActions', { id: query.id })
    return store.dispatch('article/updateSetDetailActions', query.id)
  },
  head () {
    return {
      title: `${this.detail.article_info._seo_title}` || `${this.detail.title.rendered}`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: `${this.detail.article_info._seo_keywords}` || `${this.detail.excerpt.rendered}` },
        { hid: 'description', name: 'description', content: `${this.detail.article_info._seo_description}` || `${this.detail.excerpt.rendered}` }
      ]
    }
  }

}
</script>
