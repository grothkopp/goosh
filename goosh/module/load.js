
goosh.module.load = function(){
  this.name = "load";
  this.aliases = new Array("load");
  this.help = "load an extension";
  this.parameters = "&lt;extension_url>";

  this.call = function(args){
    if(args[0]){
      var url = args[0];
      if(url.indexOf("http://")==-1 && url.indexOf("https://")) url = "http://gshell.grothkopp.com/ext/"+url+".js";
      var script = document.createElement('script');
      document.body.appendChild(script);
      script.src = url;

    }

  }


}
goosh.modules.register("load");


