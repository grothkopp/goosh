
goosh.module.addengine = function(){
  this.name = "addengine";
  this.aliases = new Array("addengine");
  this.help = "add goosh to firefox search box";

  this.call = function(args){
     engineURL ="http://gshell.grothkopp.com/goosh.xml";
      if (!document.all && window.external && ("AddSearchProvider" in window.external)) {
	window.external.AddSearchProvider(engineURL);
      } else { 	 
        goosh.gui.error("addengine will only work in Firefox-Browsers.");
      } 	 
    } 


}
goosh.modules.register("addengine");


