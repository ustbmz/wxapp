import { axios } from '@/utils/request'
import { StoreToken } from '@/utils/wxstore'

// 获取文章中的评论列表
const getComments = async (params) => {
  // const token = store.state.token
  let token
  try {
    token = await StoreToken.get()
  } catch (error) {
    console.log(error)
    // console.log('getDetail -> error', error)
  }
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/comments', params, headers)
}

// 添加评论
const addComment = (data) => axios.post('/comments/reply', { ...data })

// 更新评论
const updateComment = (data) => axios.post('/comments/update', { ...data })

// 采纳最佳评论
const setCommentBest = (params) => axios.get('/comments/accept', params)

// 设置点赞
const setHands = (params) => axios.get('/comments/hands', params)

export { getComments, addComment, updateComment, setCommentBest, setHands }
