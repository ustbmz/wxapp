// components/progress-bar/index.js
let movableAeraWith = 0
let movableViewWith = 0
let currentSec = -1
let duration = 0
// touch与timeupdate冲突锁
let isMoving = false
const mgr = wx.getBackgroundAudioManager()


Component({
    /**
     * Component properties
     */
    properties: {
        isSame: Boolean
    },

    /**
     * Component initial data
     */
    data: {
        movableDis: 0,
        showTime: {
            currentTime: '00:00',
            totalTime: '00:00'
        },
        progress: 0
    },

    lifetimes: {
        ready() {
            if (this.properties.isSame && this.data.showTime.totalTime === '00:00') {
                duration = mgr.duration
                let durationFmt = this._durationFmt(duration)
                this.setData({
                    ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
                })
            }
            this._getMovableDis()
            this._bindBGMEvent()
        }
    },

    /**
     * Component methods
     */
    methods: {
        onTouch(event) {
            if (event.detail.source == 'touch') {
                this.data.progress = event.detail.x / (movableAeraWith - movableViewWith) * 100
                this.data.movableDis = event.detail.x
                isMoving = true
            }
        },
        onTouchEnd() {
            const currentTime = this._durationFmt(Math.floor(mgr.currentTime))
            console.log('onTouchEnd', currentTime)
            this.setData({
                progress: this.data.progress,
                movableDis: this.data.movableDis,
                ['showTime.currentTime']: currentTime.min + ':' + currentTime.sec
            })
            mgr.seek(duration * this.data.progress / 100)
            isMoving = false
        },
        _getMovableDis() {
            const query = this.createSelectorQuery()
            query.select('.movable-area').boundingClientRect()
            query.select('.movable-view').boundingClientRect()
            query.exec((res) => {
                movableAeraWith = res[0].width
                movableViewWith = res[1].width
            })
        },
        _bindBGMEvent() {
            mgr.onPlay(() => {
                console.log('onPlay')
                isMoving = false
                this.triggerEvent('onMusicPlay')
            })
            mgr.onStop(() => {
                console.log('onStop')

            })
            mgr.onPause(() => {
                console.log('onPause')
                this.triggerEvent('onMusicPause')
            })
            mgr.onWaiting(() => {
                console.log('onWaiting')
            })
            mgr.onCanplay(() => {
                console.log('onCanplay')
                setTimeout(() => {
                    duration = mgr.duration
                    let durationFmt = this._durationFmt(duration)
                    this.setData({
                        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
                    })
                }, 1000)
            })
            mgr.onTimeUpdate(() => {
                if (!isMoving) {
                    const currentTime = mgr.currentTime
                    const currentTimeFmt = this._durationFmt(currentTime)
                    const secSplit = currentTime.toString().split('.')[0]
                    if (currentSec != secSplit) {
                        this.setData({
                            movableDis: (movableAeraWith - movableViewWith) * currentTime / duration,
                            progress: currentTime / duration * 100,
                            ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
                        })
                        currentSec = secSplit
                    }
                    this.triggerEvent('timeupdate', {
                        currentTime
                    })
                }
            })
            mgr.onEnded(() => {
                console.log('onEnded')
                this.triggerEvent('musicEnd')
            })
            mgr.onError((err) => {
                console.log('onError')
                wx.showToast({
                    title: err,
                })
            })
        },
        _durationFmt(totalsec) {
            const min = Math.floor(totalsec / 60)
            const sec = Math.floor(totalsec % 60)
            return {
                min: this._parse0(min),
                sec: this._parse0(sec)
            }
        },
        _parse0(sec) {
            return sec < 10 ? '0' + sec : sec
        }
    },


})
