// pages/player/player.js
const mgr = wx.getBackgroundAudioManager();
let musiclist = wx.getStorageSync('musiclist');
let musicIndex = 0;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    music: Object,
    picUrl: '',
    isPlaying: false,
    lyric: '',
    isShowLyric: false,
    isSame: false, // 是否为同一首歌
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    musicIndex = options.index;
    let music = musiclist[musicIndex];
    console.log('musiclist:' + musiclist);
    this.setData({
      picUrl: music.al.picUrl,
      music: music,
      isPlaying: true,
    });
    this._getSongPlayUrl(options.id);
  },
  onMusicPause() {
    this.setData({
      isPlaying: false,
    });
  },
  onMusicPlay() {
    this.setData({
      isPlaying: true,
    });
  },

  timeupdate(event) {
    this.selectComponent('.lyric').update(event.detail.currentTime);
  },

  async _getSongPlayUrl(id) {
    wx.showLoading({
      title: '正在加载...',
    });
    console.log('_getSongPlayUrl', id);
    musiclist = wx.getStorageSync('musiclist');
    if (id === app.getMusicPlayingId()) {
      this.setData({
        isSame: true,
      });
    } else {
      this.setData({
        isSame: false,
      });
    }
    if (!this.data.isSame) {
      mgr.stop();
    }
    await wx.request({
      url: `https://apis.imooc.com/song/url?id=${id}&icode=486AB0D4FCB2FFFC`,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        let url = res.data.data[0].url;
        if (url === null) {
          wx.showToast({
            title: '歌曲暂无权限播放',
          });
          return;
        }
        if (!this.data.isSame) {
          mgr.src = url;
          mgr.title = musiclist[musicIndex].name;
          mgr.coverImgUrl = musiclist[musicIndex].al.picUrl;
          mgr.singer = musiclist[musicIndex].ar[0].name;
          mgr.epname = musiclist[musicIndex].al.name;
          wx.setNavigationBarTitle({
            title: musiclist[musicIndex].name,
          });
        }
        this.setData({
          picUrl: musiclist[musicIndex].al.picUrl,
          isPlaying: true,
        });
        app.setMusicPlayingId(id);
        this._getLyric(id);
      },
    });
    wx.hideLoading({
      success: (res) => {},
    });
  },

  async _getLyric(id) {
    await wx.request({
      url: `https://apis.imooc.com/lyric?id=${id}&icode=486AB0D4FCB2FFFC`,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        let lyric = '暂无歌词';
        const lrc = res.data.lrc.lyric;
        if (lrc) {
          lyric = lrc;
        }
        this.setData({
          lyric: lyric,
        });
      },
    });
  },

  showLyric() {
    this.setData({
      isShowLyric: !this.data.isShowLyric,
    });
  },

  togglePlay() {
    if (this.data.isPlaying) {
      mgr.pause();
    } else {
      mgr.play();
    }
    this.setData({
      isPlaying: !this.data.isPlaying,
    });
  },

  onPrev() {
    musicIndex--;
    if (musicIndex < 0) {
      musicIndex = musiclist.length - 1;
    }
    this._getSongPlayUrl(musiclist[musicIndex].id);
  },
  onNext() {
    musicIndex++;
    if (musicIndex === musiclist.length) {
      musicIndex = 0;
    }
    this._getSongPlayUrl(musiclist[musicIndex].id);
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
