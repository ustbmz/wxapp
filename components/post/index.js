// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPost(event) {
      const pid = this.properties.item._id
      console.log(pid)
      // wx.navigateTo({
      //   url: '/pages/post-detail/post-detail?pid=' + pid,
      // })
      this.triggerEvent('post-tap',{
        pid
      })
    }
  }
})
