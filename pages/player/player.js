// pages/player/player.js
const mgr = wx.getBackgroundAudioManager()
let musiclist = wx.getStorageSync('musiclist')
let musicIndex = 0
Page({

    /**
     * 页面的初始数据
     */
    data: {
        music: Object,
        picUrl: '',
        musicId: '',
        isPlaying: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        musicIndex = options.index
        let music = musiclist[musicIndex]
        this.setData({
            musicId: options.id,
            picUrl: music.al.picUrl,
            music: music,
            isPlaying: true
        })
        this._getSongPlayUrl(options.id)
    },

    async _getSongPlayUrl(id) {
        wx.showLoading({
            title: '正在加载...',
        })
        musiclist = wx.getStorageSync('musiclist')
        console.log(musiclist)
        mgr.stop()
        await wx.request({
            url: `https://apis.imooc.com/song/url?id=${id}&icode=DB1E56542295023A`,
            method: "GET",
            data: {
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {
                let url = res.data.data[0].url
                console.log(url)

                if (url === null) {
                    wx.showToast({
                        title: '歌曲暂无权限播放',
                    })
                    return
                }
                mgr.src = url
                mgr.title = musiclist[musicIndex].name
                mgr.coverImgUrl = musiclist[musicIndex].al.picUrl
                wx.setNavigationBarTitle({
                    title: musiclist[musicIndex].name,
                });
                this.setData({
                    picUrl: musiclist[musicIndex].al.picUrl,
                    isPlaying: true
                })
            }
        })
        wx.hideLoading({
            success: (res) => { },
        })
    },

    togglePlay() {
        if (this.data.isPlaying) {
            mgr.pause()
        } else {
            mgr.play()
        }
        this.setData({
            isPlaying: !this.data.isPlaying
        })
    },

    onPrev() {
        musicIndex--
        if (musicIndex < 0) {
            musicIndex = musiclist.length - 1
        }
        this._getSongPlayUrl(musiclist[musicIndex].id)
    },
    onNext() {
        musicIndex++
        if (musicIndex === musiclist.length) {
            musicIndex = 0
        }
        this._getSongPlayUrl(musiclist[musicIndex].id)
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