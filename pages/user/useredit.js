
// location
layui.use(['form', 'layedit', 'layer', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        // , $ = layui.jquery
        , laydate = layui.laydate
    //执行一个laydate实例
    laydate.render({
        elem: '#startdate' //指定元素
        , type: 'date'
    });

    $(function () {
        $.ajax({

            url: UmsCommon.commonUrl() + 'sys-user/detail',
            type: "post",
            data: {
                id: localStorage.getItem('id'),
                token: 123,
                num: 'admin',
            },
            dataType: 'json',
            success: function (info) {
                if (info.status == 200) {
                    var massage = info.data;
                    // console.log(massage);
                    var html = template('demo', massage);
                    $('.view .layui-form').html(html);
                    // $("input").attr('readonly', true);
                    laydate.render({
                        elem: '#startdate' //指定元素
                        , type: 'date'
                        // , value: new Date()
                    });

                    var start = massage.createDate.substring(0, 16);
                    // var apply = massage.modifyDate.substring(0, 16);

                    $("#createDate").attr('value', start);
                    // $("#modifyDate").attr('value', apply);

                    $(".cancel").on('click', function () {
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })

                    form.render();

                }
            }
        });
    })

    form.verify({
        regPwd: function(value) {
            //获取密码
            var pwd = $("#pwd").val();
            if(!new RegExp(pwd).test(value)) {
                return '两次输入的密码不一致';
            }
        }
    });
    form.on('submit(formDemo)', function (data) {
        /*  layer.alert(JSON.stringify(data.field), {
             title: '最终的修改信息'
         }); */
            $.ajax({
                url: UmsCommon.commonUrl() + 'sys-user/saveOrUpdate',
                dataType: 'json',
                type: 'post',
                data: {
                    'id': localStorage.getItem('id'),
                    'userName': data.field.userName,
                    'password': data.field.password,
                    'sex': data.field.sex,
                    'birthday': data.field.birthday,
                    'email': data.field.email,
                    'mobile': data.field.mobile,
                    'createId': '1',
                    'createDate': '2018-12-25',
                    'createName': 'admin',
                    'token': 123,
                    'num': 'admin',
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
                    parent.layer.closeAll('iframe');//关闭弹窗
                }
            })
            return false;
        

    });

})

