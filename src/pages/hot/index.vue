<template>
  <div>
    hot
    <imooc-tabs :active="2"></imooc-tabs>
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'

export default {
  name: 'hot',
  components: {
    'imooc-tabs': VantTabs
  }
}
</script>

<style lang="scss" scoped>
</style>