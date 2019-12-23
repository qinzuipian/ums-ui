layui.config({
    version: '1512984638033' //为了更新 js 缓存，可忽略
});

layui.use(['laydate', 'laypage', 'jquery', 'layer', 'table', 'carousel', 'upload', 'element'], function () {
    var laydate = layui.laydate //日期
        , laypage = layui.laypage //分页
        , layer = layui.layer //弹层
        , $ = layui.jquery
        , table = layui.table //表格
        , carousel = layui.carousel //轮播
        , upload = layui.upload //上传
        , element = layui.element; //元素操作

  


    //执行一个 table 实例
    table.render({
        elem: '#test'
        , height: 'full-200'
        , url: UmsCommon.commonUrl() + 'historyalarm/list' //数据接口
        , method: 'post'
        , where: { token: 123 }
        , page: true //开启分页
        , request: { pageNumber: 'pageNumber', limitName: 'limit' }
        , response: {
            statusName: 'status' //数据状态的字段名称，默认：code
            , statusCode: 200 //成功的状态码，默认：0
            , msgName: 'hint' //状态信息的字段名称，默认：msg
            , countName: 'total' //数据总数的字段名称，默认：count
            , dataName: 'rows' //数据列表的字段名称，默认：data
        }
        , cols: [[ //表头
             { field: 'deviceName', title: '设备名称' }
            , { field: 'longitude', title: '告警经度' }
            , { field: 'latitude', title: '告警纬度' }
            , { field: 'radius', title: '半径(m)' }
            , { field: 'fenceType', title: '围栏类型' }
            // , { field: 'purpose', title: '用途' }
            , { field: 'fenceName', title: '围栏名称' } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            , { field: 'action', title: '告警动作' }
            , { field: 'alarmTime', title: '告警时间'}
            , { fixed: 'right', title: '操作', width: '16%', align: 'center', toolbar: '#barDemo' }
        ]]
        ,id:'testReload'
        , done: function (res, page, count) {
            $("[data-field='fenceType']").children().each(function () {
                if ($(this).text() == '1') {
                    $(this).text("多边形")
                } else if ($(this).text() == '2') {
                    $(this).text("圆形")
                }
            }),
                $("[data-field='action']").children().each(function () {
                    if ($(this).text() == '1') {
                        $(this).text("进入")
                    } else if ($(this).text() == '2') {
                        $(this).text("越界")
                    }
                })
        }

    });


   $("#check").on('click', function () {
       table.reload('testReload', {
           where: {
               fenceName: $('#use').val()
               ,deviceName: $('#deviceName').val()
               ,alarmTime: $('#datelist').val()
           }
        });
    })

    //监听工具条
    table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
        localStorage.setItem('id', data.id)
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'detail') {

            layer.open({
                type: 2,
                id: data.id,
                title: '查看',
                maxmin: true,
                shadeClose: true, //点击遮罩关闭层
                area: ['600px', '480px'],
                content: "recordlist/recordlook.html",
            });

        } else if (layEvent === 'del') {
            layer.confirm('真的删除吗？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构 
                layer.close(index);
                //向服务端发送删除指令
                uavdelete(data.id);
            });


        } else if (layEvent === 'edit') {

            layer.open({
                type: 2,
                id: data.id,
                title: '编辑',
                maxmin: true,
                shadeClose: true, //点击遮罩关闭层
                area: ['600px', '500px'],
                content: 'recordlist/recordedit.html'
            });
           
        }
    });

    function uavdelete(id) {
        $.ajax({
            url: UmsCommon.commonUrl() + "historyalarm/delete",  //后台提供的删除接口
            type: "post",
            data: {
                'id': id,
                'token': 123
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 200) {
                    window.location.reload();
                } else {
                    return false;
                }
            }
        });

    }

    function layadd() {
        layer.open({
            type: 2,
            title: '添加数据',
            maxmin: true,
            shadeClose: true, //点击遮罩关闭层
            area: ['600px', '500px'],
            content: 'recordlist/recordadd.html',
        });
    };
    //日期选择器的渲染
    laydate.render({
        elem: '#datelist' //指定元素
        // , value: new Date()
    });


    // jquery事件
    $(function () {
        $("#addNum").on('click', function () {
            layadd();
            //  window.location.href = "../uavregister/uavregister.html";
        });

       /* $("#check").on('click', function () {
            $('table tbody tr').hide()
                .filter(":contains('" + ($('#deviceName').val()) + "')")
                .filter(":contains('" + ($('#datelist').val()) + "')")
                .filter(":contains('" + ($('#use').val()) + "')")
                .show();
        }).click();*/
    })
  

});