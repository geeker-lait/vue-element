import Vue from 'vue';
import axios from 'axios';

//const _domain = 'http://192.168.1.125:60008';
class UBT {
    constructor( params ) {
        this.APIs        = "/eagleeye/ubt";
        this.IPUrl       = "https://api.ipify.org";
        this.stroageName = "UBT_POST_DATA", //要发送数据名称
        this.type        = params.type;
        this.domain      = params.domain;
        this.version     = params.version;
        this.___timer    = false;
        // this.environment = (function(){
        //     var isNative = navigator.userAgent.match(/MobankerMobileType/i) || navigator.userAgent.match(/MobankerAppVersion/i) || navigator.userAgent.match(/MobankerAddChannel/i);
        //     var isWchat  = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
        //     return isNative ? 'native' : (isWchat ? 'wchat' : 'browser');
        // })();
        this.ns = []; //保存要发送的数据
        this.bulidOriginalId(); //生成唯一标识
        this.bulidIp(); //获取公网IP
        this.getGeo(); //百度获取省市，经纬度
        this.getCurrentDate();//获取服务器时间
    }
    init ( ...params ){
        const { domain } = this;
        let geo = JSON.parse(this.gGet("UBT_BAIDU_GEO")) || {};
        let prop = {
            $manufacturer  : 'H5',
            $os            : 'H5',
            $app_version   : this.version,
            $screen_width  : window.screen.availWidth,
            $screen_height : window.screen.availHeight,
            $ip            : this.gGet("UBT_IP") || '',
            $model         : navigator.platform, //编译平台Win32
            $os_version    : navigator.appVersion,
            $longitude     : geo.longitude || '',
            $latitude      : geo.latitude  || '',
            $province      : geo.address.province || '',
            $city          : geo.address.city || '',
            $district      : geo.address.province.district || '',
            $market        : this.getQueryParameter('channel') || 'fx' // 空的情况下默认值
        };

        let action = params[0];
        let event  = params[1];
        let properties  = params[2] || {};

        var d = new Date().getTime();
        var time = d - parseInt(this.gGet("UBT_CurrentDate_GEO"));
        //console.info("上传服务器:"+util.date_.dateTo(time/1000));
        let param = {
            domain : this.domain,
            timestamp: time, //时间需要取服务器
            action : action,
            event  : event,
            properties: Object.assign({}, prop, properties)
        };
        param.distinctId = this.gGet("UBT_DISTINCID") || this.gGet("UBT_ORIGINALID");
        if (action === 'signin' || action === 'signup') {
            params.originalId = param.distinctId;
        }
        this.ns.push( param );
        this.gSet(this.stroageName, JSON.stringify(this.ns));

        if( this.type) {
            if(this.type.number ){//根据条数发送
                this.notesNum = this.type.number || 100;
                this.sendData('notesNum');
            }else if( this.type.custom ){//时时发送
                this.sendCustom();
            }else if(this.type.timer && !this.___timer){//根据时间 发送
                this.times = this.type.timer || 10;
                this.___timer = true;
                this.sendAjaxTimer();
            }
        }
    }
    go (_action, event , prop){ //进入、离开
        var self = this;
        _ubt.init(_action, event || _action, prop);
        self.sendData();
    }
    sign (_action, _event , prop ,_uid){ //登录、注册
        var self = this;
        self.gSet("UBT_DISTINCID", _uid );
        _ubt.init(_action , _event || _action , prop);
        self.sendData();
    }
    sendAjax ( _data , _type ){ //发送数据
        var self = this,_url = _type == "signin" || _type == "signup" ? "/trackSignup" : "/trackEventByBatch";
        axios({
            method: 'post',
            url: this.APIs + _url,
            data: _data
        })
    }
    sendData ( _type ){//存储数据
        var self = this,items = JSON.parse(self.gGet(self.stroageName));
        switch (_type) {
            case "notesNum":
                var number = self.notesNum;
                if(items.length > number){
                    var postData = items.slice(0, number);
                    self.sendAjax(postData);
                    self.ns = items.slice(number, items.length);
                    self.gSet(self.stroageName, JSON.stringify(self.ns));
                    //console.info("发送数据notesNum:"+ items);
                }
                break;
            default:
                if(items && items.length > 0){
                    self.sendAjax(items);
                    self.ns = [];
                    self.gRemove(self.stroageName);
                    //console.info("发送数据All:"+ items);
                }
                break;
        }
    }
    sendCustom(){//及时发送数据
        this.sendData();
    }
    sendAjaxTimer(){//定时发送数据
        // console.info("tt_interval")
        // let a = new Date().getTime();
        var self = this;
        var tt = 'tt_interval';
        self[ tt ] = setInterval(function(){
            var data = JSON.parse(self.gGet(self.stroageName));
            if (data) {
                self.sendData();
                self.___timer = false;
                clearInterval( self[ tt ]);

                // let b = new Date().getTime();
                // console.info("tt_interval:" + (b-a))
            }

        },1000 * self.times);
    }
    bulidOriginalId(){ //生成唯一标识
        //let self = this,str = self.environment === "native" ? native.distinctId() : Math.random().toString(36).substr(2);
        let self = this,str = Math.random().toString(36).substr(2);
        self.gSet("UBT_ORIGINALID", str);
    }
    bulidIp(){//获取公网IP
        let self = this;
        axios.get(this.IPUrl).then((res) => {
            self.gSet("UBT_IP", res.data || '' )
        });
    }
    getGeo(){//百度获取省市，经纬度
        var self = this;
        const geo = new BMap.Geolocation();
        if (geo) {
            geo.getCurrentPosition((res) => {
                self.gSet("UBT_BAIDU_GEO", JSON.stringify( res ));
            });
        }
    }
    gSet(_key, _value) { //设置缓存
        localStorage.setItem(_key, _value);
    }
    gGet(_key) { //获取缓存
        return localStorage.getItem(_key);
    }
    gRemove(_key) {//移除缓存
        localStorage.removeItem(_key);
    }
    getQueryParameter ( name ){//获取URL中参数
        let href = window.location.href.split("?")[1];
        let obj = {};
        if( href ){
            var arr = href.split("&");
            for(var i=0;i<arr.length;i++){
                var r = arr[i].split("=");
                obj[ r[0] ] = r[1] && decodeURIComponent(r[1]);
            }
        }
        return name ? obj[name] : obj;
    }
    getCurrentDate(){
        var self = this;
        axios.get(self.APIs+"/getCurrentTimestamp").then((res) => {
            var d = new Date().getTime();
            var time = d - res.data;
            //console.info("  本地："+util.date_.dateTo(d/1000));
            //console.info("服务器："+util.date_.dateTo(res.data/1000));
            self.gSet("UBT_CurrentDate_GEO", time);
        });
    }
    merge ( first, second ) {
        var i = first.length, j = 0;
        if ( typeof second.length === "number" ) {
            for ( var l = second.length; j < l; j++ ) {
                first[ i++ ] = second[ j ];
            }
        } else {
            while ( second[j] !== undefined ) {
                first[ i++ ] = second[ j++ ];
            }
        }
        first.length = i;
        return first;
    }
}
Vue.directive('ubt', {
    inserted(el, binding, vnode , oldVnode) {
        let { action, event, prop = {} } = binding.value;
        let el_input = null
        if( el.tagName === 'DIV'){
            el_input = (_ubt.merge([],el.childNodes)).filter( item => {
                return item.tagName === 'INPUT';
            })
        }
        el.addEventListener(action, ()=>{
            if(el.tagName === 'INPUT'){
                prop.content = el.value;
            }else if( el_input && el_input[0].tagName === 'INPUT' ){
                prop.content = el_input[0].value;
            }
            _ubt.init(action, event, prop);
        },false);
    }
});
window._ubt = new UBT({
    domain   : 'FX',
    version  : '1.0.0',
    //时间(timer)，条数(number)，自动(custom)。默认number,100条
    type     : {
        timer : 10,//秒（默认）
        //custom : true,//自动发送
        //number : 50,//条数100
    }
});

/*
    页面使用：
    1）：
       <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=QQUXU5xjzwWND36dGjniWC0aGLMDLdXB"></script>
       import '@/commonjs/ubt';
    2）：
    <input type="text"  v-ubt="{action: 'click', event: 'input'}" />

    //element.js
	<el-button type="primary" @click="btn_login" v-ubt="{action: 'click', event: '登陆'}">登陆</el-button>
	   //自定义 prop
	<el-button type="primary" @click="btn_login" v-ubt="{action: 'click', event: '登陆' , prop :{remake:true}}">登陆</el-button>
	<el-button type="primary" @click="btn_login" v-ubt="{action: 'click', event: '登陆' , abc : {bcd:true}}">登陆</el-button>

	//登录、注册(action: signin , signup)
	//sign (_action, event , prop,_uid)
	_ubt.sign('signin', '登录',{},"郭志勇");
	_ubt.sign('signup', '注册',{},"郭志勇");

	//进入、离开(action: goin , goto)
	//go (_action, _event , prop )
	_ubt.go('goin', '进入'+to.name, {});//进入、离开
	_ubt.go('goto', '离开', {});
	//手动触发事件(必须this.stroageName中有1条以上数据才能触发)
	_ubt.sendData();
*/


