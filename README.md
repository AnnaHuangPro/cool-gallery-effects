# cool-gallery-effects
这是一个炫酷的画廊

# 编码前的VCD分析
 view control data
 
 ![](/photo/VCD.png)
 
# Transform：
转换,以下代码完成了3D转换
图片的正面绕Y轴旋转了0度，图片的反面绕着Y轴旋转了180到了图片的背面，同时我们设置转到了背面的那一面设置隐藏。
-webkit-transform-style:preserve-3d;支持子元素的3D效果
 !()[/photo/transform.png]
 
# Margin
Margin的4个值的顺序是 顺时针 上右下左

# Js的replace方法
```str.replace(/Microsoft/, "W3School")```

**注意：第一个参数是一个正则表达式没有引号**

# substr
 ![](/photo/substr.png])
 
getElementById是查找的某个元素（因为id只有一个）
getElementsByClassName查出来的结果是一个类似于数组的东西（因为classname可以重复）

VBScript 中的续行符是 "_"  下划线
JScript中的续行符是  "\"     反斜杠

# Join()

将数组组合成字符串，括号里面是分隔符
 ![](/photo/join.png)
 
# Js的Math对象
 
![](/photo/math1.png)
![](/photo/math2.png)

# 生成一定范围的随机数

![](/photo/suijishu.png)
 
# 左右分区的极限分析

![](/photo/jixianfenxi.png)
 
# Js的临时变量
![](/photo/variable.png)

# Js中删除数组中的某个元素

原文链接：http://caibaojian.com/js-splice-element.html 

### 删除(splice)

> 删除起始下标为1，长度为1的一个值(len设置1，如果为0，则数组不变)

```
var arr = ['a','b','c','d'];
arr.splice(1,1);
console.log(arr);  
//['a','c','d']; 
```

> 删除起始下标为1，长度为2的一个值(len设置2)

```
var arr2 = ['a','b','c','d']
arr2.splice(1,2);
console.log(arr2); 
//['a','d'] 

```

### 替换

> 替换起始下标为1，长度为1的一个值为‘ttt’，len设置的1

```
var arr = ['a','b','c','d'];
arr.splice(1,1,'ttt');
console.log(arr);        
//['a','ttt','c','d'] 


var arr2 = ['a','b','c','d'];
arr2.splice(1,2,'ttt');
console.log(arr2);       
//['a','ttt','d'] 替换起始下标为1，长度为2的两个值为‘ttt’，len设置的1 

```

### delete

> delete删除掉数组中的元素后，会把该下标出的值置为undefined,数组的长度不会变

```
var arr = ['a','b','c','d'];
delete arr[1];
arr;  
//["a", undefined × 1, "c", "d"] 中间出现两个逗号，数组长度不变，有一项为undefined
```

# box-sizing

在CSS中，你设置一个元素的 width 与 height 只会应用到这个元素的内容区。如果这个元素有任何的 border 或 padding ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。
box-sizing 属性可以被用来调整这些表现:
•	content-box  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
•	border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。
一些专家甚至建议所有的Web开发者们将所有的元素的**box-sizing都设为border-box**。

# 案例总结：

1.	模块分析法

2.	VCD分析法（通用所有的特效案例）
View controller data (视图、控制、数据)

3.	一些新的css效果
1）3D视图位置设置，子元素3D支持
2）翻转为不可见时隐藏
3）使用css旋转（Y轴）和位移
4）css切换动画（所有时间等等）

4.  前端的脚本技巧
1）字符串替换的简易模办功能
2）根据范围获取一个随机数
3）使用脚本切换元素的className以及具体的style属性

5.  css3样式

![](/photo/css3_1.png)
![](/photo/css3_2.png)
![](/photo/css3_3.png)
![](/photo/css3_4.png)
![](/photo/css3_5.png)
  
6.  javascript

![](/photo/js_1.png)

replace返回的就是一个字符串

![](/photo/js_2.png)
![](/photo/js_3.png)
![](/photo/js_4.png)

splice方法 返回干净的数组

![](/photo/js_5.png)
 

