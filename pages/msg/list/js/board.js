
layui.use(['layer', 'form', 'jquery', 'layedit', 'laydate', 'element'], function () {
    var layer = layui.layer
        , form = layui.form
        , $ = layui.jquery
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element



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
                    $("input").attr('readonly', true);
                    var start = massage.publishTime.substring(0, 16);
                    $("#publishTime").attr('value', start);

                }
            }
        });
    })
});

