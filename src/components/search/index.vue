<template>
  <div>
    <div class="search" :style="{'padding-top': barHeight + 'px'}">
      <van-search :value="value" shape="round" placeholder="请输入搜索关键词" />
    </div>
  </div>
</template>

<script>
import store from '@/pages/index/store'

export default {
  name: 'search',
  data () {
    return {
      value: '',
      barHeight: 0
    }
  },
  onLoad () {
    this.getNavBarHeight()
  },
  methods: {
    getNavBarHeight () {
      wx.getSystemInfo({
        success: (result) => {
          let statusBarHeight = result.statusBarHeight
          let isiOS = result.system.indexOf('iOS') > -1
          if (isiOS) {
            this.barHeight = statusBarHeight + 5
          } else {
            this.barHeight = statusBarHeight + 7
          }
          // 存储至store中
          store.commit('setContentOffset', this.barHeight + 88)
        },
        fail: () => {},
        complete: () => {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// search
.search {
  // padding-top: 25px;
  width: 70%;
  --search-padding: 0;
  padding-left: 25px;
  padding-bottom: 8px;
  @media (max-width: 320px) {
    width: 60%;
  }
}
</style>