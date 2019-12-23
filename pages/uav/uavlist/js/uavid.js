layui.use(['form', 'jquery', 'layer', 'laydate', 'element'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , layer = layui.layer
        , laydate = layui.laydate
        , element = layui.element;

    $(function () {
        $.ajax({
            url: UmsCommon.commonUrl() + "uav/detail",
            type: 'post',
            dataType: 'json',
            data: {
                id: localStorage.getItem('id'),
                token: 123
            },
            success: function (info) {
                if (info.status == 200) {
                    var message = info.data;
                    var html = template('demo', message);
                    $('.view .layui-form').html(html);

                    $(".cancel").on('click', function () {
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })


                }

            }
        })
    })

    // 编辑之后，立即提交

    form.on('submit(formDemo)', function (data) {
       

        $.ajax({
            type: 'post',
            url: UmsCommon.commonUrl() + "uav/saveOrUpdate",
            dataType: 'json',
            data: {
                'id': localStorage.getItem('id'),
                'deviceName': data.field.deviceName,   
                'createId': data.field.createId,
                'createName': data.field.createName,
                'createDate': data.field.createDate,
                'token': 123

            },
            success: function (info) {
                if (info.status == 200) {
                    layer.msg('修改成功！', {
                        time: 500
                    }, function () {
                        window.parent.location.reload();
                        parent.layer.close(index);
                    }
                    );
                }
                else {
                    layer.msg('编辑异常!');
                }
                // parent.layer.closeAll('iframe');//关闭弹窗

            }
        })
        return false;
    })
})