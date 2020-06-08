function callApi(type, url, data, contentType, callBack){

  var returnData = {};
  $body = $("body");
  $body.addClass("loading"); //exibe loading
  $.ajax({
      type: type,
      url: apiUrl + url,
      data: data,
      contentType: contentType,
      xhrFields: {
          withCredentials: true
      }
    })
    .done(function(success) {
        //sucess
        returnData.status = 'success';
        returnData.data = success;
    })
    .fail(function(error) {
         //falha  
        if(error.status == 500){
          returnData.status = 'user not found';
        } else {
          returnData.status = 'error';
        }
      returnData.data = error;
    })
    .always(function() {
      //chama callback
      $body.removeClass("loading"); //remove o loading da página
      if (callBack) {
          callBack(returnData);
      }
    });
    

}

