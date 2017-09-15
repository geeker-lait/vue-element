import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/components/PageTransition' //默认

Vue.use(Router);

/*按需加载*/
export const vueConfig = {
	index : resolve => require.ensure([], () => resolve(require('@/vue/index')), 'common/index'),//首页
	login : resolve => require.ensure([], () => resolve(require('@/vue/login/login')), 'common/login'),//登陆
	tpl : {
		header_tpl : resolve => require.ensure([], () => resolve(require('@/components/header')), 'common/header'),//头部
		menu_tpl   : resolve => require.ensure([], () => resolve(require('@/components/menu')), 'common/menu'),//左测菜单
		skin_tpl   : resolve => require.ensure([], () => resolve(require('@/components/skin')), 'common/skin'),//右测
	},
	vue : {
		test : {
			tree              : resolve => require.ensure([], () => resolve(require('@/vue/test/tree')), 'vue/test/tree'),
			table             : resolve => require.ensure([], () => resolve(require('@/vue/test/table')), 'vue/test/table'),
			datetimePicker    : resolve => require.ensure([], () => resolve(require('@/vue/test/datetimePicker')), 'vue/test/datetimePicker'),
			transfer          : resolve => require.ensure([], () => resolve(require('@/vue/test/transfer')), 'vue/test/transfer'),
			test              : resolve => require.ensure([], () => resolve(require('@/vue/test/test')), 'vue/test/test'),
		}
	}
}
//多渠道加载不同模板
// var aaa = window.location.href;
// function fn__( obj ){
// 	var aa = aaa.split("component=")[1]
// 	return obj[aa];
// }
export default new Router({
	mode: 'history', //去掉#
	routes: [
	    {
			path: '/',
			component : PageTransition,
			children: [
				{path: '',component : vueConfig.login},//登陆
				{path: 'login',component : vueConfig.login},//登陆
				{path: 'index',           component : vueConfig.index},//首页
			 //    {path: 'tree',            component :   
			 //    	fn__({
				//     	A : 	vueConfig.vue.test.table,
				//     	B : 	vueConfig.vue.test.datetimePicker,
				//     	C : 	vueConfig.vue.test.transfer,
				//     	D : 	vueConfig.vue.test.test,
				//     })  //Tree 树形控件
				// },
			    {path: 'tree',            component : vueConfig.vue.test.tree},  //Tree 树形控件
			    {path: 'table',           component : vueConfig.vue.test.table},//Table 表格
			    {path: 'datetimePicker',  component : vueConfig.vue.test.datetimePicker},  //日期时间选择器
			    {path: 'transfer',        component : vueConfig.vue.test.transfer},//穿梭框
			    {path: 'test',            component : vueConfig.vue.test.test},
			]
	    }
	]
})
