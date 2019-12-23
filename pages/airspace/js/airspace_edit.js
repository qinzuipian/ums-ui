
// location
layui.use(['form', 'layedit','element','laydate'], function(){
        var form = layui.form
        , layer = layui.layer
        , $ = layui.jquery
        , laydate = layui.laydate
        //   form.render();

        form.verify({
            heightup: [/^\d+$/, '只能是数字']
          })

         
 form.on('submit(formDemo)', function (data) {
      /*   layer.alert(JSON.stringify(data.field), {
            title: '最终的修改信息',
        }) */
        $.ajax({
            url: UmsCommon.commonUrl()+'airspace/saveOrUpdate',
            dataType: 'json',
            type: 'post',
            data:  {
              'id':localStorage.getItem('id'),
            //   'serialNo': data.field.serialNo,
              'spaceName': data.field.spaceName,
            // 'regoinType': data.field.regoinType,
              'regoinType': sessionStorage.fencyType,
      			  'longitude': sessionStorage.longitude,
      			  'latitude': sessionStorage.latitude,
      			  'radius': sessionStorage.radius,
      			  'paths': sessionStorage.paths,
      			  'maxHeight': data.field.maxHeight,
              'minHeight': data.field.minHeight,
              'belongCityName': data.field.belongCityName,
              'isOpen': data.field.isOpen,
              'status': data.field.status,
              'fencePurpose': data.field.fencePurpose,
              'startingTime': data.field.startingTime,
              'endTime': data.field.endTime,
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




