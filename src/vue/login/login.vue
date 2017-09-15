<template>
  <div id="canvas-wrapper">
    <div class="admin-form">
      <div class="admin-heading"></div>
      <div class="admin-body">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="admin-footer">
          <el-col :span="6">
            <el-switch v-model="isRember" on-color="#13ce66" off-color="#ff4949">  </el-switch>
            <span>记住我</span>
          </el-col>
          <el-col :span="18" class="pull-right">
            <el-button type="primary" @click="btn_login">登陆</el-button>
          </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'top',
      isRember : false,
      user : {
        username : '',
        password : ''
      }
    }
  },
  computed: mapState({
    'stateObject' : state => state.stateObject //简写。完整的:this.$store.state.stateObject访问
  }),
  mounted (){
    this.$store.state.stateObject.isShowTemp = false;
    vm.$children[0].isLogin = false;
  },
  methods : {
    btn_login (){
      var self = this;
      var username = self.$data.user.username;
      if( !username){
        Dialog.alert( '用户名不能为空！');
        return false;
      }
      var password = self.$data.user.password;
      if( !password){
        Dialog.alert( '用户密码不能为空！');
        return false;
      }
      
      setTimeout(function(){
        sessionStorage.setItem('token', "abcde");
        sessionStorage.setItem('username', username);
        self.$store.state.stateObject.isShowTemp = true;
        vm.$children[0].isLogin = false; 
        window.location.href = 'index';
      },30)
      

      // var load = new apiConfig.user.login();
      // load.param = self.$data.user;
      // util.ajax(load, (success)=>{
      //   var obj = success.data;
      //   sessionStorage.setItem('token', obj.token);
      //   sessionStorage.setItem('username', obj.username);
      //   self.$store.state.stateObject.isShowTemp = true;
      //   //加载左菜单
      //   vm.$children[0].isLogin = false; 
      //   window.location.href = 'index';
      // });
    }
  }
}
</script>
<style scoped>
#app {
  position: relative;
  min-height: 100%;
}
#canvas-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color:#2d494d;
  overflow:hidden;
}
.admin-form{
  font-weight: 400;
  font-size: 14px;
  color: #626262;
  position: relative;
  top:0;
  left:0px;
  width: 700px;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 8%;
  background-color:#fff;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}

.admin-heading{
  padding: 5px;
  color: #fff;
  background-color: #1d9ec9;
}
.admin-body{
  padding:50px;
}
.admin-footer{
  background: #fff;
  height: 50px;
  line-height:50px;
  padding: 0 50px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pull-right{
  float: right !important;
  text-align:right;
}
</style>
