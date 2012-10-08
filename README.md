#BeautySelect
=====================
version 0.1

这几天在项目中需要用到自定义的下拉框，开源的现在有好多个，并且很好用了，比如这个[chosen](http://harvesthq.github.com/chosen/)。
但是这些插件虽然功能强大，对项目来说却太庞大了，里面大部分功能都用不到，于是就抽空写了个简单的下拉框美化控件BeautySelect。

目前才刚开始写，功能非常简单，代码也很少，在ie6，7，8，chrome，firefox上测试过了，单元测试截图在最下面。
特点：小巧，接下来的其他功能和接口将写在扩展的脚本里，样式全部在BeautySelect.css中，可自定义（除了宽度，宽度取select控件的宽度)。

使用示例([demo](http://hmjlr123.github.com/BeautySelect/))：

调用插件：
```
var beauty = $('#s1').beautySelect({
	onChange: function (e, data) {
		alert(data);
	}
});
```

取当前值(beauty为前面调用插件时的返回值) :
```
beauty['s1'].val();
```

设置值 :
```
beauty['s1'].val(1);
```

添加项：
```
beauty['s1'].addOption('选项5', 5);
```

###测试截图（[Qunit](https://github.com/jquery/qunit))：
![图片1](https://raw.github.com/hmjlr123/BeautySelect/master/image/test.png)
![图片2](https://raw.github.com/hmjlr123/BeautySelect/master/image/test2.png)
