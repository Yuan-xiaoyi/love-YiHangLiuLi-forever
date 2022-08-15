<!--
    /**
     * 下拉选择树形组件，下拉框展示树形结构，提供选择某节点功能，方便其他模块调用
     * @author ljn
     * @date 2019-02-23
     * 调用示例：
     * <tree-select :height="400" // 下拉框中树形高度
     *              :width="200" // 下拉框中树形宽度
     *              :data="data" // 树结构的数据
     *              :defaultProps="defaultProps" // 树结构的props
     *              multiple   // 多选
     *              checkStrictly // 多选时，严格遵循父子不互相关联
     *              :nodeKey="nodeKey"   // 绑定nodeKey，默认绑定'id'
     *              :checkedKeys="defaultCheckedKeys"  // 传递默认选中的节点key组成的数组
     *              @popoverHide="popoverHide"> // 事件有两个参数：第一个是所有选中的节点ID，第二个是所有选中的节点数据
     *              </tree-select>
     */
-->
<template>
  <div style="width:100%">
    <div class="mask" v-if="isShowSelect" @click="isShowSelect = !isShowSelect"></div>
    <el-popover placement="bottom-start" trigger="manual"
                v-model="isShowSelect" @hide="popoverHide">
      <el-tree class="common-tree" :style="style" ref="tree" :data="data" :props="defaultProps"
               :show-checkbox="multiple"
               :node-key="nodeKey"
               :check-strictly="checkStrictly"
               default-expand-all
               :expand-on-click-node="false"
               :default-checked-keys="defaultCheckedKeys"
               :highlight-current="true"
               @node-click="handleNodeClick"
               @check-change="handleCheckChange"
               :render-content="renderContent"
      ></el-tree>
      <el-select :style="selectStyle" slot="reference" ref="select"
                 v-model="selectedData"
                 :multiple="multiple"
                 @click.native="isShowSelect = !isShowSelect"
                 size="small"
                 class="tree-select"
                 clearable
                 @clear="popoverHide(true)"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-popover>
  </div>
</template>
 
<script>
export default {
  name: 'treeSelect',
  props: {
    // 树结构数据
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default () {
        return {};
      }
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default () {
        return false;
      }
    },
    nodeKey: {
      type: String,
      default () {
        return 'id';
      }
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default () {
        return false;
      }
    },
    // 默认选中的节点key数组
    checkedKeys: {
      type: Array,
      default () {
        return [];
      }
    },
    // width: {
    //   type: String,
    //   default () {
    //     return '100%';
    //   }
    // },
    height: {
      type: Number,
      default () {
        return 300;
      }
    },
    forBackProp: { // 接受form表单关键字
      type: String,
      default () {
        return '';
      }
    }
  },
  data () {
    return {
      width: 0,
      defaultCheckedKeys: [],
      isShowSelect: false, // 是否显示树状选择器
      options: [],
      selectedData: [], // 选中的节点
      style: 'width:' + this.width + 'px;' + 'max-height:' + this.height + 'px;',
      selectStyle: 'width:' + (this.width + 24) + 'px;',
      checkedIds: [],
      checkedData: []
    };
  },
  created(){
  },
  mounted () {
    this.showCurNode()
  },
  watch: {
    isShowSelect (val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    checkedKeys: {
      handler(newVal, oldVal){
        if(oldVal !== newVal){
          this.showCurNode()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      if(data.disabled){
        return (
          <span style="cursor: not-allowed;width: 100%;line-height: 24px;height: 100%;">
            <span>{node.label}</span>
          </span>
        );
      }else{
        return (
          <span>
            <span>{node.label}</span>
          </span>
        );
      }
    },
    popoverHide (isClear) {
      let self = this
      if (self.multiple) {
        self.checkedIds = self.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
        self.checkedData = self.$refs.tree.getCheckedNodes(); // 所有被选中的节点所组成的数组数据
      } else {
        self.checkedIds = self.$refs.tree.getCurrentKey();
        self.checkedData = self.$refs.tree.getCurrentNode();
      }
      if(self.selectedData || isClear){
        let node = undefined
        const getNode = function(arr){
          arr.forEach(e => {
            if(e.label == self.selectedData){
              node = e
            }else{
              if(e.children){
                getNode(e.children)
              }
            }
          })
        }
        getNode(self.data)
        self.$emit('popoverHide', node, self.forBackProp);
      }
    },
    showCurNode(){
      if(this.$refs.select){
        this.width = this.$refs.select.$el.clientWidth
        this.style = 'width:' + (this.width - 24) + 'px;' + 'max-height:' + this.height + 'px;' // 24为左右padding
      }
      if (this.checkedKeys.length > 0) {
        if (this.multiple) {
          this.defaultCheckedKeys = this.checkedKeys;
          this.selectedData = this.checkedKeys.map((item) => {
            let node = this.$refs.tree.getNode(item);
            return node.label;
          });
        } else {
          this.$nextTick(function(){
            let item = this.checkedKeys[0];
            this.$refs.tree.setCurrentKey(item);
            let node = this.$refs.tree.getNode(item);
            this.selectedData = node && node.label ? node.label : '';
          })
          
        }
      }
    },
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick (data, node, obj) {
      if (!this.multiple) {
        if(!data.disabled){
          let tmpMap = {};
          tmpMap.value = node.key;
          tmpMap.label = node.label;
          this.options = [];
          this.options.push(tmpMap);
          this.selectedData = node.label;
          this.isShowSelect = !this.isShowSelect;
        }
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange () {
      let self = this
      let checkedKeys = self.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
      self.options = checkedKeys.map((item) => {
        let node = self.$refs.tree.getNode(item); // 所有被选中的节点对应的node
        let tmpMap = {};
        tmpMap.value = node.key;
        tmpMap.label = node.label;
        return tmpMap;
      });
      self.selectedData = self.options.map((item) => {
        return item.label;
      });
    }
  },
  destroyed(){

  }
};
</script>
 
<style scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .common-tree{
    overflow: auto;
  }
  .tree-select{
    width: 100%;
  }
  .tree-select >>> .el-input--small .el-input__inner{
    margin-top: 7px;
  }
</style>
 
<style>
  .tree-select .el-select__tags .el-tag .el-tag__close{
    display: none;
  }
  .tree-select .el-select__tags .el-tag .el-icon-close{
    display: none;
  }
</style>