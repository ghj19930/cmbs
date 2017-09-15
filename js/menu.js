//菜单栏小图标路径
var IMGPATH = "img/menu_icons/";

//菜单
var menu = [
	{
		"children":[

		],
		"text":"首页",
		"url":"首页.html",
		"img":"icon1",
		"target":"mainFrame"
	},
	{
		"children":[

		],
		"text":"合同管理",
		"url":"合同管理.html",
		"img":"icon2",
		"target":"mainFrame"
	},
	{
		"children":[
		
		],
		"text":"人员管理",
		"url":"人员管理.html",
		"img":"icon3",
		"target":"mainFrame"
	},
	{
		"children":[

		],
		"text":"审核校验",
		"url":"审核校验.html",
		"img":"icon4",
		"target":"mainFrame"
	},
	{
		"children":[
			{
				"children":[

				],
				"text":"用户管理",
				"url":"用户管理.html",
				"target":"mainFrame"
			},
			{
				"children":[

				],
				"text":"数据字典管理",
				"url":"数据字典管理.html",
				"target":"mainFrame"
			},
			{
				"children":[

				],
				"text":"修改个人密码",
				"url":"修改个人密码.html",
				"target":"mainFrame"
			}
		],
		"text":"系统管理",
		"url":"",
		"img":"icon5",
		"target":"mainFrame"
	}
];
/**
 * JSON无限折叠菜单
 * @constructor {AccordionMenu}
 * @param {options} 对象
 * @date 2013-12-13
 * @author tugenhua
 * @email 879083421@qq.com
 */
function AccordionMenu(options) {
	this.config = {
		containerCls        :  '',                // 外层容器
		menuArrs            :  '',                         //  JSON传进来的数据
		type                :  'click',                    // 默认为click 也可以mouseover
		renderCallBack      :  null,                       // 渲染html结构后回调
		clickItemCallBack   :  null                         // 每点击某一项时候回调
	};
	this.cache = {

	};
	this.init(options);
}
AccordionMenu.prototype = {
	constructor: AccordionMenu,
	init: function(options){
		this.config = $.extend(this.config,options || {});
		var self = this,
			_config = self.config,
			_cache = self.cache;

		// 渲染html结构
		$(_config.containerCls).each(function(index,item){

			self._renderHTML(item);
			// 处理点击事件
			self._bindEnv(item);
		});
	},

	_renderHTML: function(container){
		var self = this,
			_config = self.config,
			_cache = self.cache;
		var ulhtml = $('<ul class="menu-list"></ul>');
		$(_config.menuArrs).each(function(index,item){
			var liHtml;
			var url = item.url || 'javascript:void(0)';
			if(item.url == ""){
				lihtml = $("<li class='item'><a href='"+url+"' class='item-a lev' title="+item.text+"><img src='"+IMGPATH+item.img+".png' class='menu-icon' />"+item.text+"</a></li>");
			}else{
				lihtml = $("<li class='item'><a href='"+url+"' target='"+item.target+"' class='item-a lev' title="+item.text+"><img src='"+IMGPATH+item.img+".png' class='menu-icon'/>"+item.text+"</a></li>");
			}
			if(item.children && item.children.length > 0) {
				self._createSubMenu(item.children,lihtml);
			}
			$(ulhtml).append(lihtml);
		});
		$(container).append(ulhtml);

		_config.renderCallBack && $.isFunction(_config.renderCallBack) && _config.renderCallBack();

		// 处理层级缩进
		self._levelIndent(ulhtml);
	},
	/**
	 * 创建子菜单
	 * @param {array} 子菜单
	 * @param {lihtml} li项
	 */
	_createSubMenu: function(children,lihtml){
		var self = this,
			_config = self.config,
			_cache = self.cache;
		var subUl = $('<ul></ul>'),
			callee = arguments.callee,
			subLi;

		$(children).each(function(index,item){
			var url = item.url || 'javascript:void(0)';
			subLi = $('<li><a href="'+url+'" target="mainFrame" title="'+item.text+'">'+item.text+'</a></li>');
			if(item.children && item.children.length > 0) {
				callee(item.children, subLi);
			}
			$(subUl).append(subLi);
		});
		$(lihtml).append(subUl);
	},

	/**
	 * 处理层级缩进
	 */
	_levelIndent: function(ulList){
		var self = this,
			_config = self.config,
			_cache = self.cache,
			callee = arguments.callee;

		var lev = 1,
			$oUl = $(ulList);

		while($oUl.find('ul').length > 0){
			$oUl.children().children('ul').addClass("lev"+parseInt(lev+1))
			.children('li').addClass("lev"+parseInt(lev+1)+"-item")
			.children("a").addClass("lev"+parseInt(lev+1)+"-item-a");
			$oUl = $oUl.children().children('ul');
			lev++;
		}
		$(".item-a:eq(0)").addClass("current")
		$(ulList).find('ul').slideUp(200);
		$(ulList).find('ul:first').slideUp(200);
	},
	/**
	 * 绑定事件
	 */
	_bindEnv: function(container) {
		var self = this,
			_config = self.config;
		$('a',container).unbind(_config.type);
		//点击事件
		$('a',container).bind(_config.type,function(e){
			var breadcrumb = $(".title");
			var $this = $(this);
			var $parent = $this.parent();
			var _tit = $(this).text();
			var _url = $(this).attr("href");
			breadcrumb.text(_tit);
			breadcrumb.attr({
				"href":_url,
				"target":"mainFrame"
			});
			if($this.siblings('ul').length > 0){//有子菜单时
				$this.siblings('ul').stop(true).slideToggle(200);
				if($this.hasClass("lev")){
					$this.toggleClass("current");
					$this.siblings().find("li").removeClass("current");
					$parent.siblings().children(".lev").removeClass("current");
					$parent.siblings().find("li").removeClass("current");
				}else{
					$parent.siblings().removeClass("current");
					$this.siblings().find("li").removeClass("current");
				}
			}else{//无子菜单时
				if($this.hasClass("lev")){
					$this.addClass("current").parent().siblings().find("a").removeClass("current");
				}else{
					$parent.addClass("current");
					$parent.siblings().removeClass("current");
				}
			}
			//if($this.hasClass("lev")){
			//	var $imgUrl = $this.children("img").attr("data-src").split("_1.png")[0];
			//	var $sibImgUrl = $this.parent().siblings().find("img");
			//	if($this.hasClass("current")){
			//		$this.children("img").attr("src",$imgUrl+"_1.png");
			//	}else{
			//		$this.children("img").attr("src",$imgUrl+".png");
			//	}
			//}
			$this.parent('li').siblings().find('ul').slideUp(200);
			_config.clickItemCallBack && $.isFunction(_config.clickItemCallBack) && _config.clickItemCallBack($this);

		});
		////鼠标滑入和滑出
		//$('a',container).bind("mouseenter",function(e){
		//	var $this = $(this);
		//	if($this.hasClass("lev")){
		//		var $imgUrl = $this.children("img").attr("data-src").split("_1.png")[0];
		//		$this.children("img").attr("src", $imgUrl + "_1.png");
		//	}
		//}).bind("mouseleave",function(e){
		//	var $this = $(this);
		//	if($this.hasClass("lev")){
		//		var $imgUrl = $this.children("img").attr("data-src").split("_1.png")[0];
		//		if(!$this.hasClass("current")){
		//			$this.children("img").attr("src", $imgUrl + ".png");
		//		}
		//	}
		//});
	}
};
$(function(){
	//生成商户中心菜单
	new AccordionMenu({
		containerCls:"#menu",
		menuArrs:menu
	});
});