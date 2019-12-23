
// location
layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  //执行一个laydate实例
  laydate.render({
    elem: '#createDate' //指定元素
    ,type: 'datetime'
    , value: new Date()
  });
});

layui.use(['form', 'layedit'], function(){
        var form = layui.form
            , layer = layui.layer
			, laydate = layui.laydate
            , $ = layui.jquery;

          
            var html = template('demo');
            $('.view .layui-form').html(html);
            $(".cancel").on('click',function(){
                parent.layer.closeAll('iframe');//关闭弹窗
            })
            var currentDay = new Date().Format('yyyy-MM-dd hh:mm:ss');

            form.render();
			

 form.on('submit(formDemo)', function (data) {
      /*   layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        }) */
        $.ajax({
            url: UmsCommon.commonUrl()+"district/saveOrUpdate",
            dataType: 'json',
            type: 'post',
            data:  {
             'fencyType': sessionStorage.fencyType,
        		 'longitude': sessionStorage.longitude,
        		 'latitude': sessionStorage.latitude,
        		 'radius': sessionStorage.radius,
        		 //'paths': sessionStorage.paths,
        		 'districtName': data.field.districtName,
              'districtType': data.field.districtType,
              'fenceName':data.field.fenceName,
                //'fencyId':data.field.fencyId,      
               'vertexes':sessionStorage.paths, 
               'createId': '1',
               'createDate': currentDay,
               'createName': 'admin',
               'token':123
            },
            success: function (info) {
                if (info.status == 200) {
                    layer.msg('保存成功！', {
                        time: 500
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
	
	$('#draw').on('click',function() {
			 layer.open({
				type: 2, 
				title:'地图选择',
                 area: ['600px', '420px'],//弹框大小
                 content: '../map.html' //这里content是一个普通的String
				,btn: ['确定', '取消']
				  ,yes: function(index, layero){
					layer.close(index);
				  }
				  ,btn2: function(index, layero){
					
					}
					//return false 开启该代码可禁止点击该按钮关闭
				  ,cancel: function(){ 
					//右上角关闭回调
					
					//return false 开启该代码可禁止点击该按钮关闭
				  }
			  });
			
          //$(location).attr('href', '../map.html');
        });

})

