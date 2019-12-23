layui.use(['form', 'layedit'], function () {
  var form = layui.form
    , layer = layui.layer
    , $ = layui.jquery;

  $(function () {

    $.ajax({
      url: UmsCommon.commonUrl() + 'flightplan/detail',
      type: "post",
      data: {
        id: localStorage.getItem('id'),
        token: 123
      },
      dataType: 'json',
      success: function (info) {
        if (info.status == 200) {
          var massage = info.data;
          //  console.log(massage);
          sessionStorage.setItem('address',massage.address);
          sessionStorage.setItem('endaddress',massage.endAddress);
          var html = template('demo', massage);
          $('.view .layui-form').html(html);
          var start = massage.startTime.substring(0, 16);
          var apply = massage.applyTime.substring(0, 16);
          var end = massage.endTime.substring(0, 16);
          
          $("#startTime").attr('value', start);
          $("#applyTime").attr('value', apply);
          $("#endTime").attr('value', end);

          $("input").attr('readonly', true);
          form.render();


          var myGeo = new BMap.Geocoder();
          var searchTxt = sessionStorage.getItem('address');
          var Txtend = sessionStorage.getItem('endaddress');
          myGeo.getPoint(searchTxt, function (point) {
            var str = JSON.stringify(point.lng);
            var str1 = JSON.stringify(point.lat);
            sessionStorage.setItem('startlng', str);
            sessionStorage.setItem('startlat', str1);
            setPoint(point);
          }, "全国");
          myGeo.getPoint(Txtend, function (point) {
            var str = JSON.stringify(point.lng);
            var str1 = JSON.stringify(point.lat);
            sessionStorage.setItem('endlng', str);
            sessionStorage.setItem('endlat', str1);
            setPoint(point);
          }, "全国");
          function setPoint(point) {
            if (point) {
              map.centerAndZoom(point, 12);
              var marker = new BMap.Marker(point);
            }
          }
        }
      }
    });
  
  })
});
