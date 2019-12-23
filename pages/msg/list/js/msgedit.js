
// location
layui.use(['form', 'layedit', 'laydate', 'layer'], function () {
    var form = layui.form
        , layedit = layui.layedit
        , laydate = layui.laydate
        , layer = layui.layer
        , $ = layui.jquery;



    $(function () {
        $.ajax({
            url: UmsCommon.commonUrl() + 'msgboard/detail',
            type: "post",
            data: {
                id: localStorage.getItem('id'),
                token: 123
            },
            dataType: 'json',
            success: function (info) {
                if (info.status == 200) {
                    var massage = info.data;
                    // console.log(massage);
                    var html = template('demo', massage);
                    $('.view .layui-form').html(html);

                    var start = massage.publishTime.substring(0, 16);
                    $("#time").attr('value', start);


                    laydate.render({
                        elem: '#time'
                    });

                    $(".cancel").on('click', function () {
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })


                    // console.log(massage.msgType)
                    $('[name=msgType]').each(function (i, item) {
                        if ($(item).val() == massage.msgType) {
                            $(item).prop('checked', true);
                        }
                    });


                    form.render();
                    // 富文本编辑器
                    var index = layedit.build('mas', {
                        height: 200
                    });

                    form.on('submit(formDemo)', function (data) {
                        /* layer.alert(JSON.stringify(data.field), {
                            title: '最终的修改信息',
                        }); */
                        // 富文本编辑器赋值
                        var content = layedit.getContent(index);
                        // console.log(content);
                        $.ajax({
                            url: UmsCommon.commonUrl() + 'msgboard/saveOrUpdate',
                            dataType: 'json',
                            type: 'post',
                            data: {
                                'id': localStorage.getItem('id'),
                                'title': data.field.title,
                                'msgType': data.field.msgType,
                                'content': content,
                                'publishTime': data.field.publishTime,
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
                                        parent.layer.close('iframe');
                                    }
                                    );
                                }
                                else {
                                    layer.msg('修改异常!');
                                }
                                // parent.layer.closeAll('iframe');//关闭弹窗

                            }
                        })
                        return false;
                    });


                }
            }
        });
    })



})

