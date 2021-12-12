Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },
  async changeTabs(arg) {
    this.getList(arg.detail.activeKey)
  },

  goPostDetail(event) {
    console.log(event)
    const pid = event.detail.pid
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid,
    })
  },


  async getList(option) {
    if (option === 'index') option = ''
    await wx.request({
      url: "https://api.ustbmz.com/public/list",
      method: "POST",
      data: {
        catalog: option
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        const data = res.data.data
        this.setData({
          lists: data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "https://api.ustbmz.com/public/list",
      method: "POST",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let imgArr = []
        const data = res.data.data
        data.forEach((item) => {
          const img = /img\[\S+\]/g
          if (img.test(item.content)) {
            let group = item.content.match(img)
            group.map((item) => {
              let str = item.replace('img[', '')
              str = str.replace(']', '')
              console.log(str)
              imgArr.push(str)
            })
          }
        })
        this.setData({
          lists: data,
          imgArr: imgArr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})