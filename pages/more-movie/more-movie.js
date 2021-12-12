// pages/more-movie/more-movie.js
import { mvlist } from '../../mock/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: mvlist.subjects
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    let title = ''
    switch (type) {
      case 'in_th':
        title = "正在热映"
        break
      case 'comming_soon':
        title = "即将上映"
        break
      case 'top250':
        title = "TOP250"
        break
    }
    wx.setNavigationBarTitle({
      title: title
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
    this.setData({
      lists:mvlist.subjects
    })
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      lists:this.data.lists.concat(mvlist.subjects)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})