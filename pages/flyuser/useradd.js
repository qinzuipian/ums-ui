
/* layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#createDate' //指定元素
        , type: 'date'
        //, value: new Date()
    });
}); */

layui.use(['form', 'layedit','layer' ,'laydate'], function () {
    var form = layui.form
        , layedit = layui.layedit
        , layer = layui.layer
        , laydate = layui.laydate
        , $ = layui.jquery;

       
    var html = template('demo');
    $('.view .layui-form').html(html);

    $(".cancel").on('click', function () {
        parent.layer.closeAll('iframe');//关闭弹窗
    })
    var currentDay = new Date().Format('yyyy-MM-dd hh:mm:ss');

    form.render();

    laydate.render({
        elem: '#createDate' //指定元素
        // , type: 'date'
        , value: new Date()
    });    
    

    form.on('submit(formDemo)', function (data) {
        /*   layer.alert(JSON.stringify(data.field), {
              title: '最终的提交信息'
          }) */
        $.ajax({
            url: UmsCommon.commonUrl() + "sys-user/saveOrUpdate",
            dataType: 'json',
            type: 'post',
            data: {
                'userName': data.field.userName,
                'password': data.field.password,
                'sex': data.field.sex,
                'birthday': data.field.birthday,
                'email': data.field.email,
                'mobile': data.field.mobile,
                'createId': '1',
                'createDate': currentDay,
                'createName': 'admin',
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
});


  





