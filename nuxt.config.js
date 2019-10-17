
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - mla.xin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'referrer', content: 'no-referrer' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?492d2b17453d2eb3b30dd5a93485c1e6' }/*引入百度统计的js*/
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fc6d41' },
  /*
  ** Global CSS
  */
  css: [
    "~assets/css/bootstrap.min.css",
    "~assets/css/iconfont.css",
    "~assets/css/style.css"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/baidu',
    { src: '~/plugins/element-ui', ssr: true }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    maxChunkSize: 350000,
    extractCSS: { allChunks: true },
    extend (config, ctx) {
    }
  },
  proxy: {
    '/wpjson': {
      target: 'http://api.mla.xin/wp-json',
      pathRewrite: {
        '^/wpjson': '/'
      }
    },
    '/api': {
      target: 'http://api.mla.xin/api',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  env: {
    baseUrl: '/wpjson',
    apiUrl: '/api'
  },
  server: {
    port: '3003'
  }
}
