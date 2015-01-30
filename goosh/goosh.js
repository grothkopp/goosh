var goosh = new Object();
goosh.lib = new Object();

<?
 include("goosh/lib/namespace.js");
 include("goosh/lib/in_array.js");
 include("goosh/lib/chop.js");
 include("goosh/lib/get.js");
 include("goosh/lib/cookie.js");
 include("goosh/lang/lang.js");
 include("goosh/gui/gui.js");
 include("goosh/set/set.js");
 include("goosh/ajax/ajax.js");
 include("goosh/config/config.js");
 include("goosh/lib/keyboard.js");
 include("goosh/modules/modules.js");
?>



goosh.command = function(){
var cmdpar = goosh.gui.inputfield.value;

var tokens = cmdpar.split(" ");
var args = new Array();


  for(i=0; i<tokens.length; i++){
    if(tokens[i] != ""){

      if(tokens[0] != "set" && tokens[0] != "settings"){
      var j =1;
      while(goosh.config.urls[j]){  // replace search result numbers
	if(tokens[i] == j) {
	  tokens[i] = goosh.config.urls[j];
	  if(i == 0) args.push("open"); // number shortcut
	}
	j++;
      }
      }

      args.push(tokens[i]);
    } 
  }




  var searcher;

  for(key in goosh.modules.list){
     if(goosh.lib.in_array(goosh.modules.list[key].aliases, args[0])){
      searcher = goosh.modules.list[key];
      args[0] = searcher.name;
      break;
     }
  }

if(args.length == 0 && goosh.config.moreobj && goosh.config.moreobj.hasmore){
  searcher = goosh.modules.list["more"];
  args[0] = "more";
}

// output.innerHTML += searcher.aliases;  
  //   output.innerHTML += "COMMAND:"+delim+"/"+cmdstr+"/"+args+".<br/>"; // debug

  var cmdstrnew = args.join(" ");

  if(encodeURIComponent(cmdstrnew) != goosh.lib.get("q") && cmdstrnew != "more" && cmdstrnew != "logout")
   window.location.hash = "#"+encodeURIComponent(cmdstrnew);

  goosh.gui.out("<div class='input'><span class='less'>"+goosh.gui.prompt+"</span>"+cmdstrnew.replace(/</g, "&lt;")+"</div>");
  if(cmdstrnew != "") {
    goosh.keyboard.hist[goosh.keyboard.hist.length] = cmdstrnew;
    goosh.keyboard.histpos = goosh.keyboard.hist.length;
  }
  
  
  var cmd = ""; 

  if(!searcher) {
     searcher = goosh.modules.list[goosh.config.mode]; // default searcher = mode
  }
  else {
    for(i=0; i<args.length-1; i++) args[i] = args[i+1];
    args.pop();
  }

  //more
  if(searcher.more && args.length>0) this.config.moreobj = searcher;

  if(args.length == 0 && searcher.mode) {
      goosh.config.mode = searcher.name;
      goosh.gui.updateprompt();
    }
    else{
      searcher.call(args);
}

  goosh.gui.scroll();
  goosh.gui.inputfield.value = '';

  goosh.gui.focusinput();

return false;
}



goosh.onload = function(e,username) {

  var ifrlogin =false;

  try{
    if(parent.goosh != goosh) { 
      var bodyel = document.getElementById('body');
      bodyel.innerHTML = ""; 
      goosh=parent.goosh;
      ifrlogin = true;
    }
  }
  catch(e){}


  goosh.gui.init();

  if(!username && (ifrlogin || document.cookie.indexOf("loggedin") != -1)){
   goosh.ajax.query("http://goosh.appspot.com/status?callback=goosh.onload");
   return;
   }
  else {
   if(goosh.ajax.iscontext(e)) {
   goosh.config.user = username;
    //try {
     var d = goosh.gui.el("gooshlogin");
     var p = goosh.gui.el("gooshloginparent");
     if(d && p) { goosh.gui.outputel.removeChild(goosh.gui.outputel.lastChild);}
    // }
    // catch(e){}
   }
  }

  if(username && username != "guest") goosh.lib.cookie.set("loggedin","1",365);


  goosh.set.init();




}

goosh.getquery = function(){
   var query = ""
   if(goosh.lib.get("q")) {query = goosh.lib.get("q");} //{window.location.href="http://gshell.grothkopp.com/#"+goosh.lib.get("q"); return;} //query = decodeURI(goosh.lib.get("q"));
   if(window.location.hash) query = decodeURIComponent(window.location.hash.substr(1));
   query +=" ";

   if(query != " " && query.substr(0,6) != "login " && query.substr(0,4) != "set " && query.substr(0,9) != "settings ") 
     goosh.gui.inputfield.value = query.substr(0,query.length); //.replace(/</g, "&lt;"); 
   else 
     goosh.gui.inputfield.value = "";
  //if(window.location.hash && window.location.hash.substr(1,5) != "login") goosh.gui.inputfield.value = window.location.hash.substr(1).replace(/</g, "&lt;");
  goosh.gui.updateprompt();
  goosh.gui.showinput();
  goosh.gui.focusinput();
 
  if(goosh.gui.inputfield.value != "") {
 
  goosh.command();
  
  }
}


if(typeof window.addEventListener !== 'undefined') {
  window.addEventListener('load', goosh.onload, false);
} else if(typeof window.attachEvent !== 'undefined') {
  window.attachEvent('onload', goosh.onload);
	          }


google.load('search', '1', {language : goosh.config.lang, nocss: "true"}); //de
google.setOnLoadCallback(function(){ loaded = true; },true);


