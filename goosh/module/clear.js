
goosh.module.clear = function(){
  this.name = "clear";
  this.aliases = new Array("clear","c");
  this.help = "clear the screen";

  this.call = function(args){
  	goosh.gui.clear();
  }


}
goosh.modules.register("clear");


