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
        , url: UmsCommon.commonUrl() + "uav/list" //数据接口
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
             { field: 'ownerName', title: '机主姓名' }
             , { field: 'userType', title: '用户类型' }
            ,{ field: 'contactPhone', title: '联系电话' }
            , { field: 'ownerId', title: '身份证号' }
            , { field: 'companyId', title: '工商代码' }
            ,{ field: 'emergencyContactNumber', title: '紧急联系电话' }
             , { field: 'driverLicense', title: '驾驶证件号' }
            , { field: 'certificateGrade', title: '合格证等级' }
            , { field: 'issuingAgency', title: '发证机构' }
            // , { field: 'modelType', title: '无人机类型' } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            // , { field: 'companyName', title: '公司名称' }
            // , { field: 'legalPerson', title: '法人代表' }
            // , { field: 'registerDate', title: '登记时间' }
            , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
        ]]
        ,id:'testReload'
        ,done:function(res, page, count) {
            $("[data-field='userType']").children().each(function () {
                if ($(this).text() == '1') {
                  $(this).text("个人用户")
                } else if ($(this).text() == '2') {
                  $(this).text("企业用户")
                }
              }),
              $("[data-field='ownerId']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              }),
              $("[data-field='companyId']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              }),
              $("[data-field='emergencyContactNumber']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              }),
              $("[data-field='driverLicense']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              }),
              $("[data-field='certificateGrade']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              }),
              $("[data-field='issuingAgency']").children().each(function () {
                if ($(this).text() == '') {
                  $(this).text("未启用")
                } 
              })
        }
    });

     $("#check").on('click', function () {
       table.reload('testReload', {
           where: {
               userType: $('#select').val()
               ,ownerName: $('#ownerName').val()
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
                area: ['600px', '450px'],
                content: "./uavlist/handlook.html",
            });
            // layer.msg('查看操作');
            //点击查看按钮，出现弹框
            //   laymath();
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
                area: ['700px', '500px'],
                content: './uavlist/handedit.html'
            });
            // layer.msg('编辑操作');
        }
        else if (layEvent === 'look') {

            layer.open({
                type: 2,
                id: data.id,
                title: '编辑',
                maxmin: true,
                shadeClose: true, //点击遮罩关闭层
                area: ['620px', '160px'],
                content: './uavlist/uavid.html'
            });
            // layer.msg('编辑操作');
        }
    });

    function uavdelete(id) {
        //  var id = $(this).attr("dataField");
        $.ajax({
            url: UmsCommon.commonUrl() + "uav/delete",
            type: "post",
            data: {
                id: id,
                token: 123
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
            content: 'uavlist/uavadd.html',
        });
    };

    //日期选择器的渲染
    laydate.render({
        elem: '#datelist' //指定元素
        , value: new Date()
    });


    // jquery事件
    $(function () {
        $("#register").on('click', function () {
            $(location).attr('href', './../uavregister/handregister.html');
        });

      /*   $("#select").on('change', function () {
            $('table tbody tr').hide()
                .filter(":contains('" + ($('#select').val()) + "')")
                .show();
        }).change(); */

       /* $("#check").on('click', function () {
            $('table tbody tr').hide()
                .filter(":contains('" + ($('#ownerName').val()) + "')")
                .filter(":contains('" + ($('#select').val()) + "')")
                .show();
        }).click();*/
    })
});