
var code = "";
var model = "";
var num = "";



//点击发送验证码按钮，进行倒计时
var countdown = 60;
function settime(val) {
    if (countdown == 0) {
        $("#btn").attr("disabled", false);
        $("#btn").attr("value", "获取验证码");
        countdown = 60;
        return false;
    } else {
        $("#btn").attr("disabled", true);
        $("#btn").attr("value", "重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(val)
    }, 1000)
}


layui.use(['form', 'jquery', 'upload', 'element'], function () {
    var form = layui.form //日期
        , $ = layui.jquery
        , upload = layui.upload //上传
        , element = layui.element; //元素操作
    $("#open").click(function() {
        // alert('ok');

        $.ajax({
            url: UmsCommon.commonUrl() + "uav/uavRes",
            type: 'post',
            dataType: 'json',
            data: {
                token: 123,
                userType: $("#userType").val(),
                ownerName: $("#ownerName").val(),
                ownerId: $("#identity").val(),
                companyId: $("#companyId").val()
            },
            success: function (info) {
               
                if (info.status == 200) {
                    var message = info.data;
                    var html = template('demo', message);
                    $('.container-fluid .nav .nam .uavmain').html(html);
                    var uavid = localStorage.setItem('id',info.data.id);
                    console.log(uavid);
    
                    if (message.userType === 1) {
                        $('#model').css('display', 'none');
                        $('#business').css('display', 'none');
                        $('#fastphone').css('display', 'none');
                        $('#flynum').css('display', 'none');
                        $('#order').css('display', 'none');
                        $('#company').css('display', 'none');
                        $('#legal').css('display', 'none');
                        $('#orderid').css('display', 'block');
                    } else {
                        $('#model').css('display', 'block');
                        $('#business').css('display', 'block');
                        $('#fastphone').css('display', 'block');
                        $('#flynum').css('display', 'block');
                        $('#company').css('display', 'block');
                        $('#order').css('display', 'block');
                        $('#legal').css('display', 'block');
                        $('#peoplemodel').css('display', 'none');
                        $('#wei').css('display', 'none');
                        $('#issus').css('display', 'none');
                        $('#certif').css('display', 'none');
                        $('#driver').css('display', 'none');
                        $('#ownerId').css('display', 'none');
                        $('#orderid').css('display', 'none');
                    }
    
                    form.render();
                } else if(info.status==203) {
                    layer.msg('此用户不存在');
                }
    
            }
        })
    })
   


    $('#formId').on('submit', function () {
        if ($('#userType').val() === '1') {
            model = $('#modelType option:selected').val();
            num = $('#serialNum').val();
        } else {
            model = $('#flymodel').val();
            num = $('#flyserialNum').val();
        }


        $.ajax({
            type: "post",
            async: false,
            url: UmsCommon.commonUrl() + "uav/saveOrUpdate",
            dataType: "JSON",
            data: {
                'id': localStorage.getItem('id'),
                createId: '1',
                createName: 'admin',
                createDate: '2018-01-05 11:08:36.0',
                // registerDate:new Date(),
                userType: $('#userType').val(),
                ownerName: $('#ownerName').val(),
                contactPhone: $('#phonever').val(),
                ownerId: $('#identity').val(),
                companyId: $('#companyId').val(),
                modelType: model,
                serialNum: num,
                driverLicense: $('#driverLicense').val(),
                certificateGrade: $('#certificateGrade').val(),
                issuingAgency: $('#issuingAgency').val(),
                weight: $('#weight').val(),
                purpose: $('#purpose').val(),
                manufacturer: $('#manufacturer').val(),
                // imei: $('#imei').val(),
                deviceName: $('#deviceName').val(),
                uavNum: $('#uavNum').val(),
                emergencyContactNumber: $('#emergencyContactNumber').val(),
                file: code,
                token: 123
            },
            success: function (info) {
                if (info.status == 200) {
                    $(location).attr('href', '../uav/uav.html');
                } else {
                    alert('注册失败');
                }
            }
        })
    })



    $("#userType").change(function () {
        if ($(this).val() === "2") {
            $('#business').css('display', 'block');
            $('#flynum').css('display', 'block');
            $('#phone').css('display', 'block');
            $('#order').css('display', 'block');
            $('#model').css('display', 'block');
            $('#flyserialNum').css('display', 'block');
            $('#ownerId').css('display', 'none');
            $('#orderid').css('display', 'none');
            $('#driver').css('display', 'none');
            $('#certif').css('display', 'none');
            $('#issus').css('display', 'none');
            $('#wei').css('display', 'none');
            $('#peoplemodel').css('display', 'none');

        } else {
            $('#business').css('display', 'none');
            $('#flynum').css('display', 'none');
            $('#phone').css('display', 'none');
            $('#order').css('display', 'none');
            $('#model').css('display', 'none');
            $('#ownerId').css('display', 'block');
            $('#orderid').css('display', 'block');
            $('#driver').css('display', 'block');
            $('#certif').css('display', 'block');
            $('#issus').css('display', 'block');
            $('#wei').css('display', 'block');
            $('#peoplemodel').css('display', 'block');
        }

    });


    $('.cancel').on('click', function () {
        layer.confirm('确认返回吗？', function (index) {
            $('input[type="text"]').val('');
            $("textarea").val('');
            window.location.href = '../uav/uavmin.html';
            layer.close(index);
        });

    })

    $("#ownerName").blur(function () {
        var ownerName = this.value;
        var userType = $("#userType option:selected").val();
        // console.log(ownerName);
        // console.log(userType);
        if(ownerName != '' && userType != ''){
            $.ajax({
                url: UmsCommon.commonUrl() + "uav/IdCardByOwnerName",
                type: "post",
                data: {
                    ownerName: ownerName,
                    token: 123,
                    userType: userType
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 200) {
                        vm.idCardList = data.data;
                        vm.idCard = vm.idCardList[0];
                    } else {
                        return false;
                    }
                }
            });
        }else{
            layer.msg('请完善信息');
        }


    });





});



var vm = new Vue({
   el: "#vm",
   data: {
       idCard: '',
       idCardList: []
   }
});
