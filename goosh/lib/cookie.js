goosh.lib.namespace("goosh.lib.cookie");

goosh.lib.cookie.list = new Object();

/*
goosh.lib.cookie.fetch = function(context,result){

  goosh.lib.cookie.getfromstr(document.cookie);

  if(goosh.config.user != "guest") {
    if(!context) {
      goosh.ajax.query("http://goosh.appspot.com/cookie?callback=goosh.lib.cookie.fetch");
    }
    else if(goosh.ajax.iscontext(context)){
    
     //alert(result);

     goosh.lib.cookie.getfromstr(result,true);

    }
  
  }  
  return goosh.lib.cookie.list;
}
*/

goosh.lib.cookie.getfromstr = function(str,update){
  var ca = str.split(';');

  for(var i=0;i < ca.length;i++) {
     var pair = ca[i].split("=");
     var key = goosh.lib.chop(pair[0]);
     var val = goosh.lib.chop(pair[1]);
     if(update && goosh.lib.cookie.list[key] != val){
	goosh.lib.cookie.set(key,val,365);
     }
     goosh.lib.cookie.list[key] = val;
  }
}


goosh.lib.cookie.get = function(name) {
  return goosh.lib.cookie.list[name];
}



goosh.lib.cookie.set = function(name,val,days) {

  var duration = new Date();
  var timespan = duration.getTime() + (days * 24 * 60 * 60 * 1000);
  duration.setTime(timespan);

  document.cookie = name+"="+val+"; expires=" + duration.toGMTString();

  if(goosh.config.user != "guest" && name != "loggedin") {
      var del = "";
      if(days<0) {del= "&del=1"; }
      goosh.ajax.query("http://goosh.appspot.com/cookie?key="+encodeURIComponent(name)+"&val="+encodeURIComponent(val)+"&callback=goosh.lib.cookie.fetch"+del,true);
  }

  goosh.lib.cookie.list[name] = val;
  return val;
}


goosh.lib.cookie.del = function(name) {

  goosh.lib.cookie.set(name,"",-100);

  goosh.lib.cookie.list[name] = null;

}


goosh.lib.cookie.getall = function(){
  return goosh.lib.cookie.list;
}
