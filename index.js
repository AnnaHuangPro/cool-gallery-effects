/*"use strict";是一个编译指示，用于告诉支持javascript的引擎切换到严格模式*/

// 调试过程中可能会用到清空缓存（最开始尝试了localStorage）
// localStorage.clear();


/*1.翻面控制*/
function turn(element){
	let clas = element.className;
	//方法一
	/*用正则表达式测试是否含有某个class*/
	/*if(/photo_front/.test(clas)){
		clas=clas.replace(/photo_front/,"photo_back")
	}else{
		clas=clas.replace(/photo_back/,"photo_front")
	}*/
	//方法二
	/*用RegExp对象代替正则表达式测试是否含有某个class*/
	let str = new RegExp("photo_front");
	let str1 = new RegExp("photo_back");

	/*let str2 = new RegExp("photo_center");
	let photos = g('.photo');
	for(let i=0 ; i< photos.length; i++){
		if(str2.test(photos[i].className)){
			photos[i].className.replace(str2,'');
		}
	}
	clas += ' photo_center ';*/
	let n = element.id.split('_')[1];

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

/*3.通用函数 用class查找元素时返回的是一个伪数组（因为class名字可以有多个），用id查找元素时返回的是一个对象（而id的元素只有一个）*/
function g(selector){
	let method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
	return document[method](selector.substr(1));
}

/*4.输出所有的海报*/
/*曾经尝试用的localStorage,现在用IndexedDB*/
/*function addPhotos(){
	let template = g('#wrap').innerHTML;
	let html=[];
	let nav =[];
	/!*取出缓存的数量*!/
	let length = localStorage.length;
	if(length != 0)
	{
		for(let s = 0; s < length-1; s++){
			let data = localStorage.getItem("n"+s);
			let dataObj = JSON.parse(data);
			let _html = template
				.replace('{{index}}',s)
				.replace('{{image}}',dataObj.image)
				.replace('{{caption}}',dataObj.captions)
				.replace('{{desc}}',dataObj.desc);
			html.push(_html);
			nav.push('<span class="i" id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))">&nbsp;</span>');
    	}
        html.push('<div class="nav"> '+nav.join('')+'</div>');
        g('#wrap').innerHTML = html.join('');
        resort(random([0,length-2]));
	}else{

	}

}*/

var allLength = 0;
var originTemplate;
function addPhotos(){
    originTemplate = g('#wrap').innerHTML;
    let template = originTemplate;
    let html=[];
    let nav =[];
    /*取出浏览器数据库的数量*/
    app.db.getAll(function (items) {
        console.log(items);
        allLength = items.length;
        if(items.length != 0)
        {
            for(s in items){
                let _html = template
                    .replace('{{index}}',s)
                    .replace('{{image}}',items[s].wrap.image)
                    .replace('{{caption}}',items[s].wrap.captions)
                    .replace('{{desc}}',items[s].wrap.desc);
                html.push(_html);
                nav.push('<span class="i" id="nav_'+s+'" onclick="turn(g(\'#photo_'+s+'\'))">&nbsp;</span>');
            }
            html.push('<div class="nav"> '+nav.join('')+'</div>');
            g('#wrap').innerHTML = html.join('');
            resort(random([0,items.length-1]));
        }else{
            let desc = '<h3>TIP</h3>' +
                '<p>1.点击右侧小箭头可弹出小弹框<br/>' +
                '2.可选择图片<br>' +
                '3.可填写图片的标题将显示在图片的下方<br>' +
                '4.可填写图片的描述将显示在图片的背面</p>' +
                '<strong>快试一试吧（多加几张美图效果更佳哟）</strong>';
            let _html = template
                .replace('{{index}}',0)
                .replace('{{image}}',"photo/404.png")
                .replace('{{caption}}',"我的背后可有秘籍哦~")
                .replace('{{desc}}',desc);
            html.push(_html);
            nav.push('<span class="i" id="nav_0" onclick="turn(g(\'#photo_0\'))">&nbsp;</span>');
            html.push('<div class="nav"> '+nav.join('')+'</div>');
            g('#wrap').innerHTML = html.join('');
        }
    });
   /*
*/
}
addPhotos();

/*5.排序海报*/
function resort(n){
	let _photo = g('.photo');/*获得的不是真正的数组(不能用数组的sort方法)，下面代码将其转成真正的数组*/
	let _nav = g('.i');
	let photos = [];
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
	let photo_center = g('#photo_'+n);
	photo_center.className += ' photo_center ';
	/*除去中间的图片*/
	photos.splice(n,1);
	console.log(photos.length);
	/*把剩余的图片分为左右两部分*/
	let photos_left = photos.splice(0,Math.ceil(photos.length/2));//将一半的数向上取整
	let photos_right = photos;
	let ranges = range();
	for(let s in photos_left){
		let photo = photos_left[s];
		photo.style.left = random(ranges.left.x)+'px';
		photo.style.top = random(ranges.left.y)+'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	for(let s in photos_right){
		let photo = photos_right[s];
		photo.style.left = random(ranges.right.x)+'px';
		photo.style.top = random(ranges.right.y)+'px';
		photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	/*控制按钮的处理*/
	let navs = g('.i');
	for(let j = 0 ; j < navs.length ; j++){
		navs[j].className = navs[j].className.replace(/\s*i_current\s*/,'');
		navs[j].className = navs[j].className.replace(/i_back/,'');
	}
	g('#nav_'+n).className += ' i_current ';
	console.log("左:"+photos_left.length,"右:"+photos_right.length);

}

/*6.计算左右分区x、y的范围 {left:{x:[min,max],y:[]]} right:{x:[],y:[]}*/
function range(){
	let range = { left: {x:[],y:[]} ,right :{x:[],y:[]} };
	let wrap ={
		w:g('#wrap').clientWidth,
		h:g('#wrap').clientHeight,
	}
	let photo ={
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
	let max = Math.max(range[0],range[1]);
	let min = Math.min(range[0],range[1]);
	let diff = max-min;
	let number = Math.ceil(Math.random()*diff + min);//取整
	return number;
}

/*右侧的伸缩框（拉开时的Class:rightWrap_shrink,缩起时class:rightWrap_out）*/
function pull(element){
    let cls = element.className;
    let out = new RegExp("rightWrap_out");
    let shrink = new RegExp("rightWrap_shrink");
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
    let file = fileDom.files[0];
    let imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    reader.readAsDataURL(file);
    //读取完成

    reader.onload = function(e) {
        //获取图片dom
        let img = document.getElementById("preview");
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };

}

/* 这是曾经尝试过的LocalStorage存储 */
/*function addOnePhoto(){
		let imgSrc = document.getElementById("preview").src;
		let caption = document.getElementById("caption").value;
		let desc = document.getElementById("desc").value;
        let wrap = {
            image: imgSrc,
            desc: desc,
            captions:caption
        };
        let wrapStr = JSON.stringify(wrap);
    	let photoid;
        if(!localStorage.photoid){
        	photoid = 0;
		}else{
            photoid = parseInt(localStorage.photoid);
            photoid++;
		}
    	localStorage.setItem("n"+photoid, wrapStr);
    	localStorage.setItem("photoid",photoid);
    	addPhotos();
}*/

/*现在使用indexedDB*/
function addOnePhotoToCoolGallery(){
        let template = g('#wrap').innerHTML;
        let nav = g('.nav')[0].innerHTML;
        let wrap = arguments[0];
        allLength++;
        template += "<div class=\"photo photo_front\" onclick=\"turn(this)\" id='photo_" + (allLength - 1) + "'>\n" +
            /*         "<span class=\"delete\" onclick=\"deletePhoto(this)\"></span>"+*/
            "\t\t\t\t<!-- photo_wrap 负责翻转 -->\n" +
            "\t\t\t\t<div class=\"photo_wrap\">\n" +
            "\t\t\t\t\t<div class=\"side side-front\">\n" +
            "\t\t\t\t\t\t<p class=\"image\"><img src='" + wrap.image + "'></p>\n" +
            "\t\t\t\t\t\t<p class=\"caption\">" + wrap.captions + "</p>\n" +
            "\t\t\t\t\t</div>\n" +
            "\t\t\t\t\t<div class=\"side side-back\">\n" +
            "\t\t\t\t\t\t<p class=\"descript\">" + wrap.desc + "</p>\n" +
            "\t\t\t\t\t</div>\n" +
            "\t\t\t\t</div>\n" +
            "\t\t\t</div>"
        g('#wrap').innerHTML = template;
        nav += '<span class="i" id="nav_' + (allLength - 1) + '" onclick="turn(g(\'#photo_' + (allLength - 1) + '\'))">&nbsp;</span>';
        g('.nav')[0].innerHTML = nav;
        resort(allLength - 1);
}
function firstAdd(){
    // g('#wrap').innerHTML = "";
    let wrap = arguments[0];
    let nav = [];
    let html = [];
    allLength++;
    let _html = originTemplate
        .replace('{{index}}',0)
        .replace('{{image}}',wrap.image)
        .replace('{{caption}}',wrap.captions)
        .replace('{{desc}}',wrap.desc);
    html.push(_html);
    nav.push('<span class="i" id="nav_'+0+'" onclick="turn(g(\'#photo_'+0+'\'))">&nbsp;</span>');
    html.push('<div class="nav"> '+nav.join('')+'</div>');
    g('#wrap').innerHTML = html.join('');
}

function addOnePhoto(){
    let imgSrc = document.getElementById("preview").src;
    let caption = document.getElementById("caption").value;
    let desc = document.getElementById("desc").value;
    let wrap = {
        image: imgSrc,
        desc: desc,
        captions:caption
    };
    app.db.save({id:allLength, wrap:wrap}, function () {
        //回调函数
        if(allLength == 0){
            firstAdd(wrap);
        }else{
            addOnePhotoToCoolGallery(wrap);
        }
        document.getElementById("preview").src = "";
        document.getElementById("caption").value = "";
        document.getElementById("desc").value = "";
        console.log(wrap+"添加成功");
    });
}

//删除图片
function deletePhoto(item){
   let n = item.parentElement.id.split('_')[1];
    app.db.delete(n, function () {
        console.log('删除成功');
    })
}

function loadPicture(){
    console.log(arguments[0]);
    // arguments[0].src="https://github.com/AnnaHuangPro/cool-gallery-effects/blob/master/photo/404.png";
    // arguments[0].src="E:\\wo\\造轮子\\学习的小项目\\Cool-gallery-effects-of-CSS3-js\\cool-gallery-effects\\photo\\join.png";
}