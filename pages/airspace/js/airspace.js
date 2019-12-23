
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

  layui.use(['form', 'layedit'], function () {
    var form = layui.form
      , layer = layui.layer
      , $ = layui.jquery;
    form.on('submit(formDemo)', function (data) {
      console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
      console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
      console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  })

  //执行一个 table 实例
  table.render({
    elem: '#test'
    , height: 'full-200'
    , url: UmsCommon.commonUrl() + 'airspace/list' //数据接口
    , method: 'post'
    , where: { token: 123 }
    , request: { pageNumber: 'pageNumber', limitName: 'limit' }
    , response: {
      statusName: 'status' //数据状态的字段名称，默认：code
      , statusCode: 200 //成功的状态码，默认：0
      , msgName: 'hint' //状态信息的字段名称，默认：msg
      , countName: 'total' //数据总数的字段名称，默认：count
      , dataName: 'rows' //数据列表的字段名称，默认：data
    }
    , cols: [[ //表头
      { field: 'id', title: '序号', align: 'center', fixed: 'left' }
      , { field: 'spaceName', title: '空域名称', align: 'center' }
      , { field: 'maxHeight', title: '高度上限(m)', align: 'center', align: 'center' }
      , { field: 'minHeight', title: '高度下限(m)', align: 'center' }
      , { field: 'belongCityName', title: '归属城市名称', align: 'center' }
      , { field: 'isOpen', title: '是否开放', align: 'center' }
      , { field: 'fencePurpose', title: '围栏用途', align: 'center' }
      , { field: 'createName', title: '创建人', align: 'center' }
      , { field: 'startingTime', title: '开始时间', align: 'center' }
      , { field: 'endTime', title: '结束时间', align: 'center' }
      // , { field: 'regoinType', title: '空域类型', align: 'center' }
      // , { field: 'status', title: '状态', align: 'center' }
      // , { field: 'modifyDate', title: '更新时间', align: 'center' }
      , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
    ]]
    ,id: 'testReload'
    , page: true //开启分页
    , done: function (res, page, count) {
      $("[data-field='regoinType']").children().each(function () {
        if ($(this).text() == '1') {
          $(this).text("多边形")
        } else if ($(this).text() == '2') {
          $(this).text("圆形")
        }
      }),
        $("[data-field='isOpen']").children().each(function () {
          if ($(this).text() == '0') {
            $(this).text("开放")
          } else if ($(this).text() == '1') {
            $(this).text("关闭")
          }
        }),
        $("[data-field='status']").children().each(function () {
          if ($(this).text() == '0') {
            $(this).text("有效")
          } else if ($(this).text() == '1') {
            $(this).text("撤销")
          }
        })
    }
  });

  $("#Record").on('click', function () {
       table.reload('testReload', {
           where: {
               spaceName: $('#serialNo').val()
               ,belongCityName: $('#belongCityName').val()
               ,startingTime: $('#modifyDate').val()
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
        scrollbar: true,
        title: '信息详情',
        area: ['600px', '450px'],//弹框大小
        content: './airspace_detail.html' //这里content是一个普通的String
      });
    } else if (layEvent === 'del') {
      layer.confirm('真的删除吗？', function (id) {
        obj.del(); //删除对应行（tr）的DOM结构
        layer.close(id);
        //向服务端发送删除指令
        airspaceDel(data.id);
      });
    } else if (layEvent === 'edit') {
      layer.open({
        type: 2,
        id: data.id,
        title: '信息编辑',
        maxmin: true,
        shadeClose: true,
        area: ['700px', '450px'],//弹框大小
        content: './airspace_edit.html' //这里content是一个普通的String

      });

    }
  });

  //删除数据
  function airspaceDel(id) {
    $.ajax({

      url: UmsCommon.commonUrl() + "airspace/delete", //后台提供的删除接口

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
    elem: '#modifyDate'
    // ,value:new Date()   
  });

  //分页
  laypage.render({
    elem: 'pageDemo' //分页容器的id
    , count: 100 //总页数
    , skin: '#1E9FFF' //自定义选中色值
    //,skip: true //开启跳页
    , jump: function (obj, first) {
      if (!first) {
        layer.msg('第' + obj.curr + '页');
      }
    }
  });

  // jquery
  //添加事件
  $(function () {
    $("#increase").on('click', function () {
      layer.open({
        type: 2,
        title: '添加数据',
        shade: false,
        area: ['700px', '450px'],//弹框大小
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        content: './airspace_add.html'
      });
    });

    //查询事件
    
   /* $("#Record").on('click', function () {
      $('table tbody tr').hide()
        .filter(":contains('" + ($('#serialNo').val()) + "')")
        .filter(":contains('" + ($('#serialNo').val()) + "')")
        .filter(":contains('" + ($('#modifyDate').val()) + "')").show();
    }).click();*/


  })


});


