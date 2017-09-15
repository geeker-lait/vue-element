import Vue from 'vue'
import Router from './router/router'
import App from './App'
import Vuex from 'vuex'
import Store from './vuex/store'
import Dialog from '@/commonjs/dialog.js'
import Util from '@/commonjs/util.js'
import ApiConfig from '@/commonjs/apiConfig.js'

//import '@/commonjs/ubt';
//element-ui
//http://element.eleme.io/#/zh-CN/component/installation
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

require('@/commoncss/common.css');



//commonjs
window.util = Util;
window.Dialog = new Dialog();
window.apiConfig = ApiConfig;

// 引入 ECharts 主模块
// window.echarts = require('echarts/lib/echarts');

// require('echarts/lib/chart/bar');// 引入柱状图
// require('echarts/lib/chart/line');// 引入折线图
// require('echarts/lib/chart/pie');// 引入饼图
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require('echarts/lib/component/legend');

Vue.use(Vuex);
Vue.config.devtools = true;
window.vm = new Vue({
	el: '#app',
	router : Router,
	store : Store,
	template: '<App/>',
	components: { App }
});

Router.beforeEach((to, from, next) => {
	console.info( to );
	console.info( from );
  	next();   // 进行下一个钩子函数
})


// var bulidConfig = require('./buildConfig.json');
// console.info("运行环境（env）                 :"+bulidConfig.env);
// console.info("是否打包resouse.js文件（is_res）:"+bulidConfig.is_res);
// if( bulidConfig.res ){
// 	var head= document.getElementsByTagName('head')[0]; 
// 	var script= document.createElement('script'); 
// 	script.type= 'text/javascript'; 
// 	script.src= 'resouse.js'; 
// 	head.appendChild(script);
// }