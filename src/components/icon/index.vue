<template>
  <div>
    <img :src="imgurl" :style="{width: size + 'rpx',height: size + 'rpx' }" alt />
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'icon',
  props: {
    size: {
      type: [Number, String],
      default: 36
    },
    src: [String],
    color: [String]
  },
  data () {
    return {
      // base64 -> image
      imgurl: ''
    }
  },
  created () {
    if (this.color) {
      this.getColor()
    }
  },
  watch: {
    color () {
      this.getColor()
    }
  },
  methods: {
    getColor () {
      // 1.读取svg图片
      wx.getFileSystemManager().readFile({
        filePath: this.src,
        encoding: 'binary',
        success: (res) => {
          const reg = /fill="#[a-zA-Z0-9]{0,6}"/g
          let str = ''
          // 2.修改fill属性，svg -> fill 判断是否有fill属性
          if (reg.test(res.data)) {
            // fill属性存在
            str = res.data.replace(reg, 'fill="' + this.color + '"')
          } else {
            // fill属性不存在
            str = res.data.replace(
              /<path\s/g,
              '<path fill="' + this.color + '" '
            )
          }
          // 3.base64 svg -> base64
          const base64 = Base64.encode(str)
          // 4.imgurl = base64
          this.imgurl = 'data:image/svg+xml;base64,' + base64
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>