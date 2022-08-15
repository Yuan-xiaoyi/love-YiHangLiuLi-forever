// 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
// !注意 消息前缀应使用字符串类型
let prefix = '[PROJECT_NAME]',
  supportPostMessage = 'postMessage' in window

class Target {
  constructor(target, name) {
    this.listenFunc = []
    var errMsg = ''
    if (arguments.length < 2) {
      errMsg = 'target error - target and name are both required'
    } else if (typeof target != 'object') {
      errMsg = 'target error - target itself must be window object'
    } else if (typeof name != 'string') {
      errMsg = 'target error - target name must be string type'
    }
    if (errMsg) {
      throw new Error(errMsg)
    }
    this.target = target
    this.name = name
    let self = this
    const generalCallback = function (msg) {
      try {
        if (typeof msg == 'object' && msg.data) {
          if (msg.source == self.target)//只监听当前target的消息
          {
            msg = msg.data
            if (typeof msg ==='string') {
              msg = msg.trim();
                // 剥离消息前缀
                msg = msg.slice(self.messenger.prefix.length)
              if((msg.startsWith("{")&&msg.endsWith("}"))||(msg.startsWith("[")&&msg.endsWith("]"))) {
                for (var i = 0; i < self.listenFunc.length; i++) {
                  self.listenFunc[i](msg)
                }
              }
            }
          }
        }
      } catch (err) {
        // console.error(err)
      }
    }

    if (supportPostMessage) {
      if ('addEventListener' in document) {
        window.addEventListener('message', generalCallback, false)
      } else if ('attachEvent' in document) {
        window.attachEvent('onmessage', generalCallback)
      }
    } else {
      // 兼容IE 6/7
      window.navigator[this.messenger.prefix + this.name] = generalCallback
    }
  }

  listen(callback) {
    this.listenFunc.push(callback)
  }

  clear() {
    this.listenFunc = []
  }
}

// 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
if (supportPostMessage) {
  // IE8+ 以及现代浏览器支持
  Target.prototype.send = function (msg) {
    this.target.postMessage(this.messenger.prefix + msg, '*')
  }
} else {
  // 兼容IE 6/7
  Target.prototype.send = function (msg) {
    var targetFunc = window.navigator[this.messenger.prefix + this.name]
    if (typeof targetFunc == 'function') {
      targetFunc(this.messenger.prefix + msg, window)
    } else {
      throw new Error('target callback function is not defined')
    }
  }
}
export default class Messenger {
  constructor(messengerName, projectName) {
    this.targets = {}
    this.name = messengerName
    this.listenFunc = []
    this.prefix = projectName || prefix
    if (typeof this.prefix !== 'string') {
      this.prefix = this.prefix.toString()
    }

    let self = this
    const generalCallback = function (msg) {
      if (typeof msg === 'object' && msg.data !== undefined) {
        msg = msg.data
      }
      // 剥离消息前缀
      if (typeof msg ==='string') {
        msg = msg.slice(self.prefix.length)
        for (var i = 0; i < self.listenFunc.length; i++) {
          self.listenFunc[i](msg)
        }
      }
    }

    if (supportPostMessage) {
      if ('addEventListener' in document) {
        window.addEventListener('message', generalCallback, false)
      } else if ('attachEvent' in document) {
        window.attachEvent('onmessage', generalCallback)
      }
    } else {
      // 兼容IE 6/7
      window.navigator[self.prefix + this.name] = generalCallback
    }
    console.log('Messenger constructor')
  }

  addTarget(target, name) {
    if (this.targets[name]) {
      this.targets[name].clear()
    }
    var targetObj = new Target(target, name)
    targetObj.messenger = this
    this.targets[name] = targetObj
  }

  removeTarget(name) {
    if (this.targets[name]) {
      this.targets[name].clear()
      delete this.targets[name]
    }
  }

  listen(callback) {
    this.listenFunc.push(callback)
  }

  clear() {
    this.listenFunc = []
  }

  send(msg) {
    let targets = this.targets, target
    for (target in targets) {
      if (targets[target]) {
        targets[target].send(msg)
      }
    }
  }

  destroyed() {
    this.clear()
  }
}
