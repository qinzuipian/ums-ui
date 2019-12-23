layui.use(['form','layer', 'layedit','laydate'], function(){
    var form = layui.form
        , layer = layui.layer
        , $ = layui.jquery
        , laydate = layui.laydate


       
  
  $(function (){
    $.ajax({
  
      url: UmsCommon.commonUrl()+'sys-user/detail',
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
          laydate.render({
            elem: '#startdate' //指定元素
            ,type: 'date'
            // , value: new Date()
          });       
  
          var start = massage.createDate.substring(0, 16);
          // var apply = massage.modifyDate.substring(0, 16);
  
          $("#createDate").attr('value', start);
          // $("#modifyDate").attr('value', apply);
  
          $(".cancel").on('click',function(){
            parent.layer.closeAll('iframe');//关闭弹窗
        })
  
          form.render();

           
        }
      }  
    });
  })
  });
  