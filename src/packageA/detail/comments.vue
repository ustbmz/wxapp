<template>
  <div class="comments">
    <div class="title">评论</div>
    <ul class="comments-lists">
      <li class="item" v-for="(item,index) in finalList" :key="index">
        <div class="detail-info-head">
          <div class="user">
            <div class="avatar">
              <img :src="item.pic" />
            </div>
            <div class="cont">
              <p class="name">{{item.cuid && item.cuid.name ? item.cuid.name : '未设置昵称'}}</p>
              <p class="time">{{item.created}}・评论了帖子</p>
            </div>
          </div>
          <div class="hands" @click="hand(item)">
            <van-icon
              name="zan"
              size="16"
              class-prefix="iconfont"
              :color="item.handed === '1'?'#02D199':''"
            ></van-icon>
            <span :style="{'color': item.handed === '1'?'#02D199':''}">{{item.hands}}</span>
          </div>
        </div>
        <parser :html="item.content"></parser>
      </li>
    </ul>
    <div class="info" v-if="comments.length === 0">暂无评论，赶紧来抢沙发吧~~~</div>
    <div class="info" v-if="isEnd">没有更多了~~~</div>
  </div>
</template>

<script>
import { fromNow } from '@/utils/moment'
import formatHtml from '@/utils/formatHtml'

import config from '@/config/index'
export default {
  name: 'comments',
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    finalList () {
      return this.comments.map((item) => {
        item.created = fromNow(item.created)
        item.content = formatHtml(item.content)
        if (item.cuid && item.cuid.pic) {
          // 网络图片 -> https，服务器的图片 -> /img/
          if (!item.cuid.pic.startsWith('http')) {
            const baseUrl =
              process.env.NODE_ENV === 'development'
                ? config.baseUrl.dev
                : config.baseUrl.pro
            item.pic = baseUrl + item.cuid.pic
          } else {
            // 这是一张网络图片
            item.pic = item.cuid.pic
          }
        } else {
          // 默认如果未设置pic
          item.pic = '/static/images/header.jpg'
        }
        return item
      })
    }
  },
  methods: {
    hand (item) {
      this.$emit('hand', item)
    }
  }
}
</script>

<style lang="scss" scoped>
// comments lists
.comments {
  padding: 20px 30px 100px 30px;
  background: #fff;
  position: relative;
  z-index: 0;
  .title {
    font-weight: bold;
    padding-bottom: 30px;
  }
  .item {
    padding: 10px 0 28px 0;
    color: #333;
  }
  .hands {
    font-size: 28px;
    padding-right: 12px;
    color: #999;
  }
  .svg-icon {
    font-size: px;
    margin-right: 10px;
  }
  .info {
    color: #999;
    font-size: 24px;
    text-align: center;
    padding: 30px;
  }
  .detail-info-head {
    background-color: #fff;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-bottom: 20px;
    justify-content: space-between;
    .user {
      display: flex;
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
}
</style>