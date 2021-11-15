<template>
  <div>
    <div class="fixed">
      <imooc-search></imooc-search>
      <imooc-nav></imooc-nav>
    </div>
    <imooc-content :lists="lists" :offsetTop="offsetTop" :isEnd="isEnd"></imooc-content>
    <img mode="widthFit" src="/static/images/add-post.png" @click="addPost()" class="addBtn" />
    <imooc-tabs :active="0"></imooc-tabs>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
import SearchBar from '@/components/search/index'
import Tabs from '@/components/tabs/index'
import Content from '@/components/content/index'
import { getList } from '@/api/content'
import { getSubIds } from '@/api/login'
import store from './store'
import { checkAuth, confirmAuth } from '@/utils/checkAuth'

export default {
  components: {
    'imooc-tabs': VantTabs,
    'imooc-search': SearchBar,
    'imooc-content': Content,
    'imooc-nav': Tabs
  },
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      isEnd: false,
      isRepeat: false,
      innerText: 'hello wxapp component',
      isLogin: false
      // catalog: ''
    }
  },
  onLoad () {
    this.getSettings()
  },
  // 1. getList -> props -> content
  async onShow () {
    store.commit('setCatalog', getApp().globalData.tab || '')
    this._getList()
    this.isLogin = await checkAuth()
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      getList({
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: 'created'
      })
        .then((res) => {
          wx.stopPullDownRefresh()
          // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
          this.isRepeat = false
          // 对于异常的判断，res.code 非200，我们给用户一个提示
          // 判断是否lists长度为0，如果为零即可以直接赋值
          // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
          if (res.code === 200) {
            // 判断res.data的长度，如果小于20条，则是最后页
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.page === 0) {
              this.lists = res.data
            } else {
              this.lists = this.lists.concat(res.data)
            }
          }
          // if (typeof this.handle === 'function') {
          //   // this.handle()
          // }
          // this.initHeight()
        })
        .catch((err) => {
          wx.stopPullDownRefresh()
          this.isRepeat = false
          if (err) {
          }
        })
    },
    init () {
      this.page = 0
      // this.lists = []
      this.isEnd = false
      this.isRepeat = false
    },
    async getSettings () {
      // 1.订阅内容通过getSettings返回
      // 2.订阅列表接口中的tmplIds，必须为用户未订阅的内容。如果为数组，则显示列表订阅。
      // 3.可以通过openSetting打开用户的设置页面，引导用户进行订阅设置
      // 4.如果用户的订阅总开关是关闭的，即mainSwitch为false，requestSubscribeMessage无法触发弹窗
      const result = await getSubIds()
      let arr = []
      if (result.code === 200) {
        arr = result.data
      }
      wx.getSetting({
        withSubscriptions: true,
        success: (res) => {
          const app = getApp()
          app.globalData.subscriptionsSetting = res.subscriptionsSetting
          console.log(app.globalData)
          // 1.获取用户已经订阅的消息
          const keys = res.subscriptionsSetting.itemSettings
          // 2.获取服务订阅消息的模板ID -> restful -> array
          // 3.对比服务器已有消息模块 -> globalData
          // 3.1 用户未开启订阅消息 -> return
          if (!res.subscriptionsSetting.mainSwitch) {
            return
          }
          if (!keys) {
            // 3.2 用户开启订阅消息 -> 未设置任何订阅消息
            app.globalData.tmplIds = arr
          } else {
            // 3.3 用户开启订阅消息 -> 已经有了部分设置 -> reject,accept
            const keysArr = Object.keys(keys)
            app.globalData.tmplIds = arr.filter(
              (item) => keysArr.indexOf(item) === -1
            )
          }
          console.log(
            'getSettings -> app.globalData.tmplIds',
            app.globalData.tmplIds
          )
          // 4.等待用户的订阅 -> requestSubscribeMessage
        },
        fail: () => {},
        complete: () => {}
      })
    },
    addPost () {
      if (!this.isLogin) {
        confirmAuth()
        // 判断用户是否已经登录，登录之后给用户推订阅消息
        return
      }
      // 校验用户是否登录
      wx.navigateTo({
        url: '/packageB/newPost',
        success: (result) => {},
        fail: (err) => {
          console.log('addPost -> err', err)
        }
      })
    }
  },
  watch: {
    // 3. catalog -> getList
    catalog (newval, oldval) {
      if (newval !== oldval) {
        this.init()
        this._getList()
      }
    }
  },
  computed: {
    // 2. nav -> 标签 -> catalog
    catalog () {
      return store.state.catalog
    },
    offsetTop () {
      return store.state.contentOffset
    }
  },
  onPullDownRefresh () {
    this.init()
    this._getList()
  },
  onReachBottom () {
    this.page++
    this._getList()
  }
  // 4. pull refresh + pull load
}
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
}
.intro {
  margin: 30px;
  text-align: center;
}
.addBtn {
  width: 150px;
  height: 150px;
  position: fixed;
  bottom: 110px;
  right: 10px;
}
</style>