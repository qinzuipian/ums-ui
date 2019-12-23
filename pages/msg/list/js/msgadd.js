
// location
layui.use(['form', 'layedit','laydate','layer'], function () {
    var form = layui.form
        , layedit = layui.layedit
        , laydate = layui.laydate
        , layer = layui.layer
        , $ = layui.jquery;

    var html = template('demo');
    $('.view .layui-form').html(html);
    form.render();

      //执行一个laydate实例
      laydate.render({
        elem: '#publishTime' //指定元素
        , value: new Date()
    });

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
            url: UmsCommon.commonUrl() + "msgboard/saveOrUpdate",
            dataType: 'json',
            type: 'post',
            data: {
                'title': data.field.title,
                'msgType': data.field.msgType,
                'content': content,
                'publishTime': data.field.publishTime,
                'createId': '1',
                'createDate': '2017-12-25 21:35:46.0',
                'createName': 'admin',
                'token': 123
            },
            success: function (info) {
                if (info.status == 200) {
                    layer.msg('保存成功！', {
                        time: 300
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
            area: ['700px', '520px'],//弹框大小
            offset: ['10px', '300px'],//弹框位置
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
$(".cancel").on('click',function(){
    parent.layer.closeAll('iframe');//关闭弹窗
})

