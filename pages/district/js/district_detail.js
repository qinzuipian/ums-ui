layui.use(['form', 'layedit'], function(){
  var form = layui.form
      , layer = layui.layer
      , $ = layui.jquery;

$(function (){
  $.ajax({

    url: UmsCommon.commonUrl()+'district/detail',
    type:"post",
    data:{
      id:localStorage.getItem('id'),
      token:123
    },
    dataType:'json',
    success: function(info){
      if(info.status == 200){
        var massage = info.data;
        // console.log(massage);
        var html = template('demo',massage);
        $('.view .layui-form').html(html);
        // $("input").attr('readonly', true);


        var start = massage.createDate.substring(0, 16);
        // var apply = massage.modifyDate.substring(0, 16);

        $("#createDate").attr('value', start);
        // $("#modifyDate").attr('value', apply);

        $(".cancel").on('click',function(){
          parent.layer.closeAll('iframe');//关闭弹窗
      })

        form.render();
		
        $('#draw').on('click',function() {
			 layer.open({
				type: 2, 
				title:'地图选择',
				area: ['600px', '420px'],//弹框大小
				content: '../map.html' //这里content是一个普通的String
				,btn: ['确定', '取消']
				  ,yes: function(index, layero){
					localStorage.area = sessionStorage.area;
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
		
      }
    }  
  });
})
});
