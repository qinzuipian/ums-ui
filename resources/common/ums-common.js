;
(function(undefined) {
    "use strict"
    var _global;

    function result(args, fn) {
        var argsArr = Array.prototype.slice.call(args);
        if (argsArr.length > 0) {
            return argsArr.reduce(fn);
        } else {
            return 0;
        }
    }

    // 本页面刷新
    $(".refres").on('click', function(){
        window.location.reload();
        
      });

    var UmsCommon = {
        commonUrl: function() {
            return "http://39.104.48.76:8080/";
             // return "http://192.168.1.5:8080/";
        },
        formatString: function(str) {
            for (var i = 0; i < arguments.length - 1; i++) {
                str = str.replace("{" + i + "}", arguments[i + 1]);
            }
            return str;
        },
        dateFmt: function(fmt, date) {
            if (date == null || date == "") {
                return "";
            }
            var d = new Date(date);
            var o = {
                "M+": d.getMonth() + 1, //月份
                "d+": d.getDate(), //日
                "h+": d.getHours(), //小时
                "m+": d.getMinutes(), //分
                "s+": d.getSeconds(), //秒
                "q+": Math.floor((d.getMonth() + 3) / 3), //季度
                "S": d.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        serializeObjectContainEmpty: function(form) {
            var o = {};
            $.each(form.serializeArray(), function(index) {
                if (o[this['name']]) {
                    o[this['name']] = o[this['name']] + "," + this['value'];
                } else {
                    o[this['name']] = this['value'];
                }
            });
            return o;
        },
        dynamicLoadingCss: function(path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        dynamicLoadingJs: function(path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        },
        isDataType: function(data) {
            var returnType = -1;
            switch (true) {
                case dataType.isNum(data):
                    returnType = 1
                    break;
                case dataType.isStr(data):
                    returnType = 2
                    break;
                case dataType.isBoo(data):
                    returnType = 3
                    break;
                case dataType.isNul(data):
                    returnType = 4
                    break;
                case dataType.isUnd(data):
                    returnType = 5
                    break;
                case dataType.isObj(data):
                    returnType = 6
                    break;
                case dataType.isAry(data):
                    returnType = 7
                    break;
                case dataType.isFun(data):
                    returnType = 8
                    break;
                case dataType.isReg(data):
                    returnType = 9
                    break;
                case dataType.isDate(data):
                    returnType = 10
                    break;
                default:
                    returnType = -1;
            }
            return returnType;
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getObjFromTable: function($table, field) {
            var obj = [];
            var maxV = $table.find("th").length;
            var columnIndex = 0;
            var filedVar;
            for (columnIndex = 0; columnIndex < maxV; columnIndex++) {
                filedVar = $table.find("th").eq(columnIndex).attr("data-field");
                if (filedVar == field) break;
            }
            var $trs = $table.find("tbody > tr");
            var $tr;
            var index = 0;
            var content = "";
            var row = 1;
            for (var i = 0; i < $trs.length; i++) {
                $tr = $trs.eq(i);
                var contentItem = $tr.find("td").eq(columnIndex).html();
                if (contentItem.length > 0 && content == contentItem) {
                    row++;
                } else {
                    if (row > 1) {
                        obj.push({
                            "index": index,
                            "row": row
                        });
                    }
                    index = i;
                    content = contentItem;
                    row = 1;
                }
            }
            if (row > 1) obj.push({
                "index": index,
                "row": row
            });
            return obj;
        },
        mergeTable: function(tableId, compField, fields) {
            var $table = $("#" + tableId);
            var obj = this.getObjFromTable($table, compField);
            for (var item in obj) {
                $(fields).each(function(index, element) {
                    $("#" + tableId).bootstrapTable('mergeCells', {
                        index: obj[item].index,
                        field: element,
                        colspan: 1,
                        rowspan: obj[item].row
                    });
                });
            }
        },
        serializeObject: function(form) {
            var o = {};
            $.each(form.serializeArray(), function(index) {
                if (this['value'] != undefined && this['value'].length > 0) { // 如果表单项的值非空，才进行序列化操作
                    if (o[this['name']]) {
                        o[this['name']] = o[this['name']] + "," + this['value'];
                    } else {
                        o[this['name']] = this['value'];
                    }
                }
            });
            return o;
        },
        getContextPath: function() {
            // 获取当前网址，如：http://localhost:8080/ssm/index.jsp
            var currentPath = window.document.location.href;
            // 获取主机地址之后的目录，如： /ssm/index.jsp
            var pathName = window.document.location.pathname;
            var pos = currentPath.indexOf(pathName);
            // 获取主机地址，如： http://localhost:8080
            var localhostPath = currentPath.substring(0, pos);
            // 获取带"/"的项目名，如：/ssm
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            return projectName;
        },
        getQxtConfigInfo: function() {
            var conf = null;
            if (! function() {
                    try {
                        return QxtConfigInfo, true
                    } catch (e) {}
                }()) {
                conf = parent.parent.QxtConfigInfo;
            }
            if (function() {
                    try {
                        return QxtConfigInfo, true
                    } catch (e) {}
                }()) {
                conf = QxtConfigInfo;
            }
            if (conf == null) {
                return false;
            }
            return conf;
        },
        cloumnIsHidden: function(show, per) {
            var userRoleData = [];
            var roles = UmsCommon.getQxtConfigInfo().userInfo.localUserData;

            if (UmsCommon.isDataType(UmsCommon.getQxtConfigInfo().userInfo.localUserData) == 5) {
                return show;
            }
            if (show) {
                if (roles.contains(per)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return false;
        },
        cloumnsIsHidden: function(tableObj, cloumns) {

            $.each(cloumns, function(index, cloumn) {
                tableObj.bootstrapTable("hideColumn", cloumn);
            })
        },
        cloumnsIsShow: function(tableObj, cloumns) {

            $.each(cloumns, function(index, cloumn) {
                tableObj.bootstrapTable("showColumn", cloumn);
            })
        },
        randomString: function(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var pwd = '';
                var i;
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            ,
        formatNumberRgx: function(str) {
            var reg = /\d{1,3}(?=(\d{3})+$)/g;
            if (undefined == str || null == str || "" == str || "0" == str || 0 == str) {
                return 0;
            }
            var tempIndex = String(str).indexOf(".");
            if (tempIndex >= 0) {
                return String(str).substring(0, String(str).indexOf(".")).replace(reg, '$&,') + "" + String(str).substring(tempIndex, String(str).length);
            } else {
                return String(str).replace(reg, '$&,');
            }
        },
        /**
         * 数字转为科学计数法
         * @param number
         * @param expon
         * @returns {string}
         */
        numberToExponential: function(number, expon) {
            var num = new Number(number);
            if (num.length <= 5) {
                return number;
            }
            return num.toExponential(expon);
        },
        getPrevMonth: function() {
            var currentYear = new Date().getFullYear();
            var currentMonth = new Date().getMonth() + 1;
            var lastMonth = new Date().getMonth();
            var currentDate = new Date().getDate();
            var prevCurrentYear = 0;
            var prevCurrentMonth = 0;
            if (currentMonth == 1) {
                prevCurrentYear = currentYear - 1;
                prevCurrentMonth = 12;
            } else {
                prevCurrentYear = currentYear;
                prevCurrentMonth = currentMonth - 1;
            }
            if (prevCurrentMonth < 10) {
                prevCurrentMonth = "0" + prevCurrentMonth;
            }
            var lastmonth = prevCurrentYear + "-" + prevCurrentMonth;
            return lastmonth;
        }
    }

    // 将插件对象暴露给全局对象
    _global = (function() {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = UmsCommon;
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return UmsCommon;
        });
    } else {
        !('plugin' in _global) && (_global.UmsCommon = UmsCommon);
    }
}());

// $(document).ajaxSend(function (event, request, settings) {

//     var token = "123"
//     if (token != null) {
//         request.setRequestHeader("token", token);
//     }
//     if (!settings.hasOwnProperty("data")) {
//         return false;
//     }
//     var data = settings.data;
//     var paramsJson = {};
//     var url = "";
//     if (data.indexOf("params") != -1) {
//         var params = data.substring(data.indexOf("params") + 7, data.length).replace(/\+/g, ' ');
//         var dataObj = unescape(params);
//         paramsJson = $.parseJSON(dataObj)
//         url = data.substring(0, data.indexOf("params") - 1);
//     } else {
//         url = data;
//     }
//     paramsJson["comSerial"] = UmsCommon.getQxtConfigInfo().userInfo.comSerial;
//     paramsJson["cserial"] = UmsCommon.getQxtConfigInfo().userInfo.comSerial;
//     paramsJson["cSerial"] = UmsCommon.getQxtConfigInfo().userInfo.comSerial;
//     paramsJson["userId"] = UmsCommon.getQxtConfigInfo().userInfo.userId;
//     paramsJson["currLoginUserId"] = UmsCommon.getQxtConfigInfo().userInfo.userId;
//     paramsJson["comSerialId"] = UmsCommon.getQxtConfigInfo().userInfo.comSerialId;
//     url += "&params=" + escape(JSON.stringify(paramsJson)).replace(/\+/g, '%2B');
//     settings.data = url

// });
~ function() {
    var utils = {},
        numObj = {
            isNum: "Number",
            isStr: "String",
            isBoo: "Boolean",
            isNul: "Null",
            isUnd: "Undefined",
            isObj: "Object",
            isAry: "Array",
            isFun: "Function",
            isReg: "RegExp",
            isDate: "Date"
        },
        isType = function() {
            var outerArg = arguments[0];
            return function() {
                var innerArg = arguments[0],
                    reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
                return reg.test(Object.prototype.toString.call(innerArg));
            }
        };
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            utils[key] = isType(numObj[key]);
        }
    }
    window.dataType = utils;
}();

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}