
function search_lang(){
  this.name = "lang";
  this.aliases = new Array("lang");
  this.parameters = "&lt;language>";
  this.help = "change language";
  this.helptext = "use the two-letter language codes used by google.<br/>";

  this.call = function(args){
    if(args[0]){
     if(languages[args[0]]) args[0] =languages[args[0]];

     if(langreverse[args[0]]){
     
      var url = "http://gshell.grothkopp.com/?lang="+args[0];
      document.location = url;
     
     }
     else {
     
     output.innerHTML += "language &quot;"+args[0]+"&quot; not found.<br/> <br/>";
     }
    }
    else{
     output.innerHTML += "language is: "+langreverse[lang]+" ("+lang+")<br/> <br/>";
    }
  }


}
register_searcher("lang");


