<template>
  <div>
    <div class="wrapper">
      <div class="detail-head">{{ page.title }}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="imgSrc" />
          </div>
          <div class="cont">
            <p class="name">
              {{ page.uid && page.uid.name ? page.uid.name : '未设置用户昵称' }}
            </p>
            <p class="time">{{ page.created }}</p>
          </div>
          <div class="subscribe">
            <van-button @click="subscribe()" size="small" class="sub"
              >订阅</van-button
            >
          </div>
        </div>
        <div class="detail-info-body">
          <parser :html="page.content"></parser>
        </div>
        <div class="detail-info-foot">{{ page.reads }} 阅读</div>
      </div>
      <imooc-comments
        :comments="comments"
        :isEnd="isEnd"
        @hand="handleHand"
      ></imooc-comments>
    </div>
    <div
      class="detail-bottom"
      :class="{ fixed: isFocus || faceStatus, on: faceStatus }"
    >
      <div class="bottom-input-wrap">
        <van-icon name="advice" class-prefix="iconfont" size="17"></van-icon>
        <div class="input">
          <input type="text" @confirm="focus()" placeholder="写评论..." />
        </div>
        <div @click="showFace()">
          <van-icon name="smile" class-prefix="iconfont" size="17"></van-icon>
        </div>
      </div>
      <ul class="bottom-right">
        <li :class="{ row: !showText }">
          <van-icon name="bianji" class-prefix="iconfont" size="14"></van-icon>
          <p>
            <span v-show="showText">评论</span>
            {{ page.answer }}
          </p>
        </li>
        <li :class="{ row: !showText }" @click="setFav()">
          <van-icon
            name="shoucang"
            class-prefix="iconfont"
            size="16"
          ></van-icon>
          <p>
            <span v-show="showText">{{
              page.isFav ? '取消收藏' : '收藏'
            }}</span>
          </p>
        </li>
        <!-- <li :class="{'row': !showText}">
          <van-icon name="zan"></van-icon>
          <p>
            <span v-show="showText">赞</span>
            {{page.fav}}
          </p>
        </li>-->
      </ul>
    </div>
    <!-- <div class="block"></div> -->
    <div class="detail-face" :class="{ on: faceStatus }">
      <scroll-view scroll-y>
        <div class="detail-face-item" v-for="(value, key) in faces" :key="key">
          <img :src="value" mode="widthFix" />
        </div>
      </scroll-view>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { getDetail } from '@/api/content'
import { getComments } from '@/api/comments'
import faces from '@/assets/js/face'

import { fromNow } from '@/utils/moment'
import formatHtml from '@/utils/formatHtml'
import Paging from '@/utils/paging'

import Comments from './comments'
// import { StoreToken } from '@/utils/wxstore'

// import Dialog from '@vant/weapp/dist/dialog/dialog'
import { checkAuth, confirmAuth } from '@/utils/checkAuth'

