<template>
  <div>
    <Header />
    <main class="py-4 py-lg-5">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-8">
            <Ad />
            <span class="title h3 font-weight-bold font-theme">
              404 NOT FOUND
            </span>
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
    ...mapState(['adList'])
  },
  head () {
    return {
      title: `404-${this.adList.title}`,
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
