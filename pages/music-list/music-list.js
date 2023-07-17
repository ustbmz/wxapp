// pages/music-list/music-list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    musiclist: Array,
    listinfo: Object,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusicList(options.id);
  },

  async getMusicList(id) {
    console.log('getMusicList', id);
    await wx.request({
      url: `https://apis.imooc.com/playlist/detail?id=${id}&icode=486AB0D4FCB2FFFC`,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        const playlist = res.data.playlist;
        console.log('getList playlist:', playlist);
        const tracks = res.data.playlist.tracks;
        console.log('getList playlist tracks:', tracks);
        this.setData({
          musiclist: tracks,
          listinfo: {
            coverImgUrl: playlist.coverImgUrl,
            name: playlist.name,
            avatarUrl: playlist.creator.avatarUrl,
          },
        });
        this._saveMusicList();
      },
    });
  },

  _saveMusicList() {
    wx.setStorageSync('musiclist', this.data.musiclist);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
