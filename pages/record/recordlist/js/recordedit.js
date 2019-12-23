layui.use(['form', 'jquery', 'layer','laydate', 'element'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , laydate = layui.laydate
        , element = layui.element;

     

      // 编辑之后，立即提交
      form.on('submit(formDemo)', function (data) {

       /*  layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息',
        }) */
        $.ajax({
            type: 'post',
            url: UmsCommon.commonUrl()+"historyalarm/saveOrUpdate",
            dataType: 'json',
            data: {
                'id': localStorage.getItem('id'),
                'deviceName': data.field.deviceName,
                'fenceType': data.field.fenceType,
                'purpose': data.field.purpose,
                'fenceId': data.field.fenceId,
                'fenceName': data.field.fenceName,
                'action': data.field.action,
                'latitude': data.field.latitude,
                'longitude': data.field.longitude,
                'radius': data.field.radius,
                'alarmTime': data.field.alarmTime,
                'createId': data.field.createId,
                'createName': data.field.createName,
                'createDate': data.field.createDate,
                'token':123
            },
            success: function (info) {
                if (info.status == 200) {
                    layer.msg('保存成功！');
                }
                else {
                    layer.msg('保存异常!');
                }
                parent.layer.closeAll('iframe');//关闭弹窗

            }


        })
        return false;
    })
})