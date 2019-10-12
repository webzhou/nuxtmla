<template>
  <aside class="sidebar mt-md-0 mt-4">
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
    <div class="widget widget_recent_entries mb-5">
      <div class="widget-title h6 mb-4">
        <span class="m-line">近期文章</span>
      </div>
      <ul>
        <li v-for="newestListItem in newestList" :key="newestListItem.id">
          <router-link :to="{path:'/article'+newestListItem.link, query:{id:newestListItem.id, tag_ID:newestListItem.categories[0]}}">
            {{ newestListItem.title.rendered }}
          </router-link>
          <span class="post-date">{{ newestListItem.date }}</span>
        </li>
      </ul>
    </div>
    <div class="widget widget_tag_cloud mb-5">
      <div class="widget-title h6 mb-4">
        <span class="m-line">标签</span>
      </div>
      <div class="tagcloud">
        <router-link v-for="tagListItem in tagList" :key="tagListItem.id" :to="{path:tagListItem.link, query:{tags:tagListItem.id}}">
          {{ tagListItem.name }}
        </router-link>
      </div>
    </div>
    <div class="widget widget_categories mb-5">
      <div class="widget-title h6 mb-4">
        <span class="m-line">目录</span>
      </div>
      <ul>
        <li v-for="categoryListItem in categoryList" :key="categoryListItem.id" class="cat-item">
          <router-link :to="{ path: categoryListItem.link, query: { tag_ID: categoryListItem.id } }">
            {{ categoryListItem.name }}
          </router-link> ({{ categoryListItem.count }})
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Sidebar',
  data () {
    return {
      placeholderText: '请输入搜索的关键词',
      searchText: ''
    }
  },
  computed: {
    ...mapState(['counter', 'tagList', 'newestList', 'categoryList'])
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
    }
  }
}
</script>
