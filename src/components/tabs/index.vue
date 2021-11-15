<template>
  <div>
    <van-tabs class="custom-tab" :active="activeTab" v-on:change="onTabChange">
      <van-tab :title="tab.value" v-for="(tab, index) in tabs" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import store from '@/pages/index/store'

export default {
  name: 'tabs',
  data () {
    return {
      activeTab: 0,
      tabs: [
        {
          key: '',
          value: '首页'
        },
        {
          key: 'ask',
          value: '提问'
        },
        {
          key: 'advise',
          value: '建议'
        },
        {
          key: 'share',
          value: '分享'
        },
        {
          key: 'discuss',
          value: '讨论'
        }
      ]
    }
  },
  computed: {
    catalog () {
      return store.state.catalog
    }
  },
  watch: {
    catalog (newval, oldval) {
      if (newval !== oldval) {
        this.tabs.map((item, index) => {
          if (item.key === newval) {
            this.activeTab = index
          }
        })
      }
    }
  },
  methods: {
    onTabChange (event) {
      this.activeTab = event.mp.detail.index
      store.commit('setCatalog', this.tabs[this.activeTab].key)
      // wx.showToast({
      //   title: `切换到第${event.mp.detail.index}个标签 ${event.mp.detail.name}`,
      //   icon: 'none'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tab {
  --tabs-default-color: #02d199;
  --tabs-bottom-bar-color: #02d199;
  --tab-active-text-color: #02d199;
  --tab-text-color: #666666;
}
</style>