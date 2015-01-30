
goosh.module.open = function(){
  this.name = "open";
  this.aliases = new Array("open","o");
  this.parameters = "&lt;url>";
  this.help = "open url in new window";
  this.helptext = "<span class='info'>examples:</span><br/>"+
  		  "<i>open 1 3</i>  - open first and third result from last search<br/>";


  this.call = function(args){
    for(i=0;i<args.length;i++){
     var url = args[i];
     if(url.indexOf("http://")==-1 && url.indexOf("https://")) url = "http://"+url;
     window.open(url,'_blank','');
    }
  }


}
goosh.modules.register("open");


