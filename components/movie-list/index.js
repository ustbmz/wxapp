// components/movie-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["f-class"],
  properties: {
    title: String,
    movies: Array
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
    onGoMore(event) {
      const type = event.currentTarget.dataset.type
      console.log(type)
      wx.navigateTo({
        url: '/pages/more-movie/more-movie?type=' + type,
      })
    },
  }
})
