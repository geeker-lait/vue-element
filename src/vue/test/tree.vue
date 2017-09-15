<template>
  <div class="element__body">
    <el-col :span="6">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="2"><div ></div></el-col>
    <el-col :span="6">
      节点过滤
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree>
    </el-col>
    <el-col :span="6">
      <el-tree
        :data="data2"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>

    </el-col>
  </div>
</template>
<script>
let id = 1000;
export default {
  name: 'test_tree',
  components : {
    
  },
  mounted (){
    util.isLogin();//判断是否登录
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      data: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, 
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, 
            {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }
          ]
        }, 
        {
          label: '一级 3',
          children: [
          {
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, 
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        } 
      ],

      data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],

      icon : {
        '1' : 'el-icon-upload',
        '2' : 'el-icon-document',
        '3' : 'el-icon-message'
      }
    }  
  },
  methods : {
    handleNodeClick(data) {
      console.log(data);
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      
    },
    append(store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data);
    },

    remove(store, data) {
      store.remove(data);
    },
    //vue 支持 jsx 语法
    //1.npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props --save-dev
    renderContent(h, { node, data, store }) {
        //jsx 语法
        // let icon = this.$data.icon[ node.level ];
        // return (
        //   <span>
        //     <span>
        //       <span><span class={icon}></span> {node.label}</span>
        //     </span>
        //     <span style="float: right; margin-right: 20px">
        //       <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
        //       <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
        //     </span>
        //   </span>
        // );
      }
  }
}
</script>
<style scoped>
  
</style>
