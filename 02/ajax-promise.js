const Ajax = ({
    method = 'get',
    url = '/',
    async = 'true',
    data,
}) => {
    return new Promise((resolve, reject) => {
        var oAjax;
        if (window.XMLHttpRequest)  
              {// 兼容 IE7+, Firefox, Chrome, Opera, Safari  
              oAjax=new XMLHttpRequest();  
              }  
            else  
              {// 兼容 IE6, IE5  
              oAjax=newActiveXObject("Microsoft.XMLHTTP");  
              }  
         
        oAjax.onreadystatechange = function (){
            if(oAjax.readyState == 4 && oAjax.status == 200)
            {
                var json = eval('('+oAjax.responseText+')');//把传回来的字符串解析成json对象
                resolve(json);
            }
        }
    }

    oAjax.open(method,url,true);//方法,URL,异步传输
    if (method === 'get') {
        oAjax.send();
    }
    if (method === 'post') {
        var data = '';
        for(var d in jsonData)   //拼装数据
            data += (d + '=' +jsonData[d] + '&');
        oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        oAjax.send(data);
    }
}


Ajax.get = function (url) {
    return Ajax({
        url: url
    })
}


Ajax.post = function (url, data) {
    return Ajax({
        method: 'post',
        url: url,
        data: data
    })
}