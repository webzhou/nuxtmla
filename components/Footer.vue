<template>
  <footer class="footer">
    <div class="bg-white">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-12">
            <div class="text-xs text-muted  border-top border-light py-4 mt-4">
              <span class="copyright"> © 2015-{{ year }} MLA.xin <a href="http://beian.miit.gov.cn">冀ICP备18034189号</a> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: ''
    }
  },
  created () {
    const date = new Date()
    this.year = date.getFullYear()
  }
}
</script>
