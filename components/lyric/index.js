// components/lyric/index.js
let lrcHeight = 0

Component({
    /**
     * Component properties
     */
    properties: {
        isShowLyric: {
            type: Boolean,
            value: false
        },
        lyric: String
    },

    observers: {
        lyric(lrc) {
            if (lrc === '暂无歌词') {
                this.setData({
                    lrcList: [{
                        lrc,
                        time: 0
                    }],
                    nowLrcIndex: -1,
                })
            } else {
                this._parseLyric(lrc)
            }
        }
    },
    /**
     * Component initial data
     */
    data: {
        lrcList: [],
        nowLrcIndex: 0,
        scrollTop: 0
    },

    lifetimes: {
        ready() {
            wx.getSystemInfo({
                success(res) {
                    lrcHeight = res.screenWidth / 750 * 84
                },
            })
        }
    },

    /**
     * Component methods
     */
    methods: {
        update(currentTime) {
            let lrcList = this.data.lrcList
            if (lrcList.length === 0) {
                return
            }
            if (currentTime > lrcList[lrcList.length - 1].time) {
                this.setData({
                    nowLrcIndex: -1,
                    scrollTop: lrcList.length * lrcHeight
                })
                return
            }
            for (let i = 0, len = lrcList.length; i < len; i++) {
                if (currentTime <= lrcList[i].time) {
                    this.setData({
                        nowLrcIndex: i - 1,
                        scrollTop: (i) * lrcHeight
                    })
                    break
                }
            }
        },
        _parseLyric(lrc) {
            let line = lrc.split('\n')
            let _lrcList = []
            line.forEach((item) => {
                let time = item.match(/\[\d{2,}:(\d{2})(?:\.(\d{2,3}))?]/g)
                if (time !== null) {
                    let lrc = item.split(time)[1]
                    let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
                    let time2Seconds = parseInt(timeReg[1] * 60) + parseInt(timeReg[2]) + parseInt(timeReg[3] / 1000)
                    _lrcList.push({
                        time: time2Seconds,
                        lrc
                    })
                }
            })
            this.setData({
                lrcList: _lrcList
            })
        }
    }
})
