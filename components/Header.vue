<template>
  <div class="common-head">
    <header class="header shadow-2x">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg px-0 py-2 py-lg-4">
              <!-- brand -->
              <a href="/" class="navbar-brand">
                <svg width="126" height="30">
                  <image xlink:href="../assets/images/mla.svg" src="../assets/images/mla.png" width="126" height="30" />
                </svg>
              </a>
              <!-- / brand -->
              <!-- Navbar collapse -->
              <div class="collapse navbar-collapse order-2 order-lg-1">
                <ul class="navbar-nav mx-auto main-menu">
                  <li class="menu-item">
                    <router-link :to="{ path: '/', query: { pagenum: 1 } }">
                      首页
                    </router-link>
                  </li>
                  <li class="menu-item">
                    <router-link :to="{ path: '/category/internet', query: { tag_ID: 2 } }" :class="{'nuxt-link-exact-active':$route.query.tag_ID===2}">
                      互联网
                    </router-link>
                  </li>
                  <li class="menu-item menu-item-has-children">
                    <router-link :to="{ path: '/category/technology/', query: { tag_ID: 3 } }" :class="{'nuxt-link-exact-active':[3, 4, 5, 6, 7, 8].includes($route.query.tag_ID)}">
                      技术相关
                    </router-link>
                    <ul class="sub-menu">
                      <li class="menu-item">
                        <router-link :to="{ path: '/category/technology/front/', query: { tag_ID: 4 } }">
                          前端
                        </router-link>
                      </li>
                      <li class="menu-item">
                        <router-link :to="{ path: '/category/technology/back/', query: { tag_ID: 5 } }">
                          后端
                        </router-link>
                      </li>
                      <li class="menu-item">
                        <router-link :to="{ path: '/category/technology/seo/', query: { tag_ID: 8 } }">
                          SEO优化
                        </router-link>
                      </li>
                      <li class="menu-item">
                        <router-link :to="{ path: '/category/technology/server/', query: { tag_ID: 6 } }">
                          服务器
                        </router-link>
                      </li>
                      <li class="menu-item">
                        <router-link :to="{ path: '/category/technology/hardware/', query: { tag_ID: 7 } }">
                          硬件
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="menu-item">
                    <router-link :to="{ path: '/category/happy/', query: { tag_ID: 9 } }" :class="{'nuxt-link-exact-active':$route.query.tag_ID===9}">
                      遇见美好
                    </router-link>
                  </li>
                  <li class="menu-item">
                    <router-link :to="{ path: '/category/about/', query: { tag_ID: 10 } }" :class="{'nuxt-link-exact-active':$route.query.tag_ID===10}">
                      关于
                    </router-link>
                  </li>
                  <li class="menu-item">
                    <router-link :to="{ path: '/category/wool/', query: { tag_ID: 11 } }" :class="{'nuxt-link-exact-active':$route.query.tag_ID===11}">
                      羊毛
                    </router-link>
                  </li>
                  <li>
                    <a href="http://www.mla.xin/web">
                      网站模板
                    </a>
                  </li>
                  <li>
                    <a href="http://t.mla.xin" rel="nofollow">
                      淘米拉
                    </a>
                  </li>
                  <li>
                    <a href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=5yqbe3h0" rel="nofollow">
                      阿里云
                    </a>
                  </li>
                </ul>
              </div>
              <div class="nav navbar-menu sign-menu order-1 order-lg-2">
                <router-link :to="{ path: '/search' }" class="d-inline-block action-search action-sidebar">
                  <i class="text-lg iconfont icon-search-outline" />
                </router-link>
                <a href="javascript:" class="d-inline-block d-lg-none action-menu pl-4" @click="togglenav">
                  <i class="text-lg iconfont icon-menu-outline" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <div class="mobile-navbar" :class="{'active':isShowNav}">
      <div class="mobile-menu p-4 p-md-5">
        <a class="action-menu btn btn-light px-2 mb-4" @click="togglenav"><i class="text-lg iconfont icon-close-outline" /></a>
        <ul class="navbar-nav">
          <li class="menu-item">
            <router-link :to="{ path: '/category/', query: { pagenum: 1 } }">
              首页
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ path: '/category/internet', query: { tag_ID: 2 } }">
              互联网
            </router-link>
          </li>
          <li class="menu-item menu-item-has-children">
            <span class="menu-icon" @click="togglesec">
              <i class="iconfont icon-more-horizontal-outl" />
            </span>
            <router-link :to="{ path: '/category/technology/', query: { tag_ID: 3 } }">
              技术相关
            </router-link>
            <ul class="sub-menu" :style="{display:(isShowSec?'block':'none')}">
              <li class="menu-item">
                <router-link :to="{ path: '/category/technology/front/', query: { tag_ID: 4 } }">
                  前端
                </router-link>
              </li>
              <li class="menu-item">
                <router-link :to="{ path: '/category/technology/back/', query: { tag_ID: 5 } }">
                  后端
                </router-link>
              </li>
              <li class="menu-item">
                <router-link :to="{ path: '/category/technology/seo/', query: { tag_ID: 8 } }">
                  SEO优化
                </router-link>
              </li>
              <li class="menu-item">
                <router-link :to="{ path: '/category/technology/server/', query: { tag_ID: 6 } }">
                  服务器
                </router-link>
              </li>
              <li class="menu-item">
                <router-link :to="{ path: '/category/technology/hardware/', query: { tag_ID: 7 } }">
                  硬件
                </router-link>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <router-link :to="{ path: '/category/happy/', query: { tag_ID: 9 } }">
              遇见美好
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ path: '/category/about/', query: { tag_ID: 10 } }">
              关于
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ path: '/category/wool/', query: { tag_ID: 11 } }">
              羊毛
            </router-link>
          </li>
          <li>
            <a href="http://www.mla.xin/web">
              网站模板
            </a>
          </li>
          <li>
            <a href="http://t.mla.xin" rel="nofollow">
              淘米拉
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      isShowNav: false,
      isShowSec: false
    }
  },
  methods: {
    togglenav () {
      this.isShowNav = !this.isShowNav
    },
    togglesec () {
      this.isShowSec = !this.isShowSec
    }
  }
}
</script>
<style>

</style>
