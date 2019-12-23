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
    , url: UmsCommon.commonUrl() + 'flightplan/list' //数据接口
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
      { field: 'model', title: '机型' }
      , { field: 'applyUserName', title: '机主姓名 ' }
      , { field: 'telephone', title: '电话' }
      , { field: 'purpose', title: '用途' }
      , { field: 'address', title: '起飞地点' } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'endAddress', title: '结束地点' }
      // , { field: 'fenceName', title: '侵入围栏' }
      , { field: "status", title: '申请状态' }
      , { field: 'applyTime', title: '申请日期' }
      , { fixed: '', title: '操作', align: 'center', width: '16%', toolbar: '#barDemol' }
    ]]
    ,id:'testReload'
    , done: function (res, page, count) {
      $("[data-field='status']").children().each(function () {
        if ($(this).text() == '' || $(this).text() == '0') {
          $(this).text("待审批")
        } else if ($(this).text() == '1') {
          $(this).text("同意")
        }
        else if ($(this).text() == '2') {
          $(this).text("驳回")
        }
        else if ($(this).text() == '3') {
          $(this).text("报备")
        }
      })
    }
  });

  $("#Record").on('click', function () {
       table.reload('testReload', {
           where: {
               applyUserName: $('#applyUserName').val()
               ,purpose: $('#apply').val()
               ,applyTime: $('#modifyDate').val()
           }
        });
    })
  //监听工具条
  table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    localStorage.setItem('id', data.id)
      , layEvent = obj.event; //获得 lay-event 对应的值
    if (layEvent === 'assess') {
      //点击查看按钮，出现弹框
      layer.open({
        type: 2,
        id: data.id,
        title: '评估',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['600px', '400px'],
        content: 'list/assess.html'
      });
    } else if (layEvent === 'reply') {

      layer.open({
        type: 2,
        title: '审批',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['600px', '500px'],
        content: 'list/reply.html'
      });
    }
    else if (layEvent === 'report') {
      layer.open({
        type: 2,
        title: '报备',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['600px', '400px'],
        content: 'list/report.html'
      });
    }
    else if (layEvent === 'apply') {
      layer.open({
        type: 2,
        title: '申请',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['400px', '400px'],
        content: 'list/apply.html'
      });
    }
    else if (layEvent === 'detail') {
      //layer.msg('查看操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '申请详情',
        area: ['600px', '420px'],//弹框大小
        content: 'flight_detail.html' //这里content是一个普通的String
      });
    } else if (layEvent === 'del') {
      layer.confirm('真的删除吗？', function (id) {
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(id);
        //向服务端发送删除指令
        flightDel(data.id);
      });
    } /* else if (layEvent === 'edit') {
      //layer.msg('编辑操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '信息编辑',
        area: ['600px', '320px'],
        content: 'flight_edit.html' 
      });
    } */
  });




  function flightDel(id) {
    $.ajax({
      url: UmsCommon.commonUrl() + "flightplan/delete", //后台提供的删除接口
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

  $(function () {
    $('#register').on('click', function () {
      layer.open({
        type: 2,
        title: '添加数据',
        area: ['600px', '450px'],//弹框大小
        offset: ['0px', '300px'],//弹框位置
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        content: 'flight_add.html'
      });
    })


    //查询事件
    /*$("#Record").on('click', function () {
      $('table tbody tr').hide()
        .filter(":contains('" + ($('#applyUserName').val()) + "')")
        .filter(":contains('" + ($('#modifyDate').val()) + "')")
        .filter(":contains('" + ($('#apply').val()) + "')")
        .show();
    }).click();*/
  })


  laydate.render({
    elem: '#modifyDate'
    // , value: new Date()
  });

});
