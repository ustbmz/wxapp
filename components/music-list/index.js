// components/music-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musiclist: Array,
        playerId: -1
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(event) {
            console.log('this.properties.musiclist:',this.properties.musiclist)
            const ds =  event.currentTarget.dataset
            this.setData({
                playerId: ds.id
            })
            wx.navigateTo({
                url: `/pages/player/player?id=${ds.id}&index=${ds.index}`,
            })
        }
    }
})
