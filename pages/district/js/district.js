
layui.config({
  version: '1512984638002' //为了更新 js 缓存，可忽略
});

layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'laytpl', 'form', 'element'], function () {
    // console.log(y);
  
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
    , url: UmsCommon.commonUrl() + 'district/list' //数据接口
    ,where:{
      token:123,
    }

    , request: { limitName: 'limit' }
    , method: 'post'
    , page: true //开启分页
    , response: {
      statusName: 'status' //数据状态的字段名称，默认：code
      , statusCode: 200 //成功的状态码，默认：0
      , msgName: 'hint' //状态信息的字段名称，默认：msg
      , countName: 'total' //数据总数的字段名称，默认：count
      , dataName: 'rows' //数据列表的字段名称，默认：data
    }
    , cols: [[ //表头
      { field: 'id', title: '围栏ID', align: 'center', fixed: 'left' }
      , { field: 'districtName', title: '区域名称', align: 'center' }
      , { field: 'fencyType', title: '围栏类型', align: 'center', align: 'center' }
      , { field: 'districtType', title: '区域类别', align: 'center' }
      , { field: 'createName', title: '创建人名称', align: 'center' }
      , { field: 'createDate', title: '创建时间', align: 'center'}
      , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
    ]] 
    ,id:'testReload'
    , done: function (res, page, count) {
     

      $("[data-field='fencyType']").children().each(function () {
        if ($(this).text() == '1') {
          $(this).text("多边形")
        } else if ($(this).text() == '2') {
          $(this).text("圆形")
        }
      }),
        $("[data-field='districtType']").children().each(function () {
          if ($(this).text() == '1') {
            $(this).text("危险区域")
          } else if ($(this).text() == '2') {
            $(this).text("限制区域")
          }
          else if ($(this).text() == '3') {
            $(this).text("主要障碍")
          }
        })

    }

  });

   $("#Record").on('click', function () {
       table.reload('testReload', {
           where: {
               districtName: $('#districtName').val()
               ,createDate: $('#createDate').val()
           }
        });
    })
  


  //监听工具条
  table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    console.log(data)
    localStorage.setItem('id', data.id)
    localStorage.setItem('fenceId', data.fencyId)
      , layEvent = obj.event; //获得 lay-event 对应的值
    // console.log(data)
    if (layEvent === 'detail') {
      //layer.msg('查看操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '信息详情',
        area: ['600px', '420px'],//弹框大小
        content: './district_detail.html' //这里content是一个普通的String
      });
    } else if (layEvent === 'del') {
      layer.confirm('真的删除吗？', function (id) {
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(id);
        //向服务端发送删除指令
        districtDel(data.id);
      });
    } else if (layEvent === 'edit') {
      //layer.msg('编辑操作');
      layer.open({
        type: 2,
        id: data.id,
        title: '信息编辑',
        area: ['700px', '520px'],//弹框大小
        content: './district_edit.html' //这里content是一个普通的String
      });
    }
  });

  function districtDel(id) {
    $.ajax({

      url: UmsCommon.commonUrl() + "district/delete", //后台提供的删除接口
      type: "post",
      data: { 
        'id': id,
        'token':123
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

  //将日期直接嵌套在指定容器中
  laydate.render({
    elem: '#createDate'
    // ,value:new Date()   
  });

  

  // jquery
  $(function () {
    //添加事件
    $("#increase").on('click', function () {
      layer.open({
        type: 2,
        title: '添加数据',
        area: ['800px', '550px'],//弹框大小
        offset: ['0px', '300px'],//弹框位置
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        content: './district_add.html'
      });
    });

    //查询事件
  /*  $("#Record").on('click', function () {
      $('table tbody tr').hide()
        .filter(":contains('" + ($('#districtName').val()) + "')")
        .filter(":contains('" + ($('#createDate').val()) + "')").show();
    }).click();*/


  })

});







