<template>
  <div style="height: 100%;width:100%">
    <canvas id="wind"></canvas>
  </div>
</template>

<script>
var AnimationFrameID = 0
export default {
  name: "Tornado",
  props: {
    image: {},
  },
  mounted () {
    this.OpenFrame(undefined)
  },
  methods: {
    rgbToString (rgb) {
      rgb += 0.000001
      let r = parseInt((0.5 + Math.sin(rgb) * 0.5) * 16)
      let g = parseInt((0.5 + Math.cos(rgb) * 0.5) * 16)
      let b = parseInt((0.5 - Math.sin(rgb) * 0.5) * 16)
      return '#' + r.toString(16) + g.toString(16) + b.toString(16)
    },
    
    // 获取rbg数组
    rgbArray (col) {
      col += 0.000001
      let r = parseInt((0.5 + Math.sin(col) * 0.5) * 256)
      let g = parseInt((0.5 + Math.cos(col) * 0.5) * 256)
      let b = parseInt((0.5 - Math.sin(col) * 0.5) * 256)
      return [r, g, b]
    },
    
    interpolateColors (RGB1, RGB2, degree) {
      let w2 = degree
      let w1 = 1 - w2
      return [w1 * RGB1[0] + w2 * RGB2[0], w1 * RGB1[1] + w2 * RGB2[1], w1 * RGB1[2] + w2 * RGB2[2]]
    },

    colorString (arr) {
      let r = parseInt(arr[0])
      let g = parseInt(arr[1])
      let b = parseInt(arr[2])
      return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2)
    },

    // 获取点（x,y,z）与原点的线段与y轴形成的角度大小，特殊情况返回默认值0.00000001;
    elevation (x, z, y) {
      let dist = Math.sqrt(x * x + y * y + z * z) // 获取三维点（x,y,z）与原点距离长
      let num = y / dist // 三维空间的坐标（x,y,z）与原点的的线段和y轴形成的角度的余弦值
      if (dist && num >= -1 && num <= 1)
        return Math.acos(num) // 获取num的反余弦值，即是上述的角度大小
      return 0.00000001
    },


    // 生成颗粒
    createParticle (vars) {
      let pt = {}
      let p = Math.PI * 2 * Math.random()
      let ls = Math.sqrt(Math.random() * vars.distributionRadius)
      pt.x = Math.sin(p) * ls
      pt.y = -vars.vortexHeight / 2
      pt.vy = vars.initV / 20 + Math.random() * vars.initV
      pt.z = Math.cos(p) * ls
      pt.radius = 200 + 800 * Math.random()
      pt.color = pt.radius / 1000 + vars.frameNumber / 250
      vars.points.push(pt)
    },

    project3D (x, y, z, vars) {
      x -= vars.camX
      y -= vars.camY - 8
      z -= vars.camZ
      let p = Math.atan2(x, z)
      let d = Math.sqrt(x * x + z * z)
      x = Math.sin(p - vars.yaw) * d
      z = Math.cos(p - vars.yaw) * d
      p = Math.atan2(y, z)
      d = Math.sqrt(y * y + z * z)
      y = Math.sin(p - vars.pitch) * d
      z = Math.cos(p - vars.pitch) * d
      let rx1 = -1000
      let ry1 = 1
      let rx2 = 1000
      let ry2 = 1
      let rx3 = 0
      let ry3 = 0
      let rx4 = x
      let ry4 = z
      let uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1)
      let ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc
      let ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc
      if (!z) z = 0.000000001
      if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
        return {
          x: vars.cx + (rx1 + ua * (rx2 - rx1)) * vars.scale,
          y: vars.cy + y / z * vars.scale,
          d: (x * x + y * y + z * z)
        }
      } else {
        return { d: -1 }
      }
    },
    
    drawSomeFloor (vars, isFalse) {
      for (let i = -25; i <= 25; i++) {
        for (let j = -25; j <= 25; j++) {
          let x = i * 2
          let z = j * 2
          let y = -vars.floor
          let d = Math.sqrt(x * x + z * z)
          y = y + d * d / 50// 让上下背景产生弯曲感
          if (isFalse) {
            y = -y
          }
          let point = this.project3D(x, y, z, vars)
          if (point.d != -1) {
            let rgb1, rgb2; let degree
            let size = 1 + 15000 / (1 + point.d)
            let a = 0.15 - Math.pow(d / 50, 4) * 0.15
            if (a > 0) {
              if (isFalse) {
                rgb1 = this.rgbArray(d / 26 - vars.frameNumber / 40)
                rgb2 = [0, 128, 32]
                degree = 0.5 + Math.sin(d / 6 - vars.frameNumber / 8) / 2
              } else {
                rgb1 = this.rgbArray(-d / 26 - vars.frameNumber / 40)
                rgb2 = [32, 0, 128]
                degree = 0.5 + Math.sin(-d / 6 - vars.frameNumber / 8) / 2
              }
              vars.context.fillStyle = this.colorString(this.interpolateColors(rgb1, rgb2, degree))// 选色
              vars.context.globalAlpha = a// 透明度
              vars.context.fillRect(point.x - size / 2, point.y - size / 2, size, size)// 用颜色涂满方框
            }
          }
        }
      }
    },
    // 绘制背景效果
    drawFloor (vars) {
      this.drawSomeFloor(vars, true)// 下面背景
      vars.context.fillStyle = '#82f'
      this.drawSomeFloor(vars, false)// 上面背景
    },
    sortFunction (a, b) {
      return b.dist - a.dist
    },
    // 绘制颗粒
    drawParticles (vars) {
      vars.context.globalAlpha = 0.15
      vars.context.fillStyle = '#000'
      vars.context.fillRect(0, 0, vars.canvas.width, vars.canvas.height)
      let point, x, y, z, a
      for (let i = 0; i < vars.points.length; ++i) {
        x = vars.points[i].x
        y = vars.points[i].y
        z = vars.points[i].z
        point = this.project3D(x, y, z, vars)
        if (point.d != -1) {
          vars.points[i].dist = point.d
          let size = 1 + vars.points[i].radius / (1 + point.d)
          let d = Math.abs(vars.points[i].y)
          let a = 0.8 - Math.pow(d / (vars.vortexHeight / 2), 1000) * 0.8
          vars.context.globalAlpha = a >= 0 && a <= 1 ? a : 0
          vars.context.fillStyle = this.rgbToString(vars.points[i].color)
          if (point.x > -1 && point.x < vars.canvas.width && point.y > -1 && point.y < vars.canvas.height) { vars.context.fillRect(point.x - size / 2, point.y - size / 2, size, size) }
        }
      }
      vars.points.sort(this.sortFunction)
    },
    process (vars) {
      if (vars.points.length < vars.MaxParticles) {
        for (let i = 0; i < 5; i++) {
          this.createParticle(vars)
        }
      }
      let angle_xz = Math.atan2(vars.camX, vars.camZ) // camX/camZ的反正切值，即对应角度大小
      // 也可： let angle_xz = Math.atan(vars.camX/vars.camZ)
      // xz页面上的斜边长
      let hypotenuse_xz = Math.sqrt(vars.camX * vars.camX + vars.camZ * vars.camZ)
      hypotenuse_xz -= Math.sin(vars.frameNumber / 80) / 25
      let t = Math.cos(vars.frameNumber / 300) / 165
      vars.camX = Math.sin(angle_xz + t) * hypotenuse_xz
      vars.camZ = Math.cos(angle_xz + t) * hypotenuse_xz
      vars.camY = -Math.sin(vars.frameNumber / 220) * 15
      vars.yaw = Math.PI + angle_xz + t
      vars.pitch = this.elevation(vars.camX, vars.camZ, vars.camY) - Math.PI / 2

      for (let i = 0; i < vars.points.length; ++i) {
        let x = vars.points[i].x
        let y = vars.points[i].y
        let z = vars.points[i].z
        let d = Math.sqrt(x * x + z * z) / 1.0075
        let t = 0.1 / (1 + d * d / 5)
        let p = Math.atan2(x, z) + t
        vars.points[i].x = Math.sin(p) * d
        vars.points[i].z = Math.cos(p) * d
        vars.points[i].y += vars.points[i].vy * t * ((Math.sqrt(vars.distributionRadius) - d) * 2)
        if (vars.points[i].y > vars.vortexHeight / 2 || d < 0.25) {
          vars.points.splice(i, 1)
          this.createParticle(vars)
        }
      }
    },
    // 创建设置页面
    createFrame () {
      let newvars = {}
      // newvars.canvas = document.querySelector('canvas') // 回文档中匹配指定 CSS 选择器的一个元素
      newvars.canvas = document.getElementById("wind")
      newvars.context = newvars.canvas.getContext('2d')
      // 设置画布的高和宽
      newvars.canvas.width = document.body.clientWidth
      newvars.canvas.height = document.body.clientHeight
      newvars.cx = newvars.canvas.width / 2
      newvars.cy = newvars.canvas.height / 2
      // 窗体高宽发生改变时，触发事件
      window.onresize = function () {
        // 重新再次设置画布的高和宽
        newvars.canvas.width = document.body.clientWidth
        newvars.canvas.height = document.body.clientHeight
        newvars.cx = newvars.canvas.width / 2
        newvars.cy = newvars.canvas.height / 2
      }

      newvars.frameNumber = 0
      newvars.camX = 0
      newvars.camY = 0
      newvars.camZ = -14
      newvars.pitch = this.elevation(newvars.camX, newvars.camZ, newvars.camY) - Math.PI / 2
      newvars.yaw = 0
      newvars.bounding = 10
      newvars.scale = 500
      newvars.floor = 26.5

      newvars.points = []// 点集合
      newvars.MaxParticles = 500// 最大数量
      newvars.initV = 0.01
      newvars.distributionRadius = 800
      newvars.vortexHeight = 25
      return newvars
    },
    // 打开页面
    OpenFrame (vars) {
      let self = this
      if (vars == undefined) {
        vars = self.createFrame()
      }
      vars.frameNumber++
      // 页面重绘之前，通知浏览器调用一个指定的函数，以满足开发者操作动画的需求,
      AnimationFrameID = window.requestAnimationFrame(function () { self.OpenFrame(vars) })

      self.process(vars)
      self.drawFloor(vars)
      self.drawParticles(vars)
    }

  },
  destroyed(){
    window.cancelAnimationFrame(AnimationFrameID)
  }
}
</script>

<style scoped>
  #wind{
    position: relative;
    width:100%;
    height:100%;
  }
</style>