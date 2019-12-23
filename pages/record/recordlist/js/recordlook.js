layui.use(['form', 'jquery', 'layer', 'laydate', 'element'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , laydate = layui.laydate
        , element = layui.element;


    $(function () {
        $.ajax({

            url: UmsCommon.commonUrl() + "historyalarm/detail",

            type: "post",
            dataType: 'json',
            data: {
                id: localStorage.getItem('id'),
                token: 123
            },
            success: function (info) {
                if (info.status == 200) {
                    var message = info.data;
                    // console.log(message);
                    var html = template('demo', message);
                    $('.view .layui-form').html(html);

                    // $("input").attr('readonly', true);

                    $(".cancel").on('click', function () {
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })


                    laydate.render({
                        elem: '#alarmTime' //指定元素
                        , value: new Date()
                    });


                    form.render();

                }

            }
        })
    })
})

