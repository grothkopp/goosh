goosh.lib.namespace("goosh.ajax");

goosh.ajax.contexts = new Array();
goosh.ajax.lastcontext = false;

goosh.ajax.stopall = function(){

 for(key in goosh.ajax.contexts){
   goosh.ajax.iscontext(key);
 }

}

goosh.ajax.deletecontext = function(context){
  goosh.gui.outln('Error: Operation timed out. '+context);
  if(!document.all) goosh.gui.outln(goosh.gui.less('If you use the noscript firefox-extension, add "ajax.googleapis.com" to the whitelist.'));
  goosh.gui.outln('');
  goosh.ajax.contexts[context]=false;

  var d = document.getElementById(context);
  if(d) document.body.removeChild(d);

  goosh.gui.showinput();
  goosh.gui.focusinput();
  goosh.gui.scroll();
  if(!document.all) stop();

}

goosh.ajax.iscontext = function(name){

 if(goosh.ajax.contexts[name]){
 
   clearTimeout(goosh.ajax.contexts[name]);
   goosh.ajax.contexts[name] =false;

  var d = document.getElementById(name);
  if(d) document.body.removeChild(d);


 return true;
 }
 else return false;

}

goosh.ajax.getcontext = function(name){
  var d = new Date(); 
  var context = d.getTime();
  if(name) context = name;

  goosh.ajax.contexts[context] = setTimeout("goosh.ajax.deletecontext('"+context+"');",1000*goosh.config.timeout);

  return context;
}

goosh.ajax.query = function(url,nohide){
    var context = "none";
    if(!nohide){ 
    context = goosh.ajax.getcontext();
    goosh.ajax.lastcontext = context; // more elegant with return, but doesnt work in opera
    goosh.gui.hideinput();
    }


    var script = document.createElement("script");
    document.body.appendChild(script);
    script.src = url+'&context='+context+'&';
    script.id = context;

}



