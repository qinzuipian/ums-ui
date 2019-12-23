/* var inpMobile = document.getElementById("phonever");
var inpIden = document.getElementById("identity");
var inpPhone = document.getElementById("emergencyContactNumber");

//找规律
//QQ的规律 5到11位 开头是不为0的数字
var regTel = /^1[3|4|5|8][0-9]\d{4,8}$/;
var regIden = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

//绑定事件
check(inpMobile, regTel);
check(inpIden, regIden);
check(inpPhone, regTel);
function check(inp, regEx) {
    inp.onblur = function () {
        if (regEx.test(this.value)) {
            this.nextSibling.innerHTML = "输入格式正确";
            this.nextSibling.style.color = "white"
            // $(".verify").removeClass('verify_')
        } else {
            this.nextSibling.innerHTML = "输入格式错误";
            this.nextSibling.style.color = "red"
            // $(".verify").addClass('verify_')
        }
    };
} */

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

function c() {
    var r = new FileReader();
    f = document.getElementById('imgfile').files[0];
    r.readAsDataURL(f);
    r.onload = function (e) {
        document.getElementById('show').src = this.result;
        document.getElementById('show').style.display = 'block';
    };
}




layui.use(['form', 'jquery', 'upload', 'element'], function () {
    var form = layui.form //日期
        , $ = layui.jquery
        , upload = layui.upload //上传
        , element = layui.element; //元素操作

    $("#userType").change(function () {

        if ($(this).val() === "2") {
            $('#business').css('display', 'block');
            $('#flynum').css('display', 'block');
            $('#phone').css('display', 'block');
            $('#order').css('display', 'block');
            $('#model').css('display', 'block');
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




    $('#formId').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ownerName: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            contactPhone: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '请输入完整手机号码！'
                    }

                }
            },
            ownerId: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                        message: '身份证号码格式不正确，为15位和18位身份证号码！'
                    },

                }
            },
            companyId: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }

                }
            },
            driverLicense: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }

                }
            },
            certificateGrade: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }

                }
            },
            issuingAgency: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }

                }
            },
            emergencyContactNumber: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '请输入完整手机号码！'
                    }

                }
            }
        }
    });
    $('.sure').click(function () {
        $("#formId").bootstrapValidator('validate');//提交验证
        if ($("#formId").data('bootstrapValidator').isValid()) {
            if ($('#userType').val() === '1') {
                model = $('#modelType option:selected').val();
                num = $('#serialNum').val();
            } else {
                model = $('#flymodel').val();
                num = $('#flyserialNum').val();
            }

            $.ajax({
                type: "post",
                // async: false,
                url: UmsCommon.commonUrl() + "uav/saveOrUpdate",
                dataType: "JSON",
                data: {
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
                    // if (info.status == 200) {
                        // $(location).attr('href', '../uav/uavhand.html');
                        window.location.href = '../uav/uavhand.html';
                  /*   } else {
                        
                    } */
                }
            })
        } else {
            layer.msg('请完善信息');
        }
        return false;
    })
    /* $('#formId').on('submit', function () {
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
                    // $(location).attr('href', '../uav/uavhand.html');
                    window.location.href = '../uav/uavhand.html';
                } else {
                    layer.msg('请完善信息');
                }
            }
        })
    }) */

    var input = document.getElementById("imgfile");


    if (typeof (FileReader) === 'undefined') {
        result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
        input.setAttribute('disabled', 'disabled');
    } else {
        //开启监听
        input.addEventListener('change', readFile, true);
    }

    function readFile() {
        // console.log(111);
        var file = this.files[0];

        //  //限定上传文件的类型，判断是否是图片类型
        //  if (!/image\/\w+/.test(file.type)) {
        //      alert("只能选择图片");
        //      return false;
        //  }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            code = this.result;

            //  console.log(code);


        }
    }


    $('.cancel').on('click', function () {

        layer.confirm('确认返回吗？', function (index) {
            $('input[type="text"]').val('');
            $("textarea").val('');
            window.location.href = '../uav/uavhand.html';
            layer.close(index);
        });
        /*  if(confirm("内容没有保存，您确定要清空本页吗？")) {
             $('input[type="text"]').val(''); 
             $("textarea").val(''); 
         } else {} */

    })









})
