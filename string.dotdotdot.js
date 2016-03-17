/**
 * Created by leel on 3/14/2016.
 */

(function ($) {
    if ($.fn.dotString) {
        return;
    }
    $.fn.dotString = function (configs) {
        configs = (typeof configs === "undefined") ? {} : configs;
        var $ele = this;
        var defConfigs = {
            maxHeight: 0,
            lineHeight: 0,
            lineNum: 0,
            ellipsis: "...",
            cutLength: 1,
            callback: function () {
            }
        };
        defConfigs.originText = $ele.text();
        configs = $.extend(defConfigs, configs);
        if (this.length == 0) {
            throw 'No element found for "' + $ele.selector + '".'
        }
        if (this.length >= 1) {
            dotString();
        }
        function dotString() {
            var maxHeight = getMaxHeight();
            if (isSingleLine(maxHeight)) {
                $ele.css({"text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden"});
                return;
            }
            while ($ele.height() > maxHeight) {
                var originStr = $ele.text(), subStr = "",
                    ellipsis = configs.ellipsis, ellipsisLength = configs.ellipsis.length;
                if (originStr.substring(originStr.length - ellipsisLength, originStr.length) == ellipsis) {
                    $ele.text(getOriginSubstring(ellipsisLength));
                }
                $ele.text(getOriginSubstring(configs.cutLength) + ellipsis);
            }
            configs.callback.call($ele);
        }

        function getMaxHeight() {
            var maxHeight = configs.maxHeight;
            if (maxHeight == 0 || typeof (maxHeight) != "number") {
                var h = configs.lineHeight * configs.lineNum;
                maxHeight = h > 0 ? h : 0;
                if (maxHeight == 0 && configs.lineNum != 1) {
                    throw "It does not specify a maximum height";
                }
            }
            return maxHeight;
        }

        function getOriginSubstring(cutLength) {
            var text = $ele.text(),
                ellipsisLength = configs.ellipsis.length;
            return text.substring(0, text.length - cutLength);
        }

        function isSingleLine(height) {
            var line = configs.lineNum,
                lineHeight = configs.lineHeight;
            if (line <= 0 && height > 0 && lineHeight > 0) {
                line = height / lineHeight;
            }
            if (line == 1) {
                return true;
            }
            else {
                return false;
            }
        }

        this.get = function (attr) {
            return configs[attr];
        };
        this.set = function (attr, value) {
            configs[attr] = value;
        };
        $(window).on("resize", function () {
            $ele.text(defConfigs.originText);
            dotString();
        });
        return $ele;
    }
})(jQuery);
