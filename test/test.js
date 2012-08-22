var beautySlts;
$(function() {
	beautySlts = $('#s1,#s2').beautySelect();
});
test("下拉框的创建", function() {
	var beautyLen = 0;
	for (var i in beautySlts) {
		if (beautySlts.hasOwnProperty(i))
			beautyLen++;
	}
	equal(beautyLen, 2, "下拉框数量为2");
	ok(beautySlts['s1'], 's1有美化');
	ok(beautySlts['s2'], 's2有美化');
	ok(!beautySlts['s3'], 's3无美化');
	var s1Len = $('#s1').find('option').length, s1BeautyLen = beautySlts['s1'].ul.find('li').length;
	equal(s1Len, s1BeautyLen, '生成的下拉框选项数量正确');
	equal($('#s1').find('option').eq(0).text(), beautySlts['s1'].currentText.text(), '美化控件的文本正确');
});

test("界面", function() {
	equal($('#s1').css('display'), 'none', '默认的下拉框应该隐藏');
	var s1offset = beautySlts['s1'].wrap.offset(), s2offset = beautySlts['s2'].wrap.offset();
	//console.log(s1wrap.offset(),s2wrap.offset());
	ok(Math.abs(s1offset.top - s2offset.top) <= 1, "两个美化控件应该在同一行")
});

test("接口", function() {
	//取当前值
	var s1Val = $('#s1').val(), s1BeautyVal = beautySlts['s1'].val();
	equal(s1Val, s1BeautyVal, '取当前值正确');

	//设置值
	beautySlts['s2'].val('C');
	var s2Val = $('#s2').val(), s2BeautyVal = beautySlts['s2'].val();
	equal(s2Val, 'C', '设置值正确');
	equal(s2BeautyVal, 'C', '设置值正确');

	//添加项
	beautySlts['s1'].addOption('选项5', 5);
	equal(beautySlts['s1'].ul.find('li').length, 5, "添加选项5，同步更新到默认的select中");
	beautySlts['s1'].addOption('选项6', 5, true);
	equal($('#s1').find('option').length, 5, "添加选项6,不更新到默认的select中");

	//显示隐藏列表

	beautySlts['s1'].showList();
	equal(beautySlts['s1'].ul.css('display'), 'block', '调用showList后s1的选项应该显示');
	beautySlts['s1'].hideList();
	equal(beautySlts['s1'].ul.css('display'), 'none', '调用hideList后s1的选项应该显示');
});
