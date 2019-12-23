
// location
layui.use(['form', 'layedit'], function(){
        var form = layui.form
            , layer = layui.layer
            , $ = layui.jquery;
            
 form.on('submit(formDemo)', function (data) {
       /*  layer.alert(JSON.stringify(data.field), {
            title: '最终的修改信息'
        }); */
		
        $.ajax({
            url: UmsCommon.commonUrl()+'district/saveOrUpdate',
            dataType: 'json',
            type: 'post',
            data:  {
              'id':localStorage.getItem('id'),
            //   'fencyId': data.field.fencyId,
              'districtName': data.field.districtName,
              'fencyType': sessionStorage.fencyType,
			  'longitude': sessionStorage.longitude,
			  'latitude': sessionStorage.latitude,
			  'radius': sessionStorage.radius,
            //   'paths': sessionStorage.paths,
              'vertexes':sessionStorage.paths, 
			  'districtType': data.field.districtType,
              'createId': data.field.createId,
              'createDate': data.field.createDate,
              'createName': data.field.createName,
              'token':123
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

})

