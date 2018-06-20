/*"use strict";是一个编译指示，用于告诉支持javascript的引擎切换到严格模式*/

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
		_photo[i].style['transform'] = _photo[i].style['-webkit-transform']='rotate(360deg) scale(1.5)';
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
	console.log("左:"+photos_left.length,"右:"+photos_right.length);

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
	range.left.x = [0-photo.w/2 , wrap.w/2-photo.w/2-photo.w];
	range.left.y = [0-photo.h/2 , wrap.h-photo.h/3];
	range.right.x = [wrap.w/2+photo.w/2+photo.w , wrap.w];
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

/*右侧的伸缩框（拉开时的Class:rightWrap_shrink,缩起时class:rightWrap_out）*/
function pull(element){
    let cls = element.className;
    var out = new RegExp("rightWrap_out");
    var shrink = new RegExp("rightWrap_shrink");
    if(out.test(cls)){
        pull_out();
    }
    if(shrink.test(cls)){
        pull_shrink();
    }
}

/*实现拉开的动作*/
function pull_out() {
    let rightWrap_out = g('.rightWrap_out')[0];
    rightWrap_out.className = rightWrap_out.className.replace(/\s*rightWrap_out\s*/,'');
    rightWrap_out.className += " rightWrap_shrink ";
    let wrap = g('.wrap')[0];
    wrap.className += " wrap_out ";
}

/*实现缩起的动作*/
function pull_shrink() {
    let rightWrap_shrink = g('.rightWrap_shrink')[0];
    rightWrap_shrink.className = rightWrap_shrink.className.replace(/\s*rightWrap_shrink\s*/,'');
    rightWrap_shrink.className += " rightWrap_out ";
    let wrap = g('.wrap')[0];
    wrap.className = wrap.className.replace(/\s*wrap_out\s*/,'');

}

/*图片上传功能*/
function imgPreview(fileDom){
    //判断是否支持FileReader
    if (window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }

    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    reader.readAsDataURL(file);
    //读取完成
    reader.onload = function(e) {
        //获取图片dom
        var img = document.getElementById("preview");
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };

}
