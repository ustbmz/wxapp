<template>
  <div>
    <scroll-view scroll-x>
      <block>
        <view v-for="(line,i) in tokenLines" :key="i" class="lines">
          <text class="line-number" :class="{'max': i >= 1000}">{{i+1000}}</text>
          <text
            class="token"
            v-for="(token,index) in line"
            :key="index"
            :class="'token--' + token.type"
          >{{token.content}}</text>
        </view>
      </block>
    </scroll-view>
  </div>
</template>

<script>
import Prism from 'prism-react-renderer/prism'
import normalize from '@/utils/normalize'

export default {
  name: 'highlight',
  props: {
    code: {
      type: Object,
      default: () => {}
    },
    language: {
      type: String,
      default: 'js'
    }
  },
  computed: {
    tokenLines () {
      const result = Prism.tokenize(this.code, Prism.languages[this.language])
      const normalArr = normalize(result)
      return normalArr
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  margin: 30px;
  text-align: center;
}

:host {
  text-align: left;
  font-family: consolas, monospace;
  line-height: 1.44;
  white-space: nowrap;
}

.lines {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}

.line-number {
  display: inline-block;
  flex-shrink: 0;
  border-right: 4px solid #d8d8d8;
  min-width: 55px;
  text-align: right;
  margin-right: 10px;
  padding-right: 10px;
  color: #888;
  &.max {
    width: 110px;
  }
}

.token {
  color: #333;
  white-space: pre;
}

.token--keyword {
  color: #00f;
}

.token--number {
  color: #09885a;
}

.token--string {
  color: #a31515;
}

.token--regex {
  color: #811f3f;
}

.token--comment {
  color: #008000;
}
</style>