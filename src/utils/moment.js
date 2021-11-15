import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

export const fromNow = (time) => {
  let result
  if (dayjs(time).isBefore(dayjs().subtract(7, 'days'))) {
    result = dayjs(time).format('YYYY-MM-DD')
  } else {
    // 1小前，xx小时前，X天前
    result = dayjs(time)
      .locale('zh-cn')
      .from(dayjs())
  }
  return result
}
