// components/music-list/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musiclist: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        musicId: -1
    },
    pageLifetimes: {
        show() {
            console.log('pageLifetimes')
            console.log(this.properties.musiclist)
            this.setData({
                musicId: parseInt(app.getMusicPlayingId())
            })
            console.log('pageLifetimes',this.data.musicId)
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(event) {
            console.log('onSelect',event.currentTarget.dataset.id)
            const ds = event.currentTarget.dataset
            this.setData({
                musicId: ds.id
            })
            wx.navigateTo({
                url: `/pages/player/player?id=${ds.id}&index=${ds.index}`,
            })
        }
    }
})
