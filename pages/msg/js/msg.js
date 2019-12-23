layui.config({
  version: '1512984638002' //为了更新 js 缓存，可忽略
});


layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'laytpl', 'form', 'element'], function () {
  var laydate = layui.laydate //日期
    , laypage = layui.laypage //分页
    , layer = layui.layer //弹层
    , table = layui.table //表格
    , carousel = layui.carousel //轮播
    , upload = layui.upload //上传
    , laytpl = layui.laytpl
    , form = layui.form
    , element = layui.element; //元素操作


    
  //执行一个 table 实例
  table.render({
    elem: '#test'
    , height: 'full-200'
    , url: UmsCommon.commonUrl() + 'msgboard/list' //数据接口
    , method: 'post'
    , where: {
      token: 123,
    }
    , request: { pageNumber: 'pageNumber', limitName: 'limit' }
    , response: {
      statusName: 'status' //数据状态的字段名称，默认：code
      , statusCode: 200 //成功的状态码，默认：0
      , msgName: 'message' //状态信息的字段名称，默认：msg
      , countName: 'total' //数据总数的字段名称，默认：count
      , dataName: 'rows' //数据列表的字段名称，默认：data
    }
    , page: true //开启分页
    ,id:'testReload'
    , cols: [[ //表头
      { field: 'title', title: '消息标题', align: 'center', fixed: 'left' }
      , { field: 'msgType', title: '消息类型', align: 'center' }
      , { field: 'content', title: '消息内容', align: 'center', align: 'center' }
      , { field: 'publishTime', title: '发布时间', align: 'center',templet: '#publishTime'}
      , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
    ]]


    , done: function (res, page, count) {
      $("[data-field='msgType']").children().each(function () {
        if ($(this).text() == '1') {
          $(this).text("空域信息")
        } else if ($(this).text() == '2') {
          $(this).text("气象数据")
        }
        else if ($(this).text() == '3') {
          $(this).text("航迹信息")
        }
        else if ($(this).text() == '4') {
          $(this).text("政策法规")
        }
        else if ($(this).text() == '5') {
          $(this).text("航图")
        }
        else if ($(this).text() == '6') {
          $(this).text("手册")
        }
      })

     /*  $("[data-field='publishTime']").children().each(function () {
        $(this).text("yyyy-MM-dd");

      }) */


    }

  });

 $("#Record").on('click', function () {
       table.reload('testReload', {
           where: {
               title: $('#msgType').val()
               ,publishTime: $('#modifyDate').val()
           }
        });
    })
  



  //监听工具条
  table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    localStorage.setItem('id', data.id)
      , layEvent = obj.event; //获得 lay-event 对应的值
    if (layEvent === 'detail') {
      //layer.msg('查看操作');
      //layer.msg('ID：'+ data.id + ' 的查看操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '信息详情',
        area: ['700px', '420px'],//弹框大小
        offset: ['50px', '300px'],//
        content: 'list/board.html' //这里content是一个普通的String
      });
    } else if (layEvent === 'del') {
      layer.confirm('真的删除吗？', function (id) {
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(id);
        //向服务端发送删除指令
        msgDel(data.id);
      });
    } else if (layEvent === 'edit') {
      //layer.msg('编辑操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '信息编辑',
        area: ['700px', '420px'],//弹框大小
        offset: ['0px', '300px'],//弹框位置
        content: 'list/msgedit.html' //这里content是一个普通的String
      });
    }
  });


  //将日期直接嵌套在指定容器中
  laydate.render({
    elem: '#modifyDate'
    // ,value:new Date()   
  });


  function msgDel(id) {
    $.ajax({
      url: UmsCommon.commonUrl() + "msgboard/delete", //后台提供的删除接口
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
    $("#increase").on('click', function () {
      layer.open({
        type: 2,
        title: '添加数据',
        area: ['700px', '420px'],//弹框大小
        offset: ['0px', '300px'],//弹框位置
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        content: 'list/msgadd.html'
      });
    });

    //查询事件
   /* $("#Record").on('click', function () {
      $('table tbody tr').hide()
        .filter(":contains('" + ($('#msgType').val()) + "')")
        .filter(":contains('" + ($('#modifyDate').val()) + "')").show();
    }).click();*/


  })


});


