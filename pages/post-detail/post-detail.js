// pages/post-detail/post-detail.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    _pid: null,
    isCollect: false,
    tipFlag: false,
    tipStr: "收藏成功",
    playAudio: false,
    _mgr:null
  },
  async onPostCollect(event) {
    let isExit = wx.getStorageSync('postCollectObj')

    if (isExit) {
      let postCollectObj = isExit
      if (isExit[this.data._pid]) {

        postCollectObj[this.data._pid] = false
        this.setData({
          isCollect: false,
          tipFlag: true,
          tipStr: "取消收藏成功"
        })
        wx.setStorageSync('postCollectObj', postCollectObj)
      } else {
        postCollectObj[this.data._pid] = true
        this.setData({
          isCollect: true,
          tipFlag: true,
          tipStr: "收藏成功"
        })
        wx.setStorageSync('postCollectObj', postCollectObj)
      }
    } else {
      let postCollectObj = {}
      postCollectObj[this.data._pid] = true
      this.setData({
        isCollect: true,
        tipFlag: true,
        tipStr: "收藏成功"
      })
      wx.setStorageSync('postCollectObj', postCollectObj)


    }
    // let confirm = await  wx.showModal({
    //   title: '是否收藏',
    // })
    // if(confirm.confirm){
    //   console.log('执行用户收藏操作')
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let pid = options.pid
    this.data._pid = options.pid
    let imgSrc = ''
    let self = this

    let isExit = wx.getStorageSync('postCollectObj')
    let isCollect = isExit[this.data._pid]
    console.log(isExit)
    console.log(isCollect)
    if (isExit) {
      this.setData({
        isCollect,
        playAudio:app.gIsPlaying
      })
    }
    wx.request({
      url: "https://api.ustbmz.com/public/content/detail?tid=" + pid,
      method: "GET",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const data = res.data.data

        const img = /img\[\S+\]/g
        if (img.test(data.content)) {
          let group = data.content.match(img)
          group.map((item) => {
            let str = item.replace('img[', '')
            str = str.replace(']', '')
            console.log(str)
            imgSrc = str
          })
        }
        console.log(res.data.data)
        self.setData({
          page: data,
          imgSrc: imgSrc
        })
      }
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onPlayMusic)
    mgr.onPause(this.onStopMusic)
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
    console.log('onUnload')
    this.onStopMusic()
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

  },

  onPlayMusic() {
    console.log('播放音乐')
    this.setData({
      playAudio: true
    })
    app.gIsPlaying = true
    const mgr = this.data._mgr
    mgr.title = '你瞒我瞒'
    mgr.src='https://api.ustbmz.com/nmwm.mp3'
  },

  onStopMusic() {
    console.log('pause music')
    app.gIsPlaying = false
    this.setData({
      playAudio: false
    })
    const mgr = this.data._mgr
    mgr.pause()
  }
})