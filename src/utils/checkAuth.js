import wx from '@/utils/wx'
import { StoreToken } from '@/utils/wxstore'
import Dialog from '../../static/@vant/weapp/dialog/dialog'
// 1. 检验用户session_key是否过期
// 2. 如果过期，则跳转至auth页面

export const checkSession = async () => {
  try {
    await wx.checkSession()
    return true
  } catch (e) {
    return false
  }
}

export const confirmAuth = () => {
  Dialog.confirm({ title: '未登录', message: '确定登录吗？' })
    .then(() => {
      // 确定登录
      wx.navigateTo({ url: '/pages/auth' })
    })
    .catch(() => {})
}

export const checkAuth = async () => {
  const token = await StoreToken.get()
  if (token) {
    const flag = await checkSession()
    if (flag) {
      return true
    }
  }
  return false
}
