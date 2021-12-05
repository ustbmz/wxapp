// pages/mine/mine.js
import { mvlist } from '../../mock/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    commingSoon: [],
    top250: [],
    searchResult:false,
    searchArray:[]
  },

  onGoMore(event) {
    const type = event.currentTarget.dataset.type
    console.log(type)
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },
  onConfirm(event){
    this.setData({
      searchResult:true,
      searchArray:this.data.commingSoon
    })
  },
  onCancel(){
    this.setData({
      searchResult:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.inTheaters = mvlist.subjects.slice(0, 3)
    this.setData({
      inTheaters: mvlist.subjects.slice(10, 13),
      commingSoon: mvlist.subjects.slice(1, 4),
      top250: mvlist.subjects.slice(5, 8),
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