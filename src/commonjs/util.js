//通用方法
var UTIL = {
    isLogin :function(){//判断是否登录
        if(sessionStorage.getItem('token')){
            vm.$children[0].isLogin = true;
        }else{
            window.location.href="login"
        }
    },
    ajax : function(url,param,requestType, fn ,fn2){//ajax请求
        var _ajax = new apiConfig.ajax();
        _ajax.url = url;
        _ajax.param = param;
        _ajax.requestType = requestType;
        if(Object.prototype.toString.call( requestType ) === "[object Function]"){
            _ajax.requestType = 'application/json';
            fn2 = fn;
            fn = requestType;
        }
        _ajax.exec(function( success ){
            fn && fn( success )
        },function( error ){
            fn2 && fn2( error );
            Dialog.alert(error);
        })
    },
    date_ : {
        dateTo : function(r) {  //秒转换成日期
            var q,p,o,n,m,l,k,j;
            return r = 1000 * r,
            q = new Date,
            q.setTime(r),
            p = "" + q.getFullYear(),
            o = q.getMonth() + 1,
            n = q.getDate(),
            m = q.getHours(),
            l = q.getMinutes(),
            k = q.getSeconds(),
            p + "-" + (o > 9 ? o : "0" + o) + "-" + (n > 9 ? n : "0" + n) +" "+ (m > 9 ? m : "0" + m) +":"+ (l > 9 ? l : "0" + l) +":"+ (k > 9 ? k : "0" + k)
        },
        toDate : function (b) { //日期转换成秒
            var t = new Date(b.replace(/-/g, "/")).getTime();
            return t
        }
    },
    extendObj : function( p, c) {//复制一个新对象
      var c = c || {};
      for (var i in p) {
        if(typeof p[i] === 'object') {
          c[i] = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
          this.extendObj(p[i], c[i]);
        } else {
          c[i] = p[i];
        }
      }
      return c;
    }
}
export default UTIL;