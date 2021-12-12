// pages/movie-detail/movie-detail.js
import { mvlist } from '../../mock/data.js'
import { ConverToCastString ,ConverToCastArray} from '../../utils/utils.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: {},
        movies: []
    },

    onViewPost() {
        wx.previewImage({
            urls: [this.data.movie.images.large],
        })
    },

    processMovieData(movie) {
        const directors = ConverToCastString(movie.directors)
        const casts = ConverToCastString(movie.casts)
        const avatars = ConverToCastArray(movie.casts)
        this.setData({
            directors:directors,
            casts:casts,
            avatars:avatars
        })


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('options', options)
        const mid = options.id
        const movies = mvlist.subjects
        movies.forEach((item) => {
            if (item.id == mid) {
                this.setData({
                    movie: item
                })
                this.processMovieData(item)
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