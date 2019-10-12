<template>
  <div class="block">
    <a :href="adList.url">
      <img :src="adList.img" alt="">
    </a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Ad',
  computed: {
    ...mapState(['adList'])
  }
}
</script>
