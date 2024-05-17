// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      {
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      },
    ],
    playlist: [],
  },

  async getList(option) {
    if (option === 'index') option = '';
    await wx.request({
      url: 'https://apis.imooc.com/personalized?icode=24A98502C687C4C3',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        const data = res.data.result;
        console.log('getList playlist:', data);
        this.setData({
          playlist: data,
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
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
