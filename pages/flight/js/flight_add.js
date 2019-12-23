
// location
layui.use(['laydate', 'layedit'], function () {
    var laydate = layui.laydate
        , layedit = layui.layedit

    //执行一个laydate实例
    laydate.render({
        elem: '#startTime' //指定元素
        , type: 'datetime'
        , value: new Date()
    });
    laydate.render({
        elem: '#endTime' //指定元素
        , type: 'datetime'
        , value: new Date()
    });
    laydate.render({
        elem: '#applyTime' //指定元素
        , type: 'datetime'
        , value: new Date()
    });


});




layui.use(['form', 'layedit'], function () {
    var form = layui.form
        , layer = layui.layer
        , laydate = layui.laydate
        , $ = layui.jquery
        , layedit = layui.layedit


    var html = template('demo');
    $('.view .layui-form').html(html);

    $(".cancel").on('click',function(){
        parent.layer.closeAll('iframe');//关闭弹窗
    })
    form.render();

    var index = layedit.build('mas', {
        height: 200
    });



    form.verify({
        num: [/^\d+$/, '只能是数字！'],
        phone: [/^1[3|4|5|8][0-9]\d{4,8}$/, '请输入正确的手机号码']
    });

    laydate.render({
        elem: '#startTime'
        , value: new Date()
    });
    laydate.render({
        elem: '#applyTime'
        , value: new Date()
    });
    laydate.render({
        elem: '#endTime'
        , value: new Date()
    });


    form.on('submit(formDemo)', function (data) {
        /* layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        }) */
        // 富文本编辑器传值
        var content = layedit.getContent(index);
        console.log(content);
        $.ajax({
            url: UmsCommon.commonUrl() + "flightplan/saveOrUpdate",
            dataType: 'json',
            type: 'post',
            data: {
                'uavId': data.field.uavId,
                'flightAltitude': data.field.flightAltitude,
                'applyUserName': data.field.applyUserName,
                'telephone': data.field.telephone,
                'model': data.field.model,
                'address': data.field.address,
                'endAddress': data.field.endAddress,
                'purpose':data.field.purpose,
                'radius': data.field.radius,
                // 'fenceName': data.field.fenceName,
                'startTime': data.field.startTime,
                'endTime': data.field.endTime,
                'applyTime': data.field.applyTime,
                'remarks': content,
                'createId': '1',
                'createDate': data.field.applyTime,
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
                    parent.layer.tips('保存异常!');
                }
                // parent.layer.closeAll('iframe');//关闭弹窗
            }
        })
        return false;
    });



})



