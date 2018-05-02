/*"use strict";是一个编译指示，用于告诉支持javascript的引擎切换到严格模式*/

var data=[];

var dataStr = '\
1、金福南杀人事件始末<br>\
<br>\
类    型：剧情 / 惊悚 / 恐怖 / 犯罪 <br>\
主    演：徐英姬，池成媛，黄民浩，朴正学，白秀莲，黄智橹 <br>\
片    长：116分钟（韩国） <br>\
上映时间：2010年9月2日<br>\
拍摄地点：韩国 <br>\
拍摄日期：2010年 <br>\
导    演：张哲洙 <br>\
编    剧：张哲洙，崔观英<br>\
<br>\
<br>\
2、灵魂摆渡黄泉<br>\
<br>\
中文名：灵魂摆渡·黄泉 <br>\
出品公司：爱奇艺 <br>\
制片地区：中国大陆 <br>\
拍摄地点：北京怀柔 <br>\
拍摄日期：2017年5月27日 <br>\
导    演：巨兴茂 <br>\
编    剧：小吉祥天 <br>\
类    型：古装、神话、爱情 <br>\
主    演：于毅，何花，王昌瑞，岳丽娜，倪虹洁，巨兴茂，鲁佳妮<br>\
<br>\
<br>\
3、肖申克的救赎<br>\
<br>\
导演: 弗兰克·德拉邦特<br>\
编剧: 弗兰克·德拉邦特 / 斯蒂芬·金<br>\
主演: 蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿 / 威廉姆·赛德勒 / 克兰西·布朗 / 更多...<br>\
类型: 剧情 / 犯罪<br>\
制片国家/地区: 美国<br>\
语言: 英语<br>\
上映日期: 1994-09-10(多伦多电影节) / 1994-10-14(美国)<br>\
片长: 142 分钟<br>\
又名: 月黑高飞(港) / 刺激1995(台) / 地狱诺言 / 铁窗岁月 / 消香克的救赎';
var d = dataStr.split('<br><br><br>');
for(i in d){
	var con = d[i].split('<br><br>');
	data.push({
		image:con[0]+".jpg",
		caption:con[0].split('、')[1],
		descript:con[1]
	});
	console.log(con[0]+".jpg");
}
/*--------以上是数据部分-------*/


/*1.翻面控制*/
function turn(element){
	var clas = element.className;
	//方法一
	/*用正则表达式测试是否含有某个class*/
	/*if(/photo_front/.test(clas)){
		clas=clas.replace(/photo_front/,"photo_back")
	}else{
		clas=clas.replace(/photo_back/,"photo_front")
	}*/
	//方法二
	/*用RegExp对象代替正则表达式测试是否含有某个class*/
	var str = new RegExp("photo_front");
	var str1 = new RegExp("photo_back");

	/*var str2 = new RegExp("photo_center");
	var photos = g('.photo');
	for(let i=0 ; i< photos.length; i++){
		if(str2.test(photos[i].className)){
			photos[i].className.replace(str2,'');
		}
	}
	clas += ' photo_center ';*/
	var n = element.id.split('_')[1];

	if(!/photo_center/.test(clas)){
		return resort(n);
	}

	if(str.test(clas)){
		clas=clas.replace(str,"photo_back");
		g('#nav_'+n).className += ' i_back ';
	}else{
		clas=clas.replace(str1,"photo_front");	
		g('#nav_'+n).className = g('#nav_'+n).className.replace(/\s*i_back\s*/,'');
	}

	return  element.className = clas;
}

/*3.通用函数*/
function g(selector){
	var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}
/*4.输出所有的海报*/
function addPhotos(){
	var template = g('#wrap').innerHTML;
	var html=[];
	var nav =[];
	for(let s in data){
		var _html = template
							.replace('{{index}}',s)
							.replace('{{image}}',data[s].image)
							.replace('{{caption}}',data[s].caption)
							.replace('{{desc}}',data[s].descript);
		html.push(_html);
		nav.push('<span class="i" id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))">&nbsp;</span>');
	}
	html.push('<div class="nav"> '+nav.join('')+'</div>');
	g('#wrap').innerHTML = html.join('');
	resort(random([0,data.length-1]));
}
addPhotos();

/*5.排序海报*/
function resort(n){
	var _photo = g('.photo');/*获得的不是真正的数组(不能用数组的sort方法)，下面代码将其转成真正的数组*/
	var _nav = g('.i');
	var photos = [];
	var navs = [];
	for(let i = 0 ; i <  _photo.length ; i++){/*标准数组才可以用for(i in _photo)*/
		_photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/,' ');//\s*去除空格
		_photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/,' ');
		_photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/,' ');
		_photo[i].className += ' photo_front ';
		_photo[i].style.left="";
		_photo[i].style.top='';
		_photo[i].style['transform'] = _photo[i].style['-webkit-transform']='rotate(360deg) scale(1.2)';
		photos.push(_photo[i]);
	}
	for(let s = 0 ; s < _nav.length ; s++){
		_nav[s].className = _nav[s].className.replace(/\s*i_back\s*/,'');
	}
	var photo_center = g('#photo_'+n);
	photo_center.className += ' photo_center ';
	/*除去中间的图片*/
	photos.splice(n,1);
	console.log(photos.length);
	/*把剩余的图片分为左右两部分*/
	var photos_left = photos.splice(0,Math.ceil(photos.length/2));//将一半的数向上取整
	var photos_right = photos;
	var ranges = range();
	for(let s in photos_left){
		var photo = photos_left[s];
		photo.style.left = random(ranges.left.x)+'px';
		photo.style.top = random(ranges.left.y)+'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	for(let s in photos_right){
		var photo = photos_right[s];
		photo.style.left = random(ranges.right.x)+'px';
		photo.style.top = random(ranges.right.y)+'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	/*控制按钮的处理*/
	var navs = g('.i');
	for(let j = 0 ; j < navs.length ; j++){
		navs[j].className = navs[j].className.replace(/\s*i_current\s*/,'');
		navs[j].className = navs[j].className.replace(/i_back/,'');
	}
	g('#nav_'+n).className += ' i_current ';
	console.log(g('#nav_'+n).className);
	console.log(photos_left.length,photos_right.length);

}

/*6.计算左右分区x、y的范围 {left:{x:[min,max],y:[]]} right:{x:[],y:[]}*/
function range(){
	var range = { left: {x:[],y:[]} ,right :{x:[],y:[]} };
	var wrap ={
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight,
	}
	var photo ={
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight,
	}
	range.wrap = wrap;
	range.photo = photo;
	range.left.x = [0-photo.w/2,wrap.w/2-photo.w/2-photo.w];
	range.left.y = [0-photo.h,wrap.h];
	range.right.x = [wrap.w/2+photo.w/2,wrap.w];
	range.right.y = range.left.y;

	return range;
}

/*随机生成一个值 支持取值范围* random ([min,max])*/
function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max-min;
	var number = Math.ceil(Math.random()*diff + min);//取整
	return number;
}
