<template>
  <!-- <img src="/static/icons/home.svg" class="icon" alt /> -->
  <van-tabbar :active="active" v-on:change="onChange" active-color="#02D199" inactive-color="#CCCCCC" class="tabsbar">
    <van-tabbar-item class="item">
      <van-icon name="home" size="28" class-prefix="iconfont"></van-icon>
      <div>首页</div>
    </van-tabbar-item>
    <van-tabbar-item class="item small">
      <van-icon name="msg" size="24" class-prefix="iconfont"></van-icon>
      <div>消息</div>
    </van-tabbar-item>
    <van-tabbar-item class="item small">
      <van-icon name="faved" size="24" class-prefix="iconfont"></van-icon>
      <div>热门</div>
    </van-tabbar-item>
    <van-tabbar-item class="item">
      <van-icon name="person" size="28" class-prefix="iconfont"></van-icon>
      <div>我的</div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: ['active'],
  data () {
    return {
      list: ['/pages/index', '/pages/msg', '/pages/hot', '/pages/center']
    }
  },
  methods: {
    async onChange (event) {
      console.log('onChange -> event', event)
      // event.detail 的值为当前选中项的索引
      const index = event.mp.detail
      wx.switchTab({ url: this.list[index] })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabsbar {
  position: relative;
  z-index: 100;
}
.item {
  text-align: center;
  align-self: flex-end;
  padding-bottom: 5px;
  div {
    padding-top: 5px;
  }
}
</style>