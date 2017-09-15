import Ajax from './ajax'
var domain = window.res__ || '';//所有请求路径参数配置入口
export default {
	ajax : Ajax,
	test : {
		save :        domain + "/userstest/save",
		saveJson :    domain + "/userstest/saveJson",
	},
	user : {
		login:        domain + "/user/login", //登录
		logout:       domain + "/user/logout", 
		menu:         domain + "/user/menu", 
		userLogin:    domain + "/note/user/userLogin", //登录2
	}
};