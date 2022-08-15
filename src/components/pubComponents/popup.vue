<!--自定义弹窗组件
  1.弹窗组件通过slot插槽接受从父组件那里传过来弹窗内容。
  2.弹窗组件通过props接收从父组件传过来的值
  3.通过父组件传进来的props控制组件的显示与隐藏，子组件关闭时通过事件$emit触发父组件改变值。
-->
<template>
  <div v-if="!destroyPopup" class="jl_dialog" :class="{hide: !showPopup}">
    <div class="UImask" :style="{'position': coverNav ? 'fixed' : ''}"></div>
    <div class="UIdialog"
      :style="{'width': width ? (typeof width == 'string' ? width : width + 'px') : 'calc(100% - 662px)',
               'height': height ? (typeof height == 'string' ? height : height + 'px') : 'calc(100% - 207px)',
               'left': coverNav ? '50%' : '',
               'top': coverNav ? '50%' : '87px',
               'position': coverNav ? 'fixed' : 'fixed',
               'transform': coverNav ? 'translate(-50%, -50%)' : ''
      }">
      <div class="UIdialog_hd">
        <strong class="UIdialogTitle">{{title}}</strong>
        <strong class="UIdialogCloseBtn" @click="onCancel">×</strong>
      </div>
      <div class="UIdialog_bd"
        :style="{height: cancel || confirm ? 'calc(100% - 100px)' : 'calc(100% - 64px)'}">
        <slot>弹窗内容</slot>
      </div>
      <div v-if="cancel || confirm" class="UIdialog_ft">
        <span v-if="cancel" class="UIdialog_btn UIdialog_btn_default left" @click="onCancel" >{{cancelVal}}</span>
        <span v-if="confirm" class="UIdialog_btn UIdialog_btn_default right " :class={UIdialog_btn_disabled:isDisabled} @click="onConfirm">{{confirmVal}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    width: 0,
    height: 0,
    coverNav:{
      type: Boolean,
      default: true
    },
    confirm: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Boolean,
      default: false
    },
    title: {
      default: null
    },
    confirmVal: {
      type: String,
      default: '是'
    },
    cancelVal: {
      type: String,
      default: '否'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      destroyPopup: true
    }
  },
  mounted () {
    // this.destroyPopup =
  },
  watch: {
    showPopup (val) {
      this.destroyPopup = JSON.parse(JSON.stringify(!val))
    }
  },
  methods: {
    onConfirm () {
      if (!this.isDisabled) {
        this.$emit('onConfirm')
      }
    },
    onCancel () {
      this.destroyPopup = true
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="less" scoped>
  @weuiDialogBackgroundColor: var(--popupBgColor);
  @weuiDialogLineColor: #D5D5D6;
  @weuiDialogLinkColor: #3CC51F;
  @weuiDialogLinkActiveBc: #EEEEEE;
  @weuiDialogGapWidth: 1.6em;
  @weuiTextColorGray: var(--popupFontColor);
  .jl_dialog{
    width: 100%;
  }
  .hide{
    display: none;
  }
  .UImask{
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
  }
  .UIdialog{
    text-align: left;
    z-index: 5000;
    width: 80%;
    background-color:@weuiDialogBackgroundColor;
    color: @weuiTextColorGray;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
    // border: 1px solid @weuiDialogLinkActiveBc;

    animation: showPopup 1s;
    -webkit-animation: showPopup 1s; /* Safari and Chrome */
  }
  .UIdialog_hd {
    padding: 0.5em @weuiDialogGapWidth .5em;
    border-bottom: 1px solid @weuiDialogLineColor ;
  }
  .UIdialogTitle {
    font-weight: 400;
    font-size: 18px;
  }
  .UIdialogCloseBtn{
    cursor: pointer;
    float: right;
    line-height: 30px;
  }
  .UIdialog_bd {
    padding: .8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: @weuiTextColorGray;
    &:first-child{
      padding:2.7em 20px 1.7em;
    }
  }
  .UIdialog_ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: flex;
    &:after {
      content: " ";
      //.setTopLine(@weuiDialogLineColor);
    }
  }
  .UIdialog_btn {
    display: block;
    cursor: pointer;
    flex: 1;
    color: @weuiDialogLinkColor;
    text-decoration: none;
    //.setTapColor();
    /*&:active {*/
      /*<!--background-color: @weuiDialogLinkActiveBc;-->*/
    /*}*/
    position: relative;
    &:first-child {
      border-right: 1px solid @weuiDialogLineColor;
      &:after {
        display: none;
      }
    }
  }
  .left {
    color: #353535;
  }
  .right{
    background-color: #2c5fc3;
    color: #FFFFFF;
  }
  .UIdialog_btn_disabled{
    background-color: #d7d7d7;
    color: #a4a4a4;
  }

  .weui-skin_android{
    .UIdialog{
      text-align: left;
      box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .1);
    }
    .UIdialogTitle{
      font-size: 21px;
    }
    .UIdialog_hd{
      text-align: left;
    }
    .UIdialog_bd{
      color:@weuiTextColorGray;
      padding:.25em @weuiDialogGapWidth 2em;
      font-size: 17px;
      text-align: left;
      &:first-child{
        padding:1.6em @weuiDialogGapWidth 2em;
        color:#353535;
      }
    }
    .UIdialog_ft{
      display: block;
      text-align: right;
      line-height: 42px;
      font-size: 16px;
      padding:0 @weuiDialogGapWidth .7em;
      &:after{
        display: none;
      }
    }
    .UIdialog_btn{
      display: inline-block;
      vertical-align: top;
      padding:0 .8em;
      &.left{
        color: @weuiDialogLinkColor
      }
      &:after{
        display: none;
      }

      &:active{
        background-color: rgba(0,0,0,.06);
      }
      &:visited{
        background-color: rgba(0,0,0,.06);
      }
      &:last-child{
        margin-right: -.8em;
      }
    }
    .left {
      color: #353535;
    }
    .right{
      background-color: #2c5fc3;
      color: #FFFFFF;
    }
    .UIdialog_btn_disabled{
      background-color: #d7d7d7;
      color: #a4a4a4;
    }
  }

  @media screen and (min-width: 1024px) {
    .UIdialog {
      width: 100%;
      height: calc(100% - 140px);
    }
  }

  @keyframes showPopup {
    0%   {background: rgba(255, 255, 255, 0.1);}
    // 33%  {background: rgba(0, 0, 0, 0);}
    // 66%  {background: rgba(0, 0, 0, 0.4);}
    100% {background: @weuiDialogBackgroundColor;}
  }

  @-webkit-keyframes showPopup{ /* Safari and Chrome */
    0%   {background: rgba(255, 255, 255, 0.1);}
    // 33%  {background: rgba(0, 0, 0, 0);}
    // 66%  {background: rgba(0, 0, 0, 0.4);}
    100% {background: @weuiDialogBackgroundColor;}
  }
</style>
