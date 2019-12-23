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
                var html = template('demo', message);
                $('.view .layui-form').html(html);

                $("input").attr('readonly', true);


                if (message.userType === 1) {
                    $('#company').css('display', 'none');
                    $('#legal').css('display', 'none');
                    $('#business').css('display', 'none');
                    $('#fastphone').css('display', 'none');
                    $('#flynum').css('display', 'none');
                } else {
                    $('#company').css('display', 'block');
                    $('#legal').css('display', 'block');
                    $('#ownerId').css('display', 'none');
                    $('#wei').css('display', 'none');
                    $('#issus').css('display', 'none');
                    $('#certif').css('display', 'none');
                    $('#driver').css('display', 'none');
                }


            }

        }
    })
})

/* window.onload = function () {
    laylook();
}

function laylook(id) {
    var fields = JSON.stringify(data.field);
    console.log(fields)
   
} */