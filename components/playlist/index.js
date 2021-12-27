// components/playlist/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: Object
    },

    observers:{
        ['item.playCount'](val){
            this.setData({
                _count:(val/10000).toFixed(2)+'万'
            })
        }
    },

    goMusicPlay(){
        wx.navigateTo({
          url: '/pages/music-list/music-list?musicListId+',
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        _count:0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
