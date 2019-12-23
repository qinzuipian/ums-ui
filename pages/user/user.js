
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
      , url: UmsCommon.commonUrl() + 'sys-user/list' //数据接口
      ,where:{
        token:123,
        num: 'admin',
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
         { field: 'id', title: 'ID', align: 'center' }
        ,{ field: 'userName', title: '用户名', align: 'center'}
        , { field: 'sex', title: '性别', align: 'center' }
        //, { field: 'birthday', title: '出生日期', align: 'center'}
        , { field: 'mobile', title: '手机号', align: 'center', align: 'center' }
        // , { field: 'password', title: '密码', align: 'center' }
        , { field: 'email', title: '邮箱地址', align: 'center' }
        , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
      ]] 
      , done: function (res, page, count) {
       
  
        $("[data-field='sex']").children().each(function () {
          if ($(this).text() == '0') {
            $(this).text("男")
          } else if ($(this).text() == '1') {
            $(this).text("女")
          }
        })

      }
  
    });
  
  
    //监听工具条
    table.on('tool(demo)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data //获得当前行数据
      localStorage.setItem('id', data.id)
        , layEvent = obj.event; //获得 lay-event 对应的值
      console.log(data)
      if (layEvent === 'detail') {
        //layer.msg('查看操作');
        layer.open({
          type: 2,
          id: data.id,
          title: '信息详情',
          area: ['600px', '420px'],//弹框大小
          content: 'userdetail.html' //这里content是一个普通的String
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
          area: ['600px', '500px'],//弹框大小
          content: 'useredit.html' //这里content是一个普通的String
        });
      }
    });
  
    function districtDel(id) {
      $.ajax({
  
        url: UmsCommon.commonUrl() + "sys-user/delete", //后台提供的删除接口
        type: "post",
        data: { 
          'id': id,
          'token':123,
          'num':'admin',
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
  
 
  
  
    // jquery
    $(function () {
      //添加事件
      $("#increase").on('click', function () {
        layer.open({
          type: 2,
          title: '添加管理员',
          area: ['600px', '500px'],//弹框大小
          offset: ['0px', '300px'],//弹框位置
          maxmin: true,
          shadeClose: true, //点击遮罩关闭层
          content: 'useradd.html'
        });
      });
  


        $("#Record").on('click', function () {

        table.render({   
        elem: '#test'
        , height: 'full-200'
        , url: UmsCommon.commonUrl() + 'sys-user/fmblurrylist' //数据接口
        ,where:{
          userName:$('#districtName').val(),
            mobile:$('#createDate').val(),
            num:'1',
            token:123
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
         { field: 'id', title: 'ID', align: 'center' }
        ,{ field: 'userName', title: '用户名', align: 'center'}
        , { field: 'sex', title: '性别', align: 'center' }
        //, { field: 'birthday', title: '出生日期', align: 'center'}
        , { field: 'mobile', title: '手机号', align: 'center', align: 'center' }
        // , { field: 'password', title: '密码', align: 'center' }
        , { field: 'email', title: '邮箱地址', align: 'center' }
        , { fixed: 'right', title: '操作', width: '20%', align: 'center', toolbar: '#barDemo' }
      ]] 
      , done: function (res, page, count) {
       
  
        $("[data-field='sex']").children().each(function () {
          if ($(this).text() == '0') {
            $(this).text("男")
          } else if ($(this).text() == '1') {
            $(this).text("女")
          }
        })

      }
  
    });
         
      })

     
  
    })
  
  });
  
  
  
  
  
  
  
  