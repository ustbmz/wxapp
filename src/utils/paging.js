// this.paging = new Paging(getComments, {page: 0, limit: 10}, this.comments)
// this.pagin.next({tid: this.tid}, res => {})

class Paging {
  // isEnd = false 是否结束分页
  // resKey = 'data' 返回的列表中的数据键值
  // current = 0 当前页 & 初始页
  // limit = 10 每页多少条
  // beginPage = 0 初始页

  constructor (api, options, resKey) {
    this.api = api
    this.dataList = []

    const { limit, page } = options
    this.options = options
    this.page = page || 0
    this.limit = limit || 10

    this.resKey = resKey || 'data'
    this.isEnd = false
  }

  getIsEnd () {
    return this.isEnd
  }

  // 获取下一页数据，并且调用后台接口
  async next () {
    if (this.isEnd) return
    try {
      let res
      res = await this.api({
        ...this.options,
        page: this.page,
        limit: this.limit
      })
      // 对于异常的判断，res.code 非200，我们给用户一个提示
      // 判断是否lists长度为0，如果为零即可以直接赋值
      // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
      if (res.code === 200) {
        // 判断res.data的长度，如果小于20条，则是最后页
        if (res[this.resKey].length < this.limit) {
          this.isEnd = true
        }
        if (this.dataList.length === 0) {
          this.dataList = res[this.resKey]
        } else {
          this.dataList = this.dataList.concat(res[this.resKey])
        }
      }
      this.page++
    } catch (error) {
      if (error) {
        console.log('Paging -> next -> error', error)
      }
    }
    return this.dataList
  }

  // 清除数据
  clear () {
    this.current = 0
    this.dataList = []
    this.isEnd = false
  }
}

export default Paging
