var goosh = new Object();
goosh.lib = new Object();

<?
include("lib/namespace.js");
include("config/config.js");
include("lang/lang.js");
include("gui/gui.js");
include("ajax/ajax.js");
?>



Array.prototype.in_array = function (elem) {
  var i;
  for (i = 0; i < this.length; i++) {
    if (this[i] == elem) {
      return true;
    }
  }
  return false;
};

function yield(){
  if(cmdqueue.length >0)  command(cmdqueue.pop());
}


var searchers = new Array();


function search_base(){

  this.mode = false;
//  this.more = false;
  this.parameters = "";
  this.help = "no helptext yet.";
  this.helptext = "";
  this.hasmore = false;

}

function register_searcher(name,base){
 if(!base) base = "base"; 
  eval("search_"+name+".prototype = new search_"+base+"();"+
       "searchers_"+name+" = new search_"+name+"();"+
      'searchers["'+name+'"] = searchers_'+name+";");
}

<?
include("searchers/web.js");

if ($handle = opendir('searchers')) {
    while (false !== ($file = readdir($handle))) {
        if($file[0] != "." && $file != "web.js") include("searchers/".$file); //echo "$file\n";
    }

    closedir($handle);
}


include("lib/keyboard.js");
?>




function command(cmdpar){
var cmdstr ="";

if(!cmdpar && cmdpar != ""){
  var cmdstri = document.f.q.value;
  var cmdstrs = cmdstri.split(";");

   cmdqueue = new Array();
  if(cmdstrs.length>1){

    for(ii=0;ii<cmdstrs.length;ii++){
      cmdstr = cmdstrs[ii];
      if(cmdstr != ""){
        cmdqueue.push(cmdstr);
      }
    }
      cmdqueue.reverse();
      command(cmdqueue.pop());
    return false;
  }
  else cmdpar = cmdstri;
}

var tokens = cmdpar.split(" ");
var args = new Array();


  for(i=0; i<tokens.length; i++){
    if(tokens[i] != ""){

      for(j=0; j<29; j++){  // replace search result numbers
	if((tokens[i] == j) && (urls[j])) {
	  tokens[i] = urls[j];
	  if(i == 0) args.push("open"); // number shortcut
	}
      }

      args.push(tokens[i]);
    } 
  }



// output.innerHTML += dump(searchers);  
// output.innerHTML += searchers[0].aliases;  

  var searcher;

  for(key in searchers){
     if(key != "in_array" && searchers[key].aliases.in_array(args[0])){
      searcher = searchers[key];
      args[0] = searcher.name;
      break;
     }
  }

if(args.length == 0 && moreobj && moreobj.hasmore){
  searcher = searchers["more"];
  args[0] = "more";
}

// output.innerHTML += searcher.aliases;  
  //   output.innerHTML += "COMMAND:"+delim+"/"+cmdstr+"/"+args+".<br/>"; // debug

  var cmdstrnew = args.join(" ");

  output.innerHTML += "<div class='input'>"+cmdprompt+"<span class='inputb'>"+cmdstrnew+"</span></div>";
  if(cmdstrnew != "") {
    hist[hist.length] = cmdstrnew;
    histpos = hist.length;
  }
  
  
  var cmd = ""; 

  if(!searcher) {
     searcher = searchers[mode]; // default searcher = mode
  }
  else {
    for(i=0; i<args.length-1; i++) args[i] = args[i+1];
    args.pop();
  }

  //more
  if(searcher.more && args.length>0) moreobj = searcher;

  if(args.length == 0 && searcher.mode) {
      mode = searcher.name;
      cmdprompt = user+"@"+host+":/"+mode+pend;
      promptel.innerHTML = cmdprompt;
    }
    else{
      searcher.call(args);
}

 window.scrollBy(0, 500);
  document.f.q.value = '';

  focusinput();

return false;
}



goosh.onload = function () {
  
  goosh.gui.init();

  goosh.gui.updateprompt();
  goosh.gui.focusinput();

  if(goosh.gui.inputfield.value != "") goosh.command();
}

