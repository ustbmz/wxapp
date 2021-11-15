<template>
  <div>
    <cover-view class="tab-bar">
      <!-- <cover-view class="tab-bar-border"></cover-view> -->
      <cover-view
        v-for="(item,index) in list"
        :key="index"
        class="tab-bar-item"
        :data-index="index"
        @click="switchTab(item,index)"
      >
        <v-icon
          :src="item.iconPath"
          :size="item.size"
          :color="selected !== index ? color: selectedColor"
        ></v-icon>
        <cover-view :style="{'color': selected === index ? selectedColor : color}">{{item.text}}</cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
import Icon from '@/components/icon/index'
export default {
  name: 'tabbar',
  components: {
    'v-icon': Icon
  },
  data () {
    return {
      selected: 0,
      color: '#7A7E83',
      selectedColor: '#02D199',
      list: [
        {
          pagePath: '/index/index',
          iconPath: '/static/icons/home.svg',
          text: '首页',
          size: 60
        },
        {
          pagePath: '/index/index',
          iconPath: '/static/icons/msg.svg',
          text: '消息',
          size: 50
        },
        {
          pagePath: '/index/index',
          iconPath: '/static/icons/faved.svg',
          text: '热门',
          size: 50
        },
        {
          pagePath: '/index/index',
          iconPath: '/static/icons/person.svg',
          text: '我的',
          size: 60
        }
      ]
    }
  },
  methods: {
    switchTab (item, index) {
      // wx.switchTab({ url: item.pagePath })
      this.selected = index
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: 5px;
  box-shadow: 0px -4px 6px 0px rgba(36, 37, 37, 0.08);
}

// .tab-bar-border {
//   background-color: rgba(0, 0, 0, 0.1);
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 1px;
//   transform: scaleY(0.5);
// }

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
}

// .tab-bar-item cover-image {
//   width: 27px;
//   height: 27px;
// }

.tab-bar-item cover-view {
  font-size: 10px;
}
</style>