export default {
  name: 'detail',
  components: {
    'imooc-comments': Comments
  },
  data () {
    return {
      page: {},
      comments: [],
      handle: {},
      isEnd: false,
      faces: faces,
      faceStatus: false,
      showText: true,
      isFocus: false,
      isLogin: false
    }
  },
  async onLoad () {
    this._getDetail()
    // this._getComments()
    this.handle = new Paging(getComments, {
      tid: this.$mp.query.id
    })
    this.comments = await this.handle.next()
    this.isEnd = this.handle.getIsEnd()
  },
  async onShow () {
    this.isLogin = await checkAuth()
  },
  computed: {
    imgSrc () {
      return this.page.uid && this.page.uid.pic ? this.page.uid.pic : '/static/images/header.jpg'
    }
  },
  methods: {
    _getDetail () {
      getDetail(this.$mp.query.id).then((res) => {
        if (res.code === 200) {
          this.page = res.data
          this.page.content = formatHtml(res.data.content)
          this.page.created = fromNow(this.page.created)
        }
      })
    },
    focus () {
      // 当用户准备发送评论
      this.confirmLogin()
    },
    handleHand (item) {
      // 给该条评论点赞
      this.confirmLogin()
      this.subscribe()
    },
    setFav () {
      // 设置收藏
      this.confirmLogin()
      this.subscribe()
    },
    showFace () {
      this.faceStatus = !this.faceStatus
    },
    confirmLogin () {
      if (!this.isLogin) {
        confirmAuth()
      }
    },
    subscribe () {
      if (!this.isLogin) {
        confirmAuth()
        // 判断用户是否已经登录，登录之后给用户推订阅消息
        return
      }
      const arr = [
        '3icSr0YIBLcMSYXchHBTWgCiAAom4lrkJqZAf2pVc-4',
        'xVA_zdzgM8zPtpDOO92rpK9kQumz4O84E7sTy9Ihfds',
        'sG80CJj2GvArifGRCWOJhumIyY5mQnM94RWGQkdctGc'
        // '6q9Rrn0uekifZbdMuhfzmvexEnZh0Qcv2gfHUBsi1kk'
        // 'e1vWHQiTOW9_cP6l31RtO_SDc41hOfhcqhWFCb0cquk'
      ]
      const tmplIds = getApp().globalData.tmplIds.filter(
        (item) => arr.indexOf(item) !== -1
      )
      wx.requestSubscribeMessage({
        tmplIds: tmplIds,
        success (res) {
          // console.log('success -> res', res)
          if (res) {
            getApp().globalData.tmplIds = getApp().globalData.tmplIds.filter(
              (item) => {
                // 过滤掉已经订阅了的ids，保留未订阅未设置的ID
                return Object.keys(res).indexOf(item) === -1
              }
            )
            console.log(
              'success -> getApp().globalData.tmplIds',
              getApp().globalData.tmplIds
            )
          }
        }
        // fail: (err) => {
        //   console.log('success -> err', err)
        // }
      })
    }
  },
  async onReachBottom () {
    if (this.isEnd) return
    this.comments = await this.handle.next()
    this.isEnd = this.handle.getIsEnd()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_variables.scss';
@import '../../assets/styles/_mixin.scss';

.wrapper {
  // padding-top: $header-height;
  background-color: #f6f6f6;
}
.detail-head {
  font-size: 36px;
  color: #333;
  padding: 0 30px 20px 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 20px 0;
  // line-height: $header-height;
  background-color: #fff;
  z-index: 10;
  position: relative;
}
.detail-info {
  background-color: #fff;
  padding: 20px 30px 60px 30px;
  margin: 0 0 20px 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  .detail-info-head {
    background-color: #fff;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-bottom: 20px;
    .sub {
      --button-border-radius: 6px;
      --button-default-color: #fff;
      --button-default-background-color: #02d199;
    }
    .avatar {
      margin-right: 20px;
      img {
        width: 72px;
        height: 72px;
        border-radius: 100%;
      }
    }
    .cont {
      flex: 1;
      .name {
        font-size: 26px;
        color: #333;
        margin-bottom: 10px;
      }
      .time {
        color: #999;
        font-size: 22px;
      }
    }
  }
  .detail-info-body {
    padding-bottom: 46px;
    color: #666;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 55px;
    font-size: 30px;
    overflow-x: hidden;
    img {
      max-width: 100%;
    }
  }
  .detail-info-foot {
    color: #ccc;
    font-size: 26px;
  }
}

// .block {
//   height: calc(env(safe-area-inset-bottom) / 2);
//   height: calc(constant(safe-area-inset-bottom) / 2);
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background: #fff;
// }

.detail-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  // iOS 11的场景
  padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
  height: 100px;
  height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  // bottom: calc(constant(safe-area-inset-bottom) / 2);
  // bottom: calc(env(safe-area-inset-bottom) / 2);
  width: 100%;
  z-index: 10;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  display: flex;
  align-items: center;
  // padding-top: 20px;
  justify-content: flex-end;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.5s;
  // @include resH-to(big-screens) {
  //   padding-bottom: 28px;
  // }
  &.fixed {
    padding-bottom: 0;
  }
  &.on {
    transform: translateY(-600px);
  }
  .bottom-input-wrap {
    background-color: #f3f3f3;
    flex: 1;
    display: flex;
    align-items: center;
    border-radius: 50px;
    width: 200px;
    color: #ccc;
    font-size: 28px;
    height: 64px;
    margin: 0 20px;
    padding: 0 20px;
    .input {
      margin-right: 20px;
      flex: 1;
      input {
        border: 0;
        background-color: transparent;
        outline: 0;
      }
      // padding-right: 20px;
    }
  }
  .bottom-right {
    display: flex;
    margin-right: 20px;
    font-size: 26px;
    li {
      flex: 1;
      padding: 0 10px;
      text-align: center;
      white-space: nowrap;
      color: #999;
      &.row {
        flex-flow: row nowrap;
        display: flex;
        align-items: center;
        p {
          margin-left: 8px;
        }
      }
    }
  }
}

.detail-face {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  height: 600px;
  background: #fff;
  transition: all 0.5s;
  transform: translateY(600px);
  visibility: hidden;
  overflow-y: scroll;
  border-bottom: 1px solid #dcdcdc;
  // overscroll-behavior: contain;
  &.on {
    transform: translateY(0);
    visibility: visible;
  }
  .detail-face-item {
    float: left;
    width: 12.5%;
    text-align: center;
    padding: 12px 0;
    img {
      width: 54px;
    }
  }
}
</style>
