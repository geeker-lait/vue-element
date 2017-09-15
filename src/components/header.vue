<template>
  <nav class="navbar navbar-default navbar-fixed-top" :class="stateObject.headerTheme.theme">
    <div class="navbar-left dark" :class="stateObject.headerTheme.theme">
      <el-col :span="18" class="navbar_parent"><span class="navbar-brand text-uppercase">{{stateObject.manageName}}</span></el-col>
      <el-col :span="6"  class="navbar_parent sildmenu_icon"><i id="sildmenu_icon" @click="toggleMenu"  class="el-icon-d-arrow-left"></i></el-col>
    </div>
    <div class="navbar-logo"><img src="./../image/logo.png" height=60/></div>
    <div class="navbar-right">
      <div class="navbar-right_img"><img src="./../image/header.jpg" alt="avatar" width="70" /></div>
      <div class="navbar-right_a">
        <a href="javascript:void(0)" @click="toDropdownMenu"><i class="el-icon-arrow-down"></i></a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'headerDiv',
  data () {
    return {
      
    }
  },
  mounted () {
    window.VM__ = this;
  },
  computed: mapState({
    'stateObject' : state => state.stateObject //简写。完整的:this.$store.state.stateObject访问
  }),
  methods: {
    toggleMenu ( e ){//开、关左侧菜单
      this.$store.state.stateObject.isShowSort = !this.$store.state.stateObject.isShowSort;
      //$("body").toggleClass("sb-l-m");
    },
    toDropdownMenu ( e ){
      Dialog.alert("您确定要退出登陆吗？",{
        confirm : true,
        callback : function( txt ){
          if( txt === 'confirm'){//点击确定按钮
          //Dialog.show("退出成功！");
          window.location.href = '/';
          // var load = new apiConfig.user.logout();
          // load.param = '';
          // load.exec(function( success ){
          //   var obj = success.data;
          //   sessionStorage.clear();
            
          //   vm.$children[0].isLogin = true; 
          //   window.location.href = '#/login';
          // },function( error ){
          //   Dialog.show("登出失败！");
          // })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
	
</style>