
goosh.module.go = function(){
  this.name = "go";
  this.aliases = new Array("go","g");
  this.parameters = "&lt;url>";
  this.help = "open url";

  this.call = function(args){
    if(args[0]){
     var url = args[0];

//	window.name = encodeURI(output.innerHTML);

     if(url.indexOf("http://")==-1 && url.indexOf("https://")) url = "http://"+url;
     window.location.href = url;
    }
  }


}
goosh.modules.register("go");


