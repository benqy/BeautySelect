/**
 *	下拉框美化控件
 * @author <a href="mailto:hmjlr123@gmail.com">huangmingji</a>
 * @version	0.1 beta 2012-08-20
 *$('select').beautySelect({
 *   onChange: function (e, data) {
 *      alert(data);
 *   }
 *});
 */
(function ($) {
    /**
     * @constructor
 	 * @param {Object} el 要自定义的原生下拉框元素（非jquery包装过的） 
     */
    var BeautySelect = function (el) {
        if (!el) throw new Error('select is null');
        //if (!el.id) throw new Error('id of select could not be null');
        this.selectId = el.id;
        this.listState = 'hide';
        this.select = $(el);
        this.width = this.select.width();
        this.options = this.select.find('option');
        this.wrapId = 'beauty-select-container' + el.id;
        this.currentId = 'beauty-select-current' + el.id;
        this.currentTextId = 'beauty-select-currenttext' + el.id;
        this.ulId = 'beauty-select-list' + el.id;
    };
    var _initContainer = function () {
        this.wrap = $('<div class="beauty-select-container" id="' + this.wrapId + '"></div>');
        this.current = $('<a href="javascript://" class="beauty-select-current" id="' + this.currentId + '"></a>');
        this.currentText = $('<span class="beauty-select-text" id="' + this.currentTextId + '"></span>');
        this.current.append(this.currentText);
        this.current.append('<div class="beauty-select-icon"><span></span></div>');
        this.wrap.append(this.current);
        this.ul = $('<ul class="beauty-select-list" id="' + this.ulId + '"></ul>');
        this.wrap.append(this.ul);
        this.select.after(this.wrap);
        this.select.hide();
        this.wrap.width(this.width * 1 + parseInt(this.current.css('padding-right')));
        this.current.width(this.width - parseInt(this.current.css('padding-left')) * 2);
        this.ul.width(this.width * 1 + parseInt(this.current.css('padding-right')));
        this.current.height(this.select.outerHeight());
    };
    var _initOptions = function () {
        var me = this;
        this.options.each(function (i, n) {
            me.addOption(n.innerHTML, n.value, true);
        });
        this.val(this.select.val());
    };
    var _initHandler = function () {
        var me = this;
        this.ul.delegate('li', 'mouseover', function () {
            $('.beauty-select-item').removeClass('beauty-select-item-current');
            $(this).addClass('beauty-select-item-current');
        }).delegate('li', 'click', function () {
            var value = $(this).attr('data-value');
            me.val(value);
            me.hideList();
            me.wrap.trigger('change', [value]);
        })
        $(document).click(function (e) {
            me.hideList();
        });
        this.current.focus(function(){
        	$(this).blur();
        }).click(function (e) {
            e.stopPropagation();
            if (me.listState == 'hide') {
                me.showList();
            }
            else {
                me.hideList();
            }
        });
    };
    BeautySelect.prototype = {
    	/**
    	 * 为下拉框控件取值或设置值
    	 * @param {String} 如果有参数则给下拉框设置值
    	 * @return {String} 下拉框当前选中项的值 
    	 */
        val: function () {
            if (arguments.length > 0) {
                window.opt = this.options;
                var value = arguments[0], text = this.ul.find('[data-value=' + value + ']').eq(0).text();
                this.select[0].value = value;
                this.currentText.text(text);
            }
            return this.select.val();
        },
        /**
         * 为下拉框控件添加选项
		 * @param {Object} text 选项文本 
		 * @param {Object} value 选项值
		 * @param {Object} noAddToSelect	不添加到原生的select中（默认为添加，一般使用默认的即可）
         */
        addOption: function (text, value, noAddToSelect) {
            this.ul.append('<li class="beauty-select-item" data-value="' + value + '">' + text + '</li>');
            var selectOption = this.select.find('option[value=' + value + ']');
            if (!noAddToSelect) {
                this.select.append('<option value="' + value + '">' + text + '</option>');
            }
        },
        /**
         *显示下拉列表项 
         */
        showList: function () {
            this.listState = 'show';
            $('.beauty-select-indextop').removeClass('beauty-select-indextop');
            this.wrap.addClass('beauty-select-indextop');
            this.ul.addClass('beauty-select-indextop').show();
            this.ul.find('[data-value=' + this.val() + ']').addClass('beauty-select-item-current');
        },
        /**
         *隐藏下拉列表项 
         */
        hideList: function () {
            this.listState = 'hide';
            this.ul.hide();
        }
    }
    BeautySelect.prototype.contractor = BeautySelect;
    var opt = {
    	/**
    	 * @name onChange 选择某项时触发
		 * @event
		 * @param {Object} e 
		 * @param {String} value 选中的值
		 * */
        onChange: null
    };
    /**
	 * 
	 * @param {Object} option 以下参数说明为option的内容
	 * @param {Function} onChange 选择下拉框中某一项的回调事件
	 */
    $.fn.beautySelect = function (option) {
        option = $.extend({}, opt, option);
        var result = {};
        $(this).each(function (i, n) {
            var _ = new BeautySelect(n);
            _initContainer.call(_);
            _initOptions.call(_);
            _initHandler.call(_);
            option.onChange && _.wrap.bind('change', function (e, data) {
                option.onChange.call(_, e, data);
            });
            if (_.selectId) {
                result[_.selectId] = _;
            }
        });
        return result;
    }
})(jQuery);

