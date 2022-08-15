/** 随机不重复ID */
export const createRandomId = () => {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
}

export default {
  createRandomId
}
