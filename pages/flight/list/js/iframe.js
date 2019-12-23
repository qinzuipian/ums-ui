layui.use(['form', 'laydate', 'laypage', 'jquery', 'layer', 'table', 'layedit', 'upload', 'element'], function () {
    var form = layui.form
    laydate = layui.laydate //日期
        , laypage = layui.laypage //分页
        , layer = layui.layer //弹层
        , $ = layui.jquery
        , table = layui.table //表格
        , layedit = layui.layedit
        , upload = layui.upload //上传
        , element = layui.element; //元素操作
    /*  layui.use('form', function () {
         var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
         element.init();
         form.render();
        
     }); */

    laydate.render({
        elem: '#Date'
        , value: new Date()
    });

   
  

    $(function () {
        $.ajax({
            url: UmsCommon.commonUrl() + "flightplan/detail",
            type: 'post',
            dataType: 'json',
            data: {
                id: localStorage.getItem('id'),
                token: 123
            },
            success: function (info) {
                if (info.status == 200) {
                    var message = info.data;
                    console.log(message);
                    var html = template('demo', message);
                    $('.view .layui-form').html(html);

                    $(".cancel").on('click',function(){
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })

                   


                    // 富文本编辑器
                    var assess = layedit.build('assess', {
                        height: 200
                    });
                    var reply = layedit.build('reply', {
                        height: 200
                    });
                    var report = layedit.build('report', {
                        height: 200
                    });
                    form.render();



                    form.on('submit(formDemo)', function (data) {
                        var content = layedit.getContent(assess);
                        var replycontent = layedit.getContent(reply);
                        var reportcontent = layedit.getContent(report);
                        // console.log(content);
                        $.ajax({
                            type: 'post',
                            url: UmsCommon.commonUrl() + "flightplan/saveOrUpdate",
                            dataType: 'json',
                            data: {
                                'id': localStorage.getItem('id'),
                                'assessUserName': data.field.assessUserName,
                                'reportUserName': data.field.reportUserName,
                                'replyUserName': data.field.replyUserName,
                                'assessTime': data.field.assessTime,
                                'assessMsg': content,
                                'reportMsg': reportcontent,
                                'replyMsg': replycontent,
                                'status':data.field.status,
                                'assessTime': data.field.assessTime,
                                'reportTime': data.field.reportTime,
                                'replyTime': data.field.replyTime,
                                'assessTel': data.field.assessTel,
                                'assessSite': data.field.assessSite,
                                'assessType': data.field.assessType,
                                'assessRadius': data.field.assessRadius,
                                'assessMax': data.field.assessMax,
                                'assessTog': data.field.assessTog,
                                'createId': data.field.createId,
                                'createName': data.field.createName,
                                'createDate': data.field.createDate,
                                'token': 123
                            },
                            success: function (info) {
                                if (info.status == 200) {
                                    layer.msg('保存成功！', {
                                        time: 500
                                    }, function () {
                                        window.parent.location.reload();
                                        parent.layer.close(index);
                                    }
                                    );
                                   
                                }
                                else {
                                    layer.msg('失败');
                                }
                              
                                parent.layer.closeAll('');//关闭弹窗

                            }
                        });
                        // $("#formsub").attr("disabled", true)
                        return false;
                    })
                }



            }
        })

    });
});

