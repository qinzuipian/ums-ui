layui.use(['form', 'jquery', 'layer', 'laydate', 'element'], function () {
    var form = layui.form
        , $ = layui.jquery
        , layer = layui.layer
        , layer = layui.layer
        , laydate = layui.laydate
        , element = layui.element;

    var user_type;

    var model = '';
    var flymodel = '';




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
                    //console.log(message);
                    var html = template('demo', message);
                    $('.view .layui-form').html(html);

                    $(".cancel").on('click', function () {
                        parent.layer.closeAll('iframe');//关闭弹窗
                    })

                    if(message.userType===1) {
                        $('#model').css('display', 'none');
                        $('#business').css('display', 'none');
                        $('#fastphone').css('display', 'none');
                        $('#flynum').css('display', 'none');
                        $('#company').css('display', 'none');
                        $('#legal').css('display', 'none');
                    } else {
                        $('#model').css('display', 'block');
                        $('#business').css('display', 'block');
                        $('#fastphone').css('display', 'block');
                        $('#flynum').css('display', 'block');
                        $('#company').css('display', 'block');
                        $('#legal').css('display', 'block');
                        $('#peoplemodel').css('display', 'none');
                        $('#wei').css('display', 'none');
                        $('#issus').css('display', 'none');
                        $('#certif').css('display', 'none');
                        $('#driver').css('display', 'none');
                        $('#ownerId').css('display', 'none');
                    }

                    form.render();

                    form.on('radio(userType)', function (data) {
                        if (data.value === '1') {
                            // document.getElementById("flynum").style.display = "none";
                            document.getElementById("business").style.display = "none";
                            document.getElementById("fastphone").style.display = "none";
                            // document.getElementById("model").style.display = "none";
                            // document.getElementById("company").style.display = "none";
                            // document.getElementById("legal").style.display = "none";
                            document.getElementById("ownerId").style.display = "block";
                            document.getElementById("driver").style.display = "block";
                            document.getElementById("certif").style.display = "block";
                            document.getElementById("issus").style.display = "block";
                            // document.getElementById("wei").style.display = "block";
                            // document.getElementById("peoplemodel").style.display = "block";
                        }
                        else {
                            // document.getElementById("flynum").style.display = "block";
                            document.getElementById("business").style.display = "block";
                            document.getElementById("fastphone").style.display = "block";
                            // document.getElementById("model").style.display = "block";
                            // document.getElementById("company").style.display = "block";
                            // document.getElementById("legal").style.display = "block";
                            document.getElementById("ownerId").style.display = "none";
                            document.getElementById("driver").style.display = "none";
                            document.getElementById("certif").style.display = "none";
                            document.getElementById("issus").style.display = "none";
                            // document.getElementById("wei").style.display = "none";
                            // document.getElementById("peoplemodel").style.display = "none";
                        }
                    });

                    $('[name=userType]').each(function (i, item) {
                        if ($(item).val() == message.userType) {
                            $(item).prop('checked', true);
                        }
                    });

                    $('[name=modelType]').find('option').each(function () {
                        $(this).attr('selected', $(this).val() == message.modelType);

                    });



                    // 选择框从后台获取数据
                    $.ajax({
                        timeout: 3000,
                        async: false,
                        type: "post",
                        url: UmsCommon.commonUrl() + "sys-dict/dictTypeList",
                        dataType: "json",
                        data: {
                            token: 123,
                            itemType: '类别',
                        },
                        success: function (data) {

                            if (data.status == 200) {

                                var manMess = data.rows;
                                //console.log(manMess);
                                for (var i = 0; i < manMess.length; i++) {
                                    var option = `<option value="${manMess[i].typeName}" selected="value">${manMess[i].typeName}</option>`;
                                    $("select[name='uavName']").append(option);
                                }
                                layui.use(['form'], function () {
                                    var form1 = layui.form;
                                    form1.render();

                                    //日期选择器的渲染
                                    laydate.render({
                                        elem: '#registerDate' //指定元素
                                        , value: new Date()
                                    });

                                    form1.on('select(uavName)', function (data) {
                                        console.log(data.value);
                                        $("select[name=uavName]").val(data.value);
                                        layui.form.render('select')

                                    });

                                })
                            }
                        }
                    });




                }

            }
        })
    })
    form.on('select(modelType)', function (data) {

        console.log(data.value);
        model = data.value;
        // model = data.elem[data.elem.selectedIndex].text
        // console.log(data.elem[data.elem.selectedIndex].text);
        // form.render('select');
    });

    // 编辑之后，立即提交

    form.on('submit(formDemo)', function (data) {
       

        if ( data.field.userType === '1') {
            flymodel = model;
            console.log(flymodel)

        } else {
            flymodel = data.field.modelType;
        }


        $.ajax({
            type: 'post',
            url: UmsCommon.commonUrl() + "uav/saveOrUpdate",
            dataType: 'json',
            data: {
                'id': localStorage.getItem('id'),
                'imei': data.field.imei,
                'manufacturer': data.field.manufacturer,
                'modelType': flymodel,
                'uavName': data.field.uavName,
                'ownerId': data.field.ownerId,
                'ownerName': data.field.ownerName,
                'companyName': data.field.companyName,
                'uavNum': data.field.uavNum,
                'purpose': data.field.purpose,
                'legalPerson': data.field.legalPerson,
                'contactPhone': data.field.contactPhone,
                'userType': data.field.userType,
                'driverLicense': data.field.driverLicense,
                'certificateGrade': data.field.certificateGrade,
                'issuingAgency': data.field.issuingAgency,
                'weight': data.field.weight,
                'emergencyContactNumber': data.field.emergencyContactNumber,
                'companyId': data.field.companyId,
                'createId': data.field.createId,
                'createName': data.field.createName,
                'createDate': data.field.createDate,
                'token': 123

            },
            success: function (info) {
                if (info.status == 200) {
                    layer.msg('编辑成功！');
                }
                else {
                    layer.msg('编辑异常!');
                }
                parent.layer.closeAll('iframe');//关闭弹窗

            }
        })
        return false;
    })
})