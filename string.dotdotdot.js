/**
 * Created by leel on 3/14/2016.
 */

(function ($) {
    if($.fn.dotString){
        return;
    }
    $.fn.dotString = function (configs) {
        configs = (typeof configs === "undefined") ? {} : configs;
        var $ele = this;
        var _originText=$ele.text();
        var defConfigs = {
            maxHeight: 0,
            lineHeight: 0,
            lineNum: 0,
            ellipsis:"..."
        };
        configs = $.extend(defConfigs, configs);
        if (this.length == 0) {
            throw 'No element found for "' + $ele.selector + '".'
        }
        if (this.length >= 1) {
            dotString();
        }
        function dotString() {
            var maxHeight = configs.maxHeight;
            if (maxHeight == 0 || typeof (maxHeight) != "number") {
                var h = configs.lineHeight * configs.lineNum;
                maxHeight = h > 0 ? h : 0;
                if(maxHeight==0){
                    throw "It does not specify a maximum height";
                }
            }
            while ($ele.height() > maxHeight) {
                var originStr = $ele.text(), subStr = "",
                    ellipsis=configs.ellipsis,ellipsisLength=configs.ellipsis.length;
                if (originStr.substring(originStr.length - ellipsisLength, originStr.length) == ellipsis) {
                    $ele.text(getOriginSubstring());
                }
                $ele.text(getOriginSubstring()+ellipsis);
            }
        }
        function getOriginSubstring(){
            var text=$ele.text(),
                ellipsisLength=configs.ellipsis.length;
            return text.substring(0, text.length - ellipsisLength);
        }
        this.get=function(attr){
            if(attr="originText"){
                return _originText;
            }
            return configs[attr];
        };
        this.set=function(attr,value){
            configs[attr]=value;
        };
        return $ele;
    }
})(jQuery);
