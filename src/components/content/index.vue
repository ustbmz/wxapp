<template>
  <!-- List -->
  <ul class="content" :style="{'padding-top': offsetTop + 'px'}">
    <li v-for="(item,index) in finalList" :key="index" class="list-box" @click="showDetail(item._id)">
      <div class="list-head">
        <div class="title">
          <span class="type" :class="['type-'+item.catalog]" v-if="item.catalog === 'share'">分享</span>
          <span class="type" :class="['type-'+item.catalog]" v-else-if="item.catalog === 'ask'">提问</span>
          <span class="type" :class="['type-'+item.catalog]" v-else-if="item.catalog === 'discuss'">讨论</span>
          <span class="type" :class="['type-'+item.catalog]" v-else-if="item.catalog === 'advise'">建议</span>
          <span class="ellipsis">{{item.title}}</span>
        </div>
      </div>
      <div class="author">
        <div class="inline-block" @click.stop="showUser(item.uid._id)">
          <img class="head" :src="item.pic" />
          <span class="name">{{item.uid.name || '未知用户'}}</span>
          <i class="vip" v-show="item.uid.isVip !== '0'">VIP{{item.uid.isVip}}</i>
        </div>
      </div>
      <div class="list-body">
        <div class="info">{{item.content}}</div>
        <img class="fmt" :src="item.snapshot" v-show="item.snapshot" />
      </div>
      <div class="list-footer">
        <div class="left">
          <span class="reply-num">{{item.answer}} 回复</span>
          <span class="timer">{{item.created}}</span>
        </div>
      </div>
    </li>
    <li v-if="isEnd" class="nomore">没有更多了~</li>
  </ul>
</template>

<script>
// import wx from '@/utils/wx'
import dayjs from 'dayjs'
import config from '@/config/index'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

export default {
  name: 'content',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showUser (id) {},
    async showDetail (id) {
      wx.navigateTo({
        url: '/packageA/detail?id=' + id
      })
    }
  },
  computed: {
    finalList () {
      return this.lists.map((item) => {
        let date = item.created
        if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
          date = dayjs(date).format('YYYY-MM-DD')
        } else {
          // 1小前，xx小时前，X天前
          date = dayjs(date)
            .locale('zh-cn')
            .from(dayjs())
        }
        item.created = date
        if (!item.pic) {
          if (item.uid && item.uid.pic) {
            // 网络图片 -> https，服务器的图片 -> /img/
            if (!item.uid.pic.startsWith('http')) {
              const baseUrl =
                process.env.NODE_ENV === 'development'
                  ? config.baseUrl.dev
                  : config.baseUrl.pro
              item.pic = baseUrl + item.uid.pic
            } else {
              // 这是一张网络图片
              item.pic = item.uid.pic
            }
          } else {
            // 默认如果未设置pic
            item.pic = '/static/images/header.jpg'
          }
        }
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// content lists
.content {
  background: #f5f6f7;
  padding-bottom: 100px;
  .nomore {
    text-align: center;
    padding: 15px 0 25px 0;
    color: #999;
    font-size: 24px;
  }
}
li {
  list-style: none;
}
.list-box {
  padding: 30px 30px;
  background-color: #fff;
  margin-bottom: 20px;
}
.list-head {
  /*  display: flex;
  align-items: center; */
  margin-bottom: 18px;
  .type {
    display: inline-block;
    height: 36px;
    width: 72px;
    text-align: center;
    line-height: 36px;
    white-space: nowrap;
    margin-right: 10px;
    font-size: 24px;
    border-radius: 18px;
    border-bottom-left-radius: 0;
    color: #fff;
  }
  .type-share {
    background-color: #feb21e;
  }
  .type-ask {
    background-color: #02d199;
  }
  .type-discuss {
    background-color: #fe1e1e;
  }
  .type-advise {
    background-color: #0166f8;
  }
  .title {
    color: #333;
    font-size: 32px;
    line-height: 44px;
    font-weight: bold;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .type {
      min-width: 40px;
      transform: scale(0.9);
      position: relative;
      top: 4px;
      align-self: flex-start;
    }
  }
}
.author {
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-right: 30px;
  margin-bottom: 18px;
  color: #666;
  .head {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    top: -4px;
  }
}
.list-body {
  margin-bottom: 30px;
  display: flex;
  .info {
    font-size: 28px;
    color: #666;
    max-height: 94px;
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fmt {
    width: 192px;
    height: 122px;
    border-radius: 8px;
  }
}
.list-footer {
  color: #999;
  font-size: 24px;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .svg-icon {
      margin-right: 5px;
    }
    .timer {
      margin-left: 20px;
    }
  }
}
</style>