/*
 * 仿微信小程序提示框、对话框、弹窗
 * created by maoeye
 */
import messageComponent from '../components/pubComponents/message' // 引入组件
const Message = {
  install: function (Vue, options) {
    // 创建构造器
    const vueComponent = Vue.extend(messageComponent)
    let msgPopup
    const initmyComponent = function () {
      msgPopup = new vueComponent({
        el: document.createElement('div')
      })
      document.body.appendChild(msgPopup.$el)
    }

    Vue.prototype.$Message = {
      options: {
        status: false, // true 表示已有样式执行,
        show: '' // 表示执行的哪个样式
      },
      init: function (params, options) {
        const self = this
        if (!msgPopup) {
          // 初始化
          initmyComponent()

          // 通过$on来接收子组件的传值
          msgPopup.$on('status', function (data) {
            self.options.status = data
          })
        }
        for (var i in options) {
          params[i] = options[i]
        }
        return params
      },
      showToast: function (options) {
        this.options.status = true
        this.options.show = 'toast'
        let params = {
          show: this.options.show,
          title: '加载中',
          icon: 'loading',
          duration: 1500
          // success: function (res) {},
          // fail: function (res) {},
          // complete: function (res) {}
        }
        this.init(params, options)
        msgPopup.params = params
        msgPopup.showPopup = true
      },
      hideToast: function (options) {
        if (!this.options.status || this.options.show != 'toast') return
        msgPopup.showPopup = false
      },
      showWindow: function (options) {
        if (this.options.status) return
        this.options.status = true
        this.options.show = 'window'
        let params = {
          show: this.options.show,
          showClose: true,
          innerHtml: ''
        }
        this.init(params, options)
        msgPopup.params = params
        msgPopup.showPopup = true
      },
      showLoading: function (options) {
        if (options && options.icon) {
          options.icon = 'loading'
        }
        this.showToast(options)
      },
      hideLoading: function (options) {
        this.hideToast(options)
      },
      showModal: function (options) {
        if (this.options.status) return
        this.options.status = true
        this.options.show = 'modal'
        let params = {
          show: this.options.show,
          title: '提示',
          content: '',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确认'
        }
        this.init(params, options)
        msgPopup.params = params
        msgPopup.showPopup = true
      }
    }
  }
}
export default Message

/** 使用示例

Loading 提示框:
唤起Loading：
this.$Message.showLoading({
  title: "加载中"
})
关闭Loading：
this.$Message.hideLoading()

消息提示框：
this.$Message.showToast({
  title: "加载成功",
  icon: "success", //success 成功，fail 失败
  duration: 1500,
  success: function(res) { ...... },
  fail: function(res) { ...... },
  complete: function(res) { ...... }
})

模态对话框:
this.$Message.showModal({
  title: "提示",
  content: '请输入用户名或密码',
  showCancel: true, // true 显示cancal按钮
  cancelText: '取消',
  confirmText: '确认',
  success: function (res) { ...... },
  fail: function (res) { ...... },
  complete: function (res) { ...... }
})

模拟弹窗：
this.$Message.showWindow({
  showClose: true, // true 显示close按钮
  innerHtml: "<div> ...... </div>"
})

*/
