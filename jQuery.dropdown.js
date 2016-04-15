'use strict';
!function($, undefined){
    var Dropdown=function(element, options){
        var _this = this;

        _this.el = $(element);
        _this.options = $.extend({}, Dropdown.DEFAULTS, options || {});

        //_this.mouseLocs = [],
        //    _this.lastDelayLoc = null ,
        _this._create(),
            _this.eventBind()
    };

    Dropdown.VERSION = '1.0.0';
    Dropdown.DEFAULTS = {
        trigger: !1,                        // false :默认为 盒子下面的 item 元素 ,true: _this.el自身
        item: "ui-dropdown-item",
        current: "ui-dropdown-hover",      //当前 元素添加的 class
        //bodyClass: "ui-dropdown-bd",
        enterDelay: 0,
        leaveDelay: 0,
        zIndex: 1e3,
        event:"mouseenter",
        onchange: null ,
        onmouseleave: null // 鼠标离开的回调函数
    };

    Dropdown.prototype._create=function(){
        var _this = this, _op = _this.options;
        //event 是否为 click
        $.trim(_op.event) == "click" && (_op.trigger = !1);
        _this.item = _op.trigger ? _this.el : _this.el.find("." + _op.item)
    };
    Dropdown.prototype.eventBind=function(){
        var _this = this;
        var _op = _this.options;
        if($.trim(_op.event) == "click"){
            _this.clickfnc()
        }else{
            _this.mouseenterfnc()
        }
    };
    Dropdown.prototype.clickfnc=function(){
        var _this = this;
        var _op = _this.options;
        var itemTiem;
        _this.item.on(_op.event, function() {
            var $item = $(this);
            var changefnc= function() {
                _this.el.addClass(_op.current),
                _op.onchange && _op.onchange($item)
            };
            if (clearTimeout(itemTiem),
                    _this.el.hasClass(_op.current)){
                _this.el.removeClass(_op.current)
            }else{
                itemTiem = setTimeout(function(){
                    changefnc()
                }, _op.enterDelay);
            }

        })
    };
    Dropdown.prototype.mouseenterfnc =function(){
        var _this = this;
        var _op = _this.options;
        var elTime, itemTiem;
        var _index = null ;
        var elStatr = !1;  // 当鼠标移出时 是否清除class 的状态
        var itemSate = !1;
        //进入 el 元素时
        _this.el.on("mouseenter", function() {
            console.log("a")
            clearTimeout(elTime)
        }).on("mouseleave", function(){

            elStatr && (elTime = setTimeout(function() {
                console.log("a-out")
                _this.removeClass()
            }, _op.leaveDelay)),
            _op.onmouseleave && _op.onmouseleave($(this))

        }),_this.item.on("mouseenter", function() {
            console.log("b")
            if (itemSate) return !1;
            var $item = $(this);
            //移入当前 执行的函数
            var changefnc= function(){
                itemSate = !0,
                    _this.removeClass(),
                    $item.addClass(_op.current),
                    elStatr = !0,
                _op.onchange && _op.onchange($item)
            };
            //console.log(_op.enterDelay)
            itemTiem = setTimeout(function() {
                changefnc()
            }, _op.enterDelay);

        }),
            _this.item.on("mouseleave", function() {
                console.log("b-out")
                clearTimeout(itemTiem),
                    itemSate = !1
            });
    },
        Dropdown.prototype.removeClass=function() {
            this.item.removeClass(this.options.current)
        }
    // Dropdown plugin definition
    // =====================
    function Plugin(option) {
        return this.each(function(){
            //console.log($(this))
            new Dropdown($(this), option)
        })
    }
    $.fn.dropdown = Plugin;
    $.fn.dropdown.Constructor = Dropdown;
}(jQuery);
