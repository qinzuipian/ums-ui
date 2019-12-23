// location
layui.use(['form', 'laydate', 'layedit'], function () {
  var form = layui.form
    , laydate = layui.laydate
    , layer = layui.layer
    , $ = layui.jquery
    , layedit = layui.layedit



  var html = template('demo');
  $('.view .layui-form').html(html);
  form.render();


  //执行一个laydate实例
  laydate.render({
    elem: '#startDate' //指定元素
    , value: new Date()
  });

  laydate.render({
    elem: '#endDate' //指定元素
    , value: new Date()
  });
  form.verify({
    heightup: [/^\d+$/, '只能是数字']
  })

  var index = layedit.build('mas', {
    height: 200
  });


  form.on('submit(formDemo)', function (data) {
   /*  layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息',
    }) */
    // 富文本编辑器传值
    var content = layedit.getContent(index);
    console.log(content);
    $.ajax({

      url: UmsCommon.commonUrl() + "airspace/saveOrUpdate",

      dataType: 'json',
      type: 'post',
      data: {
        'regoinType': sessionStorage.fencyType,
        'longitude': sessionStorage.longitude,
        'latitude': sessionStorage.latitude,
        'radius': sessionStorage.radius,
        'paths': sessionStorage.paths,
        // 'serialNo': data.field.serialNo,
        'spaceName': data.field.spaceName,
        'fencePurpose': data.field.fencePurpose,
        'remarks': content,
        //   'regoinType': data.field.regoinType,
        'maxHeight': data.field.maxHeight,
        'minHeight': data.field.minHeight,
        'belongCityName': data.field.belongCityName,
        'isOpen': data.field.isOpen,
        'status': data.field.status,
        'fenceUsage': data.field.fenceUsage,
        'startingTime': data.field.startingTime,
        'endTime': data.field.endTime,
        'createId': '1',
        'createDate': '2017-12-22 15:40:59.0',
        'createName': data.field.createName,
        'token': 123
      },
      success: function (info) {
        if (info.status == 200) {
          layer.msg('保存成功！', {
            time: 500
        }, function () {
            window.parent.location.reload();
            parent.layer.close('iframe');
        }
        );
        }
        else {
          layer.msg('保存异常!');
        }
        // parent.layer.closeAll('iframe');//关闭弹窗
      }
    })
    return false;
  });

  $('#draw').on('click', function () {
    layer.open({
      type: 2,
      title: '地图选择',
      area: ['600px', '420px'],//弹框大小
      content: '../map.html' //这里content是一个普通的String
      , btn: ['确定', '取消']
      , yes: function (index, layero) {
        layer.close(index);
      }
      , btn2: function (index, layero) {

      }
      //return false 开启该代码可禁止点击该按钮关闭
      , cancel: function () {
        //右上角关闭回调

        //return false 开启该代码可禁止点击该按钮关闭
      }
    });

    //$(location).attr('href', '../map.html');
  });
})
$(".cancel").on('click', function () {
  parent.layer.closeAll('iframe');//关闭弹窗
})

